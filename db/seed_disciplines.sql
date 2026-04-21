-- ============================================
-- 教育部 13 大学科门类（2022 版）
-- ============================================
INSERT OR REPLACE INTO discipline_categories VALUES
('01', '哲学', 'Philosophy', '研究世界观、认识论、方法论'),
('02', '经济学', 'Economics', '研究经济活动规律和资源配置'),
('03', '法学', 'Law', '研究法律制度与社会治理'),
('04', '教育学', 'Education', '研究教育现象与规律'),
('05', '文学', 'Literature', '研究语言文字与艺术'),
('06', '历史学', 'History', '研究人类历史进程'),
('07', '理学', 'Natural Science', '自然科学基础研究'),
('08', '工学', 'Engineering', '工程技术应用'),
('09', '农学', 'Agriculture', '农业科学与技术'),
('10', '医学', 'Medicine', '人类健康与疾病'),
('11', '军事学', 'Military Science', '军事理论与技术'),
('12', '管理学', 'Management', '组织管理与决策'),
('13', '艺术学', 'Arts', '艺术理论与创作');


-- ============================================
-- 111 一级学科（学术型硕士对应）
-- ============================================
INSERT OR REPLACE INTO first_level_disciplines VALUES
-- 01 哲学
('0101', '哲学', 'Philosophy', '01', '一级学科'),
-- 02 经济学
('0201', '理论经济学', 'Theoretical Economics', '02', ''),
('0202', '应用经济学', 'Applied Economics', '02', '金融学/国际贸易等'),
-- 03 法学
('0301', '法学', 'Law', '03', ''),
('0302', '政治学', 'Political Science', '03', ''),
('0303', '社会学', 'Sociology', '03', ''),
('0304', '民族学', 'Ethnology', '03', ''),
('0305', '马克思主义理论', 'Marxist Theory', '03', ''),
('0306', '公安学', 'Public Security', '03', ''),
-- 04 教育学
('0401', '教育学', 'Education', '04', ''),
('0402', '心理学', 'Psychology', '04', ''),
('0403', '体育学', 'Physical Education', '04', ''),
-- 05 文学
('0501', '中国语言文学', 'Chinese Literature', '05', ''),
('0502', '外国语言文学', 'Foreign Languages', '05', ''),
('0503', '新闻传播学', 'Journalism', '05', ''),
-- 06 历史学
('0601', '考古学', 'Archaeology', '06', ''),
('0602', '中国史', 'Chinese History', '06', ''),
('0603', '世界史', 'World History', '06', ''),
-- 07 理学
('0701', '数学', 'Mathematics', '07', ''),
('0702', '物理学', 'Physics', '07', ''),
('0703', '化学', 'Chemistry', '07', ''),
('0704', '天文学', 'Astronomy', '07', ''),
('0705', '地理学', 'Geography', '07', ''),
('0706', '大气科学', 'Atmospheric Science', '07', ''),
('0707', '海洋科学', 'Oceanography', '07', ''),
('0708', '地球物理学', 'Geophysics', '07', ''),
('0709', '地质学', 'Geology', '07', ''),
('0710', '生物学', 'Biology', '07', ''),
('0711', '系统科学', 'Systems Science', '07', ''),
('0712', '科学技术史', 'History of Science', '07', ''),
('0713', '生态学', 'Ecology', '07', ''),
('0714', '统计学', 'Statistics', '07', ''),
-- 08 工学
('0801', '力学', 'Mechanics', '08', ''),
('0802', '机械工程', 'Mechanical Engineering', '08', ''),
('0803', '光学工程', 'Optical Engineering', '08', ''),
('0804', '仪器科学与技术', 'Instrument Science', '08', ''),
('0805', '材料科学与工程', 'Materials Science', '08', ''),
('0806', '冶金工程', 'Metallurgical Engineering', '08', ''),
('0807', '动力工程及工程热物理', 'Power Engineering', '08', ''),
('0808', '电气工程', 'Electrical Engineering', '08', ''),
('0809', '电子科学与技术', 'Electronic Science', '08', ''),
('0810', '信息与通信工程', 'Information and Communications', '08', ''),
('0811', '控制科学与工程', 'Control Science', '08', ''),
('0812', '计算机科学与技术', 'Computer Science', '08', ''),
('0813', '建筑学', 'Architecture', '08', ''),
('0814', '土木工程', 'Civil Engineering', '08', ''),
('0815', '水利工程', 'Hydraulic Engineering', '08', ''),
('0816', '测绘科学与技术', 'Surveying', '08', ''),
('0817', '化学工程与技术', 'Chemical Engineering', '08', ''),
('0818', '地质资源与地质工程', 'Geological Resources', '08', ''),
('0819', '矿业工程', 'Mining Engineering', '08', ''),
('0820', '石油与天然气工程', 'Petroleum Engineering', '08', ''),
('0821', '纺织科学与工程', 'Textile Science', '08', ''),
('0822', '轻工技术与工程', 'Light Industry', '08', ''),
('0823', '交通运输工程', 'Transportation Engineering', '08', ''),
('0824', '船舶与海洋工程', 'Naval Architecture', '08', ''),
('0825', '航空宇航科学与技术', 'Aerospace Science', '08', ''),
('0826', '兵器科学与技术', 'Weapons Science', '08', ''),
('0827', '核科学与技术', 'Nuclear Science', '08', ''),
('0828', '农业工程', 'Agricultural Engineering', '08', ''),
('0829', '林业工程', 'Forestry Engineering', '08', ''),
('0830', '环境科学与工程', 'Environmental Engineering', '08', ''),
('0831', '生物医学工程', 'Biomedical Engineering', '08', ''),
('0832', '食品科学与工程', 'Food Science', '08', ''),
('0833', '城乡规划学', 'Urban Planning', '08', ''),
('0834', '风景园林学', 'Landscape Architecture', '08', ''),
('0835', '软件工程', 'Software Engineering', '08', ''),
('0836', '生物工程', 'Bioengineering', '08', ''),
('0837', '安全科学与工程', 'Safety Science', '08', ''),
('0838', '公安技术', 'Public Security Technology', '08', ''),
('0839', '网络空间安全', 'Cyberspace Security', '08', ''),
('0840', '遥感科学与技术', 'Remote Sensing', '08', ''),
('0841', '智能科学与技术', 'AI & Intelligent Science', '08', ''),
('0842', '集成电路科学与工程', 'Integrated Circuit Engineering', '08', ''),
('0843', '国家安全学', 'National Security', '08', ''),
('0844', '设计学（工学）', 'Design (Engineering)', '08', ''),
-- 09 农学
('0901', '作物学', 'Crop Science', '09', ''),
('0902', '园艺学', 'Horticulture', '09', ''),
('0903', '农业资源与环境', 'Agricultural Resources', '09', ''),
('0904', '植物保护', 'Plant Protection', '09', ''),
('0905', '畜牧学', 'Animal Science', '09', ''),
('0906', '兽医学', 'Veterinary Medicine', '09', ''),
('0907', '林学', 'Forestry', '09', ''),
('0908', '水产', 'Aquaculture', '09', ''),
('0909', '草学', 'Grassland Science', '09', ''),
-- 10 医学
('1001', '基础医学', 'Basic Medicine', '10', ''),
('1002', '临床医学', 'Clinical Medicine', '10', ''),
('1003', '口腔医学', 'Stomatology', '10', ''),
('1004', '公共卫生与预防医学', 'Public Health', '10', ''),
('1005', '中医学', 'Traditional Chinese Medicine', '10', ''),
('1006', '中西医结合', 'TCM & Western Medicine', '10', ''),
('1007', '药学', 'Pharmacy', '10', ''),
('1008', '中药学', 'Chinese Pharmacology', '10', ''),
('1009', '特种医学', 'Special Medicine', '10', ''),
('1010', '医学技术', 'Medical Technology', '10', ''),
('1011', '护理学', 'Nursing', '10', ''),
('1012', '法医学', 'Forensic Medicine', '10', ''),
-- 11 军事学（略去，非民用）
('1101', '军事思想及军事历史', 'Military Thought', '11', ''),
-- 12 管理学
('1201', '管理科学与工程', 'Management Science', '12', ''),
('1202', '工商管理学', 'Business Administration', '12', ''),
('1203', '农林经济管理', 'Agricultural Economics', '12', ''),
('1204', '公共管理学', 'Public Administration', '12', ''),
('1205', '图书情报与档案管理', 'Library and Information Science', '12', ''),
('1206', '物流管理与工程', 'Logistics Management', '12', ''),
('1207', '工业工程与管理', 'Industrial Engineering', '12', ''),
('1208', '应急管理', 'Emergency Management', '12', ''),
-- 13 艺术学
('1301', '艺术学', 'Art Studies', '13', ''),
('1302', '音乐与舞蹈学', 'Music and Dance', '13', ''),
('1303', '戏剧与影视', 'Drama and Film', '13', ''),
('1304', '美术与书法', 'Fine Arts & Calligraphy', '13', ''),
('1305', '设计学（艺术学）', 'Design (Arts)', '13', '');


