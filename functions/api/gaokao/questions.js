// Me Offer · 高考真题 API v3（官方答案 + 详解 + 表格）
// GET /api/gaokao/questions?province=beijing&subject=biology&year=2025

export async function onRequestGet(context) {
	const url = new URL(context.request.url);
	const province = url.searchParams.get('province') || 'beijing';
	const subject = url.searchParams.get('subject') || 'biology';
	const year = parseInt(url.searchParams.get('year') || '2025', 10);

	const db = context.env.DB;
	if (!db) {
		return new Response(JSON.stringify({ error: 'D1 not bound' }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}

	const rs = await db
		.prepare(
			'SELECT question_no, question_type, stem, stem_has_table, options_json, ' +
			'answer, answer_full, analysis, stem_images_json, analysis_images_json, ' +
			'image_dir, source, source_pdf ' +
			'FROM gaokao_questions_real ' +
			'WHERE province = ? AND subject = ? AND year = ? ' +
			'ORDER BY question_no ASC'
		)
		.bind(province, subject, year)
		.all();

	const questions = (rs.results || []).map(function(row) {
		let opts = [];
		let stem_imgs = [];
		let ana_imgs = [];
		try { opts = JSON.parse(row.options_json || '[]'); } catch (e) {}
		try { stem_imgs = JSON.parse(row.stem_images_json || '[]'); } catch (e) {}
		try { ana_imgs = JSON.parse(row.analysis_images_json || '[]'); } catch (e) {}

		const dir = row.image_dir || '';
		const img_prefix = '/assets/gaokao_images/' + dir + '/';

		return {
			no:					row.question_no,
			type:				row.question_type,
			stem:				row.stem,
			stem_has_table:		row.stem_has_table === 1,
			options:			opts,
			answer:				row.answer || '',
			answer_full:		row.answer_full || '',
			analysis:			row.analysis || '',
			stem_images:		stem_imgs.map(function(f) { return img_prefix + f; }),
			analysis_images:	ana_imgs.map(function(f) { return img_prefix + f; }),
			source_pdf:			row.source_pdf || ''
		};
	});

	const source_label = (rs.results[0] && rs.results[0].source) || '';

	return new Response(
		JSON.stringify({
			province:	province,
			subject:	subject,
			year:		year,
			source:		source_label,
			count:		questions.length,
			questions:	questions
		}),
		{
			headers: {
				'content-type':					'application/json; charset=utf-8',
				'access-control-allow-origin':	'*',
				'cache-control':				'public, max-age=300'
			}
		}
	);
}
