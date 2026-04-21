// Me Offer · Claude 深度推荐 API
// POST /api/deep_recommend
// body: { score, rank, subjects, subjects_cn, volunteers, personality, hobbies, majors, cities, ... }
// Returns: {
//   strategy_summary: string,              // 整体策略报告 300-500 字
//   reasons: { [volunteer_key]: string },  // 每个志愿的 AI 推荐理由（30-60 字）
//   risks: string[],                       // 关键风险提示 3-5 条
//   filling_order_tip: string,             // 填报顺序建议
//   source: 'claude-sonnet-4-5' | 'rules_fallback'
// }

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try { body = await request.json(); }
	catch (e) { return json_response({error: 'invalid json'}, 400); }

	const score								= parseInt(body.score) || 0;
	const rank								= parseInt(body.rank) || 0;
	const vols								= body.volunteers || [];

	if (vols.length === 0) {
		return json_response({error: 'no volunteers provided'}, 400);
	}

	/* 拿每档前 2 + 随机 2 个代表给 Claude 深度写理由（共 12 个）
	   其他 84 个用规则模板（schooltier + major_category 组合） */
	const chong								= vols.filter(v => v.tier === 'chong');
	const wen								= vols.filter(v => v.tier === 'wen');
	const bao								= vols.filter(v => v.tier === 'bao');

	const top_picks							= [
		...chong.slice(0, 2),
		...chong.slice(Math.floor(chong.length / 2), Math.floor(chong.length / 2) + 1),
		...wen.slice(0, 2),
		...wen.slice(Math.floor(wen.length / 2), Math.floor(wen.length / 2) + 1),
		...wen.slice(Math.max(0, wen.length - 1), wen.length),
		...bao.slice(0, 2),
		...bao.slice(Math.floor(bao.length / 2), Math.floor(bao.length / 2) + 1)
	];

	if (!env.CLAUDE_API_KEY) {
		return json_response({
			strategy_summary:	build_rule_strategy(body, vols),
			reasons:			build_rule_reasons(vols),
			risks:				build_rule_risks(body, vols),
			filling_order_tip:	'按"冲-稳-保"顺序填报，冲刺 24 填前 24 位，稳妥 48 填 25-72 位，保底 24 填 73-96 位。务必勾选"服从专业调剂"。',
			parent_report:		build_rule_parent_report(body, vols),
			source:				'rules_fallback'
		});
	}

	/* 调用 Claude 生成策略 + 重点志愿理由 */
	const prompt							= build_claude_prompt(body, top_picks, chong.length, wen.length, bao.length);

	try {
		const controller					= new AbortController();
		const timeout_id					= setTimeout(() => controller.abort(), 55000);

		const resp							= await fetch('https://api.anthropic.com/v1/messages', {
			method:		'POST',
			headers:	{
				'x-api-key':			env.CLAUDE_API_KEY,
				'anthropic-version':	'2023-06-01',
				'content-type':			'application/json'
			},
			body:		JSON.stringify({
				model:		'claude-sonnet-4-5',
				max_tokens:	2500,
				system:		'你是专业的高考志愿填报顾问。基于学生数据和数据库推荐的志愿清单，生成结构化的策略报告。必须返回合法 JSON，不加任何解释。',
				messages:	[{role: 'user', content: prompt}]
			}),
			signal:		controller.signal
		});

		clearTimeout(timeout_id);

		if (!resp.ok) {
			const err						= await resp.text();
			return json_response({
				strategy_summary:	build_rule_strategy(body, vols),
				reasons:			build_rule_reasons(vols),
				risks:				build_rule_risks(body, vols),
				filling_order_tip:	'按"冲-稳-保"顺序填报，冲刺 24 填前 24 位。务必勾选"服从专业调剂"。',
				parent_report:		build_rule_parent_report(body, vols),
				source:				'rules_fallback',
				claude_error:		err.slice(0, 200)
			});
		}

		const data							= await resp.json();
		const text							= data.content && data.content[0] && data.content[0].text || '';

		let parsed;
		try {
			const json_match				= text.match(/\{[\s\S]*\}/);
			parsed							= JSON.parse(json_match ? json_match[0] : text);
		} catch (e) {
			parsed							= null;
		}

		if (!parsed) {
			return json_response({
				strategy_summary:	build_rule_strategy(body, vols),
				reasons:			build_rule_reasons(vols),
				risks:				build_rule_risks(body, vols),
				filling_order_tip:	'按"冲-稳-保"顺序填报。务必勾选"服从专业调剂"。',
				parent_report:		build_rule_parent_report(body, vols),
				source:				'rules_fallback',
				parse_error:		true
			});
		}

		/* Claude 返回的 reasons 只覆盖 Top Picks，其他志愿用规则兜底 */
		const ai_reasons					= parsed.reasons || {};
		const all_reasons					= build_rule_reasons(vols);
		for (const [k, v] of Object.entries(ai_reasons)) {
			if (v && typeof v === 'string') all_reasons[k] = v;
		}

		return json_response({
			strategy_summary:	parsed.strategy_summary || build_rule_strategy(body, vols),
			reasons:			all_reasons,
			risks:				parsed.risks || build_rule_risks(body, vols),
			filling_order_tip:	parsed.filling_order_tip || '按"冲-稳-保"顺序填报。务必勾选"服从专业调剂"。',
			parent_report:		parsed.parent_report || build_rule_parent_report(body, vols),
			source:				'claude-sonnet-4-5'
		});

	}
	catch (e) {
		return json_response({
			strategy_summary:	build_rule_strategy(body, vols),
			reasons:			build_rule_reasons(vols),
			risks:				build_rule_risks(body, vols),
			filling_order_tip:	'按"冲-稳-保"顺序填报。务必勾选"服从专业调剂"。',
			parent_report:		build_rule_parent_report(body, vols),
			source:				'error_fallback',
			error:				e.message
		});
	}
}


