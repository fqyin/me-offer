// GET /api/admin/check-ppts - CEO 紧急排查最近的 ppt
import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);

	const url = new URL(context.request.url);
	const limit = parseInt(url.searchParams.get('limit') || '5');
	const ppt_id = parseInt(url.searchParams.get('id') || 0);

	const db = context.env.DB;

	if (ppt_id) {
		const row = await db.prepare(
			"SELECT id, title, subject, knowledge_point, slides_json, slide_count, source_file, topic_id, created_at, teacher_id FROM ppt_files WHERE id = ?"
		).bind(ppt_id).first();

		return json_response({ success: true, ppt: row });
	}

	const rows = await db.prepare(
		"SELECT id, title, subject, knowledge_point, slide_count, source_file, topic_id, created_at, teacher_id, created_by FROM ppt_files ORDER BY created_at DESC LIMIT ?"
	).bind(limit).all();

	return json_response({ success: true, ppts: rows.results || [] });
}