-- ============================================
-- 47 类专业硕士（2022 版学位目录）
-- ============================================
INSERT OR REPLACE INTO professional_degrees VALUES
-- 02 经济类专硕
('0251', '金融', 'Master of Finance', '02', 'MF', ''),
('0252', '应用统计', 'Applied Statistics', '02', '', ''),
('0253', '税务', 'Taxation', '02', '', ''),
('0254', '国际商务', 'International Business', '02', 'MIB', ''),
('0255', '保险', 'Insurance', '02', '', ''),
('0256', '资产评估', 'Asset Appraisal', '02', '', ''),
('0257', '数字经济', 'Digital Economics', '02', '', '2024 新增'),
-- 03 法律专硕
('0351', '法律', 'Juris Master', '03', 'JM', ''),
('0352', '社会工作', 'Social Work', '03', 'MSW', ''),
('0353', '警务', 'Police Affairs', '03', '', ''),
('0354', '国际事务', 'International Affairs', '03', 'MIA', ''),
-- 04 教育类专硕
('0451', '教育', 'Education', '04', 'MED', ''),
('0452', '体育', 'Sports', '04', '', ''),
('0453', '汉语国际教育', 'Chinese International Education', '04', '', ''),
('0454', '应用心理', 'Applied Psychology', '04', '', ''),
-- 05 文学类专硕
('0551', '翻译', 'Translation', '05', 'MTI', ''),
('0552', '新闻与传播', 'Journalism and Communication', '05', '', ''),
('0553', '出版', 'Publishing', '05', '', ''),
-- 07 理学类专硕
('0751', '文物与博物馆', 'Cultural Relics and Museum', '06', '', ''),
-- 08 工学类专硕
('0854', '电子信息', 'Electronic Information', '08', '', ''),
('0855', '机械', 'Mechanical', '08', '', ''),
('0856', '材料与化工', 'Materials and Chemical Engineering', '08', '', ''),
('0857', '资源与环境', 'Resources and Environment', '08', '', ''),
('0858', '能源动力', 'Energy and Power', '08', '', ''),
('0859', '土木水利', 'Civil and Hydraulic Engineering', '08', '', ''),
('0860', '生物与医药', 'Biology and Pharmacy', '08', '', ''),
('0861', '交通运输', 'Transportation', '08', '', ''),
('0862', '农业', 'Agriculture', '09', '', ''),
('0863', '兽医', 'Veterinary', '09', '', ''),
('0864', '林业', 'Forestry', '09', '', ''),
-- 10 医学专硕
('1051', '临床医学', 'Clinical Medicine', '10', '', ''),
('1052', '口腔医学', 'Stomatology', '10', '', ''),
('1053', '公共卫生', 'Public Health', '10', 'MPH', ''),
('1054', '护理', 'Nursing', '10', 'MSN', ''),
('1055', '药学', 'Pharmacy', '10', 'MPharm', ''),
('1056', '中药学', 'TCM Pharmacy', '10', '', ''),
('1057', '中医', 'TCM', '10', '', ''),
-- 12 管理类专硕
('1251', '工商管理', 'MBA', '12', 'MBA', ''),
('1252', '公共管理', 'MPA', '12', 'MPA', ''),
('1253', '会计', 'Accounting', '12', 'MPAcc', ''),
('1254', '旅游管理', 'Tourism Management', '12', 'MTA', ''),
('1255', '图书情报', 'Library and Information', '12', 'MLIS', ''),
('1256', '工程管理', 'Engineering Management', '12', 'MEM', ''),
('1257', '审计', 'Audit', '12', 'MAud', ''),
('1258', '学校管理', 'School Management', '12', '', ''),
-- 13 艺术类专硕
('1351', '艺术', 'Arts', '13', 'MFA', ''),
-- 军事
('1151', '军事', 'Military', '11', '', '');
