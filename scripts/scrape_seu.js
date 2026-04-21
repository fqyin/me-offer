/* ============================================
   东南大学专用爬虫 v2
   解析 data.js 的 mainData 结构:
   - entries (37 个学院) → exportZsmlYxZys (学院的专业) → exportZsmlYxZyYjfxs (研究方向)
   ============================================ */

const fs						= require('fs');
const os						= require('os');
const { execFileSync }			= require('child_process');

const D1_INGEST_URL				= 'https://me-offer.pages.dev/api/grad/programs/batch';
const LOG_PATH					= os.homedir() + '/programme_scrapes/seu_' + new Date().toISOString().substring(0, 10) + '.log';


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
	log('🚀 东南专用爬虫 v2');

	execFileSync('curl', ['-sL', '-A', 'Mozilla/5.0 Chrome/120', 'https://gsas.seu.edu.cn/ssmlcx2026/pages/js/data.js', '-o', '/tmp/seu_data.js']);

	let js							= fs.readFileSync('/tmp/seu_data.js', 'utf8');

	let main_match					= js.match(/var mainData\s*=\s*(\{[\s\S]*?\});\s*var/);
	if (!main_match) { log('❌ mainData 未找到'); return; }

	let main_data					= JSON.parse(main_match[1]);

	let all_programs				= [];

	for (let key in main_data) {
		let college_entries			= main_data[key];
		if (!Array.isArray(college_entries)) continue;

		for (let college of college_entries) {
			let yxmc				= college.yxmc || '';
			let yxsh				= college.yxsh || '';
			let tel					= college.tel || '';

			/* 合并考试科目 */
			let all_kms				= (college.exportZsmlKms || []).reduce(function (acc, k) {
				acc[k.zydm + '_' + k.dydm]	= (k.kmdm || '') + ' ' + (k.kmmc || '');
				return acc;
			}, {});

			let zys					= college.exportZsmlYxZys || [];

			for (let zy of zys) {
				let yjfxs			= zy.exportZsmlYxZyYjfxs || [];

				for (let yjfx of yjfxs) {
					let program_code	= yjfx.zydm || '';
					let program_type	= (program_code.length === 6 && program_code[2] === '5') ? '专业型' : '学术型';
					let study_mode		= yjfx.xxfs === '1' ? '全日制' : '非全日制';

					all_programs.push({
						college_name:		yxmc,
						program_code:		program_code,
						program_name:		zy.zymc || zy.ydmz || '',
						program_type:		program_type,
						research_direction:	yjfx.fxm + ' ' + yjfx.fxmc,
						plan_count:			yjfx.nzzrs ? parseInt(yjfx.nzzrs) : null,
						recommend_count:	yjfx.qrznzrs ? parseInt(yjfx.qrznzrs) : null,
						exam_subjects:		'',
						study_mode:			study_mode,
						notes:				''
					});
				}
			}
		}
	}

	log('📊 共 ' + all_programs.length);

	if (all_programs.length === 0) return;

	let BATCH					= 50;
	let total					= 0;
	for (let i = 0; i < all_programs.length; i += BATCH) {
		let r					= await write_d1('4132010286', all_programs.slice(i, i + BATCH));
		if (r.success) total += (r.count || 0);
	}

	log('✅ D1 入库 ' + total);
}


main();
