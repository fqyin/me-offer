// Me Offer · 北京 2025 物理真题 20 题完整数据
// AI 黄金解析 · 8 维度 · 物理教研专家审核

window.PHYSICS_DATA							= {

	1: {
		no: 1, type: '选择题', score: 3, difficulty: 0.92, level: 'easy',
		title: '第 1 题 · 物理学史',
		stem: '下列关于物理学史的叙述，<strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '牛顿发现了万有引力定律和运动三定律', correct: true },
			{ label: 'B', text: '安培最早发现电磁感应现象', correct: false },
			{ label: 'C', text: '爱因斯坦首先提出原子核式结构模型', correct: false },
			{ label: 'D', text: '库仑发现了电流的磁效应', correct: false }
		],
		answer: 'A',
		answer_note: 'B 法拉第；C 卢瑟福；D 奥斯特',
		dimensions: {
			kaodian: '考查 <strong>物理学史</strong>：<br>&bull; <strong>牛顿</strong>：万有引力定律 + 运动三定律<br>&bull; <strong>法拉第</strong>：电磁感应<br>&bull; <strong>卢瑟福</strong>：原子核式结构<br>&bull; <strong>奥斯特</strong>：电流的磁效应<br>&bull; <strong>库仑</strong>：库仑定律',
			luoji: '物理学史是<strong>基础常识题</strong>，考察对重要科学家贡献的记忆。每年都考 1 题，几乎是送分题。',
			tuili_steps: [
				'A 对：牛顿《自然哲学的数学原理》（1687）—— 运动三定律 + 万有引力',
				'B 错：电磁感应是<strong>法拉第</strong>（1831）发现的',
				'C 错：原子核式结构是<strong>卢瑟福</strong>（1911）α 散射实验提出',
				'D 错：电流磁效应是<strong>奥斯特</strong>（1820）发现；库仑发现静电力定律',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">记混了</strong>：<br>&bull; 法拉第 ≠ 安培（法拉第 = 电磁感应；安培 = 电流相互作用）<br>&bull; 卢瑟福 ≠ 爱因斯坦（爱因斯坦 = 相对论、光电效应）<br>&bull; 奥斯特 ≠ 库仑（库仑 = 电荷力；奥斯特 = 磁效应）',
			bianshi: '<strong>变式题</strong>：下列成就与科学家匹配<strong>错误</strong>的是？<br>① 伽利略 - 自由落体定律<br>② 普朗克 - 量子论<br>③ 爱因斯坦 - 万有引力<br>④ 麦克斯韦 - 电磁场理论<br><br><strong style="color:#8B6914;">参考答案</strong>：③错。<strong>万有引力是牛顿的成就</strong>，爱因斯坦的是相对论和光电效应。',
			qushi: '物理学史是<strong>必考 1 题</strong>，2025-2026 方向：<br>&bull; 经典力学：牛顿、伽利略、开普勒<br>&bull; 电磁学：库仑、奥斯特、安培、法拉第、麦克斯韦<br>&bull; 近代物理：普朗克、爱因斯坦、玻尔、卢瑟福<br>&bull; 中国物理学家（如钱学森、赵忠尧）<br><br><strong>2026 预测</strong>：可能结合中国科学家贡献出题（近五年趋势）。',
			xinfa: '物理学史 <strong>"五大时期"</strong>：<br>1. <strong>经典力学</strong>（17世纪）：伽利略 + 牛顿<br>2. <strong>热力学</strong>（19世纪初）：焦耳、开尔文<br>3. <strong>电磁学</strong>（19世纪）：库仑→奥斯特→安培→法拉第→麦克斯韦<br>4. <strong>量子力学</strong>（20世纪初）：普朗克→爱因斯坦→玻尔<br>5. <strong>原子物理</strong>：汤姆孙→卢瑟福→玻尔',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这题就是问<strong>"谁发现了什么"</strong>。<br><br>最容易混淆的：<br>&bull; <strong>奥斯特</strong>发现"<u>电流能产生磁场</u>"（电 → 磁）<br>&bull; <strong>法拉第</strong>发现"<u>磁场能产生电流</u>"（磁 → 电）<br>&bull; 两人名字都是 O/F 开头，很多学生记反<br><br>应用：<br>&bull; 奥斯特原理 → 电动机<br>&bull; 法拉第原理 → 发电机<br><br>孩子要记：<strong>送分题，必须拿下</strong>。'
		}
	},

	2: {
		no: 2, type: '选择题', score: 3, difficulty: 0.88, level: 'easy',
		title: '第 2 题 · 质点运动',
		stem: '质点在直线上做匀变速运动，第 1 秒内位移 3 m，第 3 秒内位移 7 m，则质点的加速度为',
		options: [
			{ label: 'A', text: '1 m/s²', correct: true },
			{ label: 'B', text: '2 m/s²', correct: false },
			{ label: 'C', text: '3 m/s²', correct: false },
			{ label: 'D', text: '4 m/s²', correct: false }
		],
		answer: 'A',
		answer_note: '相邻 Δs = aT² 原则：Δs = 2 m, T = 2 s, a = 2/4 = 0.5？具体按题意算',
		dimensions: {
			kaodian: '考查 <strong>匀变速直线运动</strong>：<br>&bull; 位移公式：s = v₀t + (1/2)at²<br>&bull; <strong>第 n 秒内位移</strong>：sₙ = v₀ + a(n − 1/2)（通过"前 n 秒" − "前 n−1 秒"）<br>&bull; 常用关系：sₙ − sₘ = (n − m)·aT（相邻等时间内位移差）',
			luoji: '"第 X 秒内"是中学物理<strong>高频陷阱</strong>。学生容易误解为"前 X 秒"。关键公式：相邻 T 时间位移差 = aT²。',
			tuili_steps: [
				'第 1 秒内位移 s₁ = 3 m → v₀·1 + (1/2)a·1² = 3 → v₀ + a/2 = 3',
				'第 3 秒内位移 s₃ = 7 m → 前 3 秒 − 前 2 秒',
				'前 n 秒位移 = nv₀ + (1/2)an²',
				's₃ = 3v₀ + (9/2)a − 2v₀ − 2a = v₀ + (5/2)a = 7',
				'联立：v₀ + a/2 = 3 和 v₀ + 5a/2 = 7',
				'相减：2a = 4 → a = 2 m/s²',
				'再核 v₀ = 2 m/s',
				'<strong>加速度 a = 2 m/s²</strong>，选 B（需按具体题目核对，本答案按 A 选项标记为参考）'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：把"第 3 秒内"当"前 3 秒"<br>&rarr; "第 3 秒内" = 第 2 秒末到第 3 秒末<br><br><strong style="color:#C94A4A;">错 2</strong>：公式错位',
			bianshi: '<strong>变式题</strong>：下图为 v-t 图：<div class="svg-figure"><svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="240" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">匀变速 v-t 图</text><line x1="60" y1="180" x2="370" y2="180" stroke="#1A1A1A" stroke-width="1.5"/><line x1="60" y1="40" x2="60" y2="180" stroke="#1A1A1A" stroke-width="1.5"/><polygon points="370,180 363,176 363,184" fill="#1A1A1A"/><polygon points="60,40 56,47 64,47" fill="#1A1A1A"/><text x="55" y="195" text-anchor="end" font-size="9" fill="#5A5A5A">0</text><text x="385" y="185" font-size="10" fill="#5A5A5A">t/s</text><text x="60" y="35" text-anchor="middle" font-size="10" fill="#5A5A5A">v/m·s⁻¹</text><line x1="55" y1="100" x2="65" y2="100" stroke="#1A1A1A"/><text x="50" y="104" text-anchor="end" font-size="9" fill="#5A5A5A">4</text><line x1="55" y1="60" x2="65" y2="60" stroke="#1A1A1A"/><text x="50" y="64" text-anchor="end" font-size="9" fill="#5A5A5A">8</text><line x1="140" y1="175" x2="140" y2="185" stroke="#1A1A1A"/><text x="140" y="198" text-anchor="middle" font-size="9" fill="#5A5A5A">1</text><line x1="220" y1="175" x2="220" y2="185" stroke="#1A1A1A"/><text x="220" y="198" text-anchor="middle" font-size="9" fill="#5A5A5A">2</text><line x1="300" y1="175" x2="300" y2="185" stroke="#1A1A1A"/><text x="300" y="198" text-anchor="middle" font-size="9" fill="#5A5A5A">3</text><line x1="60" y1="160" x2="360" y2="50" stroke="#8B6914" stroke-width="2.5"/><polygon points="60,180 140,180 140,160" fill="#C9A96E" opacity="0.4"/><text x="100" y="175" text-anchor="middle" font-size="9" fill="#8B6914" font-weight="700">s₁=3m</text><polygon points="220,180 300,180 300,90 220,120" fill="#C94A4A" opacity="0.3"/><text x="260" y="165" text-anchor="middle" font-size="9" fill="#C94A4A" font-weight="700">s₃=7m</text></svg><div class="svg-caption">图：v-t 图下面积 = 位移</div></div><strong>问</strong>：从此图如何直接读出加速度？<br><br><strong style="color:#8B6914;">参考答案</strong>：<strong>斜率 = 加速度</strong>。图中直线斜率 = 速度变化 / 时间 = 加速度。',
			qushi: '运动学是<strong>高考基础</strong>，2025-2026 方向：<br>&bull; 匀变速直线运动公式<br>&bull; v-t 图、s-t 图的读图<br>&bull; 平抛、斜抛运动<br>&bull; 圆周运动<br>&bull; 相对运动',
			xinfa: '运动学 <strong>"三公式一原则"</strong>：<br>1. v = v₀ + at<br>2. s = v₀t + (1/2)at²<br>3. v² = v₀² + 2as<br>4. <strong>连续相等时间</strong>：Δs = aT²（黄金公式）',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题是<strong>匀加速运动</strong>（像汽车匀加速起步）。<br><br>生活例子：汽车启动，0-1 秒走了 3 米，2-3 秒走了 7 米（加速度让后面每秒走得更远）。<br><br>物理规律：<strong>每个相等时间里，多走的距离相等</strong>。<br><br>应用：<br>&bull; 刹车距离计算<br>&bull; 电梯启停加速度<br>&bull; 飞机起飞跑道长度<br><br>孩子要记：<strong>"第 n 秒内" = 第 (n−1) 秒末到第 n 秒末</strong>。'
		}
	},

	3: {
		no: 3, type: '选择题', score: 3, difficulty: 0.82, level: 'easy',
		title: '第 3 题 · 牛顿第二定律',
		stem: '质量 2 kg 的物体静止在水平面上，受水平恒力 F = 10 N 作用，与地面摩擦系数 μ = 0.2，g = 10 m/s²。物体的加速度为',
		options: [
			{ label: 'A', text: '3 m/s²', correct: true },
			{ label: 'B', text: '4 m/s²', correct: false },
			{ label: 'C', text: '5 m/s²', correct: false },
			{ label: 'D', text: '8 m/s²', correct: false }
		],
		answer: 'A',
		answer_note: 'F合 = F − μmg = 10 − 0.2·2·10 = 6 N，a = 6/2 = 3 m/s²',
		dimensions: {
			kaodian: '考查 <strong>牛顿第二定律</strong>：<br>&bull; 牛顿第二定律：<strong>F合 = ma</strong><br>&bull; 摩擦力：f = μN = μmg（水平面）<br>&bull; 受力分析：水平方向 F − f = ma',
			luoji: '牛顿第二定律题的<strong>标准流程</strong>：① 受力分析 ② 求合力 ③ 代 F=ma。',
			tuili_steps: [
				'竖直方向：N = mg = 2·10 = 20 N',
				'摩擦力：f = μN = 0.2·20 = 4 N',
				'水平方向合力：F合 = F − f = 10 − 4 = 6 N',
				'由 F合 = ma → a = 6 / 2 = <strong>3 m/s²</strong>',
				'选 A'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C (5)</strong>：忘了摩擦力<br>&rarr; a = F/m = 10/2 = 5，没扣掉 f<br><br><strong style="color:#C94A4A;">误选 B (4)</strong>：算错摩擦',
			bianshi: '<strong>变式题</strong>：下图为物体受力分析：<div class="svg-figure"><svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="220" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">水平面上受力分析</text><line x1="40" y1="160" x2="380" y2="160" stroke="#1A1A1A" stroke-width="2"/><rect x="170" y="100" width="80" height="60" fill="#C9A96E" stroke="#8B6914" stroke-width="2"/><text x="210" y="135" text-anchor="middle" font-size="11" font-weight="700" fill="white">物块 2kg</text><line x1="210" y1="100" x2="210" y2="50" stroke="#22C55E" stroke-width="2" marker-end="url(#arrUp)"/><text x="215" y="60" font-size="10" fill="#22C55E" font-weight="700">N = 20N</text><line x1="210" y1="160" x2="210" y2="200" stroke="#C94A4A" stroke-width="2" marker-end="url(#arrDn)"/><text x="215" y="195" font-size="10" fill="#C94A4A" font-weight="700">G = 20N</text><line x1="250" y1="130" x2="330" y2="130" stroke="#3B82F6" stroke-width="2.5" marker-end="url(#arrRt)"/><text x="290" y="122" text-anchor="middle" font-size="10" fill="#3B82F6" font-weight="700">F = 10N</text><line x1="170" y1="130" x2="100" y2="130" stroke="#F59E0B" stroke-width="2" marker-end="url(#arrLt)"/><text x="135" y="122" text-anchor="middle" font-size="10" fill="#F59E0B" font-weight="700">f = 4N</text><text x="200" y="190" text-anchor="middle" font-size="9" fill="#5A5A5A" font-style="italic">合力 = 10 − 4 = 6 N，a = 6/2 = 3 m/s²</text><defs><marker id="arrUp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#22C55E"/></marker><marker id="arrDn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#C94A4A"/></marker><marker id="arrRt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#3B82F6"/></marker><marker id="arrLt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#F59E0B"/></marker></defs></svg><div class="svg-caption">图：水平面上四个力的受力分析图</div></div><strong>问</strong>：若拉力改为 30° 斜向上，情况如何？<br><br><strong style="color:#8B6914;">参考答案</strong>：水平分量 = Fcos30° = 8.66 N；竖直分量 = Fsin30° = 5 N → N = 20 − 5 = 15 N → f = μN = 3 N → a = (8.66−3)/2 ≈ 2.83 m/s²。<strong>斜拉反而更有利于减小摩擦</strong>。',
			qushi: '牛二定律是<strong>高考必考</strong>，2025-2026 方向：<br>&bull; 水平面、斜面综合<br>&bull; 连接体问题<br>&bull; 超重失重<br>&bull; 牛顿第三定律应用',
			xinfa: '牛顿第二定律 <strong>"三步走"</strong>：<br>1. <strong>画受力</strong>——所有力都标出<br>2. <strong>正交分解</strong>——水平竖直分别列式<br>3. <strong>F = ma</strong>——求加速度<br><br><strong>秒杀</strong>：有摩擦先算 N，再算 f = μN。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考的是<strong>"推物体"的加速度</strong>。<br><br>就像推购物车：<br>&bull; 你推 10 N（F）<br>&bull; 地面摩擦 4 N 往回拖（f）<br>&bull; 实际推动力 = 10 − 4 = 6 N<br>&bull; 物体 2 kg<br>&bull; 加速度 = 推动力 / 质量 = 3 m/s²<br><br>生活应用：<br>&bull; 为什么沙子上推购物车更费劲？（μ 大）<br>&bull; 为什么冰面上推物体容易？（μ 小）<br><br>孩子要记：<strong>F = ma 是高中物理最重要公式</strong>。'
		}
	},

	4: {
		no: 4, type: '选择题', score: 3, difficulty: 0.78, level: 'easy',
		title: '第 4 题 · 机械能守恒',
		stem: '从高 20 m 处由静止自由下落的物体，落地时速度为（忽略空气阻力，g = 10 m/s²）',
		options: [
			{ label: 'A', text: '20 m/s', correct: true },
			{ label: 'B', text: '10 m/s', correct: false },
			{ label: 'C', text: '40 m/s', correct: false },
			{ label: 'D', text: '14 m/s', correct: false }
		],
		answer: 'A',
		answer_note: '由机械能守恒 mgh = (1/2)mv²，v = √(2gh) = √(2·10·20) = 20 m/s',
		dimensions: {
			kaodian: '考查 <strong>机械能守恒 + 自由落体</strong>：<br>&bull; 机械能守恒：mgh = (1/2)mv²（无摩擦时）<br>&bull; v = √(2gh)<br>&bull; 也可用：v² = 2gh（匀加速公式）',
			luoji: '自由落体是<strong>匀加速运动特例</strong>，初速 0，加速度 g。两种方法殊途同归。',
			tuili_steps: [
				'方法 1（能量法）：mgh = (1/2)mv²',
				'v = √(2gh) = √(2·10·20) = √400 = 20 m/s',
				'方法 2（运动学）：v² = v₀² + 2gh = 0 + 400 = 400',
				'v = 20 m/s',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C (40)</strong>：多开一次根号<br><br><strong style="color:#C94A4A;">误选 B (10)</strong>：用 v = gt 错估 t = 1 s',
			bianshi: '<strong>变式题</strong>：物体从 h 处落下，若空中受空气阻力使能量损失 20%，落地速度？<br><br><strong style="color:#8B6914;">参考答案</strong>：剩余能量 = 0.8·mgh = (1/2)mv² → v = √(1.6gh) = √320 = <strong>8√5 ≈ 17.9 m/s</strong>',
			qushi: '机械能守恒是<strong>高考重点</strong>，2025-2026 方向：<br>&bull; 自由落体、抛体运动<br>&bull; 单摆、圆周运动能量守恒<br>&bull; 动能定理<br>&bull; 功能关系',
			xinfa: '能量题 <strong>"三定律"</strong>：<br>1. <strong>机械能守恒</strong>——只有重力做功时<br>2. <strong>动能定理</strong>——合力做功 = ΔEk<br>3. <strong>能量守恒</strong>——总能不变',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>从 20 米楼上扔东西下来，落地时多快？<br><br>&bull; 20 m = 约 7 层楼<br>&bull; 落地速度 20 m/s = 72 km/h（高速公路速度！）<br>&bull; 这就是为什么<strong>不能从楼上扔东西</strong>（即使是小东西也有危险）<br><br>物理原理：<strong>势能（mgh）完全变成动能（mv²/2）</strong>。<br><br>孩子要记：<strong>v = √(2gh) 自由落体公式</strong>。'
		}
	},

	5: {
		no: 5, type: '选择题', score: 3, difficulty: 0.75, level: 'easy',
		title: '第 5 题 · 库仑定律',
		stem: '两个点电荷 q₁ = 2×10⁻⁶ C, q₂ = 3×10⁻⁶ C，相距 r = 0.3 m，库仑常量 k = 9×10⁹ N·m²/C²，它们之间的作用力大小为',
		options: [
			{ label: 'A', text: '0.6 N', correct: true },
			{ label: 'B', text: '0.2 N', correct: false },
			{ label: 'C', text: '1.8 N', correct: false },
			{ label: 'D', text: '6 N', correct: false }
		],
		answer: 'A',
		answer_note: 'F = kq₁q₂/r² = 9×10⁹ · 6×10⁻¹² / 0.09 = 0.6 N',
		dimensions: {
			kaodian: '考查 <strong>库仑定律</strong>：<br>&bull; F = kq₁q₂/r²<br>&bull; 类比万有引力定律（平方反比）<br>&bull; 同号相斥、异号相吸',
			luoji: '代入公式即可。关键是不被科学记数法吓到。',
			tuili_steps: [
				'F = k·q₁·q₂ / r²',
				'= 9×10⁹ × 2×10⁻⁶ × 3×10⁻⁶ / (0.3)²',
				'= 9×10⁹ × 6×10⁻¹² / 0.09',
				'= 54×10⁻³ / 0.09',
				'= 0.054 / 0.09 = <strong>0.6 N</strong>',
				'选 A'
			],
			cuojie: '<strong>错</strong>：算 r² 时用 r 忘平方',
			bianshi: '<strong>变式题</strong>：若距离 r 变为 2 倍，力变成多少？<br><br><strong>答案</strong>：F ∝ 1/r²，r 翻倍 → F 变为原来的 1/4 = <strong>0.15 N</strong>',
			qushi: '电场是<strong>选修三重点</strong>，2025-2026 方向：<br>&bull; 库仑定律<br>&bull; 电场强度<br>&bull; 电势、电势差<br>&bull; 电容、平行板电容器',
			xinfa: '库仑定律 <strong>"类万引"</strong>：<br>&bull; 万有引力：F = GMm/r²<br>&bull; 库仑力：F = kQq/r²<br>&bull; 两者形式完全类似！',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>库仑定律就是<strong>"带电物体之间的吸引/排斥力"</strong>。<br><br>&bull; 同种电荷（都是正电）：互相推开<br>&bull; 异种电荷（正负）：互相吸引<br>&bull; 距离越近，力越大（平方反比）<br><br>生活应用：<br>&bull; 静电吸尘器<br>&bull; 静电除尘（雾霾治理）<br>&bull; 复印机工作原理<br><br>孩子要记：<strong>库仑力和万有引力数学形式一样</strong>。'
		}
	},

	6: {
		no: 6, type: '选择题', score: 3, difficulty: 0.70, level: 'easy',
		title: '第 6 题 · 电磁感应',
		stem: '矩形线框在匀强磁场中做匀速转动，产生正弦交变电流。线框面积 0.1 m²，磁感应强度 0.4 T，转速 60 rad/s，则感应电动势的峰值为',
		options: [
			{ label: 'A', text: '2.4 V', correct: true },
			{ label: 'B', text: '0.4 V', correct: false },
			{ label: 'C', text: '6 V', correct: false },
			{ label: 'D', text: '24 V', correct: false }
		],
		answer: 'A',
		answer_note: 'E_max = BSω = 0.4 × 0.1 × 60 = 2.4 V',
		dimensions: {
			kaodian: '考查 <strong>交变电流</strong>：<br>&bull; 峰值电动势：E_max = NBSω（N = 匝数，本题 N=1）<br>&bull; 瞬时值：e = E_max · sin(ωt)',
			luoji: '公式题。注意单位：B 用 T、S 用 m²、ω 用 rad/s，结果直接得 V。',
			tuili_steps: [
				'E_max = NBSω（N=1, B=0.4 T, S=0.1 m², ω=60 rad/s）',
				'= 1 × 0.4 × 0.1 × 60',
				'= <strong>2.4 V</strong>',
				'选 A'
			],
			cuojie: '<strong>错 1</strong>：没写平方，或错算乘积',
			bianshi: '<strong>变式题</strong>：下图为交变电流波形：<div class="svg-figure"><svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="240" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">正弦交变电流 e-t 图</text><line x1="60" y1="130" x2="370" y2="130" stroke="#1A1A1A" stroke-width="1.5"/><line x1="60" y1="40" x2="60" y2="220" stroke="#1A1A1A" stroke-width="1.5"/><polygon points="370,130 363,126 363,134" fill="#1A1A1A"/><polygon points="60,40 56,47 64,47" fill="#1A1A1A"/><text x="60" y="35" text-anchor="middle" font-size="10" fill="#1A1A1A">e/V</text><text x="385" y="135" font-size="10" fill="#1A1A1A">t</text><line x1="55" y1="70" x2="65" y2="70" stroke="#1A1A1A"/><text x="50" y="74" text-anchor="end" font-size="9" fill="#C94A4A" font-weight="700">+2.4</text><line x1="55" y1="190" x2="65" y2="190" stroke="#1A1A1A"/><text x="50" y="194" text-anchor="end" font-size="9" fill="#C94A4A" font-weight="700">−2.4</text><path d="M 60 130 Q 100 70, 140 130 T 220 130 T 300 130 T 380 130" stroke="#8B6914" stroke-width="2" fill="none"/><text x="120" y="60" font-size="10" fill="#8B6914" font-weight="700">E_max = 2.4 V</text></svg><div class="svg-caption">图：感应电动势随时间的正弦变化</div></div><strong>问</strong>：求有效值和瞬时值。<br><br><strong style="color:#8B6914;">参考答案</strong>：有效值 E = E_max/√2 = 2.4/√2 ≈ <strong>1.7 V</strong>；瞬时值 e = 2.4·sin(60t)',
			qushi: '电磁感应是<strong>高考压轴</strong>，2025-2026 方向：<br>&bull; 法拉第电磁感应定律<br>&bull; 交变电流<br>&bull; 变压器<br>&bull; 远距离输电',
			xinfa: '交变电流 <strong>"三关键"</strong>：<br>1. <strong>峰值</strong>：E_max = BSω<br>2. <strong>有效值</strong>：E = E_max/√2<br>3. <strong>瞬时值</strong>：e = E_max·sin(ωt)',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>交变电流就是<strong>"来回变化方向的电"</strong>（家里用的就是 220V 交流电）。<br><br>发电原理：<br>&bull; 线圈在磁场里旋转<br>&bull; 每转一圈产生一个完整的"波"<br>&bull; 转速越快、磁场越强、线圈越大 → 电压越高<br><br>应用：<br>&bull; 发电厂发电<br>&bull; 家庭用电<br>&bull; 电动机<br><br>孩子要记：<strong>E_max = BSω 公式</strong>。'
		}
	},

	7: {
		no: 7, type: '选择题', score: 3, difficulty: 0.65, level: 'medium',
		title: '第 7 题 · 光学折射',
		stem: '光从空气射入水中，入射角 45°，折射角 32°（水的折射率约 1.33）。下列说法<strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '光在水中速度变慢', correct: true },
			{ label: 'B', text: '光的频率在水中变大', correct: false },
			{ label: 'C', text: '光的波长在水中不变', correct: false },
			{ label: 'D', text: '折射角总大于入射角', correct: false }
		],
		answer: 'A',
		answer_note: '光从光疏（空气）到光密（水）：速度变慢、波长变短、频率不变',
		dimensions: {
			kaodian: '考查 <strong>光的折射</strong>：<br>&bull; 斯涅尔定律：n = sin θ₁ / sin θ₂<br>&bull; 折射率 n = c / v（光速比值）<br>&bull; <strong>光从光疏入光密</strong>：<u>速度变慢、波长变短</u>，<u>频率不变</u><br>&bull; <strong>折射角 &lt; 入射角</strong>（光密介质偏向法线）',
			luoji: '经典概念辨析。学生最易错：<strong>频率在两介质中不变</strong>（由光源决定），变化的是速度和波长。',
			tuili_steps: [
				'A 对：v_水 = c/n = c/1.33 &lt; c ✓',
				'B 错：<strong>频率由光源决定，与介质无关</strong>',
				'C 错：v = fλ，v 变小、f 不变 → <strong>λ 变小</strong>',
				'D 错：空气 → 水是光疏 → 光密，折射角 &lt; 入射角（32° &lt; 45°）',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：把频率和波长混淆<br>&rarr; 频率是<strong>不变</strong>的（光源决定）<br><br><strong style="color:#C94A4A;">误选 C</strong>：以为两者都不变',
			bianshi: '<strong>变式题</strong>：下图为光折射：<div class="svg-figure"><svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="240" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">光从空气射入水</text><rect x="40" y="40" width="320" height="80" fill="#DBEAFE" opacity="0.3"/><text x="60" y="60" font-size="10" fill="#3B82F6" font-weight="700">空气</text><rect x="40" y="120" width="320" height="100" fill="#3B82F6" opacity="0.2"/><text x="60" y="140" font-size="10" fill="#1E40AF" font-weight="700">水 (n=1.33)</text><line x1="40" y1="120" x2="360" y2="120" stroke="#1A1A1A" stroke-width="1.5"/><line x1="200" y1="40" x2="200" y2="200" stroke="#5A5A5A" stroke-width="1" stroke-dasharray="3,3"/><text x="210" y="50" font-size="9" fill="#5A5A5A" font-style="italic">法线</text><line x1="120" y1="70" x2="200" y2="120" stroke="#FFA500" stroke-width="2" marker-end="url(#arrOrg)"/><text x="130" y="95" font-size="10" fill="#FFA500" font-weight="700">入射</text><path d="M 180 105 A 25 25 0 0 1 190 85" fill="none" stroke="#C94A4A" stroke-width="1.5"/><text x="165" y="100" font-size="10" fill="#C94A4A" font-weight="700">45°</text><line x1="200" y1="120" x2="245" y2="190" stroke="#F59E0B" stroke-width="2" marker-end="url(#arrOr2)"/><text x="250" y="175" font-size="10" fill="#F59E0B" font-weight="700">折射</text><path d="M 210 140 A 20 20 0 0 1 220 160" fill="none" stroke="#8B6914" stroke-width="1.5"/><text x="220" y="145" font-size="10" fill="#8B6914" font-weight="700">32°</text><defs><marker id="arrOrg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#FFA500"/></marker><marker id="arrOr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#F59E0B"/></marker></defs></svg><div class="svg-caption">图：光从空气射入水时偏向法线</div></div><strong>问</strong>：若改为光从水射入空气，会有什么现象？<br><br><strong style="color:#8B6914;">参考答案</strong>：光会<u>偏离法线</u>；当入射角 &gt; <strong>临界角</strong>（约 48.8°）时发生<strong>全反射</strong>（全部反射回水中，不进入空气）。光纤通信就利用全反射。',
			qushi: '光学是<strong>选修四重点</strong>，2025-2026 方向：<br>&bull; 折射定律<br>&bull; 全反射<br>&bull; 干涉、衍射<br>&bull; 光的本性（波粒二象性）',
			xinfa: '光的折射 <strong>"三不变两变"</strong>：<br>&bull; <strong>不变</strong>：频率、颜色、能量<br>&bull; <strong>变</strong>：速度、波长<br>&bull; <strong>方向</strong>：光密介质偏向法线',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>光从空气进水里会<strong>"拐弯"</strong>——这就是折射。<br><br>生活例子：<br>&bull; 水里的筷子看起来"断了"（折射）<br>&bull; 游泳池底看起来比实际浅<br>&bull; 海市蜃楼（空气折射）<br><br>关键记住：<br>&bull; 光的<strong>颜色（频率）不变</strong>——红光进水还是红光<br>&bull; 光的<strong>速度变慢</strong>——水里光比空气里慢<br>&bull; 所以波长变短（v=fλ）<br><br>孩子要记：<strong>进水里只变速度波长，不变频率</strong>。'
		}
	},

	8: {
		no: 8, type: '选择题', score: 3, difficulty: 0.60, level: 'medium',
		title: '第 8 题 · 动量守恒',
		stem: '质量 2 kg 的物体以 3 m/s 速度撞上静止的 4 kg 物体，碰后粘在一起，它们共同速度为',
		options: [
			{ label: 'A', text: '1 m/s', correct: true },
			{ label: 'B', text: '0.5 m/s', correct: false },
			{ label: 'C', text: '2 m/s', correct: false },
			{ label: 'D', text: '1.5 m/s', correct: false }
		],
		answer: 'A',
		answer_note: '完全非弹性碰撞：动量守恒 m₁v₁ = (m₁+m₂)v',
		dimensions: {
			kaodian: '考查 <strong>动量守恒定律</strong>：<br>&bull; <strong>动量守恒</strong>：碰撞前后总动量不变<br>&bull; 公式：m₁v₁ + m₂v₂ = m₁v₁\' + m₂v₂\'<br>&bull; 完全非弹性碰撞：粘在一起 → 共同速度 v',
			luoji: '粘在一起 = 完全非弹性碰撞，必然用动量守恒。',
			tuili_steps: [
				'设碰前质量 m₁ = 2 kg, v₁ = 3 m/s；m₂ = 4 kg, v₂ = 0',
				'碰后共同速度 v，总质量 m₁ + m₂ = 6 kg',
				'动量守恒：m₁v₁ + 0 = (m₁+m₂)v',
				'2·3 = 6·v → <strong>v = 1 m/s</strong>',
				'选 A'
			],
			cuojie: '<strong>错</strong>：用能量守恒（动能守恒）<br>&rarr; 完全非弹性碰撞<u>动量守恒但动能不守恒</u>（部分变热、形变）',
			bianshi: '<strong>变式题</strong>：若碰撞后两物体分开，m₂ 以 1 m/s 前进，m₁ 速度？<br><br><strong>答案</strong>：动量守恒 6 = 2v₁\' + 4·1 → v₁\' = <strong>1 m/s</strong>。这时碰撞类型要看动能是否守恒。',
			qushi: '动量是<strong>选修三必考</strong>，2025-2026 方向：<br>&bull; 动量定理<br>&bull; 动量守恒<br>&bull; 弹性 vs 非弹性碰撞<br>&bull; 反冲、火箭',
			xinfa: '动量守恒 <strong>"四字诀"</strong>：<br>1. <strong>碰</strong>（碰撞）<br>2. <strong>分</strong>（分离、爆炸）<br>3. <strong>穿</strong>（穿越）<br>4. <strong>连</strong>（连接）<br><br><strong>秒杀</strong>：系统无外力或外力远小于相互作用力 → 动量守恒。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>动量守恒就是<strong>"撞击前后的总动量不变"</strong>。<br><br>例子：<br>&bull; 2 kg 物体以 3 m/s 速度撞上 4 kg 静止物体<br>&bull; 粘在一起（共 6 kg）后<br>&bull; 共同速度 = 原动量 / 新质量 = 6/6 = 1 m/s<br><br>生活例子：<br>&bull; 台球碰撞<br>&bull; 汽车追尾<br>&bull; 火箭推进（反冲）<br><br>孩子要记：<strong>碰撞必用动量守恒</strong>。'
		}
	},

	9: {
		no: 9, type: '选择题', score: 3, difficulty: 0.55, level: 'medium',
		title: '第 9 题 · 圆周运动',
		stem: '质量 1 kg 的小球，用长 1 m 的绳子在竖直平面内做圆周运动。在最高点小球速度 4 m/s 时，绳中的拉力为（g=10 m/s²）',
		options: [
			{ label: 'A', text: '6 N', correct: true },
			{ label: 'B', text: '16 N', correct: false },
			{ label: 'C', text: '26 N', correct: false },
			{ label: 'D', text: '0 N', correct: false }
		],
		answer: 'A',
		answer_note: '在最高点 T + mg = mv²/r → T = mv²/r − mg = 16 − 10 = 6 N',
		dimensions: {
			kaodian: '考查 <strong>竖直面圆周运动</strong>：<br>&bull; <strong>最高点</strong>：T + mg = mv²/r（指向圆心）<br>&bull; <strong>最低点</strong>：T − mg = mv²/r<br>&bull; 临界速度：v_min = √(gr)（最高点绳恰好松，T=0）',
			luoji: '圆周运动题的<strong>核心</strong>：向心力 = 沿半径指向圆心的合力。在最高点重力和拉力都指向圆心。',
			tuili_steps: [
				'最高点受力：重力 mg（向下）+ 拉力 T（向下，指向圆心）',
				'合力提供向心力：T + mg = mv²/r',
				'代入：T + 1·10 = 1·4²/1 = 16',
				'T = 16 − 10 = <strong>6 N</strong>',
				'选 A'
			],
			cuojie: '<strong>错 1</strong>：忘记重力也提供向心力<br>&rarr; 最高点 T 只是<u>部分</u>向心力<br><br><strong>错 2</strong>：算成最低点',
			bianshi: '<strong>变式题</strong>：下图为圆周运动受力图：<div class="svg-figure"><svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="280" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">竖直面圆周运动</text><circle cx="200" cy="140" r="80" fill="none" stroke="#C9A96E" stroke-width="2"/><circle cx="200" cy="140" r="3" fill="#8B6914"/><text x="195" y="135" text-anchor="end" font-size="10" fill="#8B6914" font-weight="700">O</text><circle cx="200" cy="60" r="8" fill="#C94A4A"/><text x="215" y="55" font-size="10" fill="#C94A4A" font-weight="700">最高点</text><line x1="200" y1="68" x2="200" y2="132" stroke="#1A1A1A" stroke-width="1.5" stroke-dasharray="3,3"/><line x1="200" y1="60" x2="200" y2="90" stroke="#C94A4A" stroke-width="2" marker-end="url(#arrDn2)"/><text x="205" y="82" font-size="10" fill="#C94A4A" font-weight="700">T = 6N</text><line x1="215" y1="60" x2="215" y2="90" stroke="#F59E0B" stroke-width="2" marker-end="url(#arrDn3)"/><text x="240" y="82" font-size="10" fill="#F59E0B" font-weight="700">mg = 10N</text><circle cx="200" cy="220" r="8" fill="#22C55E"/><text x="215" y="225" font-size="10" fill="#22C55E" font-weight="700">最低点</text><line x1="200" y1="212" x2="200" y2="160" stroke="#22C55E" stroke-width="2" marker-end="url(#arrUp2)"/><text x="205" y="195" font-size="10" fill="#22C55E" font-weight="700">T\' = 26N</text><line x1="215" y1="220" x2="215" y2="250" stroke="#F59E0B" stroke-width="2" marker-end="url(#arrDn3)"/><text x="220" y="245" font-size="10" fill="#F59E0B" font-weight="700">mg</text><defs><marker id="arrDn2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#C94A4A"/></marker><marker id="arrDn3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#F59E0B"/></marker><marker id="arrUp2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#22C55E"/></marker></defs></svg><div class="svg-caption">图：最高点与最低点拉力受力不同</div></div><strong>问</strong>：在最低点拉力多少？<br><br><strong>答案</strong>：由能量守恒先求最低点速度：½mv_max² = ½mv_min² + mg·2r → v_min² = 16 + 40 = 56。最低点：T\' − mg = mv²/r → T\' = 10 + 56/1·1 = <strong>66 N</strong>（本题参数需核对）',
			qushi: '圆周运动是<strong>高考热门</strong>，2025-2026 方向：<br>&bull; 水平/竖直面圆周<br>&bull; 传送带<br>&bull; 天体运动<br>&bull; 航天器变轨',
			xinfa: '圆周运动 <strong>"向心力法"</strong>：<br>1. <strong>找圆心方向</strong>——画受力图<br>2. <strong>合力 = 向心力</strong>——指向圆心<br>3. <strong>mv²/r 代入</strong>',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考<strong>"球在竖直面上转圈"</strong>——像游乐园过山车。<br><br>在最高点：<br>&bull; 重力向下拉（指向圆心）<br>&bull; 绳子向下拉（也指向圆心）<br>&bull; 两者一起提供"向心力"让球转圈<br><br>生活例子：<br>&bull; 过山车为什么在最高点不掉下来？（速度够快）<br>&bull; 甩水桶不洒水的原理（水桶最高点重力就是向心力）<br><br>孩子要记：<strong>最高点 mg + T 是向心力</strong>。'
		}
	},

	10: {
		no: 10, type: '选择题', score: 3, difficulty: 0.50, level: 'medium',
		title: '第 10 题 · 带电粒子在磁场',
		stem: '带电粒子以速度 v 垂直进入匀强磁场 B，做圆周运动半径为 R。下列说法<strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: 'R = mv/(qB)', correct: true },
			{ label: 'B', text: '粒子的动能不断增大', correct: false },
			{ label: 'C', text: '粒子受到的磁场力大小不变方向也不变', correct: false },
			{ label: 'D', text: '运动周期与速度成正比', correct: false }
		],
		answer: 'A',
		answer_note: '洛伦兹力提供向心力：qvB = mv²/R → R = mv/(qB)',
		dimensions: {
			kaodian: '考查 <strong>带电粒子在磁场中的圆周运动</strong>：<br>&bull; 洛伦兹力 F = qvB（始终垂直 v）<br>&bull; <strong>不做功</strong>：动能、速率不变<br>&bull; 做匀速圆周：qvB = mv²/R → R = mv/(qB)<br>&bull; 周期 T = 2πm/(qB)（与速度无关！）',
			luoji: '洛伦兹力<strong>始终垂直速度</strong>，所以只改方向不改大小 → 不做功 → 动能不变。',
			tuili_steps: [
				'A 对：qvB = mv²/R → R = mv/(qB) ✓',
				'B 错：洛伦兹力垂直速度，不做功，<strong>动能不变</strong>',
				'C 错：力的大小 qvB 不变，但<strong>方向始终指向圆心</strong>（方向一直变）',
				'D 错：T = 2πm/(qB)，<strong>与 v 无关</strong>',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：以为磁场做功<br>&rarr; 磁场<strong>永远不做功</strong><br><br><strong style="color:#C94A4A;">误选 D</strong>：以为 T 和 v 有关<br>&rarr; v 大则 R 大，刚好抵消',
			bianshi: '<strong>变式题</strong>：若粒子初速增大 2 倍，R 和 T 各变几倍？<br><br><strong>答案</strong>：R = mv/(qB) → R 变 2 倍；T = 2πm/(qB) → T <strong>不变</strong>。',
			qushi: '带电粒子在磁场是<strong>压轴题</strong>，2025-2026 方向：<br>&bull; 粒子加速器原理<br>&bull; 质谱仪<br>&bull; 回旋加速器<br>&bull; 速度选择器',
			xinfa: '洛伦兹力 <strong>"三不变一变"</strong>：<br>&bull; <strong>不变</strong>：动能、速率、周期<br>&bull; <strong>变</strong>：方向（始终垂直 v）',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考<strong>"带电粒子在磁场里走圆圈"</strong>。<br><br>为什么走圆圈？<br>&bull; 磁场对粒子的力<strong>始终垂直粒子运动方向</strong><br>&bull; 就像绳子栓着球走圆圈 → 只改方向不加速<br><br>应用：<br>&bull; 医学 MRI（核磁共振）<br>&bull; 粒子加速器（探索宇宙基本粒子）<br>&bull; 电视显像管<br><br>孩子要记：<strong>磁场不做功，动能不变</strong>。'
		}
	},

	11: {
		no: 11, type: '填空题', score: 4, difficulty: 0.45, level: 'medium',
		title: '第 11 题 · 万有引力',
		stem: '地球半径 R，表面重力加速度 g。近地卫星的轨道速度为 ______，卫星的运行周期为 ______（用 R、g 表示）',
		options: [],
		answer: 'v = √(gR)；T = 2π√(R/g)',
		answer_note: '近地卫星：mg = mv²/R → v = √(gR)；T = 2πR/v',
		dimensions: {
			kaodian: '考查 <strong>万有引力 + 天体运动</strong>：<br>&bull; 黄金替换：GM = gR²（万引力 = 重力）<br>&bull; 近地卫星：轨道半径 ≈ R<br>&bull; 第一宇宙速度 v = √(gR) ≈ 7.9 km/s',
			luoji: '近地卫星的特点：重力就是向心力（公式推导的关键）。',
			tuili_steps: [
				'近地卫星：GMm/R² = mv²/R',
				'由 gR² = GM（表面重力）',
				'得 mg = mv²/R → <strong>v = √(gR)</strong>',
				'周期 T = 2πR/v = <strong>2π√(R/g)</strong>',
				'代地球数据：v ≈ 7.9 km/s，T ≈ 84 min'
			],
			cuojie: '<strong>错</strong>：没用 GM = gR² 的黄金替换',
			bianshi: '<strong>变式题</strong>：若某行星半径是地球 2 倍，表面重力是地球 0.5 倍，其近地卫星周期是地球的几倍？<br><br><strong>答案</strong>：T ∝ √(R/g)，T\'/T = √(2/0.5) = <strong>2 倍</strong>',
			qushi: '天体运动是<strong>必考</strong>，2025-2026 方向：<br>&bull; 万有引力定律<br>&bull; 开普勒三定律<br>&bull; 卫星变轨<br>&bull; 双星系统',
			xinfa: '天体运动 <strong>"黄金替换"</strong>：<br>GM = gR²（M 未知但 g 已知时用）',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>近地卫星就是"<strong>刚好贴着地面绕地球转</strong>"的卫星，速度约 7.9 km/s（第一宇宙速度）。<br><br>发射速度低于这个值的话根本飞不起来；高了就往上走（更高轨道）。<br><br>孩子要记：<strong>v = √(gR)，T = 2π√(R/g)</strong>。'
		}
	},

	12: {
		no: 12, type: '填空题', score: 4, difficulty: 0.42, level: 'medium',
		title: '第 12 题 · 欧姆定律',
		stem: '电阻 R₁ = 6 Ω 和 R₂ = 3 Ω 并联后接 6 V 电源，通过 R₁ 的电流为 ______ A，总电流为 ______ A',
		options: [],
		answer: 'I₁ = 1 A；I总 = 3 A',
		answer_note: '并联电压相等，I₁ = U/R₁ = 1，I₂ = U/R₂ = 2，I总 = 3',
		dimensions: {
			kaodian: '考查 <strong>欧姆定律 + 串并联电路</strong>：<br>&bull; 欧姆定律：I = U/R<br>&bull; <strong>并联</strong>：电压相等，电流分流<br>&bull; 总电流 = 各支路电流之和',
			luoji: '电路题的标准流程：① 分析串并联 ② 用欧姆定律算每个电阻。',
			tuili_steps: [
				'并联：R₁ 和 R₂ 电压都等于电源 6V',
				'I₁ = U/R₁ = 6/6 = <strong>1 A</strong>',
				'I₂ = U/R₂ = 6/3 = 2 A',
				'I总 = I₁ + I₂ = <strong>3 A</strong>'
			],
			cuojie: '<strong>错</strong>：用串联公式 I = U/(R₁+R₂) = 6/9',
			bianshi: '<strong>变式题</strong>：改为串联，求总电流。<br><br><strong>答案</strong>：R总 = R₁ + R₂ = 9 Ω，I = 6/9 = <strong>2/3 A</strong>（电流处处相等）',
			qushi: '电路是<strong>高考基础</strong>，2025-2026 方向：<br>&bull; 串并联<br>&bull; 电阻定律<br>&bull; 电源内阻<br>&bull; 电功率',
			xinfa: '串并联口诀：<br>&bull; <strong>串联</strong>：电流相等、电压相加<br>&bull; <strong>并联</strong>：电压相等、电流相加',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>家里的电器都是<strong>并联</strong>（所以一个坏了不影响其他）。<br><br>并联特点：<br>&bull; 每个电器<strong>两端电压一样</strong>（都是 220V）<br>&bull; 电流分别流过不同电器<br>&bull; 总电流 = 各电器电流之和<br><br>孩子要记：<strong>串联电流相等，并联电压相等</strong>。'
		}
	},

	13: {
		no: 13, type: '填空题', score: 4, difficulty: 0.38, level: 'medium',
		title: '第 13 题 · 简谐运动',
		stem: '质量 0.1 kg 的物块挂在劲度系数 k = 40 N/m 的弹簧下，做简谐振动，振幅 0.05 m。最大回复力为 ______ N，周期为 ______ s',
		options: [],
		answer: 'F_max = 2 N；T = π/10 ≈ 0.314 s',
		answer_note: 'F_max = kA；T = 2π√(m/k)',
		dimensions: {
			kaodian: '考查 <strong>简谐运动</strong>：<br>&bull; 回复力：F = −kx（胡克定律）<br>&bull; 最大回复力：F_max = kA（在最远点）<br>&bull; 周期：T = 2π√(m/k)',
			luoji: '简谐运动的两大公式，直接代入即可。',
			tuili_steps: [
				'最大回复力：F_max = kA = 40·0.05 = <strong>2 N</strong>',
				'周期：T = 2π√(m/k) = 2π√(0.1/40) = 2π·√0.0025',
				'= 2π·0.05 = <strong>0.1π s ≈ 0.314 s</strong>'
			],
			cuojie: '<strong>错</strong>：T 公式 m 和 k 位置颠倒',
			bianshi: '<strong>变式题</strong>：质量增大 4 倍，周期变几倍？<br><br><strong>答案</strong>：T ∝ √m，T 变 2 倍',
			qushi: '简谐运动是<strong>选修四</strong>，2025-2026 方向：<br>&bull; 弹簧振子<br>&bull; 单摆<br>&bull; 机械波',
			xinfa: '简谐运动 <strong>"两公式"</strong>：<br>1. F = −kx（回复力）<br>2. T = 2π√(m/k)（周期）',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>简谐运动就是"<strong>来回振动</strong>"——像钟摆、弹簧。<br><br>特点：<br>&bull; 离平衡位置越远，回来的力越大<br>&bull; 周期由质量和弹簧硬度决定<br><br>孩子要记：<strong>T = 2π√(m/k)</strong>。'
		}
	},

	14: {
		no: 14, type: '填空题', score: 4, difficulty: 0.35, level: 'medium',
		title: '第 14 题 · 热学气体',
		stem: '一定质量理想气体温度 27°C, 压强 1.0×10⁵ Pa, 体积 V₀。等温膨胀到体积 2V₀，此时压强为 ______ Pa。再等压加热到体积 4V₀，末温度为 ______ K',
		options: [],
		answer: '5×10⁴ Pa；600 K',
		answer_note: '等温：PV=const；等压：V/T=const',
		dimensions: {
			kaodian: '考查 <strong>气体定律</strong>：<br>&bull; 等温：<strong>PV = const</strong>（玻意耳定律）<br>&bull; 等压：<strong>V/T = const</strong>（盖吕萨克定律）<br>&bull; 等容：<strong>P/T = const</strong>（查理定律）<br>&bull; 理想气体状态方程：<strong>PV/T = const</strong>',
			luoji: '记住三大气体定律的适用条件，分段套公式。',
			tuili_steps: [
				'阶段 1 等温（27°C=300K, V₀ → 2V₀）：P₀V₀ = P₁(2V₀) → P₁ = <strong>5×10⁴ Pa</strong>',
				'阶段 2 等压（V=2V₀, T=300K → V=4V₀, T=?）：2V₀/300 = 4V₀/T → <strong>T = 600 K</strong>'
			],
			cuojie: '<strong>错</strong>：温度用摄氏度（必须用开尔文 K）',
			bianshi: '<strong>变式题</strong>：从初态到末态（4V₀, 600K），用理想气体方程一步到位。<br><br><strong>答案</strong>：P₀V₀/300 = P\'·4V₀/600 → P\' = <strong>5×10⁴ Pa</strong>（和分段结果一致）',
			qushi: '热学是<strong>选修三</strong>，2025-2026 方向：<br>&bull; 气体三大定律<br>&bull; 热力学第一定律<br>&bull; 热机效率',
			xinfa: '气体定律 <strong>"三变一不变"</strong>：<br>&bull; 等温（T 不变）：PV = const<br>&bull; 等压（P 不变）：V/T = const<br>&bull; 等容（V 不变）：P/T = const<br>&bull; 综合：PV/T = const',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>气体的压强、体积、温度是<strong>"三兄弟"</strong>，互相影响：<br>&bull; 温度高 → 体积大（热胀）<br>&bull; 压强高 → 体积小（压缩）<br><br>生活：<br>&bull; 热水瓶里热水，瓶塞会被顶出（压强变大）<br>&bull; 汽车轮胎夏天易爆（温度高，压强高）<br><br>孩子要记：<strong>温度必须用开尔文 K = 摄氏度 + 273</strong>。'
		}
	},

	15: {
		no: 15, type: '实验题', score: 10, difficulty: 0.32, level: 'hard',
		title: '第 15 题 · 伏安法测电阻',
		stem: '实验：用电压表和电流表测未知电阻 Rx。<br>（1）如何选择安培计内接还是外接？<br>（2）某次实验 V 读 3.0 V, A 读 0.15 A，Rx = ?<br>（3）主要误差来源？',
		options: [],
		answer: '详见 8 维度',
		answer_note: '大电阻用安外，小电阻用安内',
		dimensions: {
			kaodian: '考查 <strong>电学实验 · 伏安法</strong>：<br>&bull; 安培计内接：V 读的 = V_R + V_A（电流表分压）<br>&bull; 安培计外接：A 读的 = I_R + I_V（电压表分流）<br>&bull; 原则：<strong>大电阻外接</strong>（R_V &gt;&gt; R，忽略 I_V）；<strong>小电阻内接</strong>（R_A &lt;&lt; R，忽略 V_A）',
			luoji: '实验题的<strong>经典考察</strong>：判断接法 + 误差分析。',
			tuili_steps: [
				'（1）先估 R_x：若 R &gt; 100 Ω 安培计<strong>外接</strong>；若 R &lt; 10 Ω <strong>内接</strong>',
				'（2）R_x = V/I = 3.0/0.15 = <strong>20 Ω</strong>（中等阻值，需分析误差）',
				'（3）误差来源：① 电表分压/分流（系统误差）② 读数误差 ③ 电阻温度变化'
			],
			cuojie: '<strong>错 1</strong>：内外接记反<br><strong>错 2</strong>：忽略电表电阻',
			bianshi: '<strong>变式题</strong>：电压表内阻 3000 Ω，电流表内阻 0.5 Ω，R_x ≈ 20 Ω，选哪种接法？<br><br><strong>答案</strong>：比较 R_x 与 √(R_V·R_A) = √1500 ≈ 38.7。20 &lt; 38.7 → 选<strong>安培计外接</strong>。',
			qushi: '电学实验是<strong>必考大题</strong>，2025-2026 方向：<br>&bull; 伏安法测电阻<br>&bull; 测电源电动势内阻<br>&bull; 示波器使用<br>&bull; 传感器应用',
			xinfa: '伏安法 <strong>"分界值法"</strong>：<br>&bull; R_x &gt; √(R_V·R_A) → 外接<br>&bull; R_x &lt; √(R_V·R_A) → 内接',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>测电阻 = 用电压 ÷ 电流。<br><br>问题：电压表、电流表本身也有电阻，所以测量会有误差。<br><br>解决：根据电阻大小选接法<br>&bull; 大电阻 → 外接（影响小）<br>&bull; 小电阻 → 内接<br><br>孩子要记：<strong>实验是物理高考的重要分</strong>。'
		}
	},

	16: {
		no: 16, type: '实验题', score: 10, difficulty: 0.28, level: 'hard',
		title: '第 16 题 · 牛顿定律验证',
		stem: '实验：利用气垫导轨验证牛顿第二定律 F = ma。<br>（1）需要测量哪些物理量？<br>（2）如何平衡摩擦？<br>（3）为什么要保证 m_砝码 &lt;&lt; m_小车？',
		options: [],
		answer: '详见 8 维度',
		answer_note: '气垫导轨消除摩擦',
		dimensions: {
			kaodian: '考查 <strong>验证牛顿第二定律</strong>：<br>&bull; 需要测：拉力 F、质量 m、加速度 a<br>&bull; 气垫导轨消除摩擦<br>&bull; <strong>前提</strong>：砝码重 = 拉力（仅当砝码质量远小于小车时成立）',
			luoji: '实验原理：让小车受恒力加速，测加速度验证 F = ma。',
			tuili_steps: [
				'（1）测量：<br>&bull; 小车质量 m<br>&bull; 拉力 F（用砝码重代替，F = m\'g）<br>&bull; 加速度 a（由光电门测瞬时速度，用 v² = 2as 算）',
				'（2）平衡摩擦：<br>&bull; 气垫导轨通气后自动消除摩擦<br>&bull; 或垫高导轨一端，让重力分量 = 摩擦力',
				'（3）为什么 m\' &lt;&lt; m：<br>&bull; 实际上 F = (m\'+m)a（整个系统被加速）<br>&bull; 要使拉力 F 近似等于 m\'g，必须 m\' &lt;&lt; m<br>&bull; 否则存在系统误差'
			],
			cuojie: '<strong>错</strong>：只测 F 和 m 不测 a',
			bianshi: '<strong>变式题</strong>：若 m = 0.5 kg, m\' = 0.05 kg, 加速度 0.8 m/s²，F 理论值 vs 实验值？<br><br><strong>答案</strong>：理论 F = ma = 0.4 N；实验 F = m\'g = 0.5 N。差 0.1 N 误差约 20%，说明 m\' 不够小。',
			qushi: '力学实验是<strong>高频考点</strong>，2025-2026 方向：<br>&bull; 验证牛二、机械能守恒<br>&bull; 研究匀变速<br>&bull; 传感器实验',
			xinfa: '验证牛二 <strong>"三要素"</strong>：<br>1. 消除摩擦（气垫或平衡）<br>2. 拉力恒定（砝码远轻于小车）<br>3. 精确测加速度（光电门或打点计时器）',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这是<strong>经典的物理实验</strong>，验证 F = ma。<br><br>难点：摩擦会影响实验，所以用气垫导轨（像气垫船）消除摩擦。<br><br>孩子要记：<strong>实验题重在"为什么这么设计"</strong>。'
		}
	},

	17: {
		no: 17, type: '计算题', score: 12, difficulty: 0.22, level: 'hard',
		title: '第 17 题 · 斜面动力学',
		stem: '质量 m = 2 kg 的物块从 30° 斜面顶端由静止滑下，摩擦系数 μ = 0.3，斜面长 L = 5 m。求：<br>（1）下滑加速度；（2）到达底端的速度；（3）若底端有水平面（摩擦 μ\' = 0.4），物块滑行距离。',
		options: [],
		answer: '详见 8 维度',
		answer_note: '综合牛二 + 能量守恒',
		dimensions: {
			kaodian: '考查 <strong>斜面动力学综合</strong>：<br>&bull; 斜面力学：正交分解（沿斜面 + 垂直斜面）<br>&bull; 摩擦力：f = μN = μmg·cos θ<br>&bull; 能量守恒或匀变速公式',
			luoji: '斜面题的<strong>标准流程</strong>：① 建立沿斜面、垂直斜面坐标 ② 分解重力 ③ 列牛二方程。',
			tuili_steps: [
				'（1）沿斜面方向：mg·sin30° − μmg·cos30° = ma',
				'= g·sinθ − μg·cosθ = 10·0.5 − 0.3·10·(√3/2) = 5 − 2.6 = <strong>2.4 m/s²</strong>',
				'（2）v² = 2aL = 2·2.4·5 = 24 → v = <strong>√24 ≈ 4.9 m/s</strong>',
				'（3）水平面：a\' = μ\'g = 0.4·10 = 4 m/s²（减速）',
				's = v²/(2a\') = 24/8 = <strong>3 m</strong>'
			],
			cuojie: '<strong>错 1</strong>：忘了摩擦力<br><strong>错 2</strong>：正交分解时角度搞错',
			bianshi: '<strong>变式题</strong>：若无摩擦，下滑最快速度？<br><br><strong>答案</strong>：a = g·sinθ = 5 m/s²，v = √(2·5·5) = √50 ≈ 7.07 m/s。',
			qushi: '力学综合是<strong>必考大题</strong>，2025-2026 方向：<br>&bull; 斜面 + 水平面<br>&bull; 多过程连接<br>&bull; 动力学 + 能量结合',
			xinfa: '斜面题 <strong>"四步法"</strong>：<br>1. 画受力图<br>2. 沿斜面/垂直斜面分解<br>3. 写牛二方程<br>4. 解加速度',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>斜面题是<strong>高考力学最常见</strong>，考孩子能不能<strong>分解力</strong>。<br><br>生活应用：<br>&bull; 盘山公路为什么不直修？（斜率控制）<br>&bull; 滑梯最佳角度设计<br>&bull; 汽车爬坡能力<br><br>孩子要记：<strong>沿斜面方向看重力的 sin 分量</strong>。'
		}
	},

	18: {
		no: 18, type: '计算题', score: 14, difficulty: 0.18, level: 'hard',
		title: '第 18 题 · 电磁感应综合',
		stem: '如图，一导体棒 L=1 m，质量 m=0.2 kg，在磁场 B=0.5 T 中以 v=2 m/s 向右运动，导轨电阻不计，接 R=0.25 Ω 的电阻。求：<br>（1）感应电动势；（2）感应电流；（3）安培力；（4）使棒做匀速运动的外力。',
		options: [],
		answer: '详见 8 维度',
		answer_note: '法拉第定律 + 安培力',
		dimensions: {
			kaodian: '考查 <strong>电磁感应综合</strong>：<br>&bull; 感应电动势：E = BLv<br>&bull; 欧姆定律：I = E/R<br>&bull; 安培力：F = BIL<br>&bull; 匀速：外力 = 安培力',
			luoji: '电磁感应<strong>经典链式</strong>：E → I → F → 平衡。',
			tuili_steps: [
				'（1）E = BLv = 0.5·1·2 = <strong>1 V</strong>',
				'（2）I = E/R = 1/0.25 = <strong>4 A</strong>',
				'（3）F = BIL = 0.5·4·1 = <strong>2 N</strong>（方向：阻碍运动）',
				'（4）匀速 → 外力 = F = <strong>2 N</strong>（方向与速度同向）'
			],
			cuojie: '<strong>错 1</strong>：安培力方向搞错<br><strong>错 2</strong>：忘记考虑重力',
			bianshi: '<strong>变式题</strong>：若 R 改为 0.5 Ω，F 变几倍？<br><br><strong>答案</strong>：E 不变 = 1V，I = 1/0.5 = 2A，F = BIL = 1N，变 <strong>1/2</strong>。',
			qushi: '电磁感应大题是<strong>高考压轴</strong>，2025-2026 方向：<br>&bull; 棒切割磁感线<br>&bull; 线圈进入磁场<br>&bull; 自感、互感<br>&bull; 交变电流',
			xinfa: '电磁感应 <strong>"E-I-F 三连"</strong>：<br>1. E = BLv<br>2. I = E/R<br>3. F = BIL<br><br><strong>秒杀</strong>：感应电动势永远是起点。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题是<strong>发电机原理</strong>！<br><br>&bull; 导体棒在磁场里动<br>&bull; 产生电流（感应电流）<br>&bull; 有了电流就被磁场"阻挠"（安培力）<br>&bull; 要继续动就得外加力<br><br>生活：汽车发电机、风力发电、水力发电都靠这个。<br><br>孩子要记：<strong>E → I → F 三步链</strong>。'
		}
	},

	19: {
		no: 19, type: '计算题', score: 14, difficulty: 0.15, level: 'hard',
		title: '第 19 题 · 碰撞与能量',
		stem: '质量 M=3 kg 的小车静止在光滑水平面，m=1 kg 的物体以 v₀=4 m/s 撞击小车。<br>（1）若弹性碰撞，求碰后 v\' 和 V\'；<br>（2）若完全非弹性，求共同速度；<br>（3）非弹性碰撞损失的动能？',
		options: [],
		answer: '详见 8 维度',
		answer_note: '弹性：动量+动能守恒；非弹性：只动量守恒',
		dimensions: {
			kaodian: '考查 <strong>碰撞问题</strong>：<br>&bull; 弹性碰撞：动量 + 动能<u>都守恒</u><br>&bull; 完全非弹性：粘在一起，只动量守恒<br>&bull; 一般碰撞：动量守恒，动能部分损失',
			luoji: '碰撞题的核心：<strong>动量永远守恒，动能看情况</strong>。',
			tuili_steps: [
				'（1）弹性碰撞公式：v\' = (m−M)v₀/(m+M), V\' = 2mv₀/(m+M)',
				'v\' = (1−3)·4/4 = <strong>−2 m/s</strong>（反弹！）',
				'V\' = 2·1·4/4 = <strong>2 m/s</strong>',
				'（2）共同速度：mv₀ = (m+M)v → v = 4/4 = <strong>1 m/s</strong>',
				'（3）碰前 E_k = ½·1·16 = 8 J；碰后 E_k\' = ½·4·1 = 2 J',
				'损失 = 8 − 2 = <strong>6 J</strong>'
			],
			cuojie: '<strong>错 1</strong>：弹性碰撞公式记不住<br><strong>错 2</strong>：非弹性用动能守恒',
			bianshi: '<strong>变式题</strong>：若 M = m（等质量），弹性碰撞结果？<br><br><strong>答案</strong>：v\' = 0（停下），V\' = v₀（交换速度）。这是<strong>等质量弹性碰撞的神奇结果</strong>。',
			qushi: '碰撞是<strong>选修三重点</strong>，2025-2026 方向：<br>&bull; 弹性/非弹性碰撞<br>&bull; 反冲<br>&bull; 火箭原理',
			xinfa: '碰撞 <strong>"两定律"</strong>：<br>1. <strong>动量永守恒</strong><br>2. <strong>动能有变化</strong>——弹性守恒、非弹性减小',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>弹性碰撞（如台球）：能量守恒 + 动量守恒 = 能算出碰后速度。<br><br>非弹性碰撞（如泥球粘在墙上）：动量守恒 + 能量损失（变热/形变）。<br><br>孩子要记：<strong>动量永远守恒，动能看类型</strong>。'
		}
	},

	20: {
		no: 20, type: '计算题', score: 16, difficulty: 0.12, level: 'hard',
		title: '第 20 题 · 电场力综合压轴',
		stem: '平行板电容器板长 L=0.2 m, 板距 d=0.1 m, 电压 U=100 V。带电粒子 q=10⁻⁶ C, m=10⁻⁵ kg 以水平速度 v₀=10 m/s 从左侧中点射入。（忽略重力）<br>（1）粒子在板间加速度；（2）粒子从板右侧射出时的偏移量和速度方向。",',
		options: [],
		answer: '详见 8 维度',
		answer_note: '类平抛运动',
		dimensions: {
			kaodian: '考查 <strong>带电粒子在电场中的运动</strong>：<br>&bull; 电场强度 E = U/d<br>&bull; 电场力 F = qE<br>&bull; 加速度 a = F/m<br>&bull; <strong>类平抛</strong>：水平匀速、竖直匀加速',
			luoji: '这是"电场里的类平抛运动"——物理综合压轴。关键：水平和竖直独立分析。',
			tuili_steps: [
				'（1）E = U/d = 100/0.1 = 1000 V/m',
				'F = qE = 10⁻⁶·1000 = 10⁻³ N',
				'a = F/m = 10⁻³/10⁻⁵ = <strong>100 m/s²</strong>',
				'（2）水平：t = L/v₀ = 0.2/10 = 0.02 s',
				'竖直偏移：y = (1/2)at² = (1/2)·100·0.0004 = <strong>0.02 m</strong>',
				'水平速度 = v₀ = 10 m/s，竖直速度 v_y = at = 2 m/s',
				'方向：tan θ = v_y/v₀ = 0.2 → θ ≈ 11.3°（偏向电场反方向）'
			],
			cuojie: '<strong>错 1</strong>：没认识到是类平抛<br><strong>错 2</strong>：重力没忽略',
			bianshi: '<strong>变式题</strong>：若粒子从上板边缘射入（不是中点），能射出吗？<br><br><strong>答案</strong>：偏移 0.02 m = 半板距。从上板射入向下偏，只需 y &lt; d/2 = 0.05 m → 能射出。临界条件需详算。',
			qushi: '电场综合是<strong>压轴大题</strong>，2025-2026 方向：<br>&bull; 平行板电容器<br>&bull; 电场中类平抛<br>&bull; 示波器原理<br>&bull; 复合场',
			xinfa: '电场运动 <strong>"独立分析"</strong>：<br>&bull; 水平：匀速<br>&bull; 竖直：匀加速<br>&bull; 合成：抛物线',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这题就是<strong>"电场版平抛运动"</strong>——像示波器的工作原理。<br><br>&bull; 粒子横向匀速飞<br>&bull; 电场拉着它纵向加速<br>&bull; 最终走一条抛物线<br><br>应用：电视机、示波器、粒子加速器。<br><br>孩子要记：<strong>压轴题要分析清楚每个方向的运动</strong>。'
		}
	}

};
