// Me Offer · AI 对话 API（¥1,999 终审专属 · Claude 4.5）
// POST /api/ai_chat
// body: {
//   order_id: 订单号（校验付费状态）
//   user_context: { score, rank, subjects, personality, top_volunteers[...] }
//   history: [{role: 'user|assistant', content: '...'}]   历史对话，由前端维护
//   message: '用户本轮问题'
// }
// Returns: { reply: '...', source: 'claude-sonnet-4-5', tokens_used }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const order_id							= body.order_id || '';
	const user_context						= body.user_context || {};
	const history							= Array.isArray(body.history) ? body.history : [];
	const message							= (body.message || '').trim();

	if (!message) {
		return json_response({error: '消息不能为空'}, 400);
	}

	if (message.length > 500) {
		return json_response({error: '单次提问不超过 500 字'}, 400);
	}

	// 校验订单是否已付款（防止白嫖）
	// TODO: 开发期先放开，上线时启用
	// if (order_id) {
	//   const row = await env.DB.prepare('SELECT status FROM orders WHERE order_id = ?').bind(order_id).first();
	//   if (!row || row.status !== 'paid') {
	//     return json_response({error: '订单未支付，无法使用对话'}, 403);
	//   }
	// }

	if (!env.CLAUDE_API_KEY) {
		return json_response({
			reply:	'AI 对话服务暂时不可用（未配置 API Key），请稍后再试。',
			source:	'error'
		}, 500);
	}

	// 构造 System Prompt
	const system_prompt						= build_system_prompt(user_context);

	// 构造 messages（历史 + 本轮）
	const messages							= [];
	// 限制历史最多保留最近 10 轮（节约成本）
	const recent_history					= history.slice(-10);
	for (const msg of recent_history) {
		if (msg.role === 'user' || msg.role === 'assistant') {
			messages.push({
				role:		msg.role,
				content:	String(msg.content || '').slice(0, 1500)
			});
		}
	}
	messages.push({role: 'user', content: message});

	try {
		const controller					= new AbortController();
		const timeout_id					= setTimeout(() => controller.abort(), 20000);

		const resp							= await fetch('https://api.anthropic.com/v1/messages', {
			method:		'POST',
			headers:	{
				'x-api-key':			env.CLAUDE_API_KEY,
				'anthropic-version':	'2023-06-01',
				'content-type':			'application/json'
			},
			body:		JSON.stringify({
				model:			'claude-sonnet-4-5',
				max_tokens:		800,
				system:			system_prompt,
				messages:		messages
			}),
			signal:		controller.signal
		});

		clearTimeout(timeout_id);

		if (!resp.ok) {
			const err						= await resp.text();
			return json_response({
				reply:	'AI 响应异常，请稍后重试。（错误码 ' + resp.status + '）',
				source:	'error',
				debug:	err.slice(0, 200)
			}, 500);
		}

		const data							= await resp.json();
		const reply							= data.content && data.content[0] && data.content[0].text || '（无内容）';
		const usage							= data.usage || {};

		return json_response({
			reply:			reply,
			source:			'claude-sonnet-4-5',
			tokens_used:	(usage.input_tokens || 0) + (usage.output_tokens || 0)
		});

	} catch (e) {
		return json_response({
			reply:	'AI 服务连接异常：' + (e.message || '未知错误'),
			source:	'error'
		}, 500);
	}
}


function build_system_prompt(ctx) {
	const lines								= [];
	lines.push('你是 Me Offer 的 AI 志愿填报助手，基于 Claude Sonnet 4.5 为用户提供个性化答疑。');
	lines.push('');
	lines.push('【用户画像】');

	if (ctx.score) lines.push('- 高考分数：' + ctx.score + ' 分');
	if (ctx.rank) lines.push('- 山东省位次：约第 ' + ctx.rank + ' 名');
	if (ctx.subjects && ctx.subjects.length > 0) lines.push('- 选科：' + ctx.subjects.join('、'));
	if (ctx.personality && ctx.personality.length > 0) lines.push('- 性格特质：' + ctx.personality.join('、'));
	if (ctx.hobbies && ctx.hobbies.length > 0) lines.push('- 兴趣：' + ctx.hobbies.slice(0, 5).join('、'));
	if (ctx.strengths && ctx.strengths.length > 0) lines.push('- 学科特长：' + ctx.strengths.join('、'));
	if (ctx.talents && ctx.talents.length > 0) lines.push('- 特长：' + ctx.talents.join('、'));
	if (ctx.cities && ctx.cities.length > 0) lines.push('- 意向城市：' + ctx.cities.join('、'));
	if (ctx.majors && ctx.majors.length > 0) lines.push('- 专业方向：' + ctx.majors.join('、'));

	if (ctx.top_volunteers && ctx.top_volunteers.length > 0) {
		lines.push('');
		lines.push('【AI 推荐的前 6 个志愿】');
		ctx.top_volunteers.slice(0, 6).forEach((v, i) => {
			const tier_name					= v.tier === 'chong' ? '冲' : v.tier === 'wen' ? '稳' : v.tier === 'bao' ? '保' : '';
			lines.push('  ' + (i + 1) + '. ' + v.school_name + ' · ' + v.group_name +
				(tier_name ? ' [' + tier_name + ']' : '') +
				'（概率 ' + v.prob + '%）');
		});
	}

	lines.push('');
	lines.push('【回复要求】');
	lines.push('- 中文回复，亲切专业');
	lines.push('- 每条回复 200 字以内，重点突出');
	lines.push('- 基于用户真实画像和 96 志愿方案给出具体建议');
	lines.push('- 不承诺录取结果，不用"保证""最""第一""包"等词');
	lines.push('- 最终以山东省教育招生考试院官方为准');

	return lines.join('\n');
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
