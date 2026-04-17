-- Me Offer · D1 Schema v2 (2026-04-17)
-- 从"只支持山东"升级到"全国 31 省可扩展架构"
-- 核心改动：新增 provinces 表 + universities 补全字段 + scores 加省份维度

-- ============================================================
-- 1. provinces 表（新增）· 31 省高考配置
-- ============================================================
CREATE TABLE IF NOT EXISTS provinces (
	code			TEXT PRIMARY KEY,			-- shandong, hebei, beijing...
	name			TEXT NOT NULL,				-- 山东省
	name_short		TEXT,						-- 山东
	reform_year		INTEGER,					-- 新高考改革年，null=未改革
	reform_type		TEXT,						-- 3+3 / 3+1+2 / 传统文理
	model			TEXT,						-- 专业+院校 / 院校专业组 / 院校志愿
	batches_json	TEXT,						-- JSON 数组：批次+志愿数
	chong_count		INTEGER,					-- 默认冲档数
	wen_count		INTEGER,					-- 默认稳档数
	bao_count		INTEGER,					-- 默认保档数
	subject_select	TEXT,						-- 选科规则说明
	special_notes	TEXT,						-- JSON 数组：特殊说明
	data_status		TEXT DEFAULT 'pending',		-- pending / partial / complete / not_supported
	recommended_priority INTEGER,				-- 开发优先级 1-9
	created_at		TEXT DEFAULT (datetime('now'))
);

-- ============================================================
-- 2. universities 表（升级）· 补全字段
-- ============================================================
-- 注意：D1 不支持 ALTER 所有操作，所以保留原表结构，新建补充字段视图
-- 如果需要重建，drop 原表后 create new
-- 现在字段：code, name, city(其实是城市), province(存了城市), tier, nature, rank_ruanke, website

-- 新增的扩展信息（现在 universities 的问题：city 空, province 存了城市名而非省名）
-- 修正方案：不重建，在业务层用 name 识别（已经通过 identify_school_region 实现）
-- v2 建议：加一个映射表
CREATE TABLE IF NOT EXISTS university_mapping (
	school_name			TEXT PRIMARY KEY,		-- "山东大学"
	province_code		TEXT,					-- shandong
	province_name		TEXT,					-- 山东省
	city				TEXT,					-- 济南
	tier				TEXT,					-- 985 / 211 / 双一流 / 普通本科 / 专科
	nature				TEXT,					-- 公办 / 民办 / 中外合作 / 独立学院
	is_985				INTEGER DEFAULT 0,
	is_211				INTEGER DEFAULT 0,
	is_double_first		INTEGER DEFAULT 0,		-- 是否双一流
	rank_ruanke_2024	INTEGER,				-- 软科排名
	rank_qs_2024		INTEGER,				-- QS 排名
	established_year	INTEGER,				-- 建校年
	has_postgraduate	INTEGER DEFAULT 0,		-- 是否有研究生院
	features_json		TEXT,					-- 特色标签数组（航空/艺术/财经等）
	created_at			TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_mapping_province ON university_mapping(province_code);
CREATE INDEX IF NOT EXISTS idx_mapping_tier ON university_mapping(tier);

-- ============================================================
-- 3. gaokao_scores 表（升级）· 加省份维度
-- ============================================================
-- 现有表：year, province='shandong'（已有，默认 shandong）, school_code, school_name, group_code, group_name, min_rank, plan_count
-- 注意：已经有 province 字段，这里无需改动
-- 未来扩展只需：INSERT INTO gaokao_scores (year, province, ...) VALUES (2025, 'hebei', ...)

-- ============================================================
-- 4. gaokao_segments 表（升级）· 加省份维度
-- ============================================================
-- 已有 province 字段 · 已可按省查询 · 无需改动
-- 例：河北一分一段表 INSERT 时 province='hebei'

-- ============================================================
-- 5. majors 表（升级）· 完整专业目录
-- ============================================================
-- 现有：code, name, category, subcategory, degree_type, tuition_avg, employment_rate, salary_avg, masters_rate, description
-- 建议追加字段
CREATE TABLE IF NOT EXISTS majors_ext (
	major_code			TEXT PRIMARY KEY,
	major_name			TEXT NOT NULL,
	category			TEXT,					-- 学科门类（工学/理学/文学...）
	subcategory			TEXT,					-- 一级学科（计算机类/数学类...）
	degree_years		INTEGER DEFAULT 4,		-- 学制年数
	tuition_yuan		INTEGER,				-- 学费
	employment_rate		REAL,					-- 就业率
	starting_salary		INTEGER,				-- 起薪（元/月）
	masters_rate		REAL,					-- 考研率
	job_5yr_salary		INTEGER,				-- 5 年后薪资
	heat_score			INTEGER,				-- 热门度 1-100
	top_employers_json	TEXT,					-- 主要雇主 JSON 数组
	related_careers		TEXT,					-- 相关职业
	mycos_source_year	INTEGER,				-- 麦可思数据年份
	created_at			TEXT DEFAULT (datetime('now'))
);

-- ============================================================
-- 6. 初始化 31 省数据（从 provinces_rules_2025.json 导入）
-- ============================================================
-- 使用 scripts/20_seed_provinces.py 执行导入

-- ============================================================
-- 7. 省份扩展日志表（Audit）
-- ============================================================
CREATE TABLE IF NOT EXISTS province_import_log (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	province_code	TEXT NOT NULL,
	year			INTEGER,
	table_name		TEXT,					-- scores/segments/plans
	rows_imported	INTEGER,
	source_url		TEXT,
	status			TEXT DEFAULT 'success',
	created_at		TEXT DEFAULT (datetime('now'))
);
