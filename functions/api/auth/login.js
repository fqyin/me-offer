// Me Offer · 家长登录（手机号一键登录 · 测试期）
// POST /api/auth/login
// body: { phone: '13800001234' }
// Returns: { parent, family, students, token, is_new_parent, profile_complete }

export async function onRequestPost(context) {
	const env								= context.env;
	let body;
	try {
		body								= await context.request.json();
	} catch (e) {
		return json_response({ error: 'invalid json' }, 400);
	}

	const phone								= String(body.phone || '').trim();

	if (!/^1[3-9]\d{9}$/.test(phone)) {
		return json_response({ error: '请输入正确的 11 位手机号' }, 400);
	}

	/* 查家长 */
	let parent								= await env.DB.prepare(
		'SELECT id, family_id, phone, nickname, avatar_url, real_name, relation, is_owner FROM parents WHERE phone = ?'
	).bind(phone).first();

	let is_new_parent						= false;
	let family								= null;

	if (!parent) {
		/* 新家长 · 自动创建 Family + parent */
		const invite_code					= generate_invite_code();
		const default_family_name			= '家长' + phone.slice(-4) + '之家';

		const fam_res						= await env.DB.prepare(
			'INSERT INTO families (family_name, invite_code, created_at) VALUES (?, ?, datetime(\'now\'))'
		).bind(default_family_name, invite_code).run();
		const family_id						= fam_res.meta.last_row_id;

		const p_res							= await env.DB.prepare(
			'INSERT INTO parents (family_id, phone, nickname, is_owner, created_at, last_login_at) VALUES (?, ?, ?, 1, datetime(\'now\'), datetime(\'now\'))'
		).bind(family_id, phone, '家长' + phone.slice(-4)).run();

		parent								= {
			id:			p_res.meta.last_row_id,
			family_id:	family_id,
			phone:		phone,
			nickname:	'家长' + phone.slice(-4),
			avatar_url:	null,
			real_name:	null,
			relation:	null,
			is_owner:	1
		};

		family								= {
			id:				family_id,
			family_name:	default_family_name,
			family_motto:	null,
			invite_code:	invite_code,
			vip_level:		0
		};

		is_new_parent						= true;

		/* 记录注册元数据 (IP / 国家 / 城市 / 来源) */
		try {
			const req						= context.request;
			const cf						= req.cf || {};
			const xff						= (req.headers.get('X-Forwarded-For') || '').split(',')[0].trim();
			const real_ip					= xff || req.headers.get('X-Real-IP') || req.headers.get('CF-Connecting-IP') || '';

			let country						= cf.country || '';
			let region						= cf.region || '';
			let city						= cf.city || '';
			let timezone					= cf.timezone || '';

			/* 经 Nginx 中转时 cf.country 不准, 用真实 IP 查 ip-api.com */
			const cf_ip						= req.headers.get('CF-Connecting-IP') || '';
			if (real_ip && real_ip !== cf_ip) {
				try {
					const geo_resp			= await fetch('http://ip-api.com/json/' + real_ip + '?fields=status,countryCode,regionName,city,timezone', {
						cf:	{ cacheTtl: 86400, cacheEverything: true }
					});
					if (geo_resp.ok) {
						const g				= await geo_resp.json();
						if (g.status === 'success') {
							country			= g.countryCode || country;
							region			= g.regionName || region;
							city			= g.city || city;
							timezone		= g.timezone || timezone;
						}
					}
				} catch (e) {}
			}

			const ua						= (req.headers.get('User-Agent') || '').slice(0, 300);
			const referrer					= (req.headers.get('Referer') || '').slice(0, 300);

			await env.DB.prepare(
				'INSERT OR REPLACE INTO user_register_meta (user_id, ip, country, region, city, timezone, user_agent, referrer, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
			).bind(String(parent.id), real_ip, country, region, city, timezone, ua, referrer, 'me_offer').run();
		} catch (e) {}
	} else {
		/* 老家长 · 更新 last_login_at */
		await env.DB.prepare(
			'UPDATE parents SET last_login_at = datetime(\'now\') WHERE id = ?'
		).bind(parent.id).run();

		family								= await env.DB.prepare(
			'SELECT id, family_name, family_motto, avatar_url, province, invite_code, vip_level, vip_expires_at, total_paid, created_at FROM families WHERE id = ?'
		).bind(parent.family_id).first();
	}

	/* 查 Family 下的所有孩子 */
	const students_res						= await env.DB.prepare(
		'SELECT id, real_name, nickname, grade, province, target_univ, target_score, avatar_url, gender FROM students WHERE family_id = ? AND active = 1 ORDER BY id ASC'
	).bind(parent.family_id).all();

	const students							= students_res.results || [];

	/* 生成 session token（30 天有效） */
	const token								= 'tk_' + crypto.randomUUID().replace(/-/g, '');
	const expires_at						= new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
	const current_student_id				= students.length > 0 ? students[0].id : null;

	await env.DB.prepare(
		'INSERT INTO parent_sessions (token, parent_id, family_id, current_student_id, expires_at) VALUES (?, ?, ?, ?, ?)'
	).bind(token, parent.id, parent.family_id, current_student_id, expires_at).run();

	return json_response({
		token:				token,
		is_new_parent:		is_new_parent,
		parent:				parent,
		family:				family,
		students:			students,
		current_student_id:	current_student_id,
		profile_complete:	!!parent.real_name && students.length > 0
	});
}


function generate_invite_code() {
	const chars								= 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	let code								= 'FAM-';
	for (let i = 0; i < 6; i = i + 1) {
		code								= code + chars[Math.floor(Math.random() * chars.length)];
	}
	return code;
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
