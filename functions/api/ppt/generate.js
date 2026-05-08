// POST /api/ppt/generate
// 鉴权：X-Admin-Secret 或 X-Teacher-Token
// body: {
//   title: '基因工程的基本操作程序',
//   subject: '生物',
//   knowledge_point: '基因工程基本操作程序',
//   source_text: '大本资料（可选）',
//   topic_id: 10,                     // 关联已有 AI 专题课（可选，关联后例题从专题里取）
//   source_file: 'xxx.docx'
// }
// 输出：slides_json（10-12 页 JSON），前端 PptxGenJS 渲染

import { get_teacher_from_request, is_admin_secret, json_response, options_response } from '../_lib/teacher_auth.js';

export async function onRequestPost(context) {
	const env = context.env;

	const is_admin = is_admin_secret(context);
	const teacher = is_admin ? null : await get_teacher_from_request(context);

	if (!is_admin && !teacher) return json_response({ success: false, error: '未授权' }, 401);
	if (!env.CLAUDE_API_KEY) return json_response({ success: false, error: 'Claude API Key 未配置' }, 500);

	let body;
	try { body = await context.request.json(); } catch (e) { return json_response({ success: false, error: 'invalid json' }, 400); }

	let title = String(body.title || '').slice(0, 200).trim();
	let subject = String(body.subject || '').slice(0, 20).trim();
	let knowledge_point = String(body.knowledge_point || '').slice(0, 300).trim();
	const one_liner = String(body.one_liner || '').slice(0, 300).trim();
	let source_text = String(body.source_text || '').slice(0, 100000);
	const topic_id = parseInt(body.topic_id || 0);
	let source_file = String(body.source_file || '').slice(0, 200);

	/* 关联专题模式：只传了 topic_id，自动从专题表拿标题/学科/知识点 */
	if (topic_id && (!title || !knowledge_point)) {
		try {
			const tr = await env.DB.prepare(
				"SELECT title, subject, knowledge_point, source_file FROM topics WHERE id = ?"
			).bind(topic_id).first();
			if (tr) {
				if (!title) title = tr.title || '';
				if (!subject) subject = tr.subject || '';
				if (!knowledge_point) knowledge_point = tr.knowledge_point || '';
				if (!source_file) source_file = tr.source_file || '';
			}
		} catch (e) {}
	}

	/* 一句话模式：用户只填 one_liner，没填详细字段 → AI 预解析 */
	if (one_liner && (!title || !knowledge_point)) {
		const parsed_meta = await parse_one_liner(one_liner, env.CLAUDE_API_KEY);
		if (parsed_meta) {
			if (!title) title = parsed_meta.title || one_liner.slice(0, 60);
			if (!subject) subject = parsed_meta.subject || '';
			if (!knowledge_point) knowledge_point = parsed_meta.knowledge_point || one_liner;
		} else {
			if (!title) title = one_liner.slice(0, 60);
			if (!knowledge_point) knowledge_point = one_liner;
		}
	}

	if (!title) return json_response({ success: false, error: '请指定专题、一句话描述、或标题' }, 400);
	if (!knowledge_point) return json_response({ success: false, error: '请指定专题或知识点' }, 400);

	/* 如果有 topic_id，把已有专题的题目拉出来作为例题素材 */
	let topic_questions = [];
	if (topic_id) {
		try {
			const tr = await env.DB.prepare("SELECT questions_json FROM topics WHERE id = ?").bind(topic_id).first();
			if (tr && tr.questions_json) {
				const qj = JSON.parse(tr.questions_json);
				topic_questions = (qj.questions || []).slice(0, 4);
			}
		} catch (e) {}
	}

	const teacher_name = teacher ? teacher.name : 'Me Offer 教研团';

	const system_prompt = build_system_prompt(subject, title, teacher_name);
	const user_prompt = build_user_prompt(knowledge_point, source_text, topic_questions);

	try {
		const claude_res = await fetch('https://api.anthropic.com/v1/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': env.CLAUDE_API_KEY,
				'anthropic-version': '2023-06-01'
			},
			body: JSON.stringify({
				model: 'claude-sonnet-4-6',
				max_tokens: 8000,
				system: system_prompt,
				messages: [{ role: 'user', content: user_prompt }]
			})
		});

		if (!claude_res.ok) {
			const err = await claude_res.text();
			return json_response({ success: false, error: 'Claude 调用失败', details: err.slice(0, 300) }, 500);
		}

		const data = await claude_res.json();
		let raw_text = '';
		if (data.content && data.content[0] && data.content[0].text) raw_text = data.content[0].text.trim();

		const parsed = try_parse_json(raw_text);
		if (!parsed) return json_response({ success: false, error: 'AI 返回格式错误', raw: raw_text.slice(0, 500) }, 500);

		const slides = Array.isArray(parsed.slides) ? parsed.slides : [];
		if (slides.length < 5) return json_response({ success: false, error: 'AI 返回页数不足', raw: raw_text.slice(0, 300) }, 500);

		/* 成本估算 */
		const input_tokens = (data.usage && data.usage.input_tokens) || 0;
		const output_tokens = (data.usage && data.usage.output_tokens) || 0;
		const cost_usd = (input_tokens * 3 + output_tokens * 15) / 1_000_000;
		const cost_fen = Math.round(cost_usd * 7.2 * 100);

		/* 存档 */
		const db = env.DB;
		const teacher_id = teacher ? teacher.id : null;
		const created_by = is_admin ? 'ceo' : ('teacher:' + teacher.id);

		let ppt_id = null;
		try {
			const res = await db.prepare(
				"INSERT INTO ppt_files (teacher_id, title, subject, knowledge_point, slides_json, source_file, topic_id, slide_count, cost_fen, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
			).bind(
				teacher_id, title, subject, knowledge_point,
				JSON.stringify({ slides: slides, summary: parsed.summary || '' }),
				source_file, topic_id || null, slides.length, cost_fen, created_by
			).run();
			ppt_id = res.meta.last_row_id;
		} catch (e) {
			return json_response({ success: false, error: '存储失败', details: String(e).slice(0, 200) }, 500);
		}

		return json_response({
			success: true,
			ppt_id: ppt_id,
			title: title,
			slide_count: slides.length,
			slides: slides,
			summary: parsed.summary || '',
			teacher_name: teacher_name,
			cost_yuan: (cost_fen / 100).toFixed(2)
		});
	} catch (err) {
		return json_response({ success: false, error: '网络异常', details: String(err).slice(0, 200) }, 500);
	}
}

