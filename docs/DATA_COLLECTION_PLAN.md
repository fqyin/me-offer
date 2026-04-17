# 全国 31 省数据采集执行计划

> 目标：把每个省 5 年一分一段表 + 5 年投档数据采集入库
> 规模：约 10 万+ 条记录，30+ 源文件
> 推荐执行环境：**芬兰 Puppeteer 服务器**（本地/Cloudflare Workers 受反爬限制）

---

## 📋 数据源清单（31 省官方考试院）

| 优先级 | 省份 | 官方地址 | 特点 |
|---|---|---|---|
| P1 | 山东 | sdzk.cn | ✅ 已完成 5 年 |
| P2 | **河北** | hebeea.edu.cn | 专业+院校 模式，与山东类似 |
| P2 | **河南** | heao.com.cn | 2025 首年新高考，只采 2025 |
| P2 | **辽宁** | lnzsks.com | 112 志愿，数据量最大 |
| P3 | 广东 | eea.gd.gov.cn | 院校专业组，数据结构不同 |
| P3 | 江苏 | jseea.cn | 院校专业组 |
| P3 | 重庆 | cqksy.cn | 专业+院校 |
| P4 | 北京 | bjeea.cn | 院校专业组，数据少 |
| P4 | 上海 | shmeea.edu.cn | 院校专业组 |
| P4 | 天津 | zhaokao.net | 专业+院校 |
| P4 | 四川 | sceea.cn | 2025 新高考 |
| P4 | 陕西 | sneac.com | 2025 新高考 |
| P4 | 湖北 | hbea.edu.cn | 院校专业组 |
| P4 | 湖南 | hneao.edu.cn | 院校专业组 |
| P5 | 福建、江西、浙江、安徽、甘肃、云南、贵州、山西、广西、宁夏、黑龙江、吉林 | 各省考试院 | - |
| P9 | 内蒙古、新疆、西藏 | - | 传统文理，不扩展 |

---

## 🛠 采集方案（3 种，按反爬难度）

### 方案 A · 本地 Puppeteer（最可靠，已有基础设施）
```
芬兰服务器 Puppeteer 集群
  ├── 住宅代理 IP 池
  ├── Playwright 浏览器上下文
  └── 自动模拟用户行为（滚动/点击）
```
- 对 90% 省份有效
- 预计 2-3 天跑完 31 省

### 方案 B · 第三方聚合站点（兜底）
```
中国教育在线 gaokao.eol.cn
阳光高考网 gaokao.chsi.com.cn
掌上高考 gaokao.eol.cn
大学生必备网 dxsbb.com
高考 100 gk100.com
```
- 数据是官方转载，可信
- 反爬相对弱

### 方案 C · 购买商业数据（最后兜底）
- 夸克高考开放 API
- 优志愿 API（¥2000-8000/年）
- 腾讯云高考志愿数据

---

## 📦 数据表导入格式

已设计好字段，直接 INSERT 即可：

```sql
-- 一分一段表
INSERT INTO gaokao_segments (year, province, subject_type, score, rank, count, source_url)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- 投档数据
INSERT INTO gaokao_scores (year, province, school_code, school_name, group_code, group_name, min_score, min_rank, plan_count, subject_require, source_url)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
```

---

## 🎯 推荐执行路径

### 本地（我）能做的：
1. ✅ universities / university_mapping（已完成）
2. ✅ majors / majors_ext / health_restrictions（已完成）
3. ✅ provinces 31 省配置（已完成）
4. ✅ 标准化导入脚本框架
5. ⚠️ 小范围 WebFetch 补数据（非大批量）

### 芬兰服务器能做的（推荐）：
1. 拉取每省考试院官网 xls/pdf
2. 用 pandas + xlrd + pdfplumber 解析
3. 生成标准 SQL
4. 批量 INSERT 到 D1

### 执行命令示例（芬兰服务器）：
```bash
# 在 204.168.198.130 上
cd /root/me-offer-scraper

# 单省采集
python3 scrape_province.py --province hebei --years 2021-2025

# 批量采集
python3 scrape_all_provinces.py --priority P2

# 生成 SQL 发到本地
python3 gen_sql.py --province hebei > hebei_insert.sql
scp hebei_insert.sql local:/path/me-offer/data_raw/
```

---

## 📊 数据量预估

| 维度 | 每省每年 | 31 省 5 年 |
|---|---|---|
| 一分一段 | ~600 行 | ~93,000 行 |
| 投档记录 | ~20,000 行 | ~3,100,000 行 |
| 招生计划 | ~30,000 行 | ~900,000 行 |

**合计约 410 万行**，Cloudflare D1 10GB 免费额度**完全够用**（当前山东 5 年 96K 行 = 20MB，算下来 30 省 = 600MB）。

---

## ⏱ 时间线估算

| 阶段 | 时间 | 交付 |
|---|---|---|
| Phase 1（已完成） | 2 天 | 基础表 + 山东 5 年完整 |
| Phase 2（现在） | 1 天 | 扩展 5 张空表填充 |
| Phase 3 | 3-5 天 | 芬兰服务器爬 10 个核心省 |
| Phase 4 | 1 周 | 其他 20 省 |
| Phase 5 | 3 天 | 数据质检 + 算法适配 + 上线 |

**总周期**：2-3 周完成全国 28 省（3 个不支持省跳过）
