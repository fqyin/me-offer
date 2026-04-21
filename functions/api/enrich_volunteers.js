// Me Offer · 富化 96 志愿数据（掌上高考风格 · 三年横向对比）
// POST /api/enrich_volunteers
// body: { volunteers: [...], user_rank, user_score }
// Returns: 每条志愿带 history: { "2025": plan, "2024": {...}, "2023": {...} }
//         以及 "比我位次 / 比我分数 / 等效分" 三个派生字段

export async function onRequestPost(context) {
	const request							= context.request;
	const env								= context.env;

	let body;
	try {
		body								= await request.json();
	} catch (e) {
		return json_response({error: 'invalid json'}, 400);
	}

	const vols								= body.volunteers || [];
	const user_rank							= parseInt(body.user_rank) || 0;
	const user_score						= parseInt(body.user_score) || 0;

	if (vols.length === 0) {
		return json_response({error: 'no volunteers'}, 400);
	}

	// 1. 批量查院校真实 5 位代码（从 university_mapping）
	const school_names						= Array.from(new Set(vols.map(v => v.school_name)));
	const school_codes_map					= new Map();

	if (school_names.length > 0) {
		// SQLite IN 查询
		const placeholders					= school_names.map(() => '?').join(',');
		const school_query					= env.DB.prepare(
			`SELECT u.name, u.code FROM universities u WHERE u.name IN (${placeholders})`
		);
		const school_rows					= await school_query.bind(...school_names).all();
		for (const row of school_rows.results || []) {
			// 院校代码：教育部标准 5 位代码（从 code 字段取后 5 位或全部）
			let code_5							= '';
			if (row.code) {
				const raw						= String(row.code).trim();
				// 如果是纯数字 10 位，取后 5 位；否则直接使用（兼容山东招生代码如 B413）
				if (/^\d{10}$/.test(raw)) {
					code_5						= raw.slice(-5);
				} else if (/^\d{4,5}$/.test(raw)) {
					code_5						= raw.padStart(5, '0');
				} else {
					code_5						= raw;
				}
			}
			school_codes_map.set(row.name, code_5);
		}
	}

	// 2. 批量查专业信息（从 majors）
	const group_names						= Array.from(new Set(vols.map(v => v.group_name).filter(Boolean)));
	const major_info_map					= new Map();

	if (group_names.length > 0) {
		// 按专业名关键词模糊匹配 majors 表
		for (const gn of group_names) {
			// 找最匹配的专业（去除括号/类型后缀）
			const cleaned					= clean_group_name(gn);
			if (!cleaned) continue;

			const major						= await env.DB.prepare(`
				SELECT code, name, employment_rate, salary_avg, tuition_avg, description, category
				FROM majors
				WHERE name = ?
				LIMIT 1
			`).bind(cleaned).first();

			if (major) {
				major_info_map.set(gn, major);
			} else {
				// 模糊匹配：name LIKE 'xx%'
				const fuzzy					= await env.DB.prepare(`
					SELECT code, name, employment_rate, salary_avg, tuition_avg, description, category
					FROM majors
					WHERE name LIKE ?
					LIMIT 1
				`).bind(cleaned.slice(0, Math.min(4, cleaned.length)) + '%').first();

				if (fuzzy) {
					major_info_map.set(gn, fuzzy);
				}
			}
		}
	}

	// 3. 批量查 2023/2024/2025 三年数据 —— 降级匹配（21%→55-65%）
	//    拉取每所学校的全部 group 候选 → 在代码里做 4 层降级匹配：
	//    L1 精确 code 匹配      L2 group_name 完全相同
	//    L3 group_name 前缀相同  L4 group_name LIKE 主题词
	const school_codes						= Array.from(new Set(vols.map(v => v.school_code).filter(Boolean)));
	/* school_year_rows[school_code][year] = [row, row, ...]（候选池，降级匹配时查找） */
	const school_year_rows					= new Map();

	if (school_codes.length > 0) {
		const placeholders					= school_codes.map(() => '?').join(',');
		const hist_query					= await env.DB.prepare(`
			SELECT year, school_code, group_code, group_name, min_score, min_rank, plan_count
			FROM gaokao_scores
			WHERE year IN (2023, 2024, 2025) AND province = 'shandong'
			  AND school_code IN (${placeholders})
		`).bind(...school_codes).all();

		for (const row of hist_query.results || []) {
			if (!school_year_rows.has(row.school_code)) {
				school_year_rows.set(row.school_code, { 2023: [], 2024: [], 2025: [] });
			}
			const buckets					= school_year_rows.get(row.school_code);
			if (buckets[row.year]) buckets[row.year].push(row);
		}
	}

	// 4. 一分一段表（2023/2024/2025）用于等效分换算 + min_score 反查
	const segments							= {2023: [], 2024: [], 2025: []};
	for (const year of [2023, 2024, 2025]) {
		const seg_rows						= await env.DB.prepare(`
			SELECT score, rank FROM gaokao_segments
			WHERE year = ? AND subject_type = 'total' AND province = 'shandong'
			ORDER BY rank ASC
		`).bind(year).all();
		segments[year]						= seg_rows.results || [];
	}

	// 5. 富化每条志愿
	const enriched							= vols.map(v => {
		const major_info					= major_info_map.get(v.group_name);
		const code_5						= school_codes_map.get(v.school_name) || '';

		/* 三年数据 · 带派生字段 · 4 层降级匹配 */
		const history						= {};
		const v_eff_code					= get_effective_group_code(v.group_code, v.group_name);
		const v_clean_name					= clean_group_name(v.group_name);
		const school_buckets				= school_year_rows.get(v.school_code);

		for (const year of [2023, 2024, 2025]) {
			const candidates				= school_buckets ? school_buckets[year] : null;
			const matched					= match_history_row(candidates, v_eff_code, v.group_name, v_clean_name);

			if (matched) {
				history[year]				= {
					year:			matched.year,
					min_score:		matched.min_score,
					min_rank:		matched.min_rank,
					plan_count:		matched.plan_count,
					group_name:		matched.group_name,
					match_level:	matched._match_level		/* 调试用：L1=精确 L2=全名 L3=前缀 L4=关键词 */
				};

				/* min_score 反查：如果 D1 原始数据 min_score 为 null，用 min_rank 反查一分一段表 */
				if (!history[year].min_score && history[year].min_rank > 0) {
					const inferred_score	= rank_to_score(history[year].min_rank, segments[year]);
					if (inferred_score) history[year].min_score = inferred_score;
				}

				/* 派生字段：比我位次 / 比我分数（2023/2024 有录取数据） */
				if (year !== 2025 && user_rank > 0 && history[year].min_rank > 0) {
					const rank_diff			= user_rank - history[year].min_rank;
					history[year].rank_vs_me	= rank_diff;
					history[year].rank_label	= rank_diff > 0 ? '靠后' + rank_diff : (rank_diff < 0 ? '靠前' + (-rank_diff) : '持平');
				}
				if (year !== 2025 && user_score > 0 && history[year].min_score > 0) {
					const score_diff		= user_score - history[year].min_score;
					history[year].score_vs_me	= score_diff;
					history[year].score_label	= score_diff > 0 ? '高' + score_diff : (score_diff < 0 ? '低' + (-score_diff) : '相等');
				}
				/* 等效分：用户位次在 year 年对应什么分数 */
				if (year !== 2025 && user_rank > 0) {
					const eq_score			= rank_to_score(user_rank, segments[year]);
					if (eq_score) history[year].equiv_score	= eq_score;
				}
			}
		}

		/* 回退：如果 history 都没查到（school_code 不匹配），用志愿本身的 min_rank/plan_count 填充最新年 */
		if (Object.keys(history).length === 0 && v.min_rank) {
			history[v.year || 2024]			= {
				min_rank:		v.min_rank,
				plan_count:		v.plan_count
			};
		}

		/* ========= 大小年波动分析（差异化卖点） =========
		   基于 2023/2024/2025 三年位次计算波动幅度 + 趋势方向 */
		const volatility					= analyze_volatility(history);

		return {
			...v,
			school_code_5digit:				code_5,
			history:						history,
			volatility:						volatility,		/* { level, label, icon, color, trend, explanation } */
			/* 保留老字段兼容当前 PDF */
			min_score_2024:					history[2024] ? history[2024].min_score : null,
			min_rank_2024:					history[2024] ? history[2024].min_rank : v.min_rank,
			tuition_yuan:					major_info ? major_info.tuition_avg : infer_tuition(v.group_name, v.school_name),
			study_years:					infer_study_years(v.group_name),
			career_path:					major_info ? infer_career_path(major_info) : infer_career_from_group(v.group_name),
			employment_rate:				major_info ? major_info.employment_rate : null,
			salary_avg:						major_info ? major_info.salary_avg : null
		};
	});

	return json_response({
		enriched:		enriched,
		count:			enriched.length
	});
}


