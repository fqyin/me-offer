// Me Offer · admin 家长用户列表（供 me-uni admin 后台聚合）
//
// GET /api/admin/users-list?limit=200&q=<search>
//   Header: X-Admin-Secret
//   返回: { ok, total, users: [{user_id, phone, name, created_at,
//                              ip, country, region, city, source, ...}] }


export async function onRequestGet(context) {
	const env = context.env;
	const secret = context.request.headers.get('X-Admin-Secret') || '';
	const expected = env.ADMIN_PORTAL_SECRET || 'Meuni2026';

	if (secret !== expected) {
		return cors_json({ ok: false, error: '未授权' }, 401, context.request);
	}

	const url = new URL(context.request.url);
	const limit = Math.min(parseInt(url.searchParams.get('limit') || 200) || 200, 500);
	const q = String(url.searchParams.get('q') || '').slice(0, 100);

	const db = env.DB;
	const result = { ok: true };

	try {
		let where = '';
		const params = [];

		if (q) {
			where = ' WHERE (p.phone LIKE ? OR p.nickname LIKE ?)';
			const like = '%' + q + '%';
			params.push(like, like);
		}

		const rs = await db.prepare(
			'SELECT p.id, p.phone, p.nickname, p.real_name, p.created_at, p.family_id, ' +
			'rm.ip, rm.country, rm.region, rm.city, rm.timezone, rm.user_agent, rm.source ' +
			'FROM parents p LEFT JOIN user_register_meta rm ON rm.user_id = CAST(p.id AS TEXT) ' +
			where + ' ORDER BY p.created_at DESC LIMIT ?'
		).bind(...params, limit).all();

		const rows = rs.results || [];
		const users = [];

		for (let r of rows) {
			let total_paid = 0;
			let order_count = 0;
			let app_count = 0;

			/* 家庭付费总额 */
			try {
				const f = await db.prepare('SELECT total_paid FROM families WHERE id = ?').bind(r.family_id).first();
				total_paid = (f && f.total_paid) || 0;
			} catch (e) {}

			/* 孩子数（作为"申请数"） */
			try {
				const s = await db.prepare('SELECT COUNT(*) as c FROM students WHERE family_id = ? AND active = 1').bind(r.family_id).first();
				app_count = (s && s.c) || 0;
			} catch (e) {}

			users.push({
				user_id:		String(r.id),
				phone:			r.phone || '',
				email:			'',
				name:			r.real_name || r.nickname || '',
				created_at:		r.created_at,
				order_count:	order_count,
				total_paid:		total_paid,
				app_count:		app_count,
				offer_count:	0,
				essay_count:	0,
				completion:		0,
				ip:				r.ip || '',
				country:		r.country || '',
				region:			r.region || '',
				city:			r.city || '',
				timezone:		r.timezone || '',
				user_agent:		r.user_agent || '',
				source:			r.source || 'me_offer'
			});
		}

		result.users = users;
		result.total = users.length;
		result.all_total = users.length;
		result.source_counts = { me_offer: users.length };
	}
	catch (e) {
		result.ok = false;
		result.error = String(e).slice(0, 300);
		result.users = [];
	}

	return cors_json(result, 200, context.request);
}


export async function onRequestOptions(context) {
	return new Response(null, { status: 204, headers: cors_headers(context.request) });
}


function cors_json(obj, status, request) {
	return new Response(JSON.stringify(obj), {
		status:	status || 200,
		headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, cors_headers(request))
	});
}


function cors_headers(request) {
	const origin = request.headers.get('Origin') || '';
	const ok = ['https://admin.me-uni.com', 'http://admin.me-uni.com', 'https://www.me-uni.com', 'https://me-offer.cn'];
	const allow = ok.indexOf(origin) >= 0 ? origin : 'https://admin.me-uni.com';

	return {
		'Access-Control-Allow-Origin':		allow,
		'Access-Control-Allow-Methods':		'GET, OPTIONS',
		'Access-Control-Allow-Headers':		'Content-Type, X-Admin-Secret',
		'Access-Control-Max-Age':			'86400'
	};
}
