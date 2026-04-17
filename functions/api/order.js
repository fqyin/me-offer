// Me Offer · 订单查询 API
// GET /api/order?order_id=MO...
// POST /api/order  body: { order_id }

export async function onRequest(context) {
	const request							= context.request;
	const env								= context.env;
	const url								= new URL(request.url);

	let order_id							= url.searchParams.get('order_id');

	if (!order_id && request.method === 'POST') {
		try {
			const body						= await request.json();
			order_id						= body.order_id;
		} catch (e) {}
	}

	if (!order_id || !/^MO\d{14}$/.test(order_id)) {
		return json_response({error: '订单号格式错误'}, 400);
	}

	const row								= await env.DB.prepare('SELECT order_id, user_phone, amount, plan_type, status, created_at, paid_at FROM orders WHERE order_id = ?').bind(order_id).first();

	if (!row) {
		return json_response({error: '订单不存在'}, 404);
	}

	// 手机号脱敏
	if (row.user_phone) {
		row.user_phone						= row.user_phone.slice(0, 3) + '****' + row.user_phone.slice(-4);
	}

	return json_response({
		order:		row
	});
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
