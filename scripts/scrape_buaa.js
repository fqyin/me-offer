/* ============================================
   北航专用爬虫
   带 session 下载专业目录 PDF
   ============================================ */

const puppeteer					= require('/root/meuni-apply-bot/node_modules/puppeteer');
const fs						= require('fs');
const os						= require('os');
const { execFileSync }			= require('child_process');

const CLAUDE_URL				= 'https://api.europemart.com/api/claude/proxy';
const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const MODEL						= 'claude-sonnet-4-5-20250929';
const PDF_DIR					= '/tmp/grad_pdfs';
const LOG_PATH					= os.homedir() + '/programme_scrapes/buaa_' + new Date().toISOString().substring(0, 10) + '.log';


function log(m) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + m;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


function pdf_to_text(p) {
	try { return execFileSync('pdftotext', ['-layout', p, '-'], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }); }
	catch (e) { return ''; }
}


async function claude_parse(uni, ctx, text) {
	let sp						= '你是中国高校硕士招生目录解析专家。从 PDF 文本中**逐行提取所有 6 位专业代码开头的行**，每行一条专业。不要省略任何一条！返回 JSON 数组:\n[{"college_name":"单位代码","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","study_years":数字,"tuition":数字,"study_mode":"全日制|非全日制"}]\n规则: 只要专业代码行都保留, 专业代码 6 位, 第 3 位 5=专业型, 纯 JSON 无 markdown';
	let body					= JSON.stringify({
		model: MODEL, max_tokens: 16000, system: sp,
		messages: [
			{ role: 'user', content: '大学: ' + uni + '\n上下文: ' + ctx + '\n\n' + text.substring(0, 30000) },
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


async function parse_all(uni, text) {
	let all						= [];

	/* 按字符数分块，每 6000 字一批（约 40-50 条专业） */
	let CHUNK				= 6000;
	let chunks					= [];
	for (let i = 0; i < text.length; i += CHUNK) chunks.push(text.substring(i, i + CHUNK));

	log('  分 ' + chunks.length + ' 块 (' + CHUNK + ' 字/块)');
	for (let i = 0; i < chunks.length; i++) {
		let r					= await claude_parse(uni, '第 ' + (i + 1) + '块', chunks[i]);
		log('    块 ' + (i + 1) + ': ' + r.length);
		for (let p of r) all.push(p);
		await new Promise(function (r) { setTimeout(r, 500); });
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


async function main() {
	log('🚀 北航专用爬虫');

	if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

	let browser					= await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
	let page					= await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 Chrome/120');
	await page.goto('https://yzb.buaa.edu.cn/info/1036/3421.htm', { waitUntil: 'networkidle2', timeout: 30000 });
	await new Promise(function (r) { setTimeout(r, 3000); });

	/* 关键 PDF: 招收2026年学历硕士研究生专业、单位、学制、学习方式及学费标准.pdf */
	let url						= 'https://yzb.buaa.edu.cn/system/_content/download.jsp?urltype=news.DownloadAttachUrl&owner=1403782683&wbfileid=51B6113778ADB8086AC5B08132B78E2C';

	log('下载 PDF...');
	let b64						= await page.evaluate(async function (u) {
		let r					= await fetch(u, { credentials: 'include' });
		let buf					= await r.arrayBuffer();
		let bytes				= new Uint8Array(buf);
		let bin					= '';
		for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
		return { size: buf.byteLength, b64: btoa(bin) };
	}, url);

	log('PDF size: ' + b64.size);

	if (b64.size < 5000) {
		log('❌ 下载失败');
		await browser.close();
		return;
	}

	let pdf_path				= PDF_DIR + '/buaa_main.pdf';
	fs.writeFileSync(pdf_path, Buffer.from(b64.b64, 'base64'));

	let text					= pdf_to_text(pdf_path);
	log('文本: ' + text.length);

	await browser.close();

	if (text.length < 500) {
		log('❌ 文本太短');
		return;
	}

	let programs				= await parse_all('北京航空航天大学', 'full', text);
	log('📊 ' + programs.length);

	if (programs.length === 0) return;

	let BATCH					= 50;
	let total					= 0;
	for (let i = 0; i < programs.length; i += BATCH) {
		let r					= await write_d1('4111010006', programs.slice(i, i + BATCH));
		if (r.success) total += (r.count || 0);
	}
	log('✅ D1 入库 ' + total);
}


main();
