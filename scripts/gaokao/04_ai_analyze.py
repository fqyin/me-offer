# Me Offer · Step 4: Claude 生成 8 维度 AI 解析
#
# 输入：data_raw/gaokao_text/{province}_{subject}_{year}.json
# 输出：同文件追加 ai_analysis 字段
# 缓存：系统提示（大师级教研专家 persona + 8 维度模板）用 prompt_caching，节省 90%

import os
import json
import sys
import time
import anthropic

API_KEY = os.environ.get('CLAUDE_API_KEY', '')
if not API_KEY:
	raise RuntimeError('请设置环境变量 CLAUDE_API_KEY 后再运行本脚本')
TEXT_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_text'

SUBJECT_MAP = {
	'biology':		'生物',
	'math':			'数学',
	'physics':		'物理',
	'chemistry':	'化学',
	'chinese':		'语文',
	'english':		'英语',
	'history':		'历史',
	'geography':	'地理',
	'politics':		'政治'
}

SYSTEM_PROMPT = '''你是中国顶级高考教研专家，曾参与高考命题和全国优秀教辅的编写。你的任务是对高考真题进行"8 维度黄金解析"。

## 8 维度模板（每题必须完整填充这 8 个字段）

1. **kaodian（考点定位）**：本题考查的核心知识点、所属模块、大纲位置
2. **luoji（看穿逻辑）**：题目设置的"命题逻辑"——出题人想考什么、陷阱在哪
3. **tuili_steps（推理链）**：从题干到答案的分步推理（数组，3-6 步）
4. **cuojie（典型错解）**：学生常见错误选项及原因
5. **bianshi（变式练习）**：基于本题的举一反三题目
6. **qushi（命题趋势）**：近年高考此考点的变化趋势
7. **xinfa（解题心法）**：面对同类题目的通用解题口诀
8. **parent_tr（家长翻译）**：用白话告诉家长这道题考什么、孩子该怎么学

## 输出要求

- 只输出合法 JSON 对象（8 个字段），不要任何其他文字
- 每个字段 80-200 字（parent_tr 可更短）
- tuili_steps 是字符串数组，其他字段是字符串
- 允许在字符串中使用 `<strong>` HTML 标签加粗关键词
- 语言：简体中文，严谨但生动，符合 Me Offer 的"黄金解析"品牌调性'''

def build_user_prompt(subject_cn, q):
	parts = [
		'请对下面这道 ' + subject_cn + ' 高考真题生成 8 维度解析：',
		'',
		'【题号】第 ' + str(q['no']) + ' 题（' + q['type'] + '）',
		'【题干】' + q['stem']
	]
	if q.get('options'):
		parts.append('【选项】')
		for o in q['options']:
			parts.append(o['label'] + '. ' + o['text'])
	if q.get('answer'):
		parts.append('【参考答案】' + q['answer'])
	if q.get('analysis'):
		parts.append('【官方答案要点】' + q['analysis'][:500])

	parts.append('')
	parts.append('请输出 JSON，字段顺序：kaodian, luoji, tuili_steps, cuojie, bianshi, qushi, xinfa, parent_tr')
	return '\n'.join(parts)

def analyze_one(client, subject_cn, q, retries=2):
	user_prompt = build_user_prompt(subject_cn, q)
	for attempt in range(retries + 1):
		try:
			resp = client.messages.create(
				model='claude-opus-4-7',
				max_tokens=3000,
				system=[{
					'type':				'text',
					'text':				SYSTEM_PROMPT,
					'cache_control':	{'type': 'ephemeral'}
				}],
				messages=[{'role': 'user', 'content': user_prompt}]
			)
			text = ''
			for b in resp.content:
				if b.type == 'text':
					text = b.text
					break

			# 剥掉可能的 ```json ``` 包裹
			text = text.strip()
			if text.startswith('```'):
				text = text.split('\n', 1)[1] if '\n' in text else text
				if text.endswith('```'):
					text = text.rsplit('```', 1)[0]
				text = text.strip()
				if text.startswith('json'):
					text = text[4:].strip()

			parsed = json.loads(text)
			# 基础校验 8 字段
			required = ['kaodian', 'luoji', 'tuili_steps', 'cuojie', 'bianshi', 'qushi', 'xinfa', 'parent_tr']
			missing = [k for k in required if k not in parsed]
			if missing:
				print('[warn] missing fields:', missing, 'for Q' + str(q['no']))

			usage = resp.usage
			return parsed, {
				'in':			usage.input_tokens,
				'cache_read':	getattr(usage, 'cache_read_input_tokens', 0),
				'cache_write':	getattr(usage, 'cache_creation_input_tokens', 0),
				'out':			usage.output_tokens
			}
		except Exception as e:
			print('[err] Q' + str(q['no']), 'attempt', attempt, ':', str(e)[:120])
			if attempt < retries:
				time.sleep(2 + attempt * 3)
			else:
				return None, None

def process_file(client, json_path):
	with open(json_path) as f:
		data = json.load(f)

	subject_cn = SUBJECT_MAP.get(data['subject'], data['subject'])
	print('=== ' + data['province'] + ' ' + data['subject'] + ' ' + str(data['year']) + ' (' + str(data['questions_count']) + ' 题) ===')

	total_in = total_read = total_write = total_out = 0
	done = 0
	for q in data['questions']:
		if q.get('ai_analysis'):
			print('[skip] Q' + str(q['no']), 'already analyzed')
			done += 1
			continue
		print('[run] Q' + str(q['no']), q['type'], '...')
		ana, usage = analyze_one(client, subject_cn, q)
		if ana:
			q['ai_analysis'] = ana
			done += 1
			if usage:
				total_in += usage['in']
				total_read += usage['cache_read']
				total_write += usage['cache_write']
				total_out += usage['out']
			# 每题完成立刻写盘，避免失败时丢进度
			with open(json_path, 'w', encoding='utf-8') as f:
				json.dump(data, f, ensure_ascii=False, indent=2)

	print('[done]', done, '/', data['questions_count'])
	print('[cost] in=' + str(total_in), 'cache_read=' + str(total_read), 'cache_write=' + str(total_write), 'out=' + str(total_out))
	# Opus 4.7 定价：$5/M input, $25/M output, cache read ~10%
	usd = (total_in * 5 + total_read * 0.5 + total_write * 6.25 + total_out * 25) / 1_000_000
	print('[cost] approx $' + str(round(usd, 4)) + ' (CNY ' + str(round(usd * 7.2, 2)) + ')')

def main():
	client = anthropic.Anthropic(api_key=API_KEY)
	targets = sys.argv[1:] if len(sys.argv) > 1 else ['beijing_biology_2025.json', 'shandong_biology_2025.json']
	for fname in targets:
		path = os.path.join(TEXT_DIR, fname)
		if not os.path.exists(path):
			print('[err] not found:', path)
			continue
		process_file(client, path)

if __name__ == '__main__':
	main()
