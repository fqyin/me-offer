# Me Offer · 高考真题抓取 · Step 2: docx → 结构化 JSON（含图片）
#
# 处理要点：
# 1. 按段落顺序扫描 XML，保持 "图在哪道题之后" 关系
# 2. 提取 word/media/* 所有图片保留原名
# 3. WMF 转 PNG（macOS 用 sips 或 pillow；这里先存路径，后续统一转）
# 4. 切分答案/解析区块

import os
import re
import json
import shutil
import zipfile

BASE_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_pdf'
OUT_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_text'
IMG_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_images'

# GBK 修复 + 解压
def unzip_gbk(zip_path, out_dir):
	os.makedirs(out_dir, exist_ok=True)
	extracted = []
	with zipfile.ZipFile(zip_path) as z:
		for info in z.infolist():
			try:
				fixed = info.filename.encode('cp437').decode('gbk')
			except:
				fixed = info.filename
			dest = os.path.join(out_dir, fixed)
			with z.open(info) as src, open(dest, 'wb') as dst:
				dst.write(src.read())
			extracted.append(dest)
	return extracted

# 解析 rels 拿到 rId -> image path
def parse_rels(docx_path):
	with zipfile.ZipFile(docx_path) as z:
		rels_xml = z.read('word/_rels/document.xml.rels').decode('utf-8')
	rid_to_image = {}
	for m in re.finditer(r'<Relationship Id="([^"]+)" Type="[^"]*relationships/image" Target="([^"]+)"', rels_xml):
		rid = m.group(1)
		target = m.group(2)
		rid_to_image[rid] = target
	return rid_to_image

# 页眉页脚里引用的图（需要从正文归属中排除）
def parse_header_footer_images(docx_path):
	decoration_images = set()
	with zipfile.ZipFile(docx_path) as z:
		names = z.namelist()
		for rels_path in names:
			if not rels_path.endswith('.xml.rels'):
				continue
			if '/header' not in rels_path and '/footer' not in rels_path:
				continue
			xml = z.read(rels_path).decode('utf-8')
			for m in re.finditer(r'Target="(media/[^"]+)"', xml):
				decoration_images.add(os.path.basename(m.group(1)))
	return decoration_images

# 提取 media 图片到独立目录
def extract_images(docx_path, image_out_dir):
	os.makedirs(image_out_dir, exist_ok=True)
	copied = {}
	with zipfile.ZipFile(docx_path) as z:
		for name in z.namelist():
			if not name.startswith('word/media/'):
				continue
			basename = os.path.basename(name)
			if not basename:
				continue
			dest = os.path.join(image_out_dir, basename)
			with z.open(name) as src, open(dest, 'wb') as dst:
				dst.write(src.read())
			copied[basename] = dest
	return copied

# 按段落顺序扫描 document.xml：每个 <w:p>...</w:p> 块输出 (text, [image_rids])
def walk_paragraphs(docx_path):
	with zipfile.ZipFile(docx_path) as z:
		xml = z.read('word/document.xml').decode('utf-8')

	paragraphs = []
	# 段落块
	for m in re.finditer(r'<w:p\b[^>]*>.*?</w:p>', xml, re.DOTALL):
		block = m.group(0)

		# 该段落内所有嵌入图 rId
		img_rids = []
		for im in re.finditer(r'r:embed="([^"]+)"', block):
			img_rids.append(im.group(1))
		for im in re.finditer(r'r:id="([^"]+)"', block):
			# wmf/oleobject 也用 r:id
			rid = im.group(1)
			if rid not in img_rids:
				img_rids.append(rid)

		# 段落纯文本
		text = re.sub(r'<[^>]+>', '', block)
		paragraphs.append({'text': text, 'img_rids': img_rids})

	return paragraphs

