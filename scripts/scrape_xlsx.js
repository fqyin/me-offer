/* ============================================
   Me Offer 考研爬虫 · xlsx 模式
   ============================================ */

const fs						= require('fs');
const os						= require('os');
const { execFileSync }			= require('child_process');

const CLAUDE_URL				= 'https://api.europemart.com/api/claude/proxy';
const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const MODEL						= 'claude-haiku-4-5-20251001';
const WORK_DIR					= '/tmp/grad_pdfs';
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_xlsx_' + new Date().toISOString().substring(0, 10) + '.log';


function log(m) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + m;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


function download(url, path) {
	try {
		execFileSync('curl', ['-skL', '-A', 'Mozilla/5.0 Chrome/120', '--max-time', '120', url, '-o', path], { timeout: 130000 });
		return fs.statSync(path).size;
	}
	catch (e) { return 0; }
}


function xlsx_to_text(xlsx_path) {
	let script					= 'import openpyxl, sys\n' +
		'wb = openpyxl.load_workbook("' + xlsx_path + '", read_only=True)\n' +
		'out = []\n' +
		'for sn in wb.sheetnames:\n' +
		'    ws = wb[sn]\n' +
		'    out.append("=== SHEET: " + sn + " ===")\n' +
		'    for r in ws.iter_rows(values_only=True):\n' +
		'        clean = [str(v) if v is not None else "" for v in r]\n' +
		'        line = "\\t".join(clean).strip()\n' +
		'        if line:\n' +
		'            out.append(line)\n' +
		'print("\\n".join(out))';

	try {
		return execFileSync('python3', ['-c', script], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
	}
	catch (e) { return ''; }
}


async function claude_parse(uni, ctx, text) {
	let sp						= '你是中国高校硕士招生目录解析专家。从表格文本中提取所有硕士专业。\n返回 JSON 数组:\n[{"college_name":"学院","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n规则: 只硕士不博士, 专业代码 6 位, 第 3 位 5=专业型, 无数据返回 [], 纯 JSON';

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
	catch (e) {
		log('  err: ' + e.message.substring(0, 80));
		return [];
	}
}


async function parse_all(uni, text) {
	let all						= [];
	let chunks					= [];
	for (let i = 0; i < text.length; i += 20000) chunks.push(text.substring(i, i + 20000));
	log('  分 ' + chunks.length + ' 块');
	for (let i = 0; i < chunks.length; i++) {
		let r					= await claude_parse(uni, '第 ' + (i + 1), chunks[i]);
		log('    块 ' + (i + 1) + ': ' + r.length);
		for (let p of r) all.push(p);
		await new Promise(function (r) { setTimeout(r, 800); });
	}
	return all;
}


async function write_d1(code, progs) {
	try {
		let r					= await fetch(D1_INGEST_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ university_code: code, programs: progs }) });
		return await r.json();
	}
	catch (e) { return { success: false }; }
}


async function process_one(target) {
	log('');
	log('🎓 ' + target.name + ' (' + target.code + ')');
	log('  XLSX: ' + target.xlsx_url);

	let xlsx_path				= WORK_DIR + '/' + target.code + '_x.xlsx';
	let size					= download(target.xlsx_url, xlsx_path);

	if (size < 1000) {
		log('  ❌ 下载失败 ' + size);
		return 0;
	}

	log('  ' + Math.round(size / 1024) + 'KB');
	let text					= xlsx_to_text(xlsx_path);
	log('  文本: ' + text.length);

	if (text.length < 500) return 0;

	let programs				= await parse_all(target.name, text);
	log('  📊 ' + programs.length);

	if (programs.length === 0) return 0;

	let BATCH					= 50;
	let total					= 0;
	for (let i = 0; i < programs.length; i += BATCH) {
		let r					= await write_d1(target.code, programs.slice(i, i + BATCH));
		if (r.success) total += (r.count || 0);
	}

	log('  ✅ D1: ' + total);
	return total;
}


async function main() {
	log('🚀 Me Offer xlsx 爬虫');

	let targets					= JSON.parse(fs.readFileSync('/root/meuni-apply-bot/xlsx_urls.json', 'utf8'));
	let args					= process.argv.slice(2);
	if (args.length > 0) targets = targets.filter(function (t) { return args.indexOf(t.code) !== -1; });

	log('目标: ' + targets.length);

	let grand					= 0;
	let list					= [];

	for (let t of targets) {
		let n					= await process_one(t);
		grand					= grand + n;
		list.push({ name: t.name, count: n });
	}

	log('');
	list.forEach(function (r) { log('  ' + (r.count > 0 ? '✅' : '❌') + ' ' + r.name + ': ' + r.count); });
	log('🏁 ' + grand);
}


main();
