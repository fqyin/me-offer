#!/usr/bin/env python3
# Me Offer · 山东 2020-2025 全年一分一段表解析入库
# 兼容 xls 二进制格式和 HTML 表格格式

import os
import pandas as pd
import xlrd

DATA_DIR							= os.path.join(os.path.dirname(__file__), '..', 'data_raw')
OUT_SQL								= os.path.join(DATA_DIR, 'segments_all_insert.sql')

YEAR_FILES							= {
	2025:							'sd_2025_segment.xls',
	2024:							'sd_2024_segment.xls',
	2023:							'sd_2023_segment.xls',
	2022:							'sd_2022_segment.xls',
	2021:							'sd_2021_segment.xls'
}

YEAR_SOURCES						= {
	2025:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6943',
	2024:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6577',
	2023:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6212',
	2022:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=5794',
	2021:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=5458'
}

SUBJECT_KEYWORDS					= {
	'total':						['全体'],
	'physics':						['物理'],
	'chemistry':					['化学'],
	'biology':						['生物'],
	'politics':						['政治'],
	'history':						['历史'],
	'geography':					['地理']
}


def load_as_dataframe(xls_path):
	# 判断文件类型
	with open(xls_path, 'rb') as f:
		head						= f.read(8)

	try:
		if head[:5] == b'<html' or head[:4] == b'<!DO':
			# HTML 格式 (2020 专用)
			tables					= pd.read_html(xls_path, encoding='utf-8', header=None)
			return tables[0]
		else:
			# 二进制 xls · 用 xlrd 读取转 DataFrame
			wb						= xlrd.open_workbook(xls_path)
			sh						= wb.sheet_by_index(0)
			data					= []
			for r in range(sh.nrows):
				data.append([sh.cell_value(r, c) for c in range(sh.ncols)])
			return pd.DataFrame(data)
	except Exception as e:
		print('load error:', e)
		return None


def detect_subject_columns(df):
	# 扫描前 6 行表头找每科列位置
	headers							= {}
	for r in range(min(6, len(df))):
		for c in range(df.shape[1]):
			val						= str(df.iat[r, c]).strip() if pd.notna(df.iat[r, c]) else ''
			for subj, keywords in SUBJECT_KEYWORDS.items():
				if subj in headers:
					continue
				for kw in keywords:
					if kw in val and '分段' not in val and '分数' not in val:
						headers[subj] = c
						break

	# 每科占 2 列
	result							= {}
	for subj, col in headers.items():
		result[subj]				= (col, col + 1)
	return result


def parse_one(xls_path, year):
	df								= load_as_dataframe(xls_path)
	if df is None:
		return []

	cols							= detect_subject_columns(df)
	print('  year', year, 'columns detected:', {k: v[0] for k, v in cols.items()})

	rows							= []
	for r in range(len(df)):
		col0_val					= df.iat[r, 0]
		try:
			score					= int(float(str(col0_val).strip()))
		except (ValueError, TypeError):
			continue

		if score < 100 or score > 750:
			continue

		for subj, (seg_col, cum_col) in cols.items():
			if seg_col >= df.shape[1] or cum_col >= df.shape[1]:
				continue

			cnt_raw					= df.iat[r, seg_col]
			rk_raw					= df.iat[r, cum_col]

			try:
				count				= int(float(str(cnt_raw).strip())) if pd.notna(cnt_raw) and str(cnt_raw).strip() != '' else 0
				rank				= int(float(str(rk_raw).strip())) if pd.notna(rk_raw) and str(rk_raw).strip() != '' else 0
			except (ValueError, TypeError):
				continue

			if rank == 0:
				continue

			rows.append((year, subj, score, rank, count))

	return rows


def main():
	all_rows						= []
	for year, fname in YEAR_FILES.items():
		fpath						= os.path.join(DATA_DIR, fname)
		if not os.path.exists(fpath):
			print('MISSING:', fname)
			continue

		rows						= parse_one(fpath, year)
		print('year', year, ':', len(rows), 'rows')
		all_rows.extend(rows)

	print('\ntotal:', len(all_rows))

	with open(OUT_SQL, 'w', encoding='utf-8') as f:
		f.write('-- Me Offer · 山东 2020-2025 一分一段表（全量）\n')
		f.write('-- Sources:\n')
		for y, url in YEAR_SOURCES.items():
			f.write('--   ' + str(y) + ': ' + url + '\n')
		f.write('\n')
		f.write('DELETE FROM gaokao_segments WHERE year BETWEEN 2020 AND 2025;\n\n')

		BATCH						= 500
		for i in range(0, len(all_rows), BATCH):
			batch					= all_rows[i:i+BATCH]
			values					= []
			for (y, s, sc, rk, ct) in batch:
				src					= YEAR_SOURCES.get(y, '')
				values.append("(" + str(y) + ",'shandong','" + s + "'," + str(sc) + "," + str(rk) + "," + str(ct) + ",'" + src + "')")

			f.write('INSERT INTO gaokao_segments (year, province, subject_type, score, rank, count, source_url) VALUES\n')
			f.write(',\n'.join(values))
			f.write(';\n\n')

	print('saved:', OUT_SQL)


if __name__ == '__main__':
	main()
