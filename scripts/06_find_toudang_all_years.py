#!/usr/bin/env python3
# Me Offer · 山东考试院 分页找所有年份投档表

import re
import urllib.parse
import urllib.request

BASE_URL							= 'https://www.sdzk.cn/Search.aspx'
KEY									= '普通类常规批'

HEADERS								= {
	'User-Agent':					'Mozilla/5.0',
	'Content-Type':					'application/x-www-form-urlencoded'
}


def get_page_1():
	url								= BASE_URL + '?key=' + urllib.parse.quote(KEY)
	req								= urllib.request.Request(url, headers=HEADERS)
	return urllib.request.urlopen(req, timeout=15).read().decode('utf-8')


def extract_state(html):
	vs								= re.search(r'__VIEWSTATE" value="([^"]+)"', html)
	vg								= re.search(r'__VIEWSTATEGENERATOR" value="([^"]+)"', html)
	ev								= re.search(r'__EVENTVALIDATION" value="([^"]+)"', html)
	return {
		'vs':						vs.group(1) if vs else '',
		'vg':						vg.group(1) if vg else '',
		'ev':						ev.group(1) if ev else ''
	}


def post_for_page(page_idx, state):
	target							= 'ctl00$ContentPlaceHolder1$RadListView1$DataPagerProducts$ctl01$ctl' + str(page_idx).zfill(2)
	data							= {
		'__EVENTTARGET':			target,
		'__EVENTARGUMENT':			'',
		'__VIEWSTATE':				state['vs'],
		'__VIEWSTATEGENERATOR':		state['vg'],
		'__EVENTVALIDATION':		state['ev'],
		'ctl00$ContentPlaceHolder1$TextBox1':	KEY
	}
	body							= urllib.parse.urlencode(data).encode('utf-8')
	url								= BASE_URL + '?key=' + urllib.parse.quote(KEY)
	req								= urllib.request.Request(url, data=body, headers=HEADERS)
	return urllib.request.urlopen(req, timeout=15).read().decode('utf-8')


def parse_entries(html):
	pattern							= re.compile(r'NewsID=(\d+)"[^>]*title="([^"]*(?:常规批|投档)[^"]*)"[^>]*>.*?<i>(\d{4}-\d{2}-\d{2})</i>', re.DOTALL)
	return [(m.group(1), m.group(2), m.group(3)) for m in pattern.finditer(html)]


def main():
	all_entries						= []
	html							= get_page_1()
	state							= extract_state(html)
	all_entries.extend(parse_entries(html))

	for page_idx in range(1, 6):
		try:
			html					= post_for_page(page_idx, state)
			new_items				= parse_entries(html)
			if not new_items:
				break
			all_entries.extend(new_items)
			state					= extract_state(html)
			print('page', page_idx + 1, ':', len(new_items))
		except Exception as e:
			print('page error:', e)
			break

	# 去重
	seen							= set()
	uniq							= [e for e in all_entries if e[0] not in seen and not seen.add(e[0])]

	# 只保留"第1次志愿投档"
	priority						= [e for e in uniq if '第1次' in e[1]]
	print('\n=== 历年第1次志愿投档表 ===')
	for nid, title, date in sorted(priority, key=lambda x: x[2], reverse=True):
		print(date, nid, title[:60])


if __name__ == '__main__':
	main()
