/* ============================================
   浙大专用爬虫 · 官方 dataapi
   GET /dataapi/open/zsss/queryXyList?mllx=0&zsnf=2026 - 拿所有学院
   GET /dataapi/open/zsss/zsml?mllx=0&zsnf=2026&pageSize=300&sysOrgCode={id} - 每学院的专业
   ============================================ */

const fs						= require('fs');
const os						= require('os');

const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const LOG_PATH					= os.homedir() + '/programme_scrapes/zju_' + new Date().toISOString().substring(0, 10) + '.log';


function log(m) {
	let line					= '[' + new Date().toISOString().substring(11, 19) + '] ' + m;
	console.log(line);
	fs.appendFileSync(LOG_PATH, line + '\n');
}


async function fetch_json(url) {
	let r							= await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120', 'Accept': 'application/json' } });
	return await r.json();
}


async function get_colleges() {
	let url							= 'https://yjsy.zju.edu.cn/dataapi/open/zsss/queryXyList?mllx=0&zsnf=2026';
	let data						= await fetch_json(url);
	return data.result || [];
}


async function get_programs(sysOrgCode) {
	let url							= 'https://yjsy.zju.edu.cn/dataapi/open/zsss/zsml?mllx=0&zsnf=2026&pageSize=500&sysOrgCode=' + sysOrgCode;
	let data						= await fetch_json(url);
	return data.result || [];
}


async function write_d1(code, programs) {
	let r							= await fetch(D1_INGEST_URL, {
		method:				'POST',
		headers:			{ 'Content-Type': 'application/json' },
		body:				JSON.stringify({ university_code: code, programs: programs })
	});
	return await r.json();
}


function normalize(record, college_name) {
	/* 浙大 record 字段映射 */
	let yjfx						= record.yjfx || '';			/* 040101教育学原理 */
	let code_match					= yjfx.match(/^(\d{6})/);

	let program_code				= code_match ? code_match[1] : '';
	let program_name				= yjfx.replace(/^\d{6}/, '').trim();

	let study_mode					= record.xxfs === '1' ? '全日制' : (record.xxfs === '2' ? '非全日制' : '');
	let program_type				= (program_code.length === 6 && program_code[2] === '5') ? '专业型' : '学术型';

	/* 考试科目: jskm1+jskm2 */
	let exam_subjects				= '';
	if (record.kskm && Array.isArray(record.kskm)) {
		exam_subjects				= record.kskm.map(function (k) { return k.kmbh + ' ' + (k.kmmc || ''); }).join(' | ');
	}

	return {
		college_name:		college_name,
		program_code:		program_code,
		program_name:		program_name,
		program_type:		program_type,
		research_direction:	record.jtyjfx || record.yjfxXh || '',
		plan_count:			record.zsrs ? parseInt(record.zsrs) : null,
		exam_subjects:		exam_subjects,
		study_mode:			study_mode,
		notes:				record.bz || ''
	};
}


async function main() {
	log('🚀 浙大专用爬虫');

	let colleges					= await get_colleges();
	log('发现学院: ' + colleges.length);

	let all_programs				= [];

	for (let i = 0; i < colleges.length; i++) {
		let c						= colleges[i];
		log('  [' + (i + 1) + '/' + colleges.length + '] ' + c.zsdm + ' ' + c.departName);

		try {
			let records				= await get_programs(c.id);
			log('    ' + records.length + ' 条');

			for (let r of records) {
				let p				= normalize(r, c.departName);
				if (p.program_code) all_programs.push(p);
			}
		}
		catch (e) {
			log('    err: ' + e.message.substring(0, 80));
		}

		await new Promise(function (r) { setTimeout(r, 500); });
	}

	log('');
	log('📊 共 ' + all_programs.length + ' 条专业');

	if (all_programs.length === 0) return;

	/* 批量写 D1 */
	let BATCH						= 50;
	let total						= 0;
	for (let i = 0; i < all_programs.length; i += BATCH) {
		let r						= await write_d1('4133010335', all_programs.slice(i, i + BATCH));
		if (r.success) total += (r.count || 0);
	}

	log('✅ D1 入库 ' + total);
}


main();