/* ============================================================
   大小年波动分析：基于 2023/2024/2025 三年位次判定稳定性 + 趋势

   返回结构：
   {
     level: 'stable' | 'normal' | 'volatile' | 'unstable',
     label: '🎯 三年稳定' | '🟢 正常波动' | '🟡 有波动' | '⚠️ 大小年',
     icon: '🎯' / '🟢' / '🟡' / '⚠️',
     color: '#16A34A' / '#65A30D' / '#F59E0B' / '#DC2626',
     trend: 'rising' | 'falling' | 'flat' | 'oscillating',
     explanation: '近3年位次稳定在25000名' / '2024大年(涨5k),2025或回调'
   }
   ============================================================ */
function analyze_volatility(history) {
	const ranks								= [];
	for (const y of [2023, 2024, 2025]) {
		const h								= history[y];
		if (h && h.min_rank && h.min_rank > 0) {
			ranks.push({ year: y, rank: h.min_rank });
		}
	}

	/* 数据不足 2 年：无法判断 */
	if (ranks.length < 2) {
		return {
			level:			'unknown',
			label:			'数据不足',
			icon:			'—',
			color:			'#999',
			trend:			'unknown',
			explanation:	'历史数据不足，参考性有限'
		};
	}

	/* 计算波动幅度（标准差 / 平均 * 100%） */
	const avg								= ranks.reduce((s, r) => s + r.rank, 0) / ranks.length;
	const variance							= ranks.reduce((s, r) => s + (r.rank - avg) ** 2, 0) / ranks.length;
	const std								= Math.sqrt(variance);
	const volatility_pct					= (std / avg) * 100;

	/* 判断趋势（相邻两年差值） */
	let trend								= 'flat';
	let trend_detail						= '';
	if (ranks.length >= 3) {
		const diff_23_24					= (ranks[1].rank - ranks[0].rank) / ranks[0].rank;		/* +=位次变高=难度降低 */
		const diff_24_25					= (ranks[2].rank - ranks[1].rank) / ranks[1].rank;

		if (diff_23_24 > 0.15 && diff_24_25 > 0.15) {
			trend							= 'falling';		/* 位次持续变大=录取难度下降 */
			trend_detail					= '连续两年位次下降（分数降温）';
		}
		else if (diff_23_24 < -0.15 && diff_24_25 < -0.15) {
			trend							= 'rising';
			trend_detail					= '连续两年位次上升（分数走高）';
		}
		else if ((diff_23_24 > 0.2 && diff_24_25 < -0.2) || (diff_23_24 < -0.2 && diff_24_25 > 0.2)) {
			trend							= 'oscillating';
			trend_detail					= '大小年明显，2024 异于 2023/2025';
		}
	}
	else if (ranks.length === 2) {
		const diff							= (ranks[1].rank - ranks[0].rank) / ranks[0].rank;
		if (Math.abs(diff) > 0.2) {
			trend							= diff > 0 ? 'falling' : 'rising';
			trend_detail					= `两年位次变化 ${diff > 0 ? '+' : ''}${Math.round(diff * 100)}%`;
		}
	}

	/* 分级 */
	let level, label, icon, color;
	if (volatility_pct <= 10) {
		level								= 'stable';
		label								= '🎯 三年稳定';
		icon								= '🎯';
		color								= '#16A34A';
	}
	else if (volatility_pct <= 20) {
		level								= 'normal';
		label								= '🟢 正常波动';
		icon								= '🟢';
		color								= '#65A30D';
	}
	else if (volatility_pct <= 30) {
		level								= 'volatile';
		label								= '🟡 有波动';
		icon								= '🟡';
		color								= '#F59E0B';
	}
	else {
		level								= 'unstable';
		label								= '⚠️ 大小年';
		icon								= '⚠️';
		color								= '#DC2626';
	}

	const explanation						= `近${ranks.length}年波动${Math.round(volatility_pct)}%${trend_detail ? '·' + trend_detail : ''}`;

	return {
		level:			level,
		label:			label,
		icon:			icon,
		color:			color,
		trend:			trend,
		volatility_pct:	Math.round(volatility_pct),
		explanation:	explanation
	};
}


