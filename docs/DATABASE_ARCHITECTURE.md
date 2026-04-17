# Me Offer 数据库架构 v2

> Last Updated: 2026-04-17
> Database: Cloudflare D1 `meoffer-gaokao` (EEUR region)
> Purpose: 支持全国 31 省高考志愿填报的可扩展架构

---

## 1. 总体设计

采用**扁平关系型结构**，所有表在同一 D1 实例内。

```
┌─────────────────────────────────────────────────────┐
│  Cloudflare D1 数据库 · meoffer-gaokao              │
│                                                      │
│  ┌─── 省份配置层（新）──────────────────────────┐   │
│  │  provinces (31 行)                           │   │
│  └──────────────────────────────────────────────┘   │
│                   ↓                                  │
│  ┌─── 核心业务层（扩展中）────────────────────┐     │
│  │  gaokao_scores (96K+ 行，可扩省)           │     │
│  │  gaokao_segments (18K+ 行，可扩省)         │     │
│  │  gaokao_plans_{year} (按年份)              │     │
│  └──────────────────────────────────────────────┘   │
│                   ↓                                  │
│  ┌─── 公共资源层（全国统一）────────────────┐     │
│  │  universities (2,868 所)                    │     │
│  │  university_mapping (修正数据)              │     │
│  │  majors (~800 专业)                         │     │
│  │  majors_ext (扩展属性)                      │     │
│  │  health_restrictions (体检受限)             │     │
│  └──────────────────────────────────────────────┘   │
│                   ↓                                  │
│  ┌─── 运营层 ────────────────────────────────┐     │
│  │  orders (订单)                              │     │
│  │  waitlist (邮箱)                            │     │
│  │  province_import_log (数据导入审计)         │     │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 2. 表清单（共 12 张）

### 📋 provinces · 31 省高考规则配置（核心新表）

| 字段 | 类型 | 说明 |
|---|---|---|
| code | TEXT PK | shandong / hebei / beijing ... |
| name | TEXT | 山东省 |
| name_short | TEXT | 山东 |
| reform_year | INTEGER | 新高考改革年（2017-2025），null=未改革 |
| reform_type | TEXT | 3+3 / 3+1+2 / 传统文理 |
| model | TEXT | **专业+院校** / **院校专业组** / 院校志愿 |
| batches_json | TEXT | JSON 数组：批次+志愿数 |
| chong_count / wen_count / bao_count | INTEGER | 冲稳保分档 |
| subject_select | TEXT | 选科规则说明 |
| special_notes | TEXT | JSON 特殊说明 |
| data_status | TEXT | pending / partial / complete / not_supported |
| recommended_priority | INTEGER | 开发优先级 1-9 |

**31 省分布**：
- 专业+院校模式（8 省）：山东✓、河北、辽宁、重庆、青海、天津、浙江、海南
- 院校专业组模式（20 省）：广东、江苏、北京、上海等
- 传统文理（3 省）：内蒙古、新疆、西藏（暂不支持）

### 🎯 gaokao_scores · 投档数据（已支持多省）

| 字段 | 类型 | 说明 |
|---|---|---|
| id | INTEGER PK | 自增 |
| year | INTEGER | 年份 |
| **province** | TEXT | **考生省份** code（shandong/hebei...）⭐ 扩展关键 |
| school_code | TEXT | 考试院本省代码（山东用 4 位 A422） |
| school_name | TEXT | 山东大学 |
| group_code | TEXT | 专业组代码 |
| group_name | TEXT | 计算机科学与技术 |
| subject_require | TEXT | 选科要求 |
| min_score | INTEGER | 最低投档分 |
| min_rank | INTEGER | 最低位次 |
| plan_count | INTEGER | 招生计划数 |
| actual_count | INTEGER | 实录人数 |
| tuition | INTEGER | 学费 |
| source_url | TEXT | 原始数据来源 |

**扩省 SQL 示例**：
```sql
INSERT INTO gaokao_scores (year, province, school_code, school_name, group_name, min_rank, plan_count)
VALUES (2025, 'hebei', '10001', '北京大学', '元培学院', 80, 10);
```

### 📊 gaokao_segments · 一分一段表（已支持多省）

| 字段 | 类型 | 说明 |
|---|---|---|
| year | INTEGER | 年份 |
| **province** | TEXT | **考生省份** ⭐ |
| subject_type | TEXT | total / physics / chemistry ... |
| score | INTEGER | 分数 |
| rank | INTEGER | 累计位次 |
| count | INTEGER | 本段人数 |

### 🏫 universities · 全国高校（公共资源）

| 字段 | 类型 | 说明 |
|---|---|---|
| code | TEXT PK | 教育部 10 位国标代码 |
| name | TEXT | 山东大学 |
| province | TEXT | ⚠️ 当前存的是城市（待修正） |
| city | TEXT | 当前为空 |
| tier | TEXT | 985 / 211 / 普通本科 / 专科 |
| nature | TEXT | 公办 / 民办 / 中外合作 |
| rank_ruanke | INTEGER | 软科排名 |

### 🔧 university_mapping · 高校修正映射（新表）

为了修正 universities 的省份错误字段，新建这张映射表。

| 字段 | 说明 |
|---|---|
| school_name | 山东大学（主键，按校名匹配） |
| province_code | shandong |
| province_name | 山东省 |
| city | 济南 |
| tier / nature | 同 universities |
| is_985 / is_211 / is_double_first | 0/1 布尔 |
| rank_ruanke_2024 / rank_qs_2024 | 排名 |
| established_year | 建校年 |
| features_json | 特色标签（航空/艺术/财经） |

### 🎓 majors + majors_ext · 专业目录

| 字段 | 说明 |
|---|---|
| code / name | 专业代码和名称 |
| category / subcategory | 学科门类 / 一级学科 |
| degree_years | 学制（4 年） |
| tuition_yuan | 学费 |
| employment_rate | 就业率（麦可思） |
| starting_salary / job_5yr_salary | 起薪 / 5 年后薪资 |
| masters_rate | 考研率 |
| heat_score | 热门度 1-100 |
| top_employers_json | 主要雇主 |

### 🩺 health_restrictions · 体检受限专业

### 💰 orders · 订单
### 📧 waitlist · 邮箱等待
### 📝 province_import_log · 数据导入审计（新表）

---

## 3. 数据源策略

### 分省数据来源

| 省份 | 一分一段表 | 投档表 | 招生计划 |
|---|---|---|---|
| 山东 ✓ | sdzk.cn | sdzk.cn | sdzk.cn |
| 河北 | hebeea.edu.cn | 同 | 同 |
| 北京 | bjeea.cn | 同 | 同 |
| 辽宁 | lnzsks.com | 同 | 同 |
| 广东 | eea.gd.gov.cn | 同 | 同 |
| 江苏 | jseea.cn | 同 | 同 |
| 其他省 | 各省教育考试院官网 | | |

### 公共数据来源

- **全国高校名单**：教育部 moe.gov.cn（2024-06）
- **专业目录**：教育部《普通高等学校本科专业目录》
- **就业数据**：麦可思《中国本科生就业报告》2024
- **体检限制**：教育部《普通高等学校招生体检工作指导意见》
- **软科排名**：shanghairanking.cn
- **QS 排名**：topuniversities.com

---

## 4. 扩展新省份的标准流程

以扩展"河北省"为例：

### Step 1. 确认配置
```sql
SELECT * FROM provinces WHERE code='hebei';
-- 已有配置：reform_year=2021, model='专业+院校', 96 志愿
```

### Step 2. 采集数据
```bash
scripts/21_fetch_hebei_segments.py      # 一分一段表
scripts/22_fetch_hebei_toudang.py       # 投档表
scripts/23_fetch_hebei_plans.py         # 招生计划
```

### Step 3. 数据入库
```sql
-- 所有 INSERT 都带 province='hebei'
INSERT INTO gaokao_segments (year, province, subject_type, score, rank, count, source_url)
VALUES (2025, 'hebei', 'physics', 600, 15000, 500, 'https://...');

