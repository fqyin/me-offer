// POST /api/admin/init-beijing-group-majors
// 创建 beijing_group_majors 表
// 一行 = 一个专业组里的一个专业

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	/* 表结构：
	   - school_code:   1023（北京招办院校代码，跟 gaokao_scores.school_code 对得上）
	   - school_name:   清华大学
	   - group_code:    01 / 02 / 03
	   - group_subject: '不限' / '物理＋化学' / '历史' 等
	   - major_index:   01 / 02 / 06 — 组内专业序号
	   - major_name:    '化学（强基）'
	   - major_note:    '（5年制）' '（中外合作办学）' 等附注
	   - tuition:       10000
	   - plan_count:    3 — 在京计划人数（如有）
	   - source_page:   3 — 源 PDF 页码，便于回查 */

	const create_sql = `
		CREATE TABLE IF NOT EXISTS beijing_group_majors (
			id            INTEGER PRIMARY KEY AUTOINCREMENT,
			school_code   TEXT NOT NULL,
			school_name   TEXT,
			group_code    TEXT,
			group_subject TEXT,
			major_index   TEXT,
			major_name    TEXT,
			major_note    TEXT,
			tuition       INTEGER,
			plan_count    INTEGER,
			source_page   INTEGER,
			created_at    TEXT DEFAULT (datetime('now'))
		)
	`;

	await env.DB.prepare(create_sql).run();

	const idx_school = await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_bjgm_school ON beijing_group_majors(school_code)').run();
	const idx_group = await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_bjgm_school_group ON beijing_group_majors(school_code, group_code)').run();

	const verify = await env.DB.prepare("PRAGMA table_info(beijing_group_majors)").all();
	const count = await env.DB.prepare("SELECT COUNT(*) as n FROM beijing_group_majors").first();

	return json_response({
		ok: true,
		schema: verify.results,
		current_rows: count.n
	});
}
