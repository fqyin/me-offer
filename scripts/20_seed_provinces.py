#!/usr/bin/env python3
# Me Offer · 初始化 31 省配置到 D1

import json
import os

DATA_FILE							= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'knowledge', 'provinces_rules_2025.json')
OUT_SQL								= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'provinces_seed.sql')


def escape_sql(s):
	if s is None:
		return 'NULL'
	if isinstance(s, bool):
		return '1' if s else '0'
	if isinstance(s, (int, float)):
		return str(s)
	return "'" + str(s).replace("'", "''") + "'"


def main():
	with open(DATA_FILE, 'r', encoding='utf-8') as f:
		data						= json.load(f)

	provinces						= data.get('provinces', [])
	print('Loaded', len(provinces), 'provinces')

	lines							= []
	lines.append('-- Me Offer · 31 省配置初始化')
	lines.append('-- Source: data_raw/knowledge/provinces_rules_2025.json')
	lines.append('')
	lines.append('DELETE FROM provinces;')
	lines.append('')

	for p in provinces:
		if p.get('hidden'):
			continue

		code						= p.get('code')
		name						= p.get('name')
		name_short					= p.get('name_short', '')
		reform_year					= p.get('reform_year')
		reform_type					= p.get('reform_type', '')
		model						= p.get('model', '')
		batches_json				= json.dumps(p.get('batches', []), ensure_ascii=False)

		chong_count					= None
		wen_count					= None
		bao_count					= None
		cwb							= p.get('chongwenbao')
		if cwb:
			chong_count				= cwb.get('chong')
			wen_count				= cwb.get('wen')
			bao_count				= cwb.get('bao')

		subject_select				= p.get('subject_select', '')
		special_notes_json			= json.dumps(p.get('special_notes', []), ensure_ascii=False)
		data_status					= p.get('data_status', 'pending')
		priority					= p.get('recommended_priority', 9)

		lines.append(
			'INSERT INTO provinces (code, name, name_short, reform_year, reform_type, model, batches_json, chong_count, wen_count, bao_count, subject_select, special_notes, data_status, recommended_priority) VALUES (' +
			escape_sql(code) + ', ' +
			escape_sql(name) + ', ' +
			escape_sql(name_short) + ', ' +
			escape_sql(reform_year) + ', ' +
			escape_sql(reform_type) + ', ' +
			escape_sql(model) + ', ' +
			escape_sql(batches_json) + ', ' +
			escape_sql(chong_count) + ', ' +
			escape_sql(wen_count) + ', ' +
			escape_sql(bao_count) + ', ' +
			escape_sql(subject_select) + ', ' +
			escape_sql(special_notes_json) + ', ' +
			escape_sql(data_status) + ', ' +
			escape_sql(priority) +
			');'
		)

	with open(OUT_SQL, 'w', encoding='utf-8') as f:
		f.write('\n'.join(lines) + '\n')

	print('Wrote SQL to:', OUT_SQL)
	print('Provinces to insert:', len([p for p in provinces if not p.get('hidden')]))


if __name__ == '__main__':
	main()
