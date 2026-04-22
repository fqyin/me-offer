# Me Offer · PDF 真题解析器（第二代）
#
# 输入：data_raw/gaokao_pdf_official/{province}/{subject}_2025.pdf
# 输出：
#   data_raw/gaokao_text/{province}_{subject}_2025.json（结构化题目数据）
#   assets/gaokao_images/{province}_{subject}_2025/*.png（提取的原图）
#
# 关键特性：
# 1. 使用 PyMuPDF (fitz) 保留文本+图片+表格位置信息
# 2. 自动切分题目（1-N 题 + 答案区）
# 3. 图片按页码 + Y 坐标定位，关联到最近的题号
# 4. 表格检测（Q2 "部位1/部位2..." 这种）转 HTML table
# 5. 答案区解析【答案】+【详解】+【小问N详解】
# 6. 图片 2x 放大保存（PIL 后处理）

import os
import re
import json
import fitz  # PyMuPDF

PDF_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_pdf_official'
TEXT_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_text'
IMG_DIR = '/Users/fuqiangyin/Code-Files/me-offer/assets/gaokao_images'

# ======== 文本提取 ========

def extract_full_text(pdf_path):
	doc = fitz.open(pdf_path)
	pages = []
	for p in doc:
		pages.append(p.get_text())
	doc.close()
	return '\n'.join(pages), pages

# ======== 图片提取 ========

def extract_images(pdf_path, out_dir):
	'''
	智能提取：过滤水印、logo、推广图
	策略：
	  1. 统计每个 xref 在多少页出现 → 跨页重复的就是水印背景
	  2. 尺寸 > 2000×3000 → 整页水印
	  3. 页面位于最后一页 + 宽高比异常 → 推广 logo/二维码
	  4. 同页多次出现的同一 xref 也认为是装饰
	'''
	os.makedirs(out_dir, exist_ok=True)
	doc = fitz.open(pdf_path)
	total_pages = len(doc)

	# 第一轮：统计每个 xref 出现的页数
	xref_pages = {}
	for page_idx, page in enumerate(doc):
		seen = set()
		for img_info in page.get_images(full=True):
			xref = img_info[0]
			if xref not in seen:
				xref_pages.setdefault(xref, set()).add(page_idx + 1)
				seen.add(xref)

	# 确定黑名单 xref
	blacklist = set()
	for xref, pages in xref_pages.items():
		# 跨 3 页及以上的视为水印/装饰
		if len(pages) >= 3:
			blacklist.add(xref)

	# 第二轮：真正保存图片
	records = []
	img_count = 0

	for page_idx, page in enumerate(doc):
		page_num = page_idx + 1
		for img_info in page.get_images(full=True):
			xref = img_info[0]
			if xref in blacklist:
				continue

			try:
				pix = fitz.Pixmap(doc, xref)
				if pix.n - pix.alpha > 3:	# CMYK → RGB
					pix = fitz.Pixmap(fitz.csRGB, pix)

				# 整页水印判断
				if pix.width >= 2000 and pix.height >= 3000:
					pix = None
					continue

				# 位置和宽高比
				rects = page.get_image_rects(xref)
				if not rects:
					pix = None
					continue
				r = rects[0]
				ratio = pix.width / pix.height if pix.height > 0 else 0

				# 最后一页的所有图：都是推广
				if page_num == total_pages:
					pix = None
					continue

				# 横长条 logo（宽高比 > 4）且尺寸大 → 推广条幅
				if ratio > 4.0 and pix.width > 800:
					pix = None
					continue

				# 位于页眉（y < 80）或页脚（y > 762）的横条
				if ratio > 2.5 and (r.y0 < 80 or r.y1 > 770):
					pix = None
					continue

				img_count += 1
				fname = 'image' + str(img_count) + '.png'
				dest = os.path.join(out_dir, fname)
				pix.save(dest)

				records.append({
					'page':		page_num,
					'y':		r.y0,
					'filename':	fname,
					'xref':		xref,
					'width':	pix.width,
					'height':	pix.height
				})
				pix = None
			except Exception as e:
				print('[img-err] page', page_idx, 'xref', xref, e)

	doc.close()
	return records

# ======== 图片清晰化：2x + sharpen ========

def upscale_images(img_dir):
	try:
		from PIL import Image, ImageFilter
	except ImportError:
		print('[warn] PIL not installed, skipping upscale. Run: pip3 install pillow')
		return

	for fname in os.listdir(img_dir):
		if not fname.endswith('.png'):
			continue
		path = os.path.join(img_dir, fname)
		try:
			img = Image.open(path)
			w, h = img.size
			if w < 100 or h < 100:	# 跳过太小的（页眉 logo）
				continue
			# 2x 放大（LANCZOS 高质量）
			img2 = img.resize((w * 2, h * 2), Image.LANCZOS)
			# 轻微锐化
			img2 = img2.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=3))
			img2.save(path, optimize=True)
		except Exception as e:
			print('[upscale-err]', fname, e)