# 从段落流切分题目 + 按题号关联图片
# 本文档布局：题面 + 【N题答案】标签交错；答案标签之后的段落归解析
def split_by_question(paragraphs, rid_to_image):
	questions = {}
	current_no = None
	in_answer_block = False		# 是否在 【X题答案】 块中
	answer_target_no = None		# 当前答案块属于哪道题

	q_head = re.compile(r'^(\d{1,2})\.\s*(.+)', re.DOTALL)
	ans_tag = re.compile(r'【(\d+)题答案】')
	ans_body_tag = re.compile(r'【答案】\s*(.*)', re.DOTALL)

	for p in paragraphs:
		text = p['text'].strip()
		# 空文本但可能有图：还是要挂载到当前题号
		if not text and p['img_rids']:
			if in_answer_block and answer_target_no is not None:
				q = questions.setdefault(answer_target_no, {
					'no':			answer_target_no,
					'paragraphs':	[],
					'image_rids':	[],
					'answer_lines':	[],
					'answer_image_rids': []
				})
				for rid in p['img_rids']:
					if rid in rid_to_image:
						q.setdefault('answer_image_rids', []).append(rid)
			elif current_no is not None:
				for rid in p['img_rids']:
					if rid in rid_to_image:
						questions[current_no]['image_rids'].append(rid)
			continue
		if not text:
			continue

		# 答案标签：【N题答案】
		at = ans_tag.search(text)
		if at:
			answer_target_no = int(at.group(1))
			in_answer_block = True
			# 标签后可能紧跟【答案】内容在同一段
			rest = text[at.end():].strip()
			bm = ans_body_tag.match(rest)
			if bm and answer_target_no in questions:
				questions[answer_target_no]['answer_lines'].append(bm.group(1).strip())
			continue

		# 在答案块中：累积解析文本
		if in_answer_block and answer_target_no is not None:
			if answer_target_no not in questions:
				# 可能答案先于题目出现（不太会，但兜底）
				questions[answer_target_no] = {
					'no':			answer_target_no,
					'paragraphs':	[],
					'image_rids':	[],
					'answer_lines':	[]
				}
			bm = ans_body_tag.match(text)
			payload = bm.group(1).strip() if bm else text
			questions[answer_target_no]['answer_lines'].append(payload)
			for rid in p['img_rids']:
				if rid in rid_to_image:
					# 答案区图片也留着（解析配图）
					questions[answer_target_no].setdefault('answer_image_rids', []).append(rid)
			continue

		# 题号开头
		m = q_head.match(text)
		if m:
			no = int(m.group(1))
			if 1 <= no <= 40:
				current_no = no
				if current_no not in questions:
					questions[current_no] = {
						'no':			current_no,
						'paragraphs':	[],
						'image_rids':	[],
						'answer_lines':	[]
					}
				questions[current_no]['paragraphs'].append(m.group(2))
				for rid in p['img_rids']:
					if rid in rid_to_image:
						questions[current_no]['image_rids'].append(rid)
				continue

		# 非题号、非答案 — 续写当前题
		if current_no is not None:
			questions[current_no]['paragraphs'].append(text)
			for rid in p['img_rids']:
				if rid in rid_to_image:
					questions[current_no]['image_rids'].append(rid)

	return questions, ''

# 从拼接的题目段落中切分 stem + 选项
def parse_stem_options(paragraphs):
	joined = '\n'.join(paragraphs)

	# 检测表格型选择题：A. AB. BC. CD. D 这种连锁模式（选项内容在表格里）
	# 特征：字母紧挨字母，没有空格分词的正常文本
	compact = re.search(r'([A-D])[.．]\s*([A-D])([A-D])[.．]\s*([A-D])([A-D])[.．]\s*([A-D])([A-D])[.．]\s*([A-D])', joined)
	if compact:
		# 整个字符串就是 "A. AB. BC. CD. D"，说明选项内容在表格里显示
		stem = joined[:compact.start()].strip()
		options = [
			{'label': 'A', 'text': '（见题干表格第 A 行）'},
			{'label': 'B', 'text': '（见题干表格第 B 行）'},
			{'label': 'C', 'text': '（见题干表格第 C 行）'},
			{'label': 'D', 'text': '（见题干表格第 D 行）'}
		]
		return stem.replace('\n', ' ').strip(), options

	# 常规模式：找到首个 "A." 或 "A．" 的位置
	# 要避免匹配选项文本内部的字母（如 "ATP" 的 A 后没有句点）
	first_opt = re.search(r'(?:^|\n|[\s（(])A[.．]\s*', joined)
	if first_opt:
		# first_opt.end() 指向 A. 后的内容起点
		stem_end = first_opt.end() - 2	# 回退到 A 前
		# 找 A 字母精确位置
		a_pos = joined.rfind('A', first_opt.start(), first_opt.end())
		stem = joined[:a_pos].strip()
		opt_body = joined[a_pos:].strip()
	else:
		stem = joined.strip()
		opt_body = ''

	options = []
	if opt_body:
		# 找所有 [A-D]. 位置（标准模式）+ 兼容行首 "C " 缺句点的情况
		# 关键：A-D 后必须是句点/全角句点 或 换行；这样 "C3"/"A1" 不会误判
		pattern = re.compile(r'([A-D])([.．])')
		positions = [(m.start(1), m.group(1), m.end()) for m in pattern.finditer(opt_body)]
		# 同时补录：行首 "X " 后跟非字母/数字（OCR 漏点）
		for m in re.finditer(r'(?:^|\n)([A-D])[ \t]', opt_body):
			positions.append((m.start(1), m.group(1), m.end()))
		# 排序去重
		positions = sorted(set(positions), key=lambda x: x[0])

		expected = ['A', 'B', 'C', 'D']
		chosen = []
		idx = 0
		for pos, label, end in positions:
			if idx < 4 and label == expected[idx]:
				chosen.append((pos, label, end))
				idx += 1

		for i, (pos, label, end) in enumerate(chosen):
			text_start = end	# 跳过 "A." 或 "A "
			text_end = chosen[i + 1][0] if i + 1 < len(chosen) else len(opt_body)
			text = opt_body[text_start:text_end].strip().replace('\n', ' ')
			if len(text) > 600:
				text = text[:600]
			options.append({'label': label, 'text': text})

	return stem.replace('\n', ' ').strip(), options

