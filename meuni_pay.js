// Me Offer Payment Module (v1.0 · 2026-04-17)
// 开发阶段占位 · Phase 3 对接真实微信支付

var meuni_pay									= (function() {

	const API_ENDPOINT							= '/api/wxpay/create_order';
	const DEV_MODE								= true;

	function main() {
		console.log('meuni_pay loaded · dev_mode=' + DEV_MODE);
	}

	function request_payment(options) {
		let amount								= options.amount;
		let description							= options.description || 'Me Offer 服务';
		let phone								= options.phone || '';
		let on_success							= options.on_success || function() {};
		let on_fail								= options.on_fail || function() {};

		if (DEV_MODE) {
			dev_simulate_pay(amount, description, on_success, on_fail);
			return;
		}

		create_order(amount, description, phone, function(order) {
			invoke_wxpay(order, on_success, on_fail);
		}, on_fail);
	}

	function dev_simulate_pay(amount, description, on_success, on_fail) {
		let confirmed							= confirm('【开发模式】模拟微信支付\n\n商品：' + description + '\n金额：¥' + amount + '\n\n点击确定模拟支付成功');

		if (confirmed) {
			let mock_order_id					= 'DEV_' + Date.now();
			setTimeout(function() {
				on_success(mock_order_id);
			}, 500);
		} else {
			on_fail('用户取消');
		}
	}

	function create_order(amount, description, phone, on_created, on_fail) {
		$.ajax({
			url:		API_ENDPOINT,
			method:		'POST',
			data:		JSON.stringify({
				amount:			amount,
				description:	description,
				phone:			phone
			}),
			contentType: 'application/json',
			success: function(res) {
				if (res.success) {
					on_created(res.order);
				} else {
					on_fail(res.error || '创建订单失败');
				}
			},
			error: function(xhr) {
				on_fail('网络错误：' + xhr.status);
			}
		});
	}

	function invoke_wxpay(order, on_success, on_fail) {
		// Phase 3 对接 WeixinJSBridge.invoke('getBrandWCPayRequest', ...)
		console.log('invoke wxpay for order:', order);

		if (typeof WeixinJSBridge === 'undefined') {
			on_fail('请在微信中打开');
			return;
		}

		WeixinJSBridge.invoke('getBrandWCPayRequest', {
			appId:		order.app_id,
			timeStamp:	order.timestamp,
			nonceStr:	order.nonce_str,
			package:	order.package,
			signType:	order.sign_type,
			paySign:	order.pay_sign
		}, function(res) {
			if (res.err_msg === 'get_brand_wcpay_request:ok') {
				on_success(order.order_id);
			} else {
				on_fail(res.err_msg);
			}
		});
	}

	main();

	return {
		request_payment:	request_payment
	};

})();
