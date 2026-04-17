#!/usr/bin/env python3
# Me Offer · 山东 2021-2025 全年投档表解析入库

import os
import re
import xlrd
import pandas as pd

DATA_DIR							= os.path.join(os.path.dirname(__file__), '..', 'data_raw')
OUT_SQL								= os.path.join(DATA_DIR, 'toudang_all_insert.sql')

YEAR_FILES							= {
	2025:							'sd_2025_toudang.xls',
	2024:							'sd_2024_toudang.xls',
	2023:							'sd_2023_toudang.xls',
	2022:							'sd_2022_toudang.xls',
	2021:							'sd_2021_toudang.xls'
}

YEAR_SOURCES						= {
	2025:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6996',
	2024:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6656',
	2023:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6279',
	2022:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=5846',
	2021:							'https://www.sdzk.cn/NewsInfo.aspx?NewsID=5509'
}


def load_as_dataframe(xls_path):
	with open(xls_path, 'rb') as f:
		head						= f.read(8)

	try:
		if head[:5] == b'<html' or head[:4] == b'<!DO':
			tables					= pd.read_html(xls_path, encoding='utf-8', header=None)
			return tables[0]
		else:
			wb						= xlrd.open_workbook(xls_path)
			sh						= wb.sheet_by_index(0)
			data					= []
			for r in range(sh.nrows):
				data.append([sh.cell_value(r, c) for c in range(sh.ncols)])
			return pd.DataFrame(data)
	except Exception as e:
		print('load error:', e)
		return None


def detect_columns(df):
	# 自动找关键列
	major_col						= -1
	school_col						= -1
	plan_col						= -1
	rank_col						= -1

	for r in range(min(8, len(df))):
		for c in range(df.shape[1]):
			val						= str(df.iat[r, c]).strip() if pd.notna(df.iat[r, c]) else ''
			if val == '专业' or ('专业' in val and ('代号' in val or val == '专业')) and major_col < 0:
				if major_col < 0:
					major_col		= c
			elif val == '院校' or ('院校' in val and ('代号' in val or val == '院校')) and school_col < 0:
				if school_col < 0:
					school_col		= c
			elif '投档' in val and '计划' in val and plan_col < 0:
				plan_col			= c
			elif '最低位次' in val and rank_col < 0:
				rank_col			= c

	return major_col, school_col, plan_col, rank_col


def parse_school(cell):
	m								= re.match(r'^([A-Z]\d{3}[A-Z]?)(.+)$', cell.strip())
	if m:
		return m.group(1), m.group(2).strip()
	return '', cell.strip()


def parse_major(cell):
	m								= re.match(r'^(\d{2})(.+)$', cell.strip())
	if m:
		return m.group(1), m.group(2).strip()
	return '', cell.strip()


def parse_one(xls_path, year):
	df								= load_as_dataframe(xls_path)
	if df is None:
		return []

	major_col, school_col, plan_col, rank_col = detect_columns(df)
	print('  year', year, 'cols: major=' + str(major_col), 'school=' + str(school_col), 'plan=' + str(plan_col), 'rank=' + str(rank_col))

	if major_col < 0 or school_col < 0 or rank_col < 0:
		print('  ERROR: columns not detected')
		return []

	rows							= []
	for r in range(len(df)):
		major_cell					= str(df.iat[r, major_col]).strip() if pd.notna(df.iat[r, major_col]) else ''
		school_cell					= str(df.iat[r, school_col]).strip() if pd.notna(df.iat[r, school_col]) else ''

		if not major_cell or not school_cell:
			continue
		if '专业' in major_cell and '代号' in major_cell:	# header row
			continue

		try:
			plan_count				= int(float(df.iat[r, plan_col])) if plan_col >= 0 and pd.notna(df.iat[r, plan_col]) else 0
			min_rank				= int(float(df.iat[r, rank_col])) if pd.notna(df.iat[r, rank_col]) else 0
		except (ValueError, TypeError):
			continue

		if min_rank == 0:
			continue

		school_code, school_name	= parse_school(school_cell)
		group_code, group_name		= parse_major(major_cell)

		rows.append({
			'year':					year,
			'school_code':			school_code,
			'school_name':			school_name,
			'group_code':			group_code,
			'group_name':			group_name,
			'plan_count':			plan_count,
			'min_rank':				min_rank
		})

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
		f.write('-- Me Offer · 山东 2021-2025 投档表全量\n')
		f.write('-- Sources:\n')
		for y, u in YEAR_SOURCES.items():
			f.write('--   ' + str(y) + ': ' + u + '\n')
		f.write('\n')
		f.write('DELETE FROM gaokao_scores WHERE year BETWEEN 2021 AND 2025;\n\n')

		BATCH						= 500
		for i in range(0, len(all_rows), BATCH):
			batch					= all_rows[i:i+BATCH]
			values					= []
			for r in batch:
				sn					= r['school_name'].replace("'", "''")
				gn					= r['group_name'].replace("'", "''")
				src					= YEAR_SOURCES.get(r['year'], '')
				values.append(
					"(" + str(r['year']) + ",'shandong','" + r['school_code'] + "','" + sn + "','" + r['group_code'] + "','" + gn + "'," + str(r['min_rank']) + "," + str(r['plan_count']) + ",'" + src + "')"
				)

			f.write('INSERT INTO gaokao_scores (year, province, school_code, school_name, group_code, group_name, min_rank, plan_count, source_url) VALUES\n')
			f.write(',\n'.join(values))
			f.write(';\n\n')

	print('saved:', OUT_SQL)


if __name__ == '__main__':
	main()
