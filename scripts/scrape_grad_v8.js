/* ============================================
   Me Offer 考研爬虫 v8 · 深度 3 层 PDF 搜寻
   对每所学校做深度 3 层 BFS 查找 PDF
   每层都评分选最可能是"专业目录"的链接
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
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_v8_' + new Date().toISOString().substring(0, 10) + '.log';


function log_line(msg) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + msg;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


function download(url, save_path) {
	try {
		execFileSync('curl', ['-skL', '-A', 'Mozilla/5.0 Chrome/120', '--max-time', '180', url, '-o', save_path], { timeout: 200000 });
		return fs.statSync(save_path).size;
	}
	catch (e) { return 0; }
}


function pdf_to_text(pdf_path) {
	try {
		return execFileSync('pdftotext', ['-layout', pdf_path, '-'], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
	}
	catch (e) { return ''; }
}


async function claude_parse_chunk(uni_name, context, text) {
	let sp						= '你是中国高校硕士招生目录解析专家。从文本中提取所有硕士专业。\n返回 JSON 数组:\n[{"college_name":"学院","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n规则: 只硕士不博士, 专业代码 6 位, 第 3 位 5=专业型, 无数据返回 [], 纯 JSON';

	let body					= JSON.stringify({
		model:				MODEL, max_tokens: 16000, system: sp,
		messages: [
			{ role: 'user', content: '大学: ' + uni_name + '\n上下文: ' + context + '\n\n' + text.substring(0, 30000) },
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
	catch (e) { return []; }
}


async function parse_all(uni_name, text) {
	let all						= [];
	let chunks					= [];
	for (let i = 0; i < text.length; i += 20000) chunks.push(text.substring(i, i + 20000));
	log_line('  分 ' + chunks.length + ' 块');
	for (let i = 0; i < chunks.length; i++) {
		let r					= await claude_parse_chunk(uni_name, '第 ' + (i + 1), chunks[i]);
		log_line('    块 ' + (i + 1) + ': ' + r.length);
		for (let p of r) all.push(p);
		await new Promise(function (r) { setTimeout(r, 800); });
	}
	return all;
}


async function write_d1(code, programs) {
	try {
		let r					= await fetch(D1_INGEST_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ university_code: code, programs: programs }) });
		return await r.json();
	}
	catch (e) { return { success: false }; }
}


function score_pdf(text) {
	let score					= 0;
	if (/招生.*专业.*目录|专业目录|招生.*学科.*目录|招生.*专业/.test(text)) score += 150;
	if (/硕士.*专业.*目录|硕士.*招生.*目录/.test(text)) score += 100;
	if (/专业目录|招生目录/.test(text)) score += 80;
	if (/硕士/.test(text)) score += 30;
	if (/2026|2025/.test(text)) score += 20;
	if (/博士|推免.*办法|报考.*公告|复试.*办法|调剂/.test(text)) score -= 80;
	if (/简章(?!.*目录)/.test(text)) score -= 30;
	return score;
}


function score_nav(text, href) {
	let score					= 0;
	if (/硕士.*招生|招生.*硕士/.test(text)) score += 60;
	if (/招生简章.*目录|简章目录|专业目录|招生目录/.test(text)) score += 100;
	if (/硕士招生/.test(text)) score += 50;
	if (/招生简章/.test(text)) score += 40;
	if (/2026|2025/.test(text)) score += 15;
	if (/博士|推免|复试|调剂|录取/.test(text)) score -= 50;
	if (/新闻|公告|联系|介绍/.test(text)) score -= 30;
	if (/院系|学院/.test(text)) score += 10;
	return score;
}


async function deep_find(page, target, depth, visited) {
	if (depth > 3) return null;
	visited = visited || {};

	let cur_url					= page.url();
	if (visited[cur_url]) return null;
	visited[cur_url]			= 1;

	log_line('  D' + depth + ': ' + cur_url.substring(0, 80));

	/* 1. 先找当前页所有 PDF */
	let pdfs					= await page.evaluate(function () {
		return Array.from(document.querySelectorAll('a[href]'))
			.filter(function (a) { return /\.pdf($|\?)/i.test(a.href); })
			.map(function (a) { return { text: (a.textContent || '').trim().substring(0, 80), url: a.href }; });
	});

	if (pdfs.length > 0) {
		pdfs.forEach(function (p) { p.score = score_pdf(p.text); });
		pdfs.sort(function (a, b) { return b.score - a.score; });
		if (pdfs[0].score >= 50) {
			log_line('    ✅ PDF: [' + pdfs[0].score + '] ' + pdfs[0].text);
			return pdfs[0];
		}
	}

	/* 2. 找导航链接继续深搜 */
	let nav_links				= await page.evaluate(function () {
		let links				= Array.from(document.querySelectorAll('a[href]'))
			.map(function (a) { return { text: (a.textContent || '').trim().substring(0, 60), url: a.href }; })
			.filter(function (l) {
				if (l.text.length < 2 || l.text.length > 40) return false;
				if (l.url.indexOf('javascript:') === 0) return false;
				try { if (new URL(l.url).hostname !== location.hostname) return false; } catch (e) { return false; }
				return true;
			});
		return links;
	});

	nav_links.forEach(function (l) { l.score = score_nav(l.text, l.url); });
	nav_links					= nav_links.filter(function (l) { return l.score > 20; }).sort(function (a, b) { return b.score - a.score; }).slice(0, 4);

	if (nav_links.length === 0) return null;

	log_line('    导航候选: ' + nav_links.slice(0, 3).map(function (l) { return '[' + l.score + ']' + l.text; }).join(' | '));

	for (let i = 0; i < nav_links.length; i++) {
		let link				= nav_links[i];
		try {
			await page.goto(link.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
			await new Promise(function (r) { setTimeout(r, 2500); });
		}
		catch (e) { continue; }

		let result				= await deep_find(page, target, depth + 1, visited);
		if (result) return result;
	}

	return null;
}


