// Me Offer · 保存志愿方案到云端
// POST /api/plans/save
// Header: Authorization: Bearer tk_xxxxx
// body: { plan_id?, plan_name, score, rank, province, subjects, form_data, volunteers, deep_report, status }
//   plan_id 传了就更新，不传就新建
// Returns: { plan_id, saved_at }

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

	const plan_name							= body.plan_name || ((body.score || '-') + ' 分方案');
	const score								= parseInt(body.score) || 0;
	const rank								= parseInt(body.rank) || 0;
	const province							= body.province || 'shandong';
	const subjects_json						= JSON.stringify(body.subjects || []);
	const form_data_json					= JSON.stringify(body.form_data || {});
	const volunteers_json					= JSON.stringify(body.volunteers || []);
	const deep_report_json					= JSON.stringify(body.deep_report || null);
	const status							= body.status || 'draft';

	let plan_id;
	if (body.plan_id) {
		/* 更新 */
		plan_id								= parseInt(body.plan_id);
		/* 校验属于当前用户 */
		const existing						= await env.DB.prepare(
			'SELECT id FROM user_plans WHERE id = ? AND user_id = ?'
		).bind(plan_id, user.id).first();
		if (!existing) return json_response({ error: 'plan not found' }, 404);

		await env.DB.prepare(`
			UPDATE user_plans SET
				plan_name = ?, score = ?, rank = ?, province = ?,
				subjects_json = ?, form_data_json = ?, volunteers_json = ?, deep_report_json = ?,
				status = ?, updated_at = datetime('now')
			WHERE id = ?
		`).bind(plan_name, score, rank, province, subjects_json, form_data_json, volunteers_json, deep_report_json, status, plan_id).run();
	} else {
		/* 新建 */
		const res							= await env.DB.prepare(`
			INSERT INTO user_plans (user_id, plan_name, score, rank, province, subjects_json, form_data_json, volunteers_json, deep_report_json, status)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`).bind(user.id, plan_name, score, rank, province, subjects_json, form_data_json, volunteers_json, deep_report_json, status).run();
		plan_id								= res.meta.last_row_id;
	}

	return json_response({
		plan_id:	plan_id,
		saved_at:	new Date().toISOString()
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
		headers:	{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }
	});
}
