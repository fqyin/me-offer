// Me Offer · 添加孩子到家庭
// POST /api/students/add
// Header: Authorization: Bearer tk_xxxxx
// body: { real_name, nickname?, gender, grade, province?, school_name?, target_univ?, target_score?, subject_type?, subjects? }

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

	const real_name							= String(body.real_name || '').trim();
	const nickname							= String(body.nickname || '').trim();
	const gender							= String(body.gender || '').trim();
	const grade								= String(body.grade || '').trim();
	const province							= String(body.province || '').trim();
	const school_name						= String(body.school_name || '').trim();
	const class_name						= String(body.class_name || '').trim();
	const target_univ						= String(body.target_univ || '').trim();
	const target_score						= parseInt(body.target_score) || null;
	const subject_type						= String(body.subject_type || '').trim();
	const subjects							= body.subjects ? JSON.stringify(body.subjects) : null;
	const birthday							= String(body.birthday || '').trim();

	if (!real_name) {
		return json_response({ error: '孩子姓名不能为空' }, 400);
	}

	if (!grade) {
		return json_response({ error: '请选择年级' }, 400);
	}

	/* 一个家庭最多 3 个孩子 */
	const count_res							= await env.DB.prepare(
		'SELECT COUNT(*) as cnt FROM students WHERE family_id = ? AND active = 1'
	).bind(session.family_id).first();

	if (count_res && count_res.cnt >= 3) {
		return json_response({ error: '每个家庭最多添加 3 个孩子档案' }, 400);
	}

	const res								= await env.DB.prepare(
		'INSERT INTO students (family_id, real_name, nickname, gender, grade, province, school_name, class_name, target_univ, target_score, subject_type, subjects, birthday, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime(\'now\'))'
	).bind(
		session.family_id,
		real_name,
		nickname || null,
		gender || null,
		grade,
		province || null,
		school_name || null,
		class_name || null,
		target_univ || null,
		target_score,
		subject_type || null,
		subjects,
		birthday || null
	).run();

	const new_student_id					= res.meta.last_row_id;

	/* 自动切换到新添加的孩子 */
	await env.DB.prepare(
		'UPDATE parent_sessions SET current_student_id = ? WHERE token = ?'
	).bind(new_student_id, token).run();

	const student							= await env.DB.prepare(
		'SELECT id, real_name, nickname, gender, avatar_url, grade, province, school_name, target_univ, target_score, subject_type, subjects, created_at FROM students WHERE id = ?'
	).bind(new_student_id).first();

	return json_response({ success: true, student: student });
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
