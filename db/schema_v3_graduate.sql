-- ============================================
-- Me Offer 考研扩充 · Schema v3
-- 新增 7 张表：研究生招生专用
-- 2026-04-18
-- ============================================

-- ============================================
-- 1. 13 大学科门类（教育部 2022 版）
-- ============================================
CREATE TABLE IF NOT EXISTS discipline_categories (
	code			TEXT PRIMARY KEY,			-- 01 哲学 / 02 经济学 / 03 法学 / ...
	name			TEXT NOT NULL,
	name_en			TEXT,
	description		TEXT
);


-- ============================================
-- 2. 111 个一级学科（覆盖所有学术型硕士）
-- ============================================
CREATE TABLE IF NOT EXISTS first_level_disciplines (
	code			TEXT PRIMARY KEY,			-- 0101 哲学 / 0201 理论经济学 / ...
	name			TEXT NOT NULL,
	name_en			TEXT,
	category_code	TEXT NOT NULL,				-- 所属门类
	description		TEXT,
	FOREIGN KEY (category_code) REFERENCES discipline_categories(code)
);


-- ============================================
-- 3. 47 类专业硕士（MPA/MBA/MEM/MPAcc etc）
-- ============================================
CREATE TABLE IF NOT EXISTS professional_degrees (
	code			TEXT PRIMARY KEY,			-- 0251 金融 / 0252 应用统计 / ...
	name			TEXT NOT NULL,
	name_en			TEXT,
	category_code	TEXT NOT NULL,				-- 所属门类（0251 归 0200 经济学等）
	degree_abbr		TEXT,						-- MBA/MPA/MEM 等英文缩写
	description		TEXT
);


-- ============================================
-- 4. 34 所自划线高校 flag + 双一流 tier
-- （扩展现有 universities 表 · 通过 tier 字段）
-- ============================================
-- tier 字段扩展值:
--   '985', '211', '双一流A', '双一流B', '34所自划线'
--   '中外合作', '普通本科', '专科'
--
-- 现有 universities 表不变，通过额外表标记研究生招生状态


-- ============================================
-- 5. 研究生招生院校（基于 universities 扩展）
-- ============================================
CREATE TABLE IF NOT EXISTS graduate_schools (
	university_code		TEXT PRIMARY KEY,		-- 外键 → universities.code
	has_graduate_school	INTEGER DEFAULT 1,		-- 是否有研招资格 1/0
	is_34_auto_line		INTEGER DEFAULT 0,		-- 34 所自划线 flag
	is_double_first		INTEGER DEFAULT 0,		-- 双一流 flag
	is_c9				INTEGER DEFAULT 0,		-- C9 联盟 flag
	gs_website			TEXT,					-- 研究生院官网
	gs_admissions_url	TEXT,					-- 研究生招生页
	gs_zs_contact		TEXT,					-- 招办电话/邮箱
	enrollment_total_2024	INTEGER,			-- 2024 总录取人数
	enrollment_total_2025	INTEGER,			-- 2025 总计划
	recommend_ratio_2025	REAL,				-- 推免比例（0-1）
	scraped_at			TEXT,					-- 上次爬取时间
	FOREIGN KEY (university_code) REFERENCES universities(code)
);


-- ============================================
-- 6. 研究生专业（核心表）
-- 存储每所高校开设的每个硕士专业
-- ============================================
CREATE TABLE IF NOT EXISTS graduate_programs (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	university_code		TEXT NOT NULL,			-- 学校代码（外键）
	discipline_code		TEXT,					-- 一级学科/专硕代码
	program_name		TEXT NOT NULL,			-- 专业名（如 '人工智能'）
	program_type		TEXT,					-- 学术型|专业型
	degree_type			TEXT,					-- 硕士|博士
	college_name		TEXT,					-- 学院名（如 '计算机学院'）
	research_directions	TEXT,					-- 研究方向（JSON 数组）
	exam_subjects		TEXT,					-- 考试科目（JSON 数组）
	study_years			INTEGER,				-- 学制
	study_mode			TEXT,					-- 全日制|非全日制
	plan_count_2025		INTEGER,				-- 2025 招生计划
	plan_tuition		INTEGER,				-- 学费（元/年）
	plan_tuition_note	TEXT,					-- 学费说明
	recruitment_url		TEXT,					-- 招生简章 URL
	created_at			TEXT DEFAULT (datetime('now')),
	updated_at			TEXT,
	FOREIGN KEY (university_code) REFERENCES universities(code)
);

CREATE INDEX IF NOT EXISTS idx_grad_programs_uni ON graduate_programs(university_code);
CREATE INDEX IF NOT EXISTS idx_grad_programs_disc ON graduate_programs(discipline_code);
CREATE INDEX IF NOT EXISTS idx_grad_programs_name ON graduate_programs(program_name);


-- ============================================
-- 7. 研究生复试分数线 & 录取数据（核心推荐表）
-- ============================================
CREATE TABLE IF NOT EXISTS graduate_score_lines (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	university_code		TEXT NOT NULL,
	discipline_code		TEXT,					-- 一级学科代码
	program_id			INTEGER,				-- 精确到专业（可空）
	year				INTEGER NOT NULL,
	line_type			TEXT NOT NULL,			-- '复试线' | '录取最低' | '录取平均'
	total_score			INTEGER,				-- 总分线
	politics			INTEGER,				-- 政治
	english				INTEGER,				-- 英语
	subject1			INTEGER,				-- 业务课一
	subject2			INTEGER,				-- 业务课二
	zone_type			TEXT,					-- A 类 / B 类 / 自划线
	plan_enrolled		INTEGER,				-- 当年实际录取
	plan_recommended	INTEGER,				-- 推免录取人数
	plan_first_exam		INTEGER,				-- 统考录取人数
	created_at			TEXT DEFAULT (datetime('now')),
	FOREIGN KEY (university_code) REFERENCES universities(code),
	FOREIGN KEY (program_id) REFERENCES graduate_programs(id)
);

CREATE INDEX IF NOT EXISTS idx_grad_lines_uni_year ON graduate_score_lines(university_code, year);
CREATE INDEX IF NOT EXISTS idx_grad_lines_disc_year ON graduate_score_lines(discipline_code, year);


-- ============================================
-- 8. 全国考研国家线（A/B 类分区）
-- ============================================
CREATE TABLE IF NOT EXISTS national_score_lines (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	year				INTEGER NOT NULL,
	zone_type			TEXT NOT NULL,			-- A 类 | B 类
	category_code		TEXT NOT NULL,			-- 学科门类代码
	total_score			INTEGER,
	politics			INTEGER,
	english				INTEGER,
	subject1			INTEGER,
	subject2			INTEGER,
	notes				TEXT,
	UNIQUE(year, zone_type, category_code)
);
