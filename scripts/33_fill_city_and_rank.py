#!/usr/bin/env python3
# Me Offer · 补齐 universities 表的 city 和 rank_ruanke
# 数据源：
#   - city：data_raw/universities_with_city.json（来自教育部名单所在地字段）
#   - rank_ruanke：data_raw/ruanke_2024_top600.json（软科2024主榜）

import os
import json

DATA_DIR							= os.path.join(os.path.dirname(__file__), '..', 'data_raw')
CITY_JSON							= os.path.join(DATA_DIR, 'universities_with_city.json')
RUANKE_JSON							= os.path.join(DATA_DIR, 'ruanke_2024_top600.json')
OUT_SQL								= os.path.join(DATA_DIR, 'universities_city_rank_update.sql')


def main():
	with open(CITY_JSON, 'r', encoding='utf-8') as f:
		univs						= json.load(f)

	with open(RUANKE_JSON, 'r', encoding='utf-8') as f:
		ruanke					= json.load(f)

	ruanke_map						= {}

	for r in ruanke:
		ruanke_map[r['name']]	= r['rank']

	rows							= []
	city_filled						= 0
	rank_filled						= 0

	for u in univs:
		code						= u['code']
		name						= u['name']
		city						= u.get('city', '')
		rank						= ruanke_map.get(name, None)

		if city:
			city_filled				+= 1
		if rank:
			rank_filled				+= 1

		rows.append({
			'code':					code,
			'name':					name,
			'city':					city,
			'rank':					rank
		})

	total							= len(rows)
	print('total:', total)
	print('city filled:', city_filled, '(' + str(round(city_filled / total * 100, 1)) + '%)')
	print('rank filled:', rank_filled, '(' + str(round(rank_filled / total * 100, 1)) + '%)')

	with open(OUT_SQL, 'w', encoding='utf-8') as f:
		f.write('-- Me Offer · universities city + rank_ruanke 补齐\n')
		f.write('-- city 覆盖 ' + str(city_filled) + '/' + str(total) + '\n')
		f.write('-- rank 覆盖 ' + str(rank_filled) + '/' + str(total) + '\n\n')

		for r in rows:
			if not r['city'] and r['rank'] is None:
				continue

			parts					= []

			if r['city']:
				parts.append("city='" + r['city'].replace("'", "''") + "'")
			if r['rank'] is not None:
				parts.append("rank_ruanke=" + str(r['rank']))

			f.write("UPDATE universities SET " + ', '.join(parts) + " WHERE code='" + r['code'] + "';\n")

	print('saved:', OUT_SQL)


if __name__ == '__main__':
	main()
