// Me Offer · 31 省配置 API
// GET /api/provinces             - 返回所有省（含 data_status 标记）
// GET /api/provinces?code=shandong - 返回指定省详情

export async function onRequestGet(context) {
	const request							= context.request;
	const env								= context.env;
	const url								= new URL(request.url);

	const code								= url.searchParams.get('code');

	try {
		if (code) {
			// 单个省详情
			const row						= await env.DB.prepare(
				'SELECT * FROM provinces WHERE code = ? AND (code NOT LIKE "%_north%" OR code = "hebei")'
			).bind(code).first();

			if (!row) {
				return json_response({error: 'province not found'}, 404);
			}

			return json_response({
				province: enrich_province(row)
			});
		}

		// 全部省列表
		const result						= await env.DB.prepare(`
			SELECT code, name, name_short, reform_year, reform_type, model,
				   chong_count, wen_count, bao_count, subject_select, data_status, recommended_priority
			FROM provinces
			WHERE code NOT LIKE '%_north%'
			ORDER BY recommended_priority ASC, name ASC
		`).all();

		const rows							= result.results || [];
		const enriched						= rows.map(enrich_province);

		return json_response({
			total:		enriched.length,
			provinces:	enriched,
			meta:		{
				supported_count:	enriched.filter(p => p.data_status === 'complete').length,
				coming_count:		enriched.filter(p => p.data_status === 'pending' || p.data_status === 'partial').length,
				not_supported_count: enriched.filter(p => p.data_status === 'not_supported').length
			}
		});
	} catch (e) {
		return json_response({error: 'db error: ' + e.message}, 500);
	}
}


function enrich_province(row) {
	let total_volunteers				= null;
	if (row.chong_count != null && row.wen_count != null && row.bao_count != null) {
		total_volunteers				= row.chong_count + row.wen_count + row.bao_count;
	}

	let status_label;
	switch (row.data_status) {
		case 'complete':		status_label = '已支持'; break;
		case 'partial':			status_label = '部分支持'; break;
		case 'pending':			status_label = '即将上线'; break;
		case 'not_supported':	status_label = '暂不支持'; break;
		default:				status_label = '未知';
	}

	return {
		code:				row.code,
		name:				row.name,
		name_short:			row.name_short,
		reform_year:		row.reform_year,
		reform_type:		row.reform_type,
		model:				row.model,
		total_volunteers:	total_volunteers,
		chong_count:		row.chong_count,
		wen_count:			row.wen_count,
		bao_count:			row.bao_count,
		subject_select:		row.subject_select,
		data_status:		row.data_status,
		status_label:		status_label,
		priority:			row.recommended_priority,
		available:			row.data_status === 'complete',
		batches:			row.batches_json ? safe_json_parse(row.batches_json) : [],
		special_notes:		row.special_notes ? safe_json_parse(row.special_notes) : []
	};
}


function safe_json_parse(str) {
	try { return JSON.parse(str); }
	catch (e) { return []; }
}


function json_response(data, status) {
	return new Response(JSON.stringify(data), {
		status:		status || 200,
		headers:	{
			'Content-Type':		'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*',
			'Cache-Control':	'public, max-age=600'
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
