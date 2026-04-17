-- Me Offer · Cloudflare D1 Schema (v1.0 · 2026-04-17)
-- Database: meoffer-gaokao
-- Deploy: wrangler d1 execute meoffer-gaokao --file=db/schema.sql

-- ========== 一分一段表 ==========
CREATE TABLE IF NOT EXISTS gaokao_segments (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	year			INTEGER NOT NULL,
	province		TEXT DEFAULT 'shandong',
	subject_type	TEXT,
	score			INTEGER NOT NULL,
	rank			INTEGER NOT NULL,
	count			INTEGER,
	source_url		TEXT,
	created_at		TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_segments_year_score ON gaokao_segments(year, score);
CREATE INDEX IF NOT EXISTS idx_segments_year_rank ON gaokao_segments(year, rank);


-- ========== 历年投档分数 ==========
CREATE TABLE IF NOT EXISTS gaokao_scores (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	year			INTEGER NOT NULL,
	province		TEXT DEFAULT 'shandong',
	school_code		TEXT NOT NULL,
	school_name		TEXT NOT NULL,
	group_code		TEXT,
	group_name		TEXT,
	subject_require	TEXT,
	min_score		INTEGER,
	min_rank		INTEGER,
	plan_count		INTEGER,
	actual_count	INTEGER,
	tuition			INTEGER,
	source_url		TEXT,
	created_at		TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_scores_year_rank ON gaokao_scores(year, min_rank);
CREATE INDEX IF NOT EXISTS idx_scores_school_year ON gaokao_scores(school_code, year);


-- ========== 2025 招生计划 ==========
CREATE TABLE IF NOT EXISTS gaokao_plans_2025 (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	school_code		TEXT NOT NULL,
	school_name		TEXT NOT NULL,
	group_code		TEXT,
	group_name		TEXT,
	major_name		TEXT,
	subject_require	TEXT,
	plan_count		INTEGER,
	tuition			INTEGER,
	remark			TEXT,
	created_at		TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_plans_school ON gaokao_plans_2025(school_code);


-- ========== 全国高校信息 ==========
CREATE TABLE IF NOT EXISTS universities (
	code			TEXT PRIMARY KEY,
	name			TEXT NOT NULL,
	city			TEXT,
	province		TEXT,
	tier			TEXT,
	nature			TEXT,
	rank_ruanke		INTEGER,
	website			TEXT,
	created_at		TEXT DEFAULT (datetime('now'))
);


-- ========== 专业目录 ==========
CREATE TABLE IF NOT EXISTS majors (
	code			TEXT PRIMARY KEY,
	name			TEXT NOT NULL,
	category		TEXT,
	subcategory		TEXT,
	degree_type		TEXT,
	tuition_avg		INTEGER,
	employment_rate	REAL,
	salary_avg		INTEGER,
	masters_rate	REAL,
	description		TEXT,
	created_at		TEXT DEFAULT (datetime('now'))
);


-- ========== 体检受限专业 ==========
CREATE TABLE IF NOT EXISTS health_restrictions (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	major_code		TEXT,
	major_name		TEXT,
	restriction_type TEXT,
	description		TEXT
);


-- ========== 订单（上线后启用） ==========
CREATE TABLE IF NOT EXISTS orders (
	order_id		TEXT PRIMARY KEY,
	user_phone		TEXT,
	user_email		TEXT,
	amount			INTEGER,
	plan_type		TEXT,
	form_data		TEXT,
	pdf_url			TEXT,
	status			TEXT DEFAULT 'pending',
	created_at		TEXT DEFAULT (datetime('now')),
	paid_at			TEXT
);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);


-- ========== Waitlist 邮箱收集（立即启用） ==========
CREATE TABLE IF NOT EXISTS waitlist (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	email			TEXT NOT NULL,
	type			TEXT,
	form_data		TEXT,
	referrer		TEXT,
	created_at		TEXT DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email_type ON waitlist(email, type);
