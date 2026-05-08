// GET /api/admin/verify-province-filter?secret=xxx
// 验证：generate_96 fix 后返回的学校是不是真的来自指定省

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	/* 跑一遍 580 分山东物理 */
	const r = await fetch('https://me-offer.pages.dev/api/generate_96', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			score: 580, subject_type: 'physics',
			subjects: ['physics','chemistry','biology'],
			province: 'shandong'
		})
	});
	const d = await r.json();
	const vols = d.volunteers || [];

	/* 抽 5 个 school_code，去 gaokao_scores 查每个 code 在哪些省出现 */
	const sample = vols.slice(0, 10).map(v => v.school_code);
	const checks = [];
	for (let code of sample) {
		const rows = await env.DB.prepare(
			'SELECT province, COUNT(*) as n FROM gaokao_scores WHERE school_code = ? GROUP BY province'
		).bind(code).all();
		checks.push({ code: code, in_provinces: rows.results });
	}

	/* 统计推荐里 plan_count + min_rank 范围 */
	const ranks = vols.map(v => v.min_rank).filter(r => r);
	const stats = {
		total: vols.length,
		min_rank_low: Math.min(...ranks),
		min_rank_high: Math.max(...ranks),
		school_codes_sample: sample,
		school_in_provinces: checks
	};

	return json_response(stats);
}