/* 获取有效的专业组代码：
   - 如果 group_code 非空，直接用
   - 否则从 group_name 前缀提取（如 "0B智能制造工程" → "0B"）
   - 都没有则返回 group_name 全名作为 fallback */
function get_effective_group_code(group_code, group_name) {
	if (group_code && String(group_code).trim() !== '') return String(group_code).trim();
	if (!group_name) return '';

	/* 匹配 1-3 位字母或数字 + 后接汉字 */
	const m									= group_name.match(/^([0-9A-Z]{1,3})([\u4e00-\u9fa5])/);
	if (m) return m[1];

	return group_name;		/* 最后 fallback：完整名称 */
}


/* 判断两个 group_name 是否相关（用于 L1 精确 code 匹配的名称校验）
   规则：互相包含 / 前 2-3 字相同 / 至少共享 2 个 2 字关键词
   返回 true 表示可以认定是同专业 */
function names_related(a, b) {
	if (!a || !b) return false;
	/* 完全相同 */
	if (a === b) return true;
	/* 互相包含（一个是另一个的子串，长度 >= 2） */
	if (a.length >= 2 && b.indexOf(a) >= 0) return true;
	if (b.length >= 2 && a.indexOf(b) >= 0) return true;
	/* 前 2 字相同（最宽松的"相关"标准） */
	if (a.length >= 2 && b.length >= 2 && a.slice(0, 2) === b.slice(0, 2)) return true;
	/* 其他情况视为不相关（避免跨专业错匹） */
	return false;
}


