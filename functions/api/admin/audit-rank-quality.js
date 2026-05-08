// GET /api/admin/audit-rank-quality
// 抽样检查 4 省 min_rank 回填的准确性

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const tests = [
		{ p: 'shandong', subject: 'total' },
		{ p: 'zhejiang', subject: 'total' },
		{ p: 'beijing', subject: 'total' },
		{ p: 'jiangsu', subject: 'physics' }
	];

	const result = {};

	for (let t of tests) {
		const r = {};

		/* 拉 10 个不同分数段的真实样本（高分/中分/低分各几个）*/
		const samples = await env.DB.prepare(
			'SELECT school_name, group_name, min_score, min_rank FROM gaokao_scores WHERE province = ? AND year = 2025 AND min_rank IS NOT NULL ORDER BY min_rank LIMIT 1000'
		).bind(t.p).all();

		const all_rows = samples.results || [];

		/* 等距取样：第 1, 100, 200, 300, 500, 700, 800, 900, 950, 990 行 */
		const positions = [0, 50, 100, 200, 400, 600, 800, 900, 950, 990];
		const checks = [];
		for (let pos of positions) {
			if (pos >= all_rows.length) continue;
			const row = all_rows[pos];

			/* 用 segment 反查这个分数应该对应的位次 */
			const expected_seg = await env.DB.prepare(
				'SELECT score, rank FROM gaokao_segments WHERE province = ? AND year = 2025 AND subject_type = ? ORDER BY ABS(score - ?) LIMIT 1'
			).bind(t.p, t.subject, row.min_score).first();

			let diff_pct = null;
			if (expected_seg && expected_seg.rank > 0) {
				diff_pct = Math.round(Math.abs(row.min_rank - expected_seg.rank) * 100 / expected_seg.rank);
			}

			checks.push({
				school: row.school_name,
				group: (row.group_name || '').slice(0, 30),
				score: row.min_score,
				stored_rank: row.min_rank,
				expected_rank_from_segment: expected_seg ? expected_seg.rank : null,
				diff_pct: diff_pct
			});
		}

		r.subject_used = t.subject;
		r.sample_size = all_rows.length;
		r.checks = checks;
		result[t.p] = r;
	}

	return json_response(result);
}
