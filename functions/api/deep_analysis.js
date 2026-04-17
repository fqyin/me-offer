// Me Offer · 深度分析 API（¥1,999 终审专用）
// POST /api/deep_analysis
// body: { volunteers: [{school_name, group_name, min_rank}, ...前 3 个冲档] }
// Returns: { big_small_analysis: [...], career_path: {...}, major_heat: [...] }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const vols								= (body.volunteers || []).slice(0, 5);
	if (vols.length === 0) {
		return json_response({error: 'no volunteers'}, 400);
	}

	const analysis							= [];
	for (const v of vols) {
		const school_analysis				= await analyze_school_volatility(env.DB, v.school_name);
		analysis.push({
			school_name:		v.school_name,
			group_name:			v.group_name,
			current_rank:		v.min_rank,
			...school_analysis
		});
	}

	return json_response({
		big_small_analysis:		analysis,
		source:					'real_data_calculation'
	});
}


async function analyze_school_volatility(db, school_name) {
	// 查该校近 5 年最低录取位次
	const rows								= await db.prepare(`
		SELECT year, MIN(min_rank) AS best_rank
		FROM gaokao_scores
		WHERE school_name = ? AND year BETWEEN 2021 AND 2025
		GROUP BY year
		ORDER BY year
	`).bind(school_name).all();

	const data								= rows.results || [];

	if (data.length < 3) {
		return {
			std_dev:			null,
			trend:				'数据不足',
			ranks_by_year:		data,
			judgment:			'该院校近年录取数据不完整，无法判断大小年'
		};
	}

	// 真实计算标准差
	const ranks								= data.map(r => r.best_rank);
	const mean								= ranks.reduce((a, b) => a + b, 0) / ranks.length;
	const variance							= ranks.reduce((sum, r) => sum + (r - mean) * (r - mean), 0) / ranks.length;
	const std_dev							= Math.round(Math.sqrt(variance));

	// 判断大小年
	const last								= ranks[ranks.length - 1];
	const prev								= ranks[ranks.length - 2];
	const diff_last_prev					= last - prev;

	let judgment;
	let trend_label;

	if (std_dev < 500) {
		trend_label							= '稳定';
		judgment							= '该校录取位次近 5 年波动小（标准差 ' + std_dev + '），今年预期与往年接近';
	} else if (diff_last_prev > 2000) {
		trend_label							= '小年（2025 变易）';
		judgment							= '2025 比 2024 位次上升 ' + diff_last_prev + '（录取变易），预计 2026 可能回落，风险：可能出现大年反弹';
	} else if (diff_last_prev < -2000) {
		trend_label							= '大年（2025 变难）';
		judgment							= '2025 比 2024 位次下降 ' + Math.abs(diff_last_prev) + '（录取变难），预计 2026 可能反弹上升（变易），机会：可适度冲';
	} else {
		trend_label							= '平稳波动';
		judgment							= '近 2 年位次波动温和（±' + Math.abs(diff_last_prev) + '），标准差 ' + std_dev + '';
	}

	return {
		std_dev:			std_dev,
		trend:				trend_label,
		ranks_by_year:		data,
		judgment:			judgment
	};
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