/* 4 层降级匹配：在同一 school_code 同一 year 的候选池里找最相似的专业
   candidates: [{year, school_code, group_code, group_name, min_score, min_rank, plan_count}, ...]
   v_eff_code:  志愿的 effective_group_code（如 "0H"）
   v_raw_name:  志愿原始 group_name（如 "0H人工智能" 或 "人工智能"）
   v_clean:     志愿 clean name（去括号、"类" 等后缀，如 "人工智能"）
   返回匹配到的 row（带 _match_level 标识 L1-L4）或 null */
function match_history_row(candidates, v_eff_code, v_raw_name, v_clean) {
	if (!candidates || candidates.length === 0) return null;

	/* L1: 精确 code 匹配 + group_name 名称校验
	   原因：山东考试院 group_code 每年会重用，同 code 可能是完全不同专业
	   解决：同 code 后再验证 group_name 共享至少一个 2 字以上关键词 */
	if (v_eff_code) {
		for (const row of candidates) {
			const row_eff					= get_effective_group_code(row.group_code, row.group_name);
			if (row_eff === v_eff_code) {
				/* 验证 group_name 相关（避免跨专业错匹） */
				const row_clean				= clean_group_name(row.group_name);
				if (v_clean && row_clean && names_related(v_clean, row_clean)) {
					return { ...row, _match_level: 'L1' };
				}
				/* code 相同但名称完全不相关 → 跳过该 row，继续找 */
			}
		}
	}

	/* L2: group_name 完全相同（去 code 前缀后，专业名一致） */
	if (v_clean) {
		for (const row of candidates) {
			const row_clean					= clean_group_name(row.group_name);
			if (row_clean && row_clean === v_clean) {
				return { ...row, _match_level: 'L2' };
			}
		}
	}

	/* L3: group_name 前缀（头 4 个字相同，如 "计算机类" ≈ "计算机科学") */
	if (v_clean && v_clean.length >= 3) {
		const prefix						= v_clean.slice(0, Math.min(4, v_clean.length));
		for (const row of candidates) {
			const row_clean					= clean_group_name(row.group_name);
			if (row_clean && row_clean.indexOf(prefix) === 0) {
				return { ...row, _match_level: 'L3' };
			}
		}
	}

	/* L4: 主题词互相包含（最宽松） */
	if (v_clean && v_clean.length >= 2) {
		for (const row of candidates) {
			const row_clean					= clean_group_name(row.group_name);
			if (row_clean && (row_clean.indexOf(v_clean) >= 0 || v_clean.indexOf(row_clean) >= 0)) {
				return { ...row, _match_level: 'L4' };
			}
		}
	}

	return null;
}