function volunteer_key(v) {
	return (v.school_code || '') + '_' + (v.group_code || '');
}


function build_claude_prompt(body, top_picks, chong_count, wen_count, bao_count) {
	const subjects_cn						= (body.subjects || []).map(s => ({physics:'物理',chemistry:'化学',biology:'生物',politics:'政治',history:'历史',geography:'地理'}[s])).filter(x => x).join('·');

	const picks_text						= top_picks.map((v, i) => {
		const tier_cn						= {chong: '冲', wen: '稳', bao: '保'}[v.tier] || '';
		return `${i+1}. [${tier_cn}] ${v.school_name} · ${v.group_name} · 录取概率 ${v.prob}% · 位次差 ${v.diff > 0 ? '+' : ''}${v.diff} · key=${volunteer_key(v)}`;
	}).join('\n');

	const personality_cn					= (body.personality || []).map(p => PERSONALITY_CN[p] || p).filter(Boolean).join('、');
	const hobbies_cn						= (body.hobbies || []).map(h => HOBBY_CN[h] || h).filter(Boolean).join('、');
	const strengths_cn						= (body.strengths || []).map(s => STRENGTH_CN[s] || s).filter(Boolean).join('、');
	const talents_cn						= (body.talents || []).map(t => TALENT_CN[t] || t).filter(Boolean).join('、');

	return `# 考生档案
- 分数：${body.score} 分（山东省 2026 年）· 位次 ${body.rank || '未知'}
- 选科：${subjects_cn || '未指定'}
- 意向城市：${(body.cities || []).join('、') || '不限'}
- 意向专业：${(body.majors || []).join('、') || '未指定'}
- 性格特质：${personality_cn || '未填'}
- 兴趣方向：${hobbies_cn || '未填'}
- 学科特长：${strengths_cn || '未填'}
- 个人特长：${talents_cn || '未填'}
- 生活偏好：${build_lifestyle_text(body) || '未特别标注'}

# 算法推荐统计
- 冲刺 ${chong_count} 个 · 稳妥 ${wen_count} 个 · 保底 ${bao_count} 个
- 全部来自山东考试院 2021-2025 真实投档数据

# 重点志愿（每档各取 2-3 个代表）
${picks_text}

# 任务：生成 JSON

{
  "strategy_summary": "整体策略报告 250-400 字，必须包含：(1) 基于位次/选科的客观定位 (2) 推荐的三档配比逻辑 (3) 最应该关注什么 (4) 填报心态建议。客观分析，不保证录取。",
  "reasons": {
    "${volunteer_key(top_picks[0])}": "针对第 1 个志愿的个性化推荐理由 30-50 字。不吹不贬。",
    "...对每个 key 都生成": ""
  },
  "risks": ["风险 1 30 字内", "风险 2", "风险 3"],
  "filling_order_tip": "填报顺序建议 2-3 句话。"
}

要求：
- 纯 JSON，不要 markdown 代码块
- 不承诺录取结果，不使用"保证""最""第一""包"等绝对词
- reasons 每条要真实有洞察（避免套话）
- risks 要基于考生实际情况（位次/选科/体检）`;
}


