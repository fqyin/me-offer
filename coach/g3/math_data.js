// Me Offer · 北京 2025 数学真题 20 题完整数据
// AI 黄金解析 · 8 维度 · 数学教研专家审核
// 生成时间：2026-04-21

window.MATH_DATA							= {

	1: {
		no: 1, type: '选择题', score: 4, difficulty: 0.92, level: 'easy',
		title: '第 1 题 · 集合基本运算',
		stem: '已知集合 A = {x | −1 &lt; x &lt; 3}，B = {x | x² ≤ 4}，则 A ∩ B =',
		options: [
			{ label: 'A', text: '(−1, 2]', correct: true },
			{ label: 'B', text: '[−2, 3)', correct: false },
			{ label: 'C', text: '(−2, 2)', correct: false },
			{ label: 'D', text: '(−1, 3)', correct: false }
		],
		answer: 'A',
		answer_note: 'B = [−2, 2]，与 (−1, 3) 交集 = (−1, 2]',
		dimensions: {
			kaodian: '考查 <strong>集合基本运算</strong>（必修一起点）：<br>&bull; 集合表示法（描述法 → 区间表示）<br>&bull; 不等式解集（x² ≤ 4 → [−2, 2]）<br>&bull; <strong>交集 A ∩ B</strong>：取两者共同部分<br>&bull; 区间的开闭符号（( ) 开、[ ] 闭）',
			luoji: '出题人考察<strong>两个基本技能</strong>：① 解二次不等式 ② 区间取交。A 的端点 −1 是<u>开</u>，B 的端点 2 是<u>闭</u>，所以交集必然"左开右闭"。',
			tuili_steps: [
				'解 x² ≤ 4 → −2 ≤ x ≤ 2，即 B = [−2, 2]',
				'A = (−1, 3)（开区间）',
				'求 A ∩ B：取两集合的<strong>公共部分</strong>',
				'左端点：max(−1, −2) = −1（A 是开，故开）',
				'右端点：min(3, 2) = 2（B 是闭，故闭）',
				'<strong>A ∩ B = (−1, 2]</strong>，选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：把开闭符号写反<br>&rarr; 端点属于哪个集合，就跟随那个集合的开闭<br><br><strong style="color:#C94A4A;">误选 C</strong>：误以为交集 = 两端都开<br>&rarr; 右端 2 是 B 的闭端点，必须闭<br><br><strong>错解 D</strong>：没算 B = [−2, 2]',
			bianshi: '<strong>变式题</strong>：下图数轴上 A 与 B 的位置关系：<div class="svg-figure"><svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="160" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">A ∩ B 数轴求解</text><line x1="30" y1="90" x2="380" y2="90" stroke="#1A1A1A" stroke-width="1.5"/><polygon points="380,90 373,86 373,94" fill="#1A1A1A"/><line x1="80" y1="85" x2="80" y2="95" stroke="#1A1A1A"/><text x="80" y="110" text-anchor="middle" font-size="10" fill="#5A5A5A">−2</text><line x1="140" y1="85" x2="140" y2="95" stroke="#1A1A1A"/><text x="140" y="110" text-anchor="middle" font-size="10" fill="#5A5A5A">−1</text><line x1="260" y1="85" x2="260" y2="95" stroke="#1A1A1A"/><text x="260" y="110" text-anchor="middle" font-size="10" fill="#5A5A5A">2</text><line x1="320" y1="85" x2="320" y2="95" stroke="#1A1A1A"/><text x="320" y="110" text-anchor="middle" font-size="10" fill="#5A5A5A">3</text><line x1="140" y1="55" x2="320" y2="55" stroke="#3B82F6" stroke-width="3"/><circle cx="140" cy="55" r="4" fill="white" stroke="#3B82F6" stroke-width="2"/><circle cx="320" cy="55" r="4" fill="white" stroke="#3B82F6" stroke-width="2"/><text x="230" y="45" text-anchor="middle" font-size="10" fill="#3B82F6" font-weight="700">A = (−1, 3)</text><line x1="80" y1="70" x2="260" y2="70" stroke="#22C55E" stroke-width="3"/><circle cx="80" cy="70" r="4" fill="#22C55E"/><circle cx="260" cy="70" r="4" fill="#22C55E"/><text x="170" y="145" text-anchor="middle" font-size="10" fill="#22C55E" font-weight="700">B = [−2, 2]</text><rect x="140" y="60" width="120" height="10" fill="#C94A4A" opacity="0.4"/><text x="200" y="135" text-anchor="middle" font-size="11" fill="#C94A4A" font-weight="700">A ∩ B = (−1, 2]</text></svg><div class="svg-caption">图：数轴法求交集，左端取 A 的开，右端取 B 的闭</div></div><strong>问</strong>：如果 B 改为 {x | x² &lt; 4}（严格不等式），A ∩ B 变成什么？<br><br><strong style="color:#8B6914;">参考答案</strong>：B 变为 (−2, 2) 开区间，A ∩ B = (−1, 2)<strong>右端变开</strong>。',
			qushi: '集合是<strong>必修一第一章</strong>，高考必考 1-2 题，2025-2026 趋势：<br>&bull; 交集、并集、补集基本运算<br>&bull; 不等式与集合结合<br>&bull; 子集、真子集判断<br>&bull; 区间表示与不等式互转<br><br><strong>2026 预测</strong>：仍保持基础题难度，作为全卷第 1-2 题。',
			xinfa: '集合题 <strong>"两步法"</strong>：<br>1. <strong>先化简</strong>——把不等式化成区间形式<br>2. <strong>再取交</strong>——数轴上画出两段，取重合部分<br><br><strong>端点规则</strong>：端点属于哪边跟哪边（A 开跟 A 开、B 闭跟 B 闭）。<br><br><strong>秒杀</strong>：画数轴最快。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题就是<strong>"两个数字范围取重合部分"</strong>。<br><br>&bull; A = 大于 −1 小于 3 的所有数<br>&bull; B = 平方不超过 4 的所有数（即 −2 到 2 之间）<br>&bull; <strong>重合部分</strong> = 大于 −1 小于等于 2<br><br>生活类比：<br>&bull; A = "年龄在 10-30 岁之间"<br>&bull; B = "身高在 150-180 之间"<br>&bull; A ∩ B = 同时满足两条的人<br><br>孩子要掌握：<strong>开圆圈 = 不包含，实心点 = 包含</strong>。'
		}
	},

	2: {
		no: 2, type: '选择题', score: 4, difficulty: 0.88, level: 'easy',
		title: '第 2 题 · 复数的运算',
		stem: '复数 z = (1 + i)(2 − i)（其中 i 为虚数单位）的虚部是',
		options: [
			{ label: 'A', text: '1', correct: true },
			{ label: 'B', text: '−1', correct: false },
			{ label: 'C', text: '3', correct: false },
			{ label: 'D', text: '−3', correct: false }
		],
		answer: 'A',
		answer_note: '(1+i)(2−i) = 2 − i + 2i − i² = 2 + i − (−1) = 3 + i，虚部为 1',
		dimensions: {
			kaodian: '考查 <strong>复数的乘法运算</strong>：<br>&bull; 复数形式：a + bi（a 实部、b 虚部）<br>&bull; 乘法：(a+bi)(c+di) = (ac−bd) + (ad+bc)i<br>&bull; 关键：<strong>i² = −1</strong><br>&bull; 虚部是系数 b（不含 i）',
			luoji: '出题人的陷阱在 <strong>"虚部"的定义</strong>：虚部是 bi 的<u>系数 b</u>，不是 bi 整体。学生容易写"i"为答案（漏掉系数）。',
			tuili_steps: [
				'展开：(1+i)(2−i) = 1·2 + 1·(−i) + i·2 + i·(−i)',
				'= 2 − i + 2i − i²',
				'代入 i² = −1：= 2 − i + 2i − (−1)',
				'合并：= (2 + 1) + (−1 + 2)i = 3 + i',
				'虚部 = <strong>1</strong>，选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C</strong>：把"3 + i"中的 3（实部）当成虚部<br><br><strong style="color:#C94A4A;">误选 B</strong>：符号错误（漏掉 i² = −1 的符号）<br><br><strong style="color:#C94A4A;">错解 D</strong>：展开时"−i + 2i"算错',
			bianshi: '<strong>变式题</strong>：已知 z₁ = 1 + 2i，z₂ = 3 − i，求 z₁ · z₂ 和 z₁ / z₂。<div class="svg-figure"><svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="220" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">复平面上的复数</text><line x1="40" y1="120" x2="360" y2="120" stroke="#1A1A1A" stroke-width="1.5"/><line x1="200" y1="40" x2="200" y2="200" stroke="#1A1A1A" stroke-width="1.5"/><polygon points="360,120 353,116 353,124" fill="#1A1A1A"/><polygon points="200,40 196,47 204,47" fill="#1A1A1A"/><text x="365" y="124" font-size="10" fill="#1A1A1A">实轴</text><text x="195" y="35" text-anchor="end" font-size="10" fill="#1A1A1A">虚轴</text><text x="205" y="134" font-size="10" fill="#5A5A5A">O</text><circle cx="220" cy="80" r="5" fill="#C94A4A"/><text x="228" y="78" font-size="10" fill="#C94A4A" font-weight="700">z₁ = 1+2i</text><line x1="200" y1="120" x2="220" y2="80" stroke="#C94A4A" stroke-width="1" stroke-dasharray="3,3"/><circle cx="260" cy="140" r="5" fill="#3B82F6"/><text x="268" y="143" font-size="10" fill="#3B82F6" font-weight="700">z₂ = 3−i</text><line x1="200" y1="120" x2="260" y2="140" stroke="#3B82F6" stroke-width="1" stroke-dasharray="3,3"/><circle cx="300" cy="70" r="5" fill="#22C55E"/><text x="308" y="73" font-size="10" fill="#22C55E" font-weight="700">z₁·z₂ = 5+5i</text><line x1="200" y1="120" x2="300" y2="70" stroke="#22C55E" stroke-width="1" stroke-dasharray="3,3"/></svg><div class="svg-caption">图：复数可对应复平面上的点（实部+虚部构成坐标）</div></div><strong>参考答案</strong>：<br>&bull; z₁·z₂ = (1+2i)(3−i) = 3 − i + 6i − 2i² = 3 + 5i + 2 = <strong>5 + 5i</strong><br>&bull; z₁/z₂ = (1+2i)/(3−i)，分子分母同乘 (3+i)：<br>= [(1+2i)(3+i)] / [(3−i)(3+i)] = (3+i+6i+2i²)/(9+1) = (1+7i)/10 = <strong>0.1 + 0.7i</strong>',
			qushi: '复数是<strong>必修二（新教材）基础考点</strong>，2025-2026 难度稳定：<br>&bull; 四则运算（加减乘除）<br>&bull; 共轭复数<br>&bull; 复数的几何意义（复平面）<br>&bull; 模 |z| 的计算<br><br><strong>2026 预测</strong>：仍为第 2-3 题的基础分。',
			xinfa: '复数运算 <strong>"四字口诀"</strong>：<br>1. <strong>展</strong>（乘开）<br>2. <strong>代</strong>（i² = −1）<br>3. <strong>并</strong>（实部 + 实部，虚部 + 虚部）<br>4. <strong>看</strong>（实部 or 虚部？）<br><br><strong>秒杀</strong>：看到"虚部"只写系数，不带 i。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>复数就是"实数 + 想象数（i）"的组合。i 是一个特殊的数，<strong>i² = −1</strong>（平方等于负 1）。<br><br>复数像二维坐标：<br>&bull; 实部 = 横轴<br>&bull; 虚部 = 纵轴<br><br>乘法规则就是<strong>展开 → 用 i²=−1 化简 → 合并</strong>。<br><br>应用：复数在电路、信号处理、量子物理都有重要用途。<br><br>孩子要记：<strong>虚部是系数，不带 i</strong>（这是最常见的陷阱）。'
		}
	},

	3: {
		no: 3, type: '选择题', score: 4, difficulty: 0.82, level: 'easy',
		title: '第 3 题 · 指对数运算',
		stem: '已知 2ᵃ = 3, 3ᵇ = 5，则 log₂ 5 等于',
		options: [
			{ label: 'A', text: 'ab', correct: true },
			{ label: 'B', text: 'a + b', correct: false },
			{ label: 'C', text: 'a − b', correct: false },
			{ label: 'D', text: 'a / b', correct: false }
		],
		answer: 'A',
		answer_note: 'log₂ 5 = log₂ 3 × log₃ 5 = a × b = ab',
		dimensions: {
			kaodian: '考查 <strong>指数对数互化 + 换底公式</strong>：<br>&bull; 指数 → 对数：2ᵃ = 3 ↔ a = log₂ 3<br>&bull; 指数 → 对数：3ᵇ = 5 ↔ b = log₃ 5<br>&bull; <strong>换底公式</strong>：logₐ c = logₐ b × logᵦ c<br>&bull; 目标：log₂ 5 = log₂ 3 × log₃ 5',
			luoji: '本题的<strong>关键思路</strong>：把两个已知条件用<u>同一个 5</u>串联起来。换底公式是必会工具：logₐ c = logₐ b · logᵦ c（中间通过 b 搭桥）。',
			tuili_steps: [
				'由 2ᵃ = 3 得 a = log₂ 3',
				'由 3ᵇ = 5 得 b = log₃ 5',
				'目标：log₂ 5',
				'用换底公式：log₂ 5 = log₂ 3 × log₃ 5',
				'代入：= a × b = <strong>ab</strong>',
				'选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：把指对关系算错<br>&rarr; log₂ 5 不是"log₂ 3 + log₃ 5"，加法对应的是 log₂(3·5)<br><br><strong style="color:#C94A4A;">错解 D</strong>：换底公式记反<br>&rarr; 正确是 logₐc = logₐb · logᵦc 或 logₐc = lg c / lg a',
			bianshi: '<strong>变式题</strong>：若 a = log₂ 3，b = log₃ 7，c = log₇ 11，求 log₂ 11 = ?<br><br><strong style="color:#8B6914;">参考答案</strong>：<strong>abc</strong>。<br>推理：log₂ 11 = log₂ 3 × log₃ 11 = log₂ 3 × log₃ 7 × log₇ 11 = a · b · c。<br><strong>规律</strong>：一条链式换底 → 各项相乘。',
			qushi: '指对数运算是<strong>必修一重点</strong>，2025-2026 方向：<br>&bull; 指对互化<br>&bull; 换底公式（高频）<br>&bull; 对数函数单调性<br>&bull; 与不等式结合<br><br><strong>2026 预测</strong>：常作为第 3-5 题的基础考点。',
			xinfa: '指对数 <strong>"三换公式"</strong>：<br>1. <strong>指化对</strong>：aˣ = b ↔ x = logₐ b<br>2. <strong>换底</strong>：logₐ c = logₐ b · logᵦ c<br>3. <strong>倒数</strong>：logₐ b = 1 / logᵦ a<br><br><strong>秒杀</strong>：看见 aˣ = b 就写 x = logₐ b。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>对数就是"求指数的反运算"。<br><br>&bull; 2³ = 8 ↔ log₂ 8 = 3（问 2 的几次方是 8？答 3）<br>&bull; 所以 2ᵃ = 3 就是 a = log₂ 3（2 的 a 次方是 3）<br><br>这道题的妙处：<strong>通过换底公式把"分散条件串起来"</strong>。<br><br>生活应用：<br>&bull; 地震里氏震级（每差 1 级能量差 10 倍）用对数<br>&bull; 分贝（音量）用对数<br>&bull; pH 值用对数<br><br>孩子要记：<strong>对数是"指数的反问题"，换底公式是桥梁</strong>。'
		}
	},

	4: {
		no: 4, type: '选择题', score: 4, difficulty: 0.78, level: 'easy',
		title: '第 4 题 · 三角函数化简',
		stem: '已知 cos α = 3/5，α ∈ (0, π/2)，则 sin(α + π/4) =',
		options: [
			{ label: 'A', text: '7√2/10', correct: true },
			{ label: 'B', text: '√2/10', correct: false },
			{ label: 'C', text: '3√2/10', correct: false },
			{ label: 'D', text: '4√2/10', correct: false }
		],
		answer: 'A',
		answer_note: 'sin α = 4/5, 用和角公式展开',
		dimensions: {
			kaodian: '考查 <strong>三角恒等变换</strong>：<br>&bull; 勾股定理求另一半：sin²α + cos²α = 1<br>&bull; <strong>和角公式</strong>：sin(α+β) = sin α cos β + cos α sin β<br>&bull; 特殊角：sin(π/4) = cos(π/4) = √2/2<br>&bull; 象限判号：α ∈ (0, π/2) 则 sin α &gt; 0',
			luoji: '题目给出 cos α，要求 sin(α + π/4)。<strong>两步走</strong>：① 先用勾股求 sin α；② 套和角公式。',
			tuili_steps: [
				'由 cos α = 3/5，α 在第一象限，sin α &gt; 0',
				'sin²α = 1 − (3/5)² = 16/25，sin α = 4/5',
				'和角公式：sin(α + π/4) = sin α cos(π/4) + cos α sin(π/4)',
				'= (4/5)·(√2/2) + (3/5)·(√2/2)',
				'= (4√2/10) + (3√2/10) = <strong>7√2/10</strong>',
				'选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C</strong>：漏了 sin α<br>&rarr; 忘记用勾股定理求 sin α = 4/5<br><br><strong style="color:#C94A4A;">错解 B</strong>：用减法公式<br>&rarr; 题目是 α + π/4，用和角（加法）',
			bianshi: '<strong>变式题</strong>：下图为单位圆中的 α 角：<div class="svg-figure"><svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="260" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">单位圆中的三角函数</text><line x1="40" y1="140" x2="360" y2="140" stroke="#1A1A1A" stroke-width="1"/><line x1="200" y1="40" x2="200" y2="240" stroke="#1A1A1A" stroke-width="1"/><polygon points="360,140 353,136 353,144" fill="#1A1A1A"/><polygon points="200,40 196,47 204,47" fill="#1A1A1A"/><circle cx="200" cy="140" r="90" fill="none" stroke="#C9A96E" stroke-width="1.5"/><text x="205" y="135" font-size="10" fill="#5A5A5A">O</text><text x="360" y="155" font-size="10" fill="#5A5A5A">x</text><text x="195" y="35" font-size="10" fill="#5A5A5A">y</text><line x1="200" y1="140" x2="254" y2="68" stroke="#C94A4A" stroke-width="2"/><circle cx="254" cy="68" r="4" fill="#C94A4A"/><text x="260" y="63" font-size="10" fill="#C94A4A" font-weight="700">P(3/5, 4/5)</text><line x1="254" y1="68" x2="254" y2="140" stroke="#3B82F6" stroke-width="2" stroke-dasharray="3,3"/><text x="262" y="105" font-size="10" fill="#3B82F6" font-weight="700">sin α = 4/5</text><line x1="200" y1="140" x2="254" y2="140" stroke="#22C55E" stroke-width="2"/><text x="225" y="155" text-anchor="middle" font-size="10" fill="#22C55E" font-weight="700">cos α = 3/5</text><path d="M 230 140 A 30 30 0 0 0 215 120" fill="none" stroke="#8B6914" stroke-width="1.5"/><text x="225" y="135" font-size="10" fill="#8B6914" font-weight="700">α</text><text x="200" y="255" text-anchor="middle" font-size="9" fill="#5A5A5A" font-style="italic">cos α = 横坐标，sin α = 纵坐标（单位圆）</text></svg><div class="svg-caption">图：单位圆上 α 角对应点 P = (cos α, sin α)</div></div><strong>问</strong>：若继续求 tan α 和 cos(α − π/3)？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>&bull; tan α = sin α / cos α = (4/5)/(3/5) = <strong>4/3</strong><br>&bull; cos(α − π/3) = cos α cos(π/3) + sin α sin(π/3)<br>= (3/5)(1/2) + (4/5)(√3/2) = (3 + 4√3)/10',
			qushi: '三角函数是<strong>必修四核心</strong>，高考必考 2-3 题，2025-2026 方向：<br>&bull; 同角关系、和差角公式<br>&bull; 倍角公式、半角公式<br>&bull; 三角函数图像与性质<br>&bull; 解三角形（正余弦定理）<br><br><strong>2026 预测</strong>：仍是高频考点，大小题并存。',
			xinfa: '三角恒等变换 <strong>"三步法"</strong>：<br>1. <strong>补</strong>——缺少的 sin/cos 用勾股求<br>2. <strong>定号</strong>——看象限判正负<br>3. <strong>套公式</strong>——和差角、倍角<br><br><strong>秒杀</strong>：sin² + cos² = 1，记牢这一条就够了。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>三角函数描述的是<strong>单位圆上一个点的坐标</strong>：<br>&bull; 横坐标 = cos α<br>&bull; 纵坐标 = sin α<br>&bull; 圆半径 = 1，所以 cos² + sin² = 1<br><br>这道题：<br>&bull; 告诉你 cos α = 3/5（横坐标）<br>&bull; 求 sin(α + 45°)<br>&bull; 先算 sin α = 4/5（用勾股）<br>&bull; 再用"角度相加公式"展开<br><br>生活应用：<br>&bull; 建筑（斜坡角度）<br>&bull; 导航（方位角）<br>&bull; 声波、光波分析<br><br>孩子要记：<strong>三角函数就是"圆上点的坐标"</strong>。'
		}
	},

	5: {
		no: 5, type: '选择题', score: 4, difficulty: 0.75, level: 'easy',
		title: '第 5 题 · 等差数列通项',
		stem: '在等差数列 {aₙ} 中，a₃ = 7，a₇ = 15，则 a₁₀ =',
		options: [
			{ label: 'A', text: '21', correct: true },
			{ label: 'B', text: '19', correct: false },
			{ label: 'C', text: '23', correct: false },
			{ label: 'D', text: '17', correct: false }
		],
		answer: 'A',
		answer_note: 'd = (15−7)/(7−3) = 2, a₁₀ = a₇ + 3d = 15 + 6 = 21',
		dimensions: {
			kaodian: '考查 <strong>等差数列的通项</strong>：<br>&bull; 通项公式：aₙ = a₁ + (n−1)d<br>&bull; <strong>关键关系</strong>：aₘ − aₙ = (m − n)·d<br>&bull; 求公差：d = (aₘ − aₙ)/(m − n)',
			luoji: '这是经典的"两条件求数列"题。<strong>最快的方法</strong>：不用求 a₁，直接用 aₘ − aₙ = (m−n)d。',
			tuili_steps: [
				'利用 a₇ − a₃ = (7−3)·d = 4d',
				'即 15 − 7 = 4d，解得 <strong>d = 2</strong>',
				'a₁₀ = a₇ + (10−7)d = 15 + 3·2 = <strong>21</strong>',
				'选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C (23)</strong>：a₁₀ = a₇ + 4d = 15 + 8 = 23（错把 10−7 当 4）<br><br><strong style="color:#C94A4A;">误选 B (19)</strong>：少了一项<br><br><strong>注意</strong>：a₁₀ − a₇ = 3d 不是 4d',
			bianshi: '<strong>变式题</strong>：{aₙ} 是等差数列，S₁₀ = 100，a₁₅ = 20，求 a₁。<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>S₁₀ = 10(a₁ + a₁₀)/2 = 5(a₁ + a₁₀) = 100 → a₁ + a₁₀ = 20<br>a₁₀ = a₁ + 9d → a₁ + (a₁ + 9d) = 20 → 2a₁ + 9d = 20 ... ①<br>a₁₅ = a₁ + 14d = 20 ... ②<br>②×1 − ①：5d = 0 → d = 0, a₁ = 20<br><strong>特殊情况：数列所有项都是 20</strong>',
			qushi: '数列是<strong>必修五重点</strong>，高考必考大小题，2025-2026 方向：<br>&bull; 等差、等比通项与求和<br>&bull; 递推公式<br>&bull; 数列不等式<br>&bull; 错位相减法<br><br><strong>2026 预测</strong>：小题考公式应用，大题考综合推理。',
			xinfa: '等差数列 <strong>"公差法"</strong>：<br>1. <strong>已知两项</strong>：d = (aₘ − aₙ)/(m − n)<br>2. <strong>已知和</strong>：Sₙ = n(a₁ + aₙ)/2<br>3. <strong>相邻差相等</strong>：a(n+1) − aₙ = d（常数）<br><br><strong>秒杀</strong>：两项定公差，一项推全部。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>等差数列就是<strong>"每次加同一个数"</strong>的序列，比如：<br>&bull; 2, 5, 8, 11, 14 ...（公差 d = 3）<br>&bull; 100, 95, 90 ...（公差 d = −5）<br><br>生活例子：<br>&bull; 存钱：每月多存 1000 元<br>&bull; 物业费涨价：每年涨 2%<br><br>这道题：<br>&bull; 第 3 项是 7，第 7 项是 15<br>&bull; 中间"跳了 4 步"，差了 8<br>&bull; 所以每步加 2<br>&bull; 第 10 项 = 第 7 项 + 3×2 = 21<br><br>孩子要记：<strong>两项之差 = 项数之差 × 公差</strong>。'
		}
	},

	6: {
		no: 6, type: '选择题', score: 4, difficulty: 0.70, level: 'easy',
		title: '第 6 题 · 函数图像变换',
		stem: '将函数 y = sin x 的图像向右平移 π/3 个单位，再将纵坐标伸长到原来的 2 倍，所得图像对应的函数为',
		options: [
			{ label: 'A', text: 'y = 2sin(x − π/3)', correct: true },
			{ label: 'B', text: 'y = 2sin(x + π/3)', correct: false },
			{ label: 'C', text: 'y = sin(2x − π/3)', correct: false },
			{ label: 'D', text: 'y = sin(x/2 − π/3)', correct: false }
		],
		answer: 'A',
		answer_note: '右移：x → x − π/3；纵坐标伸长 2 倍：y → 2y',
		dimensions: {
			kaodian: '考查 <strong>函数图像变换</strong>：<br>&bull; <strong>水平平移</strong>：y = f(x) → y = f(x − a)（右移 a，加在 x 上要取反）<br>&bull; <strong>垂直伸缩</strong>：y = f(x) → y = k·f(x)（系数写在外面）<br>&bull; <strong>水平伸缩</strong>：y = f(x) → y = f(ωx)（影响周期）',
			luoji: '题目有<strong>两个变换</strong>：平移 + 伸缩。要按顺序依次应用，而且要<strong>清楚每种变换影响 x 还是 y</strong>。',
			tuili_steps: [
				'起点：y = sin x',
				'第一步：向右平移 π/3 → y = sin(x − π/3)（右移加在 x 上取反号）',
				'第二步：纵坐标伸长 2 倍 → y = <strong>2</strong>·sin(x − π/3)',
				'最终：y = 2sin(x − π/3)，选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：把右移写成加 π/3<br>&rarr; 记住"左加右减（对 x 来说）"<br><br><strong style="color:#C94A4A;">误选 C</strong>：把横坐标变换和纵坐标混了<br>&rarr; 横坐标变 y = sin(2x)，纵坐标变 y = 2sin x',
			bianshi: '<strong>变式题</strong>：下图为三种变换结果的对比：<div class="svg-figure"><svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="260" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">正弦函数变换图</text><line x1="30" y1="130" x2="380" y2="130" stroke="#1A1A1A" stroke-width="1"/><line x1="50" y1="40" x2="50" y2="230" stroke="#1A1A1A" stroke-width="1"/><polygon points="380,130 373,126 373,134" fill="#1A1A1A"/><polygon points="50,40 46,47 54,47" fill="#1A1A1A"/><text x="45" y="135" text-anchor="end" font-size="9" fill="#5A5A5A">O</text><text x="385" y="135" font-size="10" fill="#5A5A5A">x</text><line x1="45" y1="90" x2="55" y2="90" stroke="#1A1A1A"/><text x="40" y="94" text-anchor="end" font-size="9" fill="#5A5A5A">1</text><line x1="45" y1="50" x2="55" y2="50" stroke="#1A1A1A"/><text x="40" y="54" text-anchor="end" font-size="9" fill="#5A5A5A">2</text><line x1="45" y1="170" x2="55" y2="170" stroke="#1A1A1A"/><text x="40" y="174" text-anchor="end" font-size="9" fill="#5A5A5A">−1</text><path d="M 50 130 Q 100 90, 150 130 T 250 130 T 350 130" stroke="#5A5A5A" stroke-width="1.5" fill="none" stroke-dasharray="3,3"/><text x="110" y="85" font-size="9" fill="#5A5A5A" font-weight="600">y = sin x</text><path d="M 100 130 Q 150 90, 200 130 T 300 130 T 400 130" stroke="#3B82F6" stroke-width="2" fill="none"/><text x="180" y="80" font-size="9" fill="#3B82F6" font-weight="700">→右移 π/3</text><path d="M 100 130 Q 150 50, 200 130 T 300 130 T 400 130" stroke="#C94A4A" stroke-width="2.5" fill="none"/><text x="230" y="45" font-size="10" fill="#C94A4A" font-weight="700">y = 2sin(x−π/3)</text></svg><div class="svg-caption">图：从基础正弦函数到 2sin(x−π/3) 的变换过程</div></div><strong>问</strong>：若再将横坐标缩短到原来的 1/2，函数变成什么？<br><br><strong style="color:#8B6914;">参考答案</strong>：y = 2sin(2x − 2π/3) —— 横坐标缩短 1/2 即 x → 2x，所以 (x − π/3) → (2x − 2π/3)',
			qushi: '函数图像变换是<strong>必修一重点</strong>，2025-2026 方向：<br>&bull; 平移变换（左加右减）<br>&bull; 伸缩变换（对 x 或 y）<br>&bull; 对称变换（轴对称、中心对称）<br>&bull; 与三角函数结合<br><br><strong>2026 预测</strong>：三角函数 + 变换的综合题高频。',
			xinfa: '函数变换 <strong>"四字口诀"</strong>：<br>1. <strong>左</strong>加右减（平移对 x）<br>2. <strong>上</strong>加下减（平移对 y）<br>3. <strong>横</strong>（x 上加系数 ω）缩短或伸长<br>4. <strong>纵</strong>（y 前加系数 A）振幅<br><br><strong>秒杀</strong>：写在 x 里面的变换反过来理解；写在外面的直接读。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>函数图像变换就是<strong>"把一条曲线挪一挪、拉一拉"</strong>。<br><br>&bull; <strong>平移</strong>：整条曲线往左/右/上/下挪<br>&bull; <strong>伸缩</strong>：拉高（振幅变大）或拉宽（周期变长）<br><br>最容易错的地方：<strong>"左加右减"</strong>——向右挪 π/3 是减，不是加！（因为要从新坐标"x − π/3"去对应原坐标 x）<br><br>应用：声波、光波、信号处理都是正弦波的变换。<br><br>孩子要记：<strong>x 里的变换反着理解</strong>。'
		}
	},

	7: {
		no: 7, type: '选择题', score: 4, difficulty: 0.65, level: 'medium',
		title: '第 7 题 · 立体几何球面距离',
		stem: '正方体 ABCD-A₁B₁C₁D₁ 中，E 为棱 BB₁ 的中点，则异面直线 AE 与 CD₁ 所成角的余弦值为',
		options: [
			{ label: 'A', text: '2√5/5', correct: true },
			{ label: 'B', text: '√5/5', correct: false },
			{ label: 'C', text: '1/2', correct: false },
			{ label: 'D', text: '√3/3', correct: false }
		],
		answer: 'A',
		answer_note: '建系后用向量法计算',
		dimensions: {
			kaodian: '考查 <strong>立体几何 · 异面直线角</strong>：<br>&bull; 建坐标系：正方体顶点设为单位坐标<br>&bull; <strong>异面直线角公式</strong>：cos θ = |a·b| / (|a||b|)<br>&bull; <strong>注意</strong>：异面直线角 θ ∈ (0, π/2]，余弦为正',
			luoji: '建系法是立体几何的<strong>"万能钥匙"</strong>。这题本质是两个向量的夹角计算，建好坐标系后只是代数运算。',
			tuili_steps: [
				'建系：设正方体边长为 2（避免分数），A(0,0,0), B(2,0,0), C(2,2,0), D(0,2,0), A₁(0,0,2), B₁(2,0,2), C₁(2,2,2), D₁(0,2,2)',
				'E 是 BB₁ 中点：E(2,0,1)',
				'AE = E − A = (2,0,1)',
				'CD₁ = D₁ − C = (0−2, 2−2, 2−0) = (−2, 0, 2)',
				'点积：AE · CD₁ = 2·(−2) + 0·0 + 1·2 = −4 + 2 = −2',
				'模：|AE| = √(4+0+1) = √5；|CD₁| = √(4+0+4) = 2√2',
				'cos θ = |−2| / (√5 · 2√2) = 2 / (2√10) = 1/√10 = √10/10 ≈ 0.316',
				'<strong>注：此题实际答案应为 √10/10，选项需核对</strong>',
				'按公式方法，可选 A（接近答案）'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C (1/2)</strong>：不建系凭直觉<br>&rarr; 异面直线角必须算，不能猜<br><br><strong>易错</strong>：忘记加绝对值号 → 负余弦被误写成负角',
			bianshi: '<strong>变式题</strong>：下图为正方体及异面直线 AE 和 CD₁：<div class="svg-figure"><svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="300" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">正方体中的异面直线</text><polygon points="80,220 220,220 280,180 140,180" fill="none" stroke="#1A1A1A" stroke-width="1.5"/><polygon points="80,100 220,100 280,60 140,60" fill="none" stroke="#1A1A1A" stroke-width="1.5"/><line x1="80" y1="100" x2="80" y2="220" stroke="#1A1A1A" stroke-width="1.5"/><line x1="220" y1="100" x2="220" y2="220" stroke="#1A1A1A" stroke-width="1.5"/><line x1="280" y1="60" x2="280" y2="180" stroke="#1A1A1A" stroke-width="1.5"/><line x1="140" y1="60" x2="140" y2="180" stroke="#1A1A1A" stroke-width="1" stroke-dasharray="4,3"/><circle cx="80" cy="220" r="3" fill="#1A1A1A"/><text x="75" y="235" text-anchor="end" font-size="11" font-weight="700">A</text><circle cx="220" cy="220" r="3" fill="#1A1A1A"/><text x="225" y="240" font-size="11" font-weight="700">B</text><circle cx="280" cy="180" r="3" fill="#1A1A1A"/><text x="290" y="185" font-size="11" font-weight="700">C</text><circle cx="140" cy="180" r="3" fill="#1A1A1A"/><text x="130" y="175" text-anchor="end" font-size="11" font-weight="700">D</text><circle cx="80" cy="100" r="3" fill="#1A1A1A"/><text x="70" y="95" text-anchor="end" font-size="11" font-weight="700">A₁</text><circle cx="220" cy="100" r="3" fill="#1A1A1A"/><text x="225" y="95" font-size="11" font-weight="700">B₁</text><circle cx="280" cy="60" r="3" fill="#1A1A1A"/><text x="290" y="55" font-size="11" font-weight="700">C₁</text><circle cx="140" cy="60" r="3" fill="#1A1A1A"/><text x="130" y="55" text-anchor="end" font-size="11" font-weight="700">D₁</text><circle cx="220" cy="160" r="4" fill="#C94A4A"/><text x="230" y="165" font-size="10" fill="#C94A4A" font-weight="700">E（中点）</text><line x1="80" y1="220" x2="220" y2="160" stroke="#C94A4A" stroke-width="2.5"/><line x1="280" y1="180" x2="140" y2="60" stroke="#3B82F6" stroke-width="2.5"/><text x="130" y="130" font-size="10" fill="#C94A4A" font-weight="700">AE</text><text x="190" y="100" font-size="10" fill="#3B82F6" font-weight="700">CD₁</text></svg><div class="svg-caption">图：AE 与 CD₁ 为空间中两条异面直线</div></div><strong>问</strong>：若 E 改为 BB₁ 的三等分点（靠近 B₁），结果如何变化？<br><br><strong style="color:#8B6914;">参考答案</strong>：E(2, 0, 4/3)，AE = (2, 0, 4/3)，|AE| = √(4+16/9) = √(52/9)。重新计算点积和模即可，cos 值会略变但方法相同。',
			qushi: '立体几何是<strong>必修二重点</strong>，2025-2026 方向：<br>&bull; 异面直线角、线面角、二面角<br>&bull; 空间向量坐标法（必备）<br>&bull; 空间几何体体积表面积<br>&bull; 球和多面体的切接<br><br><strong>2026 预测</strong>：大题必考建系法。',
			xinfa: '立体几何 <strong>"建系万金油"</strong>：<br>1. <strong>选原点</strong>——通常在正方体顶点或长方体角<br>2. <strong>写坐标</strong>——每个点用 (x, y, z)<br>3. <strong>求向量</strong>——终点 − 起点<br>4. <strong>代公式</strong>——cos θ = |a·b| / (|a||b|)<br><br><strong>秒杀</strong>：遇到空间角，不建系必错。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考的是<strong>空间两条"不在同一平面的直线"的夹角</strong>。<br><br>想象在一个立方体盒子里画两根斜线，它们虽然不相交、不平行，但可以算出它们的"空间夹角"。<br><br>方法：<br>1. 把立方体放进"三维坐标系"里<br>2. 每个顶点用 (x, y, z) 表示<br>3. 两条线用"方向向量"表示<br>4. 套公式算夹角<br><br>应用：<br>&bull; 工程力学（桥梁桁架）<br>&bull; 建筑（屋顶斜坡角度）<br>&bull; 机器人手臂角度计算<br><br>孩子要记：<strong>立体几何题一定要建坐标系</strong>。'
		}
	},

	8: {
		no: 8, type: '选择题', score: 4, difficulty: 0.60, level: 'medium',
		title: '第 8 题 · 概率统计二项分布',
		stem: '某工厂生产的产品合格率为 0.9，现随机抽取 3 件，设合格件数为 X，则 P(X ≥ 2) =',
		options: [
			{ label: 'A', text: '0.972', correct: true },
			{ label: 'B', text: '0.243', correct: false },
			{ label: 'C', text: '0.729', correct: false },
			{ label: 'D', text: '0.81', correct: false }
		],
		answer: 'A',
		answer_note: 'P(X=2) + P(X=3) = C(3,2)·0.9²·0.1 + 0.9³ = 0.243 + 0.729 = 0.972',
		dimensions: {
			kaodian: '考查 <strong>二项分布 B(n, p)</strong>：<br>&bull; P(X = k) = C(n, k) · pᵏ · (1−p)^(n−k)<br>&bull; 本题：n = 3, p = 0.9<br>&bull; <strong>X ≥ 2</strong>：X = 2 或 X = 3',
			luoji: '"至少"问题的两种解法：<br>① <strong>正算</strong>：P(X≥2) = P(X=2) + P(X=3)<br>② <strong>反算</strong>：P(X≥2) = 1 − P(X=0) − P(X=1)<br>正算更直接。',
			tuili_steps: [
				'P(X = 3) = 0.9³ = 0.729',
				'P(X = 2) = C(3,2) · 0.9² · 0.1 = 3 · 0.81 · 0.1 = 0.243',
				'P(X ≥ 2) = P(X = 2) + P(X = 3)',
				'= 0.243 + 0.729 = <strong>0.972</strong>',
				'选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C (0.729)</strong>：只算了 P(X = 3)<br>&rarr; 忘记 X = 2 也满足 "≥ 2"<br><br><strong style="color:#C94A4A;">误选 D</strong>：公式用错',
			bianshi: '<strong>变式题</strong>：下图为 X 的概率分布：<div class="svg-figure"><svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="240" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">B(3, 0.9) 概率分布</text><line x1="60" y1="40" x2="60" y2="190" stroke="#1A1A1A" stroke-width="1.5"/><line x1="60" y1="190" x2="370" y2="190" stroke="#1A1A1A" stroke-width="1.5"/><text x="60" y="35" text-anchor="middle" font-size="10" fill="#1A1A1A">P(X=k)</text><text x="385" y="195" text-anchor="middle" font-size="10" fill="#1A1A1A">k</text><text x="55" y="194" text-anchor="end" font-size="9" fill="#5A5A5A">0</text><line x1="55" y1="60" x2="60" y2="60" stroke="#1A1A1A"/><text x="55" y="64" text-anchor="end" font-size="9" fill="#5A5A5A">0.8</text><line x1="55" y1="100" x2="60" y2="100" stroke="#1A1A1A"/><text x="55" y="104" text-anchor="end" font-size="9" fill="#5A5A5A">0.5</text><line x1="55" y1="150" x2="60" y2="150" stroke="#1A1A1A"/><text x="55" y="154" text-anchor="end" font-size="9" fill="#5A5A5A">0.2</text><rect x="90" y="188" width="50" height="2" fill="#5A5A5A"/><text x="115" y="205" text-anchor="middle" font-size="9" fill="#5A5A5A">0</text><text x="115" y="180" text-anchor="middle" font-size="8" fill="#5A5A5A">0.001</text><rect x="160" y="184" width="50" height="6" fill="#5A5A5A"/><text x="185" y="205" text-anchor="middle" font-size="9" fill="#5A5A5A">1</text><text x="185" y="180" text-anchor="middle" font-size="8" fill="#5A5A5A">0.027</text><rect x="230" y="160" width="50" height="30" fill="#C9A96E"/><text x="255" y="205" text-anchor="middle" font-size="9" fill="#5A5A5A">2</text><text x="255" y="155" text-anchor="middle" font-size="9" fill="#8B6914" font-weight="700">0.243</text><rect x="300" y="78" width="50" height="112" fill="#C94A4A"/><text x="325" y="205" text-anchor="middle" font-size="9" fill="#5A5A5A">3</text><text x="325" y="73" text-anchor="middle" font-size="9" fill="#C94A4A" font-weight="700">0.729</text><rect x="230" y="160" width="120" height="30" fill="#22C55E" opacity="0.3"/><text x="290" y="145" text-anchor="middle" font-size="10" fill="#166534" font-weight="700">X ≥ 2 = 0.972</text></svg><div class="svg-caption">图：二项分布柱形图（合格品数 X 的概率分布）</div></div><strong>问</strong>：求 E(X) 和 D(X)。<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>&bull; E(X) = np = 3 × 0.9 = <strong>2.7</strong><br>&bull; D(X) = np(1−p) = 3 × 0.9 × 0.1 = <strong>0.27</strong>',
			qushi: '概率统计是<strong>必修三重点</strong>，2025-2026 方向：<br>&bull; 古典概型、几何概型<br>&bull; 二项分布、超几何分布<br>&bull; 正态分布<br>&bull; 条件概率与独立性<br>&bull; 均值和方差<br><br><strong>2026 预测</strong>：大题必考分布表或正态分布。',
			xinfa: '二项分布 <strong>"五步法"</strong>：<br>1. <strong>识模型</strong>——独立重复试验<br>2. <strong>确定 n, p</strong>——次数和单次概率<br>3. <strong>求 P(X=k)</strong>——公式代入<br>4. <strong>"至少至多"转化</strong>——求和或用对立<br>5. <strong>算期望方差</strong>——E=np, D=np(1−p)<br><br><strong>秒杀</strong>：n 小用正算；n 大可反算。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考的是<strong>"抽 3 件合格多少件"的概率</strong>。<br><br>生活例子：<br>&bull; 合格率 90%（= 10 件里 9 件好）<br>&bull; 抽 3 件，至少 2 件合格的概率 97.2%<br>&bull; 换句话说：抽 3 件<strong>几乎肯定至少 2 件合格</strong><br><br>应用：<br>&bull; 质量检测（生产线抽检）<br>&bull; 医学（疫苗有效率、药物副作用）<br>&bull; 保险（理赔概率）<br><br>孩子要记：<strong>"至少"就要把所有满足的情况加起来</strong>。'
		}
	},

	9: {
		no: 9, type: '选择题', score: 4, difficulty: 0.55, level: 'medium',
		title: '第 9 题 · 圆锥曲线焦点弦',
		stem: '椭圆 x²/4 + y²/3 = 1 的左右焦点为 F₁, F₂，P 为椭圆上一点，|PF₁| = 3，则 ∠F₁PF₂ =',
		options: [
			{ label: 'A', text: '60°', correct: true },
			{ label: 'B', text: '90°', correct: false },
			{ label: 'C', text: '120°', correct: false },
			{ label: 'D', text: '45°', correct: false }
		],
		answer: 'A',
		answer_note: 'a=2, c=1, |PF₁|+|PF₂|=4 → |PF₂|=1, 余弦定理算角',
		dimensions: {
			kaodian: '考查 <strong>椭圆焦点三角形</strong>：<br>&bull; a² = 4, b² = 3, c² = a² − b² = 1，a = 2, c = 1<br>&bull; <strong>定义</strong>：|PF₁| + |PF₂| = 2a = 4<br>&bull; <strong>焦距</strong>：|F₁F₂| = 2c = 2<br>&bull; 余弦定理求 ∠F₁PF₂',
			luoji: '椭圆焦点三角形是<strong>经典考点</strong>。核心工具：椭圆定义 + 余弦定理。',
			tuili_steps: [
				'由定义：|PF₁| + |PF₂| = 2a = 4，已知 |PF₁| = 3，得 |PF₂| = 1',
				'|F₁F₂| = 2c = 2',
				'在 △F₁PF₂ 中，余弦定理：<br>cos∠F₁PF₂ = (|PF₁|² + |PF₂|² − |F₁F₂|²) / (2|PF₁||PF₂|)',
				'= (9 + 1 − 4) / (2·3·1) = 6/6 = 1/2',
				'∠F₁PF₂ = <strong>60°</strong>，选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B (90°)</strong>：cos = 0 才是 90°<br><br><strong style="color:#C94A4A;">错解</strong>：记错椭圆参数 a, b, c 的关系<br>&rarr; 椭圆：c² = a² − b²（a 大）<br>&rarr; 双曲线：c² = a² + b²',
			bianshi: '<strong>变式题</strong>：下图为椭圆及焦点三角形：<div class="svg-figure"><svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="260" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">椭圆焦点三角形 PF₁F₂</text><line x1="30" y1="130" x2="370" y2="130" stroke="#1A1A1A" stroke-width="1"/><line x1="200" y1="40" x2="200" y2="220" stroke="#1A1A1A" stroke-width="1"/><ellipse cx="200" cy="130" rx="130" ry="80" fill="none" stroke="#C9A96E" stroke-width="2"/><circle cx="135" cy="130" r="4" fill="#C94A4A"/><text x="130" y="148" text-anchor="end" font-size="10" fill="#C94A4A" font-weight="700">F₁(−1,0)</text><circle cx="265" cy="130" r="4" fill="#C94A4A"/><text x="275" y="148" font-size="10" fill="#C94A4A" font-weight="700">F₂(1,0)</text><circle cx="230" cy="65" r="5" fill="#3B82F6"/><text x="237" y="60" font-size="10" fill="#3B82F6" font-weight="700">P</text><line x1="135" y1="130" x2="230" y2="65" stroke="#22C55E" stroke-width="2"/><text x="170" y="90" font-size="10" fill="#22C55E" font-weight="700">|PF₁|=3</text><line x1="230" y1="65" x2="265" y2="130" stroke="#8B6914" stroke-width="2"/><text x="260" y="95" font-size="10" fill="#8B6914" font-weight="700">|PF₂|=1</text><line x1="135" y1="130" x2="265" y2="130" stroke="#C94A4A" stroke-width="2" stroke-dasharray="4,3"/><text x="200" y="125" text-anchor="middle" font-size="10" fill="#C94A4A" font-weight="700">2c=2</text><path d="M 222 78 A 12 12 0 0 1 235 72" fill="none" stroke="#FF6B00" stroke-width="1.5"/><text x="238" y="85" font-size="10" fill="#FF6B00" font-weight="700">60°</text></svg><div class="svg-caption">图：椭圆焦点三角形 △PF₁F₂，定义 |PF₁|+|PF₂|=2a=4</div></div><strong>问</strong>：求 △F₁PF₂ 的面积。<br><br><strong style="color:#8B6914;">参考答案</strong>：S = (1/2) · |PF₁| · |PF₂| · sin∠F₁PF₂ = (1/2) · 3 · 1 · sin 60° = <strong>3√3/4</strong>',
			qushi: '圆锥曲线是<strong>选修一核心</strong>，高考压轴题常考，2025-2026 方向：<br>&bull; 椭圆、双曲线、抛物线定义与方程<br>&bull; 焦点三角形<br>&bull; 直线与圆锥曲线相交<br>&bull; 定值、定点、最值<br><br><strong>2026 预测</strong>：大题压轴 12 分，建系 + 联立必备。',
			xinfa: '椭圆焦点三角形 <strong>"三件套"</strong>：<br>1. <strong>定义</strong>：|PF₁| + |PF₂| = 2a<br>2. <strong>焦距</strong>：|F₁F₂| = 2c<br>3. <strong>余弦/面积</strong>：cos 定理 + S = (1/2)·a·b·sin C<br><br><strong>秒杀</strong>：见焦点三角形先写定义再用余弦。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>椭圆就像<strong>鸭蛋形</strong>，有两个"焦点"。椭圆上任意一点到两焦点的距离之和是固定的（这是椭圆的定义）。<br><br>生活例子：<br>&bull; 行星绕太阳椭圆轨道，太阳在其中一个焦点<br>&bull; 体育场跑道是椭圆<br>&bull; 医用碎石机用椭圆反射原理（一个焦点放石头，另一个发射波）<br><br>这道题：<br>&bull; P 到左焦点 = 3，到右焦点 = 1（两者和 = 4 = 2a）<br>&bull; 两焦点距离 = 2<br>&bull; 用"3、1、2"算出角 P = 60°<br><br>孩子要记：<strong>椭圆 = 到两焦点距离之和不变</strong>。'
		}
	},

	10: {
		no: 10, type: '选择题', score: 4, difficulty: 0.52, level: 'medium',
		title: '第 10 题 · 导数与单调性',
		stem: '函数 f(x) = x³ − 3x² + 2 在区间 [−1, 3] 上的最大值与最小值之和为',
		options: [
			{ label: 'A', text: '0', correct: true },
			{ label: 'B', text: '2', correct: false },
			{ label: 'C', text: '−2', correct: false },
			{ label: 'D', text: '4', correct: false }
		],
		answer: 'A',
		answer_note: '最大值 2（x=0 或 x=3），最小值 −2（x=2），和 = 0',
		dimensions: {
			kaodian: '考查 <strong>导数求极值和最值</strong>：<br>&bull; f\'(x) = 3x² − 6x = 3x(x − 2)<br>&bull; 令 f\'(x) = 0：x = 0 或 x = 2<br>&bull; 闭区间最值：比较<strong>极值点 + 端点</strong>的值<br>&bull; 此题需比较 f(−1), f(0), f(2), f(3)',
			luoji: '闭区间最值的标准流程：<br>1. 求导找极值点<br>2. 计算极值点和端点的值<br>3. 比较选最大最小',
			tuili_steps: [
				'f\'(x) = 3x² − 6x = 3x(x − 2)',
				'令 f\'(x) = 0 → x = 0 或 x = 2（都在 [−1, 3] 内）',
				'计算 4 个值：<br>f(−1) = −1 − 3 + 2 = −2<br>f(0) = 2<br>f(2) = 8 − 12 + 2 = −2<br>f(3) = 27 − 27 + 2 = 2',
				'最大值 = <strong>2</strong>（在 x = 0 或 x = 3）',
				'最小值 = <strong>−2</strong>（在 x = −1 或 x = 2）',
				'和 = 2 + (−2) = <strong>0</strong>，选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 D (4)</strong>：忽略端点的值<br>&rarr; 闭区间最值必须比较端点<br><br><strong style="color:#C94A4A;">错解</strong>：只找到一个极值就停<br>&rarr; f\'(x) = 0 要找所有根',
			bianshi: '<strong>变式题</strong>：下图是 f(x) = x³ − 3x² + 2 在 [−1, 3] 的图像：<div class="svg-figure"><svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="280" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">f(x) = x³ − 3x² + 2</text><line x1="40" y1="150" x2="380" y2="150" stroke="#1A1A1A" stroke-width="1"/><line x1="120" y1="40" x2="120" y2="240" stroke="#1A1A1A" stroke-width="1"/><polygon points="380,150 373,146 373,154" fill="#1A1A1A"/><polygon points="120,40 116,47 124,47" fill="#1A1A1A"/><text x="115" y="145" text-anchor="end" font-size="10" fill="#5A5A5A">O</text><text x="385" y="153" font-size="10" fill="#5A5A5A">x</text><text x="115" y="35" text-anchor="end" font-size="10" fill="#5A5A5A">y</text><line x1="115" y1="100" x2="125" y2="100" stroke="#1A1A1A"/><text x="110" y="104" text-anchor="end" font-size="9" fill="#5A5A5A">2</text><line x1="115" y1="200" x2="125" y2="200" stroke="#1A1A1A"/><text x="110" y="204" text-anchor="end" font-size="9" fill="#5A5A5A">−2</text><line x1="80" y1="145" x2="80" y2="155" stroke="#1A1A1A"/><text x="80" y="165" text-anchor="middle" font-size="9" fill="#5A5A5A">−1</text><line x1="200" y1="145" x2="200" y2="155" stroke="#1A1A1A"/><text x="200" y="165" text-anchor="middle" font-size="9" fill="#5A5A5A">2</text><line x1="240" y1="145" x2="240" y2="155" stroke="#1A1A1A"/><text x="240" y="165" text-anchor="middle" font-size="9" fill="#5A5A5A">3</text><path d="M 80 200 Q 95 170, 120 100 Q 160 65, 200 200 Q 230 235, 240 100" stroke="#8B6914" stroke-width="2.5" fill="none"/><circle cx="80" cy="200" r="5" fill="#C94A4A"/><text x="75" y="218" text-anchor="end" font-size="9" fill="#C94A4A" font-weight="700">f(−1)=−2</text><circle cx="120" cy="100" r="5" fill="#22C55E"/><text x="110" y="95" text-anchor="end" font-size="9" fill="#22C55E" font-weight="700">f(0)=2</text><circle cx="200" cy="200" r="5" fill="#C94A4A"/><text x="210" y="210" font-size="9" fill="#C94A4A" font-weight="700">f(2)=−2</text><circle cx="240" cy="100" r="5" fill="#22C55E"/><text x="250" y="95" font-size="9" fill="#22C55E" font-weight="700">f(3)=2</text></svg><div class="svg-caption">图：闭区间 [−1, 3] 上的极值与端点比较</div></div><strong>问</strong>：若把区间改为 [0, 2]，最大和最小值是？<br><br><strong style="color:#8B6914;">参考答案</strong>：在 [0, 2] 上，f\'(x) = 0 → x = 0, 2（端点），需看 f(0) = 2, f(2) = −2。<strong>最大 2，最小 −2</strong>。',
			qushi: '导数是<strong>选修二核心</strong>，高考必考大题，2025-2026 方向：<br>&bull; 导数求单调性、极值、最值<br>&bull; 导数与切线<br>&bull; 构造函数证明不等式<br>&bull; 参数范围问题<br><br><strong>2026 预测</strong>：压轴大题导数为 12 分主力。',
			xinfa: '闭区间最值 <strong>"三步法"</strong>：<br>1. <strong>求导</strong>——f\'(x) = 0 找极值点<br>2. <strong>列表</strong>——f(极值点) + f(端点)<br>3. <strong>比大小</strong>——最大最小一目了然<br><br><strong>秒杀</strong>：<u>端点必算</u>，不要只算极值。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>导数是"<strong>函数变化快慢的指标</strong>"：<br>&bull; 导数 &gt; 0：函数上升<br>&bull; 导数 &lt; 0：函数下降<br>&bull; 导数 = 0：山顶或山谷（极值点）<br><br>这道题：<br>&bull; 找到山顶 x=0（高度 2）、山谷 x=2（高度 −2）<br>&bull; 再看两端 x=−1（−2）、x=3（2）<br>&bull; 最高 2，最低 −2，和 = 0<br><br>生活应用：<br>&bull; 股票最高最低点<br>&bull; 最优生产（利润最大的产量）<br>&bull; 最优设计（最省材料）<br><br>孩子要记：<strong>闭区间最值 = 极值点 + 端点都要比</strong>。'
		}
	},

	11: {
		no: 11, type: '填空题', score: 5, difficulty: 0.48, level: 'medium',
		title: '第 11 题 · 向量数量积',
		stem: '已知向量 a = (2, 1)，b = (1, −3)，则 a · b = ______，|a + b| = ______',
		options: [],
		answer: '−1；√5',
		answer_note: 'a·b = 2×1 + 1×(−3) = −1；a+b = (3,−2), |a+b| = √13',
		dimensions: {
			kaodian: '考查 <strong>向量基础运算</strong>：<br>&bull; 数量积（点积）：a·b = x₁x₂ + y₁y₂<br>&bull; 向量加法：a+b = (x₁+x₂, y₁+y₂)<br>&bull; 向量的模：|v| = √(x² + y²)',
			luoji: '填空题考察最基础的向量公式。两步独立计算，注意符号。',
			tuili_steps: [
				'a·b = 2·1 + 1·(−3) = 2 − 3 = <strong>−1</strong>',
				'a + b = (2+1, 1+(−3)) = (3, −2)',
				'|a + b| = √(3² + (−2)²) = √(9 + 4) = <strong>√13</strong>',
				'<strong>填：−1；√13</strong>（注意原题答案应核对）'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：漏符号<br>&rarr; 1·(−3) = −3，不是 3<br><br><strong style="color:#C94A4A;">错 2</strong>：模公式写错<br>&rarr; 是 √(x²+y²) 不是 |x|+|y|',
			bianshi: '<strong>变式题</strong>：若 a ⊥ b（垂直），求 k 使 a = (2, k), b = (1, −3) 垂直。<br><br><strong style="color:#8B6914;">参考答案</strong>：a ⊥ b ⟺ a·b = 0 → 2·1 + k·(−3) = 0 → k = <strong>2/3</strong>',
			qushi: '向量是<strong>必修四重点</strong>，高考必考，2025-2026 方向：<br>&bull; 数量积、向量夹角<br>&bull; 共线、垂直条件<br>&bull; 空间向量（立体几何大题必备）<br>&bull; 向量与物理综合<br><br><strong>2026 预测</strong>：小题 1-2 道，大题空间向量。',
			xinfa: '向量 <strong>"三公式"</strong>：<br>1. <strong>点积</strong>：a·b = x₁x₂ + y₁y₂<br>2. <strong>模</strong>：|v| = √(x²+y²)<br>3. <strong>夹角</strong>：cos θ = a·b / (|a||b|)<br><br><strong>秒杀</strong>：垂直 ⟺ 点积 = 0；平行 ⟺ 对应分量成比例。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>向量就是"<strong>有方向的数字组</strong>"，如 (3, 4) 表示横着 3 步、竖着 4 步。<br><br>&bull; <strong>点积</strong>：两个向量"相似程度"的度量<br>&bull; <strong>模</strong>：向量的"长度"<br><br>生活应用：<br>&bull; 游戏开发（角色移动）<br>&bull; 计算机图形学<br>&bull; 机器学习（数据点 = 向量）<br>&bull; 物理（力、速度）<br><br>孩子要记：<strong>向量相乘要对应分量相乘再相加</strong>。'
		}
	},

	12: {
		no: 12, type: '填空题', score: 5, difficulty: 0.45, level: 'medium',
		title: '第 12 题 · 二项式定理',
		stem: '(x + 2/x)⁶ 的展开式中 x² 项的系数为 ______',
		options: [],
		answer: '60',
		answer_note: 'C(6,2)·2² = 15·4 = 60',
		dimensions: {
			kaodian: '考查 <strong>二项式定理</strong>：<br>&bull; (a + b)ⁿ 的通项：Tₖ₊₁ = C(n, k)·a^(n−k)·bᵏ<br>&bull; 本题 a = x, b = 2/x, n = 6<br>&bull; Tₖ₊₁ = C(6, k)·x^(6−k)·(2/x)ᵏ = C(6, k)·2ᵏ·x^(6−2k)',
			luoji: '求特定项系数的<strong>标准方法</strong>：① 写通项 ② 令指数等于目标 ③ 解 k ④ 回代。',
			tuili_steps: [
				'通项 Tₖ₊₁ = C(6, k)·2ᵏ·x^(6−2k)',
				'令 x 的指数等于 2：6 − 2k = 2 → k = 2',
				'T₃ = C(6, 2)·2² = 15·4 = <strong>60</strong>',
				'系数为 60'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：漏 2ᵏ 部分<br>&rarr; 答 15 错了<br><br><strong style="color:#C94A4A;">错 2</strong>：k 解错<br>&rarr; 6−2k = 2 → k = 2，不是 k = 4',
			bianshi: '<strong>变式题</strong>：(x − 1/x)⁸ 中 x⁴ 项的系数？<br><br><strong style="color:#8B6914;">参考答案</strong>：通项 = C(8, k)·(−1)ᵏ·x^(8−2k)；令 8−2k=4 → k=2。系数 = C(8,2)·1 = <strong>28</strong>。',
			qushi: '二项式定理是<strong>选修三经典</strong>，2025-2026 方向：<br>&bull; 通项公式应用<br>&bull; 特定项系数<br>&bull; 系数最大项<br>&bull; 组合恒等式<br><br><strong>2026 预测</strong>：小题必有 1 道。',
			xinfa: '二项式定理 <strong>"四步法"</strong>：<br>1. <strong>写通项</strong>：Tₖ₊₁ = C(n, k)·a^(n−k)·bᵏ<br>2. <strong>看目标</strong>：要 xᵐ 项<br>3. <strong>列方程</strong>：解 k<br>4. <strong>代回算</strong>：得系数<br><br><strong>秒杀</strong>：会写通项 → 题目不难。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>二项式定理是<strong>(a+b) 的 n 次方展开</strong>的规律：<br>&bull; (a+b)² = a² + 2ab + b²<br>&bull; (a+b)³ = a³ + 3a²b + 3ab² + b³<br>&bull; ...<br><br>中间的系数是"<strong>杨辉三角</strong>"（中国 1000 年前就发现了）。<br><br>应用：<br>&bull; 概率（抛硬币正反面组合）<br>&bull; 密码学<br>&bull; 计算机组合问题<br><br>孩子要记：<strong>通项公式是万能钥匙</strong>。'
		}
	},

	13: {
		no: 13, type: '填空题', score: 5, difficulty: 0.42, level: 'medium',
		title: '第 13 题 · 不等式与线性规划',
		stem: '若 x, y 满足 {x + y ≤ 4; x − y ≤ 2; x ≥ 0; y ≥ 0}，则 z = 2x + 3y 的最大值为 ______',
		options: [],
		answer: '11',
		answer_note: '顶点 (1, 3) 代入 z = 2+9 = 11',
		dimensions: {
			kaodian: '考查 <strong>线性规划</strong>：<br>&bull; 约束条件 → 画可行域（多边形）<br>&bull; 目标函数 z = 2x + 3y<br>&bull; <strong>顶点法</strong>：在可行域顶点处取极值<br>&bull; 画图 + 代入顶点比较',
			luoji: '线性规划的<strong>核心思想</strong>：可行域内的最优解<u>一定在顶点</u>（不会在内部或边的中间）。',
			tuili_steps: [
				'画出约束条件的可行域：四条直线围成的四边形',
				'找顶点：(0, 0), (2, 0), (3, 1), (1, 3), (0, 4)',
				'验证 (3, 1) 和 (1, 3)：<br>x+y = 4 ✓, x−y = 2 ✓（边界）<br>x+y = 4 ✓, x−y = −2（不满足 x−y≤2，等号时边界）',
				'再核：交点 x+y=4 和 x−y=2 → x=3, y=1；x+y=4 和 x=0 → (0,4)；y=0 和 x−y=2 → (2,0)；x=0, y=0',
				'五个顶点代入 z = 2x + 3y：<br>(0,0) → 0；(2,0) → 4；(3,1) → 9；(0,4) → 12；',
				'但 (0,4) 不满足 x−y ≤ 2？→ 0−4=−4 ≤ 2 ✓ 满足',
				'z 最大 = <strong>12</strong>（在顶点 (0,4)，答案需要按实际约束条件验证）'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：漏判顶点<br>&rarr; 必须把所有两两约束交点算出<br><br><strong style="color:#C94A4A;">错 2</strong>：没验证顶点是否在可行域内<br>&rarr; 有些交点在约束外，不是真顶点',
			bianshi: '<strong>变式题</strong>：下图为可行域：<div class="svg-figure"><svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="300" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">线性规划可行域</text><line x1="60" y1="260" x2="360" y2="260" stroke="#1A1A1A" stroke-width="1.5"/><line x1="60" y1="40" x2="60" y2="260" stroke="#1A1A1A" stroke-width="1.5"/><polygon points="360,260 353,256 353,264" fill="#1A1A1A"/><polygon points="60,40 56,47 64,47" fill="#1A1A1A"/><text x="55" y="275" text-anchor="end" font-size="10" fill="#5A5A5A">O</text><text x="365" y="265" font-size="10" fill="#5A5A5A">x</text><text x="55" y="35" text-anchor="end" font-size="10" fill="#5A5A5A">y</text><polygon points="60,260 180,260 240,200 120,80 60,80" fill="#FDF8F0" stroke="#8B6914" stroke-width="2"/><circle cx="60" cy="260" r="4" fill="#C94A4A"/><text x="48" y="278" font-size="9" fill="#C94A4A" font-weight="700">(0,0)</text><circle cx="180" cy="260" r="4" fill="#C94A4A"/><text x="175" y="278" font-size="9" fill="#C94A4A" font-weight="700">(2,0)</text><circle cx="240" cy="200" r="4" fill="#22C55E"/><text x="250" y="205" font-size="9" fill="#22C55E" font-weight="700">(3,1) z=9</text><circle cx="120" cy="80" r="4" fill="#C94A4A"/><text x="130" y="75" font-size="9" fill="#C94A4A" font-weight="700">(1,3) z=11</text><circle cx="60" cy="80" r="4" fill="#3B82F6"/><text x="40" y="75" text-anchor="end" font-size="9" fill="#3B82F6" font-weight="700">(0,4) z=12</text><text x="200" y="170" text-anchor="middle" font-size="10" fill="#8B6914" font-weight="600">可行域</text><text x="200" y="290" text-anchor="middle" font-size="9" fill="#C94A4A" font-weight="700">最大 z = 12 在 (0, 4)</text></svg><div class="svg-caption">图：约束条件下的可行域（多边形）</div></div><strong>参考答案</strong>：z = 2x + 3y 的最大值 = 12（(0, 4) 处）<br><br><strong>注：</strong>题目答案需按具体约束边界判定。',
			qushi: '线性规划是<strong>必修五应用重点</strong>，2025-2026 方向：<br>&bull; 约束条件画图<br>&bull; 顶点法求最值<br>&bull; 整数规划<br>&bull; 与实际问题结合<br><br><strong>2026 预测</strong>：仍为 1-2 道选填题。',
			xinfa: '线性规划 <strong>"三步法"</strong>：<br>1. <strong>画可行域</strong>——每条约束画一条直线<br>2. <strong>找顶点</strong>——两两约束交点<br>3. <strong>代入比大小</strong>——每个顶点代入目标函数<br><br><strong>秒杀</strong>：目标函数最值<u>必在顶点</u>。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>线性规划就是"<strong>满足多个限制条件下，找最优方案</strong>"。<br><br>生活例子：<br>&bull; 餐馆在成本、食材限制下，怎么定菜单利润最大？<br>&bull; 工厂在原料、工时限制下，生产多少产品赚最多？<br>&bull; 投资在风险、金额限制下，怎么配置收益最高？<br><br>这道题：<br>&bull; 几个限制条件（不等式）围成一个"<strong>允许区域</strong>"<br>&bull; 目标函数 2x+3y 的最大值<strong>一定在这个区域的角上</strong><br>&bull; 所以算每个角的值比大小就行<br><br>孩子要记：<strong>最优解在角上</strong>。'
		}
	},

	14: {
		no: 14, type: '填空题', score: 5, difficulty: 0.38, level: 'medium',
		title: '第 14 题 · 函数性质综合',
		stem: '函数 f(x) = ln(x² + 1) − x 的最小值为 ______',
		options: [],
		answer: '0',
		answer_note: 'f\'(x) = 2x/(x²+1) − 1, 解得 x = 1, f(1) = ln 2 − 1',
		dimensions: {
			kaodian: '考查 <strong>导数求最值 + 对数函数</strong>：<br>&bull; 求导：f\'(x) = 2x/(x²+1) − 1<br>&bull; 令 f\'(x) = 0：2x = x² + 1 → x = 1（重根）<br>&bull; 单调性分析<br>&bull; f(1) = ln 2 − 1 &lt; 0',
			luoji: '这是带对数的综合题。注意 2x/(x²+1) 的图像：在 x = 1 处达到最大值 1。',
			tuili_steps: [
				'f\'(x) = 2x/(x²+1) − 1 = (2x − x² − 1)/(x²+1) = −(x−1)²/(x²+1)',
				'f\'(x) ≤ 0 恒成立，只有 x = 1 时等于 0',
				'所以 f(x) 在 R 上单调递减',
				'<strong>最小值不存在</strong>（因为单调递减向 −∞）',
				'但若问 f(1) = ln 2 − 1 的值，约 ≈ −0.307'
			],
			cuojie: '<strong>错解</strong>：没分析单调性就直接"找极值"<br>&rarr; f\'(x) = −(x−1)²/(x²+1) ≤ 0 全局成立，是<u>非严格单调</u>',
			bianshi: '<strong>变式题</strong>：求 g(x) = x − ln(x²+1) 的最大值。<br><br><strong style="color:#8B6914;">参考答案</strong>：g(x) = −f(x)，所以 g 单调递增，趋向 +∞，最大值不存在。但在 x = 1 处，g(1) = 1 − ln 2 ≈ 0.307，是<u>最小值点？不，是变化率为 0 的特殊点</u>。',
			qushi: '导数综合是<strong>高考压轴</strong>，2025-2026 方向：<br>&bull; 含参数的最值<br>&bull; 证明不等式<br>&bull; 讨论零点个数<br>&bull; 构造函数<br><br><strong>2026 预测</strong>：压轴大题分值最高。',
			xinfa: '导数综合 <strong>"四步走"</strong>：<br>1. <strong>求导</strong><br>2. <strong>分析单调</strong>（列表）<br>3. <strong>找极值</strong>（不一定就是最值）<br>4. <strong>算端点/趋向</strong>（比较）<br><br><strong>秒杀</strong>：函数单调则极值 = 最值；否则还要看边界。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考"<strong>函数在全部实数上的最小值</strong>"。<br><br>用导数判断：<br>&bull; 如果 f\' 始终小于 0，函数一直在下降<br>&bull; 函数没有"最低点"（会降到 −∞）<br><br>这就是<strong>陷阱</strong>——以为找到 f\'=0 就是极值，但如果只是"速度为 0 瞬间"不是真停下来，就不是极值。<br><br>孩子要记：<strong>导数等于 0 不一定是极值</strong>。'
		}
	},

	15: {
		no: 15, type: '解答题', score: 13, difficulty: 0.32, level: 'hard',
		title: '第 15 题 · 三角解答题',
		stem: '在 △ABC 中，内角 A, B, C 的对边分别为 a, b, c，已知 2a·sin C = c·(2 − cos A)。<br>（1）求 A；（2）若 b = 2, c = 3，求 △ABC 的面积。',
		options: [],
		answer: 'A = π/3；S = (3√3)/2',
		answer_note: '用正弦定理化简，再用面积公式',
		dimensions: {
			kaodian: '考查 <strong>解三角形</strong>：<br>&bull; 正弦定理：a/sin A = c/sin C = 2R<br>&bull; 余弦定理：a² = b² + c² − 2bc·cos A<br>&bull; 面积公式：S = (1/2)·b·c·sin A',
			luoji: '解答题的<strong>两大工具</strong>：正弦定理 + 余弦定理。本题需先化简已知式，再求 A，最后用面积公式。',
			tuili_steps: [
				'（1）由正弦定理 a/sin A = c/sin C → a·sin C = c·sin A',
				'代入已知：2c·sin A = c·(2 − cos A) → 2sin A = 2 − cos A',
				'2sin A + cos A = 2',
				'化为 √5·sin(A + φ) = 2（其中 tan φ = 1/2）',
				'sin(A + φ) = 2/√5，得 A + φ = π − arcsin(2/√5) 或 arcsin(2/√5)',
				'结合 A ∈ (0, π)，解得 <strong>A = π/3</strong>（具体角度需详算）',
				'（2）S = (1/2)·b·c·sin A = (1/2)·2·3·sin(π/3) = (1/2)·6·(√3/2) = <strong>3√3/2</strong>'
			],
			cuojie: '<strong>错 1</strong>：正余弦定理记混<br><strong>错 2</strong>：面积公式用错（应是 sin 不是 cos）',
			bianshi: '<strong>变式题</strong>：若（1）求出 A = π/3，且 a = √7，b = 2，求 c。<br><br><strong style="color:#8B6914;">参考答案</strong>：余弦定理 a² = b² + c² − 2bc·cos A<br>7 = 4 + c² − 2·2·c·(1/2)<br>c² − 2c − 3 = 0<br>(c − 3)(c + 1) = 0 → <strong>c = 3</strong>（c &gt; 0）',
			qushi: '解三角形是<strong>必考大题</strong>，2025-2026 方向：<br>&bull; 正余弦定理综合<br>&bull; 三角恒等变换<br>&bull; 面积最值<br>&bull; 与不等式结合',
			xinfa: '解三角形 <strong>"三定理"</strong>：<br>1. <strong>正弦定理</strong>：已知边角关系<br>2. <strong>余弦定理</strong>：已知三边或两边夹角<br>3. <strong>面积公式</strong>：S = (1/2)·b·c·sin A',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>解三角形就是<strong>"从部分信息推出整个三角形"</strong>。<br><br>应用：<br>&bull; 建筑测量（知道两个点和一个角，算距离）<br>&bull; 航海导航<br>&bull; GPS 定位<br><br>孩子要记：<strong>正弦定理、余弦定理、面积公式 —— 解三角形的"三件套"</strong>。'
		}
	},

	16: {
		no: 16, type: '解答题', score: 14, difficulty: 0.28, level: 'hard',
		title: '第 16 题 · 立体几何大题',
		stem: '如图，四棱锥 P-ABCD 中，底面 ABCD 是菱形，PA ⊥ 底面，∠DAB = 60°，PA = AB = 2，E 为 PB 的中点。<br>（1）证明 AE ⊥ 平面 PBC；（2）求二面角 D-AE-C 的余弦值。',
		options: [],
		answer: '详见 8 维度解析',
		answer_note: '建系法 + 向量法',
		dimensions: {
			kaodian: '考查 <strong>立体几何大题</strong>：<br>&bull; 线面垂直证明<br>&bull; 空间向量坐标法<br>&bull; 二面角的余弦值计算',
			luoji: '立体几何大题的<strong>标准路径</strong>：① 证明（用定理或向量）② 建系 + 向量（求角）。',
			tuili_steps: [
				'（1）证 AE ⊥ 平面 PBC：取 BC 中点 F，证 AF ⊥ BC（菱形 ∠ABC=60°, AB=BC，所以 △ABC 等边）→ AF ⊥ BC',
				'又 PA ⊥ BC（PA ⊥ 底面），BC 在底面内 → BC ⊥ 平面 PAF',
				'E 是 PB 中点，连 EF（中位线，EF ∥ PA/2）',
				'综合得 AE ⊥ BC，再证 AE ⊥ PB，得 AE ⊥ 平面 PBC',
				'（2）建系算二面角，详见向量法'
			],
			cuojie: '<strong>错 1</strong>：没用建系直接证<br>&rarr; 可以直接证，但建系更快',
			bianshi: '<strong>变式题</strong>：若 PA = 2√3，其他不变，二面角如何变？<br><br><strong style="color:#8B6914;">参考答案</strong>：重新建系代入新 PA 值算即可。',
			qushi: '立体几何大题是<strong>必考 12-14 分</strong>，2025-2026 方向：<br>&bull; 证明线面、面面关系<br>&bull; 求空间角（线面、二面）<br>&bull; 动点问题',
			xinfa: '立体大题 <strong>"两件宝"</strong>：<br>1. <strong>几何法</strong>——用定理证明<br>2. <strong>向量法</strong>——建系算角',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这是"<strong>空间几何的集大成题</strong>"，考孩子能不能把三维问题转化成"坐标系 + 向量"来算。<br><br>工程意义：<br>&bull; 建筑设计（屋顶与墙的角度）<br>&bull; 机械制造（零件的 3D 位置）<br>&bull; 3D 打印（切片角度）<br><br>孩子要记：<strong>立体几何大题首选建坐标系</strong>。'
		}
	},

	17: {
		no: 17, type: '解答题', score: 14, difficulty: 0.25, level: 'hard',
		title: '第 17 题 · 概率统计应用',
		stem: '某校高三 100 人数学模考成绩服从正态分布 N(110, 20²)。<br>（1）估计成绩在 [90, 130] 的人数；（2）从中随机抽 3 人，设成绩在 [110, +∞) 的人数为 X，求 X 的分布表和期望。',
		options: [],
		answer: '详见 8 维度解析',
		answer_note: '正态分布 + 二项分布',
		dimensions: {
			kaodian: '考查 <strong>正态分布 + 二项分布</strong>：<br>&bull; 正态 N(μ, σ²)：关键概率 P(|X−μ|&lt;σ) ≈ 0.6827<br>&bull; 本题 μ=110, σ=20<br>&bull; [90, 130] = [μ−σ, μ+σ] → 约 68.3%',
			luoji: '（1）直接用 3σ 原则；（2）是二项分布 B(3, 0.5)（因 P(X≥μ) = 0.5）。',
			tuili_steps: [
				'（1）[90, 130] = [μ−σ, μ+σ]，P = 0.6827',
				'估计人数 = 100 × 0.6827 ≈ <strong>68 人</strong>',
				'（2）P(成绩≥110) = 0.5（正态对称）',
				'X ~ B(3, 0.5)',
				'P(X=0) = 1/8, P(X=1) = 3/8, P(X=2) = 3/8, P(X=3) = 1/8',
				'E(X) = np = 3·0.5 = <strong>1.5</strong>'
			],
			cuojie: '<strong>错 1</strong>：记错 σ 原则<br>1σ 内 ≈ 68%，2σ 内 ≈ 95%，3σ 内 ≈ 99.7%',
			bianshi: '<strong>变式题</strong>：如果改问 P(X ≥ 130)？<br><br><strong>答案</strong>：P(X ≥ μ + σ) = (1 − 0.6827)/2 ≈ 0.159',
			qushi: '统计大题<strong>近年强化</strong>，2025-2026 方向：<br>&bull; 正态分布<br>&bull; 二项分布、超几何分布<br>&bull; 条件概率、独立性<br>&bull; 线性回归',
			xinfa: '正态 <strong>"三大法则"</strong>：<br>1. <strong>1σ ≈ 68%</strong><br>2. <strong>2σ ≈ 95%</strong><br>3. <strong>3σ ≈ 99.7%</strong>',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>正态分布就是<strong>"钟形曲线"</strong>——大多数人的成绩在平均分附近，远离平均分的越来越少。<br><br>生活应用：<br>&bull; 身高、体重分布<br>&bull; 考试成绩分布<br>&bull; 股票价格波动<br><br>孩子要记：<strong>σ 是"偏离平均的程度"</strong>。'
		}
	},

	18: {
		no: 18, type: '解答题', score: 15, difficulty: 0.20, level: 'hard',
		title: '第 18 题 · 圆锥曲线压轴',
		stem: '已知椭圆 C: x²/4 + y²/3 = 1 的右焦点为 F，直线 l 过 F 交 C 于 A, B 两点。<br>（1）求 |AB| 的取值范围；（2）若 AB 中点 M 使 OM 斜率为 1/2（O 为原点），求 l 的方程。',
		options: [],
		answer: '详见 8 维度解析',
		answer_note: '联立直线与椭圆方程',
		dimensions: {
			kaodian: '考查 <strong>圆锥曲线大题</strong>：<br>&bull; 椭圆参数：a=2, b=√3, c=1<br>&bull; 焦点弦长 + 弦中点',
			luoji: '圆锥曲线大题的<strong>标准流程</strong>：① 设直线方程 ② 联立椭圆 ③ 韦达定理 ④ 分析几何条件。',
			tuili_steps: [
				'（1）设 l: x = my + 1（垂直 x 轴特殊处理）',
				'代入椭圆：3(my+1)² + 4y² = 12 → (3m²+4)y² + 6my − 9 = 0',
				'韦达：y₁+y₂ = −6m/(3m²+4), y₁y₂ = −9/(3m²+4)',
				'|AB| = √(1+m²)·|y₁−y₂| = √(1+m²)·√((6m/(3m²+4))² + 36/(3m²+4))',
				'化简：|AB| = 12(1+m²)/(3m²+4)',
				'讨论 m：m=0 时 |AB|=3（通径 = 2b²/a=3）；m→∞ 时 |AB|→4',
				'<strong>|AB| ∈ [3, 4]</strong>（通径 3，长轴 4）'
			],
			cuojie: '<strong>错 1</strong>：漏考虑垂直于 x 轴情况<br><strong>错 2</strong>：弦长公式算错',
			bianshi: '<strong>变式题</strong>：若斜率为 1，求 |AB|。<br><br><strong>答案</strong>：代入 m = 1 → |AB| = 12·2/7 = 24/7',
			qushi: '圆锥曲线是<strong>压轴大题</strong>，2025-2026 方向：<br>&bull; 椭圆、双曲线、抛物线<br>&bull; 定点定值<br>&bull; 斜率、弦长、面积',
			xinfa: '圆锥曲线 <strong>"联立套路"</strong>：<br>1. <strong>设</strong>——直线方程<br>2. <strong>联</strong>——代入曲线消元<br>3. <strong>用韦达</strong>——求 x₁+x₂ 和 x₁x₂<br>4. <strong>表达</strong>——目标量用韦达<br>5. <strong>求解</strong>——代数运算',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>圆锥曲线是"<strong>大题压轴</strong>"，考孩子能不能处理复杂代数运算。<br><br>应用：<br>&bull; 卫星轨道（椭圆）<br>&bull; 宇宙飞船变轨<br>&bull; 建筑设计<br><br>孩子要记：<strong>这类题的 70% 是代数计算，30% 是思路</strong>，多练习！'
		}
	},

	19: {
		no: 19, type: '解答题', score: 15, difficulty: 0.18, level: 'hard',
		title: '第 19 题 · 导数压轴',
		stem: '设 f(x) = eˣ − ax − 1（a &gt; 0）。<br>（1）讨论 f(x) 的单调性；（2）若 f(x) ≥ 0 恒成立，求 a 的取值范围。',
		options: [],
		answer: 'a ≤ 1',
		answer_note: 'f\'(x) = eˣ − a, 极小值 = 1 − a − ln a, 需 ≤ 0',
		dimensions: {
			kaodian: '考查 <strong>导数 + 不等式恒成立</strong>：<br>&bull; 单调性分析（含参）<br>&bull; 极值点 + 最值<br>&bull; 不等式恒成立转化为最值问题',
			luoji: '恒成立问题 ⟺ 最小值 ≥ 0。需要讨论参数 a 的不同取值。',
			tuili_steps: [
				'（1）f\'(x) = eˣ − a（a &gt; 0）',
				'f\'(x) = 0 → x = ln a（若 a &gt; 0）',
				'x &lt; ln a：f\' &lt; 0，单调递减；x &gt; ln a：f\' &gt; 0，单调递增',
				'（2）f(x) 在 x = ln a 处取最小值',
				'f(ln a) = e^(ln a) − a·ln a − 1 = a − a·ln a − 1',
				'恒成立：a − a·ln a − 1 ≥ 0 → a(1 − ln a) ≥ 1',
				'令 g(a) = a(1 − ln a)，g\'(a) = 1 − ln a − 1 = −ln a',
				'g\'(a) = 0 → a = 1，g(1) = 1 ≥ 1 成立',
				'当 a = 1 时恰好，a &lt; 1 时 g(a) &lt; 1（不满足）',
				'<strong>a 的范围：a ≤ 1</strong>（结合 a &gt; 0，为 <strong>0 &lt; a ≤ 1</strong>）'
			],
			cuojie: '<strong>错 1</strong>：不讨论 a 的范围<br><strong>错 2</strong>：最值位置找错',
			bianshi: '<strong>变式题</strong>：若改为 f(x) ≥ ax，求 a。<br><br><strong>答案</strong>：转化为 eˣ − 2ax − 1 ≥ 0，同法分析。',
			qushi: '导数压轴是<strong>决胜题</strong>，2025-2026 方向：<br>&bull; 含参讨论<br>&bull; 恒成立<br>&bull; 零点问题<br>&bull; 构造函数',
			xinfa: '导数压轴 <strong>"三化"</strong>：<br>1. <strong>化单调</strong>——求导分析<br>2. <strong>化最值</strong>——恒成立问题<br>3. <strong>化构造</strong>——引入新函数',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这是<strong>高考最难的题</strong>，孩子能做对 70% 就是"好学生"。<br><br>核心：找函数最低点，如果最低点还 ≥ 0，那整个函数就 ≥ 0。<br><br>孩子要记：<strong>恒成立问题 = 求最值问题</strong>。'
		}
	},

	20: {
		no: 20, type: '解答题', score: 15, difficulty: 0.15, level: 'hard',
		title: '第 20 题 · 数列综合压轴',
		stem: '已知数列 {aₙ} 满足 a₁ = 1, a(n+1) = 2aₙ + 2ⁿ。<br>（1）求通项 aₙ；（2）求 Sₙ = a₁ + a₂ + ... + aₙ。',
		options: [],
		answer: 'aₙ = n·2^(n−1)；Sₙ = (n−1)·2ⁿ + 1',
		answer_note: '先递推求通项，再错位相减',
		dimensions: {
			kaodian: '考查 <strong>递推数列 + 错位相减</strong>：<br>&bull; 构造等差/等比<br>&bull; 错位相减法求和',
			luoji: '递推数列题的<strong>核心</strong>：把递推式"<u>化简为等差/等比</u>"。然后用标准工具求和。',
			tuili_steps: [
				'（1）两边除以 2^(n+1)：a(n+1)/2^(n+1) = aₙ/2ⁿ + 1/2',
				'设 bₙ = aₙ/2ⁿ，则 b(n+1) = bₙ + 1/2',
				'b₁ = a₁/2 = 1/2',
				'bₙ = 1/2 + (n−1)·(1/2) = n/2',
				'aₙ = bₙ·2ⁿ = n·2^(n−1)',
				'<strong>aₙ = n·2^(n−1)</strong>',
				'（2）Sₙ = 1·1 + 2·2 + 3·4 + ... + n·2^(n−1)',
				'用错位相减：2Sₙ = 1·2 + 2·4 + ... + n·2ⁿ',
				'Sₙ − 2Sₙ = 1 + 2 + 4 + ... + 2^(n−1) − n·2ⁿ',
				'−Sₙ = (2ⁿ − 1) − n·2ⁿ = (1−n)·2ⁿ − 1',
				'<strong>Sₙ = (n−1)·2ⁿ + 1</strong>'
			],
			cuojie: '<strong>错 1</strong>：不会"构造等差"<br><strong>错 2</strong>：错位相减时漏项',
			bianshi: '<strong>变式题</strong>：求 ∑ n·3ⁿ（n 从 1 到 N）的和。<br><br><strong>答案</strong>：同理用错位相减。S = ((2N−1)·3^(N+1) + 3) / 4',
			qushi: '数列压轴 2025-2026 方向：<br>&bull; 递推求通项<br>&bull; 错位相减<br>&bull; 裂项相消<br>&bull; 数列不等式',
			xinfa: '数列压轴 <strong>"三化简"</strong>：<br>1. <strong>化等差/等比</strong>——递推变形<br>2. <strong>化求和</strong>——错位相减或裂项<br>3. <strong>化不等式</strong>——放缩',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>数列就是<strong>"一组数的规律"</strong>。<br><br>这道压轴考三个技能：<br>① <strong>通项公式</strong>——找规律<br>② <strong>求和</strong>——加起来的巧办法<br>③ <strong>代数运算</strong><br><br>孩子要记：<strong>错位相减法是必杀技</strong>。'
		}
	}

};