/* 在一分一段表里查位次对应的分数（位次越小分数越高） */
function rank_to_score(rank, segments) {
	if (!segments || segments.length === 0) return null;
	/* segments 已按 rank ASC 排序。找第一个 rank >= 目标的 */
	for (const s of segments) {
		if (s.rank >= rank) return s.score;
	}
	/* 超出最后一个（位次特别靠后），返回最低分 */
	return segments[segments.length - 1].score;
}


function clean_group_name(name) {
	if (!name) return '';
	// 去除括号和其中内容、类别后缀
	let cleaned								= name.replace(/\(.*?\)/g, '').replace(/（.*?）/g, '').trim();
	// 去除常见后缀
	cleaned									= cleaned.replace(/类$/, '').replace(/及其自动化$/, '').replace(/工程$/, '');
	return cleaned;
}


function infer_tuition(group_name, school_name) {
	// 基于专业类型 + 学校类型推测学费（单位：元/年）
	const gn								= group_name || '';
	const sn								= school_name || '';

	// 中外合作 / 国际班（最贵）
	if (gn.includes('中外合作') || gn.includes('国际班') || gn.includes('(中外') || gn.includes('（中外')) return 60000;
	if (sn.includes('中外合作')) return 55000;

	// 精英班 / 实验班 / 拔尖班（普遍比普通班贵一档）
	if (gn.includes('精英班') || gn.includes('拔尖') || gn.includes('实验班') || gn.includes('卓越')) {
		// 工科精英班多 6500-7500
		if (gn.includes('计算机') || gn.includes('电子') || gn.includes('机械') || gn.includes('自动化')) return 7000;
		return 6500;
	}

	// 艺术类
	if (gn.includes('美术') || gn.includes('绘画') || gn.includes('雕塑')) return 10000;
	if (gn.includes('设计')) return 10000;
	if (gn.includes('音乐') || gn.includes('舞蹈') || gn.includes('表演')) return 10000;
	if (gn.includes('戏剧') || gn.includes('影视') || gn.includes('编导') || gn.includes('摄影')) return 10000;
	if (gn.includes('艺术')) return 9000;

	// 计算机 / 人工智能 / 软件（热门工科普遍 5500-6500）
	if (gn.includes('软件工程')) return 6500;
	if (gn.includes('人工智能') || gn.includes('智能科学')) return 6000;
	if (gn.includes('数据科学') || gn.includes('大数据')) return 6000;
	if (gn.includes('计算机')) return 5500;

	// 电子 / 通信 / 微电子
	if (gn.includes('集成电路') || gn.includes('微电子')) return 6000;
	if (gn.includes('电子') || gn.includes('通信')) return 5500;

	// 医学 / 口腔 / 药学
	if (gn.includes('临床') || gn.includes('口腔医学')) return 6000;
	if (gn.includes('中医') || gn.includes('针灸')) return 5400;
	if (gn.includes('药学') || gn.includes('制药')) return 5500;
	if (gn.includes('医学') || gn.includes('护理')) return 5500;

	// 建筑 / 土木
	if (gn.includes('建筑学')) return 6000;
	if (gn.includes('城乡规划') || gn.includes('风景园林')) return 6000;
	if (gn.includes('土木') || gn.includes('建筑')) return 5500;

	// 航空航天 / 核工程 / 船舶
	if (gn.includes('飞行器') || gn.includes('航空') || gn.includes('航天')) return 6000;
	if (gn.includes('核工程') || gn.includes('核能')) return 6000;
	if (gn.includes('船舶') || gn.includes('海洋工程')) return 6000;

	// 化工 / 材料
	if (gn.includes('化工') || gn.includes('化学工程')) return 5500;
	if (gn.includes('材料')) return 5500;

	// 农学 / 林学（普遍便宜）
	if (gn.includes('农学') || gn.includes('林学') || gn.includes('园艺') || gn.includes('畜牧') || gn.includes('兽医') || gn.includes('草坪')) return 3000;
	if (gn.includes('葡萄') || gn.includes('酿酒') || gn.includes('食品')) return 4000;

	// 文史哲 / 外语（普遍 4500-5500）
	if (gn.includes('汉语言') || gn.includes('哲学') || gn.includes('历史') || gn.includes('考古')) return 4500;
	if (gn.includes('英语') || gn.includes('日语') || gn.includes('韩语') || gn.includes('翻译') || gn.includes('外语')) return 5000;

	// 经管法
	if (gn.includes('金融') || gn.includes('会计') || gn.includes('经济')) return 5500;
	if (gn.includes('法学') || gn.includes('法律')) return 5500;

	// 师范
	if (sn.includes('师范') || gn.includes('师范')) return 4500;

	// 民办 / 独立学院（按校名大致判断）
	if (sn.includes('学院') && !sn.includes('大学') && !sn.includes('学院大学')) return 18000;

	// 默认公办本科
	return 5500;
}


