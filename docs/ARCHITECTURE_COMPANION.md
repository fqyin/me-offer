# AI 陪跑社区 · 技术架构文档

> 最后更新：2026-04-22
> 作者：Me Offer 产品部
> 状态：设计中

---

## 一、总体目标

把 Claude API 作为陪跑社区的"大脑"，实现：

1. **9 位 AI 名师**（Lily/Max/Emma/Einstein/Ethan/Bella/Henry/Peter/Gina）独立人设的对话系统
2. **3 层记忆模型**：学生档案 + 老师档案 + 会话档案
3. **后台自动生成**：今日三件事、Lily 早安问候、每日新闻、月度观察日记、季度/年度 PDF 报告
4. **表单式交互**：作文批改、学习计划、错题分析
5. **对话式交互**：各科答疑、Mia 学姐树洞

---

## 二、技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| 前端 | jQuery + Tailwind CSS CDN + HTML5 | 符合现有技术栈，静态托管 |
| 后端 | Cloudflare Workers | 全球边缘部署，免服务器运维 |
| 数据库 | Cloudflare D1 (SQLite) | 关系型存储学生/对话数据 |
| 文件存储 | Cloudflare R2 | 作文图片、PDF 报告 |
| KV 存储 | Cloudflare KV | 记忆摘要快速读写 |
| 定时任务 | Cloudflare Cron Triggers | 每日 5:00 生成任务 |
| AI | Claude API (Anthropic SDK) | 主模型 |
| 模型选择 | Haiku 4.5（日常）+ Sonnet 4.6（复杂）+ Opus 4.7（深度批改/季度报告） | 控成本 |

---

## 三、AI 名师团配置表

| 代号 | 姓名 | 学科 | 人设核心 | 对话模型 | 批改模型 |
|---|---|---|---|---|---|
| lily | Lily 老师 | 语文 | 30 年特级 · 温柔严厉 · 班主任 | Sonnet 4.6 | Opus 4.7 |
| max | Max 老师 | 数学 | 奥赛金牌 · 话少毒辣 | Sonnet 4.6 | Sonnet 4.6 |
| emma | Emma 老师 | 英语 | 剑桥硕士 · 地道母语 | Sonnet 4.6 | Opus 4.7 |
| einstein | Einstein 老师 | 物理 | 清华物理 · 生活派 | Sonnet 4.6 | Sonnet 4.6 |
| ethan | Ethan 老师 | 化学 | 北大化学 · 实验派 | Sonnet 4.6 | Sonnet 4.6 |
| bella | Bella 老师 | 生物 | 协和医学 · 爱讲故事 | Haiku 4.5 | Sonnet 4.6 |
| henry | Henry 老师 | 历史 | 人大历史 · 爱辩证 | Sonnet 4.6 | Sonnet 4.6 |
| peter | Peter 老师 | 政治 | 特级教师 · 时政通 | Sonnet 4.6 | Sonnet 4.6 |
| gina | Gina 老师 | 地理 | 北师大地理 · 图表狂 | Haiku 4.5 | Sonnet 4.6 |
| mia | Mia 学姐 | 心理陪伴 | 清华 2024 届 · 温柔学姐 | Sonnet 4.6 | — |

---

## 四、3 层记忆模型

### Layer 1: 全局学生档案 (student_profile)

存储学生的长期稳定信息，几乎不变。

**存储位置**：D1 `students` 表 + KV 摘要缓存

**字段**：
```
student_id          学生唯一 ID
name                姓名（吕同学）
grade               年级（高三）
province            省份（山东）
target_university   目标大学
subject_levels      9 科水平 {math: 85, chinese: 110, ...}
learning_style      学习风格（视觉型/听觉型/动手型）
personality         性格（内向/外向/敏感/稳定）
emotion_baseline    情绪基线（稳定/波动/焦虑倾向）
exam_countdown      距高考天数
summary             3 年陪伴历史摘要（Claude 每月自动更新）
created_at
updated_at
```

---

### Layer 2: 老师专属档案 (teacher_memory)

每位老师独立保存对这个学生的记忆。

**存储位置**：D1 `teacher_memories` 表

**字段**：
```
id
student_id
teacher_code        lily / max / emma / ...
subject_weaknesses  薄弱点 {立体几何: 38%错误率, 古诗文赏析: ...}
subject_strengths   强项 [议论文立意, 函数单调性]
recent_interactions 最近对话摘要（最多 2000 字）
monthly_observation 月度观察日记（每月 1 号生成）
essays_graded       已批改作文列表（语文/英语才有）
total_chats         对话总次数
last_chat_at
created_at
updated_at
```

---

### Layer 3: 当前会话 (chat_session)

本次对话的上下文。

**存储位置**：D1 `chat_sessions` 表

