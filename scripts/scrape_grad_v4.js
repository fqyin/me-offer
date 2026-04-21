/* ============================================
   Me Offer 考研爬虫 v4
   增强 v3：递归深度爬取
   - 首页无 PDF → 跟进"招生/目录/硕士"相关链接（最多 2 层）
   - 在子页继续找 PDF
   - Claude 辅助判断"哪个链接是专业目录页"
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
const LOG_PATH					= os.homedir() + '/programme_scrapes/grad_v4_' + new Date().toISOString().substring(0, 10) + '.log';


function log_line(msg) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + msg;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


function download(url, save_path) {
	try {
		execFileSync('curl', ['-skL', '-A', 'Mozilla/5.0 Chrome/120', '--max-time', '120', url, '-o', save_path], { timeout: 130000 });
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
	let system_prompt			= '你是中国高校硕士招生目录解析专家。从提供的 PDF/HTML 文本中提取所有硕士招生专业。\n' +
		'返回 JSON 数组:\n' +
		'[{"college_name":"学院","program_code":"6位代码","program_name":"专业名","program_type":"学术型|专业型","research_direction":"研究方向","plan_count":数字,"recommend_count":数字,"exam_subjects":"考试科目","study_mode":"全日制|非全日制","notes":"备注"}]\n' +
		'规则:\n- 只硕士不博士\n- 专业代码 6 位\n- 第 3 位 5 = 专业型\n- 无数据返回 []\n- 纯 JSON 无 markdown';

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
		log_line('      Claude err: ' + e.message.substring(0, 80));
		return [];
	}
}


async function claude_parse_all(uni_name, text) {
	let all						= [];
	let chunks					= [];
	for (let i = 0; i < text.length; i += 20000) {
		chunks.push(text.substring(i, i + 20000));
	}

	log_line('    分 ' + chunks.length + ' 块解析');

	for (let i = 0; i < chunks.length; i++) {
		let r					= await claude_parse_chunk(uni_name, '第 ' + (i + 1) + '/' + chunks.length + ' 块', chunks[i]);
		log_line('      块 ' + (i + 1) + ': ' + r.length + ' 专业');
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


async function extract_pdfs_on_page(page) {
	return await page.evaluate(function () {
		return Array.from(document.querySelectorAll('a[href]'))
			.filter(function (a) { return /\.pdf($|\?)/i.test(a.href); })
			.map(function (a) {
				let text		= (a.textContent || '').trim().substring(0, 80);
				let score		= 0;
				if (/招生.*专业.*目录|专业目录|招生学科.*目录|硕士.*招生.*目录|硕士.*专业.*目录/.test(text)) score += 150;
				if (/招生目录|学科目录/.test(text)) score += 80;
				if (/硕士/.test(text)) score += 30;
				if (/2026|2025/.test(text)) score += 20;
				if (/博士|推免.*办法|简章|通讯录|非全日制|网报|报名|考试公告|复试/.test(text)) score -= 80;
				return { text: text, url: a.href, score: score };
			})
			.sort(function (a, b) { return b.score - a.score; });
	});
}


async function extract_navigation_links(page, keywords) {
	/* 找导航链接含"招生/目录/硕士"的 */
	return await page.evaluate(function (kws) {
		return Array.from(document.querySelectorAll('a[href]'))
			.filter(function (a) {
				let text		= (a.textContent || '').trim();
				let href		= a.href || '';
				if (!text || text.length > 30 || text.length < 2) return false;
				if (href.indexOf('javascript:') === 0) return false;
				if (href.indexOf('#') === 0) return false;
				/* 避免外链 */
				try { if (new URL(href).hostname !== location.hostname) return false; } catch (e) { return false; }
				/* 必须含关键字 */
				let has_kw		= false;
				for (let kw of kws) {
					if (text.indexOf(kw) !== -1) { has_kw = true; break; }
				}
				return has_kw;
			})
			.map(function (a) {
				let text		= (a.textContent || '').trim();
				let score		= 0;
				if (/招生.*专业.*目录|专业目录|硕士.*招生.*目录/.test(text)) score += 100;
				if (/硕士.*招生|招生.*硕士/.test(text)) score += 60;
				if (/专业目录|招生目录/.test(text)) score += 80;
				if (/2026|2025/.test(text)) score += 20;
				if (/简章/.test(text)) score += 10;
				if (/博士|推免|复试|录取/.test(text)) score -= 50;
				return { text: text, url: a.href, score: score };
			})
			.sort(function (a, b) { return b.score - a.score; })
			.slice(0, 10);
	}, keywords);
}


