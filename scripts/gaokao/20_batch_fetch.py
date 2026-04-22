# Me Offer · 18 套真题 批量抓取
#
# 1. 遍历 gaokzx.com 的文章页，拿 cdn.gaokzx.com PDF 直链
# 2. 下载 PDF 到 data_raw/gaokao_pdf_official/{province}/{subject}_2025.pdf

import os
import re
import time
import urllib.request
import urllib.parse

BASE_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_pdf_official'

# (province, subject, article_number)
# province='_all' 表示全国通用（北京山东共享，下载两份副本）
# 阶段一：只走 PDF 可用的 8 套（生物/政治/历史/地理）
# 其他科目 gaokzx 是分页 JPG，需另一条管线（后续处理）
TARGETS = [
	('beijing',		'biology',		142276),	# ✅ 已验证
	('beijing',		'politics',		142343),
	('beijing',		'history',		142344),
	('beijing',		'geography',	142101),

	('shandong',	'biology',		142100),
	('shandong',	'politics',		142176),
	('shandong',	'history',		142436),
	('shandong',	'geography',	142175)
]

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

def fetch_article_html(article_id):
	url = 'https://www.gaokzx.com/gk/shitiku/' + str(article_id) + '.html'
	req = urllib.request.Request(url, headers={'User-Agent': UA, 'Referer': 'https://www.gaokzx.com/'})
	with urllib.request.urlopen(req, timeout=20) as resp:
		return resp.read().decode('utf-8', errors='ignore')

def extract_pdf_url(html):
	# 匹配 cdn.gaokzx.com 的 PDF 链接（允许中文和空格）
	# 用更宽松的匹配——直到遇到 \" 或 \n 或 <
	patterns = [
		r'https://cdn\.gaokzx\.com/[^"\'<>\n]+?\.(?:pdf|PDF)',
		r'//cdn\.gaokzx\.com/[^"\'<>\n]+?\.(?:pdf|PDF)'
	]
	for pat in patterns:
		for m in re.finditer(pat, html):
			url = m.group(0)
			if url.startswith('//'):
				url = 'https:' + url
			# 排除不相关的 PDF（如招生计划）
			if '招生简章' in url or '招生计划' in url:
				continue
			return url
	return None

def download_pdf(url, dest):
	if os.path.exists(dest) and os.path.getsize(dest) > 100000:
		return 'skip'
	# 处理 URL 中的中文字符（encode 成 UTF-8 再 percent-encode）
	safe_url = urllib.parse.quote(url, safe=':/?&=%#')
	req = urllib.request.Request(safe_url, headers={
		'User-Agent':	UA,
		'Referer':		'https://www.gaokzx.com/'
	})
	with urllib.request.urlopen(req, timeout=60) as resp:
		data = resp.read()
	with open(dest, 'wb') as f:
		f.write(data)
	return len(data)

def main():
	report = []
	for province, subject, article_id in TARGETS:
		dest_dir = os.path.join(BASE_DIR, province)
		os.makedirs(dest_dir, exist_ok=True)
		dest = os.path.join(dest_dir, subject + '_2025.pdf')

		if os.path.exists(dest) and os.path.getsize(dest) > 100000:
			report.append((province, subject, 'skip', os.path.getsize(dest)))
			print('[skip]', province, subject, os.path.getsize(dest))
			continue

		try:
			html = fetch_article_html(article_id)
			pdf_url = extract_pdf_url(html)
			if not pdf_url:
				report.append((province, subject, 'no-pdf', article_id))
				print('[no-pdf]', province, subject, 'article', article_id)
				continue

			size = download_pdf(pdf_url, dest)
			report.append((province, subject, 'ok', size))
			print('[ok]', province, subject, size, 'bytes')
			time.sleep(1)	# 礼貌性延迟
		except Exception as e:
			report.append((province, subject, 'err', str(e)[:60]))
			print('[err]', province, subject, e)

	# 总结
	ok = sum(1 for r in report if r[2] == 'ok')
	skip = sum(1 for r in report if r[2] == 'skip')
	err = sum(1 for r in report if r[2] not in ('ok', 'skip'))
	print('\n=== Summary ===')
	print('ok=' + str(ok), 'skip=' + str(skip), 'err=' + str(err))
	for r in report:
		if r[2] not in ('ok', 'skip'):
			print('  ', r)

if __name__ == '__main__':
	main()
