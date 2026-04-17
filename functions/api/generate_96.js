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
		if (body.cities && body.cities.length > 0) {
			const city_map					= {
				'beijing': '北京',		'shanghai': '上海',		'gz_sz': ['广州', '深圳'],
				'jiangzhe': ['南京', '杭州', '苏州', '无锡'],		'shandong': ['济南', '青岛', '烟台', '威海'],
				'chengyu': ['成都', '重庆'],	'wuhan': '武汉',	'xian': '西安'
			};
			for (const city_key of body.cities) {
				if (city_key === 'unlimited') continue;
				const city_names			= city_map[city_key];
				if (!city_names) continue;
				const names_arr				= Array.isArray(city_names) ? city_names : [city_names];
				for (const cn of names_arr) {
					if ((c.school_city || '').includes(cn) || c.school_name.includes(cn)) {
						score_boost			+= 10;
						break;
					}
				}
			}
		}

		// 层次偏好
		if (body.level === '985' && c.tier === '985') score_boost += 20;
		if (body.level === '211' && (c.tier === '985' || c.tier === '211')) score_boost += 10;
		if (body.level === 'city' && score_boost > 0) score_boost += 5;

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