function infer_study_years(group_name) {
	const gn								= group_name || '';

	// 临床医学 5+3 一体化 / 八年制
	if (gn.includes('5+3') || gn.includes('八年') || gn.includes('八年制')) return '八年';

	// 建筑学 5 年
	if (gn.includes('建筑学') && !gn.includes('建筑学类')) return '五年';

	// 临床医学 5 年
	if (gn.includes('临床医学') && !gn.includes('5+3') && !gn.includes('八年')) return '五年';

	// 口腔 5 年
	if (gn.includes('口腔医学') && !gn.includes('5+3')) return '五年';

	// 中医 5 年
	if (gn === '中医学' || gn.includes('针灸推拿')) return '五年';

	return '四年';
}


function infer_career_path(major_info) {
	// 基于专业 category + description 推测就业去向（简短版）
	const category							= major_info.category || '';
	const name								= major_info.name || '';

	// 根据 category 返回简短就业描述
	const CAREER_MAP						= {
		'计算机类':			'互联网、芯片研发、AI',
		'电子信息类':		'通信、芯片设计、军工电子',
		'自动化类':			'智能制造、机器人、车企自动驾驶',
		'机械类':			'汽车、装备制造、航天',
		'材料类':			'新材料、半导体、军工材料',
		'化学类':			'新材料、化工、高校科研',
		'化工与制药类':		'化工新能源、精细化工、材料企业',
		'能源动力类':		'氢能、核能、新型发电集团',
		'数学类':			'金融、IT、科研',
		'物理学类':			'基础科研、量子信息、芯片企业',
		'生物科学类':		'生物制药、科研院所',
		'金融学类':			'银行、证券、基金、保险',
		'经济学类':			'经济咨询、政府部门、金融',
		'工商管理类':		'互联网大厂、咨询、外企',
		'法学类':			'律所、检察院、企业法务',
		'新闻传播学类':		'新媒体、互联网、广告',
		'中国语言文学类':	'编辑、教师、文化传播',
		'外国语言文学类':	'外企、外交、教育',
		'建筑类':			'设计院、城市规划',
		'土木类':			'建筑设计、基建、房地产',
		'临床医学类':		'三甲医院、医学科研',
		'口腔医学类':		'口腔医院、诊所',
		'护理学类':			'三甲医院、养老机构',
		'药学类':			'医药研发、制药企业',
		'中医学类':			'中医院、健康管理',
		'教育学类':			'中小学教师、教育机构',
		'体育学类':			'体育教师、运动俱乐部',
		'艺术学理论类':		'美术馆、艺术院校',
		'音乐与舞蹈学类':	'艺术团体、音乐院校',
		'美术学类':			'美术馆、画廊、艺术院校',
		'设计学类':			'互联网设计、广告公司',
		'戏剧与影视学类':	'影视公司、电视台',
		'航空航天类':		'航空、航天、国防',
		'兵器类':			'军工集团、国防',
		'核工程类':			'核电、国防、核研究院',
		'测绘类':			'测绘局、工程勘测',
		'地质类':			'地质勘探、石油',
		'矿业类':			'矿业、能源、安全',
		'交通运输类':		'铁路、航空、港口',
		'海洋工程类':		'船舶设计、海洋工程公司',
		'公共管理类':		'政府、公共事业'
	};

	return CAREER_MAP[category] || '相关行业、科研院所';
}