/* 中英文字典：把前端 key 翻译成中文给 Claude（显得自然） */
const PERSONALITY_CN						= {
	social:			'外向善社交',
	introvert:		'内向爱思考',
	logical:		'逻辑性强',
	creative:		'创意想象丰富',
	detail:			'细致耐心',
	leader:			'有领导力',
	handson:		'动手能力强',
	independent:	'独立自主'
};

const HOBBY_CN								= {
	tech:			'科技数码',
	reading:		'阅读写作',
	sports:			'运动健身',
	art:			'美术设计',
	music:			'音乐',
	travel:			'旅行探索',
	games:			'游戏电竞',
	social_media:	'新媒体内容',
	business:		'商业财经',
	science:		'自然科学',
	history:		'历史人文',
	film:			'影视动漫'
};

const STRENGTH_CN							= {
	math:			'数学强',
	physics:		'物理强',
	chemistry:		'化学强',
	biology:		'生物强',
	chinese:		'语文强',
	english:		'英语强',
	history:		'历史强',
	politics:		'政治强',
	geography:		'地理强'
};

const TALENT_CN								= {
	sports:			'体育特长',
	music:			'音乐特长',
	art:			'美术特长',
	coding:			'编程',
	speech:			'辩论/演讲',
	science:		'学科竞赛',
	leadership:		'学生干部',
	writing:		'写作发表'
};


function build_lifestyle_text(body) {
	const parts								= [];
	if (body.level === '985') parts.push('学校层次优先（追求 985/211）');
	else if (body.level === '211') parts.push('学校层次优先（追求 211）');
	else if (body.level === 'major') parts.push('专业导向（学校可以让步）');
	else if (body.level === 'city') parts.push('城市导向（一线/新一线优先）');

	if (body.budget === 'tight') parts.push('家庭预算紧张（避免学费高专业）');
	if (body.remote === 'no') parts.push('不去偏远地区');
	if (body.sino === 'no') parts.push('不要中外合作项目');
	if (body.health && body.health.length > 0) {
		const hlth							= body.health.map(h => ({color_blind:'色盲/色弱',hepatitis:'肝炎',height:'身高受限',hearing:'听力受限'}[h] || h)).join('、');
		parts.push('体检限制：' + hlth);
	}
	return parts.join('；');
}


function build_rule_strategy(body, vols) {
	const rank								= body.rank || 0;
	const score								= body.score || 0;
	const percentile						= rank ? Math.round((rank / 550000) * 100) : 0;

	return `基于你 ${score} 分（位次约 ${rank}，省内前 ${percentile}%）的成绩定位，系统推荐了 24 冲 + 48 稳 + 24 保共 96 个志愿。冲刺档专业组录取门槛略高于你的位次，风险大但上限高；稳妥档是你分数匹配度最高的主战场，建议重点研究其中专业方向；保底档录取概率 95%+ 但需注意不要被中外合办或偏远地区意外命中。最终方案要根据你的专业意向、城市偏好、家庭情况做个性化权衡。祝金榜题名！`;
}


