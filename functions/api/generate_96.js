// Me Offer · 96 志愿生成 API（核心）
// POST /api/generate_96
// body: { score, subject_type, subjects: [phys,chem,bio], cities, majors, level, personality, hobbies, strengths, talents, health, budget, remote, cold, sino }
// Returns: { rank, volunteers: [{ tier: 'chong|wen|bao', school, group, prob, diff, plan_count }x96] }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const score								= parseInt(body.score);
	const subject_type						= body.subject_type || 'total';
	const target_year						= 2025;		// 参考最近一年做预测

	if (isNaN(score) || score < 150 || score > 750) {
		return json_response({error: 'invalid score'}, 400);
	}

	// 1. 估算用户位次
	const user_rank							= await estimate_user_rank(env.DB, score, subject_type, target_year);
	if (!user_rank) {
		return json_response({error: 'no segment data'}, 500);
	}

	// 2. 查询候选院校专业组
	// user_rank 周围区间：
	// min_rank < user_rank - 6000: 我分显著高于录取线 (保档)
	// min_rank 在 user_rank -6000 ~ user_rank: 稳档
	// min_rank 在 user_rank ~ user_rank + 5000: 冲档
	// min_rank > user_rank + 5000: 偏远冲档（数据价值低）
	const candidates						= await fetch_candidates(env.DB, Math.max(1, user_rank - 20000), user_rank + 30000, body);

	// 3. 计算录取概率
	// diff = user_rank - min_rank
	// diff 正：用户位次>录取位次 = 用户分低 = 冲（概率低）
	// diff 负：用户位次<录取位次 = 用户分高 = 保（概率高）
	// diff ≈ 0：稳档
	const enriched							= candidates.map(c => {
		const diff							= user_rank - c.min_rank;
		let tier;
		let prob;

		if (diff >= -2000 && diff <= 3000) {
			// 稳：位次差 [-2000, 3000]
			tier							= 'wen';
			if (diff > 0) {
				prob						= Math.max(50, Math.min(78, 75 - diff / 150));
			} else {
				prob						= Math.max(78, Math.min(92, 85 + (-diff) / 300));
			}
		} else if (diff > 3000 && diff <= 10000) {
			// 冲：用户位次差于录取线 3000~10000
			tier							= 'chong';
			prob							= Math.max(20, Math.min(50, 50 - (diff - 3000) / 300));
		} else if (diff > 10000) {
			// 极冲：差距 > 10000
			tier							= 'chong';
			prob							= Math.max(10, Math.min(20, 20 - (diff - 10000) / 2000));
		} else if (diff < -2000 && diff >= -8000) {
			// 保：用户位次好于录取线 2000~8000
			tier							= 'bao';
			prob							= Math.max(90, Math.min(96, 92 + (-diff - 2000) / 1500));
		} else {
			// diff < -8000 极保
			tier							= 'bao';
			prob							= 98;
		}

		// 个性化偏好加权
		let score_boost						= 0;

		// ⭐ 城市偏好（严格加权/降权 · 避免山东意向推荐外省学校）
		if (body.cities && body.cities.length > 0 && !body.cities.includes('unlimited')) {
			const school_region				= identify_school_region(c.school_name);
			let city_matched				= false;

			for (const city_key of body.cities) {
				if (city_key === school_region) {
					city_matched			= true;
					break;
				}
			}

			if (city_matched) {
				score_boost					+= 80;		// 本省/意向城市大幅加权
			} else {
				// 非意向地区全部降权（包括 unknown 未识别城市）
				score_boost					-= 50;
			}
		}

		// 层次偏好
		if (body.level === '985' && c.tier === '985') score_boost += 20;
		if (body.level === '211' && (c.tier === '985' || c.tier === '211')) score_boost += 10;
		if (body.level === 'city' && score_boost > 0) score_boost += 5;

		// ⭐ 专业方向匹配（关键：避免医学意向 → 推荐土耳其语这种 bug）
		if (body.majors && body.majors.length > 0 && c.group_name) {
			const gn						= c.group_name;
			const major_match				= check_major_match(body.majors, gn);

			if (major_match === 'match') {
				score_boost					+= 40;		// 强匹配，大幅加权
			} else if (major_match === 'irrelevant') {
				score_boost					-= 80;		// 明显不相关，重度降权
			}
		}

		// 排除不符合的
		if (body.remote === 'no' && is_remote_area(c.school_name)) {
			score_boost						-= 30;
		}
		if (body.sino === 'no' && (c.tier === '中外合作' || (c.group_name || '').includes('中外合作'))) {
			score_boost						-= 40;
		}
		if (body.budget === 'tight' && (c.tier === '中外合作' || c.nature === '民办')) {
			score_boost						-= 40;
		}

		// 身体限制硬过滤
		if (body.health && body.health.includes('color_blind') && c.group_name) {
			const gn						= c.group_name;
			if (gn.includes('医学') || gn.includes('化学') || gn.includes('材料') || gn.includes('生物') || gn.includes('药学') || gn.includes('检验')) {
				score_boost					-= 100;		// 色盲基本排除医学化工类
			}
		}

		return {
			school_code:	c.school_code,
			school_name:	c.school_name,
			group_code:		c.group_code,
			group_name:		c.group_name,
			min_rank:		c.min_rank,
			plan_count:		c.plan_count,
			school_tier:	c.tier,
			school_nature:	c.nature,
			diff:			diff,
			prob:			Math.round(prob),
			tier:			tier,
			score:			prob + score_boost		// 排序用的综合分
		};
	});

	// 4. 按 tier 分组 + 综合分排序 + 取 24/48/24
	const chong_list						= enriched.filter(x => x.tier === 'chong').sort((a, b) => b.score - a.score);
	const wen_list							= enriched.filter(x => x.tier === 'wen').sort((a, b) => b.score - a.score);
	const bao_list							= enriched.filter(x => x.tier === 'bao').sort((a, b) => b.score - a.score);

	const final_chong						= chong_list.slice(0, 24);
	const final_wen							= wen_list.slice(0, 48);
	const final_bao							= bao_list.slice(0, 24);

	const final_list						= [...final_chong, ...final_wen, ...final_bao];

	return json_response({
		score:			score,
		subject_type:	subject_type,
		rank:			user_rank,
		count:			{
			chong:		final_chong.length,
			wen:		final_wen.length,
			bao:		final_bao.length,
			total:		final_list.length
		},
		volunteers:		final_list
	});
}


