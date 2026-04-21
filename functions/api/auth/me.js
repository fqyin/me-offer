// Me Offer · 当前用户信息
// GET /api/auth/me
// Header: Authorization: Bearer tk_xxxxx
// Returns: { user_id, phone, nickname, avatar_url, created_at }

export async function onRequestGet(context) {
	const env								= context.env;
	const auth								= context.request.headers.get('Authorization') || '';
	const token								= auth.replace(/^Bearer\s+/, '').trim();

	if (!token) {
		return json_response({ error: 'unauthorized' }, 401);
	}

	const session							= await env.DB.prepare(
		'SELECT user_id, expires_at FROM user_sessions WHERE token = ?'
	).bind(token).first();

	if (!session) {
		return json_response({ error: 'invalid token' }, 401);
	}

	/* 检查是否过期 */
	if (session.expires_at && new Date(session.expires_at) < new Date()) {
		return json_response({ error: 'token expired' }, 401);
	}

	const user								= await env.DB.prepare(
		'SELECT id, phone, wx_openid, nickname, avatar_url, created_at, last_login_at FROM users WHERE id = ?'
	).bind(session.user_id).first();

	if (!user) {
		return json_response({ error: 'user not found' }, 404);
	}

	return json_response({
		user_id:		user.id,
		phone:			user.phone,
		nickname:		user.nickname,
		avatar_url:		user.avatar_url,
		wx_bound:		!!user.wx_openid,
		created_at:		user.created_at,
		last_login_at:	user.last_login_at
	});
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
		headers:	{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }
	});
}