INSERT INTO gaokao_scores (year, province, school_code, ...)
VALUES (2025, 'hebei', ...);
```

### Step 4. 算法参数调整
```js
// generate_96.js 接收 body.province 参数
const province_config = await getProvinceConfig(body.province);
const chong_count = province_config.chong_count;      // 河北也是 24
const wen_count = province_config.wen_count;          // 48
const bao_count = province_config.bao_count;          // 24
```

### Step 5. 前端 Step 1 省份下拉开放
```html
<option value="hebei">河北（3+1+2 新高考）</option>
```

### Step 6. 更新 data_status
```sql
UPDATE provinces SET data_status='complete' WHERE code='hebei';
```

### Step 7. 记录审计
```sql
INSERT INTO province_import_log (province_code, year, table_name, rows_imported, source_url)
VALUES ('hebei', 2025, 'gaokao_scores', 18500, 'https://...');
```

---

## 5. 模式差异处理

### A. "专业+院校" 模式（山东/河北/辽宁/重庆/青海/天津/浙江/海南）

- 每个 volunteer = 1 学校 + 1 专业
- 算法：直接按 min_rank 排序匹配
- 前端：志愿列表 1 行 = 1 志愿

### B. "院校专业组" 模式（广东/江苏/北京/上海等 20 省）

- 每个 volunteer = 1 学校的 1 个专业组（含 1-6 个专业）
- 算法改动：
  - scores 表按 `school_code + group_code` 聚合
  - 推荐时返回每组的 6 个可选专业
  - 加"是否服从调剂"选项
- 前端：志愿列表 1 行 = 1 专业组 + 展开 6 专业

### C. "传统文理" 模式（内蒙古/新疆/西藏）

- 文科/理科分别投档
- 算法改动：加 art/science 分支
- 志愿数少（6-12 个）
- 当前**标记 data_status='not_supported'**

---

## 6. 数据量预估

| 省份 | scores 行数/年 | segments 行数/年 |
|---|---|---|
| 山东（已采集 5 年） | ~20,000 | ~3,700 |
| 河北（预计） | ~22,000 | ~3,500 |
| 北京 | ~6,000 | ~2,000 |
| 全国 31 省 5 年总计 | ~2,500,000 | ~450,000 |

**D1 免费额度**：10GB 存储，5M 读/天
- 当前 20MB，距上限非常远
- 扩到 10 省 5 年约 500MB，仍在免费额度内

---

## 7. 性能索引

```sql
CREATE INDEX idx_segments_year_score ON gaokao_segments(year, score);
CREATE INDEX idx_segments_year_rank ON gaokao_segments(year, rank);
CREATE INDEX idx_scores_year_rank ON gaokao_scores(year, min_rank);
CREATE INDEX idx_scores_school_year ON gaokao_scores(school_code, year);
CREATE INDEX idx_mapping_province ON university_mapping(province_code);
CREATE INDEX idx_mapping_tier ON university_mapping(tier);
CREATE INDEX idx_plans_school ON gaokao_plans_2025(school_code);
CREATE UNIQUE INDEX idx_waitlist_email_type ON waitlist(email, type);
CREATE INDEX idx_orders_status ON orders(status);
```

---

## 8. 开发路线图（按 provinces.recommended_priority）

### Priority 1 · 山东 ✓（已完成）
- 数据：2021-2025 完整
- 算法：位次匹配 + 冲稳保
- 前端：完整 5 分钟流程

### Priority 2 · 河北、河南（2026 Q1）
- 同"专业+院校"模式，复用 80% 代码
- 河南是考生最多省（百万+）

### Priority 3 · 辽宁、广东、江苏（2026 Q2）
- 辽宁继续"专业+院校"（112 志愿）
- 广东/江苏切换到"院校专业组"，算法大改

### Priority 4 · 北京、天津、重庆、四川、陕西（2026 Q3）
- 配合城市偏好，这些省考生"跨省报考"需求大

### Priority 5 · 其余 20+ 省（2026 Q4）

### Priority 9 · 内蒙古/新疆/西藏（暂不支持）

---

## 9. 合规与数据治理

### 数据来源可追溯
所有入库记录必须包含 `source_url` 字段：
```sql
INSERT INTO gaokao_scores (..., source_url)
VALUES (..., 'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6656');
```

### 数据准确性保障
- 导入后 Python 脚本**抽样 5% 与官网对照**
- `province_import_log` 记录每次数据导入的时间、行数、来源
- 错误数据可通过 `source_url` 快速溯源

### 数据更新周期
- **一分一段表**：每年 6 月 25 日前后官方公布
- **投档表**：每年 7 月各批次投档后公布
- **招生计划**：每年 4-5 月公布
- **院校名单**：每年 6 月教育部更新

---

## 10. 快速查询 Cheatsheet

```sql
-- 查某省配置
SELECT * FROM provinces WHERE code = 'shandong';

-- 查该省所有"已支持"院校数
SELECT province, COUNT(DISTINCT school_name) FROM gaokao_scores
WHERE province = 'shandong' AND year = 2025
GROUP BY province;

-- 查某分数在多少位次（山东 2025）
SELECT * FROM gaokao_segments
WHERE year = 2025 AND province = 'shandong' AND subject_type = 'total' AND score = 600;

-- 查山东大学近 5 年位次走势
SELECT year, MIN(min_rank) AS top_rank FROM gaokao_scores
WHERE school_name = '山东大学' AND year BETWEEN 2021 AND 2025
GROUP BY year ORDER BY year;

-- 查"已完整采集"的省份
SELECT code, name, data_status FROM provinces
WHERE data_status = 'complete';

-- 查全国 985 高校
SELECT code, name FROM universities WHERE tier = '985' ORDER BY name;
```
