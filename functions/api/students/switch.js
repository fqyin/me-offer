// Me Offer · 切换当前陪跑的孩子
// POST /api/students/switch
// Header: Authorization: Bearer tk_xxxxx
// body: { student_id }

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

	const student_id						= parseInt(body.student_id);

	if (!student_id) {
		return json_response({ error: 'student_id 不能为空' }, 400);
	}

	/* 验证这个 student 属于当前 family */
	const student							= await env.DB.prepare(
		'SELECT id, real_name, grade, avatar_url FROM students WHERE id = ? AND family_id = ? AND active = 1'
	).bind(student_id, session.family_id).first();

	if (!student) {
		return json_response({ error: '孩子档案不存在或不属于你的家庭' }, 403);
	}

	await env.DB.prepare(
		'UPDATE parent_sessions SET current_student_id = ? WHERE token = ?'
	).bind(student_id, token).run();

	return json_response({ success: true, current_student: student });
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
