// GET /api/admin/check-universities
import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const schema = await env.DB.prepare("PRAGMA table_info(universities)").all();
	const total = await env.DB.prepare('SELECT COUNT(*) as n FROM universities').first();
	const stats = await env.DB.prepare(
		'SELECT ' +
		'  COUNT(*) as total, ' +
		'  SUM(CASE WHEN city IS NOT NULL AND city != \'\' THEN 1 ELSE 0 END) as with_city, ' +
		'  SUM(CASE WHEN tier IS NOT NULL AND tier != \'\' THEN 1 ELSE 0 END) as with_tier, ' +
		'  SUM(CASE WHEN nature IS NOT NULL AND nature != \'\' THEN 1 ELSE 0 END) as with_nature ' +
		'FROM universities'
	).first();
	const samples = await env.DB.prepare(
		'SELECT * FROM universities LIMIT 5'
	).all();

	/* 看 北京大学 在 universities 表里 code 是啥 */
	const bjdx = await env.DB.prepare(
		"SELECT * FROM universities WHERE name LIKE '%北京大学%' LIMIT 5"
	).all();

	/* 看 gaokao_scores 里北京大学的 school_code */
	const bjdx_in_scores = await env.DB.prepare(
		"SELECT DISTINCT school_code, school_name, province FROM gaokao_scores WHERE school_name LIKE '%北京大学%' LIMIT 10"
	).all();

	return json_response({
		schema: schema.results,
		total: total.n,
		stats,
		samples: samples.results,
		bjdx_in_universities: bjdx.results,
		bjdx_in_scores: bjdx_in_scores.results
	});
}
