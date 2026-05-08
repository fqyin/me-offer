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
	const province							= body.province || 'shandong';

	if (isNaN(score) || score < 150 || score > 750) {
		return json_response({error: 'invalid score'}, 400);
	}

	// 省份可用性校验
	const province_config					= await env.DB.prepare('SELECT code, name, data_status, chong_count, wen_count, bao_count FROM provinces WHERE code = ?').bind(province).first();
	if (!province_config) {
		return json_response({error: '不支持的省份：' + province}, 400);
	}
	if (province_config.data_status !== 'complete') {
		return json_response({
			error:		province_config.name + ' 即将上线，请留邮箱订阅上线通知',
			province_status:	province_config.data_status,
			province_name:	province_config.name
		}, 400);
	}

	// 1. 估算用户位次
	const user_rank							= await estimate_user_rank(env.DB, score, subject_type, target_year, province);
	if (!user_rank) {
		return json_response({error: 'no segment data'}, 500);
	}

	/* 各省志愿数从 provinces 表配置读，不硬编码（山东 24/48/24、北京 8/14/8 等） */
	const target_chong						= province_config.chong_count || 24;
	const target_wen						= province_config.wen_count || 48;
	const target_bao						= province_config.bao_count || 24;

	// 2. 查询候选院校专业组（传真实 user_rank）
	const candidates						= await fetch_candidates(env.DB, user_rank, body);

	// 3. 计算录取概率
	// diff = user_rank - min_rank
	// diff 正：用户位次>录取位次（用户排名靠后）= 用户分低 = 冲（概率低）
	// diff 负：用户位次<录取位次（用户排名靠前）= 用户分高 = 保（概率高）
	// diff ≈ 0：稳档
	//
	// 概率区间（三档清晰分层，不重叠）：
	//   冲 15-40%   稳 50-75%   保 85-98%
	const enriched							= candidates.map(c => {
		const diff							= user_rank - c.min_rank;
		let tier;
		let prob;

		/* ============================================================
		   概率分层（v3 修复 · 按用户位次百分比动态缩放）
		   diff = user_rank - school_min_rank
		   diff 为正 = 用户排名靠后 = 冲
		   diff 为负 = 用户排名靠前 = 保

		   关键：用 diff / user_rank 做百分比，避免高分段位次差绝对值小被误判
		   ============================================================ */
		const diff_pct						= user_rank > 0 ? (diff / user_rank) : 0;		// 相对位次差百分比

		if (diff_pct >= -0.05 && diff_pct <= 0.05) {
			/* 稳·核心：相对位次差 ±5%，概率 65-85% */
			tier							= 'wen';
			prob							= Math.round(85 - (Math.abs(diff_pct) / 0.05) * 20);
		}
		else if (diff_pct > 0.05 && diff_pct <= 0.15) {
			/* 稳·边缘：差 +5%~+15%，概率 50-65% */
			tier							= 'wen';
			prob							= Math.round(65 - ((diff_pct - 0.05) / 0.10) * 15);
		}
		else if (diff_pct > 0.15 && diff_pct <= 0.5) {
			/* 冲：差 +15%~+50%，概率 40-20%（线性） */
			tier							= 'chong';
			prob							= Math.round(40 - ((diff_pct - 0.15) / 0.35) * 20);
		}
		else if (diff_pct > 0.5) {
			/* 极冲：差 > +50%，概率 15-20% */
			tier							= 'chong';
			prob							= Math.max(15, Math.round(20 - (diff_pct - 0.5) * 10));
		}
		else if (diff_pct < -0.05 && diff_pct >= -0.15) {
			/* 保·边缘：差 -5%~-15%，概率 85-92% */
			tier							= 'bao';
			prob							= Math.round(85 + ((-diff_pct - 0.05) / 0.10) * 7);
		}
		else if (diff_pct < -0.15 && diff_pct >= -0.5) {
			/* 保·稳妥：差 -15%~-50%，概率 92-97% */
			tier							= 'bao';
			prob							= Math.round(92 + ((-diff_pct - 0.15) / 0.35) * 5);
		}
		else {
			/* 极保：差 < -50%，概率 98% */
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
		else if (c.group_name) {
			/* 用户没显式选意向专业：用选科组合推理默认大类，降权不相关方向。
			   物化生没选意向 → 推文学语言/艺术类降权，保持 STEM 主体。 */
			const default_cats				= infer_default_majors_from_subjects(body.subjects);
			if (default_cats) {
				const fake_match				= check_major_match(default_cats, c.group_name);
				if (fake_match === 'irrelevant') {
					score_boost					-= 50;		// 轻度降权（用户没明确意向，不能过死）
				}
				else if (fake_match === 'match') {
					score_boost					+= 15;		// 轻度加权
				}
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

		// ⭐ 性格 × 专业软加权（基于霍兰德职业兴趣理论 · 精简占位版 · 下一阶段由专项矩阵替换）
		if (c.group_name && body.personality && body.personality.length > 0) {
			score_boost						+= compute_personality_boost(body.personality, c.group_name);
		}

		// ⭐ 兴趣 × 专业软加权
		if (c.group_name && body.hobbies && body.hobbies.length > 0) {
			score_boost						+= compute_hobby_boost(body.hobbies, c.group_name);
		}

		// ⭐ 学科特长 × 专业软加权
		if (c.group_name && body.strengths && body.strengths.length > 0) {
			score_boost						+= compute_strength_boost(body.strengths, c.group_name);
		}

		return {
			school_code:	c.school_code,
			school_name:	c.school_name,
			school_city:	c.school_city,
			group_code:		c.group_code,
			group_name:		c.group_name,
			subject_require: c.subject_require,
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
	//    ⭐ 用户选了专业意向：匹配 majors 的强制排最前（避免医学意向被其他专业挤掉）
	const sort_by_major_first				= (list) => {
		if (!body.majors || body.majors.length === 0) {
			return list.sort((a, b) => b.score - a.score);
		}
		return list.sort((a, b) => {
			const a_match					= (a.group_name && check_major_match(body.majors, a.group_name) === 'match') ? 1 : 0;
			const b_match					= (b.group_name && check_major_match(body.majors, b.group_name) === 'match') ? 1 : 0;
			if (a_match !== b_match) return b_match - a_match;		/* 匹配专业优先 */
			return b.score - a.score;									/* 同类比综合分 */
		});
	};

	let chong_list							= sort_by_major_first(enriched.filter(x => x.tier === 'chong'));
	let wen_list							= sort_by_major_first(enriched.filter(x => x.tier === 'wen'));
	let bao_list							= sort_by_major_first(enriched.filter(x => x.tier === 'bao'));

	/* 借档辅助：加入"专业匹配优先"的打分 (match 优先于 diff 接近度)
	   prefer_direction: 'asc'（borrow to wen from chong, 借低 diff）/ 'desc'（borrow to wen from bao, 借高 diff）
	   return: 已排序的索引数组（越靠前越优先借） */
	const rank_by_major_then_diff			= (list, prefer_direction) => {
		return [...list].sort((a, b) => {
			if (body.majors && body.majors.length > 0) {
				const a_match				= (a.group_name && check_major_match(body.majors, a.group_name) === 'match') ? 1 : 0;
				const b_match				= (b.group_name && check_major_match(body.majors, b.group_name) === 'match') ? 1 : 0;
				if (a_match !== b_match) return b_match - a_match;
			}
			return prefer_direction === 'asc' ? a.diff - b.diff : b.diff - a.diff;
		});
	};

	/* 北京：按"院校专业组"投档，每个学校在同一档位只保留 1 条
	   （否则 30 志愿里会出现"清华 01 专业组 / 清华 02 专业组" 占多个名额，违反真实填报心智） */
	if (province === 'beijing') {
		const dedup_by_school				= (list) => {
			const seen						= new Set();
			const out						= [];
			for (let item of list) {
				if (seen.has(item.school_code)) continue;
				seen.add(item.school_code);
				out.push(item);
			}
			return out;
		};
		chong_list							= dedup_by_school(chong_list);
		wen_list							= dedup_by_school(wen_list);
		bao_list							= dedup_by_school(bao_list);
	}

	/* 兜底 v5：稳档不足时从冲/保档借（高分段专业池稀疏，清北华五就这么多）
	   v6（2026-04-26）：硬编码 24/48/24 改成读省份配置 target_chong/wen/bao */
	if (wen_list.length < target_wen) {
		const need							= target_wen - wen_list.length;
		/* 优先从 chong 借（先匹配专业，再低 diff） */
		const chong_sorted					= rank_by_major_then_diff(chong_list, 'asc');
		const take_from_chong				= Math.min(Math.ceil(need / 2), Math.max(0, chong_list.length - target_chong));
		for (let i = 0; i < take_from_chong; i++) {
			const item						= { ...chong_sorted[i], tier: 'wen' };
			wen_list.push(item);
			const idx						= chong_list.indexOf(chong_sorted[i]);
			if (idx !== -1) chong_list.splice(idx, 1);
		}
		/* 再从 bao 借（先匹配专业，再高 diff） */
		const bao_sorted					= rank_by_major_then_diff(bao_list, 'desc');
		const still_need					= target_wen - wen_list.length;
		const take_from_bao					= Math.min(still_need, Math.max(0, bao_list.length - target_bao));
		for (let i = 0; i < take_from_bao; i++) {
			const item						= { ...bao_sorted[i], tier: 'wen' };
			wen_list.push(item);
			const idx						= bao_list.indexOf(bao_sorted[i]);
			if (idx !== -1) bao_list.splice(idx, 1);
		}
	}

	/* 冲档不足：从 wen 借（先匹配专业，再高 diff 接近冲档） */
	if (chong_list.length < target_chong && wen_list.length > 0) {
		const sorted						= rank_by_major_then_diff(wen_list, 'desc');
		const need							= target_chong - chong_list.length;
		for (let i = 0; i < Math.min(need, sorted.length); i++) {
			const item						= { ...sorted[i], tier: 'chong' };
			chong_list.push(item);
			const idx						= wen_list.indexOf(sorted[i]);
			if (idx !== -1) wen_list.splice(idx, 1);
		}
	}

	/* 保档不足：从 wen 借（先匹配专业，再低 diff 接近保档） */
	if (bao_list.length < target_bao && wen_list.length > 0) {
		const sorted						= rank_by_major_then_diff(wen_list, 'asc');
		const need							= target_bao - bao_list.length;
		for (let i = 0; i < Math.min(need, sorted.length); i++) {
			const item						= { ...sorted[i], tier: 'bao' };
			bao_list.push(item);
			const idx						= wen_list.indexOf(sorted[i]);
			if (idx !== -1) wen_list.splice(idx, 1);
		}
	}

	const final_chong						= chong_list.slice(0, target_chong);
	const final_wen							= wen_list.slice(0, target_wen);
	const final_bao							= bao_list.slice(0, target_bao);

	const final_list						= [...final_chong, ...final_wen, ...final_bao];

	/* v17+: 额外返回 "备选池" extras = 未进入志愿表的候选（每档再 40 所）
	   用户可在工作台替换默认方案 */
	const extras_chong						= chong_list.slice(target_chong, target_chong + 40);
	const extras_wen						= wen_list.slice(target_wen, target_wen + 40);
	const extras_bao						= bao_list.slice(target_bao, target_bao + 40);
	const extras_list						= [...extras_chong, ...extras_wen, ...extras_bao];

	/* 统一补 group_code：D1 里 group_code 常空，从 group_name 前缀提取（如 "0B智能制造工程" → "0B"）
	   同时从 group_name 中剥离前缀，留下干净专业名 */
	const all_items							= [...final_list, ...extras_list];
	for (const item of all_items) {
		const raw_gn						= item.group_name || '';
		const m								= raw_gn.match(/^([0-9A-Z]{1,3})([\u4e00-\u9fa5])/);
		if (m) {
			if (!item.group_code || String(item.group_code).trim() === '') {
				item.group_code				= m[1];
			}
			item.group_name					= raw_gn.substring(m[1].length);
		}
		else if (province === 'beijing' && /^\d{1,2}$/.test(raw_gn.trim())) {
			/* \u5317\u4eac\uff1agroup_name \u5c31\u662f\u7eaf\u6570\u5b57 "01"/"02"\uff0c\u628a\u5b83\u5f53 group_code\uff0c\u5e76\u8865\u4e24\u4f4d */
			if (!item.group_code || String(item.group_code).trim() === '') {
				item.group_code				= raw_gn.trim().padStart(2, '0');
			}
		}
	}

	/* 北京：JOIN beijing_group_majors 给每个 volunteer 挂上"专业组里的专业明细"
	   (school_code, group_code) → group_majors: [{ major_index, major_name, ... }] */
	if (province === 'beijing') {
		await attach_beijing_group_majors(env.DB, all_items);
	}

	return json_response({
		score:			score,
		subject_type:	subject_type,
		rank:			user_rank,
		count:			{
			chong:		final_chong.length,
			wen:		final_wen.length,
			bao:		final_bao.length,
			total:		final_list.length,
			extras:		extras_list.length
		},
		volunteers:		final_list,
		extras:			extras_list		/* 备选池 · 前端工作台左侧展示 */
	});
}


async function estimate_user_rank(db, score, subject_type, year, province) {
	const exact								= await db.prepare('SELECT rank FROM gaokao_segments WHERE province = ? AND year = ? AND subject_type = ? AND score = ? LIMIT 1').bind(province, year, subject_type, score).first();
	if (exact) return exact.rank;

	const neighbors							= await db.prepare('SELECT score, rank FROM gaokao_segments WHERE province = ? AND year = ? AND subject_type = ? ORDER BY ABS(score - ?) LIMIT 2').bind(province, year, subject_type, score).all();
	if (!neighbors.results || neighbors.results.length === 0) return null;

	const s1								= neighbors.results[0];
	const s2								= neighbors.results[1] || s1;
	if (s1.score === s2.score) return s1.rank;

	const ratio								= (score - s1.score) / (s2.score - s1.score);
	return Math.round(s1.rank + (s2.rank - s1.rank) * ratio);
}


async function fetch_candidates(db, user_rank, body) {
	/* 关键修复 v4：
	   - 分别查 冲 / 稳 / 保 三段，每段足够大
	   - 高分段（rank < 3000）百分比会导致范围太窄，改用绝对偏移
	   修复 v5（2026-04-26）：加 province 过滤，避免跨省数据污染
	   （之前 SQL 不带 WHERE province=?，山东用户拿到的推荐里混入了浙江/河北/北京/江苏的数据） */
	const province								= body.province || 'shandong';

	/* 动态决定偏移策略 */
	let chong_low, chong_high, wen_low, wen_high, bao_low, bao_high;

	if (user_rank < 3000) {
		/* 高分段：用户 rank < 3000，用绝对偏移（因为百分比太小） */
		chong_low							= 1;
		chong_high							= Math.max(1, user_rank - 100);
		wen_low								= Math.max(1, user_rank - 2000);
		wen_high							= user_rank + 3000;
		bao_low								= user_rank + 3000;
		bao_high							= user_rank + 20000;
	}
	else if (user_rank < 15000) {
		/* 中高分段：保守百分比 + 绝对兜底 */
		chong_low							= Math.max(1, Math.round(user_rank * 0.3));
		chong_high							= Math.round(user_rank * 0.85);
		wen_low								= Math.round(user_rank * 0.85);
		wen_high							= Math.round(user_rank * 1.25);
		bao_low								= Math.round(user_rank * 1.25);
		bao_high							= Math.round(user_rank * 2.0);
	}
	else {
		/* 普通分段：百分比模式 */
		chong_low							= Math.max(1, Math.round(user_rank * 0.5));
		chong_high							= Math.round(user_rank * 0.85);
		wen_low								= Math.round(user_rank * 0.85);
		wen_high							= Math.round(user_rank * 1.15);
		bao_low								= Math.round(user_rank * 1.15);
		bao_high							= Math.round(user_rank * 1.50);
	}

	const q_chong							= db.prepare(`
		SELECT s.school_code, s.school_name, s.group_code, s.group_name,
			   s.min_rank, s.plan_count, s.year, s.subject_require,
			   s.school_city, s.school_nature,
			   u.city as u_city, u.tier as u_tier, u.nature as u_nature
		FROM gaokao_scores s
		LEFT JOIN universities u ON s.school_code = u.code
		WHERE s.province = ? AND s.year IN (2024, 2025) AND s.min_rank BETWEEN ? AND ?
		ORDER BY s.year DESC, s.min_rank DESC
		LIMIT 1500
	`).bind(province, chong_low, chong_high);

	const q_wen								= db.prepare(`
		SELECT s.school_code, s.school_name, s.group_code, s.group_name,
			   s.min_rank, s.plan_count, s.year, s.subject_require,
			   s.school_city, s.school_nature,
			   u.city as u_city, u.tier as u_tier, u.nature as u_nature
		FROM gaokao_scores s
		LEFT JOIN universities u ON s.school_code = u.code
		WHERE s.province = ? AND s.year IN (2024, 2025) AND s.min_rank BETWEEN ? AND ?
		ORDER BY s.year DESC, ABS(s.min_rank - ?)
		LIMIT 2000
	`).bind(province, wen_low, wen_high, user_rank);

	const q_bao								= db.prepare(`
		SELECT s.school_code, s.school_name, s.group_code, s.group_name,
			   s.min_rank, s.plan_count, s.year, s.subject_require,
			   s.school_city, s.school_nature,
			   u.city as u_city, u.tier as u_tier, u.nature as u_nature
		FROM gaokao_scores s
		LEFT JOIN universities u ON s.school_code = u.code
		WHERE s.province = ? AND s.year IN (2024, 2025) AND s.min_rank BETWEEN ? AND ?
		ORDER BY s.year DESC, s.min_rank
		LIMIT 1500
	`).bind(province, bao_low, bao_high);

	const [r_chong, r_wen, r_bao]			= await Promise.all([q_chong.all(), q_wen.all(), q_bao.all()]);

	const rows								= [
		...(r_chong.results || []),
		...(r_wen.results || []),
		...(r_bao.results || [])
	];

	// 去重：同学校+专业组只保留最新一年
	const map								= new Map();
	for (const r of rows) {
		const key							= r.school_code + '_' + r.group_code;
		if (!map.has(key)) {
			map.set(key, {
				school_code:	r.school_code,
				school_name:	r.school_name,
				group_code:		r.group_code,
				group_name:		r.group_name || '',
				min_rank:		r.min_rank,
				plan_count:		r.plan_count,
				year:			r.year,
				subject_require: r.subject_require || '',
				school_city:	r.school_city || r.u_city || '',
				tier:			r.u_tier || '普通本科',
				nature:			r.school_nature || r.u_nature || '公办'
			});
		}
	}

	let list								= Array.from(map.values());

	// ========= 关键：选科硬过滤 =========
	// 用户选科（3 门）vs 专业组 subject_require 字段
	// 格式样例：
	//   '物理,化学(2门科目考生均须选考方可报考)' → 必须同时选物理+化学
	//   '物理(1门科目考生必须选考方可报考)'    → 必须选物理
	//   '不提科目要求' / null                     → 任意选科可报
	const user_subjects						= body.subjects || [];

	if (user_subjects.length > 0) {
		list								= list.filter(c => match_subject_requirement(c.subject_require, user_subjects));
	}

	return list;
}


// 选科硬匹配：返回 true 表示用户选科满足专业组要求
function match_subject_requirement(require_text, user_subjects) {
	if (!require_text) return true;					// 缺数据时放行（避免数据缺失导致 0 结果）
	if (require_text.includes('不提科目要求')) return true;

	// 中文选科名称到前端英文 key 的映射
	const cn_to_en = {
		'物理':		'physics',
		'化学':		'chemistry',
		'生物':		'biology',
		'思想政治':	'politics',
		'政治':		'politics',
		'历史':		'history',
		'地理':		'geography'
	};

	const user_set							= new Set(user_subjects);

	// Case A: '物理,化学(2门科目考生均须选考方可报考)' · 均须
	if (require_text.includes('均须选考') || require_text.includes('均需选考')) {
		// 提取括号前的学科列表
		const before							= require_text.split('(')[0].trim();
		const req_cn_list						= before.split(/[,，、]/).map(s => s.trim()).filter(s => s);
		for (const cn of req_cn_list) {
			const en							= cn_to_en[cn];
			if (!en || !user_set.has(en)) return false;		// 任一必考缺失 → 不匹配
		}
		return true;
	}

	// Case B: '物理(1门科目考生必须选考方可报考)' · 必选这一门
	if (require_text.includes('必须选考') || require_text.includes('方可报考')) {
		const before							= require_text.split('(')[0].trim();
		const req_cn_list						= before.split(/[,，、]/).map(s => s.trim()).filter(s => s);
		// 1 门必须类：至少 1 门被选中
		for (const cn of req_cn_list) {
			const en							= cn_to_en[cn];
			if (en && user_set.has(en)) return true;
		}
		return false;
	}

	// Case C: '物理或化学或生物(考生选考其中1门即可报考)' · 选其一
	if (require_text.includes('或') && (require_text.includes('任选') || require_text.includes('其中') || require_text.includes('即可'))) {
		const before							= require_text.split('(')[0].trim();
		const req_cn_list						= before.split(/[或]/).map(s => s.trim()).filter(s => s);
		for (const cn of req_cn_list) {
			const en							= cn_to_en[cn];
			if (en && user_set.has(en)) return true;
		}
		return false;
	}

	// Fallback: 裸学科文本 · 尝试提取所有学科，至少 1 门匹配则通过
	let any_matched							= false;
	for (const [cn, en] of Object.entries(cn_to_en)) {
		if (require_text.includes(cn)) {
			if (user_set.has(en)) return true;
			any_matched							= true;
		}
	}
	// 如果 require 里提到了学科但用户一个都没选 → 不匹配
	return !any_matched;
}


function is_remote_area(school_name) {
	const remote_kw							= ['新疆', '西藏', '青海', '宁夏', '内蒙古', '甘肃', '云南', '贵州', '石河子', '海南', '延边', '黑龙江'];
	return remote_kw.some(kw => school_name.includes(kw));
}


/* ==============================================================
   性格 × 专业软加权矩阵（精简占位版 · V1）
   基于霍兰德职业兴趣理论（Realistic/Investigative/Artistic/Social/Enterprising/Conventional）
   V2 将由独立"性格×专业映射矩阵"项目替换，此处仅用于今晚功能闭环
   ============================================================== */
const PERSONALITY_MAJOR_MAP					= {
	/* 外向善社交 → 偏沟通/服务/管理 */
	social:			{ add: ['新闻', '传播', '广告', '市场营销', '工商管理', '国际经济', '旅游', '酒店', '公共管理', '社会学', '师范', '教育', '护理'], sub: ['数学', '哲学', '考古', '基础'] },
	/* 内向爱思考 → 偏研究/独立工作 */
	introvert:		{ add: ['数学', '物理', '哲学', '计算机', '软件', '考古', '基础医学', '统计', '化学', '生物'], sub: ['新闻', '市场营销', '工商管理', '表演'] },
	/* 逻辑性强 → STEM + 金融法律 */
	logical:		{ add: ['计算机', '软件', '数学', '物理', '电子', '自动化', '金融', '法学', '统计', '经济', '人工智能', '数据科学'], sub: ['美术', '音乐', '表演'] },
	/* 创意想象丰富 → 艺术/设计/传媒 */
	creative:		{ add: ['设计', '美术', '动画', '数字媒体', '广告', '建筑', '戏剧', '影视', '编导', '工业设计', '服装'], sub: ['会计', '统计', '精算'] },
	/* 细致耐心 → 医学/会计/考古/实验 */
	detail:			{ add: ['会计', '审计', '医学', '护理', '药学', '考古', '检验', '实验', '财务', '统计', '口腔'], sub: ['公共管理'] },
	/* 有领导力 → 管理/军警/商科 */
	leader:			{ add: ['工商管理', '公共管理', '人力资源', '国防', '军事', '警察', '政治', '国际关系', '市场营销'], sub: [] },
	/* 动手能力强 → 工科/医学/军警 */
	handson:		{ add: ['机械', '土木', '建筑', '电气', '自动化', '车辆', '医学', '口腔', '航空', '船舶', '机器人', '材料成型'], sub: ['哲学', '历史'] },
	/* 独立自主 → 基础研究/创业 */
	independent:	{ add: ['数学', '物理', '哲学', '经济学', '统计', '金融', '基础', '历史'], sub: [] }
};

function compute_personality_boost(personality_arr, group_name) {
	let boost								= 0;
	const gn								= group_name || '';
	for (const p of personality_arr) {
		const map							= PERSONALITY_MAJOR_MAP[p];
		if (!map) continue;
		if ((map.add || []).some(kw => gn.includes(kw))) boost += 8;
		if ((map.sub || []).some(kw => gn.includes(kw))) boost -= 10;
	}
	return boost;
}


/* 兴趣 × 专业映射（V1 占位） */
const HOBBY_MAJOR_MAP						= {
	tech:			['计算机', '软件', '电子', '人工智能', '自动化', '数据科学', '通信', '微电子'],
	reading:		['汉语言', '新闻', '传播', '历史', '哲学', '外语', '编辑'],
	sports:			['体育', '运动', '康复', '健康'],
	art:			['设计', '美术', '动画', '建筑', '服装', '工业设计'],
	music:			['音乐', '作曲', '声乐', '舞蹈'],
	travel:			['旅游', '酒店', '地理', '外语'],
	games:			['计算机', '软件', '动画', '数字媒体', '游戏'],
	social_media:	['新闻', '传播', '广告', '市场营销', '数字媒体'],
	business:		['金融', '经济', '工商管理', '会计', '市场营销', '国际贸易'],
	science:		['物理', '化学', '生物', '数学', '材料', '环境', '地质'],
	history:		['历史', '考古', '哲学', '社会学', '政治'],
	film:			['戏剧', '影视', '编导', '动画', '广播电视']
};

function compute_hobby_boost(hobbies, group_name) {
	let boost								= 0;
	const gn								= group_name || '';
	for (const h of hobbies) {
		const kws							= HOBBY_MAJOR_MAP[h] || [];
		if (kws.some(kw => gn.includes(kw))) boost += 6;
	}
	return boost;
}


/* 学科特长 × 专业映射（V1 占位） */
const STRENGTH_MAJOR_MAP					= {
	math:			['数学', '统计', '金融', '精算', '计算机', '软件', '物理', '经济', '数据科学'],
	physics:		['物理', '材料', '电子', '能源', '机械', '航空', '航天', '核工程', '天文'],
	chemistry:		['化学', '化工', '材料', '药学', '制药', '能源'],
	biology:		['生物', '医学', '药学', '护理', '农学', '环境', '食品'],
	chinese:		['汉语言', '新闻', '传播', '编辑', '教育', '师范', '文化'],
	english:		['英语', '翻译', '外交', '国际关系', '国际贸易', '外国语'],
	history:		['历史', '考古', '博物馆', '文化遗产', '旅游'],
	politics:		['法学', '政治', '公共管理', '国际关系', '社会学'],
	geography:		['地理', '地质', '测绘', '环境', '旅游', '城乡规划']
};

function compute_strength_boost(strengths, group_name) {
	let boost								= 0;
	const gn								= group_name || '';
	for (const s of strengths) {
		const kws							= STRENGTH_MAJOR_MAP[s] || [];
		if (kws.some(kw => gn.includes(kw))) boost += 7;
	}
	return boost;
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


/* 根据选科组合推理默认可报考的专业大类
   物化生 → 工/医/理/农（STEM 方向为主，排除纯文史）
   物化地 → 工/理/理论+地理相关
   史地政 → 文/法/教/经管（纯文科）
   物生地 → 医/地理/环境
   等等 */
function infer_default_majors_from_subjects(subjects) {
	if (!subjects || subjects.length === 0) return null;
	const s									= new Set(subjects);

	const has_phy							= s.has('physics');
	const has_chem							= s.has('chemistry');
	const has_bio							= s.has('biology');
	const has_hist							= s.has('history');
	const has_pol							= s.has('politics');
	const has_geo							= s.has('geography');

	/* 纯理科组合（物化 + 理科任一）：STEM + 医 */
	if (has_phy && has_chem) return ['tech', 'medical', 'econ', 'agri'];

	/* 物化缺一：工科 + 理科为主，医学部分专业可报 */
	if (has_phy && !has_chem) return ['tech', 'econ'];
	if (!has_phy && has_chem) return ['medical', 'agri', 'econ'];

	/* 纯文科组合（史政地 / 有两科文） */
	if (has_hist && has_pol) return ['liberal', 'education', 'econ', 'art'];
	if (has_hist && has_geo) return ['liberal', 'education', 'econ'];

	/* 偏生物/地理（医学/环境/地理类） */
	if (has_bio && has_geo) return ['medical', 'agri', 'tech'];

	/* 默认全开 */
	return null;
}


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


/* 北京：批量查 beijing_group_majors，给每个 volunteer 挂上 group_majors 数组
   一次 SQL 查全部，避免 N+1 */
async function attach_beijing_group_majors(db, items) {
	if (!items || items.length === 0) return;

	/* 先收集所有唯一的 (school_code, group_code) */
	const keys = new Set();
	for (let it of items) {
		if (it.school_code && it.group_code) {
			keys.add(it.school_code + '|' + it.group_code);
		}
	}
	if (keys.size === 0) return;

	/* 用 IN (?,?,?...) 一次查全 — D1 单条 SQL 限制 100 个绑定参数，超了分批 */
	const key_list						= Array.from(keys);
	const map							= new Map();		// key -> majors[]

	const batch_size					= 40;
	for (let i = 0; i < key_list.length; i += batch_size) {
		const chunk						= key_list.slice(i, i + batch_size);
		const placeholders				= chunk.map(() => '(? || \'|\' || group_code) = ?').join(' OR ');
		/* 构造 SQL：WHERE (school_code || '|' || group_code) IN (?, ?...) 更简单 */
		const ph						= chunk.map(() => '?').join(',');
		const sql						= 'SELECT school_code, group_code, major_index, major_name, major_note, tuition, plan_count ' +
											'FROM beijing_group_majors ' +
											'WHERE (school_code || \'|\' || group_code) IN (' + ph + ') ' +
											'ORDER BY school_code, group_code, major_index';
		const res						= await db.prepare(sql).bind(...chunk).all();
		for (let r of (res.results || [])) {
			const k						= r.school_code + '|' + r.group_code;
			if (!map.has(k)) map.set(k, []);
			map.get(k).push({
				major_index:	r.major_index || '',
				major_name:		r.major_name || '',
				major_note:		r.major_note || '',
				tuition:		r.tuition,
				plan_count:		r.plan_count
			});
		}
	}

	/* 挂回 volunteer */
	for (let it of items) {
		const k							= (it.school_code || '') + '|' + (it.group_code || '');
		it.group_majors					= map.get(k) || [];
	}
}
