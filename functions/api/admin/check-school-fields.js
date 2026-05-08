// GET /api/admin/check-school-fields
import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const out = {};
	for (let p of ['shandong', 'zhejiang', 'beijing', 'jiangsu']) {
		const stats = await env.DB.prepare(
			'SELECT ' +
			'  COUNT(*) as total, ' +
			'  SUM(CASE WHEN school_city IS NOT NULL AND school_city != \'\' THEN 1 ELSE 0 END) as with_city, ' +
			'  SUM(CASE WHEN school_nature IS NOT NULL AND school_nature != \'\' THEN 1 ELSE 0 END) as with_nature ' +
			'FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025)'
		).bind(p).first();
		const samples = await env.DB.prepare(
			'SELECT school_name, school_city, school_nature FROM gaokao_scores WHERE province = ? AND year = 2025 LIMIT 5'
		).bind(p).all();
		out[p] = { stats, samples: samples.results };
	}
	return json_response(out);
}
