// Me Offer · 删除方案
// POST /api/plans/delete
// Header: Authorization: Bearer tk_xxxxx
// body: { plan_id }

export async function onRequestPost(context) {
	const env								= context.env;
	const user								= await get_user_from_token(context);
	if (!user) return json_response({ error: 'unauthorized' }, 401);

	let body;
	try {
		body								= await context.request.json();
	} catch (e) {
		return json_response({ error: 'invalid json' }, 400);
	}
	const plan_id							= parseInt(body.plan_id || 0);
	if (!plan_id) return json_response({ error: 'missing plan_id' }, 400);

	const res								= await env.DB.prepare(
		'DELETE FROM user_plans WHERE id = ? AND user_id = ?'
	).bind(plan_id, user.id).run();

	return json_response({ deleted: res.meta.changes || 0 });
}


async function get_user_from_token(context) {
	const auth								= context.request.headers.get('Authorization') || '';
	const token								= auth.replace(/^Bearer\s+/, '').trim();
	if (!token) return null;
	const session							= await context.env.DB.prepare(
		'SELECT user_id FROM user_sessions WHERE token = ? AND (expires_at IS NULL OR datetime(expires_at) > datetime(\'now\'))'
	).bind(token).first();
	if (!session) return null;
	return { id: session.user_id };
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
		headers:	{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }
	});
}
