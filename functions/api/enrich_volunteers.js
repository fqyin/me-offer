// Me Offer · 富化 96 志愿数据（为 PDF 导出提供完整字段）
// POST /api/enrich_volunteers
// body: { volunteers: [{school_name, group_name, min_rank, plan_count, ...}] }
// Returns: { enriched: [{...original, school_code_5digit, min_score_2024, tuition, career_path, study_years}] }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const vols								= body.volunteers || [];
	if (vols.length === 0) {
		return json_response({error: 'no volunteers'}, 400);
	}

	// 1. 批量查院校真实 5 位代码（从 university_mapping）
	const school_names						= Array.from(new Set(vols.map(v => v.school_name)));
	const school_codes_map					= new Map();

	if (school_names.length > 0) {
		// SQLite IN 查询
		const placeholders					= school_names.map(() => '?').join(',');
		const school_query					= env.DB.prepare(
			`SELECT u.name, u.code FROM universities u WHERE u.name IN (${placeholders})`
		);
		const school_rows					= await school_query.bind(...school_names).all();
		for (const row of school_rows.results || []) {
			// 院校代码：教育部标准 5 位代码（从 code 字段取后 5 位或全部）
			let code_5							= '';
			if (row.code) {
				const raw						= String(row.code).trim();
				// 如果是纯数字 10 位，取后 5 位；否则直接使用（兼容山东招生代码如 B413）
				if (/^\d{10}$/.test(raw)) {
					code_5						= raw.slice(-5);
				} else if (/^\d{4,5}$/.test(raw)) {
					code_5						= raw.padStart(5, '0');
				} else {
					code_5						= raw;
				}
			}
			school_codes_map.set(row.name, code_5);
		}
	}

	// 2. 批量查专业信息（从 majors）
	const group_names						= Array.from(new Set(vols.map(v => v.group_name).filter(Boolean)));
	const major_info_map					= new Map();

	if (group_names.length > 0) {
		// 按专业名关键词模糊匹配 majors 表
		for (const gn of group_names) {
			// 找最匹配的专业（去除括号/类型后缀）
			const cleaned					= clean_group_name(gn);
			if (!cleaned) continue;

			const major						= await env.DB.prepare(`
				SELECT code, name, employment_rate, salary_avg, tuition_avg, description, category
				FROM majors
				WHERE name = ?
				LIMIT 1
			`).bind(cleaned).first();

			if (major) {
				major_info_map.set(gn, major);
			} else {
				// 模糊匹配：name LIKE 'xx%'
				const fuzzy					= await env.DB.prepare(`
					SELECT code, name, employment_rate, salary_avg, tuition_avg, description, category
					FROM majors
					WHERE name LIKE ?
					LIMIT 1
				`).bind(cleaned.slice(0, Math.min(4, cleaned.length)) + '%').first();

				if (fuzzy) {
					major_info_map.set(gn, fuzzy);
				}
			}
		}
	}

	// 3. 批量查 2024 年最低分（用 min_rank 反查 2024 一分一段表）
	const ranks_2024						= new Map();
	const unique_ranks						= Array.from(new Set(vols.map(v => v.min_rank).filter(x => x > 0)));

	for (const rank of unique_ranks) {
		const seg							= await env.DB.prepare(`
			SELECT score FROM gaokao_segments
			WHERE year = 2024 AND subject_type = 'total' AND rank >= ?
			ORDER BY rank ASC LIMIT 1
		`).bind(rank).first();

		ranks_2024.set(rank, seg ? seg.score : null);
	}

	// 4. 富化每条志愿
	const enriched							= vols.map(v => {
		const major_info					= major_info_map.get(v.group_name);
		const code_5						= school_codes_map.get(v.school_name) || '';
		const min_score_2024				= ranks_2024.get(v.min_rank);

		return {
			...v,
			school_code_5digit:				code_5,
			min_score_2024:					min_score_2024,
			min_rank_2024:					v.min_rank,
			tuition_yuan:					major_info ? major_info.tuition_avg : infer_tuition(v.group_name, v.school_name),
			study_years:					infer_study_years(v.group_name),
			career_path:					major_info ? infer_career_path(major_info) : infer_career_from_group(v.group_name),
			employment_rate:				major_info ? major_info.employment_rate : null,
			salary_avg:						major_info ? major_info.salary_avg : null
		};
	});

	return json_response({
		enriched:		enriched,
		count:			enriched.length
	});
}