function infer_career_from_group(group_name) {
	const gn								= group_name || '';

	// IT / AI / 信息
	if (gn.includes('计算机') || gn.includes('软件')) return '互联网、IT';
	if (gn.includes('数据科学') || gn.includes('大数据')) return '数据分析、互联网';
	if (gn.includes('人工智能') || gn.includes('智能科学')) return 'AI 算法、智能硬件';
	if (gn.includes('智能')) return 'AI、智能制造';
	if (gn.includes('网络空间') || gn.includes('信息安全')) return '安全厂商、互联网';
	if (gn.includes('物联网')) return '物联网、智能硬件';

	// 电子 / 通信 / 电气
	if (gn.includes('通信工程')) return '通信、华为中兴';
	if (gn.includes('电子信息')) return '通信、芯片设计';
	if (gn.includes('微电子') || gn.includes('集成电路')) return '芯片设计、半导体';
	if (gn.includes('电子')) return '通信、电子设备';
	if (gn.includes('电气工程') || gn.includes('电力')) return '国家电网、电力公司';

	// 自动化 / 机械 / 机器人
	if (gn.includes('自动化')) return '智能制造、自动化';
	if (gn.includes('机器人')) return '智能制造、机器人';
	if (gn.includes('机械')) return '制造业、装备制造';
	if (gn.includes('车辆') || gn.includes('汽车')) return '车企、新能源汽车';

	// 航空 / 航天 / 兵器 / 核
	if (gn.includes('飞行器') || gn.includes('无人机') || gn.includes('无人驾驶航空')) return '航空、航天、国防';
	if (gn.includes('航空') || gn.includes('航天')) return '航空、航天、国防';
	if (gn.includes('武器') || gn.includes('兵器')) return '军工集团、国防';
	if (gn.includes('核工程') || gn.includes('核能')) return '核电、国防';

	// 能源 / 新能源
	if (gn.includes('能源') || gn.includes('新能源')) return '新能源、能源集团';

	// 金融 / 经济 / 管理
	if (gn.includes('金融')) return '银行、证券、基金';
	if (gn.includes('会计') || gn.includes('审计')) return '事务所、企业财务';
	if (gn.includes('经济')) return '银行、咨询、政府';
	if (gn.includes('工商管理') || gn.includes('市场营销')) return '企业管理、咨询';
	if (gn.includes('人力资源')) return '企业 HR、咨询';
	if (gn.includes('物流') || gn.includes('供应链')) return '物流、电商、制造';

	// 医学 / 药学
	if (gn.includes('临床')) return '三甲医院、医学科研';
	if (gn.includes('口腔')) return '口腔医院、诊所';
	if (gn.includes('护理')) return '医院、养老机构';
	if (gn.includes('中医') || gn.includes('针灸')) return '中医院、健康管理';
	if (gn.includes('预防医学') || gn.includes('公共卫生')) return '疾控、卫健委';
	if (gn.includes('药学') || gn.includes('制药')) return '医药研发、制药企业';
	if (gn.includes('医学')) return '医院、医学科研';

	// 法学 / 传媒 / 语言
	if (gn.includes('法学')) return '律所、检察院、企业法务';
	if (gn.includes('新闻') || gn.includes('传播') || gn.includes('广告')) return '新媒体、互联网、广告';
	if (gn.includes('英语')) return '外企、外贸、教育';
	if (gn.includes('日语') || gn.includes('韩语') || gn.includes('法语') || gn.includes('德语') || gn.includes('西班牙语') || gn.includes('俄语') || gn.includes('翻译')) return '外企、翻译、外交';
	if (gn.includes('汉语言')) return '编辑、教师、文化传播';
	if (gn.includes('外语')) return '外企、教育、翻译';

	// 建筑 / 土木 / 水利 / 交通
	if (gn.includes('建筑学')) return '设计院、建筑事务所';
	if (gn.includes('建筑')) return '建筑设计、房地产';
	if (gn.includes('土木')) return '基建、房地产';
	if (gn.includes('城市地下空间')) return '基建、房地产';
	if (gn.includes('给排水') || gn.includes('市政')) return '市政设计、基建';
	if (gn.includes('水利') || gn.includes('水文')) return '水利、工程设计';
	if (gn.includes('交通工程') || gn.includes('智能交通')) return '交通规划、铁路';
	if (gn.includes('交通运输')) return '铁路、航空、港口';
	if (gn.includes('道路桥梁')) return '基建、工程局';

	// 化学 / 材料 / 生物
	if (gn.includes('化学工程') || gn.includes('化工')) return '化工、新材料';
	if (gn.includes('化学')) return '化工、新材料、科研';
	if (gn.includes('材料成型') || gn.includes('材料科学')) return '新材料、半导体、制造';
	if (gn.includes('材料')) return '材料、制造业';
	if (gn.includes('生物工程') || gn.includes('生物技术')) return '生物制药、生物科技';
	if (gn.includes('生物')) return '生物制药、科研院所';
	if (gn.includes('食品') || gn.includes('酿酒') || gn.includes('葡萄')) return '食品饮料、酿造企业';

	// 农林 / 地质 / 资源
	if (gn.includes('农学') || gn.includes('园艺') || gn.includes('植物')) return '农业科技、种业';
	if (gn.includes('草坪')) return '园林绿化、市政';
	if (gn.includes('动物') || gn.includes('畜牧') || gn.includes('兽医')) return '畜牧、宠物医疗';
	if (gn.includes('林学') || gn.includes('林业') || gn.includes('家具') || gn.includes('木材')) return '林业、家居制造';
	if (gn.includes('测绘') || gn.includes('地理信息')) return '测绘、城市规划';
	if (gn.includes('地质') || gn.includes('勘探')) return '地质、能源勘探';
	if (gn.includes('采矿') || gn.includes('矿业')) return '矿业、能源集团';
	if (gn.includes('石油') || gn.includes('油气')) return '中石油、中石化';
	if (gn.includes('环境')) return '环保、市政、科研';

	// 教育 / 艺术 / 体育
	if (gn.includes('教育') || gn.includes('师范')) return '教师、教育机构';
	if (gn.includes('心理')) return '心理咨询、HR';
	if (gn.includes('体育')) return '体育教师、俱乐部';
	if (gn.includes('艺术') || gn.includes('设计') || gn.includes('美术')) return '设计公司、广告、互联网';
	if (gn.includes('音乐') || gn.includes('舞蹈')) return '艺术院团、教育';
	if (gn.includes('影视') || gn.includes('戏剧') || gn.includes('编导')) return '影视公司、传媒';

	// 物理 / 数学 / 哲学 / 历史
	if (gn.includes('物理')) return '科研院所、芯片企业';
	if (gn.includes('数学') || gn.includes('应用数学')) return '金融、IT、科研';
	if (gn.includes('统计')) return '金融、数据分析';
	if (gn.includes('哲学')) return '高校、研究院';
	if (gn.includes('历史')) return '博物馆、研究院';
	if (gn.includes('政治') || gn.includes('公共管理')) return '政府、公共事业';
	if (gn.includes('社会学')) return '政府、社会研究';

	// 海洋 / 船舶
	if (gn.includes('海洋') || gn.includes('船舶')) return '船舶设计、海洋工程';

	return '综合就业方向';
}


function json_response(data, status) {
	return new Response(JSON.stringify(data), {
		status:		status || 200,
		headers:	{
			'Content-Type':		'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		}
	});
}


export async function onRequestOptions() {
	return new Response(null, {
		status:		204,
		headers:	{
			'Access-Control-Allow-Origin':	'*',
			'Access-Control-Allow-Methods':	'POST, OPTIONS',
			'Access-Control-Allow-Headers':	'Content-Type'
		}
	});
}
