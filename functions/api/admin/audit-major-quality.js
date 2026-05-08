// GET /api/admin/audit-major-quality
// 检查 group_name 字段是否包含真实可读的专业名

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const provinces = ['shandong', 'zhejiang', 'beijing', 'jiangsu'];
	const result = {};

	for (let p of provinces) {
		const r = {};

		const total = await env.DB.prepare(
			'SELECT COUNT(*) as n FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025)'
		).bind(p).first();

		/* 找垃圾专业名：纯数字、单字母、空、太短的 */
		const garbage = await env.DB.prepare(
			"SELECT COUNT(*) as n FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025) AND " +
			"(group_name IS NULL OR group_name = '' OR LENGTH(group_name) < 4 OR " +
			"group_name GLOB '[0-9]*' AND group_name NOT GLOB '*[一-龥]*')"
		).bind(p).first();

		/* 找无意义"01" "02" 这种纯数字编号 */
		const numeric_only = await env.DB.prepare(
			"SELECT COUNT(*) as n FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025) AND " +
			"group_name GLOB '[0-9]*' AND group_name NOT GLOB '*[一-龥]*' AND group_name NOT GLOB '*[a-zA-Z]*'"
		).bind(p).first();

		/* 抽 10 个真实样本 */
		const samples = await env.DB.prepare(
			'SELECT school_name, group_name FROM gaokao_scores WHERE province = ? AND year = 2025 ORDER BY RANDOM() LIMIT 10'
		).bind(p).all();

		/* 看 top 10 学校代码对应学校名（验证 universities JOIN 完整度）*/
		const join_check = await env.DB.prepare(
			'SELECT s.school_code, s.school_name, u.city, u.tier, u.nature ' +
			'FROM gaokao_scores s LEFT JOIN universities u ON s.school_code = u.code ' +
			'WHERE s.province = ? AND s.year = 2025 GROUP BY s.school_code LIMIT 10'
		).bind(p).all();

		const join_filled = (join_check.results || []).filter(j => j.city || j.tier || j.nature).length;

		r.total = total.n;
		r.garbage_count = garbage.n;
		r.garbage_pct = Math.round(garbage.n * 100 / total.n);
		r.numeric_only_count = numeric_only.n;
		r.numeric_only_pct = Math.round(numeric_only.n * 100 / total.n);
		r.universities_join_filled_pct = Math.round(join_filled * 100 / Math.max(1, (join_check.results || []).length));
		r.samples = samples.results;
		r.join_samples = join_check.results;

		result[p] = r;
	}

	return json_response(result);
}
