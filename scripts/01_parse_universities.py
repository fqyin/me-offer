#!/usr/bin/env python3
# Me Offer · Parse 教育部 全国普通高等学校名单 (2868 所 · 截至 2024-06)
# 源：http://www.moe.gov.cn/jyb_xxgk/s5743/s5744/A03/202406/t20240621_1136990.html

import xlrd
import json
import re
import os
import sys

XLS_PATH								= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'moe_universities_1.xls')
OUTPUT_JSON								= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'universities.json')
OUTPUT_SQL								= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'universities_insert.sql')

SOURCE_URL								= 'http://www.moe.gov.cn/jyb_xxgk/s5743/s5744/A03/202406/t20240621_1136990.html'


def main():
	wb									= xlrd.open_workbook(XLS_PATH)
	sh									= wb.sheet_by_index(0)

	rows								= []
	current_province					= ''

	for r in range(sh.nrows):
		col0							= str(sh.cell_value(r, 0)).strip()
		col1							= str(sh.cell_value(r, 1)).strip()
		col2							= str(sh.cell_value(r, 2)).strip()
		col3							= str(sh.cell_value(r, 3)).strip()
		col4							= str(sh.cell_value(r, 4)).strip()
		col5							= str(sh.cell_value(r, 5)).strip()
		col6							= str(sh.cell_value(r, 6)).strip() if sh.ncols > 6 else ''

		# 省份标题行：例 "北京市（92所）"
		m								= re.match(r'^([^（(]+)[（(](\d+)所[）)]', col0)
		if m and not col1:
			current_province			= m.group(1)
			continue

		# 跳过表头和空行
		if not col1 or col1 == '学校名称' or col0 in ('序号', ''):
			continue

		# 普通数据行
		try:
			index						= int(float(col0)) if col0 else 0
		except ValueError:
			continue

		if not col2:
			continue

		# 学校标识码（10位代码 · 去掉浮点）
		code_clean						= col2.replace('.0', '').split('.')[0]

		school							= {
			'index':					index,
			'name':						col1,
			'code':						code_clean,
			'ministry':					col3,
			'province':					col4 or current_province,
			'level':					col5,			# 本科 / 专科
			'remark':					col6
		}

		rows.append(school)

	print('total schools parsed:', len(rows))

	# 输出 JSON
	with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
		json.dump(rows, f, ensure_ascii=False, indent='\t')
	print('saved:', OUTPUT_JSON)

	# 输出 SQL（批量 INSERT · 每 200 行一批）
	BATCH								= 200
	with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
		f.write('-- Me Offer · 全国高校数据（教育部 2024 官方名单）\n')
		f.write('-- Source: ' + SOURCE_URL + '\n')
		f.write('-- Total: ' + str(len(rows)) + '\n\n')

		for i in range(0, len(rows), BATCH):
			batch						= rows[i:i+BATCH]
			values						= []

			for s in batch:
				code					= s['code'].replace("'", "''")
				name					= s['name'].replace("'", "''")
				province				= s['province'].replace("'", "''")
				city					= ''
				tier					= infer_tier(s['name'], s['level'], s['ministry'])
				nature					= '公办' if ('部' in s['ministry'] or '省' in s['ministry'] or '市' in s['ministry']) else '民办'

				values.append(
					"('" + code + "', '" + name + "', '" + city + "', '" + province + "', '" + tier + "', '" + nature + "', '" + SOURCE_URL + "')"
				)

			f.write('INSERT OR REPLACE INTO universities (code, name, city, province, tier, nature, website) VALUES\n')
			f.write(',\n'.join(values))
			f.write(';\n\n')

	print('saved:', OUTPUT_SQL)


def infer_tier(name, level, ministry):
	# 基础层次判断
	if level == '专科':
		return '专科'

	# 985/211 关键词硬编码（后续可用外部数据源覆盖）
	tier_985 = {'北京大学', '清华大学', '中国人民大学', '北京师范大学', '北京航空航天大学', '北京理工大学', '中国农业大学',
		'中央民族大学', '南开大学', '天津大学', '大连理工大学', '东北大学', '吉林大学', '哈尔滨工业大学',
		'复旦大学', '同济大学', '上海交通大学', '华东师范大学', '南京大学', '东南大学', '浙江大学',
		'中国科学技术大学', '厦门大学', '山东大学', '中国海洋大学', '武汉大学', '华中科技大学',
		'中南大学', '湖南大学', '中山大学', '华南理工大学', '四川大学', '电子科技大学', '重庆大学',
		'西安交通大学', '西北工业大学', '兰州大学', '国防科技大学', '中央财经大学', '中央音乐学院',
		'北京外国语大学', '中国农业大学', '南京航空航天大学', '西北农林科技大学', '中国人民解放军国防科学技术大学'}

	tier_211 = {'北京交通大学', '北京工业大学', '北京邮电大学', '北京林业大学', '北京协和医学院', '北京中医药大学',
		'中国传媒大学', '对外经济贸易大学', '中国政法大学', '华北电力大学', '中国石油大学（北京）',
		'中国地质大学（北京）', '中国矿业大学（北京）', '天津医科大学', '太原理工大学', '延边大学',
		'东北师范大学', '东北林业大学', '东北农业大学', '华东理工大学', '东华大学', '上海财经大学',
		'上海大学', '上海外国语大学', '苏州大学', '南京理工大学', '河海大学', '江南大学',
		'南京农业大学', '中国矿业大学', '中国药科大学', '南京师范大学', '中国石油大学（华东）',
		'安徽大学', '合肥工业大学', '福州大学', '南昌大学', '郑州大学', '中国地质大学（武汉）',
		'武汉理工大学', '华中农业大学', '华中师范大学', '中南财经政法大学', '湖南师范大学', '暨南大学',
		'华南师范大学', '广西大学', '海南大学', '西南交通大学', '西南财经大学', '西南大学',
		'西藏大学', '西北大学', '西安电子科技大学', '长安大学', '陕西师范大学', '青海大学',
		'宁夏大学', '新疆大学', '石河子大学', '东北财经大学', '辽宁大学', '大连海事大学',
		'内蒙古大学', '东南大学', '河北工业大学', '中央戏剧学院', '北京体育大学', '中国美术学院'}

	if name in tier_985:
		return '985'
	if name in tier_211:
		return '211'

	# 独立学院
	if '学院' in name and '独立' in ministry:
		return '独立学院'

	# 中外合作办学
	if any(kw in name for kw in ['诺丁汉', '利物浦', '昆山杜克', '上海纽约', '温州肯恩', '香港中文大学（深圳）', '北师大-浸会']):
		return '中外合作'

	return '普通本科'


if __name__ == '__main__':
	main()
