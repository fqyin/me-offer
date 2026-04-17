// Me Offer · Waitlist 邮箱收集 API
// POST /api/waitlist  body: { email, type, form_data? }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const email								= (body.email || '').trim();
	const type								= body.type || 'launch';
	const form_data							= body.form_data ? JSON.stringify(body.form_data) : null;

	if (email.length < 5 || !email.includes('@')) {
		return json_response({error: '邮箱格式错误'}, 400);
	}

	const allowed_types						= ['launch', 'kaoyan', 'gongwuyuan', 'result'];
	if (!allowed_types.includes(type)) {
		return json_response({error: 'invalid type'}, 400);
	}

	try {
		await env.DB.prepare(`
			INSERT OR IGNORE INTO waitlist (email, type, form_data, referrer, created_at)
			VALUES (?, ?, ?, ?, datetime('now'))
		`).bind(email, type, form_data, request.headers.get('referer') || '').run();
	} catch (e) {
		return json_response({error: 'db error'}, 500);
	}

	return json_response({success: true});
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
