// POST /api/admin/backfill-school-meta
// 用 school_name 匹配 universities 表，回填 gaokao_scores.school_city / school_nature
// 同时给 generate_96 的 LEFT JOIN 修个临时 view 也行，但更稳的是直接物化字段

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const url = new URL(context.request.url);
	const dry_run = url.searchParams.get('dry') === '1';

	/* 1. 拉所有学校元数据（按 name 索引）*/
	const unis = await env.DB.prepare(
		'SELECT name, city, tier, nature FROM universities WHERE name IS NOT NULL'
	).all();
	const meta_map = {};
	for (let u of (unis.results || [])) {
		meta_map[u.name] = u;
	}

	/* 2. 拉 gaokao_scores 4 省所有 distinct school_name */
	const provinces = ['shandong', 'zhejiang', 'beijing', 'jiangsu'];
	const matched_log = [];
	const unmatched = [];
	let total_rows_to_update = 0;

	for (let p of provinces) {
		const schools_q = await env.DB.prepare(
			'SELECT DISTINCT school_name FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025)'
		).bind(p).all();
		const schools = (schools_q.results || []).map(r => r.school_name);

		let p_matched = 0;
		const p_unmatched = [];
		for (let name of schools) {
			let meta = meta_map[name];
			if (!meta) {
				/* 模糊匹配：去掉括号注释后 retry */
				const stripped = name.replace(/\(.*$/, '').replace(/（.*$/, '').trim();
				meta = meta_map[stripped];
			}
			if (meta) {
				p_matched++;
			} else {
				p_unmatched.push(name);
			}
		}

		matched_log.push({
			province: p,
			total_schools: schools.length,
			matched: p_matched,
			unmatched_count: p_unmatched.length,
			unmatched_sample: p_unmatched.slice(0, 5)
		});
		unmatched.push(...p_unmatched);
	}

	if (dry_run) {
		return json_response({
			dry_run: true,
			matched_summary: matched_log,
			total_unmatched_unique: unmatched.length
		});
	}

	/* 3. 真跑：用 UPDATE ... FROM (CTE) 一次性回填 */
	let total_updated = 0;
	for (let p of provinces) {
		const schools_q = await env.DB.prepare(
			'SELECT DISTINCT school_name FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025)'
		).bind(p).all();

		const stmts = [];
		for (let row of (schools_q.results || [])) {
			let meta = meta_map[row.school_name];
			if (!meta) {
				const stripped = row.school_name.replace(/\(.*$/, '').replace(/（.*$/, '').trim();
				meta = meta_map[stripped];
			}
			if (!meta) continue;

			stmts.push(env.DB.prepare(
				'UPDATE gaokao_scores SET school_city = ?, school_nature = ? WHERE province = ? AND school_name = ? AND year IN (2024, 2025)'
			).bind(meta.city || '', meta.nature || '', p, row.school_name));
		}

		/* 分批 batch */
		const batch_size = 30;
		for (let i = 0; i < stmts.length; i += batch_size) {
			const chunk = stmts.slice(i, i + batch_size);
			const res = await env.DB.batch(chunk);
			for (let r of res) {
				if (r.meta && r.meta.changes) total_updated += r.meta.changes;
			}
		}
	}

	return json_response({
		ok: true,
		matched_summary: matched_log,
		total_rows_updated: total_updated
	});
}

export async function onRequestGet() { return json_response({ error: 'use POST with ?dry=1 for preview' }, 405); }