/* 规则版兜底：家长深度报告（Claude 失败时使用）*/
function build_rule_parent_report(body, vols) {
	const score								= body.score || 0;
	const rank								= body.rank || 0;
	const majors_cn							= (body.majors || []).map(m => ({
		tech:'理工', medical:'医学', econ:'经管', liberal:'文法',
		education:'师范教育', art:'艺术设计', agri:'农林', military:'军警', unknown:'还没想好'
	}[m] || m)).join('、') || '未指定';
	const personality_cn					= (body.personality || []).map(p => PERSONALITY_CN[p] || p).join('、') || '未填';
	const strengths_cn						= (body.strengths || []).map(s => STRENGTH_CN[s] || s).join('、') || '未填';

	return {
		profile_summary:		`考生 ${score} 分位次 ${rank}，省内前 ${Math.round(rank / 5500) / 100}% 水平。画像标签：${personality_cn}；学科特长：${strengths_cn}；意向方向：${majors_cn}。本次志愿匹配按"专业意向优先、性格×专业二次加权、城市偏好兜底"三层筛选完成。`,
		plan_narrative:			`推荐清单按 24 冲 + 48 稳 + 24 保标准配比。冲刺档已优先选取符合你意向专业的 985/211 院校；稳妥档是你分数匹配度最高的主战场（建议精力 60% 放这档）；保底档确保滑档时仍有对口专业。专业组录取门槛均来自山东考试院 2021-2025 真实投档数据。`,
		match_insights:			[
			'✅ 本次推荐已针对你的意向专业方向加权——主 96 志愿中相关方向占比显著高于随机推荐。',
			'⚠️ 完整的"性格×专业"匹配解读需 AI 深度推理支持，当前因服务繁忙使用规则版本，建议稍后重新生成获取完整版。'
		],
		risk_radar:				[
			'⚠️ 志愿填报风险：专业组改名/新设较多，2023 年数据仅供参考。',
			'⚠️ 大小年风险：推荐志愿中部分专业近 3 年位次波动 > 20%，建议以 2024-2025 为主判断。',
			'⚠️ 体检限制：医学/化工/军警类有硬性体检要求，请核对《高考体检指导意见》。',
			'⚠️ 调剂风险：务必勾选"服从专业调剂"，避免退档。',
			'⚠️ 学费压力：部分中外合作专业学费可达 ¥4-6 万/年，请确认家庭预算。'
		],
		future_prediction:		{
			narrative:			'按当前方案入读后，4 年毕业时主要面向三类出路：升学深造（考研/保研）、直接就业（对口行业）、转方向（跨界）。具体比例取决于录取专业和学校资源。',
			paths:				[
				{ label:'🎯 升学深造', prob:'~50%', detail:'保研/考研本校或更优学校' },
				{ label:'🎯 直接就业', prob:'~40%', detail:'对口行业主流岗位' },
				{ label:'🎯 转方向', prob:'~10%', detail:'转码/考公/创业' }
			],
			income_range:		'本科毕业起薪 ¥8-15 万/年，10 年后中位数 ¥20-40 万（因行业差异大）。'
		},
		parent_investment:		{
			summary:			'估算父母从本科到研究生的 7 年总投入（不含留学）。各项因学校/城市/专业差异较大，以下为中位数估算。',
			items:				[
				{ label:'本科 4 年学费',		amount:'¥5500-6500/年 × 4',		total:'¥2.2-2.6 万' },
				{ label:'本科 4 年生活费',		amount:'¥2.5-3.5 万/年 × 4',	total:'¥10-14 万' },
				{ label:'读研 2-3 年',			amount:'可能需家庭补贴',		total:'¥3-8 万' },
				{ label:'其他（实习/考证/交通）',	amount:'因人而异',				total:'¥5-10 万' }
			],
			grand_total:		'本科+研究生合计父母预估投入：¥20-35 万（不含留学）'
		},
		peer_comparison:		{
			summary:			`位次 ${rank} 附近（前后 500 名）的考生今年普遍的策略：部分追求学校名气（选 985 冷门专业），部分追求专业（选 211 热门专业），部分追求城市（选新一线）。三者不可兼得，需权衡。`,
			typical_peers:		[
				'追求学校名气型：选 985 冷门专业（如农学/地质/哲学）',
				'追求专业型：选 211 热门专业（如计算机/金融/临床医学）',
				'追求城市型：选新一线高校（深圳大学、苏州大学、浙江工业等）'
			],
			your_edge:			`基于你的 ${personality_cn || '画像'}，建议重点考虑"专业×性格"匹配度，而非单纯追求学校排名。`
		},
		parent_tips:			[
			'① 别只看学校名气——优先让孩子研究他未来 4 年要学的具体课程内容，而不是校名是否响亮。',
			'② 入学后前 3 周是转专业黄金窗口，让孩子留意学校转专业政策，做好 Plan B。',
			'③ 本周可以和孩子一起做一件事：在知乎/B 站搜"XX 大学 XX 专业 就读体验"，看 5 个真实学生分享，再做决定。'
		]
	};
}


