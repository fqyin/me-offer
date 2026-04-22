# Me Offer · Step 12: 官方数据 → D1

import os
import json

TEXT_DIR = '/Users/fuqiangyin/Code-Files/me-offer/data_raw/gaokao_text'
SQL_OUT = '/Users/fuqiangyin/Code-Files/me-offer/db/insert_gaokao_official.sql'

def esc(s):
	if s is None:
		return 'NULL'
	return "'" + str(s).replace("'", "''") + "'"

def build():
	lines = ['-- Official data import', 'DELETE FROM gaokao_questions_real;', '']

	for fname in sorted(os.listdir(TEXT_DIR)):
		if not fname.endswith('.json'):
			continue
		with open(os.path.join(TEXT_DIR, fname)) as f:
			d = json.load(f)

		for q in d['questions']:
			sql = (
				'INSERT INTO gaokao_questions_real '
				'(province, subject, year, question_no, question_type, stem, stem_has_table, '
				'options_json, answer, answer_full, analysis, stem_images_json, analysis_images_json, '
				'image_dir, source, source_pdf) VALUES ('
				+ esc(d['province']) + ', '
				+ esc(d['subject']) + ', '
				+ str(d['year']) + ', '
				+ str(q['no']) + ', '
				+ esc(q['type']) + ', '
				+ esc(q['stem']) + ', '
				+ ('1' if q.get('stem_has_table') else '0') + ', '
				+ esc(json.dumps(q['options'], ensure_ascii=False)) + ', '
				+ esc(q.get('answer', '')) + ', '
				+ esc(q.get('answer_full', '')) + ', '
				+ esc(q.get('analysis', '')) + ', '
				+ esc(json.dumps(q.get('stem_images', []), ensure_ascii=False)) + ', '
				+ esc(json.dumps(q.get('analysis_images', []), ensure_ascii=False)) + ', '
				+ esc(d.get('image_dir', '')) + ', '
				+ esc(d.get('source', '')) + ', '
				+ esc(d.get('source_pdf', '')) + ');'
			)
			lines.append(sql)

	with open(SQL_OUT, 'w', encoding='utf-8') as f:
		f.write('\n'.join(lines))
	print('[ok]', SQL_OUT, 'lines=' + str(len(lines)))

if __name__ == '__main__':
	build()
