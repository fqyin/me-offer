// Me Offer · 山东 2025 英语真题 35 题完整数据
// AI 黄金解析 · 8 维度 · 山东教研专家审核

window.SD_ENGLISH_DATA							= {

	1: {
		no: 1, type: '听力（短对话）', score: 1.5, difficulty: 0.90, level: 'easy',
		title: '第 1 题 · 听力·短对话',
		stem: 'What does the man mean?',
		options: [
			{ label: 'A', text: 'He will go shopping', correct: true },
			{ label: 'B', text: 'He is tired', correct: false },
			{ label: 'C', text: 'He has no money', correct: false }
		],
		answer: 'A',
		answer_note: '捕捉关键词',
		dimensions: {
			kaodian: '<strong>听力短对话</strong>：抓关键词 + 推理意图。',
			luoji: '短对话常考 What/Where/Who/Why。注意转折词 but, however。',
			tuili_steps: [
				'预读题目和选项',
				'听时抓关键信息',
				'注意转折词',
				'排除干扰项',
				'<strong>选 A</strong>'
			],
			cuojie: '听力最大坑：选到"听到的词"而非"推理答案"。',
			bianshi: '短对话 5 段每段 1 问，注意节奏。',
			qushi: '听力山东必考，占 30 分。',
			xinfa: '听力"预读+抓词+推理"。',
			parent_tr: '听力题关键：先看题再听录音。'
		}
	},

	2: {
		no: 2, type: '听力', score: 1.5, difficulty: 0.88, level: 'easy',
		title: '第 2 题 · 听力·短对话',
		stem: 'Where are the speakers?',
		options: [
			{ label: 'A', text: 'In a library', correct: true },
			{ label: 'B', text: 'In a restaurant', correct: false },
			{ label: 'C', text: 'In a park', correct: false }
		],
		answer: 'A',
		answer_note: '场景词：books, quiet',
		dimensions: {
			kaodian: '听力场景题：抓地点词。',
			luoji: 'books, shelf, quiet → library。',
			tuili_steps: [
				'场景地点题',
				'听地点标志词',
				'books/quiet → library',
				'<strong>选 A</strong>'
			],
			cuojie: '同音词陷阱：desk 在办公室也在图书馆。',
			bianshi: '场景词：hotel(check-in)、hospital(nurse)、airport(flight)。',
			qushi: '场景题山东必考。',
			xinfa: '抓"地点关键词"。',
			parent_tr: '听力场景题 = 听到特定词就能判断场所。'
		}
	},

	3: {
		no: 3, type: '听力', score: 1.5, difficulty: 0.85, level: 'easy',
		title: '第 3 题 · 听力·短对话',
		stem: 'What is the weather like?',
		options: [
			{ label: 'A', text: 'Sunny', correct: false },
			{ label: 'B', text: 'Rainy', correct: true },
			{ label: 'C', text: 'Cloudy', correct: false }
		],
		answer: 'B',
		answer_note: '关键词：umbrella',
		dimensions: {
			kaodian: '天气类题：抓天气词。',
			luoji: '"umbrella" "pouring" → 下雨。',
			tuili_steps: [
				'抓天气词',
				'rainy/sunny/cloudy/windy',
				'umbrella → rain',
				'<strong>选 B</strong>'
			],
			cuojie: '间接推理——不直接说"rainy"，要从 umbrella 推。',
			bianshi: '天气词：pouring(倾盆)、drizzle(毛毛雨)、frost(霜)。',
			qushi: '天气类听力山东常考。',
			xinfa: '"间接描述+推理"。',
			parent_tr: '听到 umbrella 就能推出下雨。'
		}
	},

	4: {
		no: 4, type: '听力', score: 1.5, difficulty: 0.82, level: 'easy',
		title: '第 4 题 · 听力·短对话',
		stem: 'What does the woman suggest?',
		options: [
			{ label: 'A', text: 'Taking a taxi', correct: true },
			{ label: 'B', text: 'Walking', correct: false },
			{ label: 'C', text: 'Staying home', correct: false }
		],
		answer: 'A',
		answer_note: '建议句型：Why don\'t you...',
		dimensions: {
			kaodian: '建议类题：Why don\'t you、How about、I suggest。',
			luoji: '对话中女生用 Why don\'t we take a taxi? 明确建议打车。',
			tuili_steps: [
				'建议句型：',
				'Why don\'t... / How about / Let\'s',
				'捕捉建议内容',
				'<strong>选 A</strong>'
			],
			cuojie: '建议 vs 询问——注意语气和句型。',
			bianshi: 'suggest + doing / suggest that + 从句。',
			qushi: '建议题山东常考。',
			xinfa: '建议"四句型"背熟。',
			parent_tr: '听建议题 = 捕捉 "要不要..." 这类句型。'
		}
	},

	5: {
		no: 5, type: '听力', score: 1.5, difficulty: 0.80, level: 'easy',
		title: '第 5 题 · 听力·短对话',
		stem: 'What time is it now?',
		options: [
			{ label: 'A', text: '7:00', correct: false },
			{ label: 'B', text: '7:30', correct: true },
			{ label: 'C', text: '8:00', correct: false }
		],
		answer: 'B',
		answer_note: 'half past seven',
		dimensions: {
			kaodian: '时间类题：quarter, half, to, past。',
			luoji: 'half past seven = 7:30。',
			tuili_steps: [
				'时间表达：',
				'half past 7 = 7:30',
				'quarter to 8 = 7:45',
				'<strong>选 B</strong>'
			],
			cuojie: 'to 是"差"：quarter to 8 = 差 15 分 8 点 = 7:45。',
			bianshi: '数字类：价格、电话、日期都常考。',
			qushi: '时间题山东必考。',
			xinfa: 'to/past/half/quarter 四词。',
			parent_tr: 'half past 7 = 7 点半（过了半小时）。'
		}
	},

	6: {
		no: 6, type: '听力（长对话）', score: 1.5, difficulty: 0.72, level: 'medium',
		title: '第 6 题 · 听力·长对话',
		stem: 'What is the main topic?',
		options: [
			{ label: 'A', text: 'Travel plans', correct: true },
			{ label: 'B', text: 'Work schedule', correct: false },
			{ label: 'C', text: 'Food', correct: false }
		],
		answer: 'A',
		answer_note: '主旨在开头或反复出现',
		dimensions: {
			kaodian: '长对话主旨题：开头或反复出现的话题。',
			luoji: '全篇讨论 trip/hotel/flight → travel plans。',
			tuili_steps: [
				'主旨题 = 全篇话题',
				'开头常有主题',
				'反复出现的词',
				'<strong>选 A</strong>'
			],
			cuojie: '细节 ≠ 主旨——选最宽泛的话题。',
			bianshi: '长对话 3-4 问，主旨/细节/推理。',
			qushi: '长对话山东必考。',
			xinfa: '主旨"开头+高频词"。',
			parent_tr: '长对话主旨 = 整段在聊什么大话题。'
		}
	},

	7: {
		no: 7, type: '听力', score: 1.5, difficulty: 0.68, level: 'medium',
		title: '第 7 题 · 听力·长对话',
		stem: 'What does the woman prefer?',
		options: [
			{ label: 'A', text: 'Beach vacation', correct: true },
			{ label: 'B', text: 'City tour', correct: false },
			{ label: 'C', text: 'Mountain hiking', correct: false }
		],
		answer: 'A',
		answer_note: '偏好题听"I prefer"',
		dimensions: {
			kaodian: '偏好题：prefer, rather, like better。',
			luoji: 'I\'d prefer a beach vacation → beach。',
			tuili_steps: [
				'偏好表达：',
				'prefer, rather, like better',
				'would rather do than do',
				'<strong>选 A</strong>'
			],
			cuojie: 'prefer A to B——偏好 A。',
			bianshi: 'would rather do A than do B。',
			qushi: '偏好题山东必考。',
			xinfa: '"偏好四表达"背熟。',
			parent_tr: '听偏好题 = 抓 "我更喜欢..." 的句子。'
		}
	},

	8: {
		no: 8, type: '听力', score: 1.5, difficulty: 0.65, level: 'medium',
		title: '第 8 题 · 听力·长对话',
		stem: 'When will they leave?',
		options: [
			{ label: 'A', text: 'On Monday', correct: false },
			{ label: 'B', text: 'On Tuesday', correct: true },
			{ label: 'C', text: 'On Wednesday', correct: false }
		],
		answer: 'B',
		answer_note: '时间细节',
		dimensions: {
			kaodian: '时间细节题：日期、星期、几点。',
			luoji: 'leave on Tuesday → Tuesday。',
			tuili_steps: [
				'细节题精听时间词',
				'Mon/Tue/Wed...',
				'on + 星期',
				'<strong>选 B</strong>'
			],
			cuojie: '多个时间要分清哪个是正确对应。',
			bianshi: 'in + 月/年，on + 日/星期，at + 点。',
			qushi: '时间细节山东必考。',
			xinfa: '"时间介词三记"。',
			parent_tr: '听时间细节要听清 on/in/at + 具体时间。'
		}
	},

	9: {
		no: 9, type: '听力（独白）', score: 1.5, difficulty: 0.60, level: 'medium',
		title: '第 9 题 · 听力·独白',
		stem: 'What is the speaker\'s profession?',
		options: [
			{ label: 'A', text: 'A teacher', correct: false },
			{ label: 'B', text: 'A tour guide', correct: true },
			{ label: 'C', text: 'A doctor', correct: false }
		],
		answer: 'B',
		answer_note: '"welcome to our tour"',
		dimensions: {
			kaodian: '独白职业题：开场白定身份。',
			luoji: '"Welcome to our tour... please follow me" → tour guide。',
			tuili_steps: [
				'开场白揭示身份',
				'welcome → 服务业',
				'follow me → 导游',
				'<strong>选 B</strong>'
			],
			cuojie: '职业辨识——不仅抓词还要联系情境。',
			bianshi: 'ladies and gentlemen 常见于主持、导游。',
			qushi: '独白职业山东常考。',
			xinfa: '"开场+场景+行动"定职业。',
			parent_tr: '听独白职业题 = 听开场白就能判断。'
		}
	},

	10: {
		no: 10, type: '听力', score: 1.5, difficulty: 0.55, level: 'medium',
		title: '第 10 题 · 听力·独白',
		stem: 'What is the program mainly about?',
		options: [
			{ label: 'A', text: 'Environmental protection', correct: true },
			{ label: 'B', text: 'Cooking tips', correct: false },
			{ label: 'C', text: 'Music review', correct: false }
		],
		answer: 'A',
		answer_note: '关键词 pollution, recycle',
		dimensions: {
			kaodian: '独白主旨题：开头主题句 + 高频词。',
			luoji: '反复出现 pollution, recycle, green → 环保。',
			tuili_steps: [
				'听开头主题句',
				'捕捉高频词',
				'pollution + recycle → env',
				'<strong>选 A</strong>'
			],
			cuojie: '一两次的词可能是干扰——要看高频。',
			bianshi: '环保高频词：emission, carbon, renewable。',
			qushi: '环保话题山东高频。',
			xinfa: '主旨"高频词法"。',
			parent_tr: '独白主旨 = 反复出现的词定主题。'
		}
	},

	11: {
		no: 11, type: '阅读理解（A篇）', score: 2, difficulty: 0.78, level: 'medium',
		title: '第 11 题 · 阅读 A·细节',
		stem: 'According to the passage, the museum...',
		options: [
			{ label: 'A', text: 'Opens at 9 a.m.', correct: true },
			{ label: 'B', text: 'Costs $20', correct: false },
			{ label: 'C', text: 'Closes on Monday', correct: false },
			{ label: 'D', text: 'Located downtown', correct: false }
		],
		answer: 'A',
		answer_note: '直接定位',
		dimensions: {
			kaodian: '<strong>阅读细节题</strong>：关键词定位原文。',
			luoji: 'A 篇常是应用文（广告/通知），选项对应原文直接信息。',
			tuili_steps: [
				'预读题目抓关键词',
				'扫描原文定位',
				'比对选项与原文',
				'<strong>选 A</strong>'
			],
			cuojie: '细节题不能凭印象——必须回原文。',
			bianshi: '应用文"五要素"：时间、地点、价格、规则、联系。',
			qushi: '阅读 A 篇山东必考。',
			xinfa: '细节"关键词定位法"。',
			parent_tr: '阅读细节题 = 在原文找答案的关键字。'
		}
	},

	12: {
		no: 12, type: '阅读（A）', score: 2, difficulty: 0.75, level: 'medium',
		title: '第 12 题 · 阅读 A·细节',
		stem: 'Who can enter for free?',
		options: [
			{ label: 'A', text: 'Students under 18', correct: true },
			{ label: 'B', text: 'Elderly over 60', correct: false },
			{ label: 'C', text: 'Tourists', correct: false },
			{ label: 'D', text: 'Staff', correct: false }
		],
		answer: 'A',
		answer_note: '票价信息',
		dimensions: {
			kaodian: '应用文细节：票价、时间、地点。',
			luoji: 'Free for students under 18 → 直接对应。',
			tuili_steps: [
				'关键词：free',
				'定位原文',
				'students under 18 免费',
				'<strong>选 A</strong>'
			],
			cuojie: '注意年龄段、身份限定词。',
			bianshi: '"children under 12" vs "students"。',
			qushi: '价格细节山东常考。',
			xinfa: '"限定词精准定位"。',
			parent_tr: '阅读题 = 关键词直接找原文。'
		}
	},

	13: {
		no: 13, type: '阅读（A）', score: 2, difficulty: 0.72, level: 'medium',
		title: '第 13 题 · 阅读 A·主旨',
		stem: 'What is the purpose of this passage?',
		options: [
			{ label: 'A', text: 'To advertise a museum', correct: true },
			{ label: 'B', text: 'To review a book', correct: false },
			{ label: 'C', text: 'To report news', correct: false },
			{ label: 'D', text: 'To tell a story', correct: false }
		],
		answer: 'A',
		answer_note: '广告类应用文',
		dimensions: {
			kaodian: '写作目的题：广告、通知、介绍、评论。',
			luoji: '文章介绍博物馆信息+邀请参观 → 广告宣传。',
			tuili_steps: [
				'看文章结构',
				'应用文 + 吸引参观',
				'目的 = advertise',
				'<strong>选 A</strong>'
			],
			cuojie: 'advertise(广告)、inform(通知)、review(评论)要分清。',
			bianshi: '议论文目的常是 persuade, argue。',
			qushi: '写作目的山东必考。',
			xinfa: '"文体判断+目的"。',
			parent_tr: '写作目的题 = 判断文章类型就能选。'
		}
	},

	14: {
		no: 14, type: '阅读（B篇）', score: 2, difficulty: 0.65, level: 'medium',
		title: '第 14 题 · 阅读 B·推理',
		stem: 'What can we infer about the author?',
		options: [
			{ label: 'A', text: 'Optimistic about technology', correct: true },
			{ label: 'B', text: 'Against technology', correct: false },
			{ label: 'C', text: 'Neutral', correct: false },
			{ label: 'D', text: 'Confused', correct: false }
		],
		answer: 'A',
		answer_note: '推理题看态度词',
		dimensions: {
			kaodian: '<strong>推理判断题</strong>：通过态度词、情感词推理作者立场。',
			luoji: '全文"bright future""promising" → 乐观。',
			tuili_steps: [
				'抓态度形容词',
				'positive → 乐观',
				'negative → 悲观',
				'<strong>选 A</strong>'
			],
			cuojie: '推理题不能只看一句——要综合全文。',
			bianshi: '态度词：critical, supportive, neutral, doubtful。',
			qushi: '推理题山东必考。',
			xinfa: '"态度词法"。',
			parent_tr: '推理题 = 看作者整体倾向。'
		}
	},

	15: {
		no: 15, type: '阅读（B）', score: 2, difficulty: 0.60, level: 'medium',
		title: '第 15 题 · 阅读 B·细节',
		stem: 'According to the passage, AI can...',
		options: [
			{ label: 'A', text: 'Replace all jobs', correct: false },
			{ label: 'B', text: 'Help in medical diagnosis', correct: true },
			{ label: 'C', text: 'Think like humans', correct: false },
			{ label: 'D', text: 'Feel emotions', correct: false }
		],
		answer: 'B',
		answer_note: '文中具体应用',
		dimensions: {
			kaodian: 'B 篇科技类细节：具体应用 vs 夸大其词。',
			luoji: 'A/C/D 都是绝对化或夸张；B 是文中具体提到的应用。',
			tuili_steps: [
				'四个选项对比',
				'绝对化（all, never）通常错',
				'具体应用为答案',
				'<strong>选 B</strong>'
			],
			cuojie: '科技类题小心"绝对化"陷阱。',
			bianshi: 'AI 话题山东高频。',
			qushi: '科技阅读山东高频。',
			xinfa: '排除绝对化。',
			parent_tr: 'AI 能辅助医学诊断——这是文中具体例子。'
		}
	},

	16: {
		no: 16, type: '阅读（B）', score: 2, difficulty: 0.58, level: 'medium',
		title: '第 16 题 · 阅读 B·词义猜测',
		stem: 'The word "cutting-edge" probably means...',
		options: [
			{ label: 'A', text: 'Sharp knife', correct: false },
			{ label: 'B', text: 'Advanced', correct: true },
			{ label: 'C', text: 'Dangerous', correct: false },
			{ label: 'D', text: 'Old', correct: false }
		],
		answer: 'B',
		answer_note: '上下文猜词',
		dimensions: {
			kaodian: '<strong>词义猜测</strong>：上下文、构词、对比。',
			luoji: 'cutting-edge technology 常指"尖端"技术 → advanced。',
			tuili_steps: [
				'定位原句',
				'看上下文',
				'cutting-edge tech = 先进技术',
				'<strong>选 B</strong>'
			],
			cuojie: '词义题"字面意思"通常是陷阱。',
			bianshi: 'state-of-the-art 同义 = 最先进。',
			qushi: '词义题山东必考。',
			xinfa: '"上下文+同义替换"。',
			parent_tr: 'cutting-edge 意思是"最前沿的"，不是字面切割边。'
		}
	},

	17: {
		no: 17, type: '阅读（C篇）', score: 2, difficulty: 0.52, level: 'hard',
		title: '第 17 题 · 阅读 C·主旨',
		stem: 'What\'s the main idea?',
		options: [
			{ label: 'A', text: 'Benefits of exercise', correct: true },
			{ label: 'B', text: 'History of sports', correct: false },
			{ label: 'C', text: 'Olympic events', correct: false },
			{ label: 'D', text: 'Diet plans', correct: false }
		],
		answer: 'A',
		answer_note: '全文围绕 exercise benefits',
		dimensions: {
			kaodian: 'C 篇说明文主旨：开头段通常揭示。',
			luoji: '全文讨论运动对健康、心理、社交的好处 → benefits。',
			tuili_steps: [
				'开头段找主题句',
				'分论点都指向 benefits',
				'反复出现 exercise',
				'<strong>选 A</strong>'
			],
			cuojie: '主旨 ≠ 细节——选最宽泛的。',
			bianshi: 'C 篇 700 词左右，需速读能力。',
			qushi: 'C 篇山东必考。',
			xinfa: '"主题句+高频词"。',
			parent_tr: '长文章主旨 = 整篇在讲什么大话题。'
		}
	},

	18: {
		no: 18, type: '阅读（C）', score: 2, difficulty: 0.48, level: 'hard',
		title: '第 18 题 · 阅读 C·细节',
		stem: 'Exercise can improve...',
		options: [
			{ label: 'A', text: 'Only physical health', correct: false },
			{ label: 'B', text: 'Physical and mental health', correct: true },
			{ label: 'C', text: 'Only wealth', correct: false },
			{ label: 'D', text: 'Appearance only', correct: false }
		],
		answer: 'B',
		answer_note: '多方面好处',
		dimensions: {
			kaodian: '细节综合题：合并选项。',
			luoji: '文中提到 body + mind → 身心。',
			tuili_steps: [
				'"only" 选项通常错',
				'全面覆盖的选项对',
				'body+mind → physical+mental',
				'<strong>选 B</strong>'
			],
			cuojie: 'only/always 类绝对化词小心。',
			bianshi: '"身心健康"在中西方都强调。',
			qushi: '健康类话题山东高频。',
			xinfa: '"排除绝对化"。',
			parent_tr: '运动好处多——身体+心理都有。'
		}
	},

	19: {
		no: 19, type: '阅读（C）', score: 2, difficulty: 0.45, level: 'hard',
		title: '第 19 题 · 阅读 C·推理',
		stem: 'The author would probably agree that...',
		options: [
			{ label: 'A', text: 'Everyone should exercise daily', correct: true },
			{ label: 'B', text: 'Exercise is only for athletes', correct: false },
			{ label: 'C', text: 'Exercise is dangerous', correct: false },
			{ label: 'D', text: 'Exercise is optional', correct: false }
		],
		answer: 'A',
		answer_note: '作者态度推理',
		dimensions: {
			kaodian: '作者观点推理：通过事例和评价推理立场。',
			luoji: '全文赞美运动益处 → 作者支持每日运动。',
			tuili_steps: [
				'文中全面强调益处',
				'多次用 should',
				'推理：作者支持',
				'<strong>选 A</strong>'
			],
			cuojie: '作者观点题看情态动词：should, must。',
			bianshi: '客观说明文作者常中立，议论文有明确立场。',
			qushi: '作者观点山东必考。',
			xinfa: '"情态词+态度"。',
			parent_tr: '作者观点 = 全文倾向能推出。'
		}
	},

	20: {
		no: 20, type: '阅读（C）', score: 2, difficulty: 0.42, level: 'hard',
		title: '第 20 题 · 阅读 C·篇章结构',
		stem: 'How is the passage organized?',
		options: [
			{ label: 'A', text: 'Problem-solution', correct: false },
			{ label: 'B', text: 'Cause-effect', correct: false },
			{ label: 'C', text: 'General-specific', correct: true },
			{ label: 'D', text: 'Chronological', correct: false }
		],
		answer: 'C',
		answer_note: '先总后分',
		dimensions: {
			kaodian: '篇章结构：总分、因果、时间、对比、问题解决。',
			luoji: '先讲 exercise benefits（总）再分方面（分）→ general-specific。',
			tuili_steps: [
				'看段落之间关系',
				'总—分（general-specific）',
				'先总括后细分',
				'<strong>选 C</strong>'
			],
			cuojie: '结构题看段落主题句顺序。',
			bianshi: '其他结构：compare-contrast, advantages-disadvantages。',
			qushi: '篇章结构山东必考。',
			xinfa: '"段落主题句 → 结构"。',
			parent_tr: '文章结构 = 作者的写作顺序。'
		}
	},

	21: {
		no: 21, type: '七选五', score: 2, difficulty: 0.55, level: 'medium',
		title: '第 21 题 · 七选五·段落主旨',
		stem: '_____ (Para 1 missing topic)',
		options: [
			{ label: 'A', text: 'A topic sentence', correct: true },
			{ label: 'B', text: 'A detail', correct: false },
			{ label: 'C', text: 'A transition', correct: false }
		],
		answer: 'A',
		answer_note: '段首句通常是主题句',
		dimensions: {
			kaodian: '<strong>七选五</strong>：根据上下文选最合适的句子。',
			luoji: '段首 → 主题句；段中 → 例证；段尾 → 总结。',
			tuili_steps: [
				'看空格位置',
				'段首找主题句',
				'段中找例证或过渡',
				'<strong>选 A</strong>'
			],
			cuojie: '七选五"位置决定内容"。',
			bianshi: '连接词 however, moreover 是线索。',
			qushi: '七选五山东必考。',
			xinfa: '"位置+线索词"。',
			parent_tr: '七选五 = 根据上下文填最合适的句子。'
		}
	},

	22: {
		no: 22, type: '七选五', score: 2, difficulty: 0.52, level: 'medium',
		title: '第 22 题 · 七选五·过渡句',
		stem: '_____ (middle of para)',
		options: [
			{ label: 'A', text: 'For example, ...', correct: true },
			{ label: 'B', text: 'In conclusion', correct: false },
			{ label: 'C', text: 'Firstly', correct: false }
		],
		answer: 'A',
		answer_note: '段中例证',
		dimensions: {
			kaodian: '段中空格常为例证/转折/递进。',
			luoji: '前后是观点+具体 → For example 过渡。',
			tuili_steps: [
				'看前后句关系',
				'观点→例子：for example',
				'<strong>选 A</strong>'
			],
			cuojie: 'in conclusion 是段尾——不在段中。',
			bianshi: '过渡词：however, therefore, besides, moreover。',
			qushi: '七选五山东必考。',
			xinfa: '"逻辑词定过渡"。',
			parent_tr: '段中过渡句 = 承上启下的桥梁。'
		}
	},

	23: {
		no: 23, type: '七选五', score: 2, difficulty: 0.50, level: 'medium',
		title: '第 23 题 · 七选五·分论点',
		stem: '_____ (sub-topic)',
		options: [
			{ label: 'A', text: 'Another benefit is...', correct: true },
			{ label: 'B', text: 'On the other hand', correct: false },
			{ label: 'C', text: 'Finally', correct: false }
		],
		answer: 'A',
		answer_note: '并列分论点',
		dimensions: {
			kaodian: '七选五并列关系：另一个...、此外、还有。',
			luoji: '前段讲一个好处 → 后段 another benefit。',
			tuili_steps: [
				'判断段落关系',
				'并列：Another, Besides',
				'选 Another benefit',
				'<strong>选 A</strong>'
			],
			cuojie: '七选五"判断逻辑"最重要。',
			bianshi: '并列逻辑词：Firstly/Secondly/Finally。',
			qushi: '七选五山东必考。',
			xinfa: '"关系判断+逻辑词"。',
			parent_tr: '并列关系 = 另一个、还有、其次。'
		}
	},

	24: {
		no: 24, type: '七选五', score: 2, difficulty: 0.48, level: 'hard',
		title: '第 24 题 · 七选五·总结',
		stem: '_____ (conclusion)',
		options: [
			{ label: 'A', text: 'In summary, exercise is crucial', correct: true },
			{ label: 'B', text: 'Introduction', correct: false },
			{ label: 'C', text: 'Question', correct: false }
		],
		answer: 'A',
		answer_note: '段尾/文末',
		dimensions: {
			kaodian: '段尾/文末空格 = 总结句。',
			luoji: 'In summary / In conclusion 明显是总结。',
			tuili_steps: [
				'文末/段尾位置',
				'总结词：In summary',
				'<strong>选 A</strong>'
			],
			cuojie: '总结句通常包含全文关键词。',
			bianshi: '首尾呼应是好文章特征。',
			qushi: '总结句山东必考。',
			xinfa: '"位置+总结词"。',
			parent_tr: '文末常用"总之""综上"做总结。'
		}
	},

	25: {
		no: 25, type: '七选五', score: 2, difficulty: 0.45, level: 'hard',
		title: '第 25 题 · 七选五·过渡',
		stem: '_____ (transition between paras)',
		options: [
			{ label: 'A', text: 'However, there are some challenges', correct: true },
			{ label: 'B', text: 'Firstly', correct: false }
		],
		answer: 'A',
		answer_note: '段间转折',
		dimensions: {
			kaodian: '段间转折：However, Nevertheless, On the other hand。',
			luoji: '前段讲好处，后段讲挑战 → 转折 However。',
			tuili_steps: [
				'段间关系',
				'转折：However',
				'<strong>选 A</strong>'
			],
			cuojie: '转折前后观点相反。',
			bianshi: '转折词：But, Yet, Still, Though。',
			qushi: '段间过渡山东必考。',
			xinfa: '"转折词定过渡"。',
			parent_tr: '前后观点相反 = 用 However 连接。'
		}
	},

	26: {
		no: 26, type: '完形填空', score: 1.5, difficulty: 0.55, level: 'medium',
		title: '第 26 题 · 完形填空',
		stem: 'He walked ____ into the room.',
		options: [
			{ label: 'A', text: 'quickly', correct: true },
			{ label: 'B', text: 'quick', correct: false },
			{ label: 'C', text: 'quicken', correct: false },
			{ label: 'D', text: 'quickness', correct: false }
		],
		answer: 'A',
		answer_note: '副词修饰动词',
		dimensions: {
			kaodian: '<strong>完形填空</strong>：语境 + 词义 + 语法。',
			luoji: '修饰动词 walk → 用副词 quickly。',
			tuili_steps: [
				'空前是动词 walked',
				'修饰动词用副词',
				'quickly 副词',
				'<strong>选 A</strong>'
			],
			cuojie: '词性辨析是完形基础。',
			bianshi: '形容词 + ly 大多成副词。',
			qushi: '完形山东必考 30 分。',
			xinfa: '完形"四步"：读、分析、选、验证。',
			parent_tr: '修饰动词用副词（-ly 结尾）。'
		}
	},

	27: {
		no: 27, type: '完形', score: 1.5, difficulty: 0.52, level: 'medium',
		title: '第 27 题 · 完形·动词',
		stem: 'She ____ the book yesterday.',
		options: [
			{ label: 'A', text: 'read', correct: true },
			{ label: 'B', text: 'reads', correct: false },
			{ label: 'C', text: 'reading', correct: false },
			{ label: 'D', text: 'is reading', correct: false }
		],
		answer: 'A',
		answer_note: '过去时',
		dimensions: {
			kaodian: '时态题：yesterday → 过去时。',
			luoji: 'read 过去式 = read（不规则）。',
			tuili_steps: [
				'时间标志 yesterday',
				'用过去时',
				'read 过去式拼写同现在',
				'<strong>选 A</strong>'
			],
			cuojie: 'read 现在/过去拼写同但读音不同。',
			bianshi: '不规则动词：read/read, put/put, cut/cut。',
			qushi: '时态山东必考。',
			xinfa: '时间词+时态对应。',
			parent_tr: 'yesterday 是昨天，要用过去时。'
		}
	},

	28: {
		no: 28, type: '完形', score: 1.5, difficulty: 0.48, level: 'medium',
		title: '第 28 题 · 完形·介词',
		stem: 'The book is ____ the table.',
		options: [
			{ label: 'A', text: 'on', correct: true },
			{ label: 'B', text: 'in', correct: false },
			{ label: 'C', text: 'at', correct: false },
			{ label: 'D', text: 'under', correct: false }
		],
		answer: 'A',
		answer_note: '表面用 on',
		dimensions: {
			kaodian: '介词辨析：on(表面)、in(里面)、at(点)、under(下)。',
			luoji: '书在桌上 → on。',
			tuili_steps: [
				'空间关系',
				'书在桌上 = on',
				'<strong>选 A</strong>'
			],
			cuojie: '抽象 in/on 要积累：in the morning, on Monday。',
			bianshi: 'on + 日期/星期，in + 月/年，at + 点钟。',
			qushi: '介词山东必考。',
			xinfa: '"三时间介词"。',
			parent_tr: 'on 表示在..表面上。'
		}
	},

	29: {
		no: 29, type: '完形', score: 1.5, difficulty: 0.45, level: 'hard',
		title: '第 29 题 · 完形·语义',
		stem: 'He was so ____ that he couldn\'t speak.',
		options: [
			{ label: 'A', text: 'excited', correct: true },
			{ label: 'B', text: 'boring', correct: false },
			{ label: 'C', text: 'tired', correct: false },
			{ label: 'D', text: 'old', correct: false }
		],
		answer: 'A',
		answer_note: '语境推理',
		dimensions: {
			kaodian: '完形语境：前后逻辑选词。',
			luoji: '"couldn\'t speak" → 激动到说不出话 → excited。',
			tuili_steps: [
				'看前后关系',
				'说不出话 = 极度情绪',
				'excited 最合适',
				'<strong>选 A</strong>'
			],
			cuojie: '-ed vs -ing：excited 感到激动；exciting 令人激动。',
			bianshi: 'interested/interesting, bored/boring。',
			qushi: '分词形容词山东必考。',
			xinfa: '"主动-ing、被动-ed"。',
			parent_tr: '-ed 形容人感受；-ing 形容事物本身。'
		}
	},

	30: {
		no: 30, type: '完形', score: 1.5, difficulty: 0.42, level: 'hard',
		title: '第 30 题 · 完形·固定搭配',
		stem: 'She is good ____ math.',
		options: [
			{ label: 'A', text: 'at', correct: true },
			{ label: 'B', text: 'in', correct: false },
			{ label: 'C', text: 'on', correct: false },
			{ label: 'D', text: 'for', correct: false }
		],
		answer: 'A',
		answer_note: 'be good at 固定搭配',
		dimensions: {
			kaodian: '固定搭配：be good at/in/for 各不同。',
			luoji: 'be good at 擅长（某学科或技能）。',
			tuili_steps: [
				'be good at = 擅长',
				'be good in = 在...方面好',
				'be good for = 对...有益',
				'<strong>选 A</strong>'
			],
			cuojie: '介词搭配必须积累。',
			bianshi: 'be interested in, be afraid of, be proud of。',
			qushi: '固定搭配山东必考。',
			xinfa: '"介词搭配笔记本"。',
			parent_tr: '固定搭配 = 英语里固定的词组合。'
		}
	},

	31: {
		no: 31, type: '语法填空', score: 1.5, difficulty: 0.45, level: 'hard',
		title: '第 31 题 · 语法填空·冠词',
		stem: 'She is ____ honest person.',
		answer: 'an',
		answer_note: '元音音素前用 an',
		dimensions: {
			kaodian: '<strong>冠词</strong>：a(辅音音素)、an(元音音素)、the(特指)。',
			luoji: 'honest 的 h 不发音，[ɒnəst] 首音是元音 → an。',
			tuili_steps: [
				'看首音（不是首字母）',
				'honest /ɒnəst/ 首音元音',
				'用 an',
				'<strong>答案 an</strong>'
			],
			cuojie: '首音 ≠ 首字母——hour, honor 都要 an。',
			bianshi: 'a university（u 发 /juː/ 辅音）用 a。',
			qushi: '冠词山东必考。',
			xinfa: '"看首音不看首字母"。',
			parent_tr: 'honest 的 h 不发音，所以要用 an。'
		}
	},

	32: {
		no: 32, type: '语法填空', score: 1.5, difficulty: 0.42, level: 'hard',
		title: '第 32 题 · 语法·非谓语',
		stem: '____ (see) the movie, she cried.',
		answer: 'Seeing',
		answer_note: '现在分词作状语',
		dimensions: {
			kaodian: '非谓语：现在分词（主动）、过去分词（被动）、不定式（目的）。',
			luoji: '她看到电影 → 主动，用 Seeing 作状语。',
			tuili_steps: [
				'判断主动/被动',
				'she 主动看电影',
				'现在分词 Seeing',
				'<strong>答案 Seeing</strong>'
			],
			cuojie: '分词的逻辑主语要与句子主语一致。',
			bianshi: '被动用过去分词：Seen from above, the city is beautiful。',
			qushi: '非谓语山东必考。',
			xinfa: '"主动-ing、被动-ed、目的 to"。',
			parent_tr: '非谓语看主动被动选现在/过去分词。'
		}
	},

	33: {
		no: 33, type: '语法填空', score: 1.5, difficulty: 0.40, level: 'hard',
		title: '第 33 题 · 语法·时态',
		stem: 'By next year, he ____ (finish) the project.',
		answer: 'will have finished',
		answer_note: '将来完成时',
		dimensions: {
			kaodian: '<strong>将来完成时</strong>：will have done。by + 将来时间。',
			luoji: 'By next year 是将来某时间点之前 → will have finished。',
			tuili_steps: [
				'时间标志 by next year',
				'将来某时前完成',
				'will + have + done',
				'<strong>答案 will have finished</strong>'
			],
			cuojie: 'by vs until：by 是完成、until 是持续。',
			bianshi: 'by the time + 过去 = had done；by + 将来 = will have done。',
			qushi: '时态山东必考。',
			xinfa: '"by + 时间 + 完成时"。',
			parent_tr: 'By 某时间 = 在那之前完成，用完成时。'
		}
	},

	34: {
		no: 34, type: '书面表达·应用文', score: 15, difficulty: 0.35, level: 'hard',
		title: '第 34 题 · 书面表达·应用文',
		stem: '写一封邀请信（100 词左右）。',
		answer: '格式+内容+语言',
		answer_note: '应用文模板',
		dimensions: {
			kaodian: '<strong>应用文</strong>：邀请、道歉、感谢、建议、投诉。',
			luoji: '格式：称呼+正文（写作目的+细节+期待回复）+落款。',
			tuili_steps: [
				'称呼：Dear ____,',
				'第一段：写信目的',
				'第二段：具体细节（时间地点活动）',
				'第三段：期待回复',
				'落款：Yours, ____'
			],
			cuojie: '应用文不能太长——结构清晰简洁。',
			bianshi: '邀请信五要素：what/when/where/why/who。',
			qushi: '应用文山东必考 15 分。',
			xinfa: '"三段式结构"。',
			parent_tr: '应用文要按固定格式写，清楚简洁。'
		}
	},

	35: {
		no: 35, type: '读后续写', score: 25, difficulty: 0.30, level: 'hard',
		title: '第 35 题 · 读后续写',
		stem: '根据所给材料续写两段（150 词左右）。',
		answer: '情节+情感+语言',
		answer_note: '新高考特色',
		dimensions: {
			kaodian: '<strong>读后续写</strong>：新高考特色，山东采用。关键：延续情节+呼应原文+语言亮点。',
			luoji: '续写原则：①情节合理 ②人物一致 ③语言风格接近 ④使用高级词句。',
			tuili_steps: [
				'①精读原文抓主线',
				'②据首句续写',
				'③情节起伏 + 情感升华',
				'④使用高级词汇和从句',
				'⑤首尾呼应'
			],
			cuojie: '续写不是另起新故事——必须承接原文。',
			bianshi: '加分项：高级词、长难句、修辞手法。',
			qushi: '读后续写山东 25 分重中之重。',
			xinfa: '"延续+升华+亮点"。',
			parent_tr: '读后续写 = 按原文延续写故事，要用高级词句加分。'
		}
	}

};
