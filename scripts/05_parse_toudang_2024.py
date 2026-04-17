#!/usr/bin/env python3
# Me Offer · 山东 2024 普通类常规批第 1 次志愿投档情况表

import os
import re
import xlrd

XLS									= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'sd_2024_toudang.xls')
OUT_SQL								= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'toudang_2024_insert.sql')
SOURCE								= 'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6656'
YEAR								= 2024


def parse_school(cell):
	# 格式："A001北京大学" -> ("A001", "北京大学")
	m								= re.match(r'^([A-Z]\d{3}[A-Z]?)(.+)$', cell.strip())
	if m:
		return m.group(1), m.group(2).strip()
	return '', cell.strip()


def parse_major(cell):
	# 格式："17文科试验班类(文科基础类专业)" -> ("17", "文科试验班类(文科基础类专业)")
	m								= re.match(r'^(\d{2})(.+)$', cell.strip())
	if m:
		return m.group(1), m.group(2).strip()
	return '', cell.strip()


def main():
	wb								= xlrd.open_workbook(XLS)
	sh								= wb.sheet_by_index(0)

	rows							= []
	for r in range(2, sh.nrows):	# skip 2 header rows
		major_cell					= str(sh.cell_value(r, 1)).strip()
		school_cell					= str(sh.cell_value(r, 2)).strip()
		plan_cell					= sh.cell_value(r, 3)
		rank_cell					= sh.cell_value(r, 4)

		if not major_cell or not school_cell:
			continue

		try:
			plan_count				= int(float(plan_cell)) if plan_cell != '' else 0
			min_rank				= int(float(rank_cell)) if rank_cell != '' else 0
		except (ValueError, TypeError):
			continue

		if min_rank == 0:
			continue

		school_code, school_name	= parse_school(school_cell)
		group_code, group_name		= parse_major(major_cell)

		rows.append({
			'year':					YEAR,
			'school_code':			school_code,
			'school_name':			school_name,
			'group_code':			group_code,
			'group_name':			group_name,
			'plan_count':			plan_count,
			'min_rank':				min_rank
		})

	print('parsed:', len(rows))

	with open(OUT_SQL, 'w', encoding='utf-8') as f:
		f.write('-- Me Offer · 山东 2024 普通类常规批第1次投档表\n')
		f.write('-- Source: ' + SOURCE + '\n\n')
		f.write('DELETE FROM gaokao_scores WHERE year=' + str(YEAR) + ';\n\n')

		BATCH						= 500
		for i in range(0, len(rows), BATCH):
			batch					= rows[i:i+BATCH]
			values					= []
			for r in batch:
				sn					= r['school_name'].replace("'", "''")
				gn					= r['group_name'].replace("'", "''")
				values.append(
					"(" + str(r['year']) + ",'shandong','" + r['school_code'] + "','" + sn + "','" + r['group_code'] + "','" + gn + "'," + str(r['min_rank']) + "," + str(r['plan_count']) + ",'" + SOURCE + "')"
				)

			f.write('INSERT INTO gaokao_scores (year, province, school_code, school_name, group_code, group_name, min_rank, plan_count, source_url) VALUES\n')
			f.write(',\n'.join(values))
			f.write(';\n\n')

	print('saved:', OUT_SQL)


if __name__ == '__main__':
	main()