function clean_group_name(name) {
	if (!name) return '';
	// 去除括号和其中内容、类别后缀
	let cleaned								= name.replace(/\(.*?\)/g, '').replace(/（.*?）/g, '').trim();
	// 去除常见后缀
	cleaned									= cleaned.replace(/类$/, '').replace(/及其自动化$/, '').replace(/工程$/, '');
	return cleaned;
}


function infer_tuition(group_name, school_name) {
	// 基于专业类型 + 学校类型推测学费（单位：元/年）
	const gn								= group_name || '';
	const sn								= school_name || '';

	// 中外合作 / 国际班（最贵）
	if (gn.includes('中外合作') || gn.includes('国际班') || gn.includes('(中外') || gn.includes('（中外')) return 60000;
	if (sn.includes('中外合作')) return 55000;

	// 精英班 / 实验班 / 拔尖班（普遍比普通班贵一档）
	if (gn.includes('精英班') || gn.includes('拔尖') || gn.includes('实验班') || gn.includes('卓越')) {
		// 工科精英班多 6500-7500
		if (gn.includes('计算机') || gn.includes('电子') || gn.includes('机械') || gn.includes('自动化')) return 7000;
		return 6500;
	}

	// 艺术类
	if (gn.includes('美术') || gn.includes('绘画') || gn.includes('雕塑')) return 10000;
	if (gn.includes('设计')) return 10000;
	if (gn.includes('音乐') || gn.includes('舞蹈') || gn.includes('表演')) return 10000;
	if (gn.includes('戏剧') || gn.includes('影视') || gn.includes('编导') || gn.includes('摄影')) return 10000;
	if (gn.includes('艺术')) return 9000;

	// 计算机 / 人工智能 / 软件（热门工科普遍 5500-6500）
	if (gn.includes('软件工程')) return 6500;
	if (gn.includes('人工智能') || gn.includes('智能科学')) return 6000;
	if (gn.includes('数据科学') || gn.includes('大数据')) return 6000;
	if (gn.includes('计算机')) return 5500;

	// 电子 / 通信 / 微电子
	if (gn.includes('集成电路') || gn.includes('微电子')) return 6000;
	if (gn.includes('电子') || gn.includes('通信')) return 5500;

	// 医学 / 口腔 / 药学
	if (gn.includes('临床') || gn.includes('口腔医学')) return 6000;
	if (gn.includes('中医') || gn.includes('针灸')) return 5400;
	if (gn.includes('药学') || gn.includes('制药')) return 5500;
	if (gn.includes('医学') || gn.includes('护理')) return 5500;

	// 建筑 / 土木
	if (gn.includes('建筑学')) return 6000;
	if (gn.includes('城乡规划') || gn.includes('风景园林')) return 6000;
	if (gn.includes('土木') || gn.includes('建筑')) return 5500;

	// 航空航天 / 核工程 / 船舶
	if (gn.includes('飞行器') || gn.includes('航空') || gn.includes('航天')) return 6000;
	if (gn.includes('核工程') || gn.includes('核能')) return 6000;
	if (gn.includes('船舶') || gn.includes('海洋工程')) return 6000;

	// 化工 / 材料
	if (gn.includes('化工') || gn.includes('化学工程')) return 5500;
	if (gn.includes('材料')) return 5500;

	// 农学 / 林学（普遍便宜）
	if (gn.includes('农学') || gn.includes('林学') || gn.includes('园艺') || gn.includes('畜牧') || gn.includes('兽医') || gn.includes('草坪')) return 3000;
	if (gn.includes('葡萄') || gn.includes('酿酒') || gn.includes('食品')) return 4000;

	// 文史哲 / 外语（普遍 4500-5500）
	if (gn.includes('汉语言') || gn.includes('哲学') || gn.includes('历史') || gn.includes('考古')) return 4500;
	if (gn.includes('英语') || gn.includes('日语') || gn.includes('韩语') || gn.includes('翻译') || gn.includes('外语')) return 5000;

	// 经管法
	if (gn.includes('金融') || gn.includes('会计') || gn.includes('经济')) return 5500;
	if (gn.includes('法学') || gn.includes('法律')) return 5500;

	// 师范
	if (sn.includes('师范') || gn.includes('师范')) return 4500;

	// 民办 / 独立学院（按校名大致判断）
	if (sn.includes('学院') && !sn.includes('大学') && !sn.includes('学院大学')) return 18000;

	// 默认公办本科
	return 5500;
}


