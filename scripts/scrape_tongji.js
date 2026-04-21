/* ============================================
   同济大学专用爬虫
   1. POST /zsml/getTreeData 拿所有学院及专业 tree
   2. 遍历每个学院的 /zsml/sszsml/zsmlZy/2026/{code}
   3. 每个专业的 /zsml/sszsml/zsmlFx/2026/{专业code}?yxCode={院系code}
   ============================================ */

const puppeteer					= require('/root/meuni-apply-bot/node_modules/puppeteer');
const fs						= require('fs');
const os						= require('os');

const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const LOG_PATH					= os.homedir() + '/programme_scrapes/tongji_' + new Date().toISOString().substring(0, 10) + '.log';


function log(m) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + m;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


async function write_d1(code, programs) {
	try {
		let r					= await fetch(D1_INGEST_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ university_code: code, programs: programs }) });
		return await r.json();
	}
	catch (e) { return { success: false }; }
}


async function main() {
	log('🚀 同济专用爬虫');

	let browser					= await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--disable-gpu'] });
	let page					= await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 Chrome/120');

	/* 先访问主页建立 session */
	await page.goto('https://yzbm.tongji.edu.cn/zsml/sszsml/index/2026', { waitUntil: 'networkidle2', timeout: 30000 });
	await new Promise(function (r) { setTimeout(r, 3000); });

	/* 拿 tree（需要等 Puppeteer 内的 XHR）*/
	let tree					= null;
	page.on('response', async function (res) {
		if (res.url().includes('getTreeData')) {
			try {
				let txt			= await res.text();
				tree			= JSON.parse(txt);
			}
			catch (e) { }
		}
	});

	/* reload to trigger */
	await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
	await new Promise(function (r) { setTimeout(r, 5000); });

	if (!tree) {
		log('  ❌ 未拿到 tree');
		await browser.close();
		return;
	}

	log('学院数: ' + tree.length);

	let all_programs			= [];

	for (let i = 0; i < tree.length; i++) {
		let dept				= tree[i];
		let dept_name			= dept.name;
		log('[' + (i + 1) + '/' + tree.length + '] ' + dept_name);

		/* 访问学院页拿学院备注等 */
		try {
			await page.goto('https://yzbm.tongji.edu.cn/zsml/sszsml/zsmlZy/2026/' + dept.id, { waitUntil: 'networkidle2', timeout: 25000 });
			await new Promise(function (r) { setTimeout(r, 2000); });

			let dept_text		= await page.evaluate(function () { return document.body.innerText; });

			/* 每个专业子节点 */
			if (dept.children && dept.children.length > 0) {
				for (let zy of dept.children) {
					/* zy.id 是专业代码如 081300 */
					let zy_name	= zy.name;
					let code_match = zy_name.match(/^(\d{6})/);
					let prog_code = code_match ? code_match[1] : zy.id;
					let prog_name = zy_name.replace(/^\d{6}/, '').trim();

					/* 判断专硕学硕 */
					let prog_type = (prog_code.length === 6 && prog_code[2] === '5') ? '专业型' : '学术型';

					all_programs.push({
						college_name:	dept_name,
						program_code:	prog_code,
						program_name:	prog_name,
						program_type:	prog_type,
						research_direction:	'',
						plan_count:		null,
						exam_subjects:	'',
						study_mode:		'全日制',
						notes:			dept_text.includes('招生计划') ? dept_text.match(/招生计划\s*(\d+)/) ? '院系总 ' + dept_text.match(/招生计划\s*(\d+)/)[1] : '' : ''
					});
				}

				log('  ' + dept.children.length + ' 专业');
			}
		}
		catch (e) {
			log('  err: ' + e.message.substring(0, 80));
		}

		await new Promise(function (r) { setTimeout(r, 600); });
	}

	await browser.close();

	log('');
	log('📊 共 ' + all_programs.length);

	if (all_programs.length === 0) return;

	let BATCH					= 50;
	let total					= 0;
	for (let i = 0; i < all_programs.length; i += BATCH) {
		let r					= await write_d1('4131010247', all_programs.slice(i, i + BATCH));
		if (r.success) total += (r.count || 0);
	}

	log('✅ D1 入库 ' + total);
}


main();
