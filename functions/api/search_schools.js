// Me Offer · 学校搜索 API（三级判断）
// GET /api/search_schools?q=XXX&user_subjects=physics,chemistry,biology&user_rank=37499
// Returns: {
//   verified: [...],     // D1 认证学校列表（从 universities 全量 2868 所查找）
//   total: N,
//   source: 'd1',        // 数据来源
// }
// 前端再与 AI 候选池做比对，判断是「在候选池 / 仅教育部认证 / 野鸡」

export async function onRequestGet(context) {
	const request							= context.request;
	const env								= context.env;
	const url								= new URL(request.url);
	const q									= (url.searchParams.get('q') || '').trim();

	if (!q || q.length < 2) {
		return json_response({ verified: [], total: 0, source: 'empty' });
	}

	/* 模糊搜索 universities 表（学校名精确 / LIKE 匹配） */
	const sql								= `
		SELECT u.code, u.name, u.city, u.province, u.tier, u.nature, u.rank_ruanke,
		       um.is_985, um.is_211, um.is_double_first, um.province_name as mapping_province
		FROM universities u
		LEFT JOIN university_mapping um ON u.name = um.school_name
		WHERE u.name LIKE ? OR u.name LIKE ?
		ORDER BY
			CASE WHEN u.name = ? THEN 0
			     WHEN u.name LIKE ? THEN 1
			     ELSE 2
			END,
			u.rank_ruanke ASC NULLS LAST
		LIMIT 20
	`;

	try {
		const result						= await env.DB.prepare(sql).bind(
			'%' + q + '%',
			q + '%',
			q,
			q + '%'
		).all();

		const rows							= result.results || [];
		const verified						= rows.map(r => ({
			code:			r.code,
			school_name:	r.name,
			city:			r.city || r.mapping_province,
			province:		r.province,
			tier:			r.tier,
			nature:			r.nature,
			is_985:			r.is_985 || (r.tier === '985' ? 1 : 0),
			is_211:			r.is_211 || (r.tier === '211' ? 1 : 0),
			is_double_first:r.is_double_first || 0,
			rank_ruanke:	r.rank_ruanke
		}));

		return json_response({
			verified:	verified,
			total:		verified.length,
			source:		'd1'
		});
	}
	catch (e) {
		return json_response({ verified: [], total: 0, source: 'error', error: e.message }, 500);
	}
}


function json_response(data, status) {
	return new Response(JSON.stringify(data), {
		status:		status || 200,
		headers:	{
			'Content-Type':					'application/json; charset=utf-8',
			'Access-Control-Allow-Origin':	'*',
			'Cache-Control':				'public, max-age=300'
		}
	});
}


export async function onRequestOptions() {
	return new Response(null, {
		status:		204,
		headers:	{
			'Access-Control-Allow-Origin':	'*',
			'Access-Control-Allow-Methods':	'GET, OPTIONS',
			'Access-Control-Allow-Headers':	'Content-Type'
		}
	});
}
