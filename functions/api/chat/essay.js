// Me Offer · 作文批改 API (Claude Sonnet 4.6)
// POST /api/chat/essay
// body: {
//   essay_text: '学生作文全文',
//   topic: '作文题目',
//   grade: 'senior3'  // junior1/2/3, senior1/2/3
// }
// Returns: { grade_score, strengths, weaknesses, suggestions, polished_sample, tokens }


export async function onRequestPost(context) {
	const env								= context.env;

	let body;
	try {
		body								= await context.request.json();
	} catch (e) {
		return json_response({ error: 'invalid json' }, 400);
	}

	const essay_text						= String(body.essay_text || '').trim();
	const topic								= String(body.topic || '').trim();
	const grade								= String(body.grade || 'senior3').trim();

	if (!essay_text) {
		return json_response({ error: '作文内容不能为空' }, 400);
	}

	if (essay_text.length > 3000) {
		return json_response({ error: '作文超过 3000 字，请精简后再试' }, 400);
	}

	if (!env.CLAUDE_API_KEY) {
		return json_response({ error: 'Claude API Key 未配置' }, 500);
	}

	const system_prompt						= build_essay_prompt(grade);
	const user_prompt						= build_user_prompt(topic, essay_text);

	try {
		const claude_res					= await fetch('https://api.anthropic.com/v1/messages', {
			method:		'POST',
			headers:	{
				'Content-Type':			'application/json',
				'x-api-key':			env.CLAUDE_API_KEY,
				'anthropic-version':	'2023-06-01'
			},
			body:		JSON.stringify({
				model:		'claude-sonnet-4-6',
				max_tokens:	2500,
				system:		system_prompt,
				messages:	[{ role: 'user', content: user_prompt }]
			})
		});

		if (!claude_res.ok) {
			const err_text					= await claude_res.text();
			return json_response({ error: 'AI 批改失败', details: err_text.slice(0, 200) }, 500);
		}

		const data							= await claude_res.json();
		let text							= '';
		if (data.content && data.content[0] && data.content[0].text) {
			text							= data.content[0].text;
		}

		/* 尝试解析 JSON */
		let parsed							= try_parse_essay_json(text);
		if (!parsed) {
			/* 失败兜底：直接把全文作为 summary 返回 */
			parsed							= {
				total_score:		null,
				summary:			text,
				strengths:			[],
				weaknesses:			[],
				suggestions:		[],
				polished_sample:	''
			};
		}

		return json_response({
			result:		parsed,
			model:		'claude-sonnet-4-6',
			tokens:		data.usage || null
		});
	} catch (err) {
		return json_response({ error: '网络异常', details: String(err).slice(0, 200) }, 500);
	}
}


function build_essay_prompt(grade) {
	const grade_label						= grade.indexOf('senior') === 0 ? '高中' : '初中';

	return '你是中国顶级语文教研专家，长期参与高考作文阅卷和教材编写。你的任务是对' + grade_label + '作文进行"结构化批改"，严格按 JSON 格式输出。\n\n' +
		'【评分维度】\n' +
		'1. 立意深度（15 分）\n' +
		'2. 结构清晰（10 分）\n' +
		'3. 语言表达（15 分）\n' +
		'4. 素材引用（5 分）\n' +
		'5. 书写规范（5 分）\n' +
		'总分 50 分，高考作文折算满分 60 分（按比例）。\n\n' +
		'【输出格式 - 严格 JSON】\n' +
		'```json\n' +
		'{\n' +
		'  "total_score": 42,\n' +
		'  "dimensions": {\n' +
		'    "liyi": {"score": 12, "max": 15, "comment": "立意评价 50-80 字"},\n' +
		'    "jiegou": {"score": 8, "max": 10, "comment": "结构评价"},\n' +
		'    "yuyan": {"score": 12, "max": 15, "comment": "语言评价"},\n' +
		'    "sucai": {"score": 4, "max": 5, "comment": "素材评价"},\n' +
		'    "shuxie": {"score": 4, "max": 5, "comment": "书写评价"}\n' +
		'  },\n' +
		'  "summary": "总评 100-150 字：这篇文章...",\n' +
		'  "strengths": ["亮点 1", "亮点 2", "亮点 3"],\n' +
		'  "weaknesses": ["弱点 1 + 具体举例", "弱点 2"],\n' +
		'  "suggestions": ["具体建议 1", "具体建议 2", "具体建议 3"],\n' +
		'  "polished_sample": "将原文开头或薄弱段润色后的示范文（80-200 字）"\n' +
		'}\n' +
		'```\n\n' +
		'【重要】\n' +
		'- 只输出 JSON 对象，前后不要任何解释文字\n' +
		'- JSON 字符串内不要使用中文引号，需要引用文字时用单引号或全角书名号\n' +
		'- 评价要具体，不能说空话\n' +
		'- 批改风格严格但有温度，既指出问题又给希望\n' +
		'- 如果作文跑题或太简单，给出的分数要真实反映\n' +
		'- 语言：简体中文';
}


function build_user_prompt(topic, essay_text) {
	let out									= '请批改下面这篇学生作文：\n\n';
	if (topic) out							= out + '【题目】' + topic + '\n\n';
	out										= out + '【学生作文】\n' + essay_text + '\n\n请严格按 JSON 格式输出批改结果。';
	return out;
}


function try_parse_essay_json(text) {
	text									= String(text || '').trim();

	/* 去掉 markdown 代码块包裹 */
	if (text.indexOf('```') !== -1) {
		const match							= text.match(/```(?:json)?\s*([\s\S]*?)```/);
		if (match) text						= match[1].trim();
	}

	/* 尝试找 JSON 起止位置 */
	const start								= text.indexOf('{');
	const end								= text.lastIndexOf('}');
	if (start === -1 || end === -1 || end < start) return null;

	let json_str							= text.slice(start, end + 1);

	try {
		return JSON.parse(json_str);
	} catch (e) {
		/* 尝试修复常见错误：中文引号 “ ” 混入 */
		const fixed							= json_str.replace(/[\u201c\u201d]/g, '\\"').replace(/[\u2018\u2019]/g, "'");
		try {
			return JSON.parse(fixed);
		} catch (e2) {
			return null;
		}
	}
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