async function process_school(browser, target) {
	log_line('');
	log_line('🎓 ' + target.name + ' (' + target.code + ')');

	let page					= await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 Chrome/120');
	await page.setViewport({ width: 1280, height: 900 });

	try {
		await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
		await new Promise(function (r) { setTimeout(r, 3000); });

		let pdf_info			= await deep_find(page, target, 1);

		if (!pdf_info) {
			log_line('  ❌ 深搜未发现 PDF');
			return 0;
		}

		log_line('  PDF URL: ' + pdf_info.url);

		let pdf_path			= path.join(PDF_DIR, target.code + '_v8.pdf');
		let size				= download(pdf_info.url, pdf_path);

		if (size < 5000) {
			log_line('  ❌ 下载失败 ' + size);
			return 0;
		}

		log_line('  ' + Math.round(size / 1024) + 'KB');

		let text				= pdf_to_text(pdf_path);
		log_line('  文本: ' + text.length);

		if (text.length < 500) return 0;

		let programs			= await parse_all(target.name, text);
		log_line('  📊 共 ' + programs.length);

		if (programs.length === 0) return 0;

		let BATCH				= 50;
		let total				= 0;
		for (let i = 0; i < programs.length; i += BATCH) {
			let r				= await write_d1(target.code, programs.slice(i, i + BATCH));
			if (r.success) total += (r.count || 0);
		}

		log_line('  ✅ D1: ' + total);
		return total;
	}
	catch (e) {
		log_line('  ❌ err: ' + e.message.substring(0, 100));
		return 0;
	}
	finally { try { await page.close(); } catch (e) { } }
}


async function main() {
	log_line('🚀 Me Offer 考研爬虫 v8 · 深度搜索');

	let targets					= JSON.parse(fs.readFileSync('/root/meuni-apply-bot/v8_urls.json', 'utf8'));
	let args					= process.argv.slice(2);
	if (args.length > 0) targets = targets.filter(function (t) { return args.indexOf(t.code) !== -1 || args.indexOf(t.name) !== -1; });

	log_line('目标: ' + targets.length);

	if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

	let browser					= await puppeteer.launch({
		headless: 'new',
		args: ['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--disable-gpu', '--ignore-certificate-errors']
	});

	let grand					= 0;
	let result_list				= [];

	for (let t of targets) {
		let n					= await process_school(browser, t);
		grand					= grand + n;
		result_list.push({ name: t.name, count: n });
	}

	await browser.close();

	log_line('');
	log_line('📊 结果:');
	result_list.forEach(function (r) { log_line('  ' + (r.count > 0 ? '✅' : '❌') + ' ' + r.name + ': ' + r.count); });
	log_line('');
	log_line('🏁 共 ' + grand + ' 专业入库');
}


main();
