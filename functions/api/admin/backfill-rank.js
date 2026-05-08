// POST /api/admin/backfill-rank
// 用 gaokao_segments 反查回填 gaokao_scores 里缺失的 min_rank
// body: { province: 'zhejiang' | 'beijing' | 'jiangsu', subject_type: 'total'|'physics'|'history' (默认 'total'), year: 2025, dry_run: true }

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	let body;
	try { body = await context.request.json(); } catch (e) { return json_response({ error: 'invalid json' }, 400); }

	const province = body.province;
	const subject_type = body.subject_type || 'total';
	const year = parseInt(body.year || 2025);
	const segments_year = parseInt(body.segments_year || year);  /* 一分一段表年份，可与待补行年份不同 */
	const segments_province = body.segments_province || province;  /* 一分一段表来源省，可与待补行省不同（用 shandong segments 估 hebei）*/
	const dry_run = body.dry_run !== false;

	if (!province) return json_response({ error: '缺 province' }, 400);

	/* 1. 拉一分一段表（按分数→位次升序）*/
	const segs_res = await env.DB.prepare(
		'SELECT score, rank FROM gaokao_segments WHERE province = ? AND year = ? AND subject_type = ? ORDER BY score DESC'
	).bind(segments_province, segments_year, subject_type).all();

	const segs = segs_res.results || [];
	if (segs.length === 0) {
		return json_response({ error: '一分一段表无数据', province, year, subject_type });
	}

	/* 构建 score→rank 映射（用 Map）*/
	const score_to_rank = new Map();
	for (let s of segs) score_to_rank.set(s.score, s.rank);

	/* 排序的分数数组，用于线性插值 */
	const sorted_scores = segs.map(s => s.score).sort(function(a, b) { return a - b; });

	function lookup_rank(score) {
		/* 精确匹配 */
		if (score_to_rank.has(score)) return score_to_rank.get(score);
		/* 找最近的两个分数，线性插值 */
		let lower = null, upper = null;
		for (let s of sorted_scores) {
			if (s <= score) lower = s;
			if (s >= score && upper === null) { upper = s; break; }
		}
		if (lower === null && upper === null) return null;
		if (lower === null) return score_to_rank.get(upper);
		if (upper === null) return score_to_rank.get(lower);
		if (lower === upper) return score_to_rank.get(lower);
		const r1 = score_to_rank.get(lower);
		const r2 = score_to_rank.get(upper);
		const ratio = (score - lower) / (upper - lower);
		return Math.round(r1 + (r2 - r1) * ratio);
	}

	/* 2. 拉该省该年所有缺位次的 gaokao_scores 行 */
	const rows_res = await env.DB.prepare(
		'SELECT id, min_score FROM gaokao_scores WHERE province = ? AND year = ? AND (min_rank IS NULL OR min_rank = 0) AND min_score > 0'
	).bind(province, year).all();

	const rows = rows_res.results || [];

	/* 3. 计算每行的位次 */
	const updates = [];
	for (let r of rows) {
		const rank = lookup_rank(r.min_score);
		if (rank) updates.push({ id: r.id, score: r.min_score, rank: rank });
	}

	if (dry_run) {
		return json_response({
			dry_run: true,
			province, year, subject_type,
			segments_count: segs.length,
			rows_to_update: updates.length,
			sample_updates: updates.slice(0, 5),
			score_range: segs.length > 0 ? { min: sorted_scores[0], max: sorted_scores[sorted_scores.length - 1] } : null
		});
	}

	/* 4. 批量 UPDATE（D1 batch 限制每批 50 条左右安全）*/
	let updated = 0;
	const batch_size = 50;
	for (let i = 0; i < updates.length; i += batch_size) {
		const chunk = updates.slice(i, i + batch_size);
		const stmts = chunk.map(u => env.DB.prepare('UPDATE gaokao_scores SET min_rank = ? WHERE id = ?').bind(u.rank, u.id));
		await env.DB.batch(stmts);
		updated += chunk.length;
	}

	return json_response({
		ok: true,
		province, year, subject_type,
		segments_count: segs.length,
		updated: updated,
		sample_updates: updates.slice(0, 3)
	});
}

export async function onRequestGet() { return json_response({ error: 'use POST' }, 405); }
