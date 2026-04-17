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


// 用户输入字段的中文映射（避免 Claude 看到英文 key）
const SUBJECT_MAP					= {
	physics: '物理', chemistry: '化学', biology: '生物',
	politics: '政治', history: '历史', geography: '地理',
	chinese: '语文', math: '数学', english: '英语'
};

const PERSONALITY_MAP				= {
	social: '外向善社交', introvert: '内向爱思考', logical: '逻辑思维强',
	creative: '创意想象丰富', detail: '细致耐心', leader: '有领导力',
	handson: '动手能力强', independent: '独立自主'
};

const HOBBY_MAP						= {
	reading: '阅读写作', math: '数理竞赛', programming: '编程电脑',
	sports: '体育运动', music: '音乐', art: '绘画设计',
	science: '科学实验', debate: '辩论演讲', film: '影视摄影',
	game: '游戏策划', business: '商业经济', nature: '户外自然'
};

const STRENGTH_MAP					= SUBJECT_MAP;		// 强项用同一套

const TALENT_MAP					= {
	olympic: '学科竞赛获奖', art_cert: '艺术等级证书', sports_cert: '体育特长',
	publish: '作品发表', leadership: '学生干部经历', volunteer: '志愿服务',
	patent: '专利/创新成果', none: '无'
};

const HEALTH_MAP					= {
	normal: '身体健康', myopia: '高度近视', color_blind: '色盲色弱',
	height_short: '身高偏矮', other: '其他'
};

const CITY_MAP						= {
	beijing: '北京', shanghai: '上海', gz_sz: '广州/深圳',
	jiangzhe: '江浙（南京/苏州/杭州）', shandong: '山东本省',
	chengyu: '成都/重庆', wuhan: '武汉', xian: '西安', unlimited: '不限'
};

const MAJOR_MAP						= {
	tech: '理工科', medical: '医学', econ: '经管', liberal: '文法',
	education: '师范教育', art: '艺术设计', agri: '农林', military: '军警',
	unknown: '暂未决定'
};

const CAREER_MAP					= {
	research: '科研学术', tech: '技术研发', finance: '金融商业',
	public: '公共服务', creative: '创意文化', undecided: '未定'
};


function translate_array(arr, dict) {
	if (!arr || arr.length === 0) return '';
	return arr.map(k => dict[k] || k).join('、');
}


function build_prompt(body) {
	const lines								= [];
	lines.push('高考考生基本信息：');
	lines.push('- 分数：' + body.score + ' 分（2025 山东省位次约第 ' + (body.rank || '未知') + ' 名）');

	const subjects_cn					= translate_array(body.subjects, SUBJECT_MAP);
	if (subjects_cn) lines.push('- 选考科目：' + subjects_cn);

	const personality_cn				= translate_array(body.personality, PERSONALITY_MAP);
	if (personality_cn) lines.push('- 性格特质：' + personality_cn);

	const hobbies_cn					= translate_array((body.hobbies || []).slice(0, 5), HOBBY_MAP);
	if (hobbies_cn) lines.push('- 兴趣爱好：' + hobbies_cn);

	const strengths_cn					= translate_array(body.strengths, STRENGTH_MAP);
	if (strengths_cn) lines.push('- 学科特长：' + strengths_cn);

	const talents_cn					= translate_array(body.talents, TALENT_MAP);
	if (talents_cn) lines.push('- 特长奖项：' + talents_cn);

	const health_cn						= translate_array(body.health, HEALTH_MAP);
	if (health_cn) lines.push('- 身体情况：' + health_cn);

	const cities_cn						= translate_array(body.cities, CITY_MAP);
	if (cities_cn) lines.push('- 意向城市：' + cities_cn);

	const majors_cn						= translate_array(body.majors, MAJOR_MAP);
	if (majors_cn) lines.push('- 专业方向：' + majors_cn);

	if (body.career) {
		const career_keys				= body.career.split(',').filter(c => c.length > 0);
		const career_cn					= translate_array(career_keys, CAREER_MAP);
		if (career_cn) lines.push('- 职业规划：' + career_cn);
	}

	if (body.top_volunteers && body.top_volunteers.length > 0) {
		lines.push('\nAI 已为其推荐的前 5 个志愿：');
		body.top_volunteers.slice(0, 5).forEach((v, i) => {
			const tier_name				= v.tier === 'chong' ? '冲' : v.tier === 'wen' ? '稳' : v.tier === 'bao' ? '保' : '';
			lines.push('  ' + (i + 1) + '. ' + v.school_name + ' - ' + v.group_name +
				(tier_name ? ' [' + tier_name + ']' : '') +
				' (位次差 ' + v.diff + ', 概率 ' + v.prob + '%)');
		});
	}

	lines.push('\n请用中文生成 3-5 条简洁有洞察力的建议：');
	lines.push('- 标题 10 字以内，具体不泛泛');
	lines.push('- 内容每条 50 字以内，有数字或证据');
	lines.push('- 合规要求：不承诺录取结果，不使用"保证""最""第一""包"等词');
	lines.push('- 建议类型分布：至少 1 条 match（匹配优势）、1 条 risk（风险提醒）、可加 strength/warning');

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
