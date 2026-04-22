-- Me Offer · Family 陪跑账号系统 Schema (v2.0 · 2026-04-22)
-- 核心理念：家长注册创建 Family（家庭账号），Family 下有家长成员和孩子档案
-- 独立于高考志愿系统（users 表），两套账号并存，可通过手机号打通
-- Deploy: wrangler d1 execute meoffer-gaokao --remote --file=db/schema_auth.sql

-- ========== 家庭账号表（= 主账号载体） ==========
CREATE TABLE IF NOT EXISTS families (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	family_name		TEXT NOT NULL,			-- 吕同学之家 / 张家
	family_motto	TEXT,					-- 家训（选填，增加仪式感）
	avatar_url		TEXT,
	province		TEXT,
	city			TEXT,
	invite_code		TEXT UNIQUE,			-- 邀请码 FAM-8K3D2X
	total_paid		INTEGER DEFAULT 0,		-- 家庭累计付费
	vip_level		INTEGER DEFAULT 0,		-- 0 普通 / 1 季度 / 2 年度 / 3 终身
	vip_expires_at	TEXT,
	created_at		TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_families_invite ON families(invite_code);


-- ========== 家长成员表（Family 下的家长） ==========
CREATE TABLE IF NOT EXISTS parents (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	family_id		INTEGER NOT NULL,
	phone			TEXT UNIQUE NOT NULL,
	wx_openid		TEXT UNIQUE,
	nickname		TEXT,
	real_name		TEXT,
	avatar_url		TEXT,
	relation		TEXT,					-- 'father' | 'mother' | 'guardian' | 'grandparent'
	is_owner		INTEGER DEFAULT 0,		-- 1 = 家庭创始人（首个注册者）
	created_at		TEXT DEFAULT (datetime('now')),
	last_login_at	TEXT,
	FOREIGN KEY (family_id) REFERENCES families(id)
);

CREATE INDEX IF NOT EXISTS idx_parents_phone ON parents(phone);
CREATE INDEX IF NOT EXISTS idx_parents_wx ON parents(wx_openid);
CREATE INDEX IF NOT EXISTS idx_parents_family ON parents(family_id);


-- ========== 孩子档案表（Family 下的孩子，可有多个） ==========
CREATE TABLE IF NOT EXISTS students (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	family_id		INTEGER NOT NULL,
	real_name		TEXT NOT NULL,			-- 吕同学
	nickname		TEXT,					-- 小吕
	gender			TEXT,					-- 'male' | 'female'
	avatar_url		TEXT,
	grade			TEXT NOT NULL,			-- '高一' | '高二' | '高三'
	province		TEXT,
	school_name		TEXT,
	class_name		TEXT,
	birthday		TEXT,
	target_score	INTEGER,
	target_univ		TEXT,
	subject_type	TEXT,					-- 物理类 / 历史类
	subjects		TEXT,					-- JSON: ["物理","化学","生物"]
	created_at		TEXT DEFAULT (datetime('now')),
	active			INTEGER DEFAULT 1,
	FOREIGN KEY (family_id) REFERENCES families(id)
);

CREATE INDEX IF NOT EXISTS idx_students_family ON students(family_id);
CREATE INDEX IF NOT EXISTS idx_students_active ON students(active);


-- ========== 陪跑会话 token 表（独立于志愿系统的 user_sessions） ==========
CREATE TABLE IF NOT EXISTS parent_sessions (
	token			TEXT PRIMARY KEY,
	parent_id		INTEGER NOT NULL,
	family_id		INTEGER NOT NULL,
	current_student_id	INTEGER,			-- 当前陪跑哪个孩子
	expires_at		TEXT NOT NULL,
	ip_address		TEXT,
	user_agent		TEXT,
	created_at		TEXT DEFAULT (datetime('now')),
	FOREIGN KEY (parent_id) REFERENCES parents(id),
	FOREIGN KEY (family_id) REFERENCES families(id),
	FOREIGN KEY (current_student_id) REFERENCES students(id)
);

CREATE INDEX IF NOT EXISTS idx_sessions_parent ON parent_sessions(parent_id);
CREATE INDEX IF NOT EXISTS idx_sessions_family ON parent_sessions(family_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON parent_sessions(expires_at);


-- ========== 短信验证码表（测试期不用） ==========
CREATE TABLE IF NOT EXISTS sms_codes (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	phone			TEXT NOT NULL,
	code			TEXT NOT NULL,
	expires_at		TEXT NOT NULL,
	verified		INTEGER DEFAULT 0,
	created_at		TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sms_phone ON sms_codes(phone);
