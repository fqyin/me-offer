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
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:440px;display:block;margin:0 auto;"><rect x="0" y="0" width="440" height="200" fill="#FFFFFF"/><text x="220" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">MnO₂ + 4HCl → MnCl₂ + Cl₂↑ + 2H₂O</text><text x="80" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">MnO₂</text><text x="80" y="108" text-anchor="middle" font-size="10" fill="#C94A4A">(+4)</text><text x="180" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">4HCl</text><text x="180" y="108" text-anchor="middle" font-size="10" fill="#1D6FE0">(-1)</text><text x="280" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">MnCl₂</text><text x="280" y="108" text-anchor="middle" font-size="10" fill="#22C55E">(+2)</text><text x="380" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">Cl₂</text><text x="380" y="108" text-anchor="middle" font-size="10" fill="#22C55E">(0)</text><path d="M 80 75 Q 180 40, 280 75" stroke="#C94A4A" stroke-width="2" fill="none" marker-end="url(#arrc)"/><text x="180" y="50" text-anchor="middle" font-size="10" fill="#C94A4A" font-weight="700">Mn +4→+2 降（得 2e⁻）</text><text x="180" y="65" text-anchor="middle" font-size="9" fill="#C94A4A">MnO₂ 是氧化剂（被还原）</text><path d="M 180 125 Q 280 155, 380 125" stroke="#1D6FE0" stroke-width="2" fill="none" marker-end="url(#arrc)"/><text x="280" y="150" text-anchor="middle" font-size="10" fill="#1D6FE0" font-weight="700">Cl -1→0 升（失 1e⁻）</text><text x="280" y="165" text-anchor="middle" font-size="9" fill="#1D6FE0">HCl 是还原剂（被氧化）</text><text x="220" y="190" text-anchor="middle" font-size="10" fill="#8B6914" font-weight="700">双线桥 &mdash; 一画对一个得一个失</text><defs><marker id="arrc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="currentColor"/></marker></defs></svg><div class="svg-caption">图：双线桥法分析氧化还原反应</div></div>实验室制 Cl₂ 用 <strong>MnO₂+浓盐酸加热</strong>。',
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
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:400px;display:block;margin:0 auto;"><rect x="0" y="0" width="400" height="220" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">NH₄Cl · 离子键 + 共价键</text><circle cx="130" cy="110" r="30" fill="#DCF0FF" stroke="#1D6FE0" stroke-width="2"/><text x="130" y="108" text-anchor="middle" font-size="11" font-weight="700" fill="#1D6FE0">NH₄⁺</text><text x="130" y="122" text-anchor="middle" font-size="8" fill="#1D6FE0">铵根</text><line x1="105" y1="85" x2="115" y2="95" stroke="#8B6914" stroke-width="1.5"/><line x1="155" y1="85" x2="145" y2="95" stroke="#8B6914" stroke-width="1.5"/><line x1="105" y1="135" x2="115" y2="125" stroke="#8B6914" stroke-width="1.5"/><line x1="155" y1="135" x2="145" y2="125" stroke="#8B6914" stroke-width="1.5"/><text x="98" y="82" font-size="8" fill="#8B6914">H</text><text x="158" y="82" font-size="8" fill="#8B6914">H</text><text x="98" y="148" font-size="8" fill="#8B6914">H</text><text x="158" y="148" font-size="8" fill="#8B6914">H</text><path d="M 165 110 L 230 110" stroke="#C94A4A" stroke-width="3" stroke-dasharray="8,4"/><text x="197" y="100" text-anchor="middle" font-size="10" fill="#C94A4A" font-weight="700">离子键</text><text x="197" y="128" text-anchor="middle" font-size="8" fill="#C94A4A">(静电作用)</text><circle cx="265" cy="110" r="30" fill="#FEECEC" stroke="#C94A4A" stroke-width="2"/><text x="265" y="115" text-anchor="middle" font-size="11" font-weight="700" fill="#C94A4A">Cl⁻</text><rect x="20" y="175" width="170" height="35" fill="#FDF8F0" stroke="#8B6914" rx="3"/><text x="105" y="190" text-anchor="middle" font-size="9" fill="#8B6914" font-weight="700">NH₄⁺ 内部 N-H</text><text x="105" y="203" text-anchor="middle" font-size="9" fill="#8B6914">= 共价键</text><rect x="210" y="175" width="170" height="35" fill="#FEECEC" stroke="#C94A4A" rx="3"/><text x="295" y="190" text-anchor="middle" font-size="9" fill="#C94A4A" font-weight="700">NH₄⁺ 与 Cl⁻</text><text x="295" y="203" text-anchor="middle" font-size="9" fill="#C94A4A">= 离子键</text></svg><div class="svg-caption">图：NH₄Cl 同时含有两种化学键</div></div><strong>NH₄Cl 同时含离子键和共价键</strong>。',
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
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 440 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:440px;display:block;margin:0 auto;"><rect x="0" y="0" width="440" height="220" fill="#FFFFFF"/><text x="220" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">勒夏特列原理 · 2SO₂+O₂⇌2SO₃</text><text x="220" y="50" text-anchor="middle" font-size="10" fill="#8B6914" font-weight="700">平衡移动方向</text><rect x="40" y="70" width="170" height="40" fill="#FEECEC" stroke="#C94A4A" rx="3"/><text x="125" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#C94A4A">右移（正反应 ↑）</text><text x="125" y="100" text-anchor="middle" font-size="9" fill="#5A5A5A">增 SO₂ · 降温 · 增压</text><rect x="230" y="70" width="170" height="40" fill="#DCF0FF" stroke="#1D6FE0" rx="3"/><text x="315" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#1D6FE0">左移（正反应 ↓）</text><text x="315" y="100" text-anchor="middle" font-size="9" fill="#5A5A5A">减 SO₂ · 升温 · 减压</text><rect x="40" y="125" width="360" height="40" fill="#FFF4E6" stroke="#E5DDD0" rx="3"/><text x="220" y="141" text-anchor="middle" font-size="10" font-weight="700" fill="#8B6914">催化剂 &mdash; 不移动</text><text x="220" y="155" text-anchor="middle" font-size="9" fill="#5A5A5A">只加快正/逆反应速率，缩短达到平衡时间</text><text x="220" y="190" text-anchor="middle" font-size="10" font-weight="700" fill="#C94A4A">核心：反应会"反抗"外界变化</text><text x="220" y="208" text-anchor="middle" font-size="9" fill="#5A5A5A">浓度/温度/压强改变 → 平衡向消弱这种改变方向移</text></svg><div class="svg-caption">图：四因素对化学平衡的影响</div></div>升温左移，<strong>SO₃ 减少</strong>。',
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
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:400px;display:block;margin:0 auto;"><rect x="0" y="0" width="400" height="260" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">Zn-Cu 原电池（稀 H₂SO₄）</text><rect x="50" y="130" width="300" height="100" fill="#DCF0FF" stroke="#1D6FE0" stroke-width="1.5"/><text x="200" y="215" text-anchor="middle" font-size="10" fill="#1D6FE0">稀 H₂SO₄（电解质溶液）</text><rect x="100" y="80" width="20" height="90" fill="#8B6914"/><text x="110" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#8B6914">Zn (-)</text><text x="110" y="248" text-anchor="middle" font-size="9" fill="#C94A4A" font-weight="700">失电子·氧化</text><rect x="280" y="80" width="20" height="90" fill="#C9A96E"/><text x="290" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#C94A4A">Cu (+)</text><text x="290" y="248" text-anchor="middle" font-size="9" fill="#22C55E" font-weight="700">得电子·还原</text><line x1="120" y1="80" x2="120" y2="50" stroke="#1A1A1A" stroke-width="2"/><line x1="120" y1="50" x2="280" y2="50" stroke="#1A1A1A" stroke-width="2"/><line x1="280" y1="50" x2="280" y2="80" stroke="#1A1A1A" stroke-width="2"/><circle cx="180" cy="50" r="12" fill="#FDF8F0" stroke="#1A1A1A"/><text x="180" y="54" text-anchor="middle" font-size="10" font-weight="700">A</text><text x="230" y="45" font-size="10" fill="#C94A4A">e⁻→</text><path d="M 125 155 L 275 155" stroke="#8B6914" stroke-width="1" stroke-dasharray="4,2"/><circle cx="150" cy="155" r="4" fill="#8B6914"/><text x="150" y="170" text-anchor="middle" font-size="9" fill="#8B6914" font-weight="700">Zn²⁺</text><circle cx="250" cy="155" r="4" fill="#22C55E"/><text x="250" y="170" text-anchor="middle" font-size="9" fill="#22C55E" font-weight="700">H₂↑</text><rect x="30" y="235" width="340" height="20" fill="#FDF8F0" stroke="#8B6914" rx="3"/><text x="200" y="249" text-anchor="middle" font-size="9" fill="#8B6914" font-weight="700">负极 Zn-2e⁻→Zn²⁺ · 正极 2H⁺+2e⁻→H₂↑</text></svg><div class="svg-caption">图：原电池工作原理 &mdash; 化学能→电能</div></div>正极（Cu）：<strong>2H⁺+2e⁻→H₂↑</strong>。',
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
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:400px;display:block;margin:0 auto;"><rect x="0" y="0" width="400" height="240" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">氯碱工业 · 电解饱和食盐水</text><rect x="40" y="80" width="320" height="120" fill="#DCF0FF" stroke="#1D6FE0" stroke-width="1.5"/><line x1="200" y1="80" x2="200" y2="200" stroke="#C94A4A" stroke-width="2" stroke-dasharray="6,3"/><text x="200" y="76" text-anchor="middle" font-size="9" fill="#C94A4A" font-weight="700">阳离子交换膜</text><rect x="110" y="110" width="10" height="80" fill="#1A1A1A"/><text x="115" y="104" text-anchor="middle" font-size="10" font-weight="700" fill="#C94A4A">阳极(+)</text><text x="115" y="218" text-anchor="middle" font-size="9" fill="#22C55E" font-weight="700">Cl₂↑</text><text x="90" y="145" font-size="9" fill="#5A5A5A">Na⁺</text><text x="90" y="160" font-size="9" fill="#5A5A5A">Cl⁻</text><text x="90" y="175" font-size="9" fill="#5A5A5A">H₂O</text><rect x="280" y="110" width="10" height="80" fill="#1A1A1A"/><text x="285" y="104" text-anchor="middle" font-size="10" font-weight="700" fill="#1D6FE0">阴极(-)</text><text x="285" y="218" text-anchor="middle" font-size="9" fill="#22C55E" font-weight="700">H₂↑</text><text x="300" y="160" font-size="9" fill="#5A5A5A">NaOH</text><path d="M 195 145 L 210 145" stroke="#1A1A1A" stroke-width="1.5" marker-end="url(#arrcl)"/><text x="203" y="138" text-anchor="middle" font-size="8" fill="#1A1A1A" font-weight="700">Na⁺</text><rect x="30" y="215" width="340" height="22" fill="#FDF8F0" stroke="#8B6914" rx="3"/><text x="200" y="229" text-anchor="middle" font-size="9" fill="#8B6914" font-weight="700">2NaCl+2H₂O 电解→ 2NaOH+Cl₂↑+H₂↑（三种化工产品）</text><defs><marker id="arrcl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#1A1A1A"/></marker></defs></svg><div class="svg-caption">图：氯碱工业 &mdash; 离子膜电解槽</div></div>电解 CuSO₄：<strong>阳极 O₂、阴极 Cu</strong>。',
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
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 440 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:440px;display:block;margin:0 auto;"><rect x="0" y="0" width="440" height="160" fill="#FFFFFF"/><text x="220" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">有机转化 · 官能团变化链</text><rect x="20" y="50" width="80" height="36" fill="#DCF0FF" stroke="#1D6FE0" rx="3"/><text x="60" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#1D6FE0">乙醇</text><text x="60" y="82" text-anchor="middle" font-size="8" fill="#5A5A5A">CH₃CH₂OH</text><path d="M 100 68 L 120 68" stroke="#1A1A1A" stroke-width="1.5" marker-end="url(#arro)"/><text x="110" y="62" text-anchor="middle" font-size="8" fill="#C94A4A">+O₂</text><rect x="120" y="50" width="80" height="36" fill="#FEECEC" stroke="#C94A4A" rx="3"/><text x="160" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#C94A4A">乙醛</text><text x="160" y="82" text-anchor="middle" font-size="8" fill="#5A5A5A">CH₃CHO</text><path d="M 200 68 L 220 68" stroke="#1A1A1A" stroke-width="1.5" marker-end="url(#arro)"/><text x="210" y="62" text-anchor="middle" font-size="8" fill="#C94A4A">+O₂</text><rect x="220" y="50" width="80" height="36" fill="#FFF4E6" stroke="#8B6914" rx="3"/><text x="260" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#8B6914">乙酸</text><text x="260" y="82" text-anchor="middle" font-size="8" fill="#5A5A5A">CH₃COOH</text><path d="M 300 68 L 320 68" stroke="#1A1A1A" stroke-width="1.5" marker-end="url(#arro)"/><text x="310" y="62" text-anchor="middle" font-size="8" fill="#22C55E">+醇</text><rect x="320" y="50" width="100" height="36" fill="#E8F5E9" stroke="#22C55E" rx="3"/><text x="370" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#22C55E">乙酸乙酯</text><text x="370" y="82" text-anchor="middle" font-size="8" fill="#5A5A5A">CH₃COOC₂H₅</text><text x="220" y="125" text-anchor="middle" font-size="10" fill="#8B6914" font-weight="700">酯化反应 &mdash; 可逆、浓硫酸催化</text><text x="220" y="145" text-anchor="middle" font-size="9" fill="#5A5A5A">CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O</text><defs><marker id="arro" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#1A1A1A"/></marker></defs></svg><div class="svg-caption">图：醇→醛→酸→酯 四步转化链</div></div>乙酸乙酯水解 → <strong>酸+醇</strong>。',
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
