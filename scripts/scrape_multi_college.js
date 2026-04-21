/* ============================================
   Me Offer 考研爬虫 v7 · 多学院子页爬取
   适用于清华/复旦/东南这种分层 HTML 索引
   1. 打开首页拿所有学院链接
   2. 挨个进入学院详情页
   3. Claude 解析每个学院的专业
   ============================================ */

const puppeteer					= require('/root/meuni-apply-bot/node_modules/puppeteer');
const fs						= require('fs');
const os						= require('os');

const CLAUDE_URL				= 'https://api.europemart.com/api/claude/proxy';
const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const MODEL						= 'claude-haiku-4-5-20251001';
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_v7_' + new Date().toISOString().substring(0, 10) + '.log';


function log_line(msg) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + msg;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


async function claude_parse(uni_name, college, text) {
	let system_prompt			= '你是中国高校硕士招生目录解析专家。从文本中提取所有硕士专业。\n' +
		'返回 JSON 数组:\n' +
		'[{"college_name":"学院","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n' +
		'规则:\n- 只硕士不博士\n- 专业代码 6 位\n- 第 3 位 5 = 专业型\n- 无数据返回 []\n- 纯 JSON';

	let body					= JSON.stringify({
		model:				MODEL,
		max_tokens:			16000,
		system:				system_prompt,
		messages:			[
			{ role: 'user', content: '大学: ' + uni_name + '\n学院: ' + college + '\n\n' + text.substring(0, 30000) },
			{ role: 'assistant', content: '[' }
		]
	});

	try {
		let r					= await fetch(CLAUDE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body });
		let d					= await r.json();

		if (!d.content || !d.content[0]) return [];

		let txt					= '[' + d.content[0].text.trim();
		txt						= txt.replace(/```(?:json)?/g, '').trim();

		if (txt.endsWith(']') === false) {
			let lb				= txt.lastIndexOf('}');
			if (lb !== -1) txt	= txt.substring(0, lb + 1) + ']';
		}

		let p					= JSON.parse(txt);
		return Array.isArray(p) ? p : [];
	}
	catch (e) {
		log_line('      err: ' + e.message.substring(0, 80));
		return [];
	}
}


async function write_d1(code, programs) {
	try {
		let r					= await fetch(D1_INGEST_URL, {
			method:				'POST',
			headers:			{ 'Content-Type': 'application/json' },
			body:				JSON.stringify({ university_code: code, programs: programs })
		});
		return await r.json();
	}
	catch (e) { return { success: false, error: e.message }; }
}


async function extract_college_links(page) {
	return await page.evaluate(function () {
		return Array.from(document.querySelectorAll('a[href]'))
			.map(function (a) {
				return { text: (a.textContent || '').trim().substring(0, 80), href: a.href };
			})
			.filter(function (l) {
				if (l.text.length < 3 || l.text.length > 70) return false;
				/* 学院名含数字编号 + (学院|系|研究院|学部|书院|中心) */
				if (/^\d{2,4}\s*\S+(?:学院|系|研究院|学部|书院|中心|医学部)/.test(l.text)) return true;
				/* 学院名以关键字结尾 */
				if (/(?:学院|系|研究院|医学部)$/.test(l.text) && /\d/.test(l.text)) return true;
				/* 武大: "102外国语言文学学院(2026年)" 这种 */
				if (/\d{2,4}.*(?:学院|学部|系|研究院).*\(?2026\)?/.test(l.text)) return true;
				return false;
			});
	});
}


async function process_college(page, uni_name, college_text, college_url, uni_code) {
	log_line('  📂 ' + college_text);

	try {
		await page.goto(college_url, { waitUntil: 'networkidle2', timeout: 45000 });
		await new Promise(function (r) { setTimeout(r, 5000); });

		let text				= await page.evaluate(function () {
			return document.body ? document.body.innerText : '';
		});

		if (text.length < 500) {
			log_line('    文本太短');
			return [];
		}

		let programs			= await claude_parse(uni_name, college_text, text);
		log_line('    解析 ' + programs.length + ' 专业');
		return programs;
	}
	catch (e) {
		log_line('    err: ' + e.message.substring(0, 80));
		return [];
	}
}


async function process_school(browser, target) {
	log_line('');
	log_line('🎓 ' + target.name + ' (' + target.code + ')');

	let page					= await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 Chrome/120');
	await page.setViewport({ width: 1280, height: 900 });

	try {
		await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 60000 });
		await new Promise(function (r) { setTimeout(r, 8000); });

		let colleges			= await extract_college_links(page);
		log_line('  发现 ' + colleges.length + ' 个学院');

		if (colleges.length === 0) {
			log_line('  ❌ 无学院链接');
			return 0;
		}

		let all_programs		= [];

		for (let i = 0; i < colleges.length; i++) {
			let c				= colleges[i];
			log_line('  [' + (i + 1) + '/' + colleges.length + ']');
			let programs		= await process_college(page, target.name, c.text, c.href, target.code);
			for (let p of programs) all_programs.push(p);
			await new Promise(function (r) { setTimeout(r, 1500); });
		}

		log_line('  📊 共 ' + all_programs.length + ' 专业');

		if (all_programs.length === 0) return 0;

		/* 批量写 D1 */
		let BATCH				= 50;
		let total				= 0;

		for (let i = 0; i < all_programs.length; i += BATCH) {
			let chunk			= all_programs.slice(i, i + BATCH);
			let r				= await write_d1(target.code, chunk);
			if (r.success) total += (r.count || 0);
		}

		log_line('  ✅ D1 入库 ' + total);
		return total;
	}
	catch (e) {
		log_line('  ❌ 错误: ' + e.message.substring(0, 120));
		return 0;
	}
	finally {
		try { await page.close(); } catch (e) { }
	}
}


async function main() {
	log_line('🚀 Me Offer 考研爬虫 v7 · 多学院子页');

	let targets					= JSON.parse(fs.readFileSync('/root/meuni-apply-bot/multi_college_urls.json', 'utf8'));

	let args					= process.argv.slice(2);
	if (args.length > 0) {
		targets					= targets.filter(function (t) { return args.indexOf(t.code) !== -1 || args.indexOf(t.name) !== -1; });
	}

	log_line('目标: ' + targets.length + ' 所');

	let browser					= await puppeteer.launch({
		headless:				'new',
		args:					['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--disable-gpu', '--ignore-certificate-errors']
	});

	let grand					= 0;
	let success					= 0;
	let result_list				= [];

	for (let t of targets) {
		let n					= await process_school(browser, t);
		grand					= grand + n;
		if (n > 0) success++;
		result_list.push({ name: t.name, count: n });
	}

	await browser.close();

	log_line('');
	log_line('📊 详细结果:');
	result_list.forEach(function (r) {
		log_line('  ' + (r.count > 0 ? '✅' : '❌') + ' ' + r.name + ': ' + r.count);
	});

	log_line('');
	log_line('🏁 完成: ' + success + '/' + targets.length + ' 成功, 共 ' + grand + ' 专业入库');
}


main();
