#!/usr/bin/env python3
# Me Offer · 河北一分一段表 PDF OCR（Claude Sonnet 视觉）
# 输入：data_raw/hebei/hb_YYYY_segment.pdf（扫描图 PDF）
# 输出：data_raw/hebei/hb_YYYY_segment.json（结构化分段数据）

import os
import sys
import json
import base64
import time
import subprocess
import anthropic

DATA_DIR							= os.path.join(os.path.dirname(__file__), '..', 'data_raw', 'hebei')
TMP_DIR								= os.path.join(DATA_DIR, 'ocr_tmp')

os.makedirs(TMP_DIR, exist_ok=True)

API_KEY								= os.environ.get('ANTHROPIC_API_KEY')

if not API_KEY:
	with open(os.path.expanduser('~/.claude/references/credentials.md'), 'r') as f:
		for line in f:
			if 'sk-ant' in line:
				API_KEY				= line.split('sk-ant')[1].split(' ')[0].strip().rstrip('|').strip()
				API_KEY				= 'sk-ant' + API_KEY
				break

client								= anthropic.Anthropic(api_key=API_KEY)

PROMPT								= """这是河北省高考一分一段表（成绩统计表）的扫描页。请识别表格内容，按分数档次逐行输出 JSON 数组。

每个分数档次对应一行，包含以下字段：
- score: 分数（整数）
- phy_count: 该分数段物理科目组合人数（整数，没有或空就写 0）
- phy_cumul: 物理科目组合累计人数（整数）
- his_count: 该分数段历史科目组合人数（整数，没有或空就写 0）
- his_cumul: 历史科目组合累计人数（整数）

注意：
- 最高分档通常是"XXX及以上"，按最低那个分数（比如"693 及以上"就写 score=693）
- 只识别"正文数字表格"，不要识别表头或页脚
- 不确定的数字用 null 而不是瞎猜
- **只返回 JSON 数组，不要解释、不要代码块标记、不要任何其他文字**

示例输出格式：
[
  {"score": 693, "phy_count": 32, "phy_cumul": 32, "his_count": 0, "his_cumul": 0},
  {"score": 692, "phy_count": 8, "phy_cumul": 40, "his_count": 0, "his_cumul": 0}
]
"""


def pdf_to_images(pdf_path, year):
	out_prefix						= os.path.join(TMP_DIR, 'hb_' + str(year))

	existing						= [f for f in os.listdir(TMP_DIR) if f.startswith('hb_' + str(year) + '-') and f.endswith('.png')]

	if existing:
		existing.sort()
		print('  using cached', len(existing), 'pages')
		return [os.path.join(TMP_DIR, f) for f in existing]

	print('  converting pdf to png...')
	subprocess.run(
		['pdftoppm', '-r', '200', pdf_path, out_prefix, '-png'],
		check=True, capture_output=True
	)

	pages							= sorted([
		os.path.join(TMP_DIR, f) for f in os.listdir(TMP_DIR)
		if f.startswith('hb_' + str(year) + '-') and f.endswith('.png')
	])

	return pages


def ocr_one_page(png_path):
	with open(png_path, 'rb') as f:
		img_b64						= base64.standard_b64encode(f.read()).decode('utf-8')

	msg								= client.messages.create(
		model='claude-sonnet-4-5',
		max_tokens=4096,
		messages=[{
			'role':					'user',
			'content': [
				{
					'type':			'image',
					'source': {
						'type':		'base64',
						'media_type':'image/png',
						'data':		img_b64
					}
				},
				{'type': 'text', 'text': PROMPT}
			]
		}]
	)

	text							= msg.content[0].text.strip()

	if text.startswith('```'):
		text						= text.split('\n', 1)[1] if '\n' in text else text
		text						= text.rsplit('```', 1)[0].strip()

	try:
		data						= json.loads(text)
	except json.JSONDecodeError as e:
		print('    JSON parse error, raw:', text[:200])
		raise

	return data, msg.usage.input_tokens, msg.usage.output_tokens


def ocr_pdf(pdf_path, year):
	print('process year', year)
	pages							= pdf_to_images(pdf_path, year)
	print('  pages:', len(pages))

	all_rows						= []
	total_in						= 0
	total_out						= 0

	for i, png in enumerate(pages):
		print('  page', i+1, '/', len(pages), '...', end=' ', flush=True)

		for attempt in range(3):
			try:
				rows, n_in, n_out	= ocr_one_page(png)
				break
			except Exception as e:
				print('retry', attempt+1, str(e)[:80])
				time.sleep(2)
		else:
			print('  FAILED page', i+1)
			continue

		all_rows.extend(rows)
		total_in					+= n_in
		total_out					+= n_out
		print(len(rows), 'rows | in=' + str(n_in) + ' out=' + str(n_out))

	out_json						= os.path.join(DATA_DIR, 'hb_' + str(year) + '_segment.json')

	with open(out_json, 'w', encoding='utf-8') as f:
		json.dump(all_rows, f, ensure_ascii=False, indent=2)

	print('  saved:', out_json)
	print('  total rows:', len(all_rows))
	print('  tokens in/out:', total_in, '/', total_out)

	cost							= total_in / 1_000_000 * 3 + total_out / 1_000_000 * 15
	print('  cost: $' + str(round(cost, 3)))
	return len(all_rows), total_in, total_out


def main():
	years							= [2021, 2022, 2023, 2024, 2025]

	if len(sys.argv) > 1:
		years						= [int(y) for y in sys.argv[1:]]

	grand_in						= 0
	grand_out						= 0
	grand_rows						= 0

	for year in years:
		pdf								= os.path.join(DATA_DIR, 'hb_' + str(year) + '_segment.pdf')

		if not os.path.exists(pdf):
			print('missing:', pdf)
			continue

		n, i, o							= ocr_pdf(pdf, year)
		grand_rows					+= n
		grand_in					+= i
		grand_out					+= o
		print()

	total_cost						= grand_in / 1_000_000 * 3 + grand_out / 1_000_000 * 15
	print('========================')
	print('all years rows:', grand_rows)
	print('all years cost: $' + str(round(total_cost, 3)))


if __name__ == '__main__':
	main()
