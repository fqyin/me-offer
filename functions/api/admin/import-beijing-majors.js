// POST /api/admin/import-beijing-majors
// body: { rows: [{...}, ...] }
// 一次写入一批专业明细
// 使用方式：本地 curl 分批 POST 全部 4586 行

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	let body;
	try {
		body = await context.request.json();
	} catch (e) {
		return json_response({ error: 'invalid json' }, 400);
	}

	const rows = body.rows || [];
	if (rows.length === 0) {
		return json_response({ error: 'no rows' }, 400);
	}
	if (rows.length > 50) {
		return json_response({ error: 'max 50 rows per batch' }, 400);
	}

	/* 第一次调用前先清空表（用 reset=1 触发） */
	if (body.reset) {
		await env.DB.prepare('DELETE FROM beijing_group_majors').run();
	}

	const stmts = [];
	for (let r of rows) {
		stmts.push(env.DB.prepare(
			'INSERT INTO beijing_group_majors (school_code, school_name, group_code, group_subject, major_index, major_name, major_note, tuition, plan_count, source_page) ' +
			'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
		).bind(
			r.school_code || '',
			r.school_name || '',
			r.group_code || '',
			r.group_subject || '',
			r.major_index || '',
			r.major_name || '',
			r.major_note || '',
			r.tuition || null,
			r.plan_count || null,
			r.source_page || null
		));
	}

	const results = await env.DB.batch(stmts);
	const inserted = results.reduce((sum, r) => sum + ((r.meta && r.meta.changes) || 0), 0);

	const total = await env.DB.prepare('SELECT COUNT(*) as n FROM beijing_group_majors').first();

	return json_response({
		ok: true,
		batch_inserted: inserted,
		current_total_rows: total.n
	});
}
