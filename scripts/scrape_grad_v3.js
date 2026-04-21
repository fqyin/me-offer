/* ============================================
   Me Offer 考研爬虫 v3
   增强：支持"单 PDF 型学校"（如中山大学）
   自动发现 index URL 下的主专业目录 PDF
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
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_v3_' + new Date().toISOString().substring(0, 10) + '.log';
const CHUNK_SIZE				= 30000;	// 单次给 Claude 的字符上限


function log_line(msg) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + msg;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


function download(url, save_path) {
	try {
		execFileSync('curl', ['-sL', '-A', 'Mozilla/5.0 Chrome/120', '--max-time', '120', url, '-o', save_path], { timeout: 130000 });
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


async function claude_parse(uni_name, context, text) {
	let system_prompt			= '你是中国高校硕士招生目录解析专家。从提供的 PDF/HTML 文本中提取所有硕士招生专业。\n\n' +
		'返回 JSON 数组:\n' +
		'[{"college_name":"学院","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n\n' +
		'规则:\n- 只硕士不博士\n- 专业代码 6 位\n- 第 3 位 5 = 专业型\n- 无数据返回 []\n- 纯 JSON 无 markdown';

	let body					= JSON.stringify({
		model:				MODEL,
		max_tokens:			16000,
		system:				system_prompt,
		messages:			[
			{ role: 'user', content: '大学: ' + uni_name + '\n上下文: ' + context + '\n\n' + text.substring(0, CHUNK_SIZE) },
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
		log_line('    Claude err: ' + e.message.substring(0, 80));
		return [];
	}
}


async function claude_parse_chunks(uni_name, text) {
	/* 把大文本分块传给 Claude，每块独立解析 */
	let all						= [];
	let chunks					= [];

	/* 按 20K 字符分块（留 10K 空间给 prompt） */
	for (let i = 0; i < text.length; i += 20000) {
		chunks.push(text.substring(i, i + 20000));
	}

	log_line('    分 ' + chunks.length + ' 块解析');

	for (let i = 0; i < chunks.length; i++) {
		let r					= await claude_parse(uni_name, '第 ' + (i + 1) + '/' + chunks.length + ' 块', chunks[i]);
		log_line('      块 ' + (i + 1) + ': ' + r.length + ' 专业');
		for (let p of r) all.push(p);
		await new Promise(function (r) { setTimeout(r, 1000); });
	}

	return all;
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


async function process_school(browser, target) {
	log_line('');
	log_line('🎓 ' + target.name + ' (' + target.code + ')');
	log_line('  URL: ' + target.index_url);

	let page					= await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 Chrome/120');
	await page.setViewport({ width: 1280, height: 900 });

	try {
		await page.goto(target.index_url, { waitUntil: 'domcontentloaded', timeout: 30000 });
		await new Promise(function (r) { setTimeout(r, 3000); });

		/* 提取所有 PDF 链接，评分排序，优先"专业目录"关键字 */
		let pdfs				= await page.evaluate(function () {
			return Array.from(document.querySelectorAll('a[href]'))
				.filter(function (a) { return /\.pdf($|\?)/i.test(a.href); })
				.map(function (a) {
					let text	= (a.textContent || '').trim().substring(0, 60);
					let score	= 0;
					if (/专业目录|招生专业|硕士.*目录|硕士.*专业/.test(text)) score += 100;
					if (/硕士/.test(text)) score += 30;
					if (/2026/.test(text)) score += 20;
					if (/博士|推免|简章|通讯录|非全|报名|考试/.test(text)) score -= 50;
					return { text: text, url: a.href, score: score };
				})
				.sort(function (a, b) { return b.score - a.score; });
		});

		log_line('  发现 ' + pdfs.length + ' 个 PDF，top 3：');
		pdfs.slice(0, 3).forEach(function (p) {
			log_line('    [' + p.score + '] ' + p.text);
		});

		/* 选最高分的 + 如果分数 < 20 则跳过 */
		if (pdfs.length === 0 || pdfs[0].score < 20) {
			log_line('  ❌ 未发现合适 PDF');
			return 0;
		}

		let top_pdf				= pdfs[0];
		let safe_name			= target.code + '_main.pdf';
		let pdf_path			= path.join(PDF_DIR, safe_name);

		let size				= download(top_pdf.url, pdf_path);

		if (size < 5000) {
			log_line('  ❌ PDF 下载失败 size=' + size);
			return 0;
		}

		log_line('  PDF: ' + Math.round(size / 1024) + 'KB');

		let text				= pdf_to_text(pdf_path);

		log_line('  文本: ' + text.length + ' 字');

		if (text.length < 500) {
			log_line('  ❌ 文本太短');
			return 0;
		}

		/* 大 PDF 分块解析 */
		let programs;
		if (text.length > CHUNK_SIZE) {
			programs			= await claude_parse_chunks(target.name, text);
		} else {
			programs			= await claude_parse(target.name, top_pdf.text, text);
		}

		log_line('  📊 共 ' + programs.length + ' 专业');

		if (programs.length === 0) return 0;

		/* 分批写 D1 */
		let BATCH				= 50;
		let total				= 0;

		for (let i = 0; i < programs.length; i += BATCH) {
			let chunk			= programs.slice(i, i + BATCH);
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
		await page.close();
	}
}


async function main() {
	log_line('🚀 Me Offer 考研爬虫 v3（单 PDF 型）');

	let args					= process.argv.slice(2);
	let urls					= JSON.parse(fs.readFileSync('/root/meuni-apply-bot/urls_34auto_line.json', 'utf8'));

	let targets;
	if (args.length > 0) {
		targets					= urls.filter(function (u) { return args.indexOf(u.code) !== -1 || args.indexOf(u.name) !== -1; });
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
	let success					= 0;

	for (let t of targets) {
		let n					= await process_school(browser, t);
		grand					= grand + n;
		if (n > 0) success++;
	}

	await browser.close();

	log_line('');
	log_line('🏁 完成: ' + success + '/' + targets.length + ' 成功, 共 ' + grand + ' 专业入库');
}


main();