async function estimate_user_rank(db, score, subject_type, year) {
	const exact								= await db.prepare('SELECT rank FROM gaokao_segments WHERE year = ? AND subject_type = ? AND score = ? LIMIT 1').bind(year, subject_type, score).first();
	if (exact) return exact.rank;

	const neighbors							= await db.prepare('SELECT score, rank FROM gaokao_segments WHERE year = ? AND subject_type = ? ORDER BY ABS(score - ?) LIMIT 2').bind(year, subject_type, score).all();
	if (!neighbors.results || neighbors.results.length === 0) return null;

	const s1								= neighbors.results[0];
	const s2								= neighbors.results[1] || s1;
	if (s1.score === s2.score) return s1.rank;

	const ratio								= (score - s1.score) / (s2.score - s1.score);
	return Math.round(s1.rank + (s2.rank - s1.rank) * ratio);
}


async function fetch_candidates(db, rank_low, rank_high, body) {
	// 取最近两年数据（2025 优先，2024 补充）做平均
	const q									= db.prepare(`
		SELECT s.school_code, s.school_name, s.group_code, s.group_name,
			   s.min_rank, s.plan_count, s.year,
			   u.city, u.tier, u.nature
		FROM gaokao_scores s
		LEFT JOIN universities u ON s.school_code = u.code
		WHERE s.year IN (2024, 2025)
		  AND s.min_rank BETWEEN ? AND ?
		ORDER BY s.year DESC, s.min_rank
		LIMIT 3000
	`).bind(rank_low, rank_high);

	const result							= await q.all();
	const rows								= result.results || [];

	// 去重：同学校+专业组只保留最新一年
	const map								= new Map();
	for (const r of rows) {
		const key							= r.school_code + '_' + r.group_code;
		if (!map.has(key)) {
			map.set(key, {
				school_code:	r.school_code,
				school_name:	r.school_name,
				group_code:		r.group_code,
				group_name:		r.group_name,
				min_rank:		r.min_rank,
				plan_count:		r.plan_count,
				year:			r.year,
				school_city:	r.city || '',
				tier:			r.tier || '普通本科',
				nature:			r.nature || '公办'
			});
		}
	}

	return Array.from(map.values());
}


function is_remote_area(school_name) {
	const remote_kw							= ['新疆', '西藏', '青海', '宁夏', '内蒙古', '甘肃', '云南', '贵州', '石河子', '海南', '延边', '黑龙江'];
	return remote_kw.some(kw => school_name.includes(kw));
}