function build_system_prompt(subject, title, teacher_name) {
	return '你是中国 K12「' + (subject || '理综') + '」资深教研专家（覆盖小学/初中/高中/高考各学段），受邀为一线教师设计一节精品课件 · 难度匹配老师指定的学段。\n\n' +
		'【任务】\n' +
		'为老师生成一份 10-12 页的 PPT 教学课件大纲（JSON 格式），包含：\n' +
		'- 1 页封面\n' +
		'- 1 页本节课学习目标\n' +
		'- 3-4 页知识点详解（把核心概念、步骤、注意点拆开讲）\n' +
		'- 3-4 页例题讲解（题干 + 选项 + 答案 + 教学性讲解）\n' +
		'- 1 页课堂练习（1-2 道题，无答案，留给学生课堂写）\n' +
		'- 1 页总结（核心要点回顾）\n\n' +
		'【讲稿风格】\n' +
		'- 每页都要有「主标题 + 要点 3-5 条」，不要罗列过多\n' +
		'- 要点用教师讲课的口吻：动词开头、短句、朗朗上口\n' +
		'- 避免过于学术化的长句\n' +
		'- 例题讲解要有「解题思路」不只有答案\n\n' +
		'【⚠️ 重要约束 - PPT 不支持图片】\n' +
		'- 当前 PPT 模板【不支持渲染图片】，所以你必须做到：\n' +
		'- ❌ 严禁出现"如图所示"、"下图"、"上图"、"右图"、"示意图如下"这种引用不存在图片的表述\n' +
		'- ❌ 严禁选择题目时挑选必须看图才能解的（如"图中 ① 表示..."）\n' +
		'- ✅ 例题必须是【纯文字】可以独立解答的题型（概念辨析、文字描述实验、数值计算、判断推理）\n' +
		'- ✅ 如果某个学科知识点必须借助图（如生物的细胞结构图、化学的实验装置图、几何题），请改用【纯文字描述】，例如：\n' +
		'    "在减数分裂第二次分裂前期，同源染色体的非姐妹染色单体之间发生交叉互换" \n' +
		'    （不要写"如图所示，减数分裂..."）\n' +
		'- 知识点页（type=knowledge）也是同理：避免"参考图示"，改用文字流程"步骤一 → 步骤二 → 步骤三"\n\n' +
		'【输出格式 - 严格 JSON】\n' +
		'```json\n' +
		'{\n' +
		'  "summary": "本节课共 11 页，50 分钟",\n' +
		'  "slides": [\n' +
		'    {\n' +
		'      "type": "cover",\n' +
		'      "title": "' + title + '",\n' +
		'      "subtitle": "' + (subject || '') + ' · 高考同步课",\n' +
		'      "author": "' + teacher_name + '"\n' +
		'    },\n' +
		'    {\n' +
		'      "type": "objective",\n' +
		'      "title": "本节课学习目标",\n' +
		'      "items": ["掌握 X", "理解 Y", "会应用 Z"]\n' +
		'    },\n' +
		'    {\n' +
		'      "type": "knowledge",\n' +
		'      "title": "知识点一：xxx",\n' +
		'      "subtitle": "核心概念",\n' +
		'      "items": ["要点 1", "要点 2", "要点 3"],\n' +
		'      "note": "老师口播讲稿（可选，1-2 句话）"\n' +
		'    },\n' +
		'    {\n' +
		'      "type": "example",\n' +
		'      "title": "例题 1",\n' +
		'      "stem": "完整题干",\n' +
		'      "options": [{"label": "A", "text": "..."}, {"label": "B", "text": "..."}],\n' +
		'      "answer": "D",\n' +
		'      "analysis": "解题思路（3-4 句话）"\n' +
		'    },\n' +
		'    {\n' +
		'      "type": "exercise",\n' +
		'      "title": "课堂练习",\n' +
		'      "questions": [{"stem": "题干", "options": [{"label":"A","text":"..."}]}]\n' +
		'    },\n' +
		'    {\n' +
		'      "type": "summary",\n' +
		'      "title": "本节课要点回顾",\n' +
		'      "items": ["核心 1", "核心 2", "核心 3"]\n' +
		'    }\n' +
		'  ]\n' +
		'}\n' +
		'```\n\n' +
		'【重要】\n' +
		'- 只输出 JSON，不要任何解释\n' +
		'- type 只能是: cover / objective / knowledge / example / exercise / summary\n' +
		'- 每页内容自成一体，不要跨页连续\n' +
		'- 所有文本用中文\n' +
		'- 例题如有选项填 options，没有则设为 []';
}

