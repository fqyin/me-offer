# Me Offer · 官方真题 PDF 下载器（第二代：cdn.gaokzx.com）
#
# 源：北京高考在线团队整理的 2025 高考真题 PDF（含官方答案+详解+表格+原图）
# 质量：比 gzenxx.com docx 高一个数量级，自带逐题分析
# 合规：资源聚合转载，版权属考试院；我们用于内部结构化存储+学习工具

import os
import urllib.request
import urllib.parse

BASE_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_pdf_official'

# cdn.gaokzx.com 已验证直链 + 每个科目的 URL 需从 gaokzx 文章页抓
# 已确认的链接（来自 WebSearch 结果）
SOURCES = [
	# 北京 2025
	{
		'province':	'beijing',	'subject': 'biology',
		'url':		'https://cdn.gaokzx.com/zixunzhan/17503188602672025%E5%8C%97%E4%BA%AC%E9%AB%98%E8%80%83%E7%9C%9F%E9%A2%98%E7%94%9F%E7%89%A9%20%20%20%E6%9C%89%E7%AD%94%E6%A1%88.pdf',
		'article':	'https://www.gaokzx.com/gk/shitiku/142276.html'
	},
	{
		'province':	'beijing',	'subject': 'politics',
		'url':		'https://cdn.gaokzx.com/zixunzhan/17501309664892025%E5%8C%97%E4%BA%AC%E9%AB%98%E8%80%83%E6%94%BF%E6%B2%BB%E8%AF%95%E9%A2%98%E5%8F%8A%E7%AD%94%E6%A1%88.pdf',
		'article':	''
	},
	{
		'province':	'beijing',	'subject': 'history',
		'url':		'https://cdn.gaokzx.com/zixunzhan/17503165554602025%E5%8C%97%E4%BA%AC%E9%AB%98%E8%80%83%E5%8E%86%E5%8F%B2%E8%AF%95%E9%A2%98%E5%8F%8A%E7%AD%94%E6%A1%88.pdf',
		'article':	''
	}
]

def download(src):
	dest_dir = os.path.join(BASE_DIR, src['province'])
	os.makedirs(dest_dir, exist_ok=True)
	dest = os.path.join(dest_dir, src['subject'] + '_2025.pdf')

	if os.path.exists(dest):
		size = os.path.getsize(dest)
		print('[skip]', src['subject'], size, 'bytes')
		return dest

	req = urllib.request.Request(src['url'], headers={
		'User-Agent':	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
		'Referer':		src.get('article') or 'https://www.gaokzx.com/'
	})
	with urllib.request.urlopen(req, timeout=30) as resp:
		data = resp.read()
	with open(dest, 'wb') as f:
		f.write(data)
	print('[ok]', src['province'], src['subject'], len(data), 'bytes ->', dest)
	return dest

def main():
	for src in SOURCES:
		try:
			download(src)
		except Exception as e:
			print('[err]', src['subject'], e)

if __name__ == '__main__':
	main()