async function goto_safe(page, url) {
	try {
		await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
		await new Promise(function (r) { setTimeout(r, 2500); });
		return true;
	}
	catch (e) {
		log_line('    goto err: ' + e.message.substring(0, 80));
		return false;
	}
}


async function deep_find_pdf(page, target, max_depth) {
	max_depth					= max_depth || 2;
	log_line('  Step 1: 访问首页');

	let ok						= await goto_safe(page, target.index_url);
	if (!ok) return null;

	let pdfs					= await extract_pdfs_on_page(page);

	if (pdfs.length > 0 && pdfs[0].score >= 30) {
		log_line('  Step 1 直接发现: [' + pdfs[0].score + '] ' + pdfs[0].text);
		return pdfs[0];
	}

	/* 首页没 PDF，找"招生/目录"导航链接跟进 */
	log_line('  Step 1 无 PDF，Step 2 找导航');

	let nav_links				= await extract_navigation_links(page, ['招生', '目录', '硕士']);

	if (nav_links.length === 0) {
		log_line('  Step 2 无导航链接');
		return null;
	}

	log_line('  Step 2 候选: ' + nav_links.slice(0, 3).map(function (l) { return '[' + l.score + ']' + l.text; }).join(' | '));

	/* 尝试 top 3 */
	for (let i = 0; i < Math.min(3, nav_links.length); i++) {
		let link				= nav_links[i];
		log_line('  Step 2 进入: ' + link.text);

		let ok2					= await goto_safe(page, link.url);
		if (!ok2) continue;

		let pdfs2				= await extract_pdfs_on_page(page);

		if (pdfs2.length > 0 && pdfs2[0].score >= 30) {
			log_line('  Step 2 发现: [' + pdfs2[0].score + '] ' + pdfs2[0].text);
			return pdfs2[0];
		}

		/* 可能还要深一层 */
		if (max_depth >= 2) {
			let nav_links2		= await extract_navigation_links(page, ['专业目录', '硕士招生', '招生目录', '学科目录']);

			if (nav_links2.length > 0) {
				let link2		= nav_links2[0];
				log_line('  Step 3 进入: ' + link2.text);
				let ok3			= await goto_safe(page, link2.url);
				if (ok3) {
					let pdfs3	= await extract_pdfs_on_page(page);
					if (pdfs3.length > 0 && pdfs3[0].score >= 30) {
						log_line('  Step 3 发现: [' + pdfs3[0].score + '] ' + pdfs3[0].text);
						return pdfs3[0];
					}
				}
			}
		}
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
		let pdf_info			= await deep_find_pdf(page, target, 2);

		if (!pdf_info) {
			log_line('  ❌ 未发现专业目录 PDF');
			return 0;
		}

		let pdf_path			= path.join(PDF_DIR, target.code + '_main.pdf');
		let size				= download(pdf_info.url, pdf_path);

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

		let programs			= await claude_parse_all(target.name, text);

		log_line('  📊 共 ' + programs.length + ' 专业');

		if (programs.length === 0) return 0;

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
		try { await page.close(); } catch (e) { }
	}
}


async function main() {
	log_line('🚀 Me Offer 考研爬虫 v4');

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
