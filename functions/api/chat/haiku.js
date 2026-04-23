// Me Offer · AI 名师对话 API (Claude Haiku 4.5)
// POST /api/chat/haiku
// body: {
//   teacher_code, teacher_name, teacher_subject, teacher_motto, teacher_style,
//   messages: [{role: 'assistant|user', content: '...'}]
// }
// Returns: { reply: '...', tokens: {...} }

export async function onRequestPost(context) {
	const env								= context.env;

	let body;
	try {
		body								= await context.request.json();
	} catch (e) {
		return json_response({ error: 'invalid json' }, 400);
	}

	const teacher_name						= String(body.teacher_name || 'Lily 老师').trim();
	const teacher_subject					= String(body.teacher_subject || '语文').trim();
	const teacher_motto						= String(body.teacher_motto || '').trim();
	const teacher_style						= String(body.teacher_style || '').trim();
	const messages							= Array.isArray(body.messages) ? body.messages : [];

	if (messages.length === 0) {
		return json_response({ error: 'messages 不能为空' }, 400);
	}

	const last_user_msg						= messages[messages.length - 1];
	if (!last_user_msg || !last_user_msg.content) {
		return json_response({ error: '最后一条消息为空' }, 400);
	}

	if (last_user_msg.content.length > 500) {
		return json_response({ error: '单次提问不超过 500 字' }, 400);
	}

	const system_prompt						= build_system_prompt(teacher_name, teacher_subject, teacher_motto, teacher_style);

	/* 只取 assistant/user 的对话，过滤初始 assistant 问候（first assistant msg 是人设介绍不用传） */
	const api_messages						= [];
	for (let msg of messages) {
		if (msg.role === 'user' || msg.role === 'assistant') {
			api_messages.push({ role: msg.role, content: String(msg.content || '').slice(0, 2000) });
		}
	}

	/* 保留最近 10 条防止 context 过长 */
	const recent_messages					= api_messages.slice(-10);

	if (!env.CLAUDE_API_KEY) {
		return json_response({ error: 'Claude API Key 未配置（请在 Cloudflare Pages 设置中添加 CLAUDE_API_KEY）' }, 500);
	}

	try {
		const claude_res					= await fetch('https://api.anthropic.com/v1/messages', {
			method:		'POST',
			headers:	{
				'Content-Type':			'application/json',
				'x-api-key':			env.CLAUDE_API_KEY,
				'anthropic-version':	'2023-06-01'
			},
			body:		JSON.stringify({
				model:		'claude-haiku-4-5-20251001',
				max_tokens:	600,
				system:		system_prompt,
				messages:	recent_messages
			})
		});

		if (!claude_res.ok) {
			const err_text					= await claude_res.text();
			console.error('Claude API error:', claude_res.status, err_text);
			return json_response({ error: 'AI 服务暂不可用', details: err_text.slice(0, 200) }, 500);
		}

		const data							= await claude_res.json();
		let reply							= '';
		if (data.content && data.content[0] && data.content[0].text) {
			reply							= data.content[0].text;
		}

		return json_response({
			reply:		reply,
			model:		'claude-haiku-4-5',
			tokens:		data.usage || null
		});
	} catch (err) {
		console.error('haiku chat error:', err);
		return json_response({ error: '网络异常', details: String(err).slice(0, 200) }, 500);
	}
}


function build_system_prompt(name, subject, motto, style) {
	return '你是 Me Offer 平台的 AI 名师「' + name + '」，教授 ' + subject + '，高考陪跑导师。\n\n' +
		'【人设与风格】\n' +
		'- 座右铭：' + motto + '\n' +
		'- 教学风格：' + (style || '循循善诱') + '\n' +
		'- 用亲切口吻对学生说话，不端架子，不说空话\n' +
		'- 每次回复控制在 80-150 字，精炼为主\n' +
		'- 涉及到具体题目/作文时，给出具体可执行的建议（例：段落怎么改、公式怎么用、错在哪一步）\n' +
		'- 不要以「同学」或「你好」开头每条消息，像自然对话一样直接切入\n\n' +
		'【绝对禁忌】\n' +
		'- 不要说「作为一个 AI」「我是 AI」\n' +
		'- 不要报菜名式列举知识点\n' +
		'- 不要用 Markdown 标题 # / ##\n' +
		'- 不要催学生付费\n' +
		'- 如果被问到自己身份，就回答：「我是' + name + '，你的' + subject + '老师」\n\n' +
		'【对话目标】\n' +
		'让学生觉得「这个老师真的懂我」。简短、具体、有温度。';
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
