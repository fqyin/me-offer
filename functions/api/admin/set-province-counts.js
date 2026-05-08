// POST /api/admin/set-province-counts
// 一次性把 4 省的 chong/wen/bao 配置改成统一规则：
//   山东/浙江：3+3 模式 24/48/24 = 96
//   北京：院校专业组 8/14/8 = 30
//   江苏：3+1+2 模式 10/20/10 = 40

import { is_admin_secret, json_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	if (!is_admin_secret(context)) return json_response({ error: '未授权' }, 401);
	const env = context.env;

	const updates = [
		{ code: 'shandong', chong: 24, wen: 48, bao: 24 },
		{ code: 'zhejiang', chong: 24, wen: 48, bao: 24 },
		{ code: 'beijing',  chong: 8,  wen: 14, bao: 8  },
		{ code: 'jiangsu',  chong: 10, wen: 20, bao: 10 }
	];

	const results = [];
	for (let u of updates) {
		const r = await env.DB.prepare(
			'UPDATE provinces SET chong_count = ?, wen_count = ?, bao_count = ? WHERE code = ?'
		).bind(u.chong, u.wen, u.bao, u.code).run();
		results.push({ code: u.code, total: u.chong + u.wen + u.bao, changes: r.meta && r.meta.changes });
	}

	const verify = await env.DB.prepare(
		"SELECT code, chong_count, wen_count, bao_count, (chong_count + wen_count + bao_count) as total FROM provinces WHERE code IN ('shandong', 'zhejiang', 'beijing', 'jiangsu')"
	).all();

	return json_response({ updates: results, verify: verify.results });
}
