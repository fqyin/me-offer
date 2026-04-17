#!/usr/bin/env python3
# Me Offer · 山东考试院 分页搜索所有年份一分一段表
# 策略：ASP.NET 站点用 __doPostBack 分页

import re
import urllib.parse
import urllib.request

BASE_URL							= 'https://www.sdzk.cn/Search.aspx'
KEY									= '一分一段表'

HEADERS								= {
	'User-Agent':					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
	'Content-Type':					'application/x-www-form-urlencoded'
}


def get_page_1():
	url								= BASE_URL + '?key=' + urllib.parse.quote(KEY)
	req								= urllib.request.Request(url, headers=HEADERS)
	html							= urllib.request.urlopen(req, timeout=15).read().decode('utf-8')
	return html


def extract_form_state(html):
	vs								= re.search(r'__VIEWSTATE" value="([^"]+)"', html)
	vg								= re.search(r'__VIEWSTATEGENERATOR" value="([^"]+)"', html)
	ev								= re.search(r'__EVENTVALIDATION" value="([^"]+)"', html)
	return {
		'__VIEWSTATE':				vs.group(1) if vs else '',
		'__VIEWSTATEGENERATOR':		vg.group(1) if vg else '',
		'__EVENTVALIDATION':		ev.group(1) if ev else ''
	}


def post_for_page(page_index, state):
	# 分页 postback target: ctl01 = 2nd page link, ctl02 = 3rd, ...
	target							= 'ctl00$ContentPlaceHolder1$RadListView1$DataPagerProducts$ctl01$ctl' + str(page_index).zfill(2)

	data							= {
		'__EVENTTARGET':			target,
		'__EVENTARGUMENT':			'',
		'__VIEWSTATE':				state['__VIEWSTATE'],
		'__VIEWSTATEGENERATOR':		state['__VIEWSTATEGENERATOR'],
		'__EVENTVALIDATION':		state['__EVENTVALIDATION'],
		'ctl00$ContentPlaceHolder1$TextBox1':	KEY
	}
	body							= urllib.parse.urlencode(data).encode('utf-8')
	url								= BASE_URL + '?key=' + urllib.parse.quote(KEY)
	req								= urllib.request.Request(url, data=body, headers=HEADERS)
	html							= urllib.request.urlopen(req, timeout=15).read().decode('utf-8')
	return html


def parse_entries(html):
	pattern							= re.compile(r'NewsID=(\d+)"[^>]*title="([^"]*一分一段[^"]*)"[^>]*>.*?<i>(\d{4}-\d{2}-\d{2})</i>', re.DOTALL)
	entries							= []
	for m in pattern.finditer(html):
		entries.append({
			'news_id':				m.group(1),
			'title':				m.group(2),
			'date':					m.group(3)
		})
	return entries


def main():
	all_entries						= []

	html							= get_page_1()
	state							= extract_form_state(html)
	all_entries.extend(parse_entries(html))

	# 分页 ctl01 是第 2 页，ctl02 是第 3 页，ctl03 是第 4 页（按页面结构推断）
	for page_idx in range(1, 4):
		try:
			html					= post_for_page(page_idx, state)
			new_entries				= parse_entries(html)
			all_entries.extend(new_entries)
			state					= extract_form_state(html)
			print('page', page_idx + 1, ':', len(new_entries), 'entries')
		except Exception as e:
			print('page', page_idx + 1, 'error:', e)
			break

	# 去重
	seen							= set()
	uniq							= []
	for e in all_entries:
		if e['news_id'] not in seen:
			seen.add(e['news_id'])
			uniq.append(e)

	# 过滤：只要夏季高考文化成绩
	summer							= [e for e in uniq if '夏季高考' in e['title'] or ('文化成绩' in e['title'] and '艺术' not in e['title'])]
	print('\n=== 夏季高考文化成绩一分一段表 ===')
	for e in sorted(summer, key=lambda x: x['date'], reverse=True):
		print(e['date'], e['news_id'], e['title'])


if __name__ == '__main__':
	main()
