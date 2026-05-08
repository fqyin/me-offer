// POST /api/admin/normalize-province
// 一次性脚本：把 gaokao_scores 里的中文 province 改为拼音
// 运行后即可删除此文件

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const map = {
		'北京':	'beijing',
		'浙江':	'zhejiang',
		'江苏':	'jiangsu',
		'河南':	'henan'
	};

	const before = await env.DB.prepare(
		'SELECT province, COUNT(*) as n FROM gaokao_scores GROUP BY province ORDER BY n DESC'
	).all();

	const updates = [];
	for (let cn in map) {
		const py = map[cn];
		const r = await env.DB.prepare('UPDATE gaokao_scores SET province = ? WHERE province = ?').bind(py, cn).run();
		updates.push({ from: cn, to: py, changed: r.meta && r.meta.changes });
	}

	const after = await env.DB.prepare(
		'SELECT province, COUNT(*) as n FROM gaokao_scores GROUP BY province ORDER BY n DESC'
	).all();

	return json_response({
		before:	before.results,
		updates: updates,
		after:	after.results
	});
}

export async function onRequestGet() {
	return json_response({ error: 'use POST' }, 405);
}