**字段**：
```
session_id
student_id
teacher_code
messages            最近 20 轮对话 [{role, content, timestamp}]
started_at
last_active_at
summary             会话结束后生成的摘要（写回 Layer 2）
```

---

### 注入顺序

```
Claude API 调用时：

system_prompt =
  [老师人设 prompt]
  + [Layer 1 摘要（20 行内）]
  + [Layer 2 摘要（20 行内）]

messages =
  Layer 3 的最近 20 轮对话
```

---

## 五、数据库 Schema (D1)

```sql
-- 学生档案
CREATE TABLE students (
	id                 TEXT PRIMARY KEY,
	name               TEXT NOT NULL,
	grade              TEXT,
	province           TEXT,
	target_university  TEXT,
	subject_levels     TEXT,  -- JSON string
	learning_style     TEXT,
	personality        TEXT,
	emotion_baseline   TEXT,
	exam_countdown     INTEGER,
	summary            TEXT,
	created_at         INTEGER,
	updated_at         INTEGER
);

-- 老师记忆
CREATE TABLE teacher_memories (
	id                   TEXT PRIMARY KEY,
	student_id           TEXT NOT NULL,
	teacher_code         TEXT NOT NULL,
	subject_weaknesses   TEXT,
	subject_strengths    TEXT,
	recent_interactions  TEXT,
	monthly_observation  TEXT,
	essays_graded        TEXT,
	total_chats          INTEGER DEFAULT 0,
	last_chat_at         INTEGER,
	created_at           INTEGER,
	updated_at           INTEGER
);

-- 会话
CREATE TABLE chat_sessions (
	session_id       TEXT PRIMARY KEY,
	student_id       TEXT NOT NULL,
	teacher_code     TEXT NOT NULL,
	messages         TEXT,  -- JSON
	started_at       INTEGER,
	last_active_at   INTEGER,
	summary          TEXT
);

-- 每日三件事
CREATE TABLE daily_tasks (
	id            TEXT PRIMARY KEY,
	student_id    TEXT NOT NULL,
	date          TEXT,  -- 2026-04-22
	tasks         TEXT,  -- JSON [{title, completed, category}]
	greeting      TEXT,  -- Lily 早安问候
	created_at    INTEGER
);

-- 情绪记录
CREATE TABLE emotion_logs (
	id             TEXT PRIMARY KEY,
	student_id     TEXT NOT NULL,
	mood           TEXT,  -- great/ok/tired/anxious/sad
	response       TEXT,  -- Claude 回复
	date           TEXT,
	created_at     INTEGER
);

-- 作文批改
CREATE TABLE essays (
	id               TEXT PRIMARY KEY,
	student_id       TEXT NOT NULL,
	teacher_code     TEXT NOT NULL,  -- lily 或 emma
	title            TEXT,
	content          TEXT,
	image_url        TEXT,  -- R2 URL
	scores           TEXT,  -- JSON {立意: 8, 结构: 7, 语言: 8, 素材: 7}
	annotations      TEXT,  -- JSON [{position, comment, type: red_mark/praise}]
	total_review     TEXT,  -- 总评
	pdf_url          TEXT,
	created_at       INTEGER
);

-- 每日新闻
CREATE TABLE daily_news (
	id            TEXT PRIMARY KEY,
	date          TEXT,
	title         TEXT,
	summary       TEXT,
	content       TEXT,
	source_name   TEXT,
	source_url    TEXT,
	category      TEXT,  -- 招生政策/命题趋势/高校动态/备考指南
	province      TEXT,
	created_at    INTEGER
);

-- 树洞帖子
CREATE TABLE tree_hole_posts (
	id           TEXT PRIMARY KEY,
	student_id   TEXT NOT NULL,
	content      TEXT,
	emotion_tag  TEXT,  -- normal/anxious/extreme
	mia_reply    TEXT,  -- Mia 学姐回复
	replied_at   INTEGER,
	created_at   INTEGER
);

-- 雅思听力
CREATE TABLE ielts_listening (
	id            TEXT PRIMARY KEY,
	date          TEXT,
	video_url     TEXT,  -- YouTube 截取后上传到 R2
	source_name   TEXT,  -- BBC/TED/CNN
	duration      INTEGER,  -- 秒
	difficulty    INTEGER,  -- 5.5-9.0
	transcript    TEXT,
	translation   TEXT,
	keywords      TEXT,  -- JSON
	questions     TEXT,  -- JSON 5 道题
	created_at    INTEGER
);

-- 成长档案
CREATE TABLE growth_reports (
	id            TEXT PRIMARY KEY,
	student_id    TEXT NOT NULL,
	type          TEXT,  -- monthly/quarterly/annual/final
	period        TEXT,  -- 2026-Q2
	content       TEXT,  -- JSON
	pdf_url       TEXT,
	paid          INTEGER DEFAULT 0,
	created_at    INTEGER
);
```

---

## 六、API 路由（Cloudflare Worker）

