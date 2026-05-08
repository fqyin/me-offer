// GET /api/admin/check-province-quality?p=shandong
import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const url = new URL(context.request.url);
	const p = url.searchParams.get('p') || 'shandong';

	try {
		const stats = await env.DB.prepare(
			'SELECT ' +
			'  COUNT(*) as total, ' +
			'  SUM(CASE WHEN min_rank IS NOT NULL AND min_rank > 0 THEN 1 ELSE 0 END) as with_rank, ' +
			'  SUM(CASE WHEN min_score IS NOT NULL AND min_score > 0 THEN 1 ELSE 0 END) as with_score, ' +
			'  SUM(CASE WHEN group_name IS NOT NULL AND group_name != \'\' THEN 1 ELSE 0 END) as with_group_name, ' +
			'  SUM(CASE WHEN group_code IS NOT NULL AND group_code != \'\' THEN 1 ELSE 0 END) as with_group_code, ' +
			'  SUM(CASE WHEN school_code IS NOT NULL AND school_code != \'\' THEN 1 ELSE 0 END) as with_school_code, ' +
			'  SUM(CASE WHEN subject_require IS NOT NULL AND subject_require != \'\' THEN 1 ELSE 0 END) as with_subject ' +
			'FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025)'
		).bind(p).first();

		if (stats.total === 0) {
			return json_response({ province: p, total: 0 });
		}

		const sample = await env.DB.prepare(
			'SELECT year, school_code, school_name, group_code, group_name, subject_require, min_score, min_rank, plan_count, subject_type ' +
			'FROM gaokao_scores WHERE province = ? AND year = 2025 LIMIT 3'
		).bind(p).all();

		return json_response({
			province: p,
			total: stats.total,
			rank_pct: Math.round(stats.with_rank * 100 / stats.total),
			score_pct: Math.round(stats.with_score * 100 / stats.total),
			group_name_pct: Math.round(stats.with_group_name * 100 / stats.total),
			group_code_pct: Math.round(stats.with_group_code * 100 / stats.total),
			school_code_pct: Math.round(stats.with_school_code * 100 / stats.total),
			subject_pct: Math.round(stats.with_subject * 100 / stats.total),
			samples: sample.results
		});
	} catch (e) {
		return json_response({ error: 'sql failed: ' + e.message }, 500);
	}
}
