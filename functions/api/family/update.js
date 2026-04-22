// Me Offer · 更新 Family 信息（家庭名、家训、省市等）
// POST /api/family/update
// Header: Authorization: Bearer tk_xxxxx
// body: { family_name, family_motto?, province?, city?, avatar_url? }

export async function onRequestPost(context) {
	const env								= context.env;
	const auth								= context.request.headers.get('Authorization') || '';
	const token								= auth.replace(/^Bearer\s+/, '').trim();

	if (!token) {
		return json_response({ error: 'unauthorized' }, 401);
	}

	const session							= await env.DB.prepare(
		'SELECT parent_id, family_id FROM parent_sessions WHERE token = ?'
	).bind(token).first();

	if (!session) {
		return json_response({ error: 'invalid token' }, 401);
	}

	let body;
	try {
		body								= await context.request.json();
	} catch (e) {
		return json_response({ error: 'invalid json' }, 400);
	}

	const family_name						= String(body.family_name || '').trim();
	const family_motto						= String(body.family_motto || '').trim();
	const province							= String(body.province || '').trim();
	const city								= String(body.city || '').trim();
	const avatar_url						= String(body.avatar_url || '').trim();

	if (!family_name) {
		return json_response({ error: '家庭名不能为空' }, 400);
	}

	if (family_name.length > 20) {
		return json_response({ error: '家庭名不能超过 20 字' }, 400);
	}

	/* 同时更新 parent 的 real_name 和 relation */
	const real_name							= String(body.real_name || '').trim();
	const relation							= String(body.relation || '').trim();

	await env.DB.prepare(
		'UPDATE families SET family_name = ?, family_motto = ?, province = ?, city = ?, avatar_url = ? WHERE id = ?'
	).bind(
		family_name,
		family_motto || null,
		province || null,
		city || null,
		avatar_url || null,
		session.family_id
	).run();

	if (real_name) {
		await env.DB.prepare(
			'UPDATE parents SET real_name = ?, relation = ? WHERE id = ?'
		).bind(
			real_name,
			relation || null,
			session.parent_id
		).run();
	}

	const family							= await env.DB.prepare(
		'SELECT id, family_name, family_motto, avatar_url, province, city, invite_code, vip_level FROM families WHERE id = ?'
	).bind(session.family_id).first();

	return json_response({ success: true, family: family });
}


function json_response(data, status) {
	return new Response(JSON.stringify(data), {
		status:		status || 200,
		headers:	{ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
	});
}


export async function onRequestOptions() {
	return new Response(null, {
		status:		204,
		headers:	{
			'Access-Control-Allow-Origin':	'*',
			'Access-Control-Allow-Methods':	'POST, OPTIONS',
			'Access-Control-Allow-Headers':	'Content-Type, Authorization'
		}
	});
}