// 基于学校名识别所在区域（用于城市偏好匹配）
// 返回和前端 city chips 对应的 key: beijing/shanghai/gz_sz/jiangzhe/shandong/chengyu/wuhan/xian/unknown
function identify_school_region(school_name) {
	if (!school_name) return 'unknown';
	const n									= school_name;

	// 山东本省（齐鲁大地 · 使用多字关键词避免 '鲁''海大''山大' 单字误匹配）
	const sd_keywords						= [
		'山东', '齐鲁', '青岛', '济南', '烟台', '潍坊', '威海', '临沂', '泰山', '济宁',
		'聊城', '菏泽', '德州', '滨州', '鲁东', '东营', '日照', '淄博', '枣庄',
		'哈尔滨工业大学(威海)', '北京交通大学(威海)', '中国石油大学(华东)',
		'中央美术学院青岛', '中国海洋大学'
	];
	for (const kw of sd_keywords) {
		if (n.includes(kw)) return 'shandong';
	}

	// 北京
	const bj_keywords						= [
		'北京', '北大', '清华', '人大', '北航', '北师', '北理', '北邮', '北科',
		'北化', '北交', '北工', '北语', '北外', '北林', '首都', '对外经贸',
		'中国政法', '中国传媒', '中央财经', '中央民族', '中央音乐', '中央戏剧',
		'中国人民', '中国农业', '中国矿业(北京)', '中国矿业大学(北京)', '中国地质(北京)',
		'中国地质大学(北京)', '中国石油(北京)', '中国石油大学(北京)', '中央美术',
		'北电', '北影', '国际关系', '外交学院', '华北电力大学(北京)', '华北电力(北京)'
	];
	for (const kw of bj_keywords) {
		if (n.includes(kw)) return 'beijing';
	}

	// 上海
	const sh_keywords						= [
		'上海', '复旦', '交大', '同济', '华师', '华东师范', '华东政法', '华东理工',
		'东华', '上财', '外经', '上外', '上科'
	];
	for (const kw of sh_keywords) {
		if (n.includes(kw)) return 'shanghai';
	}

	// 广州/深圳
	const gz_sz_keywords					= [
		'广州', '深圳', '中山大学', '暨南', '华南理工', '华南师范', '华南农业',
		'广东工业', '广东外语', '广州大学', '南方科技', '南方医科', '香港中文大学(深圳)',
		'汕头', '广东', '岭南'
	];
	for (const kw of gz_sz_keywords) {
		if (n.includes(kw)) return 'gz_sz';
	}

	// 江浙（长三角）
	const jiangzhe_keywords					= [
		'南京', '苏州', '无锡', '杭州', '宁波', '浙江', '浙大', '南大',
		'东南大学', '河海', '江南', '苏大', '常州', '镇江', '徐州',
		'扬州', '南通', '温州', '义乌', '湖州', '嘉兴', '南师', '南航',
		'南京理工', '南京邮电', '南京工业', '南京信息', '南京师范', '南京林业', '南京农业',
		'南京中医药', '南京医科', '中国药科', '南京艺术', '西交利物浦', '宁波诺丁汉'
	];
	for (const kw of jiangzhe_keywords) {
		if (n.includes(kw)) return 'jiangzhe';
	}

	// 成都/重庆
	const chengyu_keywords					= [
		'成都', '重庆', '川大', '四川', '西南', '电子科技', '西华', '成都理工',
		'西南交大', '西南财经', '西南政法', '西南石油', '西南民族'
	];
	for (const kw of chengyu_keywords) {
		if (n.includes(kw)) return 'chengyu';
	}

	// 武汉
	const wuhan_keywords					= [
		'武汉', '华中', '武大', '中南财经', '中国地质大学(武汉)', '中国地质(武汉)',
		'华中科技', '华中师范', '华中农业', '武汉理工', '中南民族', '湖北工业', '湖北大学'
	];
	for (const kw of wuhan_keywords) {
		if (n.includes(kw)) return 'wuhan';
	}

	// 西安
	const xian_keywords						= [
		'西安', '西交', '西北工业', '西北大学', '西电', '西工大', '长安大学',
		'陕西师范', '西北农林', '西安建筑', '西安电子', '西安理工', '西北政法',
		'陕西科技', '西安石油', '西安美术', '西安外国语', '空军军医', '第四军医'
	];
	for (const kw of xian_keywords) {
		if (n.includes(kw)) return 'xian';
	}

	return 'unknown';
}


