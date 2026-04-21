/* ============================================
   Me Offer 考研扩充 · 中国研究生专业爬虫
   策略:
   1. 用 Puppeteer 爬各校研究生院招生专业目录页
   2. Claude Haiku 4.5 结构化解析
   3. 写入 meoffer-gaokao D1
   ============================================ */

const puppeteer					= require('/root/meuni-apply-bot/node_modules/puppeteer');
const fs						= require('fs');
const os						= require('os');

const CLAUDE_URL				= 'https://api.europemart.com/api/claude/proxy';
const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const MODEL						= 'claude-haiku-4-5-20251001';
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_programs_' + new Date().toISOString().substring(0, 10) + '.log';

/* 第一批：5 所最具代表性的高校测试管道 */
const TARGETS					= [
	{ code: '4111010003', name: '清华大学', url: 'https://yzbm.tsinghua.edu.cn/publish/s02/s0203/detail/1d58a1e4-dc87-49f9-be0a-d000c060763f' },
	{ code: '4111010001', name: '北京大学', url: 'https://admission.pku.edu.cn/docs/20251009101959431969.pdf' },
	{ code: '4131010246', name: '复旦大学', url: 'https://gsao.fudan.edu.cn/zsgl/ssyjs/list.htm' },
	{ code: '4131010248', name: '上海交通大学', url: 'https://yzb.sjtu.edu.cn/' },
	{ code: '4133010335', name: '浙江大学', url: 'https://grs.zju.edu.cn/yzw/' }
];


function log_line(msg) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + msg;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


async function launch() {
	return await puppeteer.launch({
		headless:				'new',
		args:					[
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--no-zygote',
			'--disable-gpu'
		]
	});
}


async function extract_page(page, url) {
	await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 Chrome/120.0.0.0');
	await page.setViewport({ width: 1280, height: 900 });

	await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

	/* 等 SPA 稳定 */
	let last_len				= 0;
	let stable					= 0;

	for (let i = 0; i < 10; i++) {
		await new Promise(function (r) { setTimeout(r, 2000); });
		let cur					= await page.evaluate(function () { return document.body ? document.body.innerText.length : 0; });

		if (cur === last_len) {
			stable++;
			if (stable >= 2) break;
		}
		else {
			stable				= 0;
			last_len			= cur;
		}
	}

	/* 提取文本 + 链接 */
	return await page.evaluate(function () {
		/* 移除脚本样式 */
		Array.from(document.querySelectorAll('script,style,noscript')).forEach(function (el) { el.remove(); });

		let text				= document.body ? document.body.innerText.substring(0, 60000) : '';

		let links				= Array.from(document.querySelectorAll('a[href]'))
			.filter(function (a) {
				let t			= (a.textContent || '').trim();
				return t.length > 3 && t.length < 100 && !/^(首页|返回|下载|登录|注册|更多)$/.test(t);
			})
			.slice(0, 100)
			.map(function (a) { return (a.textContent || '').trim() + ' -> ' + a.href; })
			.join('\n');

		return { text: text, links: links };
	});
}


