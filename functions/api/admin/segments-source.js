import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const r = await env.DB.prepare(
		'SELECT province, year, subject_type, source_url, COUNT(*) as n FROM gaokao_segments GROUP BY province, year, subject_type, source_url'
	).all();
	return json_response({ sources: r.results });
}
