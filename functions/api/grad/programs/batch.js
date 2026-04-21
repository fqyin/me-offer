// Me Offer 考研扩充 · 批量写入研究生专业数据到 D1
// POST /api/grad/programs/batch
// body: { university_code, programs: [{college_name, program_code, program_name, ...}] }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const university_code					= body.university_code || '';
	const programs							= body.programs || [];

	if (!university_code) {
		return json_response({error: 'missing university_code'}, 400);
	}

	if (programs.length === 0) {
		return json_response({success: true, count: 0});
	}

	let inserted							= 0;
	let errors								= [];

	for (const p of programs) {
		try {
			// 判断 program_type
			let type						= p.program_type || '';
			if (!type && p.program_code) {
				const c						= String(p.program_code).substring(0, 2);
				// 025, 035, 045, 055, 085, 095, 105, 125, 135 = 专业型
				if (['02', '03', '04', '05', '08', '09', '10', '12', '13'].includes(c) && String(p.program_code).charAt(2) === '5') {
					type					= '专业型';
				} else {
					type					= '学术型';
				}
			}

			await env.DB.prepare(`
				INSERT INTO graduate_programs (
					university_code, discipline_code, program_name, program_type, degree_type,
					college_name, research_directions, exam_subjects, study_mode,
					plan_count_2025, plan_tuition_note, updated_at
				)
				VALUES (?, ?, ?, ?, '硕士', ?, ?, ?, ?, ?, ?, datetime('now'))
			`).bind(
				university_code,
				(p.program_code || '').substring(0, 4),	// 取前 4 位作为学科代码
				p.program_name || '',
				type,
				p.college_name || '',
				p.research_direction || '',
				p.exam_subjects || '',
				p.study_mode || '全日制',
				p.plan_count ? parseInt(p.plan_count) : null,
				p.notes || ''
			).run();

			inserted++;
		}
		catch (e) {
			errors.push({program: p.program_name, err: e.message});
		}
	}

	// 更新 graduate_schools.scraped_at
	try {
		await env.DB.prepare(`
			UPDATE graduate_schools SET scraped_at = datetime('now') WHERE university_code = ?
		`).bind(university_code).run();
	} catch (e) {}

	return json_response({
		success:	true,
		count:		inserted,
		errors:		errors.slice(0, 5)
	});
}


function json_response(data, status) {
	return new Response(JSON.stringify(data), {
		status:		status || 200,
		headers:	{
			'Content-Type':		'application/json; charset=utf-8',
			'Access-Control-Allow-Origin':	'*'
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