// 专业方向分类 · 用于过滤 "医学意向 推荐土耳其语" 这种错配
const MAJOR_KEYWORDS						= {
	tech:		['计算机', '软件', '人工智能', '大数据', '信息', '电子', '通信', '自动化', '机械', '电气', '能源', '物理', '数学', '统计', '工程', '材料', '土木', '建筑', '车辆', '航空', '船舶', '化工', '测绘', '采矿', '冶金', '光电', '核工程', '智能', '物联网', '机器人', '仪器', '地质', '水利', '环境工程', '交通'],
	medical:	['医学', '医药', '护理', '药学', '药剂', '针灸', '中医', '中药', '医学技术', '医学影像', '临床', '口腔', '预防', '康复', '眼视光', '精神', '麻醉', '儿科', '妇产', '病理', '检验'],
	econ:		['经济', '金融', '财政', '会计', '审计', '统计', '国际', '贸易', '商务', '市场', '营销', '工商管理', '企业管理', '保险', '投资', '财务', '税收', '资产'],
	liberal:	['法学', '法律', '政治', '公共管理', '新闻', '传播', '广告', '广播', '编导', '汉语', '文学', '语言', '外国语', '英语', '日语', '德语', '法语', '俄语', '西班牙', '阿拉伯', '翻译', '历史', '考古', '哲学', '社会学', '民族', '宗教', '档案'],
	education:	['教育', '师范', '学前', '小学教育', '中学教育', '特殊教育', '心理学'],
	art:		['艺术', '美术', '设计', '音乐', '舞蹈', '戏剧', '影视', '导演', '表演', '摄影', '书法', '绘画', '雕塑', '动画'],
	agri:		['农学', '园艺', '林学', '园林', '畜牧', '兽医', '水产', '动物', '植物', '茶学', '茶艺', '渔业', '蚕学', '草业'],
	military:	['侦查', '公安', '治安', '警务', '国防', '武警', '军事', '海警', '反恐']
};


// 明显与主要方向无关的"小语种/冷门"关键词（默认会被推荐，但意向明确时应排除）
const NICHE_KEYWORDS						= ['土耳其语', '印地语', '希伯来语', '斯瓦希里语', '越南语', '老挝语', '缅甸语', '泰语', '印尼语', '马来语', '波斯语', '孟加拉语', '蒙古语', '朝鲜语', '藏语', '维吾尔语', '哈萨克语'];


function check_major_match(user_majors, group_name) {
	// 返回 'match' 'neutral' 'irrelevant'

	// 如果用户选了"还没想好" 或 空 · 不做匹配
	if (!user_majors || user_majors.length === 0 || user_majors.includes('unknown')) {
		return 'neutral';
	}

	// 收集用户意向方向的关键词
	let user_keywords						= [];
	for (const m of user_majors) {
		if (MAJOR_KEYWORDS[m]) {
			user_keywords					= user_keywords.concat(MAJOR_KEYWORDS[m]);
		}
	}

	if (user_keywords.length === 0) {
		return 'neutral';
	}

	// 检查是否匹配
	for (const kw of user_keywords) {
		if (group_name.includes(kw)) {
			return 'match';
		}
	}

	// 检查是否是小语种/冷门（与主要方向无关）
	for (const niche of NICHE_KEYWORDS) {
		if (group_name.includes(niche)) {
			return 'irrelevant';
		}
	}

	// 在用户意向类别里做反向匹配：比如选医学但专业是"农学/林学" → irrelevant
	// 遍历其他没选的类别的关键词，如果匹配了说明是别的方向
	const selected_cats						= new Set(user_majors);
	let other_cats_matches					= 0;
	for (const [cat, keywords] of Object.entries(MAJOR_KEYWORDS)) {
		if (selected_cats.has(cat)) continue;
		for (const kw of keywords) {
			if (group_name.includes(kw)) {
				other_cats_matches++;
				break;
			}
		}
	}

	// 如果匹配了 2+ 个其他类别说明明显错配
	if (other_cats_matches >= 2) return 'irrelevant';

	// 匹配 1 个其他类别但没匹配用户的意向 → irrelevant（用户意向明确时严格过滤）
	if (other_cats_matches >= 1 && user_majors.length <= 2) return 'irrelevant';

	return 'neutral';
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
