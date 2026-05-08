// POST /api/admin/revert-hebei
// 紧急回滚：清掉河北所有用山东 segments 估算的假位次，关闭河北开放状态

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const before = await env.DB.prepare(
		'SELECT COUNT(*) as n FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025) AND min_rank IS NOT NULL'
	).bind('hebei').first();

	/* 1. 清空 hebei 2024-2025 的 min_rank（这些都是山东 segments 估算出来的假数据）*/
	const r1 = await env.DB.prepare(
		'UPDATE gaokao_scores SET min_rank = NULL WHERE province = ? AND year IN (2024, 2025)'
	).bind('hebei').run();

	/* 2. 关闭河北开放 */
	const r2 = await env.DB.prepare(
		"UPDATE provinces SET data_status = 'pending' WHERE code = 'hebei'"
	).run();

	const after_status = await env.DB.prepare(
		"SELECT code, name, data_status FROM provinces WHERE code = 'hebei'"
	).first();

	const after_rank = await env.DB.prepare(
		'SELECT COUNT(*) as n FROM gaokao_scores WHERE province = ? AND year IN (2024, 2025) AND min_rank IS NOT NULL'
	).bind('hebei').first();

	return json_response({
		ok: true,
		fake_ranks_cleared: r1.meta && r1.meta.changes,
		before_with_rank: before.n,
		after_with_rank: after_rank.n,
		province_status: after_status,
		open_provinces: 'shandong, zhejiang, beijing, jiangsu (河北已撤回)'
	});
}

export async function onRequestGet() { return json_response({ error: 'use POST' }, 405); }
