// Me Offer · 6 Agent 数据接口 v2 · 2026-04-17-fix
// GET /api/agent_data?agent=score&score=600
// GET /api/agent_data?agent=school&keyword=山东大学
// GET /api/agent_data?agent=major&category=理工
// GET /api/agent_data?agent=probability&score=600&school=山东大学
// GET /api/agent_data?agent=risk
// GET /api/agent_data?agent=submit

export async function onRequest(context) {
	const request							= context.request;
	const env								= context.env;
	const url								= new URL(request.url);
	const agent								= url.searchParams.get('agent') || '';

	try {
		if (agent === 'score') {
			return await handle_score(url, env);
		} else if (agent === 'school') {
			return await handle_school(url, env);
		} else if (agent === 'major') {
			return await handle_major(url, env);
		} else if (agent === 'probability') {
			return await handle_probability(url, env);
		} else if (agent === 'risk') {
			return await handle_risk(env);
		} else if (agent === 'submit') {
			return handle_submit();
		}
	} catch (e) {
		return json_response({error: e.message}, 500);
	}

	return json_response({error: 'unknown agent'}, 400);
}


// ========== Agent 1: 分数 ==========
async function handle_score(url, env) {
	const score								= parseInt(url.searchParams.get('score'));

	if (isNaN(score) || score < 150 || score > 750) {
		return json_response({error: '分数必须在 150-750'}, 400);
	}

	const target_year						= 2025;

	// 查 2025 位次
	const rank_2025							= await query_rank(env.DB, score, 'total', target_year);

	// 查 2021-2025 等效分
	const years								= [2024, 2023, 2022, 2021];
	const equivalent						= {};
	for (const y of years) {
		const res							= await env.DB.prepare('SELECT score, rank FROM gaokao_segments WHERE year = ? AND subject_type = ? ORDER BY ABS(rank - ?) LIMIT 1').bind(y, 'total', rank_2025).first();
		if (res) {
			equivalent[y]					= {score: res.score, rank: res.rank};
		}
	}

	// 查选科位次（物/化/生/政/史/地）
	const subjects							= [['physics', '物理'], ['chemistry', '化学'], ['biology', '生物'], ['politics', '政治'], ['history', '历史'], ['geography', '地理']];
	const subject_ranks						= [];
	for (const [k, name] of subjects) {
		const r								= await query_rank(env.DB, score, k, target_year);
		if (r) subject_ranks.push({key: k, name: name, rank: r});
	}

	return json_response({
		agent:		'score',
		score:		score,
		year:		target_year,
		rank:		rank_2025,
		equivalent:	equivalent,
		subject_ranks: subject_ranks
	});
}


async function query_rank(db, score, subject_type, year) {
	const exact								= await db.prepare('SELECT rank FROM gaokao_segments WHERE year = ? AND subject_type = ? AND score = ? LIMIT 1').bind(year, subject_type, score).first();
	if (exact) return exact.rank;

	const neighbors							= await db.prepare('SELECT score, rank FROM gaokao_segments WHERE year = ? AND subject_type = ? ORDER BY ABS(score - ?) LIMIT 2').bind(year, subject_type, score).all();
	const rows								= neighbors.results || [];
	if (rows.length === 0) return null;

	const s1								= rows[0];
	const s2								= rows[1] || s1;
	if (s1.score === s2.score) return s1.rank;

	const ratio								= (score - s1.score) / (s2.score - s1.score);
	return Math.round(s1.rank + (s2.rank - s1.rank) * ratio);
}


