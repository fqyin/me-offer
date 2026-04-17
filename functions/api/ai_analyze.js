// Me Offer · Claude 4.6 风险分析 API
// POST /api/ai_analyze
// body: { score, rank, top_volunteers[0..10], personality, hobbies, strengths, health }
// Returns: { insights: [{type, title, content}] }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	if (!env.CLAUDE_API_KEY) {
		// 无 key 时走降级：生成规则式洞察
		return json_response({
			insights:	build_rule_based_insights(body),
			source:		'rules'
		});
	}

	const user_prompt						= build_prompt(body);

	try {
		// 15 秒超时保护 · 超时自动降级规则
		const controller					= new AbortController();
		const timeout_id					= setTimeout(() => controller.abort(), 15000);

		const resp							= await fetch('https://api.anthropic.com/v1/messages', {
			method:		'POST',
			headers:	{
				'x-api-key':			env.CLAUDE_API_KEY,
				'anthropic-version':	'2023-06-01',
				'content-type':			'application/json'
			},
			body:		JSON.stringify({
				model:			'claude-sonnet-4-5',
				max_tokens:		1024,
				system:			'你是中国高考志愿填报专家。基于用户真实数据给出 3-5 条关键洞察。每条 JSON 格式：{"type": "match|risk|strength|warning", "title": "一句话标题", "content": "具体建议(50字内)"}。只返回 JSON 数组。',
				messages:		[{role: 'user', content: user_prompt}]
			}),
			signal:		controller.signal
		});

		clearTimeout(timeout_id);

		if (!resp.ok) {
			const err						= await resp.text();
			console.log('claude api error:', err);
			return json_response({
				insights:	build_rule_based_insights(body),
				source:		'rules_fallback',
				claude_error:	err.slice(0, 200)
			});
		}

		const data							= await resp.json();
		const text							= data.content && data.content[0] && data.content[0].text || '';

		let insights;
		try {
			const json_match				= text.match(/\[[\s\S]*\]/);
			insights						= JSON.parse(json_match ? json_match[0] : text);
		} catch (e) {
			insights						= build_rule_based_insights(body);
		}

		return json_response({
			insights:	insights,
			source:		'claude-sonnet-4-5'
		});

	} catch (e) {
		return json_response({
			insights:	build_rule_based_insights(body),
			source:		'error_fallback',
			error:		e.message
		});
	}
}


function build_prompt(body) {
	const lines								= [];
	lines.push('考生数据：');
	lines.push('- 高考分数：' + body.score + '（山东 2025 考生位次约 ' + (body.rank || '未知') + '）');
	if (body.subjects) lines.push('- 选科：' + body.subjects.join(', '));
	if (body.personality && body.personality.length > 0) lines.push('- 性格特质：' + body.personality.join(', '));
	if (body.hobbies && body.hobbies.length > 0) lines.push('- 兴趣爱好：' + body.hobbies.slice(0, 5).join(', '));
	if (body.strengths && body.strengths.length > 0) lines.push('- 学科特长：' + body.strengths.join(', '));
	if (body.talents && body.talents.length > 0) lines.push('- 特长奖项：' + body.talents.join(', '));
	if (body.health && body.health.length > 0) lines.push('- 身体情况：' + body.health.join(', '));
	if (body.cities && body.cities.length > 0) lines.push('- 意向城市：' + body.cities.join(', '));
	if (body.majors && body.majors.length > 0) lines.push('- 专业方向：' + body.majors.join(', '));
	if (body.career) lines.push('- 职业规划：' + body.career);

	if (body.top_volunteers && body.top_volunteers.length > 0) {
		lines.push('\nAI 推荐的前 5 个志愿：');
		body.top_volunteers.slice(0, 5).forEach((v, i) => {
			lines.push('  ' + (i + 1) + '. ' + v.school_name + ' - ' + v.group_name + ' (位次差 ' + v.diff + ', 概率 ' + v.prob + '%)');
		});
	}

	lines.push('\n请生成 3-5 条关键洞察。合规要求：不承诺录取结果，不用"保""最""第一"等词。');
	return lines.join('\n');
}


function build_rule_based_insights(body) {
	const insights							= [];

	// 性格匹配
	if (body.personality && body.personality.length > 0) {
		const traits						= body.personality.join('、');
		let suggest							= '多个方向';
		if (body.personality.includes('logical')) suggest = '计算机/金融/数学等强逻辑专业';
		else if (body.personality.includes('creative')) suggest = '设计/传媒/建筑等创意专业';
		else if (body.personality.includes('social') || body.personality.includes('leader')) suggest = '管理/法学/师范等与人相关专业';
		else if (body.personality.includes('detail')) suggest = '医学/会计/审计等细致专业';

		insights.push({
			type:		'match',
			title:		'性格匹配',
			content:	'基于 ' + traits + ' 等特质，AI 额外加权了 ' + suggest
		});
	}

	// 兴趣 → 专业
	if (body.hobbies && body.hobbies.length > 0) {
		const hobby_major					= {
			reading: '汉语言/新闻传播', math: '数学/金融/精算', programming: '计算机/软件工程',
			sports: '体育学/运动康复', music: '音乐学', art: '设计学',
			science: '物理学/化学/生物', debate: '法学/政治学', film: '戏剧影视',
			game: '数字媒体/交互设计', business: '工商管理/经济学', nature: '地质/环境/林学'
		};
		const suggs							= body.hobbies.slice(0, 2).map(h => hobby_major[h]).filter(Boolean);
		if (suggs.length > 0) {
			insights.push({
				type:		'match',
				title:		'兴趣匹配专业',
				content:	'根据你的兴趣，重点匹配了 ' + suggs.join('、')
			});
		}
	}

	// 学科特长
	if (body.strengths && body.strengths.length > 0) {
		const strength_major				= {
			math: '数学/金融/人工智能', physics: '物理/机械/电子信息', chemistry: '化学/材料/制药',
			biology: '生物/医学/农学', chinese: '汉语言/新闻传播', english: '英语/翻译',
			politics: '法学/政治/公共管理', history: '历史学/考古', geography: '地理/城乡规划'
		};
		const suggs							= body.strengths.slice(0, 2).map(s => strength_major[s]).filter(Boolean);
		if (suggs.length > 0) {
			insights.push({
				type:		'strength',
				title:		'强势学科匹配',
				content:	'强势学科适配方向：' + suggs.join('、')
			});
		}
	}

	// 特长加分
	if (body.talents && (body.talents.includes('olympic') || body.talents.includes('patent'))) {
		insights.push({
			type:		'strength',
			title:		'强基/综评机会',
			content:	'你有竞赛或创新背景，建议考虑强基计划 / 综合评价单列志愿'
		});
	}

	// 健康限制
	if (body.health && body.health.includes('color_blind')) {
		insights.push({
			type:		'warning',
			title:		'身体限制',
			content:	'AI 已自动排除 医学/化工/交通运输 等对色觉有要求的专业'
		});
	} else if (body.health && body.health.includes('myopia')) {
		insights.push({
			type:		'warning',
			title:		'身体限制',
			content:	'AI 已自动排除 军警/航空/公安 等对视力有严格要求的专业'
		});
	}

	// 风险提示
	if (body.top_volunteers && body.top_volunteers.length > 0) {
		const first_chong					= body.top_volunteers.find(v => v.tier === 'chong');
		if (first_chong && first_chong.diff < -5000) {
			insights.push({
				type:		'risk',
				title:		'冲档风险提示',
				content:	first_chong.school_name + ' 位次差较大，建议作为试手志愿，不要期望过高'
			});
		}
	}

	return insights.slice(0, 5);
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
