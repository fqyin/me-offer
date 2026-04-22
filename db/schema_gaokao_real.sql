-- Me Offer · 高考真题库 D1 schema (v2 含图/答案/解析)

DROP TABLE IF EXISTS gaokao_questions_real;

CREATE TABLE gaokao_questions_real (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	province			TEXT NOT NULL,
	subject				TEXT NOT NULL,
	year				INTEGER NOT NULL,
	question_no			INTEGER NOT NULL,
	question_type		TEXT,
	stem				TEXT,
	options_json		TEXT,
	answer				TEXT,
	analysis			TEXT,
	stem_images_json	TEXT,
	analysis_images_json TEXT,
	image_dir			TEXT,
	source_file			TEXT,
	scraped_at			TEXT DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (province, subject, year, question_no)
);

CREATE INDEX idx_gaokao_lookup ON gaokao_questions_real (province, subject, year);
