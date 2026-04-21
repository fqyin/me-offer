// Me Offer · 用户登录（MVP 版 · 手机号一键登录）
// POST /api/auth/login
// body: { phone: '13800001234' }
// Returns: { user_id, token, is_new_user, nickname, avatar_url }
//
// 测试期：不发短信，直接用手机号登录（手机号即身份）
// 正式版：需要发短信验证码，再验证

export async function onRequestPost(context) {
	const env								= context.env;
	let body;
	try {
		body								= await context.request.json();
	} catch (e) {
		return json_response({ error: 'invalid json' }, 400);
	}

	const phone								= String(body.phone || '').trim();

	if (!/^1[3-9]\d{9}$/.test(phone)) {
		return json_response({ error: '请输入正确的 11 位手机号' }, 400);
	}

	/* 查有没有这个用户 */
	let user								= await env.DB.prepare(
		'SELECT id, phone, nickname, avatar_url FROM users WHERE phone = ?'
	).bind(phone).first();

	let is_new_user							= false;
	if (!user) {
		/* 新用户 · 自动注册 */
		const res							= await env.DB.prepare(
			'INSERT INTO users (phone, nickname, created_at, last_login_at) VALUES (?, ?, datetime(\'now\'), datetime(\'now\'))'
		).bind(phone, '用户' + phone.slice(-4)).run();
		const new_id						= res.meta.last_row_id;
		user								= { id: new_id, phone: phone, nickname: '用户' + phone.slice(-4), avatar_url: null };
		is_new_user							= true;
	} else {
		/* 老用户 · 更新 last_login_at */
		await env.DB.prepare(
			'UPDATE users SET last_login_at = datetime(\'now\') WHERE id = ?'
		).bind(user.id).run();
	}

	/* 生成 session token（30 天有效） */
	const token								= 'tk_' + crypto.randomUUID().replace(/-/g, '');
	const expires_at						= new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();

	await env.DB.prepare(
		'INSERT INTO user_sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
	).bind(token, user.id, expires_at).run();

	return json_response({
		user_id:		user.id,
		token:			token,
		is_new_user:	is_new_user,
		nickname:		user.nickname,
		phone:			user.phone,
		avatar_url:		user.avatar_url
	});
}


function json_response(data, status) {
	return new Response(JSON.stringify(data), {
		status:		status || 200,
		headers:	{
			'Content-Type':		'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		}
	});
}


export async function onRequestOptions() {
	return new Response(null, {
		status:		204,
		headers:	{
			'Access-Control-Allow-Origin':	'*',
			'Access-Control-Allow-Methods':	'POST, OPTIONS',
			'Access-Control-Allow-Headers':	'Content-Type'
		}
	});
}