# ======== 题目切分 ========

def split_questions(full_text):
	# 答案区开始标记
	ans_start = full_text.find('参考答案')
	if ans_start < 0:
		ans_start = len(full_text)

	body = full_text[:ans_start]
	ans_body = full_text[ans_start:]

	# 按题号切（行首数字加点）
	# 清理页码行 "第X页/共X页"
	body = re.sub(r'第\s*\d+\s*页/共\s*\d+\s*页', '', body)
	body = re.sub(r'\n\s*\n', '\n', body)

	# 正则切分（半角 . 或 全角 ．）
	parts = re.split(r'(?:^|\n)\s*(\d{1,2})[．.]\s*', body)
	questions = {}
	i = 1
	while i + 1 < len(parts):
		no = int(parts[i])
		content = parts[i + 1]
		if 1 <= no <= 40:
			questions[no] = content.strip()
		i += 2

	return questions, ans_body

# ======== 表格检测 ========

def detect_and_format_table(text):
	'''
	检测 Q2 "选项 部位1 部位2 部位3 部位4" 式表格（PDF 解出来是每格一行）
	转成 HTML <table>
	'''
	# 模式：找到 "选项" 和 "部位1" 之间的表格区
	# 然后贪婪抓 "A/B/C/D 数据行" 直到 A. A 选项
	pat = re.compile(r'(选项\s*\n\s*部位1\s*\n\s*部位2\s*\n\s*部位3\s*\n\s*部位4\s*\n)(.+?)(\s*\n\s*A[.．]\s*A\s*\n)', re.DOTALL)
	m = pat.search(text)
	if m:
		table_body = m.group(2).strip()
		# 按行切，每行一个单元格
		cells = [c.strip() for c in table_body.split('\n') if c.strip()]
		# 应该是 5 (标题行的 A 列) + 4 × 4 数据 = 20 格，但"选项"列已在 header
		# 实际每行是 "A 大量 少量 少量 无" 或分成 5 行：A / 大量 / 少量 / 少量 / 无
		# 如果分成 5 行，那总共 20 格

		html = '<table class="q-table"><thead><tr><th>选项</th><th>部位1</th><th>部位2</th><th>部位3</th><th>部位4</th></tr></thead><tbody>'
		# 按 5 格一行分组
		if len(cells) % 5 == 0:
			for i in range(0, len(cells), 5):
				row = cells[i:i+5]
				html += '<tr>' + ''.join('<td>' + c + '</td>' for c in row) + '</tr>'
		html += '</tbody></table>'

		# 替换整块（表格头 + 表格体 + 选项回顾）
		replaced = text.replace(m.group(0), '\n' + html + '\n\nA. 见上表 A 行\nB. 见上表 B 行\nC. 见上表 C 行\nD. 见上表 D 行\n')
		return replaced, True

	# 模式 2：Q21 式单元格表（"174/174" 重复数表格）
	# TODO: 其他题的表格模式

	return text, False

# ======== 题干 + 选项切分 ========

def parse_stem_options(raw):
	# 先清理多余空白
	text = re.sub(r'\n+', '\n', raw).strip()

	# 尝试检测表格
	text, has_table = detect_and_format_table(text)

	# 找首个 A. 起点（A 前可能是换行或空格；用 lookbehind 保持 m.start() 指向 A）
	m = re.search(r'(?<=[\s\n\u3000])(A)[．.](?=[\s\u3000])', text)
	if not m:
		# 回退到段首 A
		m = re.search(r'^A[．.]', text, re.MULTILINE)
	if not m:
		return text.replace('\n', ' ').strip(), [], has_table

	stem = text[:m.start()].strip()
	opt_body = text[m.start():].strip()

	# 按 A./B./C./D. 切选项
	pattern = re.compile(r'([A-D])[．.]\s*')
	positions = [(mm.start(1), mm.group(1), mm.end()) for mm in pattern.finditer(opt_body)]

	expected = ['A', 'B', 'C', 'D']
	chosen = []
	idx = 0
	for pos, label, end in positions:
		if idx < 4 and label == expected[idx]:
			chosen.append((pos, label, end))
			idx += 1

	options = []
	for i, (pos, label, end) in enumerate(chosen):
		next_pos = chosen[i + 1][0] if i + 1 < len(chosen) else len(opt_body)
		opt_text = opt_body[end:next_pos].strip().replace('\n', ' ')
		if len(opt_text) > 600:
			opt_text = opt_text[:600]
		options.append({'label': label, 'text': opt_text})

	return stem.replace('\n', ' ').strip(), options, has_table

