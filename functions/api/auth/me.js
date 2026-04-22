// Me Offer · 当前家长 + Family + 孩子列表
// GET /api/auth/me
// Header: Authorization: Bearer tk_xxxxx

export async function onRequestGet(context) {
	const env								= context.env;
	const auth								= context.request.headers.get('Authorization') || '';
	const token								= auth.replace(/^Bearer\s+/, '').trim();

	if (!token) {
		return json_response({ error: 'unauthorized' }, 401);
	}

	const session							= await env.DB.prepare(
		'SELECT parent_id, family_id, current_student_id, expires_at FROM parent_sessions WHERE token = ?'
	).bind(token).first();

	if (!session) {
		return json_response({ error: 'invalid token' }, 401);
	}

	if (session.expires_at && new Date(session.expires_at) < new Date()) {
		return json_response({ error: 'token expired' }, 401);
	}

	const parent							= await env.DB.prepare(
		'SELECT id, family_id, phone, wx_openid, nickname, real_name, relation, avatar_url, is_owner, created_at, last_login_at FROM parents WHERE id = ?'
	).bind(session.parent_id).first();

	if (!parent) {
		return json_response({ error: 'parent not found' }, 404);
	}

	const family							= await env.DB.prepare(
		'SELECT id, family_name, family_motto, avatar_url, province, city, invite_code, vip_level, vip_expires_at, total_paid, created_at FROM families WHERE id = ?'
	).bind(session.family_id).first();

	const students_res						= await env.DB.prepare(
		'SELECT id, real_name, nickname, gender, avatar_url, grade, province, school_name, class_name, target_univ, target_score, subject_type, subjects, created_at FROM students WHERE family_id = ? AND active = 1 ORDER BY id ASC'
	).bind(session.family_id).all();

	return json_response({
		parent:				parent,
		family:				family,
		students:			students_res.results || [],
		current_student_id:	session.current_student_id,
		profile_complete:	!!parent.real_name && (students_res.results || []).length > 0
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
		headers:	{
			'Access-Control-Allow-Origin':	'*',
			'Access-Control-Allow-Methods':	'GET, OPTIONS',
			'Access-Control-Allow-Headers':	'Content-Type, Authorization'
		}
	});
}