function build_user_prompt(knowledge_point, source_text, topic_questions) {
	let txt = '【本节课知识点】' + knowledge_point + '\n\n';
	if (source_text) txt += '【教学资料】\n' + source_text.slice(0, 50000) + '\n\n';
	if (topic_questions && topic_questions.length > 0) {
		txt += '【可用例题（请从中选 3-4 道最典型的放入"例题讲解"页）】\n';
		for (let q of topic_questions) {
			txt += '- 题干：' + (q.stem || '') + '\n';
			if (q.options && q.options.length > 0) {
				for (let o of q.options) txt += '  ' + o.label + '. ' + o.text + '\n';
			}
			txt += '  答案：' + (q.answer || '') + '\n';
			if (q.analysis) txt += '  分析：' + q.analysis + '\n';
			txt += '\n';
		}
	}
	txt += '\n请按照 10-12 页的精简版结构，输出 PPT 大纲 JSON。';
	return txt;
}

/* 一句话 → 自动提取 title/subject/knowledge_point · 用 Haiku 省钱，只需 3 秒 */
async function parse_one_liner(one_liner, api_key) {
	if (!api_key) return null;

	const prompt = '你是一个 PPT 课件助手。把下面这句话拆解成 3 个字段：title（课件标题 · 10-30 字）、subject（学科 · 9 选 1: 生物/化学/物理/数学/语文/英语/地理/历史/政治）、knowledge_point（这节课的核心知识点 · 50-150 字描述）。\n\n用户的输入：' + one_liner + '\n\n只输出 JSON：{"title": "...", "subject": "...", "knowledge_point": "..."}，不要任何解释。';

	try {
		const r = await fetch('https://api.anthropic.com/v1/messages', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'x-api-key': api_key, 'anthropic-version': '2023-06-01' },
			body: JSON.stringify({
				model: 'claude-haiku-4-5',
				max_tokens: 500,
				messages: [{ role: 'user', content: prompt }]
			})
		});
		if (!r.ok) return null;
		const data = await r.json();
		const text = data.content && data.content[0] && data.content[0].text || '';

		let s = text.trim();
		if (s.indexOf('```') !== -1) {
			const m = s.match(/```(?:json)?\s*([\s\S]*?)```/);
			if (m) s = m[1].trim();
		}
		const start = s.indexOf('{');
		const end = s.lastIndexOf('}');
		if (start === -1 || end === -1) return null;
		const obj = JSON.parse(s.slice(start, end + 1));

		const allowed_subjects = ['生物','化学','物理','数学','语文','英语','地理','历史','政治'];
		return {
			title: String(obj.title || '').slice(0, 60).trim(),
			subject: allowed_subjects.indexOf(obj.subject) !== -1 ? obj.subject : '',
			knowledge_point: String(obj.knowledge_point || '').slice(0, 300).trim()
		};
	} catch (e) {
		return null;
	}
}

function try_parse_json(text) {
	text = String(text || '').trim();
	if (text.indexOf('```') !== -1) {
		const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
		if (m) text = m[1].trim();
	}
	const start = text.indexOf('{');
	const end = text.lastIndexOf('}');
	if (start === -1 || end === -1 || end < start) return null;
	let s = text.slice(start, end + 1);
	try { return JSON.parse(s); } catch (e) {
		const fixed = s.replace(/[\u201c\u201d]/g, '"').replace(/[\u2018\u2019]/g, "'");
		try { return JSON.parse(fixed); } catch (e2) { return null; }
	}
}

export const onRequestOptions = options_response;