function infer_study_years(group_name) {
	const gn								= group_name || '';

	// 临床医学 5+3 一体化 / 八年制
	if (gn.includes('5+3') || gn.includes('八年') || gn.includes('八年制')) return '八年';

	// 建筑学 5 年
	if (gn.includes('建筑学') && !gn.includes('建筑学类')) return '五年';

	// 临床医学 5 年
	if (gn.includes('临床医学') && !gn.includes('5+3') && !gn.includes('八年')) return '五年';

	// 口腔 5 年
	if (gn.includes('口腔医学') && !gn.includes('5+3')) return '五年';

	// 中医 5 年
	if (gn === '中医学' || gn.includes('针灸推拿')) return '五年';

	return '四年';
}


function infer_career_path(major_info) {
	// 基于专业 category + description 推测就业去向（简短版）
	const category							= major_info.category || '';
	const name								= major_info.name || '';

	// 根据 category 返回简短就业描述
	const CAREER_MAP						= {
		'计算机类':			'互联网、芯片研发、AI',
		'电子信息类':		'通信、芯片设计、军工电子',
		'自动化类':			'智能制造、机器人、车企自动驾驶',
		'机械类':			'汽车、装备制造、航天',
		'材料类':			'新材料、半导体、军工材料',
		'化学类':			'新材料、化工、高校科研',
		'化工与制药类':		'化工新能源、精细化工、材料企业',
		'能源动力类':		'氢能、核能、新型发电集团',
		'数学类':			'金融、IT、科研',
		'物理学类':			'基础科研、量子信息、芯片企业',
		'生物科学类':		'生物制药、科研院所',
		'金融学类':			'银行、证券、基金、保险',
		'经济学类':			'经济咨询、政府部门、金融',
		'工商管理类':		'互联网大厂、咨询、外企',
		'法学类':			'律所、检察院、企业法务',
		'新闻传播学类':		'新媒体、互联网、广告',
		'中国语言文学类':	'编辑、教师、文化传播',
		'外国语言文学类':	'外企、外交、教育',
		'建筑类':			'设计院、城市规划',
		'土木类':			'建筑设计、基建、房地产',
		'临床医学类':		'三甲医院、医学科研',
		'口腔医学类':		'口腔医院、诊所',
		'护理学类':			'三甲医院、养老机构',
		'药学类':			'医药研发、制药企业',
		'中医学类':			'中医院、健康管理',
		'教育学类':			'中小学教师、教育机构',
		'体育学类':			'体育教师、运动俱乐部',
		'艺术学理论类':		'美术馆、艺术院校',
		'音乐与舞蹈学类':	'艺术团体、音乐院校',
		'美术学类':			'美术馆、画廊、艺术院校',
		'设计学类':			'互联网设计、广告公司',
		'戏剧与影视学类':	'影视公司、电视台',
		'航空航天类':		'航空、航天、国防',
		'兵器类':			'军工集团、国防',
		'核工程类':			'核电、国防、核研究院',
		'测绘类':			'测绘局、工程勘测',
		'地质类':			'地质勘探、石油',
		'矿业类':			'矿业、能源、安全',
		'交通运输类':		'铁路、航空、港口',
		'海洋工程类':		'船舶设计、海洋工程公司',
		'公共管理类':		'政府、公共事业'
	};

	return CAREER_MAP[category] || '相关行业、科研院所';
}


