// Me Offer · 加载某个方案（恢复到工作台）
// GET /api/plans/load?plan_id=123
// Header: Authorization: Bearer tk_xxxxx
// Returns: { plan: {...full plan data...} }

export async function onRequestGet(context) {
	const env								= context.env;
	const url								= new URL(context.request.url);
	const plan_id							= parseInt(url.searchParams.get('plan_id') || '0');
	if (!plan_id) return json_response({ error: 'missing plan_id' }, 400);

	const user								= await get_user_from_token(context);
	if (!user) return json_response({ error: 'unauthorized' }, 401);

	const r									= await env.DB.prepare(`
		SELECT id, plan_name, score, rank, province, subjects_json, form_data_json,
		       volunteers_json, deep_report_json, status, created_at, updated_at
		FROM user_plans
		WHERE id = ? AND user_id = ?
	`).bind(plan_id, user.id).first();

	if (!r) return json_response({ error: 'plan not found' }, 404);

	const parse_json						= function(s) {
		try { return JSON.parse(s || 'null'); } catch (e) { return null; }
	};

	return json_response({
		plan: {
			plan_id:		r.id,
			plan_name:		r.plan_name,
			score:			r.score,
			rank:			r.rank,
			province:		r.province,
			subjects:		parse_json(r.subjects_json) || [],
			form_data:		parse_json(r.form_data_json) || {},
			volunteers:		parse_json(r.volunteers_json) || [],
			deep_report:	parse_json(r.deep_report_json),
			status:			r.status,
			created_at:		r.created_at,
			updated_at:		r.updated_at
		}
	});
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
