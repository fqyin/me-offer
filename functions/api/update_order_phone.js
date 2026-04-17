// Me Offer · 更新订单手机号（付费后可选补充）
// POST /api/update_order_phone  body: {order_id, phone}

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const order_id							= body.order_id || '';
	const phone								= (body.phone || '').replace(/\D/g, '').slice(0, 11);

	if (!order_id) {
		return json_response({error: '缺少订单号'}, 400);
	}
	if (phone.length !== 11 || phone[0] !== '1') {
		return json_response({error: '手机号格式错误'}, 400);
	}

	try {
		await env.DB.prepare(`
			UPDATE orders SET user_phone = ?
			WHERE order_id = ?
		`).bind(phone, order_id).run();
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
