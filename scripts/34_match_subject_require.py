#!/usr/bin/env python3
# Me Offer · 匹配选科要求到投档记录
# 输入：data_raw/subject_require_2025_shandong.json（50915条，来自山东考试院PDF）
# 输出：data_raw/gaokao_scores_subject_update.sql（UPDATE 语句）
# 策略：school_name + 归一化major_name 模糊匹配

import os
import re
import json
import subprocess

DATA_DIR							= os.path.join(os.path.dirname(__file__), '..', 'data_raw')
SUB_JSON							= os.path.join(DATA_DIR, 'subject_require_2025_shandong.json')
OUT_SQL								= os.path.join(DATA_DIR, 'gaokao_scores_subject_update.sql')


def norm(s):
	if not s:
		return ''
	s								= re.sub(r'^[0-9A-Z]{1,2}(?=[\u4e00-\u9fff])', '', s)
	s								= s.replace('（', '(').replace('）', ')')
	s								= re.sub(r'\([^)]*\)', '', s)
	return s.strip()


def best_match(cands, gn):
	gn_n							= norm(gn)

	if not gn_n:
		return None

	for m in cands:
		if norm(m['major_name']) == gn_n:
			return m

	for m in cands:
		if norm(m['major_name']).startswith(gn_n) and len(gn_n) >= 2:
			return m

	for m in cands:
		if gn_n in norm(m['major_name']):
			return m

	for m in cands:
		mn_n						= norm(m['major_name'])
		if mn_n and mn_n in gn_n and len(mn_n) >= 3:
			return m

	return None


def fetch_all_scores():
	print('fetching all gaokao_scores from D1...')

	all_rows						= []
	offset							= 0
	batch							= 5000

	while True:
		cmd							= "SELECT id, school_name, group_name, subject_require FROM gaokao_scores ORDER BY id LIMIT " + str(batch) + " OFFSET " + str(offset) + ";"
		r							= subprocess.run(
			['npx', 'wrangler', 'd1', 'execute', 'meoffer-gaokao', '--remote', '--json', '--command', cmd],
			capture_output=True, text=True
		)

		try:
			data					= json.loads(r.stdout)[0]['results']
		except Exception as e:
			print('parse error at offset', offset, ':', e)
			break

		if not data:
			break

		all_rows.extend(data)
		print('  fetched:', len(all_rows))

		if len(data) < batch:
			break

		offset						+= batch

	return all_rows


def main():
	with open(SUB_JSON, 'r', encoding='utf-8') as f:
		sub							= json.load(f)

	idx								= {}

	for x in sub:
		idx.setdefault(x['school_name'], []).append(x)

	print('PDF sources:', len(sub), 'rows,', len(idx), 'schools')

	scores							= fetch_all_scores()
	print('total scores to match:', len(scores))

	hit								= 0
	miss							= 0
	no_school						= 0
	updates							= []

	for row in scores:
		sn							= row['school_name']
		gn							= (row['group_name'] or '').strip()

		if sn not in idx:
			no_school				+= 1
			continue

		m							= best_match(idx[sn], gn)

		if m:
			hit						+= 1
			req						= m['require_raw'].replace("'", "''")
			updates.append((row['id'], req))
		else:
			miss					+= 1

	total							= len(scores)
	print()
	print('match result:')
	print('  hit:', hit, '(' + str(round(hit / total * 100, 1)) + '%)')
	print('  miss:', miss, '(' + str(round(miss / total * 100, 1)) + '%)')
	print('  school not in PDF:', no_school, '(' + str(round(no_school / total * 100, 1)) + '%)')

	with open(OUT_SQL, 'w', encoding='utf-8') as f:
		f.write('-- Me Offer · gaokao_scores subject_require 补齐\n')
		f.write('-- 数据源：山东考试院 PDF (2025-03-17)\n')
		f.write('-- 匹配：' + str(hit) + '/' + str(total) + '\n\n')

		for row_id, req in updates:
			f.write("UPDATE gaokao_scores SET subject_require='" + req + "' WHERE id=" + str(row_id) + ";\n")

	print('saved:', OUT_SQL)


if __name__ == '__main__':
	main()