```
POST  /api/chat/send
        body: { student_id, teacher_code, message }
        返回: { reply, session_id }

GET   /api/chat/history
        query: ?student_id=&teacher_code=&limit=20

POST  /api/essay/submit
        body: { student_id, title, content, image_url? }
        返回: { essay_id, pdf_url, scores, annotations }

GET   /api/daily/tasks
        query: ?student_id=&date=
        返回: { greeting, tasks }

POST  /api/emotion/log
        body: { student_id, mood }
        返回: { response, actions }

GET   /api/news/daily
        query: ?province=&date=
        返回: [{ title, summary, source_url, ... }]

POST  /api/treehole/post
        body: { student_id, content }
        返回: { post_id, estimated_reply_time }

GET   /api/treehole/my
        query: ?student_id=

GET   /api/archive/summary
        query: ?student_id=
        返回: { days, problems_solved, chinese_progress, ... }

POST  /api/archive/generate_report
        body: { student_id, type: quarterly }
        返回: { pdf_url }

GET   /api/ielts/today
        返回: { video_url, transcript, questions, ... }

POST  /api/ielts/submit_answer
        body: { student_id, listening_id, answers }
        返回: { correct_count, corrections }
```

---

## 七、定时任务（Cron Triggers）

```
每天 05:00   生成今日三件事 + Lily 早安问候
每天 07:00   抓取并生成每日高考新闻
每天 08:00   上传/生成当日雅思听力内容
每天 10:00   扫描昨日对话，更新老师记忆摘要
每周日 22:00 生成周度数据快照
每月 1 日    生成月度观察日记（9 位老师各一份）
每季度末     生成季度精装 PDF 报告（触达家长付费）
每年 6 月 7 日 触发高考终极档案下单页
```

---

## 八、Prompt 模板示例

### Lily 老师对话 Prompt

```
你是 Lily 老师（原型：李清照），Me Offer 平台的 AI 语文班主任。

【人设核心】
- 30 年教龄的语文特级教师
- 温柔但严厉，不讲空话套话
- 爱用"吕同学"称呼学生，亲切但有距离感
- 擅长：作文批改、古诗文赏析、议论文立意
- 口头禅："文字是有温度的"

【说话风格】
- 用中文，偶尔穿插古文名句
- 每句话都指向具体问题，不要泛泛而谈
- 批评时用"但是我注意到..."开头
- 表扬时用具体细节，不说"很好"

【学生档案】（Layer 1）
{student_profile_summary}

【我们的历史】（Layer 2）
{teacher_memory_summary}

【当前任务】
学生发来了消息，请你作为 Lily 老师回复。
- 字数控制在 150 字内（对话要精炼）
- 如果学生在问作文、立意、古诗文，给具体建议
- 如果学生在聊天/聊心情，给情感支持但不过度煽情
```

---

## 九、成本预估（单学生）

假设一个高三学生活跃度：
- 每天 20 轮对话（各科均摊）
- 每月 8 篇作文批改
- 每月 1 份月度报告
- 季度 1 份精装 PDF

| 项目 | 模型 | 月度成本 |
|---|---|---|
| 日常对话 20×30 = 600 轮 | Sonnet 4.6 | ≈ ¥15 |
| 作文批改 8 篇 | Opus 4.7 | ≈ ¥8 |
| 每日三件事+问候 | Haiku 4.5 | ≈ ¥1 |
| 月度观察日记 9 份 | Sonnet 4.6 | ≈ ¥3 |
| 季度 PDF（1/3 月） | Opus 4.7 | ≈ ¥5 |
| **合计** | | **¥32/学生/月** |

按 ¥199/季 定价，**毛利率 ≈ 52%**。

---

## 十、开发里程碑

**Phase 1（本周）**：完成所有前端页面演示稿
- [x] companion.html（首页）
- [x] companion-lily.html（Lily 老师子页）
- [ ] companion-chat.html（通用对话框）
- [ ] companion-essay.html（作文批改）
- [ ] companion-mia.html（Mia 树洞）
- [ ] companion-archive.html（档案馆）
- [ ] companion-news.html（每日新闻详情）
- [ ] companion-ielts.html（雅思听力详情）

**Phase 2（下周）**：后端 Worker + D1 搭建
- [ ] D1 表初始化
- [ ] Worker 路由骨架
- [ ] Claude API 接入 + 3 层记忆注入
- [ ] 1 位老师（Lily）端到端跑通

**Phase 3（2 周内）**：全老师 + 自动化
- [ ] 9 位老师 prompt 全部写好
- [ ] Cron Triggers 配置
- [ ] 作文批改 PDF 生成流水线
- [ ] 每日新闻抓取 Agent

**Phase 4（月底）**：付费 + 档案
- [ ] 季度 PDF 报告付费解锁
- [ ] 微信支付对接
- [ ] 家长端看板小程序