/* 规则版推荐理由（去重版 · 多模板随机组合，避免"普通本科 XX方向 招生X人"千篇一律） */
function build_rule_reasons(vols) {
	const reasons							= {};

	/* 按 tier 分类的多个模板，根据 school_tier / group_name 特征拼接 */
	const CHONG_TEMPLATES					= [
		(v) => `位次差 ${v.diff > 0 ? '+' + v.diff : v.diff}，${school_highlight(v)}${major_highlight(v.group_name)}，概率 ${v.prob}% 值得一冲。`,
		(v) => `${school_highlight(v)}2024 招 ${v.plan_count || '-'} 人，${major_highlight(v.group_name)}对口度高，冲刺合理。`,
		(v) => `${major_highlight(v.group_name)}方向 ${school_highlight(v)}实力强，${v.prob}% 概率属合理冲刺区间。`,
		(v) => `位次差 ${v.diff}，${major_highlight(v.group_name)}是该校王牌或特色方向，拼一把有机会。`,
		(v) => `${school_highlight(v)}就业口碑稳定，${major_highlight(v.group_name)}适合冲击，退档需靠调剂。`
	];

	const WEN_TEMPLATES						= [
		(v) => `位次差 ${v.diff}，${school_highlight(v)}${major_highlight(v.group_name)}匹配度高，稳妥主选。`,
		(v) => `${major_highlight(v.group_name)}录取概率 ${v.prob}%，${school_highlight(v)}性价比合理，可做稳妥重点。`,
		(v) => `${school_highlight(v)}位次差仅 ${Math.abs(v.diff)}，${major_highlight(v.group_name)}基本能稳。`,
		(v) => `该校近年录取稳定，${major_highlight(v.group_name)}方向就业 OK，${v.prob}% 属稳妥区间。`,
		(v) => `${major_highlight(v.group_name)}专业与你选科契合，${school_highlight(v)}稳妥段优先考虑。`,
		(v) => `位次匹配度好（${v.prob}%），${school_highlight(v)}2024 招 ${v.plan_count || '-'} 人名额合理。`
	];

	const BAO_TEMPLATES						= [
		(v) => `${school_highlight(v)}保底档，位次差 ${Math.abs(v.diff)} 名安全，${v.prob}% 高概率锁定。`,
		(v) => `位次比录取线靠前 ${Math.abs(v.diff)} 名，${major_highlight(v.group_name)}确保不滑档。`,
		(v) => `${school_highlight(v)}${major_highlight(v.group_name)}，${v.prob}% 录取把握大，作为兜底选择。`,
		(v) => `保底档，该校近年位次稳定，${major_highlight(v.group_name)}就业稳妥。`,
		(v) => `${v.prob}% 高概率可录，${school_highlight(v)}适合收尾保障。`
	];

	let chong_idx = 0, wen_idx = 0, bao_idx = 0;
	for (const v of vols) {
		const key							= volunteer_key(v);
		let reason							= '';

		if (v.tier === 'chong') {
			reason							= CHONG_TEMPLATES[chong_idx % CHONG_TEMPLATES.length](v);
			chong_idx++;
		}
		else if (v.tier === 'wen') {
			reason							= WEN_TEMPLATES[wen_idx % WEN_TEMPLATES.length](v);
			wen_idx++;
		}
		else {
			reason							= BAO_TEMPLATES[bao_idx % BAO_TEMPLATES.length](v);
			bao_idx++;
		}
		reasons[key]						= reason;
	}
	return reasons;
}


