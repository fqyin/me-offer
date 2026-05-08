// POST /api/admin/open-provinces
// 把 4 省 data_status 设为 complete

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const codes = ['zhejiang', 'beijing', 'jiangsu', 'hebei'];
	const before = await env.DB.prepare(
		"SELECT code, name, data_status FROM provinces WHERE code IN ('zhejiang', 'beijing', 'jiangsu', 'hebei')"
	).all();

	const updates = [];
	for (let c of codes) {
		const r = await env.DB.prepare(
			"UPDATE provinces SET data_status = 'complete' WHERE code = ?"
		).bind(c).run();
		updates.push({ code: c, changed: r.meta && r.meta.changes });
	}

	const after = await env.DB.prepare(
		"SELECT code, name, data_status FROM provinces WHERE code IN ('zhejiang', 'beijing', 'jiangsu', 'hebei', 'shandong') ORDER BY name"
	).all();

	return json_response({
		before: before.results,
		updates,
		after: after.results
	});
}

export async function onRequestGet() { return json_response({ error: 'use POST' }, 405); }
