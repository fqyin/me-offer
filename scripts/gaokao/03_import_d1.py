# Me Offer · Step 3: 真题 JSON → D1 INSERT SQL

import os
import json

TEXT_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_text'
SQL_OUT = '/Users/fuqiangyin/Code-Files/me-offer/db/insert_gaokao_real.sql'

def escape_sql(s):
	if s is None:
		return 'NULL'
	return "'" + s.replace("'", "''") + "'"

def build_sql():
	lines = []
	lines.append('-- Auto-generated INSERT for gaokao_questions_real')
	lines.append('DELETE FROM gaokao_questions_real;')
	lines.append('')

	for fname in sorted(os.listdir(TEXT_DIR)):
		if not fname.endswith('.json'):
			continue
		path = os.path.join(TEXT_DIR, fname)
		with open(path) as f:
			data = json.load(f)

		for q in data['questions']:
			opts_json = json.dumps(q['options'], ensure_ascii=False)
			stem_imgs = json.dumps(q.get('stem_images', []), ensure_ascii=False)
			ana_imgs = json.dumps(q.get('analysis_images', []), ensure_ascii=False)

			sql = (
				'INSERT INTO gaokao_questions_real '
				'(province, subject, year, question_no, question_type, stem, options_json, '
				'answer, analysis, stem_images_json, analysis_images_json, image_dir, source_file) VALUES ('
				+ escape_sql(data['province']) + ', '
				+ escape_sql(data['subject']) + ', '
				+ str(data['year']) + ', '
				+ str(q['no']) + ', '
				+ escape_sql(q['type']) + ', '
				+ escape_sql(q['stem']) + ', '
				+ escape_sql(opts_json) + ', '
				+ escape_sql(q.get('answer', '')) + ', '
				+ escape_sql(q.get('analysis', '')) + ', '
				+ escape_sql(stem_imgs) + ', '
				+ escape_sql(ana_imgs) + ', '
				+ escape_sql(data.get('image_dir', '')) + ', '
				+ escape_sql(data.get('source_file', '')) + ');'
			)
			lines.append(sql)

	with open(SQL_OUT, 'w', encoding='utf-8') as f:
		f.write('\n'.join(lines))

	print('[ok] SQL written:', SQL_OUT, 'lines=' + str(len(lines)))

if __name__ == '__main__':
	build_sql()