# ======== 答案解析 ========

def parse_answers(ans_body):
	'''
	两种风格：
	  北京：N. 【答案】... 【分析】... 【详解】...
	  山东：选择题 "1.A  2.C  3.D ..."；非选择题 "21.\n（1）①.xxx（2）yyy"
	'''
	answers = {}

	# === 风格 A（北京）===
	positions = []
	for m in re.finditer(r'(?:^|\n)\s*(\d{1,2})[．.]\s*【答案】', ans_body):
		positions.append((int(m.group(1)), m.start(), m.end()))

	for i, (no, start, end) in enumerate(positions):
		next_start = positions[i + 1][1] if i + 1 < len(positions) else len(ans_body)
		block = ans_body[end:next_start].strip()

		ana_m = re.search(r'【分析】|【详解】|【小问1\s*详解】', block)
		if ana_m:
			ans_only = block[:ana_m.start()].strip()
			analysis = block[ana_m.start():].strip()
		else:
			ans_only = block
			analysis = ''

		short = ''
		sm = re.match(r'^([A-D]{1,4})\s*$', ans_only)
		if sm:
			short = sm.group(1)

		answers[no] = {
			'answer':	ans_only,
			'short':	short,
			'analysis':	analysis
		}

	if answers:
		return answers

	# === 风格 B（山东）: 无【答案】标签 ===
	# B1: "1.A\n2.B" 或 "10.D 11.C 12.A" 逐题格式
	choice_pat = re.compile(r'(?<![．.\d])(\d{1,2})[．.]([A-D]{1,4})(?=[\s\n]|$)')
	for m in choice_pat.finditer(ans_body):
		no = int(m.group(1))
		ans = m.group(2)
		if 1 <= no <= 40 and no not in answers:
			answers[no] = {
				'answer':	ans,
				'short':	ans,
				'analysis':	''
			}

	# B2: 压缩格式 "1-15CADAC  ACDCD  AADDB"（山东历史专用）
	compact_pat = re.compile(r'(\d{1,2})[-－~](\d{1,2})\s*([A-D\s]+?)(?=\n|\d{1,2}[．.]|\n\s*\d)')
	for m in compact_pat.finditer(ans_body):
		start_no = int(m.group(1))
		end_no = int(m.group(2))
		letters = re.sub(r'\s+', '', m.group(3))
		expected_count = end_no - start_no + 1
		if len(letters) == expected_count and expected_count > 0 and expected_count <= 20:
			for i, letter in enumerate(letters):
				no = start_no + i
				if letter in 'ABCD' and no not in answers:
					answers[no] = {
						'answer':	letter,
						'short':	letter,
						'analysis':	''
					}

	# 非选择题：找 "N.\n（1）..." 格式
	# 定位所有 "N."（非字母结尾）
	non_choice_starts = []
	for m in re.finditer(r'(?:^|\n)\s*(\d{1,2})[．.]\s*(?:\n|（)', ans_body):
		no = int(m.group(1))
		if 1 <= no <= 40:
			non_choice_starts.append((no, m.start(), m.end()))

	for i, (no, start, end) in enumerate(non_choice_starts):
		next_start = non_choice_starts[i + 1][1] if i + 1 < len(non_choice_starts) else len(ans_body)
		block = ans_body[end:next_start].strip()
		# 去掉末尾版权声明等
		block = re.split(r'\n\s*专注北京高中升学|\n\s*咨询热线|\n\s*关于我们', block)[0].strip()
		if block and len(block) > 5:
			# 非选择题以文本答案存储，没有字母 short
			answers[no] = {
				'answer':	block,
				'short':	'',
				'analysis':	''
			}

	return answers

# ======== 图片归属到题号 ========

def assign_images_to_questions(image_records, pages_text):
	'''
	图片按页码和 Y 坐标，找当前页面最近在其之前的题号
	'''
	# 为每个图片定位所属题号
	assignments = {}  # qno -> [image_filename]
	for img in image_records:
		page_idx = img['page'] - 1
		if page_idx >= len(pages_text):
			continue
		page_text = pages_text[page_idx]
		# 扫描页面上的题号位置（半角/全角都支持）
		qnos_on_page = []
		for m in re.finditer(r'(?:^|\n)\s*(\d{1,2})[．.]\s*', page_text):
			qnos_on_page.append(int(m.group(1)))

		# Y 坐标匹配：PyMuPDF 的 y 单位是 points
		# 简化策略：图片归属到同页最后一个出现的题号
		if qnos_on_page:
			qno = max(qnos_on_page)
			if 1 <= qno <= 40:
				assignments.setdefault(qno, []).append(img['filename'])

	return assignments

