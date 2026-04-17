// Me Offer · 创建订单 API
// POST /api/create_order
// body: { plan: 'precision' | 'review', form_data: {...}, volunteers: [...], phone, email }
// Returns: { order_id, amount, pay_url }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const plan								= body.plan || 'precision';
	const PLAN_AMOUNT						= {
		precision:						29900,		// ¥299 分
		review:							199900		// ¥1999 分
	};

	if (!PLAN_AMOUNT[plan]) {
		return json_response({error: 'invalid plan'}, 400);
	}

	const amount							= PLAN_AMOUNT[plan];
	const phone								= (body.phone || '').replace(/\D/g, '').slice(0, 11);
	const email								= body.email || '';

	if (phone.length !== 11) {
		return json_response({error: '手机号格式错误'}, 400);
	}

	const order_id							= generate_order_id();
	const form_data_json					= JSON.stringify(body.form_data || {});

	try {
		await env.DB.prepare(`
			INSERT INTO orders (order_id, user_phone, user_email, amount, plan_type, form_data, status, created_at)
			VALUES (?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
		`).bind(order_id, phone, email, amount, plan, form_data_json).run();
	} catch (e) {
		return json_response({error: 'db error: ' + e.message}, 500);
	}

	return json_response({
		order_id:		order_id,
		amount:			amount,
		amount_yuan:	amount / 100,
		plan:			plan,
		pay_url:		'/api/wxpay/pay?order_id=' + order_id		// 实际支付链接
	});
}


function generate_order_id() {
	const d									= new Date();
	const yyyy								= d.getFullYear();
	const mm								= String(d.getMonth() + 1).padStart(2, '0');
	const dd								= String(d.getDate()).padStart(2, '0');
	const rand								= Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
	return 'MO' + yyyy + mm + dd + rand;
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
