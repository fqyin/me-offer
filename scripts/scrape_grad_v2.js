/* ============================================
   Me Offer 考研爬虫 v2
   支持 3 种页面类型:
   - "pdf_links": 索引页含 .pdf 链接，下载每个 PDF
   - "html_links": 索引页含学院 HTML 链接，跟进每个 HTML
   - "html": 单个 HTML 页含所有专业
   ============================================ */

const puppeteer					= require('/root/meuni-apply-bot/node_modules/puppeteer');
const fs						= require('fs');
const path						= require('path');
const os						= require('os');
const { execFileSync }			= require('child_process');

const CLAUDE_URL				= 'https://api.europemart.com/api/claude/proxy';
const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const MODEL						= 'claude-haiku-4-5-20251001';
const PDF_DIR					= '/tmp/grad_pdfs';
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_v2_' + new Date().toISOString().substring(0, 10) + '.log';


function log_line(msg) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + msg;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


async function get_page_content(page, url, wait_ms) {
	wait_ms						= wait_ms || 3000;

	try {
		await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
		await new Promise(function (r) { setTimeout(r, wait_ms); });

		return await page.evaluate(function () {
			Array.from(document.querySelectorAll('script,style,noscript')).forEach(function (el) { el.remove(); });

			let text			= document.body ? document.body.innerText : '';

			let links			= Array.from(document.querySelectorAll('a[href]'))
				.map(function (a) {
					return {
						text:	(a.textContent || '').trim(),
						href:	a.href
					};
				})
				.filter(function (l) { return l.text.length > 0 && l.text.length < 60; });

			return {
				text:	text,
				links:	links
			};
		});
	}
	catch (e) {
		return { text: '', links: [], error: e.message };
	}
}


function download_pdf(url, save_path) {
	try {
		execFileSync('curl', ['-sL', '-A', 'Mozilla/5.0 Chrome/120', '--max-time', '60', url, '-o', save_path], { timeout: 70000 });
		return fs.statSync(save_path).size;
	}
	catch (e) { return 0; }
}


