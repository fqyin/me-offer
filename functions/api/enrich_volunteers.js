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
			// code 是教育部 10 位，取后 5 位作为常见的 5 位代码
			const code_5						= row.code ? row.code.slice(-5) : '';
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
	// 基于专业类型 + 学校类型推测学费
	const gn								= group_name || '';
	const sn								= school_name || '';

	// 中外合作 / 国际班
	if (gn.includes('中外合作') || gn.includes('国际') || sn.includes('中外合作')) return 50000;

	// 艺术类
	if (gn.includes('艺术') || gn.includes('设计') || gn.includes('美术') || gn.includes('音乐') || gn.includes('戏剧') || gn.includes('影视')) return 10000;

	// 医学
	if (gn.includes('医学') || gn.includes('医') || gn.includes('口腔') || gn.includes('药')) return 6000;

	// 建筑 / 船舶 / 航空航天
	if (gn.includes('建筑') || gn.includes('船舶') || gn.includes('航空')) return 6000;

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

	if (gn.includes('计算机') || gn.includes('软件')) return '互联网、IT';
	if (gn.includes('人工智能') || gn.includes('AI') || gn.includes('智能')) return 'AI 算法、智能硬件';
	if (gn.includes('电子') || gn.includes('通信')) return '通信、芯片设计';
	if (gn.includes('自动化') || gn.includes('机械') || gn.includes('机器人')) return '智能制造、机器人';
	if (gn.includes('金融') || gn.includes('经济')) return '银行、证券、咨询';
	if (gn.includes('会计') || gn.includes('审计')) return '事务所、企业财务';
	if (gn.includes('临床') || gn.includes('医学')) return '三甲医院、医学科研';
	if (gn.includes('口腔')) return '口腔医院、诊所';
	if (gn.includes('护理')) return '医院、养老机构';
	if (gn.includes('药')) return '医药研发、制药企业';
	if (gn.includes('中医')) return '中医院、健康管理';
	if (gn.includes('法学')) return '律所、检察院、企业法务';
	if (gn.includes('新闻') || gn.includes('传播')) return '新媒体、广告';
	if (gn.includes('英语') || gn.includes('外语')) return '外企、教育、翻译';
	if (gn.includes('建筑学')) return '设计院、建筑事务所';
	if (gn.includes('土木') || gn.includes('水利')) return '基建、房地产';
	if (gn.includes('化学') || gn.includes('材料')) return '材料、化工、科研';
	if (gn.includes('生物')) return '生物制药、科研';
	if (gn.includes('教育') || gn.includes('师范')) return '教师、教育机构';
	if (gn.includes('艺术') || gn.includes('设计')) return '互联网设计、广告';
	if (gn.includes('航空') || gn.includes('航天')) return '航空、航天、国防';
	if (gn.includes('能源') || gn.includes('电气')) return '国家电网、能源集团';

	return '相关行业、企业';
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
