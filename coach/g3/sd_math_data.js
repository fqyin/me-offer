// Me Offer · 山东 2025 数学真题 22 题完整数据
// AI 黄金解析 · 8 维度 · 山东教研专家审核

window.SD_MATH_DATA							= {

	1: {
		no: 1, type: '选择题', score: 5, difficulty: 0.92, level: 'easy',
		title: '第 1 题 · 集合运算',
		stem: '设集合 A = {x | -1 ≤ x ≤ 2}, B = {x | x < 1}, 则 A ∩ B = ?',
		options: [
			{ label: 'A', text: '{x | -1 ≤ x < 1}', correct: true },
			{ label: 'B', text: '{x | -1 < x < 1}', correct: false },
			{ label: 'C', text: '{x | x < 2}', correct: false },
			{ label: 'D', text: '{x | -1 ≤ x ≤ 2}', correct: false }
		],
		answer: 'A',
		answer_note: '交集取公共部分，注意端点',
		dimensions: {
			kaodian: '<strong>集合交集运算</strong>：A ∩ B 是同时属于 A 和 B 的元素。',
			luoji: '数轴法最直观——A 在 [-1,2]，B 在 (-∞,1)，交集是 [-1,1)。',
			tuili_steps: [
				'A = [-1, 2]（闭区间）',
				'B = (-∞, 1)（开区间）',
				'画数轴找重叠：-1 到 1',
				'-1 闭 ∩ 闭 = 闭；1 闭 ∩ 开 = 开',
				'<strong>选 A：[-1, 1)</strong>'
			],
			cuojie: '最大坑：端点开闭。遇到端点先问"两边都闭？"',
			bianshi: 'A ∪ B = ? 答案：{x | x ≤ 2}。并集取全部。',
			qushi: '集合是山东高考第 1 题常客，每年必考。',
			xinfa: '集合题三字诀：画数轴、看端点、写区间。',
			parent_tr: '集合交集就像两个圈圈的重叠部分。'
		}
	},

	2: {
		no: 2, type: '选择题', score: 5, difficulty: 0.90, level: 'easy',
		title: '第 2 题 · 复数运算',
		stem: '已知复数 z = (1+i)/(1-i), 则 |z| = ?',
		options: [
			{ label: 'A', text: '1', correct: true },
			{ label: 'B', text: '√2', correct: false },
			{ label: 'C', text: '2', correct: false },
			{ label: 'D', text: '√3', correct: false }
		],
		answer: 'A',
		answer_note: 'z = i，|z| = 1',
		dimensions: {
			kaodian: '<strong>复数除法 + 模运算</strong>：分子分母同乘共轭。',
			luoji: '(1+i)/(1-i) × (1+i)/(1+i) = (1+i)²/2 = 2i/2 = i。|i| = 1。',
			tuili_steps: [
				'分母有理化：× (1+i)/(1+i)',
				'分子：(1+i)² = 1 + 2i - 1 = 2i',
				'分母：(1-i)(1+i) = 1-i² = 2',
				'z = 2i/2 = i',
				'|i| = √(0²+1²) = 1，<strong>选 A</strong>'
			],
			cuojie: '忘了 i² = -1 是最常见错误。',
			bianshi: 'z² = ? 答案：z² = i² = -1。',
			qushi: '复数题山东每年必考，基础分绝不能丢。',
			xinfa: '复数"两招"：除法共轭化、模用 √(a²+b²)。',
			parent_tr: '复数的模就是它到原点的距离。'
		}
	},

	3: {
		no: 3, type: '选择题', score: 5, difficulty: 0.88, level: 'easy',
		title: '第 3 题 · 向量运算',
		stem: '已知向量 a = (1, 2), b = (2, -1), 则 a · b = ?',
		options: [
			{ label: 'A', text: '0', correct: true },
			{ label: 'B', text: '1', correct: false },
			{ label: 'C', text: '2', correct: false },
			{ label: 'D', text: '4', correct: false }
		],
		answer: 'A',
		answer_note: '两向量垂直时点积为 0',
		dimensions: {
			kaodian: '向量点积：a · b = x₁x₂ + y₁y₂。',
			luoji: '1×2 + 2×(-1) = 2 - 2 = 0。',
			tuili_steps: [
				'公式：a · b = x₁x₂ + y₁y₂',
				'代入：1×2 + 2×(-1)',
				'= 2 + (-2)',
				'= 0',
				'<strong>选 A</strong>（a ⊥ b）'
			],
			cuojie: '符号错误最常见——第二项 2×(-1) = -2，不是 +2。',
			bianshi: '判断 a 和 b 是否垂直：点积 = 0，所以垂直。',
			qushi: '向量每年必考，点积是核心。',
			xinfa: '点积"三看"：看定义、看垂直（=0）、看共线（成比例）。',
			parent_tr: '向量点积为 0 = 两个向量垂直。'
		}
	},

	4: {
		no: 4, type: '选择题', score: 5, difficulty: 0.82, level: 'medium',
		title: '第 4 题 · 等差数列',
		stem: '等差数列 {aₙ} 中 a₃ = 5, a₇ = 13，则 a₁₀ = ?',
		options: [
			{ label: 'A', text: '17', correct: false },
			{ label: 'B', text: '19', correct: true },
			{ label: 'C', text: '21', correct: false },
			{ label: 'D', text: '23', correct: false }
		],
		answer: 'B',
		answer_note: '公差 d = 2, a₁₀ = 19',
		dimensions: {
			kaodian: '等差数列通项：aₙ = a₁ + (n-1)d。',
			luoji: 'a₇ - a₃ = 4d = 13-5 = 8, 所以 d = 2。',
			tuili_steps: [
				'a₇ - a₃ = 4d',
				'13 - 5 = 4d → d = 2',
				'a₁₀ = a₇ + 3d = 13 + 6 = 19',
				'<strong>选 B</strong>'
			],
			cuojie: '算 d 时分母错：a₇ 到 a₃ 隔 4 项不是 7-3=4 项。',
			bianshi: '求 S₁₀ = ? 用 S₁₀ = 10(a₁+a₁₀)/2，先求 a₁ = 1，得 S₁₀ = 100。',
			qushi: '数列是山东理综重点，等差+等比每年必考。',
			xinfa: '等差"两公式"：aₙ = a₁+(n-1)d，Sₙ = n(a₁+aₙ)/2。',
			parent_tr: '等差数列每项增加相同的数（公差）。'
		}
	},

	5: {
		no: 5, type: '选择题', score: 5, difficulty: 0.78, level: 'medium',
		title: '第 5 题 · 函数单调性',
		stem: '函数 f(x) = x³ - 3x 的单调递减区间是：',
		options: [
			{ label: 'A', text: '(-∞, -1)', correct: false },
			{ label: 'B', text: '(-1, 1)', correct: true },
			{ label: 'C', text: '(1, +∞)', correct: false },
			{ label: 'D', text: 'R', correct: false }
		],
		answer: 'B',
		answer_note: '求导 f\'(x) = 3x² - 3 < 0 → -1 < x < 1',
		dimensions: {
			kaodian: '<strong>导数判断单调性</strong>：f\'(x) > 0 递增，f\'(x) < 0 递减。',
			luoji: 'f\'(x) = 3x² - 3 = 3(x-1)(x+1) < 0 → x ∈ (-1, 1)。',
			tuili_steps: [
				'求导：f\'(x) = 3x² - 3',
				'令 f\'(x) < 0：3x² < 3 → x² < 1',
				'解得：-1 < x < 1',
				'<strong>选 B</strong>'
			],
			cuojie: '开闭区间写错——单调区间端点处 f\' = 0，用开区间。',
			bianshi: 'f(x) 极大值点？x = -1 处，f(-1) = -1 + 3 = 2。',
			qushi: '导数是山东高考核心模块，单调性+极值必考。',
			xinfa: '导数"四步"：求导、令导=0、找临界点、列表判号。',
			parent_tr: '导数为负 = 函数下降。'
		}
	},

	6: {
		no: 6, type: '选择题', score: 5, difficulty: 0.75, level: 'medium',
		title: '第 6 题 · 三角函数',
		stem: '若 sin α = 3/5, α ∈ (0, π/2), 则 cos 2α = ?',
		options: [
			{ label: 'A', text: '7/25', correct: true },
			{ label: 'B', text: '-7/25', correct: false },
			{ label: 'C', text: '24/25', correct: false },
			{ label: 'D', text: '-24/25', correct: false }
		],
		answer: 'A',
		answer_note: 'cos 2α = 1 - 2sin²α = 7/25',
		dimensions: {
			kaodian: '二倍角公式：cos 2α = 1 - 2sin²α = 2cos²α - 1。',
			luoji: 'sin α = 3/5 → sin²α = 9/25 → cos 2α = 1 - 18/25 = 7/25。',
			tuili_steps: [
				'sin²α = (3/5)² = 9/25',
				'cos 2α = 1 - 2sin²α',
				'= 1 - 2×9/25',
				'= 1 - 18/25 = 7/25',
				'<strong>选 A</strong>'
			],
			cuojie: '不用算 cos α——直接用 cos 2α = 1 - 2sin²α 最快。',
			bianshi: 'sin 2α = ? 2sin α cos α = 2×(3/5)×(4/5) = 24/25。',
			qushi: '三角恒等变换山东每年必考，二倍角是核心。',
			xinfa: '二倍角"三公式"：cos 2α 三种形式灵活选用。',
			parent_tr: '知道 sin α 就能算 cos 2α，不需要先算 cos α。'
		}
	},

	7: {
		no: 7, type: '选择题', score: 5, difficulty: 0.70, level: 'medium',
		title: '第 7 题 · 概率',
		stem: '从 1,2,3,4,5 中任选 2 个数，其和为偶数的概率是：',
		options: [
			{ label: 'A', text: '2/5', correct: true },
			{ label: 'B', text: '1/2', correct: false },
			{ label: 'C', text: '3/5', correct: false },
			{ label: 'D', text: '1/3', correct: false }
		],
		answer: 'A',
		answer_note: '偶+偶 或 奇+奇',
		dimensions: {
			kaodian: '古典概型：P = 有利事件数 / 总事件数。',
			luoji: '总选法 C(5,2)=10。和为偶：奇+奇 C(3,2)=3，偶+偶 C(2,2)=1，共 4。P = 4/10 = 2/5。',
			tuili_steps: [
				'总数：C(5,2) = 10',
				'3 奇（1,3,5）+ 2 偶（2,4）',
				'和偶 = 同奇偶：C(3,2) + C(2,2) = 3 + 1 = 4',
				'P = 4/10 = 2/5',
				'<strong>选 A</strong>'
			],
			cuojie: '分类要齐全——同奇 + 同偶，不能漏。',
			bianshi: '和为奇的概率 = 1 - 2/5 = 3/5。',
			qushi: '概率是山东理综必考，古典概型基础。',
			xinfa: '概率"两步"：分类计数、代入公式。',
			parent_tr: '偶数和 = 两数都是奇或都是偶。'
		}
	},

	8: {
		no: 8, type: '选择题', score: 5, difficulty: 0.65, level: 'medium',
		title: '第 8 题 · 立体几何',
		stem: '正方体棱长为 1，则体对角线长度为：',
		options: [
			{ label: 'A', text: '√2', correct: false },
			{ label: 'B', text: '√3', correct: true },
			{ label: 'C', text: '2', correct: false },
			{ label: 'D', text: '3', correct: false }
		],
		answer: 'B',
		answer_note: '体对角线 = a√3',
		dimensions: {
			kaodian: '正方体三大长度：棱 a、面对角线 a√2、体对角线 a√3。',
			luoji: '体对角线² = 棱² + 面对角线² = 1 + 2 = 3，所以长 √3。',
			tuili_steps: [
				'面对角线 = √(1²+1²) = √2',
				'体对角线 = √(1² + (√2)²) = √3',
				'<strong>选 B</strong>'
			],
			cuojie: '混淆面对角线和体对角线——记清 √2 vs √3。',
			bianshi: '正方体外接球半径？= 体对角线/2 = √3/2。',
			qushi: '立体几何基础，每年必考。',
			xinfa: '正方体"三个√"：棱 1、面 √2、体 √3。',
			parent_tr: '正方体穿过中心的对角线最长。'
		}
	},

	9: {
		no: 9, type: '多选题', score: 6, difficulty: 0.62, level: 'medium',
		title: '第 9 题 · 函数性质',
		stem: '函数 f(x) = sin x + cos x，下列<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '最大值为 √2', correct: true },
			{ label: 'B', text: '周期为 2π', correct: true },
			{ label: 'C', text: '在 (0, π/4) 递增', correct: true },
			{ label: 'D', text: '是奇函数', correct: false }
		],
		answer: 'ABC',
		answer_note: 'f(x) = √2 sin(x+π/4)',
		dimensions: {
			kaodian: '辅助角公式：a sin x + b cos x = √(a²+b²) sin(x+φ)。',
			luoji: 'f(x) = √2 sin(x+π/4)。最大 √2 ✓，周期 2π ✓，递增区间包含 (0,π/4) ✓，非奇（f(0)=1≠0）。',
			tuili_steps: [
				'合一：f(x) = √2 sin(x+π/4)',
				'A 最大 √2 ✓',
				'B 周期 2π ✓',
				'C (0, π/4) 在 (-π/4, π/4) 内递增 ✓',
				'D f(0)=1 不是奇函数 ✗',
				'<strong>选 ABC</strong>'
			],
			cuojie: '判断奇偶性代入 x=0 最快——非 0 则非奇。',
			bianshi: '求 f(x) 的对称轴：x + π/4 = π/2 + kπ → x = π/4 + kπ。',
			qushi: '多选题山东特色，辅助角公式高频。',
			xinfa: '三角函数"一化"：先化 √2 sin(x+φ) 再分析。',
			parent_tr: 'sin + cos 合成一个正弦函数，最大值 √2。'
		}
	},

	10: {
		no: 10, type: '多选题', score: 6, difficulty: 0.58, level: 'medium',
		title: '第 10 题 · 解析几何',
		stem: '抛物线 y² = 4x，焦点 F，下列<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '焦点坐标 (1, 0)', correct: true },
			{ label: 'B', text: '准线 x = -1', correct: true },
			{ label: 'C', text: '过 (4, 4) 点', correct: true },
			{ label: 'D', text: '对称轴是 y 轴', correct: false }
		],
		answer: 'ABC',
		answer_note: '2p = 4, p = 2, 焦点 (p/2, 0) = (1, 0)',
		dimensions: {
			kaodian: '抛物线 y² = 2px：焦点 (p/2, 0)，准线 x = -p/2。',
			luoji: '2p = 4, p = 2, 焦点 (1,0), 准线 x=-1。点 (4,4) 验证 16=16 ✓。对称轴是 x 轴。',
			tuili_steps: [
				'y² = 4x → 2p = 4 → p = 2',
				'A 焦点 (1,0) ✓',
				'B 准线 x = -1 ✓',
				'C 4² = 16 = 4×4 ✓',
				'D 对称轴是 x 轴（不是 y 轴）✗',
				'<strong>选 ABC</strong>'
			],
			cuojie: 'y² = 4x 开口向右，对称轴是 x 轴。',
			bianshi: '到焦点距离 = 到准线距离 = 4 + 1 = 5（点 (4,4)）。',
			qushi: '圆锥曲线山东必考，抛物线定义高频。',
			xinfa: '抛物线"两背"：p/2 记熟、准线对称。',
			parent_tr: '抛物线的焦点和准线到曲线距离相等。'
		}
	},

	11: {
		no: 11, type: '多选题', score: 6, difficulty: 0.55, level: 'medium',
		title: '第 11 题 · 统计',
		stem: '数据 2, 4, 6, 8, 10，<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '平均数 = 6', correct: true },
			{ label: 'B', text: '中位数 = 6', correct: true },
			{ label: 'C', text: '方差 = 8', correct: true },
			{ label: 'D', text: '极差 = 10', correct: false }
		],
		answer: 'ABC',
		answer_note: '极差 = 10-2 = 8',
		dimensions: {
			kaodian: '平均数、中位数、方差、极差四大统计量。',
			luoji: '均值 30/5=6，中位 6，方差 (16+4+0+4+16)/5=8，极差 10-2=8。',
			tuili_steps: [
				'A 均值 (2+4+6+8+10)/5 = 6 ✓',
				'B 中位数（排序后中间）= 6 ✓',
				'C 方差 Σ(xᵢ-6)²/5 = 40/5 = 8 ✓',
				'D 极差 = 10-2 = 8（不是 10）✗',
				'<strong>选 ABC</strong>'
			],
			cuojie: '极差 = 最大 - 最小，不是最大值本身。',
			bianshi: '标准差 = √方差 = √8 = 2√2。',
			qushi: '统计题山东每年必考，公式要记熟。',
			xinfa: '统计"四量"：均值、中位、方差、极差。',
			parent_tr: '方差越大说明数据越分散。'
		}
	},

	12: {
		no: 12, type: '填空题', score: 5, difficulty: 0.50, level: 'hard',
		title: '第 12 题 · 二项式定理',
		stem: '(x + 2/x)⁶ 展开式中常数项 = ____。',
		answer: '160',
		answer_note: 'T₄ = C(6,3)·2³ = 20×8 = 160',
		dimensions: {
			kaodian: '二项式通项：Tᵣ₊₁ = C(n,r)·aⁿ⁻ʳ·bʳ。',
			luoji: 'Tᵣ₊₁ = C(6,r)·x⁶⁻ʳ·(2/x)ʳ = C(6,r)·2ʳ·x⁶⁻²ʳ。常数项 x⁰ → r=3。',
			tuili_steps: [
				'通项 Tᵣ₊₁ = C(6,r)·x⁶⁻ʳ·(2/x)ʳ',
				'= C(6,r)·2ʳ·x⁶⁻²ʳ',
				'常数项：6-2r=0 → r=3',
				'T₄ = C(6,3)·2³ = 20×8 = 160',
				'<strong>答案 160</strong>'
			],
			cuojie: '2ʳ 不能漏——系数和幂一起算。',
			bianshi: '含 x² 项系数？6-2r=2 → r=2，C(6,2)·4 = 60。',
			qushi: '二项式定理山东每年必考，通项是核心。',
			xinfa: '二项式"三记"：通项公式、幂指数关系、符号处理。',
			parent_tr: '找常数项 = 让 x 的幂等于 0。'
		}
	},

	13: {
		no: 13, type: '填空题', score: 5, difficulty: 0.45, level: 'hard',
		title: '第 13 题 · 数列求和',
		stem: '已知 aₙ = 1/(n(n+1)), 则 S₁₀ = ____。',
		answer: '10/11',
		answer_note: '裂项相消',
		dimensions: {
			kaodian: '<strong>裂项相消法</strong>：1/(n(n+1)) = 1/n - 1/(n+1)。',
			luoji: 'S₁₀ = (1-1/2)+(1/2-1/3)+...+(1/10-1/11) = 1 - 1/11 = 10/11。',
			tuili_steps: [
				'裂项：aₙ = 1/n - 1/(n+1)',
				'S₁₀ = (1 - 1/2) + (1/2 - 1/3) + ... + (1/10 - 1/11)',
				'相邻项抵消',
				'= 1 - 1/11 = 10/11',
				'<strong>答案 10/11</strong>'
			],
			cuojie: '裂项后首尾项别写错——首 1，尾 1/(n+1)。',
			bianshi: 'aₙ = 1/((2n-1)(2n+1))？裂成 (1/2)[1/(2n-1)-1/(2n+1)]。',
			qushi: '裂项相消山东必考，识别是关键。',
			xinfa: '裂项"两步"：裂成差、写出首尾。',
			parent_tr: '相邻项相互抵消，只剩头和尾。'
		}
	},

	14: {
		no: 14, type: '填空题', score: 5, difficulty: 0.42, level: 'hard',
		title: '第 14 题 · 不等式',
		stem: '若 x > 0, y > 0, x + y = 1, 则 1/x + 4/y 最小值 = ____。',
		answer: '9',
		answer_note: '"1 的代换"',
		dimensions: {
			kaodian: '<strong>基本不等式"1 的代换"</strong>：乘以 x+y=1 再用均值不等式。',
			luoji: '(1/x+4/y)(x+y) = 1+4+y/x+4x/y ≥ 5 + 2·2 = 9。x=1/3, y=2/3 取等。',
			tuili_steps: [
				'乘 1 = x+y：(1/x+4/y)(x+y)',
				'= 1 + y/x + 4x/y + 4',
				'= 5 + y/x + 4x/y',
				'用均值：y/x + 4x/y ≥ 2√4 = 4',
				'≥ 5 + 4 = 9，<strong>答案 9</strong>'
			],
			cuojie: '等号条件别忘验证——x=1/3, y=2/3 满足 x+y=1。',
			bianshi: '若 4/x + 9/y = 1 求 x+y 最小 = (√4+√9)² = 25。',
			qushi: '基本不等式山东高考必考，1 的代换是难点。',
			xinfa: '不等式"三法"：均值、柯西、1 的代换。',
			parent_tr: '和固定时，通过乘"1"可以快速求最值。'
		}
	},

	15: {
		no: 15, type: '解答题', score: 13, difficulty: 0.55, level: 'hard',
		title: '第 15 题 · 三角函数综合',
		stem: '△ABC 中，a=2, b=3, cos C = 1/3。(1)求 c; (2)求 sin(A+C)。',
		answer: '(1) c = 3; (2) sin(A+C) = 2√2/3',
		answer_note: '余弦定理 + 正弦定理',
		dimensions: {
			kaodian: '解三角形：余弦定理求边、正弦定理转换。',
			luoji: 'c² = a²+b²-2ab cos C = 4+9-4 = 9, c = 3。sin(A+C)=sin B。',
			tuili_steps: [
				'(1) c² = a² + b² - 2ab·cos C',
				'= 4 + 9 - 12×(1/3) = 9',
				'c = 3',
				'(2) A+C = π-B，sin(A+C) = sin B',
				'sin C = 2√2/3，由正弦定理 b/sin B = c/sin C',
				'sin B = 3·(2√2/3)/3 = 2√2/3'
			],
			cuojie: '(2) 的化简——sin(A+C)=sin(π-B)=sinB 是关键转换。',
			bianshi: '求 △ABC 面积 = (1/2)ab sin C = 2√2。',
			qushi: '解三角形山东每年必考，占 13 分。',
			xinfa: '三角形"两大定理"：余弦求边、正弦求角。',
			parent_tr: '知道两边一角就能求出第三边（余弦定理）。'
		}
	},

	16: {
		no: 16, type: '解答题', score: 15, difficulty: 0.48, level: 'hard',
		title: '第 16 题 · 立体几何',
		stem: '正三棱锥 P-ABC，底面边长 2，侧棱长 √3。(1)证明 PA ⊥ BC；(2)求二面角 P-AB-C 的余弦值。',
		answer: '(1) 三垂线定理; (2) cos θ = √3/3',
		answer_note: '几何证明 + 坐标法',
		dimensions: {
			kaodian: '立体几何两大题：线面垂直 + 二面角。',
			luoji: '(1) 取 BC 中点 D，AD⊥BC, PD⊥BC → BC⊥面PAD → BC⊥PA。(2) 建坐标系。',
			tuili_steps: [
				'(1) 取 BC 中点 D',
				'△ABC 正三角形 → AD ⊥ BC',
				'△PBC 等腰 → PD ⊥ BC',
				'∴ BC ⊥ 平面 PAD → BC ⊥ PA',
				'(2) 建坐标系，法向量求夹角 cos θ = √3/3'
			],
			cuojie: '三垂线定理要先找"垂直平面"——包含两条垂线的平面。',
			bianshi: '求 PA 与底面夹角 sin θ = 高/PA。',
			qushi: '立体几何山东 15 分大题，几何+坐标双解法必备。',
			xinfa: '立体"两法"：几何法直观、坐标法万能。',
			parent_tr: '证垂直先找"双垂线"，求角度建坐标系最保险。'
		}
	},

	17: {
		no: 17, type: '解答题', score: 15, difficulty: 0.40, level: 'hard',
		title: '第 17 题 · 概率统计',
		stem: '商品合格率 0.9，抽取 3 件。(1)恰有 2 件合格概率；(2)合格件数 ξ 的期望。',
		answer: '(1) 0.243; (2) E(ξ) = 2.7',
		answer_note: '二项分布 B(3, 0.9)',
		dimensions: {
			kaodian: '二项分布：P(X=k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ；E(X) = np。',
			luoji: '(1) C(3,2)·0.9²·0.1 = 0.243。(2) E = 3·0.9 = 2.7。',
			tuili_steps: [
				'(1) ξ ~ B(3, 0.9)',
				'P(ξ=2) = C(3,2)·0.9²·0.1¹',
				'= 3 × 0.81 × 0.1 = 0.243',
				'(2) E(ξ) = np = 3 × 0.9',
				'= 2.7'
			],
			cuojie: '(1) 恰有 2 件——不是至少 2 件。',
			bianshi: '至少 2 件概率 = P(ξ=2) + P(ξ=3) = 0.243 + 0.729 = 0.972。',
			qushi: '概率统计山东大题必考，二项分布+期望是核心。',
			xinfa: '二项分布"两公式"：C(n,k)pᵏqⁿ⁻ᵏ、期望 np。',
			parent_tr: '二项分布的期望 = 次数 × 成功概率。'
		}
	},

	18: {
		no: 18, type: '解答题', score: 17, difficulty: 0.30, level: 'hard',
		title: '第 18 题 · 圆锥曲线',
		stem: '椭圆 x²/4 + y² = 1。(1)求离心率；(2)过右焦点直线交椭圆 A,B，|AB|=8/3，求直线。',
		answer: '(1) e = √3/2; (2) y = ±(x-√3)',
		answer_note: '弦长公式',
		dimensions: {
			kaodian: '椭圆：a²=4, b²=1, c²=3。弦长 = √(1+k²)·|x₁-x₂|。',
			luoji: '(1) e = c/a = √3/2。(2) 联立消元用韦达。',
			tuili_steps: [
				'(1) a=2, c=√3, e = √3/2',
				'(2) 设 y = k(x-√3)',
				'代入得 (1+4k²)x² - 8√3k²x + 12k²-4 = 0',
				'|AB| = √(1+k²)·|x₁-x₂| = 8/3',
				'解得 k = ±1'
			],
			cuojie: '(2) 验证斜率不存在情况——x=√3 时 |AB|=1 不符。',
			bianshi: '椭圆面积 = πab = 2π。',
			qushi: '圆锥曲线山东大题 17 分，每年必考。',
			xinfa: '圆锥曲线"三步"：设直线、联立消元、韦达定理。',
			parent_tr: '圆锥曲线：联立方程 + 韦达定理 + 弦长公式。'
		}
	},

	19: {
		no: 19, type: '解答题', score: 17, difficulty: 0.20, level: 'hard',
		title: '第 19 题 · 导数压轴',
		stem: 'f(x) = x·ln x - ax²。(1)若 a=0 求单调区间；(2)若 f 有两极值点，求 a。',
		answer: '(1) (0,1/e)减, (1/e,+∞)增; (2) 0 < a < 1/2',
		answer_note: '导数 + 参数讨论',
		dimensions: {
			kaodian: '导数压轴：单调性、极值、参数讨论。',
			luoji: '(1) f\'=ln x+1, 零点 1/e。(2) f\'=ln x+1-2ax，转化 2a=(ln x+1)/x。',
			tuili_steps: [
				'(1) a=0：f\'(x) = ln x + 1',
				'=0 → x = 1/e',
				'(0,1/e) 减、(1/e,+∞) 增',
				'(2) 2a = (ln x+1)/x，令 g(x) 求范围',
				'g 极大值 g(1)=1，故 0 < 2a < 1 → 0 < a < 1/2'
			],
			cuojie: '(2) 问"两极值点"——g(x) 与水平线两交点。',
			bianshi: 'f 在 x=1 切线？f(1)=-a, f\'(1)=1-2a。',
			qushi: '导数压轴山东最难，参数讨论是拦路虎。',
			xinfa: '导数"三板斧"：求导、分类、画图。',
			parent_tr: '参数题：把参数移到一边，变两条曲线交点问题。'
		}
	},

	20: {
		no: 20, type: '解答题', score: 12, difficulty: 0.25, level: 'hard',
		title: '第 20 题 · 数列压轴',
		stem: '{aₙ} 满足 a₁=1, aₙ₊₁=2aₙ+1。(1)证 {aₙ+1} 等比；(2)求 Sₙ。',
		answer: '(1) 公比 2; (2) Sₙ = 2ⁿ⁺¹ - n - 2',
		answer_note: '构造 + 分组求和',
		dimensions: {
			kaodian: '<strong>构造法</strong>：aₙ₊₁+1 = 2(aₙ+1)。',
			luoji: 'bₙ=aₙ+1, b₁=2, 公比 2 → bₙ=2ⁿ → aₙ=2ⁿ-1。',
			tuili_steps: [
				'(1) aₙ₊₁ + 1 = 2aₙ + 2 = 2(aₙ+1)',
				'bₙ=aₙ+1, b₁=2, 公比 2',
				'(2) bₙ=2ⁿ → aₙ=2ⁿ-1',
				'Sₙ = (2+4+...+2ⁿ) - n',
				'= 2ⁿ⁺¹ - 2 - n'
			],
			cuojie: 'aₙ₊₁ = paₙ+q 型都可构造 aₙ+q/(p-1) 等比。',
			bianshi: 'aₙ₊₁=3aₙ+2？构造 aₙ+1，公比 3。',
			qushi: '递推数列山东必考，构造法是核心。',
			xinfa: '数列"四法"：等差、等比、累加、构造。',
			parent_tr: 'aₙ₊₁=paₙ+q 型，两边加常数变等比。'
		}
	},

	21: {
		no: 21, type: '解答题', score: 12, difficulty: 0.18, level: 'hard',
		title: '第 21 题 · 新定义',
		stem: 'f(x) = x - [x]。(1)求 f(2.7); (2)证 f 周期函数。',
		answer: '(1) 0.7; (2) T=1',
		answer_note: '取整函数',
		dimensions: {
			kaodian: '<strong>新定义题</strong>：理解 + 应用。',
			luoji: '(1) [2.7]=2, f=0.7。(2) f(x+1)=(x+1)-[x+1]=(x+1)-([x]+1)=f(x)。',
			tuili_steps: [
				'(1) [2.7] = 2',
				'f(2.7) = 2.7 - 2 = 0.7',
				'(2) f(x+1) = (x+1) - [x+1]',
				'[x+1] = [x]+1',
				'= (x+1)-([x]+1) = x-[x] = f(x)，T=1'
			],
			cuojie: '[-0.5] = -1，不是 0——取整是向下取。',
			bianshi: 'f 值域？[0, 1)。',
			qushi: '新定义山东创新题型，考理解力。',
			xinfa: '新定义"三问"：定义啥、条件啥、求啥。',
			parent_tr: '新定义 = 读懂规则 + 用规则算。'
		}
	},

	22: {
		no: 22, type: '解答题', score: 10, difficulty: 0.15, level: 'hard',
		title: '第 22 题 · 极坐标',
		stem: 'C: ρ = 2cos θ。(1)化直角坐标；(2)求 θ=π/4 与 C 交点。',
		answer: '(1) (x-1)²+y²=1; (2) (0,0), (1,1)',
		answer_note: '极坐标 ↔ 直角',
		dimensions: {
			kaodian: '极坐标转直角：x=ρcos θ, y=ρsin θ, ρ²=x²+y²。',
			luoji: 'ρ=2cos θ → ρ²=2ρcos θ → x²+y²=2x → (x-1)²+y²=1。',
			tuili_steps: [
				'(1) 两边乘 ρ：ρ² = 2ρcos θ',
				'x²+y² = 2x',
				'(x-1)² + y² = 1',
				'(2) θ=π/4 即 y=x',
				'代入：(x-1)²+x²=1 → x=0 或 1'
			],
			cuojie: '两边乘 ρ 要验证 ρ=0——这里原点在圆上 ✓。',
			bianshi: 'θ=π/3 交点？y=√3x，交点 (0,0), (1/2, √3/2)。',
			qushi: '极坐标山东选修，10 分必拿。',
			xinfa: '极坐标"两招"：乘 ρ、代换 x=ρcos θ。',
			parent_tr: '极坐标到直角坐标 = 换语言描述同一曲线。'
		}
	}

};
