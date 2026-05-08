// GET /api/admin/check-segments
import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const schema = await env.DB.prepare("PRAGMA table_info(gaokao_segments)").all();

	const total = await env.DB.prepare('SELECT COUNT(*) as n FROM gaokao_segments').first();

	const by_pv = await env.DB.prepare(
		'SELECT province, COUNT(*) as n FROM gaokao_segments GROUP BY province ORDER BY n DESC'
	).all().catch(e => ({ error: e.message }));

	const by_pv_yr = await env.DB.prepare(
		'SELECT province, year, subject_type, COUNT(*) as n FROM gaokao_segments GROUP BY province, year, subject_type ORDER BY province, year, subject_type'
	).all().catch(e => ({ error: e.message }));

	const by_yr = await env.DB.prepare(
		'SELECT year, subject_type, COUNT(*) as n FROM gaokao_segments GROUP BY year, subject_type ORDER BY year, subject_type'
	).all();

	return json_response({
		schema: schema.results,
		total: total.n,
		by_province: by_pv,
		by_pv_year_subject: by_pv_yr,
		by_year_subject: by_yr.results
	});
}
