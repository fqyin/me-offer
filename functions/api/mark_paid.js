// Me Offer · 标记订单已付款
// POST /api/mark_paid  body: { order_id, external_id }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const order_id							= body.order_id;
	if (!order_id) {
		return json_response({error: 'missing order_id'}, 400);
	}

	try {
		await env.DB.prepare(`
			UPDATE orders SET status = 'paid', paid_at = datetime('now')
			WHERE order_id = ? AND status = 'pending'
		`).bind(order_id).run();
	} catch (e) {
		return json_response({error: 'db error'}, 500);
	}

	return json_response({success: true, order_id: order_id});
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