function infer_career_from_group(group_name) {
	const gn								= group_name || '';

	// IT / AI / 信息
	if (gn.includes('计算机') || gn.includes('软件')) return '互联网、IT';
	if (gn.includes('数据科学') || gn.includes('大数据')) return '数据分析、互联网';
	if (gn.includes('人工智能') || gn.includes('智能科学')) return 'AI 算法、智能硬件';
	if (gn.includes('智能')) return 'AI、智能制造';
	if (gn.includes('网络空间') || gn.includes('信息安全')) return '安全厂商、互联网';
	if (gn.includes('物联网')) return '物联网、智能硬件';

	// 电子 / 通信 / 电气
	if (gn.includes('通信工程')) return '通信、华为中兴';
	if (gn.includes('电子信息')) return '通信、芯片设计';
	if (gn.includes('微电子') || gn.includes('集成电路')) return '芯片设计、半导体';
	if (gn.includes('电子')) return '通信、电子设备';
	if (gn.includes('电气工程') || gn.includes('电力')) return '国家电网、电力公司';

	// 自动化 / 机械 / 机器人
	if (gn.includes('自动化')) return '智能制造、自动化';
	if (gn.includes('机器人')) return '智能制造、机器人';
	if (gn.includes('机械')) return '制造业、装备制造';
	if (gn.includes('车辆') || gn.includes('汽车')) return '车企、新能源汽车';

	// 航空 / 航天 / 兵器 / 核
	if (gn.includes('飞行器') || gn.includes('无人机') || gn.includes('无人驾驶航空')) return '航空、航天、国防';
	if (gn.includes('航空') || gn.includes('航天')) return '航空、航天、国防';
	if (gn.includes('武器') || gn.includes('兵器')) return '军工集团、国防';
	if (gn.includes('核工程') || gn.includes('核能')) return '核电、国防';

	// 能源 / 新能源
	if (gn.includes('能源') || gn.includes('新能源')) return '新能源、能源集团';

	// 金融 / 经济 / 管理
	if (gn.includes('金融')) return '银行、证券、基金';
	if (gn.includes('会计') || gn.includes('审计')) return '事务所、企业财务';
	if (gn.includes('经济')) return '银行、咨询、政府';
	if (gn.includes('工商管理') || gn.includes('市场营销')) return '企业管理、咨询';
	if (gn.includes('人力资源')) return '企业 HR、咨询';
	if (gn.includes('物流') || gn.includes('供应链')) return '物流、电商、制造';

	// 医学 / 药学
	if (gn.includes('临床')) return '三甲医院、医学科研';
	if (gn.includes('口腔')) return '口腔医院、诊所';
	if (gn.includes('护理')) return '医院、养老机构';
	if (gn.includes('中医') || gn.includes('针灸')) return '中医院、健康管理';
	if (gn.includes('预防医学') || gn.includes('公共卫生')) return '疾控、卫健委';
	if (gn.includes('药学') || gn.includes('制药')) return '医药研发、制药企业';
	if (gn.includes('医学')) return '医院、医学科研';

	// 法学 / 传媒 / 语言
	if (gn.includes('法学')) return '律所、检察院、企业法务';
	if (gn.includes('新闻') || gn.includes('传播') || gn.includes('广告')) return '新媒体、互联网、广告';
	if (gn.includes('英语')) return '外企、外贸、教育';
	if (gn.includes('日语') || gn.includes('韩语') || gn.includes('法语') || gn.includes('德语') || gn.includes('西班牙语') || gn.includes('俄语') || gn.includes('翻译')) return '外企、翻译、外交';
	if (gn.includes('汉语言')) return '编辑、教师、文化传播';
	if (gn.includes('外语')) return '外企、教育、翻译';

	// 建筑 / 土木 / 水利 / 交通
	if (gn.includes('建筑学')) return '设计院、建筑事务所';
	if (gn.includes('建筑')) return '建筑设计、房地产';
	if (gn.includes('土木')) return '基建、房地产';
	if (gn.includes('城市地下空间')) return '基建、房地产';
	if (gn.includes('给排水') || gn.includes('市政')) return '市政设计、基建';
	if (gn.includes('水利') || gn.includes('水文')) return '水利、工程设计';
	if (gn.includes('交通工程') || gn.includes('智能交通')) return '交通规划、铁路';
	if (gn.includes('交通运输')) return '铁路、航空、港口';
	if (gn.includes('道路桥梁')) return '基建、工程局';

	// 化学 / 材料 / 生物
	if (gn.includes('化学工程') || gn.includes('化工')) return '化工、新材料';
	if (gn.includes('化学')) return '化工、新材料、科研';
	if (gn.includes('材料成型') || gn.includes('材料科学')) return '新材料、半导体、制造';
	if (gn.includes('材料')) return '材料、制造业';
	if (gn.includes('生物工程') || gn.includes('生物技术')) return '生物制药、生物科技';
	if (gn.includes('生物')) return '生物制药、科研院所';
	if (gn.includes('食品') || gn.includes('酿酒') || gn.includes('葡萄')) return '食品饮料、酿造企业';

	// 农林 / 地质 / 资源
	if (gn.includes('农学') || gn.includes('园艺') || gn.includes('植物')) return '农业科技、种业';
	if (gn.includes('草坪')) return '园林绿化、市政';
	if (gn.includes('动物') || gn.includes('畜牧') || gn.includes('兽医')) return '畜牧、宠物医疗';
	if (gn.includes('林学') || gn.includes('林业') || gn.includes('家具') || gn.includes('木材')) return '林业、家居制造';
	if (gn.includes('测绘') || gn.includes('地理信息')) return '测绘、城市规划';
	if (gn.includes('地质') || gn.includes('勘探')) return '地质、能源勘探';
	if (gn.includes('采矿') || gn.includes('矿业')) return '矿业、能源集团';
	if (gn.includes('石油') || gn.includes('油气')) return '中石油、中石化';
	if (gn.includes('环境')) return '环保、市政、科研';

	// 教育 / 艺术 / 体育
	if (gn.includes('教育') || gn.includes('师范')) return '教师、教育机构';
	if (gn.includes('心理')) return '心理咨询、HR';
	if (gn.includes('体育')) return '体育教师、俱乐部';
	if (gn.includes('艺术') || gn.includes('设计') || gn.includes('美术')) return '设计公司、广告、互联网';
	if (gn.includes('音乐') || gn.includes('舞蹈')) return '艺术院团、教育';
	if (gn.includes('影视') || gn.includes('戏剧') || gn.includes('编导')) return '影视公司、传媒';

	// 物理 / 数学 / 哲学 / 历史
	if (gn.includes('物理')) return '科研院所、芯片企业';
	if (gn.includes('数学') || gn.includes('应用数学')) return '金融、IT、科研';
	if (gn.includes('统计')) return '金融、数据分析';
	if (gn.includes('哲学')) return '高校、研究院';
	if (gn.includes('历史')) return '博物馆、研究院';
	if (gn.includes('政治') || gn.includes('公共管理')) return '政府、公共事业';
	if (gn.includes('社会学')) return '政府、社会研究';

	// 海洋 / 船舶
	if (gn.includes('海洋') || gn.includes('船舶')) return '船舶设计、海洋工程';

	return '综合就业方向';
}


function json_response(data, status) {
	return new Response(JSON.stringify(data), {
		status:		status || 200,
		headers:	{
			'Content-Type':		'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		}
	});
}


export async function onRequestOptions() {
	return new Response(null, {
		status:		204,
		headers:	{
			'Access-Control-Allow-Origin':	'*',
			'Access-Control-Allow-Methods':	'POST, OPTIONS',
			'Access-Control-Allow-Headers':	'Content-Type'
		}
	});
}
