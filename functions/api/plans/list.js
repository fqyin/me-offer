// Me Offer · 列出我的所有方案
// GET /api/plans/list
// Header: Authorization: Bearer tk_xxxxx
// Returns: { plans: [{ plan_id, plan_name, score, rank, subjects, volunteer_count, status, updated_at }] }

export async function onRequestGet(context) {
	const env								= context.env;
	const user								= await get_user_from_token(context);
	if (!user) return json_response({ error: 'unauthorized' }, 401);

	const rows								= await env.DB.prepare(`
		SELECT id, plan_name, score, rank, province, subjects_json, volunteers_json, status, created_at, updated_at
		FROM user_plans
		WHERE user_id = ?
		ORDER BY updated_at DESC
		LIMIT 20
	`).bind(user.id).all();

	const plans								= (rows.results || []).map(function(r) {
		let vol_count						= 0;
		try {
			const vols						= JSON.parse(r.volunteers_json || '[]');
			vol_count						= Array.isArray(vols) ? vols.length : 0;
		} catch (e) {}
		let subjects						= [];
		try {
			subjects						= JSON.parse(r.subjects_json || '[]');
		} catch (e) {}
		return {
			plan_id:		r.id,
			plan_name:		r.plan_name,
			score:			r.score,
			rank:			r.rank,
			province:		r.province,
			subjects:		subjects,
			volunteer_count:vol_count,
			status:			r.status,
			created_at:		r.created_at,
			updated_at:		r.updated_at
		};
	});

	return json_response({ plans: plans, total: plans.length });
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
		headers:	{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }
	});
}