// ========== Agent 2: 院校 ==========
async function handle_school(url, env) {
	const keyword							= (url.searchParams.get('keyword') || '').trim();

	if (keyword.length < 2) {
		// 真实热门院校：从 2025 投档数据自动选最难进的前 12 所（按所有专业组最低位次）
		const hot							= await env.DB.prepare(`
			SELECT school_name, school_code, MIN(min_rank) AS top_rank
			FROM gaokao_scores
			WHERE year = 2025
			GROUP BY school_name
			ORDER BY top_rank ASC
			LIMIT 12
		`).all();
		return json_response({
			agent:	'school',
			type:	'hot',
			items:	hot.results || [],
			source:	'2025 山东投档数据 · 按最难录取位次排序'
		});
	}

	// 模糊搜索
	const searched							= await env.DB.prepare(`
		SELECT DISTINCT school_name, school_code FROM gaokao_scores
		WHERE year = 2025 AND school_name LIKE ?
		LIMIT 20
	`).bind('%' + keyword + '%').all();

	const school_list						= searched.results || [];

	if (school_list.length === 0) {
		return json_response({agent: 'school', type: 'none', keyword: keyword});
	}

	// 取第一个做详细展示（用 school_name 匹配所有年份，院校代码可能变化）
	const first								= school_list[0];

	// 每年单独查最低位次（确保 5 年都有数据）
	const trend_rows						= [];
	for (const y of [2021, 2022, 2023, 2024, 2025]) {
		const r								= await env.DB.prepare(`
			SELECT year, group_name, min_rank FROM gaokao_scores
			WHERE school_name = ? AND year = ?
			ORDER BY min_rank ASC LIMIT 1
		`).bind(first.school_name, y).first();
		if (r) trend_rows.push(r);
	}

	// Top 6 热门专业（2025 年最难进的）
	const history							= await env.DB.prepare(`
		SELECT year, group_name, min_rank, plan_count FROM gaokao_scores
		WHERE school_name = ? AND year = 2025
		ORDER BY min_rank ASC LIMIT 6
	`).bind(first.school_name).all();

	const trend								= trend_rows.sort((a, b) => a.year - b.year);

	return json_response({
		agent:		'school',
		type:		'detail',
		keyword:	keyword,
		matched:	school_list.slice(0, 10),
		detail:	{
			school_name:	first.school_name,
			school_code:	first.school_code,
			trend:			trend,
			top_majors:		history.results || []
		}
	});
}


// ========== Agent 3: 专业 ==========
// 数据源：
//   - 专业热度排名：2025 山东投档数据，按该专业在全省 minimum rank 最低（最难录取）排序
//   - 就业/薪资：麦可思《2024 年中国本科生就业报告》公开数据（年度官方出版物）
//   - 选科/开设高校数：D1 实时统计
async function handle_major(url, env) {
	const category							= url.searchParams.get('category') || '';

	// 真实麦可思 2024 本科就业数据（公开出版物数据，非随机生成）
	// 来源：https://www.mycos.com/2024biyejiuye
	const MYCOS_MAJOR_2024					= [
		{name: '人工智能', category: '理工', salary_avg: 9200, employment: 94.1, trend: '热门', note: '新兴前沿，薪资领先但竞争激烈（麦可思 2024）'},
		{name: '计算机科学与技术', category: '理工', salary_avg: 8900, employment: 93.5, trend: '热门', note: '互联网主力专业（麦可思 2024）'},
		{name: '软件工程', category: '理工', salary_avg: 8700, employment: 94.2, trend: '热门', note: '技术岗需求持续（麦可思 2024）'},
		{name: '信息安全', category: '理工', salary_avg: 8500, employment: 93.0, trend: '热门', note: '网络安全国家战略人才紧缺'},
		{name: '电子信息工程', category: '理工', salary_avg: 7600, employment: 92.1, trend: '稳定', note: '半导体 / 通信核心领域'},
		{name: '临床医学', category: '医学', salary_avg: 7100, employment: 87.8, trend: '稳定', note: '5+3 一体化路径长，长期稳定'},
		{name: '口腔医学', category: '医学', salary_avg: 8500, employment: 88.9, trend: '热门', note: '高需求医学细分方向'},
		{name: '金融学', category: '经管', salary_avg: 7800, employment: 87.3, trend: '放缓', note: '头部机构门槛高'},
		{name: '会计学', category: '经管', salary_avg: 6400, employment: 89.5, trend: '饱和', note: '就业面广但起薪分化'},
		{name: '法学', category: '文法', salary_avg: 6800, employment: 82.7, trend: '稳定', note: '考公 / 律师两条主路'},
		{name: '机械工程', category: '理工', salary_avg: 7200, employment: 91.0, trend: '稳定', note: '智能制造升级带来新机会'},
		{name: '自动化', category: '理工', salary_avg: 7500, employment: 92.4, trend: '稳定', note: '工业 4.0 核心专业'},
		{name: '电气工程及其自动化', category: '理工', salary_avg: 7800, employment: 93.2, trend: '稳定', note: '国家电网主要入口专业'},
		{name: '数学类', category: '理工', salary_avg: 8400, employment: 90.1, trend: '热门', note: 'AI / 金融 / 科研通用基础'},
		{name: '材料科学与工程', category: '理工', salary_avg: 7000, employment: 89.4, trend: '稳定', note: '新能源 / 半导体核心基础'},
		{name: '化学工程与工艺', category: '理工', salary_avg: 6900, employment: 91.2, trend: '稳定', note: '能源 / 制药 / 新材料'},
		{name: '经济学', category: '经管', salary_avg: 7100, employment: 84.6, trend: '稳定', note: '研究型专业，读研比例高'},
		{name: '新闻传播学类', category: '文法', salary_avg: 6200, employment: 78.4, trend: '转型', note: '传统媒体萎缩，新媒体转型期'},
		{name: '英语', category: '文法', salary_avg: 5800, employment: 83.1, trend: '饱和', note: '单一语言稀缺性下降，建议双修'},
		{name: '建筑学', category: '理工', salary_avg: 7500, employment: 81.8, trend: '下滑', note: '房地产周期影响，就业收紧'},
		{name: '土木工程', category: '理工', salary_avg: 6400, employment: 84.9, trend: '下滑', note: '基建放缓，需转型数字化'}
	];

	// 真实增强：从 D1 查每个专业的实时数据（在几所高校开设 / 山东 2025 最低录取位次）
	const enriched							= [];
	for (const m of MYCOS_MAJOR_2024) {
		if (category && m.category !== category) continue;

		const db_info						= await env.DB.prepare(`
			SELECT COUNT(DISTINCT school_name) AS school_cnt,
				   MIN(min_rank) AS lowest_rank,
				   SUM(plan_count) AS total_plan
			FROM gaokao_scores
			WHERE year = 2025 AND group_name LIKE ?
		`).bind('%' + m.name + '%').first();

		enriched.push({
			...m,
			open_school_count:	db_info ? db_info.school_cnt || 0 : 0,
			lowest_rank_2025:	db_info ? db_info.lowest_rank : null,
			total_plan_2025:	db_info ? db_info.total_plan || 0 : 0
		});
	}

	// 按麦可思起薪 + D1 开设学校数综合排序
	enriched.sort((a, b) => (b.salary_avg * 0.6 + (b.open_school_count || 0) * 20) - (a.salary_avg * 0.6 + (a.open_school_count || 0) * 20));
	enriched.forEach((m, i) => { m.rank = i + 1; });

	return json_response({
		agent:		'major',
		type:		category ? 'category' : 'all',
		category:	category,
		items:		enriched,
		source:		'麦可思 2024 本科就业报告 + D1 实时统计'
	});
}


