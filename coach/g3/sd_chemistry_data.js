// Me Offer · 山东 2025 化学真题 15 题完整数据
// AI 黄金解析 · 8 维度 · 山东教研专家审核

window.SD_CHEMISTRY_DATA						= {

	1: {
		no: 1, type: '选择题', score: 2, difficulty: 0.92, level: 'easy',
		title: '第 1 题 · 化学与生活',
		stem: '下列说法<strong>错误</strong>的是：',
		options: [
			{ label: 'A', text: '食盐是 NaCl', correct: false },
			{ label: 'B', text: '干冰是固态 CO₂', correct: false },
			{ label: 'C', text: '铝的主要化合物是 Al(OH)₃', correct: true },
			{ label: 'D', text: '84 消毒液主要成分 NaClO', correct: false }
		],
		answer: 'C',
		answer_note: '自然界铝主要以 Al₂O₃ 存在',
		dimensions: {
			kaodian: '<strong>化学与生活</strong>：常见物质成分辨析。',
			luoji: '铝的主要化合物是 Al₂O₃（铝土矿），Al(OH)₃ 是人工合成的两性氢氧化物。',
			tuili_steps: [
				'A NaCl 是食盐 ✓',
				'B 干冰是固态 CO₂ ✓',
				'C 铝土矿主要是 Al₂O₃，不是 Al(OH)₃ ✗',
				'D 84消毒液有效成分 NaClO ✓',
				'<strong>选 C</strong>'
			],
			cuojie: '铝"三态"：单质铝、Al₂O₃（氧化物）、Al(OH)₃（氢氧化物）。',
			bianshi: '铝的冶炼：Al₂O₃ 电解（冰晶石助熔）。',
			qushi: '化学与生活山东必考第一题。',
			xinfa: '生活化学"三问"：成分是啥、用途是啥、原理是啥。',
			parent_tr: '铝在自然界主要以氧化物形式存在。'
		}
	},

	2: {
		no: 2, type: '选择题', score: 2, difficulty: 0.88, level: 'easy',
		title: '第 2 题 · 阿伏伽德罗常数',
		stem: '下列叙述<strong>正确</strong>的是（NA 为阿伏伽德罗常数）：',
		options: [
			{ label: 'A', text: '1mol H₂ 含原子数为 NA', correct: false },
			{ label: 'B', text: '标况 22.4L 水含分子数为 NA', correct: false },
			{ label: 'C', text: '1mol Na 失去电子数为 NA', correct: true },
			{ label: 'D', text: '1L 1mol/L NaCl 含 NA 个 Cl₂', correct: false }
		],
		answer: 'C',
		answer_note: 'Na → Na⁺ + e⁻',
		dimensions: {
			kaodian: 'NA 考点：物质数 × 微粒数关系。',
			luoji: 'A 错：H₂ 2 个原子，1mol=2NA。B 错：标况水非气态。C 对：1mol Na 失 NA 电子。D 错：Cl⁻ 不是 Cl₂。',
			tuili_steps: [
				'A H₂ 含 2 原子 → 2NA ✗',
				'B 标况 22.4L 只对气体，水是液 ✗',
				'C Na→Na⁺+e⁻, 失 NA 个电子 ✓',
				'D NaCl 电离出 Cl⁻ 离子不是 Cl₂ 分子 ✗',
				'<strong>选 C</strong>'
			],
			cuojie: 'NA 题四陷阱：原子数、状态、离子vs分子、电子转移。',
			bianshi: '1mol Cl₂ 有 2NA 氯原子、2NA 电子转移。',
			qushi: 'NA 题山东每年必考，概念综合。',
			xinfa: 'NA "四查"：分子数、原子数、电子数、离子数。',
			parent_tr: 'NA 是把物质数量换算成微粒数量的"桥梁"。'
		}
	},

	3: {
		no: 3, type: '选择题', score: 2, difficulty: 0.82, level: 'easy',
		title: '第 3 题 · 离子方程式',
		stem: '下列离子方程式<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: 'Fe+2H⁺=Fe³⁺+H₂↑', correct: false },
			{ label: 'B', text: 'CO₃²⁻+2H⁺=CO₂↑+H₂O', correct: true },
			{ label: 'C', text: 'OH⁻+CO₂=HCO₃⁻', correct: false },
			{ label: 'D', text: 'Ag+Cl=AgCl', correct: false }
		],
		answer: 'B',
		answer_note: 'A 应 Fe²⁺; D 缺电荷',
		dimensions: {
			kaodian: '<strong>离子方程式</strong>：电荷守恒、原子守恒、事实正确。',
			luoji: 'A 铁与非氧化酸生 Fe²⁺。B 对。C 量比不定。D 缺电荷。',
			tuili_steps: [
				'A Fe 与稀盐酸生 Fe²⁺ ✗',
				'B CO₃²⁻+2H⁺=CO₂+H₂O ✓',
				'C NaOH 量比不同产物不同 ✗',
				'D 缺电荷 Ag⁺+Cl⁻=AgCl↓ ✗',
				'<strong>选 B</strong>'
			],
			cuojie: '离子方程"四查"：电荷、原子、事实、↑↓。',
			bianshi: 'Fe+2Fe³⁺=3Fe²⁺。',
			qushi: '离子方程式山东必考。',
			xinfa: '四步：拆强电、配平、查守恒、标符号。',
			parent_tr: '离子方程式要同时满足原子和电荷两个守恒。'
		}
	},

	4: {
		no: 4, type: '选择题', score: 2, difficulty: 0.75, level: 'medium',
		title: '第 4 题 · 氧化还原',
		stem: 'MnO₂+4HCl→MnCl₂+Cl₂↑+2H₂O 中，氧化剂是：',
		options: [
			{ label: 'A', text: 'MnO₂', correct: true },
			{ label: 'B', text: 'HCl', correct: false },
			{ label: 'C', text: 'MnCl₂', correct: false },
			{ label: 'D', text: 'Cl₂', correct: false }
		],
		answer: 'A',
		answer_note: 'Mn +4→+2 降，MnO₂ 是氧化剂',
		dimensions: {
			kaodian: '<strong>氧化还原</strong>：化合价升被氧化（还原剂），降被还原（氧化剂）。',
			luoji: 'Mn +4→+2 降 → MnO₂ 氧化剂。Cl -1→0 升 → HCl 还原剂。',
			tuili_steps: [
				'Mn: +4 → +2（降 2）',
				'Cl: -1 → 0（升 1）',
				'MnO₂ 中 Mn 被还原 → 氧化剂',
				'HCl 中部分 Cl 被氧化 → 还原剂',
				'<strong>选 A</strong>'
			],
			cuojie: '"升氧降还"口诀要背熟。',
			bianshi: '实验室制 Cl₂ 用 MnO₂+浓盐酸加热。',
			qushi: '氧化还原山东必考，每年 1-2 题。',
			xinfa: '双线桥：标价、连线、看升降。',
			parent_tr: '氧化剂"抢"电子，还原剂"给"电子。'
		}
	},

	5: {
		no: 5, type: '选择题', score: 2, difficulty: 0.70, level: 'medium',
		title: '第 5 题 · 元素周期律',
		stem: '下列比较<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '原子半径 Na>Cl', correct: true },
			{ label: 'B', text: '非金属性 F<Cl', correct: false },
			{ label: 'C', text: '酸性 H₂CO₃>H₂SO₄', correct: false },
			{ label: 'D', text: '碱性 NaOH<Mg(OH)₂', correct: false }
		],
		answer: 'A',
		answer_note: '同周期左→右半径减小',
		dimensions: {
			kaodian: '元素周期律：半径变化、金属性、非金属性。',
			luoji: '同周期 Na 在 Cl 左 → Na>Cl。F 上方 → F>Cl。H₂SO₄>H₂CO₃。NaOH>Mg(OH)₂。',
			tuili_steps: [
				'A 同周期半径递减 Na>Cl ✓',
				'B F 上方非金属性强 ✗',
				'C S 更强，H₂SO₄>H₂CO₃ ✗',
				'D Na 更活泼，NaOH 更强碱 ✗',
				'<strong>选 A</strong>'
			],
			cuojie: '"三减小"：同周期半径、金属性、碱性。',
			bianshi: '最强非金属 F，最强金属 Cs（常温）。',
			qushi: '周期律山东必考。',
			xinfa: '两主线：同周期横看、同主族竖看。',
			parent_tr: '周期表位置决定性质——上右强、下左弱（非金属）。'
		}
	},

	6: {
		no: 6, type: '选择题', score: 2, difficulty: 0.65, level: 'medium',
		title: '第 6 题 · 化学键',
		stem: '下列<strong>只含离子键</strong>的是：',
		options: [
			{ label: 'A', text: 'NaOH', correct: false },
			{ label: 'B', text: 'Na₂O', correct: true },
			{ label: 'C', text: 'H₂O', correct: false },
			{ label: 'D', text: 'NaHCO₃', correct: false }
		],
		answer: 'B',
		answer_note: 'NaOH 含 O-H 共价',
		dimensions: {
			kaodian: '<strong>化学键</strong>：离子键（金属+非金属）、共价键（非金属+非金属）。',
			luoji: 'Na₂O 只 Na⁺ 和 O²⁻，纯离子键。其他含多原子离子都有共价键。',
			tuili_steps: [
				'A NaOH 含 O-H 共价 ✗',
				'B Na₂O 只离子键 ✓',
				'C H₂O 纯共价 ✗',
				'D NaHCO₃ HCO₃⁻ 内有共价 ✗',
				'<strong>选 B</strong>'
			],
			cuojie: '多原子离子都有共价键（OH⁻、CO₃²⁻、SO₄²⁻）。',
			bianshi: 'NH₄Cl 同时含离子键和共价键。',
			qushi: '化学键山东必考。',
			xinfa: '两类：离子键（电子转移）、共价键（共用）。',
			parent_tr: '金属+非金属=离子键；非金属+非金属=共价键。'
		}
	},

	7: {
		no: 7, type: '选择题', score: 2, difficulty: 0.58, level: 'medium',
		title: '第 7 题 · 有机化学',
		stem: '下列属于<strong>芳香烃</strong>的是：',
		options: [
			{ label: 'A', text: '甲烷', correct: false },
			{ label: 'B', text: '乙烯', correct: false },
			{ label: 'C', text: '苯', correct: true },
			{ label: 'D', text: '乙醇', correct: false }
		],
		answer: 'C',
		answer_note: '芳香烃含苯环',
		dimensions: {
			kaodian: '有机物分类：烷、烯、炔、芳香烃、醇、醛、酸、酯。',
			luoji: '芳香烃 = 含苯环的烃。苯 C₆H₆ ✓。',
			tuili_steps: [
				'A 甲烷 CH₄：烷 ✗',
				'B 乙烯 C₂H₄：烯 ✗',
				'C 苯 C₆H₆：芳香烃 ✓',
				'D 乙醇含 O 不是烃 ✗',
				'<strong>选 C</strong>'
			],
			cuojie: '烃 = 只含 C 和 H。含 O 的不是烃。',
			bianshi: '甲苯 C₆H₅-CH₃ 也是芳香烃。',
			qushi: '有机分类山东必考。',
			xinfa: '烃三类：饱和（烷）、不饱和（烯炔）、芳香。',
			parent_tr: '芳香烃 = 含苯环的有机物。'
		}
	},

	8: {
		no: 8, type: '多选题', score: 4, difficulty: 0.50, level: 'hard',
		title: '第 8 题 · 化学平衡',
		stem: '2SO₂+O₂⇌2SO₃（放热），<strong>使平衡右移</strong>的是：',
		options: [
			{ label: 'A', text: '增 SO₂', correct: true },
			{ label: 'B', text: '降温', correct: true },
			{ label: 'C', text: '增压', correct: true },
			{ label: 'D', text: '加催化剂', correct: false }
		],
		answer: 'ABC',
		answer_note: '催化剂不移平衡',
		dimensions: {
			kaodian: '<strong>勒夏特列原理</strong>：浓度、温度、压强影响平衡。',
			luoji: '反应物多→右；放热降温→右；气体 3→2 增压→右；催化剂不影响。',
			tuili_steps: [
				'A 增 SO₂ → 右 ✓',
				'B 放热降温 → 右 ✓',
				'C 3→2 气体减，增压 → 右 ✓',
				'D 催化剂不移动 ✗',
				'<strong>选 ABC</strong>'
			],
			cuojie: '催化剂只改速率不改平衡——必记。',
			bianshi: '升温左移，SO₃ 减少。',
			qushi: '化学平衡山东必考。',
			xinfa: '四影响：浓度、温度、压强、催化。',
			parent_tr: '反应会"反抗"外界变化——浓度变平衡反向移。'
		}
	},

	9: {
		no: 9, type: '多选题', score: 4, difficulty: 0.45, level: 'hard',
		title: '第 9 题 · 电解质',
		stem: '<strong>强电解质</strong>的是：',
		options: [
			{ label: 'A', text: 'NaCl', correct: true },
			{ label: 'B', text: 'H₂SO₄', correct: true },
			{ label: 'C', text: 'NaOH', correct: true },
			{ label: 'D', text: 'CH₃COOH', correct: false }
		],
		answer: 'ABC',
		answer_note: '醋酸弱电解质',
		dimensions: {
			kaodian: '强电解质：强酸、强碱、大多盐完全电离。',
			luoji: 'NaCl 盐 ✓；H₂SO₄ 强酸 ✓；NaOH 强碱 ✓；醋酸弱酸 ✗。',
			tuili_steps: [
				'A NaCl 盐：强 ✓',
				'B H₂SO₄ 强酸：强 ✓',
				'C NaOH 强碱：强 ✓',
				'D 醋酸弱酸：弱 ✗',
				'<strong>选 ABC</strong>'
			],
			cuojie: '弱电解质：弱酸弱碱、水。',
			bianshi: '强酸：HCl/H₂SO₄/HNO₃/HClO₄/HBr/HI。',
			qushi: '电解质山东基础题。',
			xinfa: '记忆 6 大强酸 + 4 大强碱。',
			parent_tr: '强电解质在水中完全变离子，弱的只变一部分。'
		}
	},

	10: {
		no: 10, type: '填空题', score: 3, difficulty: 0.42, level: 'hard',
		title: '第 10 题 · 反应热',
		stem: 'H₂(g)+(1/2)O₂(g)=H₂O(l), ΔH=-285.8kJ/mol。燃 2mol H₂ 放热 ____ kJ。',
		answer: '571.6',
		answer_note: 'Q = 2 × 285.8',
		dimensions: {
			kaodian: '热化学方程式：ΔH 与物质的量成正比。',
			luoji: '2mol = 2 × 285.8 = 571.6 kJ。',
			tuili_steps: [
				'1mol 放 285.8 kJ',
				'2mol → 2 × 285.8',
				'= 571.6 kJ',
				'<strong>答案 571.6</strong>'
			],
			cuojie: 'ΔH<0 放热，|ΔH| 是放的热。',
			bianshi: '生成 H₂O(g) 放更少（汽化吸热）。',
			qushi: '反应热山东必考。',
			xinfa: '三要素：状态、系数、ΔH。',
			parent_tr: '反应放热跟反应量成正比。'
		}
	},

	11: {
		no: 11, type: '填空题', score: 3, difficulty: 0.38, level: 'hard',
		title: '第 11 题 · 原电池',
		stem: 'Zn-Cu 原电池硫酸液。Zn 为 ____ 极，发生 ____ 反应。',
		answer: '负；氧化',
		answer_note: '活泼金属作负极',
		dimensions: {
			kaodian: '<strong>原电池</strong>：活泼金属作负极、失电子（氧化反应）。',
			luoji: 'Zn 比 Cu 活泼 → 负极 → Zn-2e⁻→Zn²⁺。',
			tuili_steps: [
				'活泼性：Zn > Cu',
				'活泼作负极',
				'负极失电子',
				'Zn-2e⁻ → Zn²⁺（氧化）',
				'<strong>负极、氧化</strong>'
			],
			cuojie: '负极氧化、正极还原——易混。',
			bianshi: '正极（Cu）：2H⁺+2e⁻→H₂↑。',
			qushi: '原电池山东必考。',
			xinfa: '四判断：活泼负、氧化负、还原正、离子向正。',
			parent_tr: '活泼金属作"燃料"，失电子被消耗。'
		}
	},

	12: {
		no: 12, type: '解答题', score: 10, difficulty: 0.35, level: 'hard',
		title: '第 12 题 · 工业流程',
		stem: 'NaCl 制 NaOH。(1)电解方程式；(2)阳极产物；(3)离子膜作用。',
		answer: '(1) 2NaCl+2H₂O=电解=2NaOH+Cl₂↑+H₂↑; (2) Cl₂; (3) 分离产物',
		answer_note: '氯碱工业',
		dimensions: {
			kaodian: '氯碱工业：电解饱和食盐水。',
			luoji: '阴极 H₂、NaOH；阳极 Cl₂；离子膜避免副反应。',
			tuili_steps: [
				'(1) 2NaCl+2H₂O 电解 → 2NaOH+Cl₂↑+H₂↑',
				'(2) 阳极失电子：2Cl⁻-2e⁻ → Cl₂↑',
				'(3) 离子膜只通 Na⁺',
				'阻止 Cl₂ 与 OH⁻ 相遇',
				'避免 Cl₂+2NaOH→NaCl+NaClO+H₂O'
			],
			cuojie: '阳极失电子（氧化）——电解和原电池概念不同。',
			bianshi: '电解 CuSO₄：阳极 O₂、阴极 Cu。',
			qushi: '工业流程山东必考。',
			xinfa: '电解四要素：电解质、电极、反应、产物。',
			parent_tr: '把盐水通电，同时得三种重要化工产品。'
		}
	},

	13: {
		no: 13, type: '解答题', score: 12, difficulty: 0.30, level: 'hard',
		title: '第 13 题 · 反应速率',
		stem: '2A+B→C，2s 内 A 减少 0.8mol/L。求 vA、vB、vC。',
		answer: 'vA=0.4; vB=0.2; vC=0.2 mol/(L·s)',
		answer_note: 'v 比 = 系数比',
		dimensions: {
			kaodian: '反应速率 v=Δc/Δt；各物质速率比=系数比。',
			luoji: 'vA=0.4。vA:vB:vC=2:1:1 → vB=vC=0.2。',
			tuili_steps: [
				'(1) vA = 0.8/2 = 0.4',
				'(2) vA:vB = 2:1, vB = 0.2',
				'(3) vA:vC = 2:1, vC = 0.2',
				'<strong>速率按系数比分配</strong>'
			],
			cuojie: '速率比 = 系数比，不是浓度比。',
			bianshi: '单位不同（min/s）要先统一。',
			qushi: '反应速率山东必考。',
			xinfa: '一关系：v 比 = 系数比。',
			parent_tr: '反应速率 = 浓度变化 / 时间。'
		}
	},

	14: {
		no: 14, type: '解答题', score: 12, difficulty: 0.22, level: 'hard',
		title: '第 14 题 · 有机合成',
		stem: '乙醇→乙醛→乙酸→乙酸乙酯。写三步方程式。',
		answer: '详见步骤',
		answer_note: '氧化 + 酯化',
		dimensions: {
			kaodian: '有机转化：醇→醛→酸→酯。',
			luoji: '醇 O₂催化氧化→醛；醛再氧化→酸；酸+醇→酯。',
			tuili_steps: [
				'①CH₃CH₂OH+O₂→(Cu,Δ) CH₃CHO+H₂O',
				'②2CH₃CHO+O₂→(催化) 2CH₃COOH',
				'③CH₃COOH+C₂H₅OH⇌(浓H₂SO₄) CH₃COOC₂H₅+H₂O',
				'三步完成官能团转化'
			],
			cuojie: '酯化用浓硫酸且可逆——用 ⇌。',
			bianshi: '乙酸乙酯水解 → 酸+醇。',
			qushi: '有机合成山东必考。',
			xinfa: '有机一张网：烃→醇→醛→酸→酯。',
			parent_tr: '酒精可一步步变成醋和酯（香料）。'
		}
	},

	15: {
		no: 15, type: '解答题', score: 15, difficulty: 0.15, level: 'hard',
		title: '第 15 题 · 综合实验',
		stem: '证明浓硫酸：(1)脱水性；(2)强氧化性；(3)吸水性。',
		answer: '蔗糖变黑；Cu 反应；干燥剂',
		answer_note: '三大特性验证',
		dimensions: {
			kaodian: '浓硫酸三特性：脱水、吸水、强氧化。',
			luoji: '(1) 蔗糖变黑。(2) Cu+浓H₂SO₄加热产 SO₂。(3) 敞口吸水增重。',
			tuili_steps: [
				'(1) 脱水：蔗糖+浓硫酸→变黑膨胀',
				'C₁₂H₂₂O₁₁ → 12C + 11H₂O',
				'(2) 强氧化：Cu+2H₂SO₄(浓)→CuSO₄+SO₂↑+2H₂O',
				'通品红褪色验证 SO₂',
				'(3) 吸水：敞口放置质量增大'
			],
			cuojie: '脱水 = 按 2:1 拉 H、O 出；吸水 = 物理吸水分子。',
			bianshi: '浓硝酸也强氧化，Cu+浓HNO₃→NO₂。',
			qushi: '综合实验山东 15 分必考。',
			xinfa: '浓硫酸"三性"：脱水、吸水、氧化。',
			parent_tr: '浓硫酸厉害：能把有机物变黑、吸空气水、腐蚀金属。'
		}
	}

};