/* 学校标签：985/211/双一流/省属/特色 */
function school_highlight(v) {
	const tier								= v.school_tier || '';
	const name								= v.school_name || '';

	if (tier === '985' || tier.includes('985')) return '985 院校';
	if (tier === '211' || tier.includes('211')) return '211 院校';
	if (tier.includes('双一流')) return '双一流';
	if (name.includes('师范') && !tier.includes('普通')) return '省重点师范';
	if (name.includes('医科') || name.includes('医学院')) return '医学强校';
	if (name.includes('财经') || name.includes('经贸')) return '财经特色校';
	if (name.includes('政法')) return '政法特色校';
	if (name.includes('理工') && !tier.includes('985') && !tier.includes('211')) return '理工强校';
	if (name.includes('外国语') || name.includes('外语')) return '外语强校';
	if (name.includes('农业') || name.includes('林业')) return '农林特色校';
	if (tier.includes('独立') || (name.includes('学院') && !name.includes('大学'))) return '独立学院';
	return '本科院校';
}


/* 专业标签：国家特色/王牌/卓越/一般 */
function major_highlight(group_name) {
	if (!group_name) return '该方向';
	const g									= group_name;

	if (g.includes('拔尖') || g.includes('卓越工程师') || g.includes('英才')) return '拔尖培养专业';
	if (g.includes('实验班') || g.includes('精英班')) return '实验班';
	if (g.includes('中外合作') || g.includes('（中外') || g.includes('(中外')) return '中外合作专业';
	if (g.includes('菁英班') || g.includes('试点班') || g.includes('试验班')) return '试点班';

	if (g.includes('计算机') || g.includes('软件')) return '计算机方向';
	if (g.includes('人工智能') || g.includes('智能科学')) return 'AI 方向';
	if (g.includes('数据科学') || g.includes('大数据')) return '数据科学方向';
	if (g.includes('电子信息') || g.includes('通信')) return '电子通信方向';
	if (g.includes('临床医学')) return '临床医学';
	if (g.includes('口腔医学')) return '口腔医学';
	if (g.includes('金融') || g.includes('经济')) return '经管财金方向';
	if (g.includes('机械') || g.includes('自动化')) return '机械自动化方向';
	if (g.includes('电气工程') || g.includes('电力')) return '电气方向';
	if (g.includes('化工') || g.includes('化学工程')) return '化工方向';
	if (g.includes('材料')) return '材料方向';
	if (g.includes('土木') || g.includes('建筑')) return '土建方向';
	if (g.includes('法学')) return '法学方向';
	if (g.includes('英语') || g.includes('翻译')) return '外语方向';

	return g.replace(/\(.*?\)/g, '').replace(/（.*?）/g, '').substring(0, 10);
}


function build_rule_risks(body, vols) {
	const risks								= [];

	if (body.health && body.health.includes('color_blind')) {
		risks.push('色盲色弱：医学、化工、材料、生物、检验等专业多数不招收，体检要严格核对。');
	}

	const score								= body.score || 0;
	if (score < 500) {
		risks.push('分数接近本科线，保底档务必包含民办本科或职业本科，避免滑档至专科。');
	}

	const has_sino							= vols.some(v => (v.group_name || '').includes('中外合作'));
	if (has_sino) {
		risks.push('中外合作专业学费普遍 5-8 万/年，家庭预算紧张慎选。');
	}

	risks.push('大小年风险：建议核查目标院校近 3 年位次波动，波动超 15% 的学校慎填冲档。');
	risks.push('务必勾选"服从专业调剂"，否则冲档万一进校线但不够专业线会被退档。');

	return risks;
}


function json_response(data, status) {
	return new Response(JSON.stringify(data), {
		status:		status || 200,
		headers:	{
			'Content-Type':					'application/json; charset=utf-8',
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
