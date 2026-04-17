#!/usr/bin/env python3
# Me Offer · 填充 university_mapping 表（2,868 所）
# 解决 universities 表 province 字段存"城市"而非"省"的问题
# 映射城市 → 省份代码 + 省份全称 + 正确的省/市/自治区

import xlrd
import json
import os

XLS									= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'moe_universities_1.xls')
OUT_SQL								= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'university_mapping_insert.sql')

# 城市 → 省份代码映射
CITY_TO_PROVINCE					= {
	# 直辖市（省 = 市 = 城市）
	'北京市':		('beijing', '北京市', '北京'),
	'上海市':		('shanghai', '上海市', '上海'),
	'天津市':		('tianjin', '天津市', '天津'),
	'重庆市':		('chongqing', '重庆市', '重庆'),

	# 山东
	'济南市':		('shandong', '山东省', '济南'),
	'青岛市':		('shandong', '山东省', '青岛'),
	'烟台市':		('shandong', '山东省', '烟台'),
	'威海市':		('shandong', '山东省', '威海'),
	'潍坊市':		('shandong', '山东省', '潍坊'),
	'淄博市':		('shandong', '山东省', '淄博'),
	'泰安市':		('shandong', '山东省', '泰安'),
	'济宁市':		('shandong', '山东省', '济宁'),
	'临沂市':		('shandong', '山东省', '临沂'),
	'聊城市':		('shandong', '山东省', '聊城'),
	'菏泽市':		('shandong', '山东省', '菏泽'),
	'德州市':		('shandong', '山东省', '德州'),
	'滨州市':		('shandong', '山东省', '滨州'),
	'日照市':		('shandong', '山东省', '日照'),
	'东营市':		('shandong', '山东省', '东营'),
	'枣庄市':		('shandong', '山东省', '枣庄'),

	# 河北
	'石家庄市':	('hebei', '河北省', '石家庄'),
	'保定市':		('hebei', '河北省', '保定'),
	'唐山市':		('hebei', '河北省', '唐山'),
	'秦皇岛市':	('hebei', '河北省', '秦皇岛'),
	'邯郸市':		('hebei', '河北省', '邯郸'),
	'廊坊市':		('hebei', '河北省', '廊坊'),
	'张家口市':	('hebei', '河北省', '张家口'),
	'承德市':		('hebei', '河北省', '承德'),
	'沧州市':		('hebei', '河北省', '沧州'),
	'衡水市':		('hebei', '河北省', '衡水'),
	'邢台市':		('hebei', '河北省', '邢台'),

	# 辽宁
	'沈阳市':		('liaoning', '辽宁省', '沈阳'),
	'大连市':		('liaoning', '辽宁省', '大连'),
	'鞍山市':		('liaoning', '辽宁省', '鞍山'),
	'锦州市':		('liaoning', '辽宁省', '锦州'),
	'抚顺市':		('liaoning', '辽宁省', '抚顺'),
	'葫芦岛市':	('liaoning', '辽宁省', '葫芦岛'),
	'丹东市':		('liaoning', '辽宁省', '丹东'),
	'本溪市':		('liaoning', '辽宁省', '本溪'),
	'营口市':		('liaoning', '辽宁省', '营口'),
	'朝阳市':		('liaoning', '辽宁省', '朝阳'),

	# 吉林
	'长春市':		('jilin', '吉林省', '长春'),
	'吉林市':		('jilin', '吉林省', '吉林'),
	'延吉市':		('jilin', '吉林省', '延吉'),
	'四平市':		('jilin', '吉林省', '四平'),
	'通化市':		('jilin', '吉林省', '通化'),

	# 黑龙江
	'哈尔滨市':	('heilongjiang', '黑龙江省', '哈尔滨'),
	'大庆市':		('heilongjiang', '黑龙江省', '大庆'),
	'齐齐哈尔市':	('heilongjiang', '黑龙江省', '齐齐哈尔'),
	'牡丹江市':	('heilongjiang', '黑龙江省', '牡丹江'),

	# 江苏
	'南京市':		('jiangsu', '江苏省', '南京'),
	'苏州市':		('jiangsu', '江苏省', '苏州'),
	'无锡市':		('jiangsu', '江苏省', '无锡'),
	'常州市':		('jiangsu', '江苏省', '常州'),
	'镇江市':		('jiangsu', '江苏省', '镇江'),
	'徐州市':		('jiangsu', '江苏省', '徐州'),
	'扬州市':		('jiangsu', '江苏省', '扬州'),
	'南通市':		('jiangsu', '江苏省', '南通'),
	'连云港市':	('jiangsu', '江苏省', '连云港'),
	'盐城市':		('jiangsu', '江苏省', '盐城'),
	'淮安市':		('jiangsu', '江苏省', '淮安'),
	'泰州市':		('jiangsu', '江苏省', '泰州'),
	'宿迁市':		('jiangsu', '江苏省', '宿迁'),

	# 浙江
	'杭州市':		('zhejiang', '浙江省', '杭州'),
	'宁波市':		('zhejiang', '浙江省', '宁波'),
	'温州市':		('zhejiang', '浙江省', '温州'),
	'金华市':		('zhejiang', '浙江省', '金华'),
	'嘉兴市':		('zhejiang', '浙江省', '嘉兴'),
	'湖州市':		('zhejiang', '浙江省', '湖州'),
	'绍兴市':		('zhejiang', '浙江省', '绍兴'),
	'台州市':		('zhejiang', '浙江省', '台州'),
	'衢州市':		('zhejiang', '浙江省', '衢州'),
	'舟山市':		('zhejiang', '浙江省', '舟山'),
	'丽水市':		('zhejiang', '浙江省', '丽水'),

	# 安徽
	'合肥市':		('anhui', '安徽省', '合肥'),
	'芜湖市':		('anhui', '安徽省', '芜湖'),
	'蚌埠市':		('anhui', '安徽省', '蚌埠'),
	'淮南市':		('anhui', '安徽省', '淮南'),
	'马鞍山市':	('anhui', '安徽省', '马鞍山'),
	'安庆市':		('anhui', '安徽省', '安庆'),
	'阜阳市':		('anhui', '安徽省', '阜阳'),
	'滁州市':		('anhui', '安徽省', '滁州'),
	'六安市':		('anhui', '安徽省', '六安'),

	# 福建
	'福州市':		('fujian', '福建省', '福州'),
	'厦门市':		('fujian', '福建省', '厦门'),
	'泉州市':		('fujian', '福建省', '泉州'),
	'漳州市':		('fujian', '福建省', '漳州'),
	'三明市':		('fujian', '福建省', '三明'),
	'龙岩市':		('fujian', '福建省', '龙岩'),

	# 江西
	'南昌市':		('jiangxi', '江西省', '南昌'),
	'九江市':		('jiangxi', '江西省', '九江'),
	'赣州市':		('jiangxi', '江西省', '赣州'),
	'景德镇市':	('jiangxi', '江西省', '景德镇'),
	'上饶市':		('jiangxi', '江西省', '上饶'),

	# 河南
	'郑州市':		('henan', '河南省', '郑州'),
	'洛阳市':		('henan', '河南省', '洛阳'),
	'开封市':		('henan', '河南省', '开封'),
	'新乡市':		('henan', '河南省', '新乡'),
	'焦作市':		('henan', '河南省', '焦作'),
	'许昌市':		('henan', '河南省', '许昌'),
	'平顶山市':	('henan', '河南省', '平顶山'),
	'信阳市':		('henan', '河南省', '信阳'),
	'南阳市':		('henan', '河南省', '南阳'),
	'安阳市':		('henan', '河南省', '安阳'),

	# 湖北
	'武汉市':		('hubei', '湖北省', '武汉'),
	'黄石市':		('hubei', '湖北省', '黄石'),
	'襄阳市':		('hubei', '湖北省', '襄阳'),
	'宜昌市':		('hubei', '湖北省', '宜昌'),
	'荆州市':		('hubei', '湖北省', '荆州'),
	'十堰市':		('hubei', '湖北省', '十堰'),

	# 湖南
	'长沙市':		('hunan', '湖南省', '长沙'),
	'株洲市':		('hunan', '湖南省', '株洲'),
	'湘潭市':		('hunan', '湖南省', '湘潭'),
	'衡阳市':		('hunan', '湖南省', '衡阳'),
	'岳阳市':		('hunan', '湖南省', '岳阳'),
	'常德市':		('hunan', '湖南省', '常德'),
	'吉首市':		('hunan', '湖南省', '吉首'),

	# 广东
	'广州市':		('guangdong', '广东省', '广州'),
	'深圳市':		('guangdong', '广东省', '深圳'),
	'珠海市':		('guangdong', '广东省', '珠海'),
	'汕头市':		('guangdong', '广东省', '汕头'),
	'佛山市':		('guangdong', '广东省', '佛山'),
	'东莞市':		('guangdong', '广东省', '东莞'),
	'中山市':		('guangdong', '广东省', '中山'),
	'惠州市':		('guangdong', '广东省', '惠州'),
	'湛江市':		('guangdong', '广东省', '湛江'),
	'肇庆市':		('guangdong', '广东省', '肇庆'),
	'江门市':		('guangdong', '广东省', '江门'),
	'韶关市':		('guangdong', '广东省', '韶关'),

	# 广西
	'南宁市':		('guangxi', '广西壮族自治区', '南宁'),
	'桂林市':		('guangxi', '广西壮族自治区', '桂林'),
	'柳州市':		('guangxi', '广西壮族自治区', '柳州'),

	# 海南
	'海口市':		('hainan', '海南省', '海口'),
	'三亚市':		('hainan', '海南省', '三亚'),

	# 四川
	'成都市':		('sichuan', '四川省', '成都'),
	'绵阳市':		('sichuan', '四川省', '绵阳'),
	'自贡市':		('sichuan', '四川省', '自贡'),
	'德阳市':		('sichuan', '四川省', '德阳'),
	'宜宾市':		('sichuan', '四川省', '宜宾'),
	'南充市':		('sichuan', '四川省', '南充'),
	'泸州市':		('sichuan', '四川省', '泸州'),

	# 贵州
	'贵阳市':		('guizhou', '贵州省', '贵阳'),
	'遵义市':		('guizhou', '贵州省', '遵义'),

	# 云南
	'昆明市':		('yunnan', '云南省', '昆明'),
	'曲靖市':		('yunnan', '云南省', '曲靖'),

	# 陕西
	'西安市':		('shaanxi', '陕西省', '西安'),
	'咸阳市':		('shaanxi', '陕西省', '咸阳'),
	'宝鸡市':		('shaanxi', '陕西省', '宝鸡'),
	'延安市':		('shaanxi', '陕西省', '延安'),

	# 甘肃
	'兰州市':		('gansu', '甘肃省', '兰州'),
	'天水市':		('gansu', '甘肃省', '天水'),

	# 山西
	'太原市':		('shanxi', '山西省', '太原'),
	'大同市':		('shanxi', '山西省', '大同'),
	'晋中市':		('shanxi', '山西省', '晋中'),

	# 青海
	'西宁市':		('qinghai', '青海省', '西宁'),

	# 宁夏
	'银川市':		('ningxia', '宁夏回族自治区', '银川'),

	# 新疆（暂不支持，但先映射）
	'乌鲁木齐市':	('xinjiang', '新疆维吾尔自治区', '乌鲁木齐'),
	'石河子市':	('xinjiang', '新疆维吾尔自治区', '石河子'),

	# 西藏
	'拉萨市':		('xizang', '西藏自治区', '拉萨'),

	# 内蒙古
	'呼和浩特市':	('neimenggu', '内蒙古自治区', '呼和浩特'),
	'包头市':		('neimenggu', '内蒙古自治区', '包头'),
}


