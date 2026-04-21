/* ============================================
   武大专用爬虫
   每个学院页有 iframe 嵌入 PDF
   解析 iframe src 的 file 参数获取 PDF URL
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
const LOG_PATH					= os.homedir() + '/programme_scrapes/whu_' + new Date().toISOString().substring(0, 10) + '.log';


function log(m) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + m;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


function download(url, p) {
	try {
		execFileSync('curl', ['-skL', '-A', 'Mozilla/5.0 Chrome/120', '--max-time', '60', url, '-o', p], { timeout: 70000 });
		return fs.statSync(p).size;
	}
	catch (e) { return 0; }
}


function pdf_to_text(p) {
	try { return execFileSync('pdftotext', ['-layout', p, '-'], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }); }
	catch (e) { return ''; }
}


async function claude_parse(uni, ctx, text) {
	let sp						= '你是中国高校硕士招生目录解析专家。返回 JSON 数组:\n[{"college_name":"学院","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n只硕士不博士, 专业代码 6 位, 第 3 位 5=专业型, 无数据 [], 纯 JSON';

	let body					= JSON.stringify({
		model: MODEL, max_tokens: 16000, system: sp,
		messages: [
			{ role: 'user', content: '大学: ' + uni + '\n学院: ' + ctx + '\n\n' + text.substring(0, 30000) },
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


async function write_d1(code, programs) {
	try {
		let r					= await fetch(D1_INGEST_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ university_code: code, programs: programs }) });
		return await r.json();
	}
	catch (e) { return { success: false }; }
}


async function main() {
	log('🚀 武大专用爬虫');

	if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

	let browser					= await puppeteer.launch({
		headless: 'new',
		args: ['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--disable-gpu', '--ignore-certificate-errors']
	});

	let page					= await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 Chrome/120');

	await page.goto('https://gs.whu.edu.cn/zsgz/sszs/a2026n.htm', { waitUntil: 'networkidle2', timeout: 30000 });
	await new Promise(function (r) { setTimeout(r, 3000); });

	let colleges				= await page.evaluate(function () {
		return Array.from(document.querySelectorAll('a[href]'))
			.filter(function (a) { return /\d{3}.*(学院|学部|系|研究院).*2026/.test(a.textContent); })
			.map(function (a) { return { t: (a.textContent || '').trim().substring(0, 40), h: a.href }; });
	});

	log('发现学院: ' + colleges.length);

	let all_programs			= [];

	for (let i = 0; i < colleges.length; i++) {
		let c					= colleges[i];
		let name				= c.t.replace(/\s+/g, '').substring(0, 30);
		log('[' + (i + 1) + '/' + colleges.length + '] ' + name);

		try {
			await page.goto(c.h, { waitUntil: 'networkidle2', timeout: 25000 });
			await new Promise(function (r) { setTimeout(r, 3000); });

			let iframe_src		= await page.evaluate(function () {
				let ifr			= document.querySelector('iframe');
				return ifr ? ifr.src : null;
			});

			if (!iframe_src) {
				log('  无 iframe');
				continue;
			}

			/* 解析 file 参数 */
			let match			= iframe_src.match(/file=([^&]+)/);
			if (!match) {
				log('  无 file 参数');
				continue;
			}

			let pdf_rel			= decodeURIComponent(match[1]);
			let pdf_url			= pdf_rel.startsWith('http') ? pdf_rel : 'https://gs.whu.edu.cn' + pdf_rel;

			let pdf_path		= path.join(PDF_DIR, 'whu_' + i + '.pdf');
			let size			= download(pdf_url, pdf_path);

			if (size < 1000) {
				log('  下载失败');
				continue;
			}

			let text			= pdf_to_text(pdf_path);

			if (text.length < 200) {
				log('  文本太短');
				continue;
			}

			log('  PDF ' + Math.round(size / 1024) + 'KB text=' + text.length);

			let programs		= await claude_parse('武汉大学', name, text);
			log('  解析 ' + programs.length);

			for (let p of programs) all_programs.push(p);
		}
		catch (e) {
			log('  err: ' + e.message.substring(0, 80));
		}

		await new Promise(function (r) { setTimeout(r, 1000); });
	}

	await browser.close();

	log('');
	log('📊 共 ' + all_programs.length);

	if (all_programs.length === 0) return;

	let BATCH					= 50;
	let total					= 0;
	for (let i = 0; i < all_programs.length; i += BATCH) {
		let r					= await write_d1('4142010486', all_programs.slice(i, i + BATCH));
		if (r.success) total += (r.count || 0);
	}

	log('✅ D1 入库 ' + total);
}


main();