async function parse_programs_with_claude(uni_name, content) {
	let system_prompt			= '你是中国高校研究生招生目录的解析专家。从提供的中文网页内容中提取所有硕士招生专业。\n\n' +
		'返回 JSON 数组，每个元素包含:\n' +
		'{\n' +
		'  "college_name": "学院/系名",\n' +
		'  "program_code": "6位专业代码（如 085100）",\n' +
		'  "program_name": "专业名称",\n' +
		'  "program_type": "学术型|专业型",\n' +
		'  "research_direction": "研究方向",\n' +
		'  "plan_count": 数字（招生人数，不确定填 null）,\n' +
		'  "exam_subjects": "考试科目简短描述",\n' +
		'  "study_mode": "全日制|非全日制|both",\n' +
		'  "notes": "备注（可空）"\n' +
		'}\n\n' +
		'规则:\n' +
		'- 只提取硕士专业，不提取博士\n' +
		'- 专业代码 6 位数字，如 085400\n' +
		'- program_type: 专业代码开头 08/12 是专业型，其他视情况判断\n' +
		'- 如果无法解析出专业，返回 []\n' +
		'- 不输出 markdown，只输出 JSON 数组';

	let body					= JSON.stringify({
		model:				MODEL,
		max_tokens:			16000,
		system:				system_prompt,
		messages:			[
			{ role: 'user', content: '大学: ' + uni_name + '\n\n' + content },
			{ role: 'assistant', content: '[' }
		]
	});

	let response				= await fetch(CLAUDE_URL, {
		method:				'POST',
		headers:			{ 'Content-Type': 'application/json' },
		body:				body
	});

	let data					= await response.json();

	if (!data.content || !data.content[0]) return [];

	let txt						= '[' + data.content[0].text.trim();
	txt							= txt.replace(/```(?:json)?/g, '').trim();

	if (txt.endsWith(']') === false) {
		let last_brace			= txt.lastIndexOf('}');
		if (last_brace !== -1) txt = txt.substring(0, last_brace + 1) + ']';
	}

	try {
		let parsed				= JSON.parse(txt);
		return Array.isArray(parsed) ? parsed : [];
	}
	catch (e) {
		log_line('  JSON parse error: ' + e.message);
		return [];
	}
}


async function write_to_d1(university_code, programs) {
	try {
		let response			= await fetch(D1_INGEST_URL, {
			method:				'POST',
			headers:			{ 'Content-Type': 'application/json' },
			body:				JSON.stringify({ university_code: university_code, programs: programs })
		});

		return await response.json();
	}
	catch (error) {
		return { success: false, error: error.message };
	}
}


async function process_one(browser, target) {
	log_line('📍 ' + target.name + ' (' + target.code + ')');
	log_line('  URL: ' + target.url);

	let page					= null;

	try {
		page					= await browser.newPage();

		let content				= await extract_page(page, target.url);

		log_line('  text=' + content.text.length + ' links=' + content.links.length);

		if (content.text.length < 500) {
			log_line('  ❌ 页面内容太短');
			return { success: false, count: 0 };
		}

		/* 拼接 links 给 Claude */
		let full_content		= content.text + '\n\n=== LINKS ===\n' + content.links;

		let programs			= await parse_programs_with_claude(target.name, full_content);

		log_line('  Claude 解析出 ' + programs.length + ' 个专业');

		if (programs.length === 0) {
			return { success: false, count: 0 };
		}

		/* 显示样本 */
		for (let i = 0; i < Math.min(3, programs.length); i++) {
			let p				= programs[i];
			log_line('    [' + (p.program_code || '?') + '] ' + (p.college_name || '?') + ' - ' + (p.program_name || '?') + ' (' + (p.plan_count || '?') + '人)');
		}

		/* 写 D1 */
		let result				= await write_to_d1(target.code, programs);

		if (result.success) {
			log_line('  ✅ D1 入库 ' + result.count + ' 条');
			return { success: true, count: result.count };
		}

		log_line('  ⚠ D1 写入失败: ' + JSON.stringify(result));
		return { success: false, count: 0 };
	}
	catch (error) {
		log_line('  ❌ 错误: ' + error.message.substring(0, 150));
		return { success: false, count: 0 };
	}
	finally {
		if (page) try { await page.close(); } catch (e) { }
	}
}


async function main() {
	log_line('🎓 中国研究生专业爬虫启动');
	log_line('目标: ' + TARGETS.length + ' 所高校');

	let browser					= await launch();
	let total_success			= 0;
	let total_count				= 0;

	for (let t of TARGETS) {
		log_line('');
		let r					= await process_one(browser, t);
		if (r.success) total_success++;
		total_count				= total_count + r.count;

		/* 间隔 */
		await new Promise(function (r) { setTimeout(r, 5000); });
	}

	await browser.close();

	log_line('');
	log_line('🏁 完成: ' + total_success + '/' + TARGETS.length + ' 成功, 共 ' + total_count + ' 条专业入库');
}


main();
