import pdfplumber
import json
import re
import time

pdf_path = "/Users/fuqiangyin/Code-Files/me-offer/data_raw/pdf/sd_2025_bk_subject_require.pdf"
out_path = "/Users/fuqiangyin/Code-Files/me-offer/data_raw/subject_require_2025_shandong.json"


def parse_require(require_raw):
    # 返回 (first, second[])
    # first: 物理/历史/不限
    # second: [化学, 生物, 思想政治, 地理]
    if not require_raw:
        return ("不限", [])
    text = require_raw.replace("\n", "").strip()
    if "不提科目要求" in text:
        return ("不限", [])
    # 去掉括号里的说明
    clean = re.sub(r"\([^)]*\)", "", text)
    clean = re.sub(r"（[^）]*）", "", clean)
    subjects = re.split(r"[,，、和或]", clean)
    subjects = [s.strip() for s in subjects if s.strip()]
    first = "不限"
    second = []
    for s in subjects:
        if s in ("物理", "历史"):
            if first == "不限":
                first = s
            else:
                # 两个首选同时出现（物理或历史）
                first = "物理或历史"
        elif s in ("化学", "生物", "思想政治", "政治", "地理"):
            if s == "政治":
                s = "思想政治"
            if s not in second:
                second.append(s)
    return (first, second)


def extract_all():
    rows = []
    seen = set()
    t0 = time.time()
    with pdfplumber.open(pdf_path) as pdf:
        total = len(pdf.pages)
        print("Total pages:", total)
        for idx, page in enumerate(pdf.pages):
            tables = page.extract_tables()
            if not tables:
                continue
            for table in tables:
                for row in table:
                    if not row or len(row) < 5:
                        continue
                    school_code = (row[0] or "").strip()
                    school_name = (row[1] or "").strip()
                    major_code = (row[2] or "").strip()
                    major_name = (row[3] or "").strip().replace("\n", "")
                    require_raw = (row[4] or "").strip().replace("\n", "")
                    province = (row[5] or "").strip() if len(row) > 5 else ""
                    # 跳过表头
                    if school_code == "院校代码" or "代码" in school_code:
                        continue
                    if not school_code or not school_name:
                        continue
                    if not school_code.isdigit():
                        continue
                    key = (school_code, major_code, major_name)
                    if key in seen:
                        continue
                    seen.add(key)
                    first, second = parse_require(require_raw)
                    rows.append({
                        "school_code": school_code,
                        "school_name": school_name,
                        "major_code": major_code,
                        "major_name": major_name,
                        "require_raw": require_raw,
                        "require_first": first,
                        "require_second": second,
                        "school_province": province,
                    })
            if (idx + 1) % 100 == 0:
                elapsed = time.time() - t0
                print("page " + str(idx + 1) + "/" + str(total) + ", rows=" + str(len(rows)) + ", elapsed=" + str(round(elapsed, 1)) + "s")
    return rows


def main():
    rows = extract_all()
    print("Total rows:", len(rows))
    # 统计
    schools = set()
    for r in rows:
        schools.add(r["school_name"])
    print("Unique schools:", len(schools))
    # 看下 require_first 分布
    first_counter = {}
    for r in rows:
        k = r["require_first"]
        first_counter[k] = first_counter.get(k, 0) + 1
    print("First distribution:", first_counter)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    print("Saved to:", out_path)


main()