function extract_pdf_text(pdf_path) {
	try {
		return execFileSync('pdftotext', ['-layout', pdf_path, '-'], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
	}
	catch (e) { return ''; }
}


async function parse_claude(uni_name, context_name, text) {
	let system_prompt			= '你是中国高校硕士招生目录解析专家。从 PDF/HTML 文本中提取所有硕士专业。\n\n' +
		'返回 JSON 数组:\n' +
		'[{"college_name":"学院","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n\n' +
		'规则:\n- 只提取硕士\n- 专业代码 6 位数字\n- 第 3 位是 5 = 专业型\n- 纯 JSON 无 markdown\n- 无数据返回 []';

	let body					= JSON.stringify({
		model:				MODEL,
		max_tokens:			16000,
		system:				system_prompt,
		messages:			[
			{ role: 'user', content: '大学: ' + uni_name + '\n上下文: ' + context_name + '\n\n文本:\n' + text.substring(0, 50000) },
			{ role: 'assistant', content: '[' }
		]
	});

	try {
		let response			= await fetch(CLAUDE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body });
		let data				= await response.json();

		if (!data.content || !data.content[0]) return [];

		let txt					= '[' + data.content[0].text.trim();
		txt						= txt.replace(/```(?:json)?/g, '').trim();

		if (txt.endsWith(']') === false) {
			let last_brace		= txt.lastIndexOf('}');
			if (last_brace !== -1) txt = txt.substring(0, last_brace + 1) + ']';
		}

		let parsed				= JSON.parse(txt);
		return Array.isArray(parsed) ? parsed : [];
	}
	catch (e) {
		log_line('    Claude err: ' + e.message.substring(0, 80));
		return [];
	}
}


async function write_d1(university_code, programs) {
	try {
		let response			= await fetch(D1_INGEST_URL, {
			method:				'POST',
			headers:			{ 'Content-Type': 'application/json' },
			body:				JSON.stringify({ university_code: university_code, programs: programs })
		});
		return await response.json();
	}
	catch (e) { return { success: false, error: e.message }; }
}


async function process_pdf_links(page, target) {
	/* 抓 index 页所有 PDF 链接 */
	await page.goto(target.index_url, { waitUntil: 'domcontentloaded', timeout: 30000 });
	await new Promise(function (r) { setTimeout(r, 3000); });

	let pdfs					= await page.evaluate(function () {
		return Array.from(document.querySelectorAll('a[href]'))
			.filter(function (a) { return /\.pdf($|\?)/i.test(a.href); })
			.map(function (a) {
				return {
					text:	(a.textContent || '').trim().substring(0, 40),
					url:	a.href
				};
			});
	});

	log_line('  发现 ' + pdfs.length + ' 个 PDF 链接');

	if (pdfs.length === 0) return [];

	let all						= [];

	for (let i = 0; i < pdfs.length; i++) {
		let p					= pdfs[i];
		log_line('  [' + (i + 1) + '/' + pdfs.length + '] ' + p.text);

		let safe				= p.text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '_').substring(0, 30);
		let pdf_path			= path.join(PDF_DIR, target.code + '_' + safe + '_' + i + '.pdf');

		let size				= download_pdf(p.url, pdf_path);

		if (size < 1000) {
			log_line('    ❌ 下载失败');
			continue;
		}

		let text				= extract_pdf_text(pdf_path);

		if (text.length < 100) {
			log_line('    ❌ 解析失败');
			continue;
		}

		log_line('    PDF=' + Math.round(size / 1024) + 'KB text=' + text.length);

		let programs			= await parse_claude(target.name, p.text, text);
		log_line('    解析 ' + programs.length + ' 专业');

		for (let pr of programs) all.push(pr);

		await new Promise(function (r) { setTimeout(r, 1500); });
	}

	return all;
}


async function process_html(page, target) {
	/* 单个 HTML 页直接解析 */
	let r						= await get_page_content(page, target.index_url, 5000);

	log_line('  text=' + r.text.length);

	if (r.text.length < 500) {
		log_line('  ❌ 内容太短');
		return [];
	}

	let programs				= await parse_claude(target.name, '首页', r.text);
	log_line('  解析 ' + programs.length + ' 专业');

	return programs;
}


async function process_html_links(page, target) {
	/* 抓 index 页每个学院 HTML 链接并跟进 */
	let r						= await get_page_content(page, target.index_url, 4000);

	if (r.links.length === 0) return [];

	/* 过滤学院链接（通常含"学院/系/研究院"等词，且非导航/外链） */
	let college_links			= r.links.filter(function (l) {
		let t					= l.text;
		if (!/学院|系$|研究院|中心|学部|书院/.test(t)) return false;
		if (/返回|首页|下载|登录|联系|搜索/.test(t)) return false;
		if (l.href.indexOf('javascript:') !== -1) return false;
		return true;
	}).slice(0, 50);

	log_line('  发现 ' + college_links.length + ' 个学院链接');

	if (college_links.length === 0) {
		/* 退化：直接解析 index 页 */
		return await parse_claude(target.name, '首页', r.text);
	}

	let all						= [];

	for (let i = 0; i < college_links.length; i++) {
		let c					= college_links[i];
		log_line('  [' + (i + 1) + '/' + college_links.length + '] ' + c.text);

		let sub					= await get_page_content(page, c.href, 3000);

		if (sub.text.length < 200) {
			log_line('    ❌ 内容太短');
			continue;
		}

		let programs			= await parse_claude(target.name, c.text, sub.text);
		log_line('    解析 ' + programs.length + ' 专业');

		for (let pr of programs) all.push(pr);

		await new Promise(function (r) { setTimeout(r, 1500); });
	}

	return all;
}


async function process_school(browser, target) {
	log_line('');
	log_line('🎓 ' + target.name + ' [' + target.type + ']');

	let page					= await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 Chrome/120');
	await page.setViewport({ width: 1280, height: 900 });

	let all_programs			= [];

	try {
		if (target.type === 'pdf_links') {
			all_programs		= await process_pdf_links(page, target);
		}
		else if (target.type === 'html_links') {
			all_programs		= await process_html_links(page, target);
		}
		else if (target.type === 'html') {
			all_programs		= await process_html(page, target);
		}

		log_line('  📊 合计 ' + all_programs.length + ' 专业');

		if (all_programs.length === 0) return 0;

		let BATCH				= 50;
		let total				= 0;

		for (let i = 0; i < all_programs.length; i += BATCH) {
			let chunk			= all_programs.slice(i, i + BATCH);
			let result			= await write_d1(target.code, chunk);
			if (result.success) total = total + (result.count || 0);
		}

		log_line('  ✅ D1 入库 ' + total);
		return total;
	}
	catch (e) {
		log_line('  ❌ 错误: ' + e.message.substring(0, 100));
		return 0;
	}
	finally {
		await page.close();
	}
}


async function main() {
	log_line('🚀 Me Offer 考研爬虫 v2');

	let target_args				= process.argv.slice(2);
	let urls					= JSON.parse(fs.readFileSync('/root/meuni-apply-bot/urls_34auto_line.json', 'utf8'));

	let targets;
	if (target_args.length > 0) {
		targets					= urls.filter(function (u) { return target_args.indexOf(u.code) !== -1 || target_args.indexOf(u.name) !== -1; });
	} else {
		targets					= urls;
	}

	log_line('目标: ' + targets.length + ' 所');

	if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

	let browser					= await puppeteer.launch({
		headless:				'new',
		args:					['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--disable-gpu', '--ignore-certificate-errors']
	});

	let grand					= 0;
	let success_schools			= 0;

	for (let t of targets) {
		let n					= await process_school(browser, t);
		grand					= grand + n;
		if (n > 0) success_schools++;
	}

	await browser.close();

	log_line('');
	log_line('🏁 完成: ' + success_schools + '/' + targets.length + ' 成功, 共 ' + grand + ' 专业入库');
}


main();
