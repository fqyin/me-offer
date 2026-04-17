#!/usr/bin/env python3
# Me Offer · 填充 university_mapping 表 v2
# 直接用 xls 里的"省份标题行"作为真实省份归属（最权威）

import xlrd
import os
import re

XLS									= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'moe_universities_1.xls')
OUT_SQL								= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'university_mapping_insert_v2.sql')


# 省份名 → 标准 code 映射
PROVINCE_NAME_TO_CODE				= {
	'北京市':				'beijing',
	'上海市':				'shanghai',
	'天津市':				'tianjin',
	'重庆市':				'chongqing',
	'河北省':				'hebei',
	'山西省':				'shanxi',
	'内蒙古自治区':			'neimenggu',
	'辽宁省':				'liaoning',
	'吉林省':				'jilin',
	'黑龙江省':				'heilongjiang',
	'江苏省':				'jiangsu',
	'浙江省':				'zhejiang',
	'安徽省':				'anhui',
	'福建省':				'fujian',
	'江西省':				'jiangxi',
	'山东省':				'shandong',
	'河南省':				'henan',
	'湖北省':				'hubei',
	'湖南省':				'hunan',
	'广东省':				'guangdong',
	'广西壮族自治区':			'guangxi',
	'海南省':				'hainan',
	'四川省':				'sichuan',
	'贵州省':				'guizhou',
	'云南省':				'yunnan',
	'西藏自治区':			'xizang',
	'陕西省':				'shaanxi',
	'甘肃省':				'gansu',
	'青海省':				'qinghai',
	'宁夏回族自治区':			'ningxia',
	'新疆维吾尔自治区':		'xinjiang'
}


# 985 高校名单
TIER_985							= set([
	'北京大学', '清华大学', '中国人民大学', '北京师范大学', '北京航空航天大学', '北京理工大学', '中国农业大学',
	'中央民族大学', '南开大学', '天津大学', '大连理工大学', '东北大学', '吉林大学', '哈尔滨工业大学',
	'复旦大学', '同济大学', '上海交通大学', '华东师范大学', '南京大学', '东南大学', '浙江大学',
	'中国科学技术大学', '厦门大学', '山东大学', '中国海洋大学', '武汉大学', '华中科技大学',
	'中南大学', '湖南大学', '中山大学', '华南理工大学', '四川大学', '电子科技大学', '重庆大学',
	'西安交通大学', '西北工业大学', '兰州大学', '国防科技大学', '西北农林科技大学'
])


# 211 高校名单
TIER_211							= set([
	'北京交通大学', '北京工业大学', '北京邮电大学', '北京林业大学', '北京协和医学院', '北京中医药大学',
	'中国传媒大学', '对外经济贸易大学', '中国政法大学', '华北电力大学', '中国石油大学（北京）',
	'中国地质大学（北京）', '中国矿业大学（北京）', '天津医科大学', '太原理工大学', '延边大学',
	'东北师范大学', '东北林业大学', '东北农业大学', '华东理工大学', '东华大学', '上海财经大学',
	'上海大学', '上海外国语大学', '苏州大学', '南京理工大学', '河海大学', '江南大学',
	'南京航空航天大学', '南京农业大学', '中国矿业大学', '中国药科大学', '南京师范大学', '中国石油大学（华东）',
	'安徽大学', '合肥工业大学', '福州大学', '南昌大学', '郑州大学', '中国地质大学（武汉）',
	'武汉理工大学', '华中农业大学', '华中师范大学', '中南财经政法大学', '湖南师范大学', '暨南大学',
	'华南师范大学', '广西大学', '海南大学', '西南交通大学', '西南财经大学', '西南大学',
	'西藏大学', '西北大学', '西安电子科技大学', '长安大学', '陕西师范大学', '青海大学',
	'宁夏大学', '新疆大学', '石河子大学', '东北财经大学', '辽宁大学', '大连海事大学',
	'内蒙古大学', '河北工业大学', '北京体育大学', '中央财经大学', '中央音乐学院'
])


DOUBLE_FIRST_CLASS					= TIER_985 | TIER_211 | set([
	'北京协和医学院', '上海科技大学', '南方科技大学', '华南农业大学', '首都师范大学',
	'天津工业大学', '河南大学', '山西大学', '南京林业大学', '河北师范大学',
	'云南大学', '贵州大学'
])


