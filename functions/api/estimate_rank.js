// Me Offer · 位次估算 API
// POST /api/estimate_rank  body: { score: 578, subject_type: 'total' | 'physics' | ... }
// Returns: { rank, year, score, equivalent: { 2024: {score,rank}, ... } }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const score								= parseInt(body.score);
	const subject_type						= body.subject_type || 'total';
	const target_year						= parseInt(body.year) || 2025;

	if (isNaN(score) || score < 100 || score > 750) {
		return json_response({error: 'score must be 100-750'}, 400);
	}

	const allowed_subjects					= ['total', 'physics', 'chemistry', 'biology', 'politics', 'history', 'geography'];
	if (!allowed_subjects.includes(subject_type)) {
		return json_response({error: 'invalid subject_type'}, 400);
	}

	// 查目标年份的位次
	const stmt								= env.DB.prepare('SELECT score, rank, count FROM gaokao_segments WHERE year = ? AND subject_type = ? AND score = ? LIMIT 1');
	const exact								= await stmt.bind(target_year, subject_type, score).first();

	let rank;
	if (exact) {
		rank								= exact.rank;
	} else {
		// 线性插值：找上下最近两个分数
		const neighbors						= await env.DB.prepare('SELECT score, rank FROM gaokao_segments WHERE year = ? AND subject_type = ? ORDER BY ABS(score - ?) LIMIT 2').bind(target_year, subject_type, score).all();
		if (!neighbors.results || neighbors.results.length === 0) {
			return json_response({error: 'no data for year'}, 404);
		}
		const s1							= neighbors.results[0];
		const s2								= neighbors.results[1] || s1;
		if (s1.score === s2.score) {
			rank							= s1.rank;
		} else {
			const ratio						= (score - s1.score) / (s2.score - s1.score);
			rank							= Math.round(s1.rank + (s2.rank - s1.rank) * ratio);
		}
	}

	// 查近 4 年等效分：给定位次找对应分数
	const equivalent						= {};
	const eq_years							= [2024, 2023, 2022, 2021].filter(y => y !== target_year);
	for (const y of eq_years) {
		const eq_stmt						= env.DB.prepare('SELECT score, rank FROM gaokao_segments WHERE year = ? AND subject_type = ? ORDER BY ABS(rank - ?) LIMIT 1').bind(y, subject_type, rank);
		const eq							= await eq_stmt.first();
		if (eq) {
			equivalent[y]					= {score: eq.score, rank: eq.rank};
		}
	}

	return json_response({
		score:					score,
		subject_type:			subject_type,
		year:					target_year,
		rank:					rank,
		equivalent:				equivalent
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
