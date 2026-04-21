/* ============================================
   Me Offer 考研爬虫 v5 · 直接 PDF 链接模式
   给定学校 code 和直接的 PDF URL，跳过发现逻辑
   ============================================ */

const fs						= require('fs');
const path						= require('path');
const os						= require('os');
const { execFileSync }			= require('child_process');

const CLAUDE_URL				= 'https://api.europemart.com/api/claude/proxy';
const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const MODEL						= 'claude-haiku-4-5-20251001';
const PDF_DIR					= '/tmp/grad_pdfs';
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_v5_' + new Date().toISOString().substring(0, 10) + '.log';


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
	let system_prompt			= '你是中国高校硕士招生目录解析专家。从 PDF/HTML 文本中提取所有硕士招生专业。\n' +
		'返回 JSON 数组:\n' +
		'[{"college_name":"学院","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n' +
		'规则:\n- 只硕士不博士\n- 专业代码 6 位\n- 第 3 位 5 = 专业型\n- 无数据返回 []\n- 纯 JSON';

	let body					= JSON.stringify({
		model:				MODEL,
		max_tokens:			16000,
		system:				system_prompt,
		messages:			[
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
	catch (e) {
		log_line('      err: ' + e.message.substring(0, 80));
		return [];
	}
}


async function parse_all(uni_name, text) {
	let all						= [];
	let chunks					= [];
	for (let i = 0; i < text.length; i += 20000) {
		chunks.push(text.substring(i, i + 20000));
	}

	log_line('  分 ' + chunks.length + ' 块');

	for (let i = 0; i < chunks.length; i++) {
		let r					= await claude_parse_chunk(uni_name, '第 ' + (i + 1) + '/' + chunks.length + ' 块', chunks[i]);
		log_line('    块 ' + (i + 1) + ': ' + r.length + ' 专业');
		for (let p of r) all.push(p);
		await new Promise(function (r) { setTimeout(r, 800); });
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


async function process_one(target) {
	log_line('');
	log_line('🎓 ' + target.name + ' (' + target.code + ')');
	log_line('  PDF: ' + target.pdf_url);

	let pdf_path				= path.join(PDF_DIR, target.code + '_direct.pdf');
	let size					= download(target.pdf_url, pdf_path);

	if (size < 5000) {
		log_line('  ❌ 下载失败 size=' + size);
		return 0;
	}

	log_line('  ' + Math.round(size / 1024) + 'KB');

	let text					= pdf_to_text(pdf_path);
	log_line('  文本: ' + text.length);

	if (text.length < 500) {
		log_line('  ❌ 文本太短');
		return 0;
	}

	let programs				= await parse_all(target.name, text);

	log_line('  📊 共 ' + programs.length + ' 专业');

	if (programs.length === 0) return 0;

	let BATCH					= 50;
	let total					= 0;

	for (let i = 0; i < programs.length; i += BATCH) {
		let chunk				= programs.slice(i, i + BATCH);
		let r					= await write_d1(target.code, chunk);
		if (r.success) total += (r.count || 0);
	}

	log_line('  ✅ D1 入库 ' + total);
	return total;
}


async function main() {
	log_line('🚀 Me Offer 考研爬虫 v5 · 直接 PDF 模式');

	if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

	/* 从 JSON 文件读取直接 URL 列表 */
	let targets					= JSON.parse(fs.readFileSync('/root/meuni-apply-bot/direct_pdf_urls.json', 'utf8'));

	let args					= process.argv.slice(2);
	if (args.length > 0) {
		targets					= targets.filter(function (t) { return args.indexOf(t.code) !== -1 || args.indexOf(t.name) !== -1; });
	}

	log_line('目标: ' + targets.length + ' 所');

	let grand					= 0;
	let success					= 0;
	let result_list				= [];

	for (let t of targets) {
		let n					= await process_one(t);
		grand					= grand + n;
		if (n > 0) success++;
		result_list.push({ name: t.name, count: n });
	}

	log_line('');
	log_line('📊 详细结果:');
	result_list.forEach(function (r) {
		log_line('  ' + (r.count > 0 ? '✅' : '❌') + ' ' + r.name + ': ' + r.count);
	});

	log_line('');
	log_line('🏁 完成: ' + success + '/' + targets.length + ' 成功, 共 ' + grand + ' 专业入库');
}


main();
