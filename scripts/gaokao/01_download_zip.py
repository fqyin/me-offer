# Me Offer · 高考真题抓取 · Step 1: 下载 ZIP
# 来源：gzenxx.com（无需登录的公开聚合源）
# 用法：python3 01_download_zip.py

import os
import urllib.request

BASE_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_pdf'

# 第一批：已侦查确认的链接（北京+山东 生物）
SOURCES = [
	{
		'province':	'beijing',
		'subject':	'biology',
		'year':		2025,
		'url':		'https://www.gzenxx.com/uploads/ueditor/file/20250705/1751717146156598.zip',
		'referer':	'https://www.gzenxx.com/gkswst/1705.html'
	},
	{
		'province':	'shandong',
		'subject':	'biology',
		'year':		2025,
		'url':		'https://www.gzenxx.com/uploads/ueditor/file/20250709/1752061849383057.zip',
		'referer':	'https://www.gzenxx.com/gkswst/1711.html'
	}
]

def download_zip(item):
	dest_dir = os.path.join(BASE_DIR, item['province'])
	os.makedirs(dest_dir, exist_ok=True)
	dest_file = os.path.join(dest_dir, item['subject'] + '_' + str(item['year']) + '.zip')

	if os.path.exists(dest_file):
		print('[skip]', dest_file, 'already exists')
		return dest_file

	req = urllib.request.Request(item['url'], headers={
		'User-Agent':	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
		'Referer':		item['referer']
	})

	with urllib.request.urlopen(req, timeout=30) as resp:
		data = resp.read()

	with open(dest_file, 'wb') as f:
		f.write(data)

	print('[ok]', item['province'], item['subject'], len(data), 'bytes ->', dest_file)
	return dest_file

def main():
	for item in SOURCES:
		try:
			download_zip(item)
		except Exception as e:
			print('[err]', item['subject'], e)

if __name__ == '__main__':
	main()
