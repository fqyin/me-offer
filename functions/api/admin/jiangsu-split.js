// GET /api/admin/jiangsu-split
import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestGet(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	/* 江苏 scores 按 subject_require 分组 */
	const r1 = await env.DB.prepare(
		'SELECT subject_require, COUNT(*) as n FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025) GROUP BY subject_require ORDER BY n DESC LIMIT 20'
	).bind('jiangsu').all();

	/* 江苏样本 */
	const r2 = await env.DB.prepare(
		'SELECT school_name, group_name, subject_require, min_score, min_rank FROM gaokao_scores WHERE province = ? AND year = 2025 LIMIT 5'
	).bind('jiangsu').all();

	return json_response({
		jiangsu_subject_groups: r1.results,
		jiangsu_samples: r2.results
	});
}
