/* ============================================
   Me Offer 考研扩充 · PDF 版爬虫（方案 B）
   流程：
   1. Puppeteer 抓学校招生目录页，提取所有学院的 PDF 链接
   2. 下载每个 PDF → pdftotext 提取文本
   3. Claude 解析表格 → D1
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
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_pdf_' + new Date().toISOString().substring(0, 10) + '.log';


const TARGETS					= [
	{
		code:					'4111010001',
		name:					'北京大学',
		index_url:				'https://admission.pku.edu.cn/zsxx/sszs/zyml/2026/yx/zsml_ss_yx.html'
	}
];


function log_line(msg) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + msg;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


async function extract_pdf_links(browser, target) {
	let page					= await browser.newPage();

	try {
		await page.setUserAgent('Mozilla/5.0 Chrome/120');
		await page.goto(target.index_url, { waitUntil: 'domcontentloaded', timeout: 30000 });
		await new Promise(function (r) { setTimeout(r, 3000); });

		let links				= await page.evaluate(function () {
			return Array.from(document.querySelectorAll('a[href]'))
				.filter(function (a) { return /\.pdf$/i.test(a.href); })
				.map(function (a) {
					return {
						dept:	(a.textContent || '').trim().substring(0, 40),
						url:	a.href
					};
				});
		});

		return links;
	}
	finally {
		await page.close();
	}
}


function download_pdf(url, save_path) {
	try {
		execFileSync('curl', ['-sL', '-A', 'Mozilla/5.0 Chrome/120', '--max-time', '60', url, '-o', save_path], { timeout: 70000 });
		let stats				= fs.statSync(save_path);
		return stats.size;
	}
	catch (e) {
		return 0;
	}
}


function extract_text_from_pdf(pdf_path) {
	try {
		let result				= execFileSync('pdftotext', ['-layout', pdf_path, '-'], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
		return result;
	}
	catch (e) {
		return '';
	}
}


async function parse_with_claude(uni_name, dept_name, text) {
	let system_prompt			= '你是中国高校硕士研究生招生专业目录的解析专家。从提供的 PDF 文本中提取所有硕士招生专业。\n\n' +
		'返回 JSON 数组:\n' +
		'[{"college_name":"学院名","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n\n' +
		'规则:\n' +
		'- 只提取硕士，不提取博士\n' +
		'- 专业代码 6 位数字\n' +
		'- 第 3 位是 5 = 专业型（085400/125100）\n' +
		'- 无法解析返回 []\n' +
		'- 纯 JSON，无 markdown';

	let body					= JSON.stringify({
		model:				MODEL,
		max_tokens:			16000,
		system:				system_prompt,
		messages:			[
			{ role: 'user', content: '大学: ' + uni_name + '\n学院: ' + dept_name + '\n\nPDF 文本:\n\n' + text.substring(0, 50000) },
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
		log_line('    JSON parse err: ' + e.message);
		return [];
	}
}


async function write_d1(university_code, programs) {
	let response				= await fetch(D1_INGEST_URL, {
		method:				'POST',
		headers:			{ 'Content-Type': 'application/json' },
		body:				JSON.stringify({ university_code: university_code, programs: programs })
	});

	return await response.json();
}


async function process_one_dept(target, dept) {
	log_line('  📂 ' + dept.dept);

	let safe_name				= dept.dept.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '_').substring(0, 30);
	let pdf_path				= path.join(PDF_DIR, target.code + '_' + safe_name + '.pdf');

	let size					= download_pdf(dept.url, pdf_path);

	if (size < 1000) {
		log_line('    ❌ 下载失败 size=' + size);
		return [];
	}

	let text					= extract_text_from_pdf(pdf_path);

	log_line('    PDF=' + Math.round(size / 1024) + 'KB text=' + text.length);

	if (text.length < 100) return [];

	let programs				= await parse_with_claude(target.name, dept.dept, text);

	log_line('    解析 ' + programs.length + ' 专业');

	return programs;
}


async function process_one_school(browser, target) {
	log_line('');
	log_line('🎓 ' + target.name + ' (' + target.code + ')');

	let depts					= await extract_pdf_links(browser, target);

	log_line('  发现 ' + depts.length + ' 个学院 PDF');

	if (depts.length === 0) return 0;

	let all_programs			= [];

	for (let i = 0; i < depts.length; i++) {
		log_line('  [' + (i + 1) + '/' + depts.length + ']');
		let programs			= await process_one_dept(target, depts[i]);
		for (let p of programs) all_programs.push(p);
		await new Promise(function (r) { setTimeout(r, 1500); });
	}

	log_line('  📊 合计 ' + all_programs.length + ' 专业');

	/* 分块写 D1 */
	let BATCH					= 50;
	let total					= 0;

	for (let i = 0; i < all_programs.length; i += BATCH) {
		let chunk				= all_programs.slice(i, i + BATCH);
		let result				= await write_d1(target.code, chunk);
		if (result.success) total = total + (result.count || 0);
	}

	log_line('  ✅ D1 入库 ' + total);
	return total;
}


async function main() {
	log_line('🚀 Me Offer · PDF 爬虫启动');

	if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

	let browser					= await puppeteer.launch({
		headless:				'new',
		args:					['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--disable-gpu']
	});

	let grand					= 0;
	for (let t of TARGETS) {
		grand					= grand + await process_one_school(browser, t);
	}

	await browser.close();
	log_line('');
	log_line('🏁 共 ' + grand + ' 专业入库');
}


main();