# 985 高校名单
TIER_985							= {
	'北京大学', '清华大学', '中国人民大学', '北京师范大学', '北京航空航天大学', '北京理工大学', '中国农业大学',
	'中央民族大学', '南开大学', '天津大学', '大连理工大学', '东北大学', '吉林大学', '哈尔滨工业大学',
	'复旦大学', '同济大学', '上海交通大学', '华东师范大学', '南京大学', '东南大学', '浙江大学',
	'中国科学技术大学', '厦门大学', '山东大学', '中国海洋大学', '武汉大学', '华中科技大学',
	'中南大学', '湖南大学', '中山大学', '华南理工大学', '四川大学', '电子科技大学', '重庆大学',
	'西安交通大学', '西北工业大学', '兰州大学', '国防科技大学', '西北农林科技大学'
}


# 211 高校名单（节选，含 985）
TIER_211							= {
	'北京交通大学', '北京工业大学', '北京邮电大学', '北京林业大学', '北京协和医学院', '北京中医药大学',
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
	'内蒙古大学', '河北工业大学', '北京体育大学', '中央财经大学', '中央音乐学院'
}


# 双一流名单（含 985 + 211 + 少数新增）
DOUBLE_FIRST_CLASS					= TIER_985 | TIER_211 | {
	'北京协和医学院', '上海科技大学', '南方科技大学', '华南农业大学', '首都师范大学',
	'天津工业大学', '河南大学', '山西大学', '南京林业大学', '河北师范大学',
	'云南大学', '贵州大学'
}