def infer_tier(name, level, ministry):
	if level == '专科':
		return '专科'
	if name in TIER_985:
		return '985'
	if name in TIER_211:
		return '211'
	if any(kw in name for kw in ['诺丁汉', '利物浦', '昆山杜克', '上海纽约', '温州肯恩', '香港中文大学（深圳）']):
		return '中外合作'
	return '普通本科'


def infer_nature(ministry):
	if '教育部' in ministry or '工信部' in ministry or '卫生' in ministry or '公安部' in ministry or '外交部' in ministry or '国防' in ministry:
		return '公办'
	if '中国' == ministry[:2] or '国务院' in ministry:
		return '公办'
	if '省' in ministry or '市' in ministry or '自治区' in ministry:
		return '公办'
	return '民办'


def main():
	wb								= xlrd.open_workbook(XLS)
	sh								= wb.sheet_by_index(0)

	rows							= []
	current_province_raw			= ''
	current_province_code			= ''

	for r in range(sh.nrows):
		col0						= str(sh.cell_value(r, 0)).strip()
		col1						= str(sh.cell_value(r, 1)).strip()
		col2						= str(sh.cell_value(r, 2)).strip()
		col3						= str(sh.cell_value(r, 3)).strip()
		col4						= str(sh.cell_value(r, 4)).strip()
		col5						= str(sh.cell_value(r, 5)).strip()

		# 省份标题行：例如 "北京市（92所）"
		m							= re.match(r'^([^（(]+)[（(](\d+)所[）)]', col0)
		if m and not col1:
			current_province_raw	= m.group(1)
			current_province_code	= PROVINCE_NAME_TO_CODE.get(current_province_raw, '')
			continue

		if not col1 or col1 == '学校名称':
			continue

		try:
			int(float(col0))
		except ValueError:
			continue

		if not col2 or not current_province_code:
			continue

		name						= col1
		city_raw					= col4

		tier						= infer_tier(name, col5, col3)
		nature						= infer_nature(col3)
		is_985						= 1 if name in TIER_985 else 0
		is_211						= 1 if name in TIER_211 else 0
		is_double_first				= 1 if name in DOUBLE_FIRST_CLASS else 0

		# 城市名清洗（去"市"/"自治州"）
		city						= city_raw.replace('市', '').replace('盟', '').replace('地区', '')
		if '自治州' in city:
			city					= city.split('自治州')[0] + '州'

		rows.append({
			'name':					name,
			'province_code':		current_province_code,
			'province_name':		current_province_raw,
			'city':					city,
			'tier':					tier,
			'nature':				nature,
			'is_985':				is_985,
			'is_211':				is_211,
			'is_double_first':		is_double_first
		})

	print('解析高校:', len(rows))

	# 按省份统计
	prov_count						= {}
	for r in rows:
		prov_count[r['province_name']] = prov_count.get(r['province_name'], 0) + 1

	print('各省统计:')
	for k, v in sorted(prov_count.items(), key=lambda x: -x[1]):
		print('  ' + k + ': ' + str(v))

	# 写 SQL
	with open(OUT_SQL, 'w', encoding='utf-8') as f:
		f.write('-- Me Offer · university_mapping v2（按 xls 省份标题行分组，准确到 100%）\n\n')
		f.write('DELETE FROM university_mapping;\n\n')

		BATCH						= 200
		for i in range(0, len(rows), BATCH):
			batch					= rows[i:i+BATCH]
			values					= []
			for r in batch:
				name_esc			= r['name'].replace("'", "''")
				province_name_esc	= r['province_name'].replace("'", "''")
				city_esc			= r['city'].replace("'", "''")

				values.append(
					"('" + name_esc + "', '" + r['province_code'] + "', '" + province_name_esc + "', '" + city_esc + "', '" + r['tier'] + "', '" + r['nature'] + "', " + str(r['is_985']) + ", " + str(r['is_211']) + ", " + str(r['is_double_first']) + ")"
				)

			f.write('INSERT OR REPLACE INTO university_mapping (school_name, province_code, province_name, city, tier, nature, is_985, is_211, is_double_first) VALUES\n')
			f.write(',\n'.join(values))
			f.write(';\n\n')

	print('写入 SQL:', OUT_SQL)


if __name__ == '__main__':
	main()
