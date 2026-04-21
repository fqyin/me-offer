-- Me Offer · AI 高考陪跑社区 · 数据库 Schema v4
-- 创建日期：2026-04-21
-- 首发：北京 2025 生物 20 题

-- 真题主表
CREATE TABLE IF NOT EXISTS gaokao_questions (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	year			INTEGER NOT NULL,
	province		TEXT NOT NULL,
	subject			TEXT NOT NULL,
	paper_type		TEXT,
	question_no		INTEGER NOT NULL,
	question_type	TEXT,
	difficulty		REAL,
	difficulty_lvl	TEXT,
	score			INTEGER,
	stem_html		TEXT,
	options_json	TEXT,
	answer			TEXT,
	knowledge_tags	TEXT,
	title			TEXT,
	created_at		DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_q_subj_year ON gaokao_questions(subject, year, province);
CREATE INDEX IF NOT EXISTS idx_q_diff ON gaokao_questions(difficulty_lvl);

-- AI 黄金解析表（8 维度）
CREATE TABLE IF NOT EXISTS gaokao_ai_analysis (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	question_id		INTEGER NOT NULL,
	kaodian			TEXT,
	luoji			TEXT,
	tuili_json		TEXT,
	cuojie			TEXT,
	bianshi_json	TEXT,
	qushi			TEXT,
	xinfa			TEXT,
	parent_tr		TEXT,
	model_version	TEXT DEFAULT 'me-offer-v1',
	endorsed_by		TEXT,
	generated_at	DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_qid ON gaokao_ai_analysis(question_id);

-- 学生练习记录
CREATE TABLE IF NOT EXISTS student_practice (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id			INTEGER NOT NULL,
	question_id		INTEGER NOT NULL,
	is_correct		INTEGER,
	time_spent_sec	INTEGER,
	student_answer	TEXT,
	practiced_at	DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_practice_user ON student_practice(user_id, practiced_at DESC);

-- 知识点图谱
CREATE TABLE IF NOT EXISTS knowledge_graph (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	subject			TEXT NOT NULL,
	tag_name		TEXT NOT NULL,
	parent_tag		TEXT,
	grade_level		TEXT,
	description		TEXT
);

CREATE INDEX IF NOT EXISTS idx_kg_subj_tag ON knowledge_graph(subject, tag_name);