# ======== 过滤装饰图 ========

def filter_decoration_images(img_dir):
	'''删除明显的装饰图（页眉/页脚/logo）：尺寸 < 80x80 或 字节 < 3KB'''
	removed = []
	for fname in list(os.listdir(img_dir)):
		if not fname.endswith('.png'):
			continue
		path = os.path.join(img_dir, fname)
		size = os.path.getsize(path)
		if size < 3000:
			os.remove(path)
			removed.append(fname)
	return removed

# ======== 主流程 ========

def process(province, subject, year):
	pdf = os.path.join(PDF_DIR, province, subject + '_' + str(year) + '.pdf')
	if not os.path.exists(pdf):
		print('[err] pdf not found:', pdf)
		return None

	print('=== ' + province + ' ' + subject + ' ' + str(year) + ' ===')

	# 1. 提取文本
	full_text, pages = extract_full_text(pdf)
	print('[text] total=' + str(len(full_text)), 'pages=' + str(len(pages)))

	# 2. 提取图片
	img_out = os.path.join(IMG_DIR, province + '_' + subject + '_' + str(year))
	# 清空旧图
	if os.path.exists(img_out):
		for f in os.listdir(img_out):
			os.remove(os.path.join(img_out, f))
	image_records = extract_images(pdf, img_out)
	print('[image] extracted=' + str(len(image_records)))

	# 过滤+放大
	removed = filter_decoration_images(img_out)
	print('[image] decoration removed=' + str(len(removed)))
	upscale_images(img_out)
	remaining = [f for f in os.listdir(img_out) if f.endswith('.png')]
	print('[image] final=' + str(len(remaining)))

	# 更新 image_records（过滤掉被删的）
	valid_images = set(remaining)
	image_records = [r for r in image_records if r['filename'] in valid_images]

	# 3. 切题 + 答案
	qmap, ans_body = split_questions(full_text)
	answers = parse_answers(ans_body)
	print('[split] questions=' + str(len(qmap)), 'answers=' + str(len(answers)))

	# 4. 图片归属
	img_assign = assign_images_to_questions(image_records, pages)

	# 5. 组装每题
	questions = []
	for no in sorted(qmap.keys()):
		stem, options, has_table = parse_stem_options(qmap[no])
		ans = answers.get(no, {})
		imgs = img_assign.get(no, [])

		q = {
			'no':				no,
			'type':				'选择题' if options else '非选择题',
			'stem':				stem,
			'stem_has_table':	has_table,
			'options':			options,
			'answer':			ans.get('short', ''),
			'answer_full':		ans.get('answer', ''),
			'analysis':			ans.get('analysis', ''),
			'stem_images':		imgs,
			'analysis_images':	[]
		}
		questions.append(q)

	result = {
		'province':			province,
		'subject':			subject,
		'year':				year,
		'source':			'cdn.gaokzx.com（北京高考在线团队 · 官方答案+详解版）',
		'source_pdf':		os.path.basename(pdf),
		'image_dir':		province + '_' + subject + '_' + str(year),
		'questions_count':	len(questions),
		'questions':		questions
	}

	os.makedirs(TEXT_DIR, exist_ok=True)
	out_path = os.path.join(TEXT_DIR, province + '_' + subject + '_' + str(year) + '.json')
	with open(out_path, 'w', encoding='utf-8') as f:
		json.dump(result, f, ensure_ascii=False, indent=2)

	# 统计
	with_ans = sum(1 for q in questions if q['answer'] or q['answer_full'])
	with_ana = sum(1 for q in questions if q['analysis'])
	with_img = sum(1 for q in questions if q['stem_images'])
	with_tab = sum(1 for q in questions if q['stem_has_table'])
	print('[stats] ans=' + str(with_ans), 'analysis=' + str(with_ana), 'images=' + str(with_img), 'tables=' + str(with_tab))
	print('[ok]', out_path)
	return result

def main():
	tasks = [
		('beijing', 'biology', 2025),
		('beijing', 'politics', 2025),
		('beijing', 'history', 2025),
		('beijing', 'geography', 2025),
		('shandong', 'biology', 2025),
		('shandong', 'politics', 2025),
		('shandong', 'history', 2025),
		('shandong', 'geography', 2025)
	]
	for p, s, y in tasks:
		try:
			process(p, s, y)
		except Exception as e:
			import traceback
			traceback.print_exc()

if __name__ == '__main__':
	main()