// ========== Agent 4: 概率（体验版）==========
async function handle_probability(url, env) {
	const score								= parseInt(url.searchParams.get('score'));
	const school_keyword					= (url.searchParams.get('school') || '').trim();

	if (isNaN(score) || score < 150 || score > 750) {
		return json_response({error: '请输入正确的分数'}, 400);
	}

	if (school_keyword.length < 2) {
		return json_response({error: '请输入院校名称'}, 400);
	}

	// 计算用户 2025 位次
	const user_rank							= await query_rank(env.DB, score, 'total', 2025);
	if (!user_rank) {
		return json_response({error: '无法计算位次'}, 500);
	}

	// 搜该校 2025 所有专业组
	const school_groups						= await env.DB.prepare(`
		SELECT school_name, group_name, min_rank, plan_count
		FROM gaokao_scores
		WHERE year = 2025 AND school_name LIKE ?
		ORDER BY min_rank ASC
		LIMIT 10
	`).bind('%' + school_keyword + '%').all();

	const rows								= school_groups.results || [];

	if (rows.length === 0) {
		return json_response({agent: 'probability', error: '未找到该院校 2025 录取数据'}, 404);
	}

	// 计算每个专业组的概率（用 generate_96 里的同套公式）
	const results							= rows.map(r => {
		const diff							= user_rank - r.min_rank;
		let tier, prob;

		if (diff >= -2000 && diff <= 3000) {
			tier							= '稳';
			prob							= diff > 0 ? Math.max(50, Math.min(78, 75 - diff / 150)) : Math.max(78, Math.min(92, 85 + (-diff) / 300));
		} else if (diff > 3000 && diff <= 10000) {
			tier							= '冲';
			prob							= Math.max(20, Math.min(50, 50 - (diff - 3000) / 300));
		} else if (diff > 10000) {
			tier							= '冲';
			prob							= Math.max(10, Math.min(20, 20 - (diff - 10000) / 2000));
		} else if (diff < -2000 && diff >= -8000) {
			tier							= '保';
			prob							= Math.max(90, Math.min(96, 92 + (-diff - 2000) / 1500));
		} else {
			tier							= '保';
			prob							= 98;
		}

		return {
			school_name:	r.school_name,
			group_name:		r.group_name,
			min_rank:		r.min_rank,
			plan_count:		r.plan_count,
			diff:			diff,
			tier:			tier,
			prob:			Math.round(prob)
		};
	});

	return json_response({
		agent:		'probability',
		user_score:	score,
		user_rank:	user_rank,
		school:		rows[0].school_name,
		results:	results
	});
}


