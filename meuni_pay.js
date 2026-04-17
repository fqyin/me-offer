/* ================================================================
   Me Uni Pay — 通用支付 SDK v2.0
   引入方式：<script src="meuni_pay.js"></script>
   调用方式：MeuniPay.checkout({ name, price, currency, onSuccess })

   安全说明：本 SDK 中 innerHTML 内容均为内部硬编码的受信模板字符串，
   不包含任何用户输入或外部数据的直接拼接。所有动态数据（商品名称、
   价格等）来自调用方传入的受信参数，在 Me Uni 内部系统中使用。
   ================================================================ */

var MeuniPay = (function() {

	/* ---------- 配置 ---------- */

	var API_BASE	= 'https://meuni-jobs-api.fq-yin-cn.workers.dev';
	var USER_ID		= null;
	var LANG		= 'zh';
	var DRAWER_ID	= 'meuni-pay-drawer';
	var OVERLAY_ID	= 'meuni-pay-overlay';

	var CURRENCY_SYMBOLS = {
		CNY:	'¥',
		USD:	'$',
		CHF:	'CHF ',
		EUR:	'€'
	};

	var LABELS = {
		zh: {
			confirm_order:		'确认订单',
			item_label:			'商品',
			price_label:		'价格',
			quantity_label:		'数量',
			total_label:		'合计',
			pay_method:			'支付方式',
			wechat_pay:			'微信支付',
			alipay:				'支付宝',
			stripe_pay:			'银行卡支付',
			pay_now:			'立即支付',
			paying:				'支付中...',
			pay_success:		'支付成功',
			pay_success_desc:	'您的订单已完成',
			order_id:			'订单号',
			view_result:		'查看结果',
			close:				'关闭',
			cancel:				'取消',
			scan_to_pay:		'请使用微信扫码支付',
			longpress_to_pay:	'请截图保存二维码，返回微信首页 →「扫一扫」→ 右上角「相册」→ 选择截图完成支付',
			pay_timeout:		'支付超时',
			pay_timeout_desc:	'未检测到支付，请重试',
			pay_error:			'支付失败',
			retry:				'重新支付',
			redirecting:		'正在跳转支付页面...',
			waiting_pay:		'等待支付完成...',
			auto_close:			'秒后自动关闭',
			mobile_notice:		'手机支付暂不可用',
			mobile_notice_desc:	'目前手机端暂时不支持微信和支付宝支付，请到电脑端支付使用AI功能',
			got_it:				'知道了'
		},
		en: {
			confirm_order:		'Confirm Order',
			item_label:			'Item',
			price_label:		'Price',
			quantity_label:		'Qty',
			total_label:		'Total',
			pay_method:			'Payment Method',
			wechat_pay:			'WeChat Pay',
			alipay:				'Alipay',
			stripe_pay:			'Card Payment',
			pay_now:			'Pay Now',
			paying:				'Processing...',
			pay_success:		'Payment Successful',
			pay_success_desc:	'Your order is complete',
			order_id:			'Order ID',
			view_result:		'View Result',
			close:				'Close',
			cancel:				'Cancel',
			scan_to_pay:		'Scan QR code with WeChat to pay',
			longpress_to_pay:	'Save screenshot → WeChat home → Scan → Album → Select screenshot to pay',
			pay_timeout:		'Payment Timeout',
			pay_timeout_desc:	'No payment detected, please retry',
			pay_error:			'Payment Failed',
			retry:				'Retry Payment',
			redirecting:		'Redirecting to payment page...',
			waiting_pay:		'Waiting for payment...',
			auto_close:			's to auto close',
			mobile_notice:		'Mobile Payment Unavailable',
			mobile_notice_desc:	'WeChat Pay and Alipay are currently not supported on mobile. Please use a desktop browser to complete payment.',
			got_it:				'Got it'
		}
	};

	var current_options		= null;
	var selected_method		= 'wechat';
	var poll_timer			= null;
	var current_order_id	= null;


	/* ---------- 工具函数 ---------- */

	function t(key) {
		var labels = LABELS[LANG] || LABELS.zh;
		return labels[key] || key;
	}

	function format_price(amount, currency) {
		var symbol = CURRENCY_SYMBOLS[currency] || currency + ' ';
		return symbol + parseFloat(amount).toFixed(2);
	}

	function generate_order_id() {
		var now		= new Date();
		var date	= now.getFullYear().toString() +
					  ('0' + (now.getMonth() + 1)).slice(-2) +
					  ('0' + now.getDate()).slice(-2);
		var rand	= Math.random().toString(36).substring(2, 8).toUpperCase();
		return 'MU-' + date + '-' + rand;
	}

	function save_order(order) {
		var orders = [];

		try {
			orders = JSON.parse(localStorage.getItem('meuni_orders') || '[]');
		} catch(e) {
			orders = [];
		}

		orders.push(order);
		localStorage.setItem('meuni_orders', JSON.stringify(orders));
	}

	function create_el(tag, class_name, text_content) {
		var el = document.createElement(tag);

		if (class_name) el.className = class_name;
		if (text_content) el.textContent = text_content;

		return el;
	}

	function get_user_id() {
		if (USER_ID) return USER_ID;

		USER_ID = localStorage.getItem('meuni_user_id');

		if (USER_ID === null || USER_ID === '') {
			USER_ID = 'mu_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
			localStorage.setItem('meuni_user_id', USER_ID);
		}

		return USER_ID;
	}

	function detect_pay_env() {
		var ua = navigator.userAgent.toLowerCase();

		if (ua.indexOf('micromessenger') > -1) {
			return 'wechat_browser';
		}

		if (/android|iphone|ipad|ipod|mobile/i.test(ua)) {
			return 'mobile_browser';
		}

		return 'pc';
	}


	/* ---------- 样式注入 ---------- */

	function inject_styles() {
		if (document.getElementById('meuni-pay-styles')) return;

		var css = document.createElement('style');
		css.id = 'meuni-pay-styles';
		css.textContent = [
			'#' + OVERLAY_ID + ' {',
			'  position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9998;',
			'  opacity: 0; transition: opacity 0.3s; pointer-events: none;',
			'}',
			'#' + OVERLAY_ID + '.mp-show { opacity: 1; pointer-events: auto; }',

			'#' + DRAWER_ID + ' {',
			'  position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;',
			'  max-width: 480px; margin: 0 auto;',
			'  background: #FFF; border-radius: 20px 20px 0 0;',
			'  transform: translateY(100%); transition: transform 0.35s cubic-bezier(0.32,0.72,0,1);',
			'  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica","Arial",sans-serif;',
			'  box-shadow: 0 -8px 40px rgba(0,0,0,0.12);',
			'  overflow: hidden;',
			'}',
			'#' + DRAWER_ID + '.mp-open { transform: translateY(0); }',

			'.mp-handle { width: 36px; height: 4px; border-radius: 2px; background: #D1D5DB; margin: 10px auto 0; }',

			'.mp-header {',
			'  display: flex; align-items: center; justify-content: space-between;',
			'  padding: 16px 20px 12px; border-bottom: 1px solid #F3F4F6;',
			'}',
			'.mp-header-title { font-size: 17px; font-weight: 600; color: #111827; }',
			'.mp-close-btn {',
			'  width: 28px; height: 28px; border-radius: 50%; border: none; cursor: pointer;',
			'  background: #F3F4F6; color: #6B7280; font-size: 16px; line-height: 1;',
			'  display: flex; align-items: center; justify-content: center; transition: background 0.2s;',
			'}',
			'.mp-close-btn:hover { background: #E5E7EB; }',

			'.mp-body { padding: 20px; }',

			'.mp-item-card {',
			'  display: flex; align-items: center; gap: 14px;',
			'  padding: 14px 16px; background: #F9FAFB; border-radius: 14px; margin-bottom: 20px;',
			'}',
			'.mp-item-icon {',
			'  width: 52px; height: 52px; border-radius: 14px;',
			'  background: linear-gradient(135deg, #EFF6FF, #DBEAFE);',
			'  display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0;',
			'}',
			'.mp-item-info { flex: 1; min-width: 0; }',
			'.mp-item-name { font-size: 15px; font-weight: 600; color: #111827; margin-bottom: 2px; }',
			'.mp-item-desc { font-size: 12px; color: #6B7280; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
			'.mp-item-price { font-size: 20px; font-weight: 700; color: #2563EB; white-space: nowrap; }',

			'.mp-summary {',
			'  display: flex; justify-content: space-between; align-items: center;',
			'  padding: 12px 0; border-top: 1px solid #F3F4F6; margin-bottom: 16px;',
			'}',
			'.mp-summary-label { font-size: 14px; color: #6B7280; }',
			'.mp-summary-value { font-size: 14px; font-weight: 600; color: #111827; }',
			'.mp-total-value { font-size: 22px; font-weight: 700; color: #DC2626; }',

			'.mp-methods-title { font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 10px; }',
			'.mp-method-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }',
			'.mp-method-item {',
			'  display: flex; align-items: center; gap: 12px;',
			'  padding: 12px 14px; border-radius: 12px; border: 1.5px solid #E5E7EB;',
			'  cursor: pointer; transition: all 0.2s; user-select: none;',
			'}',
			'.mp-method-item:hover { border-color: #93C5FD; }',
			'.mp-method-item.mp-selected { border-color: #2563EB; background: #EFF6FF; }',
			'.mp-method-radio {',
			'  width: 18px; height: 18px; border-radius: 50%; border: 2px solid #D1D5DB;',
			'  display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s;',
			'}',
			'.mp-method-item.mp-selected .mp-method-radio { border-color: #2563EB; background: #2563EB; }',
			'.mp-method-radio-dot {',
			'  width: 6px; height: 6px; border-radius: 50%; background: #FFF; opacity: 0; transition: opacity 0.2s;',
			'}',
			'.mp-method-item.mp-selected .mp-method-radio-dot { opacity: 1; }',
			'.mp-method-icon { font-size: 22px; }',
			'.mp-method-name { font-size: 14px; font-weight: 500; color: #374151; }',
			'.mp-method-tag {',
			'  font-size: 10px; padding: 1px 6px; border-radius: 4px;',
			'  background: #FEF3C7; color: #92400E; margin-left: auto;',
			'}',

			'.mp-pay-btn {',
			'  width: 100%; height: 50px; border-radius: 14px; border: none; cursor: pointer;',
			'  background: linear-gradient(135deg, #2563EB, #3B82F6); color: #FFF;',
			'  font-size: 16px; font-weight: 600; transition: all 0.2s;',
			'  display: flex; align-items: center; justify-content: center; gap: 8px;',
			'}',
			'.mp-pay-btn:hover { box-shadow: 0 8px 20px rgba(37,99,235,0.3); transform: translateY(-1px); }',
			'.mp-pay-btn:active { transform: scale(0.98); }',
			'.mp-pay-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }',

			'.mp-success { text-align: center; padding: 30px 20px 20px; }',
			'.mp-success-icon {',
			'  width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 16px;',
			'  background: linear-gradient(135deg, #10B981, #34D399);',
			'  display: flex; align-items: center; justify-content: center;',
			'  font-size: 32px; color: #FFF;',
			'  animation: mp-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);',
			'}',
			'@keyframes mp-pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }',
			'.mp-success-title { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 4px; }',
			'.mp-success-desc { font-size: 13px; color: #6B7280; margin-bottom: 16px; }',
			'.mp-order-id { font-size: 12px; color: #9CA3AF; margin-bottom: 24px; }',
			'.mp-result-btn {',
			'  width: 100%; height: 48px; border-radius: 12px; border: none; cursor: pointer;',
			'  background: linear-gradient(135deg, #2563EB, #3B82F6); color: #FFF;',
			'  font-size: 15px; font-weight: 600; margin-bottom: 10px; transition: all 0.2s;',
			'}',
			'.mp-result-btn:hover { box-shadow: 0 6px 16px rgba(37,99,235,0.3); }',
			'.mp-close-order-btn {',
			'  width: 100%; height: 44px; border-radius: 12px; border: 1.5px solid #E5E7EB;',
			'  background: #FFF; color: #6B7280; font-size: 14px; cursor: pointer; transition: all 0.2s;',
			'}',
			'.mp-close-order-btn:hover { border-color: #D1D5DB; background: #F9FAFB; }',

			'.mp-spinner {',
			'  width: 20px; height: 20px; border: 2.5px solid rgba(255,255,255,0.3);',
			'  border-top-color: #FFF; border-radius: 50%;',
			'  animation: mp-spin 0.7s linear infinite; display: inline-block;',
			'}',
			'@keyframes mp-spin { to { transform: rotate(360deg); } }',

			'.mp-qr-wrap { text-align: center; padding: 20px 0; }',
			'.mp-qr-wrap img { display: block; margin: 0 auto 16px; border-radius: 8px; border: 1px solid #E5E7EB; }',
			'.mp-qr-label { font-size: 14px; color: #6B7280; margin-bottom: 8px; }',
			'.mp-qr-status { font-size: 13px; color: #9CA3AF; display: flex; align-items: center; justify-content: center; gap: 8px; }',

			'.mp-error { text-align: center; padding: 30px 20px 20px; }',
			'.mp-error-icon {',
			'  width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 16px;',
			'  background: linear-gradient(135deg, #EF4444, #F87171);',
			'  display: flex; align-items: center; justify-content: center;',
			'  font-size: 32px; color: #FFF;',
			'}',
			'.mp-error-title { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 4px; }',
			'.mp-error-desc { font-size: 13px; color: #6B7280; margin-bottom: 24px; }',
			'.mp-retry-btn {',
			'  width: 100%; height: 48px; border-radius: 12px; border: none; cursor: pointer;',
			'  background: linear-gradient(135deg, #2563EB, #3B82F6); color: #FFF;',
			'  font-size: 15px; font-weight: 600; margin-bottom: 10px; transition: all 0.2s;',
			'}',
			'.mp-retry-btn:hover { box-shadow: 0 6px 16px rgba(37,99,235,0.3); }',

			'.mp-spinner-dark {',
			'  width: 16px; height: 16px; border: 2px solid rgba(156,163,175,0.3);',
			'  border-top-color: #9CA3AF; border-radius: 50%;',
			'  animation: mp-spin 0.7s linear infinite; display: inline-block;',
			'}'
		].join('\n');

		document.head.appendChild(css);
	}


	/* ---------- DOM 构建 ---------- */

	function build_drawer() {
		if (document.getElementById(DRAWER_ID)) return;

		var overlay = document.createElement('div');
		overlay.id	= OVERLAY_ID;
		document.body.appendChild(overlay);

		var drawer		= document.createElement('div');
		drawer.id		= DRAWER_ID;

		var handle		= create_el('div', 'mp-handle');
		var header		= create_el('div', 'mp-header');
		var body		= create_el('div', 'mp-body');

		drawer.appendChild(handle);
		drawer.appendChild(header);
		drawer.appendChild(body);
		document.body.appendChild(drawer);

		overlay.addEventListener('click', function() { close_drawer(); });
	}

	function open_drawer() {
		var overlay	= document.getElementById(OVERLAY_ID);
		var drawer	= document.getElementById(DRAWER_ID);

		if (overlay) overlay.classList.add('mp-show');

		requestAnimationFrame(function() {
			if (drawer) drawer.classList.add('mp-open');
		});

		document.body.style.overflow = 'hidden';
	}

	function close_drawer() {
		var overlay	= document.getElementById(OVERLAY_ID);
		var drawer	= document.getElementById(DRAWER_ID);

		if (poll_timer) {
			clearInterval(poll_timer);
			poll_timer = null;
		}

		if (drawer) drawer.classList.remove('mp-open');

		setTimeout(function() {
			if (overlay) overlay.classList.remove('mp-show');
			if (overlay) overlay.style.display = 'none';
			document.body.style.overflow = '';
		}, 350);

		if (current_options && current_options.onCancel) {
			current_options.onCancel();
		}

		current_options		= null;
		current_order_id	= null;
	}


	/* ---------- 渲染 ---------- */

	function render_checkout(opts) {
		var header	= document.querySelector('#' + DRAWER_ID + ' .mp-header');
		var body	= document.querySelector('#' + DRAWER_ID + ' .mp-body');
		var total	= parseFloat(opts.price) * (opts.quantity || 1);

		/* header */
		header.textContent = '';
		var title_span		= create_el('span', 'mp-header-title', t('confirm_order'));
		var close_btn		= create_el('button', 'mp-close-btn', '\u00D7');
		close_btn.id		= 'mp-close-x';
		header.appendChild(title_span);
		header.appendChild(close_btn);
		header.style.display = '';

		/* body */
		body.textContent = '';

		/* 商品卡片 */
		var item_card	= create_el('div', 'mp-item-card');
		var icon_div	= create_el('div', 'mp-item-icon', opts.icon || '🛒');
		var info_div	= create_el('div', 'mp-item-info');
		var name_div	= create_el('div', 'mp-item-name', LANG === 'en' && opts.name_en ? opts.name_en : opts.name);
		var desc_div	= create_el('div', 'mp-item-desc', LANG === 'en' && opts.description_en ? opts.description_en : (opts.description || ''));
		var price_div	= create_el('div', 'mp-item-price', format_price(opts.price, opts.currency));

		info_div.appendChild(name_div);
		info_div.appendChild(desc_div);
		item_card.appendChild(icon_div);
		item_card.appendChild(info_div);
		item_card.appendChild(price_div);
		body.appendChild(item_card);

		/* 数量（多于 1 时显示） */
		if (opts.quantity && opts.quantity > 1) {
			var qty_row		= create_el('div', 'mp-summary');
			var qty_label	= create_el('span', 'mp-summary-label', t('quantity_label'));
			var qty_val		= create_el('span', 'mp-summary-value', '\u00D7' + opts.quantity);

			qty_row.appendChild(qty_label);
			qty_row.appendChild(qty_val);
			body.appendChild(qty_row);
		}

		/* 合计 */
		var total_row	= create_el('div', 'mp-summary');
		total_row.style.borderTop		= '1px solid #F3F4F6';
		total_row.style.paddingTop		= '12px';
		total_row.style.marginBottom	= '20px';
		var total_label	= create_el('span', 'mp-summary-label', t('total_label'));
		var total_val	= create_el('span', 'mp-total-value', format_price(total, opts.currency));

		total_row.appendChild(total_label);
		total_row.appendChild(total_val);
		body.appendChild(total_row);

		/* 支付方式标题 */
		body.appendChild(create_el('div', 'mp-methods-title', t('pay_method')));

		/* 支付方式列表 — 微信浏览器内推荐支付宝 */
		var method_list		= create_el('div', 'mp-method-list');
		var is_in_wechat	= detect_pay_env() === 'wechat_browser';
		var default_method	= 'wechat';

		selected_method = default_method;

		var methods = [
			{ key: 'wechat',	icon: '💬',	label: t('wechat_pay'),	tag: '推荐' }
		];

		for (var i = 0; i < methods.length; i++) {
			var m		= methods[i];
			var item	= create_el('div', 'mp-method-item');
			item.setAttribute('data-method', m.key);

			if (m.key === default_method) item.classList.add('mp-selected');

			var radio		= create_el('div', 'mp-method-radio');
			var radio_dot	= create_el('div', 'mp-method-radio-dot');
			radio.appendChild(radio_dot);

			var m_icon = create_el('span', 'mp-method-icon', m.icon);
			var m_name = create_el('span', 'mp-method-name', m.label);

			item.appendChild(radio);
			item.appendChild(m_icon);
			item.appendChild(m_name);

			if (m.tag) {
				var m_tag = create_el('span', 'mp-method-tag', m.tag);
				item.appendChild(m_tag);
			}

			method_list.appendChild(item);
		}

		body.appendChild(method_list);

		/* 支付按钮 */
		var pay_btn		= create_el('button', 'mp-pay-btn', t('pay_now') + ' ' + format_price(total, opts.currency));
		pay_btn.id		= 'mp-pay-btn';
		body.appendChild(pay_btn);

		/* 事件绑定 */
		close_btn.addEventListener('click', function() { close_drawer(); });

		var all_methods = method_list.querySelectorAll('.mp-method-item');

		for (var j = 0; j < all_methods.length; j++) {
			all_methods[j].addEventListener('click', function() {
				for (var k = 0; k < all_methods.length; k++) {
					all_methods[k].classList.remove('mp-selected');
				}
				this.classList.add('mp-selected');
				selected_method = this.getAttribute('data-method');
			});
		}

		pay_btn.addEventListener('click', function() {
			process_payment(opts);
		});
	}


	/* ---------- 支付处理 ---------- */

	function get_wechat_client_type() {
		return 'web';
	}

	function process_payment(opts) {
		var btn = document.getElementById('mp-pay-btn');
		btn.disabled = true;

		var spinner = create_el('span', 'mp-spinner');
		btn.textContent = '';
		btn.appendChild(spinner);
		btn.appendChild(document.createTextNode(' ' + t('paying')));

		var pay_env = detect_pay_env();

		/* 微信浏览器内选择微信支付 — 直接走 JSAPI（不经过 Stripe） */
		if (selected_method === 'wechat' && pay_env === 'wechat_browser') {
			handle_wechat_jsapi(opts);
			return;
		}

		/* PC/手机浏览器微信支付 — 走微信 Native Pay（不经过 Stripe） */
		if (selected_method === 'wechat') {
			handle_wechat_native(opts);
			return;
		}

		var uid		= get_user_id();
		var total	= parseFloat(opts.price) * (opts.quantity || 1);

		var payload = {
			user_id:	uid,
			item_id:	opts.item_id || opts.category || 'general',
			item_type:	opts.type || 'service',
			item_name:	opts.name,
			price:		total,
			currency:	opts.currency || 'CNY',
			quantity:	opts.quantity || 1,
			pay_method:	selected_method,
			return_url:	window.location.origin + window.location.pathname
		};

		fetch(API_BASE + '/api/pay/create', {
			method:		'POST',
			headers:	{ 'Content-Type': 'application/json' },
			body:		JSON.stringify(payload)
		})
		.then(function(res) { return res.json(); })
		.then(function(data) {
			if (data.error) {
				render_error(data.error, opts);
				return;
			}

			current_order_id = data.order_id;

			if (selected_method === 'alipay') {
				handle_alipay(data, opts);
			} else {
				handle_stripe_pay(data, opts);
			}
		})
		.catch(function(err) {
			render_error(err.message || t('pay_error'), opts);
		});
	}


	/* ---------- 微信支付处理 ---------- */

	function handle_wechat_native(opts) {
		var uid		= get_user_id();
		var total	= parseFloat(opts.price) * (opts.quantity || 1);
		var env		= detect_pay_env();

		var payload = {
			user_id:	uid,
			item_id:	opts.item_id || opts.category || 'general',
			item_type:	opts.type || 'service',
			item_name:	opts.name,
			price:		total,
			quantity:	opts.quantity || 1
		};

		/* 手机浏览器 — 跳 europemart.com/pay?mode=h5（ICP备案域名）发起 H5 Pay */
		if (env === 'mobile_browser') {
			var return_url	= window.location.origin + window.location.pathname + '?wechat_h5_done=1';

			sessionStorage.setItem('wechat_h5_opts', JSON.stringify(opts));

			render_redirecting(opts);
			window.location.href = 'https://www.europemart.com/pay'
				+ '?mode=h5'
				+ '&user_id='		+ encodeURIComponent(uid)
				+ '&item_id='		+ encodeURIComponent(payload.item_id)
				+ '&item_type='		+ encodeURIComponent(payload.item_type)
				+ '&item_name='		+ encodeURIComponent(payload.item_name)
				+ '&price='			+ total
				+ '&quantity='		+ (opts.quantity || 1)
				+ '&return_url='	+ encodeURIComponent(return_url);
			return;
		}

		/* PC 浏览器 — Native Pay，显示二维码 */
		fetch(API_BASE + '/api/pay/wechat/native', {
			method:		'POST',
			headers:	{ 'Content-Type': 'application/json' },
			body:		JSON.stringify(payload)
		})
		.then(function(res) { return res.json(); })
		.then(function(data) {
			if (data.error) {
				render_error(data.error, opts);
				return;
			}

			current_order_id = data.order_id;

			render_qr_code(data, opts, 'pc');
		})
		.catch(function(err) {
			render_error(err.message || t('pay_error'), opts);
		});
	}


	function handle_wechat_pay(data, opts) {
		var env = detect_pay_env();

		/* 微信浏览器内 — 使用 JSAPI 直接支付 */
		if (env === 'wechat_browser') {
			handle_wechat_jsapi(opts);
			return;
		}

		/* 手机浏览器 — 优先 H5 跳转唤起微信，降级显示 QR 码 + 截图提示 */
		if (env === 'mobile_browser') {
			if (data.wechat_h5_url) {
				render_redirecting(opts);
				start_polling(data.order_id, opts);
				window.location.href = data.wechat_h5_url;
				return;
			}

			render_qr_code(data, opts, 'mobile');
			return;
		}

		/* PC 浏览器 — 显示 QR 码 + 扫码提示 */
		render_qr_code(data, opts, 'pc');
	}


	/* ---------- 微信 JSAPI 支付流程 ---------- */

	/**
	* 微信内浏览器 JSAPI 支付入口。
	* Context: 跳转到已备案域名 europemart.com/pay 完成支付（方案 B）。
	* 因为 me-uni.com / me-uni.cn 未备案，无法直接配置 JSAPI 支付授权目录。
	*/
	function handle_wechat_jsapi(opts) {
		var pay_host		= 'https://www.europemart.com';
		var uid				= get_user_id();
		var total			= parseFloat(opts.price) * (opts.quantity || 1);
		var return_url		= window.location.href;
		var pay_page_url	= pay_host + '/pay.html'
			+ '?item_id=' + encodeURIComponent(opts.item_id || opts.category || 'general')
			+ '&item_type=' + encodeURIComponent(opts.type || 'service')
			+ '&item_name=' + encodeURIComponent(opts.name)
			+ '&price=' + total
			+ '&quantity=' + (opts.quantity || 1)
			+ '&user_id=' + encodeURIComponent(uid)
			+ '&return_url=' + encodeURIComponent(return_url);

		/* 保存 opts 供支付回调后恢复 onSuccess */
		try {
			var opts_save = { name: opts.name, price: opts.price, currency: opts.currency, icon: opts.icon, item_id: opts.item_id, type: opts.type, category: opts.category, quantity: opts.quantity };
			sessionStorage.setItem('meuni_jsapi_opts', JSON.stringify(opts_save));
		} catch(e) {}

		window.location.href = pay_page_url;
	}


	/**
	* 用 OpenID 创建 JSAPI 订单并调起微信支付。
	*/
	function create_jsapi_order(openid, opts) {
		var uid		= get_user_id();
		var total	= parseFloat(opts.price) * (opts.quantity || 1);

		var payload = {
			user_id:	uid,
			openid:		openid,
			item_id:	opts.item_id || opts.category || 'general',
			item_type:	opts.type || 'service',
			item_name:	opts.name,
			price:		total,
			quantity:	opts.quantity || 1
		};

		fetch(API_BASE + '/api/pay/wechat/create', {
			method:		'POST',
			headers:	{ 'Content-Type': 'application/json' },
			body:		JSON.stringify(payload)
		})
		.then(function(res) { return res.json(); })
		.then(function(data) {
			if (data.error) {
				render_error(data.error, opts);
				return;
			}

			current_order_id = data.order_id;
			invoke_wechat_pay(data, opts);
		})
		.catch(function(err) {
			render_error(err.message || t('pay_error'), opts);
		});
	}


	/**
	* 调用 WeixinJSBridge 发起微信内支付。
	*/
	function invoke_wechat_pay(pay_params, opts) {
		if (typeof WeixinJSBridge === 'undefined') {
			document.addEventListener('WeixinJSBridgeReady', function() {
				do_wechat_bridge_pay(pay_params, opts);
			});
			return;
		}

		do_wechat_bridge_pay(pay_params, opts);
	}


	function do_wechat_bridge_pay(pay_params, opts) {
		WeixinJSBridge.invoke('getBrandWCPayRequest', {
			appId:		pay_params.appId,
			timeStamp:	pay_params.timeStamp,
			nonceStr:	pay_params.nonceStr,
			package:	pay_params['package'],
			signType:	pay_params.signType,
			paySign:	pay_params.paySign
		}, function(res) {
			if (res.err_msg === 'get_brand_wcpay_request:ok') {
				start_polling(pay_params.order_id, opts);
			}
			else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
				render_checkout(opts);
			}
			else {
				render_error('微信支付失败: ' + res.err_msg, opts);
			}
		});
	}


	function get_wechat_openid() {
		return localStorage.getItem('meuni_wechat_openid') || '';
	}


	function save_wechat_openid(openid) {
		localStorage.setItem('meuni_wechat_openid', openid);
	}


	/* ---------- 支付宝处理 ---------- */

	function handle_alipay(data, opts) {
		var url = data.alipay_url || data.redirect_url || null;

		if (url) {
			render_redirecting(opts);
			start_polling(data.order_id, opts);
			window.location.href = url;
			return;
		}

		render_error(t('pay_error'), opts);
	}

	function render_qr_code(data, opts, mode) {
		var body = document.querySelector('#' + DRAWER_ID + ' .mp-body');
		body.textContent = '';

		var qr_wrap = create_el('div', 'mp-qr-wrap');

		/* QR code image — prefer Stripe base64, fallback to external API */
		var qr_img = document.createElement('img');

		if (data.wechat_qr_image) {
			qr_img.src = data.wechat_qr_image;
		} else if (data.wechat_pay_url) {
			qr_img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(data.wechat_pay_url);
		}

		qr_img.width	= 200;
		qr_img.height	= 200;
		qr_img.alt		= 'WeChat Pay QR Code';
		qr_wrap.appendChild(qr_img);

		/* label — different text per mode */
		var label_text = t('scan_to_pay');

		if (mode === 'wechat' || mode === 'mobile') {
			label_text = t('longpress_to_pay');
		}

		var label = create_el('div', 'mp-qr-label', label_text);

		if (mode === 'wechat' || mode === 'mobile') {
			label.style.fontSize	= '13px';
			label.style.lineHeight	= '1.6';
			label.style.color		= '#2563EB';
			label.style.fontWeight	= '600';
			label.style.padding		= '0 10px';
		}

		qr_wrap.appendChild(label);

		/* polling status */
		var status_wrap = create_el('div', 'mp-qr-status');
		var status_spin = create_el('span', 'mp-spinner-dark');
		var status_text = create_el('span', '', t('waiting_pay'));
		status_wrap.appendChild(status_spin);
		status_wrap.appendChild(status_text);
		qr_wrap.appendChild(status_wrap);

		body.appendChild(qr_wrap);

		/* cancel button */
		var cancel_btn = create_el('button', 'mp-close-order-btn', t('cancel'));
		cancel_btn.addEventListener('click', function() { close_drawer(); });
		body.appendChild(cancel_btn);

		start_polling(data.order_id, opts);
	}


	/* ---------- Stripe 支付处理 ---------- */

	function handle_stripe_pay(data, opts) {
		if (data.checkout_url) {
			render_redirecting(opts);
			window.location.href = data.checkout_url;
			return;
		}

		if (data.session_id && typeof Stripe !== 'undefined') {
			render_redirecting(opts);
			var stripe = Stripe(data.stripe_public_key);

			stripe.redirectToCheckout({ sessionId: data.session_id })
			.then(function(result) {
				if (result.error) {
					render_error(result.error.message, opts);
				}
			});
			return;
		}

		render_error(t('pay_error'), opts);
	}

	function render_redirecting(opts) {
		var body = document.querySelector('#' + DRAWER_ID + ' .mp-body');
		body.textContent = '';

		var wrap = create_el('div', 'mp-success');

		var spinner = create_el('span', 'mp-spinner-dark');
		spinner.style.width		= '32px';
		spinner.style.height	= '32px';
		spinner.style.margin	= '0 auto 16px';
		spinner.style.display	= 'block';
		wrap.appendChild(spinner);

		var msg = create_el('div', 'mp-success-desc', t('redirecting'));
		wrap.appendChild(msg);

		body.appendChild(wrap);
	}


	/* ---------- 支付状态轮询 ---------- */

	var polling_order_id	= null;
	var polling_opts		= null;

	function poll_once(order_id, opts) {
		/* 如果当前 polling 的订单已经换了，忽略旧订单的回调 */
		if (polling_order_id && polling_order_id !== order_id) { return; }

		fetch(API_BASE + '/api/pay/status/' + order_id)
		.then(function(res) { return res.json(); })
		.then(function(data) {
			if (data.status === 'paid') {
				console.log('[MeuniPay] poll_once: order ' + order_id + ' is paid, current polling_order_id=' + polling_order_id);
				if (poll_timer) {
					clearInterval(poll_timer);
					poll_timer = null;
				}

				polling_order_id	= null;
				polling_opts		= null;

				var order = {
					order_id:	order_id,
					type:		opts.type || 'service',
					category:	opts.category || 'general',
					item_name:	opts.name,
					price:		parseFloat(opts.price),
					currency:	opts.currency || 'CNY',
					quantity:	opts.quantity || 1,
					total:		parseFloat(opts.price) * (opts.quantity || 1),
					pay_method:	selected_method,
					status:		'paid',
					created_at:	data.created_at || new Date().toISOString(),
					paid_at:	data.paid_at || new Date().toISOString()
				};

				save_order(order);
				render_success(order, opts);
			}
		})
		.catch(function() {
			/* 忽略单次轮询失败 */
		});
	}

	function start_polling(order_id, opts) {
		var attempts		= 0;
		var max_attempts	= 90;

		/* 清理上一次遗留的 polling（防止多个 interval 并行） */
		if (poll_timer) {
			clearInterval(poll_timer);
			poll_timer = null;
		}

		polling_order_id	= order_id;
		polling_opts		= opts;

		poll_timer = setInterval(function() {
			attempts++;

			if (attempts > max_attempts) {
				clearInterval(poll_timer);
				poll_timer			= null;
				polling_order_id	= null;
				polling_opts		= null;
				render_timeout(opts);
				return;
			}

			poll_once(order_id, opts);
		}, 2000);
	}

	/* 页面从后台恢复时立即查询一次（解决手机浏览器暂停定时器问题） */
	document.addEventListener('visibilitychange', function() {
		if (document.visibilityState === 'visible' && polling_order_id && polling_opts) {
			poll_once(polling_order_id, polling_opts);
		}
	});


	/* ---------- Stripe 回调检查 ---------- */

	function check_stripe_return() {
		var params		= new URLSearchParams(window.location.search);
		var order_id	= params.get('meuni_order_id');
		var status		= params.get('meuni_pay_status');

		if (order_id && status === 'success') {
			/* 清除 URL 参数 */
			var clean_url = window.location.pathname;
			window.history.replaceState({}, document.title, clean_url);

			/* 恢复 opts（支付前保存的） */
			var restored_opts = null;

			try {
				var saved_jsapi = sessionStorage.getItem('meuni_jsapi_opts');

				if (saved_jsapi) {
					sessionStorage.removeItem('meuni_jsapi_opts');
					restored_opts = JSON.parse(saved_jsapi);
				}
			} catch(e) {}

			/* 查询订单状态确认 */
			fetch(API_BASE + '/api/pay/status/' + order_id)
			.then(function(res) { return res.json(); })
			.then(function(data) {
				if (data.status === 'paid') {
					var order = {
						order_id:	order_id,
						type:		data.item_type || 'service',
						category:	data.item_type || 'general',
						item_name:	data.item_name || '',
						price:		data.price || 0,
						currency:	data.currency || 'CNY',
						quantity:	data.quantity || 1,
						total:		data.price || 0,
						pay_method:	'wechat_jsapi',
						status:		'paid',
						created_at:	data.created_at || new Date().toISOString(),
						paid_at:	data.paid_at || new Date().toISOString()
					};

					save_order(order);

					/* 恢复支付成功 UI */
					if (restored_opts) {
						setTimeout(function() {
							inject_styles();
							build_drawer();
							open_drawer();
							render_success(order, restored_opts);
						}, 300);
					}
				}
			})
			.catch(function() {
				/* 静默处理 */
			});
		}
	}

	/* 页面加载时检查 Stripe 回调 */
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', check_stripe_return);
	} else {
		check_stripe_return();
	}


	/* ---------- 微信 OAuth 回调恢复支付 ---------- */

	function check_wechat_oauth_return() {
		var params	= new URLSearchParams(window.location.search);
		var code	= params.get('code');
		var state	= params.get('state');

		if (code && state === 'meuni_pay') {
			var saved_opts = sessionStorage.getItem('meuni_pay_opts');

			if (saved_opts) {
				sessionStorage.removeItem('meuni_pay_opts');
				var opts = JSON.parse(saved_opts);

				/* 延迟执行，确保页面 DOM 就绪 */
				setTimeout(function() {
					inject_styles();
					build_drawer();
					render_checkout(opts);
					open_drawer();
					current_options	= opts;
					selected_method	= 'wechat';

					/* 自动触发 JSAPI 支付流程 */
					handle_wechat_jsapi(opts);
				}, 300);
			}
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', check_wechat_oauth_return);
	} else {
		check_wechat_oauth_return();
	}


	/* ---------- 微信 H5 支付返回处理 ---------- */

	function check_wechat_h5_return() {
		var params		= new URLSearchParams(window.location.search);
		var order_id	= params.get('order_id') || '';

		if (!params.get('wechat_h5_done') || order_id === '') {
			return;
		}

		var clean_url = window.location.pathname;
		window.history.replaceState({}, document.title, clean_url);

		var saved = sessionStorage.getItem('wechat_h5_opts');

		if (!saved) {
			return;
		}

		sessionStorage.removeItem('wechat_h5_opts');

		var opts = JSON.parse(saved);

		current_order_id	= order_id;
		current_options		= opts;
		selected_method		= 'wechat';

		setTimeout(function() {
			inject_styles();
			build_drawer();
			render_checkout(opts);
			open_drawer();

			var body = document.querySelector('#' + DRAWER_ID + ' .mp-body');

			if (body) {
				body.textContent = '';

				var wrap	= create_el('div', 'mp-success');
				var spinner	= create_el('span', 'mp-spinner-dark');

				spinner.style.width		= '32px';
				spinner.style.height	= '32px';
				spinner.style.margin	= '0 auto 16px';
				spinner.style.display	= 'block';
				wrap.appendChild(spinner);
				wrap.appendChild(create_el('div', 'mp-success-desc', t('waiting_pay')));
				body.appendChild(wrap);
			}

			poll_once(order_id, opts);
			start_polling(order_id, opts);
		}, 300);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', check_wechat_h5_return);
	} else {
		check_wechat_h5_return();
	}


	/* ---------- 手机端提示 ---------- */

	function render_mobile_notice(opts) {
		var body	= document.querySelector('#' + DRAWER_ID + ' .mp-body');
		var header	= document.querySelector('#' + DRAWER_ID + ' .mp-header');

		body.textContent = '';

		if (header) header.style.display = 'none';

		var wrap = create_el('div', 'mp-error');

		var icon_div	= create_el('div', 'mp-error-icon');
		icon_div.textContent			= '📱';
		icon_div.style.background		= 'linear-gradient(135deg, #F59E0B, #FBBF24)';

		var title_div	= create_el('div', 'mp-error-title', t('mobile_notice'));
		var desc_div	= create_el('div', 'mp-error-desc', t('mobile_notice_desc'));

		desc_div.style.lineHeight	= '1.8';
		desc_div.style.fontSize		= '14px';

		wrap.appendChild(icon_div);
		wrap.appendChild(title_div);
		wrap.appendChild(desc_div);

		var ok_btn = create_el('button', 'mp-retry-btn', t('got_it'));
		ok_btn.addEventListener('click', function() {
			if (header) header.style.display = '';
			render_checkout(opts);
		});
		wrap.appendChild(ok_btn);

		var close_btn = create_el('button', 'mp-close-order-btn', t('close'));
		close_btn.addEventListener('click', function() { close_drawer(); });
		wrap.appendChild(close_btn);

		body.appendChild(wrap);
	}


	/* ---------- 成功/错误/超时渲染 ---------- */

	function render_success(order, opts) {
		console.log('[MeuniPay] render_success called, order=' + order.order_id + ', item=' + order.item_name + ', price=' + order.price);
		var body = document.querySelector('#' + DRAWER_ID + ' .mp-body');
		body.textContent = '';

		var header = document.querySelector('#' + DRAWER_ID + ' .mp-header');

		if (header) header.style.display = 'none';

		var success_fired	= false;
		var success_wrap	= create_el('div', 'mp-success');

		var icon_div	= create_el('div', 'mp-success-icon', '✓');
		var title_div	= create_el('div', 'mp-success-title', t('pay_success'));
		var desc_div	= create_el('div', 'mp-success-desc', t('pay_success_desc'));
		var order_div	= create_el('div', 'mp-order-id', t('order_id') + '：' + order.order_id);

		success_wrap.appendChild(icon_div);
		success_wrap.appendChild(title_div);
		success_wrap.appendChild(desc_div);
		success_wrap.appendChild(order_div);

		/* 倒计时提示 */
		var countdown_sec	= 3;
		var countdown_div	= create_el('div', 'mp-order-id', countdown_sec + t('auto_close'));
		countdown_div.style.color		= '#2563EB';
		countdown_div.style.marginTop	= '8px';
		success_wrap.appendChild(countdown_div);

		function fire_success_once() {
			if (success_fired) { return; }
			success_fired = true;
			clearInterval(auto_close_timer);
			close_success();
			if (opts.onSuccess) { opts.onSuccess(order); }
			current_options = null;
		}

		if (opts.onSuccess) {
			var result_btn	= create_el('button', 'mp-result-btn', t('view_result'));
			result_btn.id	= 'mp-view-result';
			result_btn.addEventListener('click', fire_success_once);
			success_wrap.appendChild(result_btn);
		}

		var done_btn	= create_el('button', 'mp-close-order-btn', t('close'));
		done_btn.id		= 'mp-close-done';
		done_btn.addEventListener('click', fire_success_once);
		success_wrap.appendChild(done_btn);

		body.appendChild(success_wrap);

		/* 3秒倒计时自动关闭并触发回调 */
		var auto_close_timer = setInterval(function() {
			countdown_sec--;

			if (countdown_sec <= 0) {
				fire_success_once();
				return;
			}

			countdown_div.textContent = countdown_sec + t('auto_close');
		}, 1000);
	}

	function render_error(message, opts) {
		var body = document.querySelector('#' + DRAWER_ID + ' .mp-body');
		body.textContent = '';

		var header = document.querySelector('#' + DRAWER_ID + ' .mp-header');

		if (header) header.style.display = 'none';

		var wrap = create_el('div', 'mp-error');

		var icon_div	= create_el('div', 'mp-error-icon', '✕');
		var title_div	= create_el('div', 'mp-error-title', t('pay_error'));
		var desc_div	= create_el('div', 'mp-error-desc', message);

		wrap.appendChild(icon_div);
		wrap.appendChild(title_div);
		wrap.appendChild(desc_div);

		var retry_btn = create_el('button', 'mp-retry-btn', t('retry'));
		retry_btn.addEventListener('click', function() {
			if (header) header.style.display = '';
			render_checkout(opts);
		});
		wrap.appendChild(retry_btn);

		var close_btn = create_el('button', 'mp-close-order-btn', t('close'));
		close_btn.addEventListener('click', function() { close_drawer(); });
		wrap.appendChild(close_btn);

		body.appendChild(wrap);
	}

	function render_timeout(opts) {
		var body = document.querySelector('#' + DRAWER_ID + ' .mp-body');
		body.textContent = '';

		var header = document.querySelector('#' + DRAWER_ID + ' .mp-header');

		if (header) header.style.display = 'none';

		var wrap = create_el('div', 'mp-error');

		var icon_div	= create_el('div', 'mp-error-icon', '⏱');
		var title_div	= create_el('div', 'mp-error-title', t('pay_timeout'));
		var desc_div	= create_el('div', 'mp-error-desc', t('pay_timeout_desc'));

		wrap.appendChild(icon_div);
		wrap.appendChild(title_div);
		wrap.appendChild(desc_div);

		var retry_btn = create_el('button', 'mp-retry-btn', t('retry'));
		retry_btn.addEventListener('click', function() {
			if (header) header.style.display = '';
			render_checkout(opts);
		});
		wrap.appendChild(retry_btn);

		var close_btn = create_el('button', 'mp-close-order-btn', t('close'));
		close_btn.addEventListener('click', function() { close_drawer(); });
		wrap.appendChild(close_btn);

		body.appendChild(wrap);
	}

	function close_success() {
		var overlay	= document.getElementById(OVERLAY_ID);
		var drawer	= document.getElementById(DRAWER_ID);
		var header	= document.querySelector('#' + DRAWER_ID + ' .mp-header');

		if (drawer) drawer.classList.remove('mp-open');

		setTimeout(function() {
			if (overlay) overlay.classList.remove('mp-show');
			if (overlay) overlay.style.display = 'none';
			if (header) header.style.display = '';
			document.body.style.overflow = '';
		}, 350);
	}


	/* ---------- 额度查询与使用 ---------- */

	function check_credits(service_id, callback) {
		var uid = get_user_id();

		fetch(API_BASE + '/api/pay/credits?user_id=' + uid)
		.then(function(res) { return res.json(); })
		.then(function(data) {
			var credits		= data.credits || [];
			var available	= 0;

			for (var i = 0; i < credits.length; i++) {
				if (credits[i].service_id === service_id) {
					available += credits[i].credits_total - credits[i].credits_used;
				}
			}

			callback(available > 0, available);
		})
		.catch(function() {
			callback(false, 0);
		});
	}

	function use_credit(service_id, callback) {
		var uid = get_user_id();

		fetch(API_BASE + '/api/pay/use-credit', {
			method:		'POST',
			headers:	{ 'Content-Type': 'application/json' },
			body:		JSON.stringify({ user_id: uid, service_id: service_id })
		})
		.then(function(res) { return res.json(); })
		.then(function(data) {
			callback(data.success, data);
		})
		.catch(function() {
			callback(false);
		});
	}


	/* ---------- 公开 API ---------- */

	function checkout(opts) {
		if (opts === undefined || opts === null) {
			console.error('[MeuniPay] checkout() 需要 name 和 price 参数');
			return;
		}

		if (opts.name === undefined || opts.price === undefined) {
			console.error('[MeuniPay] checkout() 需要 name 和 price 参数');
			return;
		}

		/* 清理上一次支付的残留状态 */
		console.log('[MeuniPay] checkout called: ' + opts.name + ' ¥' + opts.price + ', poll_timer=' + (poll_timer ? 'active' : 'null') + ', polling_order=' + polling_order_id);
		if (poll_timer) {
			clearInterval(poll_timer);
			poll_timer = null;
		}
		polling_order_id	= null;
		polling_opts		= null;
		current_order_id	= null;

		opts.currency	= opts.currency || 'CNY';
		opts.quantity	= opts.quantity || 1;
		current_options	= opts;
		selected_method	= 'wechat';

		inject_styles();
		build_drawer();
		render_checkout(opts);
		open_drawer();
	}

	function set_lang(lang) {
		if (LABELS[lang]) {
			LANG = lang;
		}
	}

	function get_orders() {
		try {
			return JSON.parse(localStorage.getItem('meuni_orders') || '[]');
		} catch(e) {
			return [];
		}
	}

	return {
		checkout:		checkout,
		set_lang:		set_lang,
		get_orders:		get_orders,
		check_credits:	check_credits,
		use_credit:		use_credit,
		get_user_id:	get_user_id
	};

})();
