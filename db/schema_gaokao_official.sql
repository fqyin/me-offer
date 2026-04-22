-- Me Offer · 高考真题库 D1 schema v3（官方答案 + 详解 + 表格）

DROP TABLE IF EXISTS gaokao_questions_real;

CREATE TABLE gaokao_questions_real (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	province			TEXT NOT NULL,
	subject				TEXT NOT NULL,
	year				INTEGER NOT NULL,
	question_no			INTEGER NOT NULL,
	question_type		TEXT,
	stem				TEXT,
	stem_has_table		INTEGER DEFAULT 0,
	options_json		TEXT,
	answer				TEXT,
	answer_full			TEXT,
	analysis			TEXT,
	stem_images_json	TEXT,
	analysis_images_json TEXT,
	image_dir			TEXT,
	source				TEXT,
	source_pdf			TEXT,
	scraped_at			TEXT DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (province, subject, year, question_no)
);

CREATE INDEX idx_gaokao_lookup ON gaokao_questions_real (province, subject, year);