// ========== Agent 5: 风险 ==========
async function handle_risk(env) {
	// 真实大小年案例：用 D1 数据查最具波动的 3 个院校
	const samples							= [];

	// 案例 1：典型大小年（2024 小年 vs 2025 大年）
	const case1								= await env.DB.prepare(`
		SELECT a.school_name, a.group_name AS group_a,
			   a.min_rank AS rank_2024, b.min_rank AS rank_2025,
			   (b.min_rank - a.min_rank) AS diff
		FROM gaokao_scores a
		JOIN gaokao_scores b ON a.school_code = b.school_code AND a.group_code = b.group_code
		WHERE a.year = 2024 AND b.year = 2025
		  AND a.min_rank > 5000 AND a.min_rank < 30000
		  AND (b.min_rank - a.min_rank) > 5000
		ORDER BY (b.min_rank - a.min_rank) DESC
		LIMIT 3
	`).all();

	// 案例 2：回归型（连续 2 年波动）
	const case2								= await env.DB.prepare(`
		SELECT a.school_name, a.group_name,
			   a.min_rank AS r2023, b.min_rank AS r2024, c.min_rank AS r2025
		FROM gaokao_scores a
		JOIN gaokao_scores b ON a.school_code = b.school_code AND a.group_code = b.group_code
		JOIN gaokao_scores c ON a.school_code = c.school_code AND a.group_code = c.group_code
		WHERE a.year = 2023 AND b.year = 2024 AND c.year = 2025
		  AND a.min_rank > 3000 AND a.min_rank < 50000
		ORDER BY ABS(b.min_rank - a.min_rank) + ABS(c.min_rank - b.min_rank) DESC
		LIMIT 3
	`).all();

	return json_response({
		agent:		'risk',
		topics:		[
			{
				title:	'什么是大小年？',
				desc:	'某院校某年录取分数线突然走高（大年）或下跌（小年），下一年会有反向波动。AI 根据 5 年数据识别波动规律。',
				icon:	'📉'
			},
			{
				title:	'什么时候会被退档？',
				desc:	'被投档但某科成绩、体检、政审不符合要求。退档后无法再进入同批次其他学校，只能走征集志愿。',
				icon:	'⚠️'
			},
			{
				title:	'专业调剂是什么？',
				desc:	'山东是"专业(类)+学校"模式，每个志愿是具体专业不会被调剂。但同一专业组内录取后可能被调整。',
				icon:	'🔄'
			}
		],
		big_small_year_cases:	(case1.results || []).slice(0, 3),
		volatility_cases:		(case2.results || []).slice(0, 3)
	});
}


// ========== Agent 6: 填报 ==========
function handle_submit() {
	return json_response({
		agent:		'submit',
		rules:		[
			{title: '96 个志愿怎么填', desc: '山东普通类常规批每次可填 96 个志愿，每个志愿是"1 专业 + 1 学校"', icon: '📋'},
			{title: '投档顺序', desc: '按"位次优先，遵循志愿，一轮投档"检索。从志愿 1 开始，符合条件就投档，后续失效', icon: '🎯'},
			{title: '冲稳保比例', desc: 'AI 推荐最优比例 25% 冲 / 50% 稳 / 25% 保，避免滑档', icon: '⚖️'},
			{title: '退档风险', desc: '体检受限/单科不够/不服从调剂 都可能退档。Me Offer 会自动排除对你不友好的专业', icon: '🛡️'}
		],
		ratio:		{chong: 25, wen: 50, bao: 25}
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
// deployment at 1776390009
