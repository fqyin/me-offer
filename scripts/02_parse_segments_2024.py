#!/usr/bin/env python3
# Me Offer · 山东 2024 一分一段表解析
# 源：山东省教育招生考试院 https://www.sdzk.cn/NewsInfo.aspx?NewsID=6577

import xlrd
import os

XLS									= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'sd_2024_segment.xls')
OUT_SQL								= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'segments_2024_insert.sql')

SOURCE								= 'https://www.sdzk.cn/NewsInfo.aspx?NewsID=6577'
YEAR								= 2024

# 列含义：0=分数段 1/2=全体(段/累) 3/4=物理 5/6=化学 7/8=生物 9/10=政治 11/12=历史 13/14=地理
SUBJECT_MAP							= {
	'total':						(1, 2),
	'physics':						(3, 4),
	'chemistry':					(5, 6),
	'biology':						(7, 8),
	'politics':						(9, 10),
	'history':						(11, 12),
	'geography':					(13, 14)
}


def main():
	wb								= xlrd.open_workbook(XLS)
	sh								= wb.sheet_by_index(0)

	rows_sql						= []

	for r in range(sh.nrows):
		col0						= sh.cell_value(r, 0)

		try:
			score					= int(float(col0))
		except (ValueError, TypeError):
			continue

		if score < 100 or score > 750:
			continue

		for subj, (seg_col, cum_col) in SUBJECT_MAP.items():
			try:
				count				= sh.cell_value(r, seg_col)
				rank				= sh.cell_value(r, cum_col)
				count				= int(float(count)) if count != '' else 0
				rank				= int(float(rank)) if rank != '' else 0
			except (ValueError, TypeError):
				continue

			if rank == 0:
				continue

			rows_sql.append((YEAR, subj, score, rank, count))

	print('parsed rows:', len(rows_sql))

	with open(OUT_SQL, 'w', encoding='utf-8') as f:
		f.write('-- Me Offer · 山东 2024 一分一段表\n')
		f.write('-- Source: ' + SOURCE + '\n\n')
		f.write('DELETE FROM gaokao_segments WHERE year=' + str(YEAR) + ";\n\n")

		BATCH						= 500
		for i in range(0, len(rows_sql), BATCH):
			batch					= rows_sql[i:i+BATCH]
			values					= ["(" + str(y) + ",'shandong','" + s + "'," + str(sc) + "," + str(rk) + "," + str(ct) + ",'" + SOURCE + "')" for (y, s, sc, rk, ct) in batch]
			f.write('INSERT INTO gaokao_segments (year, province, subject_type, score, rank, count, source_url) VALUES\n')
			f.write(',\n'.join(values))
			f.write(';\n\n')

	print('saved:', OUT_SQL)


if __name__ == '__main__':
	main()
