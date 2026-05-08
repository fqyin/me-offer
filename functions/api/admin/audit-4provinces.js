// GET /api/admin/audit-4provinces
// 4 省数据完整性体检报告

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const provinces = ['shandong', 'zhejiang', 'beijing', 'jiangsu'];
	const result = {};

	for (let p of provinces) {
		const r = {};

		/* 1. provinces 表状态 */
		r.province_status = await env.DB.prepare(
			'SELECT code, name, data_status, reform_type, chong_count, wen_count, bao_count FROM provinces WHERE code = ?'
		).bind(p).first();

		/* 2. segments 覆盖情况 */
		const segs = await env.DB.prepare(
			'SELECT year, subject_type, COUNT(*) as n, MIN(score) as min_s, MAX(score) as max_s, MIN(rank) as min_r, MAX(rank) as max_r FROM gaokao_segments WHERE province = ? GROUP BY year, subject_type'
		).bind(p).all();
		r.segments = segs.results;

		/* 3. segments 单调性检查 —— 每个 (year, subject_type) 单独检查 */
		const seg_groups_q = await env.DB.prepare(
			'SELECT DISTINCT year, subject_type FROM gaokao_segments WHERE province = ?'
		).bind(p).all();
		const mono_results = [];
		for (let g of (seg_groups_q.results || [])) {
			const seg_q = await env.DB.prepare(
				'SELECT score, rank FROM gaokao_segments WHERE province = ? AND year = ? AND subject_type = ? ORDER BY score DESC'
			).bind(p, g.year, g.subject_type).all();
			let viols = 0;
			let last = 0;
			for (let s of (seg_q.results || [])) {
				if (s.rank < last) viols++;
				last = s.rank;
			}
			mono_results.push({ year: g.year, subject_type: g.subject_type, rows: (seg_q.results || []).length, violations: viols });
		}
		r.segments_monotonicity = mono_results;

		/* 4. gaokao_scores 字段完整度（2024-2025）*/
		const scores_stats = await env.DB.prepare(
			'SELECT ' +
			'  COUNT(*) as total, ' +
			'  SUM(CASE WHEN min_rank IS NOT NULL AND min_rank > 0 THEN 1 ELSE 0 END) as with_rank, ' +
			'  SUM(CASE WHEN min_score IS NOT NULL AND min_score > 0 THEN 1 ELSE 0 END) as with_score, ' +
			'  SUM(CASE WHEN school_name IS NOT NULL AND school_name != \'\' THEN 1 ELSE 0 END) as with_school, ' +
			'  SUM(CASE WHEN group_name IS NOT NULL AND group_name != \'\' THEN 1 ELSE 0 END) as with_group, ' +
			'  COUNT(DISTINCT school_name) as schools, ' +
			'  COUNT(DISTINCT school_code) as school_codes ' +
			'FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025)'
		).bind(p).first();
		r.scores_quality = scores_stats;

		/* 5. 抽 5 样本看真实结构 */
		const samples = await env.DB.prepare(
			'SELECT year, school_name, group_name, subject_require, min_score, min_rank, plan_count FROM gaokao_scores WHERE province = ? AND year = 2025 AND min_rank IS NOT NULL ORDER BY min_rank LIMIT 5'
		).bind(p).all();
		r.top_samples = samples.results;

		/* 6. 关键参考点核对（500 分回查 segment 看 rank）*/
		const ref_pts = [];
		for (let score of [600, 550, 500, 450, 400]) {
			/* 找最接近此分数的 segment */
			const subject_to_use = (p === 'shandong' || p === 'beijing' || p === 'zhejiang') ? 'total' : 'physics';
			const closest = await env.DB.prepare(
				'SELECT score, rank FROM gaokao_segments WHERE province = ? AND year = 2025 AND subject_type = ? ORDER BY ABS(score - ?) LIMIT 1'
			).bind(p, subject_to_use, score).first();
			ref_pts.push({ query_score: score, subject: subject_to_use, found: closest });
		}
		r.reference_points = ref_pts;

		result[p] = r;
	}

	return json_response(result);
}