def infer_tier(name, level, ministry):
	if level == '专科':
		return '专科'
	if name in TIER_985:
		return '985'
	if name in TIER_211:
		return '211'
	# 中外合作办学
	if any(kw in name for kw in ['诺丁汉', '利物浦', '昆山杜克', '上海纽约', '温州肯恩', '香港中文大学（深圳）']):
		return '中外合作'
	return '普通本科'


def infer_nature(ministry):
	if '教育部' in ministry or '工信部' in ministry or '卫生' in ministry or '公安部' in ministry or '外交部' in ministry or '国防' in ministry or '中国' in ministry[:4]:
		return '公办'
	if '省' in ministry or '市' in ministry or '自治区' in ministry:
		return '公办'
	return '民办'


def main():
	wb								= xlrd.open_workbook(XLS)
	sh								= wb.sheet_by_index(0)

	rows							= []
	current_province_raw			= ''
	unknown_cities					= set()

	import re
	for r in range(sh.nrows):
		col0						= str(sh.cell_value(r, 0)).strip()
		col1						= str(sh.cell_value(r, 1)).strip()
		col2						= str(sh.cell_value(r, 2)).strip()
		col3						= str(sh.cell_value(r, 3)).strip()
		col4						= str(sh.cell_value(r, 4)).strip()
		col5						= str(sh.cell_value(r, 5)).strip()

		m							= re.match(r'^([^（(]+)[（(](\d+)所[）)]', col0)
		if m and not col1:
			current_province_raw	= m.group(1)
			continue

		if not col1 or col1 == '学校名称':
			continue

		try:
			int(float(col0))
		except ValueError:
			continue

		if not col2:
			continue

		name						= col1
		code_clean					= col2.replace('.0', '').split('.')[0]
		ministry					= col3
		city_raw					= col4  # 实际是城市
		level						= col5

		# 查询省份
		mapping						= CITY_TO_PROVINCE.get(city_raw)
		if mapping:
			province_code, province_name, city_name = mapping
		else:
			unknown_cities.add(city_raw)
			# 尝试用 current_province_raw 兜底
			province_code			= ''
			province_name			= city_raw
			city_name				= city_raw

		tier						= infer_tier(name, level, ministry)
		nature						= infer_nature(ministry)
		is_985						= 1 if name in TIER_985 else 0
		is_211						= 1 if name in TIER_211 else 0
		is_double_first				= 1 if name in DOUBLE_FIRST_CLASS else 0

		rows.append({
			'name':					name,
			'code':					code_clean,
			'province_code':		province_code,
			'province_name':		province_name,
			'city':					city_name,
			'tier':					tier,
			'nature':				nature,
			'is_985':				is_985,
			'is_211':				is_211,
			'is_double_first':		is_double_first
		})

	print('解析高校:', len(rows))
	print('无法映射的城市:', unknown_cities)

	# 写 SQL
	with open(OUT_SQL, 'w', encoding='utf-8') as f:
		f.write('-- Me Offer · university_mapping 填充（2,868 所）\n')
		f.write('-- Source: 教育部 2024-06 官方名单\n\n')
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