# 从答案区拆出 {题号: 答案字母/文字}
def parse_answers(answer_text):
	answers = {}
	# 模式 A: "1. A  2. B  3. C" 或 "1. D"
	for m in re.finditer(r'(?:^|\s|\n)(\d{1,2})[.．、]\s*([A-D]{1,4})(?=\s|$|\n)', answer_text):
		no = int(m.group(1))
		ans = m.group(2)
		if 1 <= no <= 40 and no not in answers:
			answers[no] = ans
	# 模式 B: 题号. 接多段解析文本（非选择题）
	return answers

# 处理单个 docx
def process(province, subject, year):
	zip_path = os.path.join(BASE_DIR, province, subject + '_' + str(year) + '.zip')
	if not os.path.exists(zip_path):
		print('[err] zip not found:', zip_path)
		return None

	extract_dir = os.path.join(BASE_DIR, province, subject + '_' + str(year) + '_extracted')
	files = unzip_gbk(zip_path, extract_dir)
	docx_path = None
	for f in files:
		if f.endswith('.docx'):
			docx_path = f
			break

	if not docx_path:
		print('[err] no docx:', zip_path)
		return None

	# 1. 拉出图片
	img_out = os.path.join(IMG_DIR, province + '_' + subject + '_' + str(year))
	copied = extract_images(docx_path, img_out)
	print('[img]', len(copied), 'images ->', img_out)

	# 2. 解析 rId -> image，以及页眉页脚的装饰图
	rid_to_image = parse_rels(docx_path)
	decoration_images = parse_header_footer_images(docx_path)
	print('[decoration]', decoration_images)

	# 3. 扫段落流
	paragraphs = walk_paragraphs(docx_path)
	print('[xml]', len(paragraphs), 'paragraphs')

	# 4. 切题
	qmap, answer_body = split_by_question(paragraphs, rid_to_image)
	answers = parse_answers(answer_body)
	print('[split]', len(qmap), 'questions,', 'answer_section_len=' + str(len(answer_body)), 'parsed_answers=' + str(len(answers)))

	# 5. 整理输出
	questions = []
	for no in sorted(qmap.keys()):
		q = qmap[no]
		stem, options = parse_stem_options(q['paragraphs'])

		stem_images = []
		for rid in q['image_rids']:
			target = rid_to_image.get(rid, '')
			img_name = os.path.basename(target) if target else ''
			# 排除页眉页脚装饰 + WMF 小装饰
			if not img_name:
				continue
			if img_name in decoration_images:
				continue
			if img_name.lower().endswith('.wmf'):
				continue
			if img_name not in stem_images:
				stem_images.append(img_name)

		analysis_images = []
		for rid in q.get('answer_image_rids', []):
			target = rid_to_image.get(rid, '')
			img_name = os.path.basename(target) if target else ''
			if not img_name:
				continue
			if img_name in decoration_images:
				continue
			if img_name.lower().endswith('.wmf'):
				continue
			if img_name not in analysis_images:
				analysis_images.append(img_name)

		answer_raw = '\n'.join(q.get('answer_lines', [])).strip()
		# 对选择题尝试提取纯字母答案
		short_ans = ''
		m_letter = re.match(r'^([A-D]{1,4})\b', answer_raw)
		if m_letter:
			short_ans = m_letter.group(1)

		questions.append({
			'no':				no,
			'type':				'选择题' if options else '非选择题',
			'stem':				stem,
			'options':			options,
			'answer':			short_ans,
			'analysis':			answer_raw,
			'stem_images':		stem_images,
			'analysis_images':	analysis_images
		})

	out = {
		'province':			province,
		'subject':			subject,
		'year':				year,
		'source_file':		os.path.basename(docx_path),
		'image_dir':		province + '_' + subject + '_' + str(year),
		'total_images':		len(copied),
		'answer_section':	answer_body,
		'questions_count':	len(questions),
		'questions':		questions
	}

	os.makedirs(OUT_DIR, exist_ok=True)
	out_path = os.path.join(OUT_DIR, province + '_' + subject + '_' + str(year) + '.json')
	with open(out_path, 'w', encoding='utf-8') as f:
		json.dump(out, f, ensure_ascii=False, indent=2)
	print('[ok]', out_path)
	return out

def main():
	tasks = [
		('beijing', 'biology', 2025),
		('shandong', 'biology', 2025)
	]
	for p, s, y in tasks:
		try:
			process(p, s, y)
		except Exception as e:
			import traceback
			traceback.print_exc()
			print('[err]', p, s, e)

if __name__ == '__main__':
	main()
