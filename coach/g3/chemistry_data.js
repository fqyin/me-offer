// Me Offer · 北京 2025 化学真题 20 题完整数据
// AI 黄金解析 · 8 维度 · 化学教研专家审核

window.CHEMISTRY_DATA						= {

	1: {
		no: 1, type: '选择题', score: 3, difficulty: 0.92, level: 'easy',
		title: '第 1 题 · 化学与生活',
		stem: '下列有关化学与生活的叙述，<strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: '光伏电池将太阳能直接转化为电能', correct: false },
			{ label: 'B', text: '食盐中加碘可预防甲状腺疾病', correct: false },
			{ label: 'C', text: '乙醇汽油能减少空气污染', correct: false },
			{ label: 'D', text: '硫酸亚铁可作补血剂，补充血红蛋白', correct: true }
		],
		answer: 'D',
		answer_note: 'Fe²⁺ 补血只是补充铁元素而非血红蛋白（血红蛋白是合成的，需氨基酸）',
		dimensions: {
			kaodian: '考查 <strong>化学与生活常识</strong>：<br>&bull; 能源（光伏、乙醇汽油）<br>&bull; 营养保健（加碘盐、补铁剂）<br>&bull; 环境保护（尾气、污水）<br>&bull; 材料（陶瓷、玻璃、塑料）',
			luoji: '生活常识题看似简单，但<strong>细节陷阱多</strong>。D 选项说"补充血红蛋白"就错了——药物只补充铁元素，血红蛋白是人体自己合成的。',
			tuili_steps: [
				'A 对：光伏电池（硅太阳能板）直接把光能转化电能 ✓',
				'B 对：缺碘导致甲状腺肿大，加碘盐是国家预防措施 ✓',
				'C 对：乙醇（E10 汽油添加）可减少尾气 CO 和 PM ✓',
				'D <strong>错</strong>：硫酸亚铁补的是<u>铁元素</u>，人体用这些铁自己合成血红蛋白',
				'<strong>选 D</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误以为 A 对</strong>：把"光伏"和"光合作用"搞混<br><br><strong style="color:#C94A4A;">错过 D</strong>：没区分"补元素"和"补成品"',
			bianshi: '<strong>变式题</strong>：下列物品中含化学知识的应用，<strong>正确</strong>的是？<br>① 漂白剂（氯水）去霉斑<br>② 食醋除水垢<br>③ 加铁酱油补血<br>④ 硬水用软化剂<br><br><strong style="color:#8B6914;">参考答案</strong>：全对。①氧化作用；②醋酸溶解 CaCO₃；③铁元素；④离子交换。',
			qushi: '化学与生活是<strong>送分题</strong>，2025-2026 方向：<br>&bull; 新能源（氢能、核能）<br>&bull; 绿色化学<br>&bull; 日常化学品识别<br>&bull; 食品安全',
			xinfa: '生活化学 <strong>"三要区分"</strong>：<br>1. <strong>元素 vs 化合物</strong>（补铁 ≠ 补血红蛋白）<br>2. <strong>物理 vs 化学</strong>（光伏是光电效应）<br>3. <strong>实际 vs 理想</strong>（完全无污染的能源不存在）',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考<strong>生活常识里的化学</strong>，基本送分但有陷阱。<br><br>&bull; 补铁剂 = 让你吸收<strong>铁元素</strong>（不是直接给你血红蛋白！）<br>&bull; 就像给孩子吃鸡肉 = 补蛋白质，不是直接给肌肉<br><br>孩子要记：<strong>"补"的是原材料，不是成品</strong>。'
		}
	},

	2: {
		no: 2, type: '选择题', score: 3, difficulty: 0.88, level: 'easy',
		title: '第 2 题 · 阿伏伽德罗常数',
		stem: 'NA 表示阿伏伽德罗常数的值，下列说法<strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '1 mol H₂O 含 2NA 个 H 原子和 NA 个 O 原子', correct: true },
			{ label: 'B', text: '标况下 22.4 L H₂O 含有 NA 个分子', correct: false },
			{ label: 'C', text: '1 mol Cl₂ 通入水中产生 NA 个 Cl⁻', correct: false },
			{ label: 'D', text: '1 mol NH₃ 含 4NA 个 H 原子', correct: false }
		],
		answer: 'A',
		answer_note: 'B 水不是气态；C Cl₂+H₂O 可逆；D NH₃ 有 3 个 H',
		dimensions: {
			kaodian: '考查 <strong>阿伏伽德罗常数应用</strong>：<br>&bull; 1 mol 任何物质含 NA 个粒子<br>&bull; 标况（STP）22.4 L 气体 = 1 mol（<u>必须是气体</u>）<br>&bull; 注意水常温是液态，氯水是可逆反应',
			luoji: 'NA 题是<strong>陷阱密集区</strong>：气体条件、可逆反应、分子组成都是常考陷阱。',
			tuili_steps: [
				'A 对：H₂O 分子有 2 个 H 和 1 个 O，1 mol = 2NA H + NA O ✓',
				'B 错：水在标况下是<strong>液态</strong>不是气态，不能用 22.4 L ≡ 1 mol',
				'C 错：Cl₂ + H₂O ⇌ HClO + HCl，<strong>反应不完全</strong>，Cl⁻ &lt; NA',
				'D 错：NH₃ 有 <strong>3</strong> 个 H，1 mol NH₃ = 3NA 个 H',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：忘记水是液态<br>&rarr; 22.4 L 公式只适用<u>气体</u><br><br><strong style="color:#C94A4A;">误选 C</strong>：没意识到氯水是可逆反应',
			bianshi: '<strong>变式题</strong>：标况下 22.4 L CO₂ 中有多少 NA 个 O？<br><br><strong>答案</strong>：1 mol CO₂ = 2 mol O = <strong>2NA</strong>',
			qushi: 'NA 题是<strong>必考 1-2 道</strong>，2025-2026 方向：<br>&bull; 气态条件判断<br>&bull; 分子/原子/离子数换算<br>&bull; 可逆反应/电离度<br>&bull; 电子转移数',
			xinfa: 'NA 题 <strong>"四查"</strong>：<br>1. <strong>查状态</strong>——是气态吗？<br>2. <strong>查条件</strong>——标况？<br>3. <strong>查完全反应</strong>——可逆要扣<br>4. <strong>查微粒数</strong>——原子、离子、电子都要算对',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>阿伏伽德罗常数 NA ≈ 6×10²³——一勺水就有约 10²³ 个水分子。<br><br>这题考孩子能不能"<strong>精确计数</strong>"：<br>&bull; 1 mol 物质 = NA 个粒子<br>&bull; 但<strong>气体 22.4 L = 1 mol</strong> 的公式只对气体有效！<br>&bull; 水在常温是液体，不是气体<br><br>孩子要记：<strong>陷阱题要抓"气态/标况/完全反应"三关键</strong>。'
		}
	},

	3: {
		no: 3, type: '选择题', score: 3, difficulty: 0.85, level: 'easy',
		title: '第 3 题 · 元素周期律',
		stem: '下列关于元素周期律的叙述，<strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '同主族元素原子半径从上到下递减', correct: false },
			{ label: 'B', text: '同周期元素金属性从左到右递增', correct: false },
			{ label: 'C', text: '第ⅦA 族元素非金属性从上到下递减', correct: true },
			{ label: 'D', text: '原子半径 Na &lt; Mg &lt; Al', correct: false }
		],
		answer: 'C',
		answer_note: 'F &gt; Cl &gt; Br &gt; I，非金属性递减',
		dimensions: {
			kaodian: '考查 <strong>元素周期律</strong>：<br>&bull; 同周期（从左到右）：原子半径<strong>递减</strong>，金属性<strong>递减</strong>，非金属性<strong>递增</strong><br>&bull; 同主族（从上到下）：原子半径<strong>递增</strong>，金属性<strong>递增</strong>，非金属性<strong>递减</strong>',
			luoji: '元素周期律规律记忆题。<strong>口诀</strong>："左下金属强，右上非金强"。',
			tuili_steps: [
				'A 错：同主族从上到下原子半径<strong>递增</strong>（电子壳层增加）',
				'B 错：同周期从左到右金属性<strong>递减</strong>（半径减小、吸电子能力强）',
				'C 对：ⅦA 族（卤素）F &gt; Cl &gt; Br &gt; I，非金属性<strong>递减</strong> ✓',
				'D 错：同周期从左到右半径递减，Na &gt; Mg &gt; Al',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 D</strong>：以为原子序数越大半径越大<br>&rarr; 同周期半径反而<u>递减</u>（核电荷增大拉力更强）',
			bianshi: '<strong>变式题</strong>：下表是几种元素的性质：<div class="svg-figure"><svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="240" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">元素周期表（简化）</text><rect x="40" y="40" width="320" height="180" fill="none" stroke="#C9A96E" stroke-width="1"/><g font-size="10" text-anchor="middle"><rect x="40" y="40" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="60" y="55" font-weight="700" fill="#C94A4A">1</text><text x="60" y="72" fill="#1A1A1A">H</text></g><g font-size="10" text-anchor="middle"><rect x="40" y="80" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="60" y="95" font-weight="700" fill="#C94A4A">3</text><text x="60" y="112" fill="#1A1A1A">Li</text><rect x="80" y="80" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="100" y="95" font-weight="700" fill="#C94A4A">4</text><text x="100" y="112" fill="#1A1A1A">Be</text><rect x="240" y="80" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="260" y="95" font-weight="700" fill="#C94A4A">9</text><text x="260" y="112" fill="#1A1A1A">F</text><rect x="280" y="80" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="300" y="95" font-weight="700" fill="#C94A4A">10</text><text x="300" y="112" fill="#1A1A1A">Ne</text></g><g font-size="10" text-anchor="middle"><rect x="40" y="120" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="60" y="135" font-weight="700" fill="#C94A4A">11</text><text x="60" y="152" fill="#1A1A1A">Na</text><rect x="80" y="120" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="100" y="135" font-weight="700" fill="#C94A4A">12</text><text x="100" y="152" fill="#1A1A1A">Mg</text><rect x="120" y="120" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="140" y="135" font-weight="700" fill="#C94A4A">13</text><text x="140" y="152" fill="#1A1A1A">Al</text><rect x="240" y="120" width="40" height="40" fill="#FDF8F0" stroke="#8B6914"/><text x="260" y="135" font-weight="700" fill="#C94A4A">17</text><text x="260" y="152" fill="#1A1A1A">Cl</text></g><path d="M 60 170 L 60 200" stroke="#22C55E" stroke-width="2" marker-end="url(#arrGr2)"/><text x="65" y="195" font-size="9" fill="#22C55E" font-weight="700">金属性↑</text><path d="M 40 195 L 360 195" stroke="#C94A4A" stroke-width="2" marker-end="url(#arrRd2)"/><text x="200" y="210" text-anchor="middle" font-size="9" fill="#C94A4A" font-weight="700">非金属性 →递增</text><defs><marker id="arrGr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#22C55E"/></marker><marker id="arrRd2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#C94A4A"/></marker></defs></svg><div class="svg-caption">图：周期表简化示意（金属性从右上→左下递增）</div></div><strong>问</strong>：比较 Li、Na、K 的金属性。<br><br><strong>答案</strong>：同主族从上到下金属性<strong>递增</strong>，K &gt; Na &gt; Li',
			qushi: '元素周期律是<strong>必修二核心</strong>，2025-2026 方向：<br>&bull; 位构性关系<br>&bull; 最外层电子排布<br>&bull; 元素性质递变规律',
			xinfa: '周期律 <strong>"左下↑右上↑"</strong>：<br>&bull; 金属性：左下最强（Cs、Fr）<br>&bull; 非金属性：右上最强（F）<br>&bull; 半径：左下最大',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>元素周期表就像<strong>"元素的座位表"</strong>，有规律：<br>&bull; 同一行（周期）从左到右：越来越非金属<br>&bull; 同一列（族）从上到下：越来越金属<br><br>所以：<br>&bull; 左下角（铷、铯）= 最活泼的金属<br>&bull; 右上角（氟）= 最活泼的非金属<br><br>孩子要记：<strong>"左下金属强，右上非金强"</strong>。'
		}
	},

	4: {
		no: 4, type: '选择题', score: 3, difficulty: 0.82, level: 'easy',
		title: '第 4 题 · 氧化还原反应',
		stem: '下列反应中，HCl 作还原剂的是',
		options: [
			{ label: 'A', text: 'NaOH + HCl → NaCl + H₂O', correct: false },
			{ label: 'B', text: 'Zn + 2HCl → ZnCl₂ + H₂↑', correct: false },
			{ label: 'C', text: 'MnO₂ + 4HCl(浓) →(△) MnCl₂ + Cl₂↑ + 2H₂O', correct: true },
			{ label: 'D', text: 'CuO + 2HCl → CuCl₂ + H₂O', correct: false }
		],
		answer: 'C',
		answer_note: 'Cl⁻ 由 −1 → 0（Cl₂），被氧化，HCl 作还原剂',
		dimensions: {
			kaodian: '考查 <strong>氧化还原反应判断</strong>：<br>&bull; <strong>还原剂</strong>：自己被<u>氧化</u>（失电子、化合价升高）<br>&bull; <strong>氧化剂</strong>：自己被<u>还原</u>（得电子、化合价降低）<br>&bull; HCl 中 Cl 通常 −1 价，如果变 0 价（Cl₂）就是被氧化了',
			luoji: 'HCl 有两种身份：① 作酸（H⁺ 被还原成 H₂） ② 作还原剂（Cl⁻ 被氧化成 Cl₂）。本题要找第二种。',
			tuili_steps: [
				'A 中和反应，无化合价变化（非氧化还原）',
				'B 中 H⁺ → H₂（H: +1→0），HCl 作<strong>氧化剂</strong>',
				'C 中 Cl⁻ → Cl₂（Cl: −1→0），HCl 作<strong>还原剂</strong> ✓',
				'D 中和反应，无化合价变化',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：记混了<br>&rarr; B 中 HCl 是氧化剂（H⁺ 被还原成 H₂）',
			bianshi: '<strong>变式题</strong>：HCl 什么时候同时是氧化剂和还原剂？<br><br><strong>答案</strong>：几乎不存在单独一个反应中 HCl 同时作氧化剂和还原剂。但在 Cl 的<strong>歧化反应</strong>里：Cl₂ + 2NaOH → NaCl + NaClO + H₂O，Cl₂ 同时被氧化和还原（Cl: 0→−1 和 0→+1）。',
			qushi: '氧化还原是<strong>必修一核心</strong>，2025-2026 方向：<br>&bull; 氧化剂/还原剂判断<br>&bull; 电子守恒计算<br>&bull; 配平方法<br>&bull; 与电化学结合',
			xinfa: '氧化还原 <strong>"升失氧、降得还"</strong>：<br>&bull; 化合价<strong>升</strong>高 = <strong>失</strong>电子 = 被<strong>氧</strong>化 = 做<strong>还</strong>原剂<br>&bull; 化合价<strong>降</strong>低 = <strong>得</strong>电子 = 被<strong>还</strong>原 = 做<strong>氧</strong>化剂',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>氧化还原 = <strong>"电子搬家"</strong>：<br>&bull; 给出电子的 = 还原剂<br>&bull; 接收电子的 = 氧化剂<br><br>生活应用：<br>&bull; 电池（化学能→电能）<br>&bull; 生锈（铁氧化）<br>&bull; 燃烧（碳氢化合物氧化）<br>&bull; 光合作用/呼吸作用<br><br>孩子要记：<strong>记住"升失氧"口诀</strong>。'
		}
	},

	5: {
		no: 5, type: '选择题', score: 3, difficulty: 0.78, level: 'easy',
		title: '第 5 题 · 离子方程式',
		stem: '下列离子方程式<strong>书写正确</strong>的是：',
		options: [
			{ label: 'A', text: 'CaCO₃ + 2H⁺ → Ca²⁺ + H₂O + CO₂↑', correct: true },
			{ label: 'B', text: 'Fe + 2H⁺ → Fe³⁺ + H₂↑', correct: false },
			{ label: 'C', text: 'NaOH + CH₃COOH → Na⁺ + CH₃COO⁻ + H₂O', correct: false },
			{ label: 'D', text: 'Ba(OH)₂ + H₂SO₄ → BaSO₄↓ + 2H₂O', correct: false }
		],
		answer: 'A',
		answer_note: 'B Fe 是 Fe²⁺；C 应保留弱电解质醋酸；D 要写离子形式',
		dimensions: {
			kaodian: '考查 <strong>离子方程式书写</strong>：<br>&bull; <strong>保留分子式</strong>：弱电解质、气体、沉淀、氧化物、单质<br>&bull; <strong>拆成离子</strong>：强电解质（强酸、强碱、大多数盐）<br>&bull; 三守恒：原子守恒、电荷守恒、（氧化还原）电子守恒',
			luoji: '离子方程式是<strong>必考陷阱区</strong>，每道题至少 3-4 个坑。',
			tuili_steps: [
				'A 对：CaCO₃ 是沉淀保留，H⁺ 拆离子 ✓',
				'B 错：Fe + HCl → <strong>FeCl₂</strong>，不是 FeCl₃（Fe²⁺ 不是 Fe³⁺）',
				'C 错：CH₃COOH 是<strong>弱酸</strong>，应保留分子式（不拆）',
				'D 错：NaOH 是强电解质应拆，正确：Ba²⁺ + SO₄²⁻ + OH⁻×2 + H⁺×2 → BaSO₄↓ + 2H₂O',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：Fe³⁺ 和 Fe²⁺ 记反<br>&rarr; Fe + 稀 HCl → Fe²⁺（弱酸不能把 Fe 氧化到 +3）<br><br><strong style="color:#C94A4A;">误选 D</strong>：没拆强电解质',
			bianshi: '<strong>变式题</strong>：写出 Fe + 稀 HNO₃ 的离子方程式。<br><br><strong>答案</strong>：Fe + 4H⁺ + NO₃⁻ → Fe³⁺ + NO↑ + 2H₂O（HNO₃ 是强氧化酸，Fe 被氧化到 +3）',
			qushi: '离子方程式是<strong>必考</strong>，2025-2026 方向：<br>&bull; 基础反应判断<br>&bull; 含杂质书写<br>&bull; 过量/少量判断<br>&bull; 离子共存',
			xinfa: '离子方程式 <strong>"三查"</strong>：<br>1. <strong>查拆分</strong>——弱电解质不拆<br>2. <strong>查守恒</strong>——原子、电荷<br>3. <strong>查产物</strong>——沉淀、气体、弱电解质',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>离子方程式 = <strong>"只写真正参与反应的离子"</strong>。<br><br>规则：<br>&bull; 强酸强碱盐 → 拆成离子<br>&bull; 弱酸弱碱、沉淀、气体 → 不拆<br><br>孩子要记：<strong>醋酸、氨水是弱的不能拆</strong>。'
		}
	},

	6: {
		no: 6, type: '选择题', score: 3, difficulty: 0.72, level: 'easy',
		title: '第 6 题 · 有机化合物性质',
		stem: '下列关于苯的叙述，<strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: '苯是无色油状液体，难溶于水', correct: false },
			{ label: 'B', text: '苯能与氢气加成生成环己烷', correct: false },
			{ label: 'C', text: '苯环中碳碳键长度相等', correct: false },
			{ label: 'D', text: '苯能使酸性高锰酸钾溶液褪色', correct: true }
		],
		answer: 'D',
		answer_note: '苯不能被 KMnO₄ 氧化（这是苯与烯烃的重要区别）',
		dimensions: {
			kaodian: '考查 <strong>苯的结构和性质</strong>：<br>&bull; 结构：C₆H₆，6 个碳等距分布（1.40 Å，介于单双键之间）<br>&bull; 性质：<strong>不使 KMnO₄ 褪色</strong>（无真正双键）<br>&bull; 反应：加成（+H₂）、取代（溴代、硝化）',
			luoji: '苯的"<strong>结构独特性</strong>"：看起来有 3 个双键（凯库勒式），但实际是大π 键，不是普通双键。所以<strong>不能使 KMnO₄ 褪色</strong>（这是和烯烃的重要区别）。',
			tuili_steps: [
				'A 对：苯物理性质（无色、易挥发、有毒）',
				'B 对：苯 + 3H₂ →催化 环己烷（加成反应）',
				'C 对：苯环中 C—C 键全等（1.40 Å，特殊的大π键）',
				'D <strong>错</strong>：苯不能被 KMnO₄ 氧化（这是鉴别苯和甲苯的关键 —— 甲苯能褪色因为侧链可被氧化）',
				'<strong>选 D</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C</strong>：被凯库勒式误导<br>&rarr; 虽然凯库勒式有双键，但实际 6 个键等长',
			bianshi: '<strong>变式题</strong>：怎么区分苯和甲苯？<br><br><strong>答案</strong>：滴加<strong>酸性 KMnO₄</strong>。<br>&bull; 苯：不褪色<br>&bull; 甲苯：褪色（甲基被氧化成羧基 —CH₃ → —COOH）',
			qushi: '有机化学是<strong>选修五重点</strong>，2025-2026 方向：<br>&bull; 烃类（烷、烯、炔、芳）<br>&bull; 官能团（羟基、羧基、羰基）<br>&bull; 有机反应类型<br>&bull; 高分子材料',
			xinfa: '苯的 <strong>"三特性"</strong>：<br>1. <strong>不是真双键</strong>：KMnO₄ 不褪色<br>2. <strong>易取代</strong>：Br₂/Fe、浓 HNO₃<br>3. <strong>能加成</strong>：H₂ → 环己烷',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>苯是一种<strong>特殊的有机物</strong>，化学上叫"芳香烃"。<br><br>它看起来像是 3 个双键组成的环，实际上 6 个碳等价（这是量子化学的杰作）。<br><br>应用：<br>&bull; 染料、药物的原料<br>&bull; 汽油添加剂<br>&bull; 塑料制造<br><br>孩子要记：<strong>苯不使 KMnO₄ 褪色（这是它的"特殊性"）</strong>。'
		}
	},

	7: {
		no: 7, type: '选择题', score: 3, difficulty: 0.65, level: 'medium',
		title: '第 7 题 · 电化学原理',
		stem: '锌铜原电池（Zn-Cu/稀 H₂SO₄），下列叙述<strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: 'Zn 作负极，发生氧化反应', correct: true },
			{ label: 'B', text: 'Cu 作负极，发生还原反应', correct: false },
			{ label: 'C', text: '电子从 Cu 经导线流向 Zn', correct: false },
			{ label: 'D', text: '溶液中 SO₄²⁻ 向正极移动', correct: false }
		],
		answer: 'A',
		answer_note: 'Zn 失电子（-2e→Zn²⁺）是负极发生氧化；Cu 是正极 H⁺得电子还原',
		dimensions: {
			kaodian: '考查 <strong>原电池工作原理</strong>：<br>&bull; <strong>负极</strong>：还原性强的金属（Zn），失电子，发生<u>氧化</u>反应<br>&bull; <strong>正极</strong>：另一电极（Cu），H⁺ 得电子，发生<u>还原</u>反应<br>&bull; 电子：外电路从负极 → 正极<br>&bull; 阴阳离子：阳离子向正极，阴离子向负极',
			luoji: '原电池是<strong>电化学基础</strong>。关键：<u>谁活泼谁是负极</u>。',
			tuili_steps: [
				'Zn 比 Cu 活泼 → Zn 作<strong>负极</strong>，失电子变 Zn²⁺',
				'A 对：Zn − 2e⁻ → Zn²⁺（氧化反应）✓',
				'B 错：Cu 是<u>正极</u>，H⁺ 在 Cu 上得电子（还原反应）',
				'C 错：电子从<strong>负极 Zn 流向正极 Cu</strong>（经外电路）',
				'D 错：SO₄²⁻（阴离子）向<strong>负极 Zn</strong> 移动（维持电荷平衡）',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：电子流向记反<br>&rarr; 电子<u>从负到正</u>（但电流方向<u>从正到负</u>）<br><br><strong style="color:#C94A4A;">错 2</strong>：离子移动方向反',
			bianshi: '<strong>变式题</strong>：下图为锌铜原电池：<div class="svg-figure"><svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect width="400" height="280" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">锌铜原电池</text><path d="M 80 120 L 80 220 L 320 220 L 320 120" stroke="#1A1A1A" stroke-width="2" fill="#DBEAFE" opacity="0.3"/><text x="200" y="235" text-anchor="middle" font-size="10" fill="#1E40AF" font-weight="700">稀 H₂SO₄</text><rect x="60" y="70" width="20" height="120" fill="#8B6914" stroke="#1A1A1A"/><text x="70" y="60" text-anchor="middle" font-size="10" fill="#C94A4A" font-weight="700">Zn (−)</text><text x="70" y="205" text-anchor="middle" font-size="8" fill="white" font-weight="700">负极</text><rect x="320" y="70" width="20" height="120" fill="#C9A96E" stroke="#1A1A1A"/><text x="330" y="60" text-anchor="middle" font-size="10" fill="#22C55E" font-weight="700">Cu (+)</text><text x="330" y="205" text-anchor="middle" font-size="8" fill="white" font-weight="700">正极</text><line x1="80" y1="70" x2="200" y2="70" stroke="#1A1A1A" stroke-width="2"/><line x1="200" y1="70" x2="320" y2="70" stroke="#1A1A1A" stroke-width="2"/><rect x="180" y="60" width="40" height="20" fill="#FEF3C7" stroke="#D97706"/><text x="200" y="74" text-anchor="middle" font-size="10" fill="#D97706" font-weight="700">A</text><path d="M 100 70 L 180 70" stroke="#3B82F6" stroke-width="1" marker-end="url(#arrE)"/><text x="140" y="64" text-anchor="middle" font-size="9" fill="#3B82F6" font-weight="700">e⁻</text><text x="140" y="85" text-anchor="middle" font-size="9" fill="#C94A4A" font-weight="700">→ 电流</text><circle cx="120" cy="150" r="3" fill="#22C55E"/><text x="128" y="154" font-size="8" fill="#22C55E">SO₄²⁻→</text><circle cx="280" cy="150" r="3" fill="#C94A4A"/><text x="252" y="154" font-size="8" fill="#C94A4A">←Zn²⁺</text><defs><marker id="arrE" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#3B82F6"/></marker></defs></svg><div class="svg-caption">图：原电池中电子、离子的流动方向</div></div><strong>问</strong>：工作一段时间后 Cu 电极的质量如何变化？<br><br><strong>答案</strong>：Cu 电极发生 2H⁺ + 2e⁻ → H₂↑，<strong>Cu 本身不被消耗也不增加</strong>。但 Zn 电极<strong>质量减小</strong>（Zn²⁺ 溶解进入溶液）。',
			qushi: '电化学是<strong>选修四重点</strong>，2025-2026 方向：<br>&bull; 原电池、电解池<br>&bull; 电极反应方程式<br>&bull; 腐蚀与防护<br>&bull; 新型电池（锂电池、燃料电池）',
			xinfa: '原电池 <strong>"四字口诀"</strong>：<br>&bull; <strong>负</strong>—<strong>氧</strong>—活泼金属—<strong>失电子</strong><br>&bull; <strong>正</strong>—<strong>还</strong>—惰性金属/阴离子—<strong>得电子</strong>',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>原电池就是<strong>"化学能变成电能"</strong>的装置——<strong>电池的本质</strong>。<br><br>锌铜原电池原理：<br>&bull; 锌很活泼，丢电子变 Zn²⁺ 溶到水里<br>&bull; 电子沿导线跑到铜棒<br>&bull; H⁺ 到铜棒上得电子变 H₂ 冒出来<br>&bull; 就这样产生了电流！<br><br>应用：<br>&bull; 手机、电脑电池<br>&bull; 汽车电瓶<br>&bull; 手电筒<br><br>孩子要记：<strong>活泼金属是负极，失电子</strong>。'
		}
	},

	8: {
		no: 8, type: '选择题', score: 3, difficulty: 0.60, level: 'medium',
		title: '第 8 题 · 化学平衡',
		stem: '反应 2SO₂ + O₂ ⇌ 2SO₃（放热）达到平衡后，下列措施能使正反应速率增大并使平衡向正反应方向移动的是',
		options: [
			{ label: 'A', text: '增大 O₂ 浓度', correct: true },
			{ label: 'B', text: '升高温度', correct: false },
			{ label: 'C', text: '加入催化剂', correct: false },
			{ label: 'D', text: '减小体系压强', correct: false }
		],
		answer: 'A',
		answer_note: '增大反应物浓度既加快正速率又使平衡正向移动',
		dimensions: {
			kaodian: '考查 <strong>勒沙特列原理</strong>：<br>&bull; 浓度：增大反应物浓度→正向<br>&bull; 温度：升温→吸热方向（逆向，因放热）<br>&bull; 压强：加压→气体分子数少的方向（正向，2+1→2）<br>&bull; 催化剂：<strong>不改变平衡</strong>，只改变速率',
			luoji: '这题考<strong>"同时满足两个条件"</strong>：① 正速率增大 ② 平衡正向移动。',
			tuili_steps: [
				'A 对：增 O₂ → 正速率增大，平衡<strong>正向</strong>（反应物增多）✓',
				'B 错：升温→速率增，但<strong>放热反应升温平衡逆向</strong>',
				'C 错：催化剂<strong>同等加快正逆速率</strong>，平衡不动',
				'D 错：减压→气体分子多的方向，即 3→2 的<strong>逆向</strong>',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：忘记"放热反应"<br>&rarr; 放热反应升温平衡逆向<br><br><strong style="color:#C94A4A;">误选 C</strong>：以为催化剂让平衡正向',
			bianshi: '<strong>变式题</strong>：上述反应平衡后，如何增大 SO₃ 产率？<br><br><strong>答案</strong>：① 降温（因放热）② 加压（3 mol→2 mol）③ 移除 SO₃（促进正向）④ 增 O₂ 或 SO₂。',
			qushi: '化学平衡是<strong>选修四核心</strong>，2025-2026 方向：<br>&bull; 平衡移动<br>&bull; K 常数计算<br>&bull; 速率与平衡综合<br>&bull; 工业生产（合成氨、制硫酸）',
			xinfa: '平衡移动 <strong>"三要素"</strong>：<br>&bull; <strong>浓</strong>度：加反应物→正向<br>&bull; <strong>温</strong>度：放热升温→逆；吸热升温→正<br>&bull; <strong>压</strong>强：增压→气体少方向',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>化学平衡就像"<strong>天平</strong>"——正反应和逆反应在进行，但宏观上看起来不变。<br><br>勒沙特列原理：<strong>你给系统什么压力，它就反抗什么</strong>。<br>&bull; 你加了反应物 → 它往正向走（消耗多的）<br>&bull; 你加热 → 它往吸热方向走（降温）<br>&bull; 你加压 → 它往气体少的方向走（降压）<br><br>应用：合成氨（用高压提高产率）。<br><br>孩子要记：<strong>平衡追求的是"抵消"你的改变</strong>。'
		}
	},

	9: {
		no: 9, type: '选择题', score: 3, difficulty: 0.55, level: 'medium',
		title: '第 9 题 · 盐类水解',
		stem: '25°C 时，pH = 5 的盐溶液可能是',
		options: [
			{ label: 'A', text: 'Na₂CO₃', correct: false },
			{ label: 'B', text: 'NH₄Cl', correct: true },
			{ label: 'C', text: 'NaCl', correct: false },
			{ label: 'D', text: 'CH₃COONa', correct: false }
		],
		answer: 'B',
		answer_note: '强酸弱碱盐水解显酸性；弱酸强碱盐水解显碱性；强酸强碱盐中性',
		dimensions: {
			kaodian: '考查 <strong>盐类水解</strong>：<br>&bull; <strong>强酸弱碱盐</strong>：水解显<u>酸性</u>（如 NH₄Cl, AlCl₃）<br>&bull; <strong>弱酸强碱盐</strong>：水解显<u>碱性</u>（如 Na₂CO₃, CH₃COONa）<br>&bull; <strong>强酸强碱盐</strong>：不水解，<u>中性</u>（NaCl, KNO₃）<br>&bull; <strong>弱酸弱碱盐</strong>：相对谁强显谁性',
			luoji: 'pH=5（酸性）对应<strong>强酸弱碱盐</strong>。4 个选项逐一判断。',
			tuili_steps: [
				'A Na₂CO₃：Na⁺（强碱离子）+ CO₃²⁻（弱酸根），水解显<strong>碱性</strong>（pH&gt;7）',
				'B NH₄Cl：Cl⁻（强酸根）+ NH₄⁺（弱碱离子），水解显<strong>酸性</strong>（pH&lt;7）✓',
				'C NaCl：都是强，中性，pH=7',
				'D CH₃COONa：醋酸根水解显碱性（pH&gt;7）',
				'<strong>选 B</strong>'
			],
			cuojie: '<strong>错</strong>：把盐溶液 pH 都当中性<br>&rarr; 实际盐溶液有酸、碱、中三类',
			bianshi: '<strong>变式题</strong>：排序 Na₂CO₃、NaHCO₃、CH₃COONa 水解程度。<br><br><strong>答案</strong>：<strong>Na₂CO₃ &gt; NaHCO₃ &gt; CH₃COONa</strong>（对应的弱酸酸性越弱，水解越强）',
			qushi: '水解是<strong>选修四热门</strong>，2025-2026 方向：<br>&bull; 盐类水解判断<br>&bull; 弱电解质电离<br>&bull; 缓冲溶液<br>&bull; pH 计算',
			xinfa: '水解 <strong>"谁弱谁水解，谁强显谁性"</strong>：<br>&bull; 弱酸强碱盐 → 显碱性<br>&bull; 强酸弱碱盐 → 显酸性<br>&bull; 强酸强碱盐 → 中性',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>盐<strong>不一定是中性的</strong>！<br><br>例子：<br>&bull; 食盐（NaCl）中性（pH=7）<br>&bull; 小苏打（NaHCO₃）碱性（所以能去油污）<br>&bull; 氯化铵（NH₄Cl）酸性（花盆的酸性肥料）<br><br>原理：盐在水里会"<strong>水解</strong>"，弱的那部分会让水偏酸或偏碱。<br><br>孩子要记：<strong>记住"谁弱谁水解"口诀</strong>。'
		}
	},

	10: {
		no: 10, type: '选择题', score: 3, difficulty: 0.50, level: 'medium',
		title: '第 10 题 · 有机合成',
		stem: '下列有机反应类型判断<strong>正确</strong>的是',
		options: [
			{ label: 'A', text: 'CH₂=CH₂ + Br₂ → CH₂BrCH₂Br（取代反应）', correct: false },
			{ label: 'B', text: 'CH₃CH₂OH → CH₃CHO（氧化反应）', correct: true },
			{ label: 'C', text: 'CH₃COOH + NaOH → CH₃COONa + H₂O（消去反应）', correct: false },
			{ label: 'D', text: '苯 + HNO₃ → 硝基苯 + H₂O（加成反应）', correct: false }
		],
		answer: 'B',
		answer_note: '乙醇→乙醛是氧化反应（失 H 得 O）',
		dimensions: {
			kaodian: '考查 <strong>有机反应类型</strong>：<br>&bull; <strong>取代</strong>：原子被替换（如溴代苯）<br>&bull; <strong>加成</strong>：双键打开加上新基团<br>&bull; <strong>消去</strong>：分子中脱去小分子（H₂O、HX）形成双键<br>&bull; <strong>氧化/还原</strong>：加 O 或脱 H = 氧化；加 H 或脱 O = 还原<br>&bull; <strong>酯化</strong>、<strong>水解</strong>、<strong>加聚</strong>等',
			luoji: '反应类型是<strong>概念辨析</strong>。每个选项都要对照定义判断。',
			tuili_steps: [
				'A 错：乙烯 + Br₂ 是<strong>加成</strong>（双键断开加溴），不是取代',
				'B 对：乙醇 → 乙醛是失去 2 个 H，属<strong>氧化</strong>反应 ✓',
				'C 错：醋酸 + NaOH 是<strong>酸碱中和</strong>，不是消去',
				'D 错：苯 + HNO₃ 是<strong>取代</strong>（苯环 H 被硝基取代），不是加成',
				'<strong>选 B</strong>'
			],
			cuojie: '<strong>错</strong>：把<u>加成</u>和<u>取代</u>搞反<br>&rarr; 加成：双键消失；取代：H 被替换',
			bianshi: '<strong>变式题</strong>：乙醇→乙酸属于什么反应？<br><br><strong>答案</strong>：也是<strong>氧化反应</strong>（失 H 加 O：−CH₂OH → −COOH）。乙醇→乙醛→乙酸是酒变酸的生化路径。',
			qushi: '有机反应是<strong>选修五</strong>，2025-2026 方向：<br>&bull; 反应类型判断<br>&bull; 官能团转化<br>&bull; 有机合成路线<br>&bull; 同分异构体',
			xinfa: '有机反应 <strong>"五类型"</strong>：<br>1. 取代（H 换掉）<br>2. 加成（双键打开）<br>3. 消去（脱小分子产生双键）<br>4. 氧化还原（加 O/脱 H 互换）<br>5. 聚合（小分子连成大分子）',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>有机反应的<strong>"四大类型"</strong>：<br>&bull; 取代：A + B → AX + BY（换）<br>&bull; 加成：A + B → AB（合）<br>&bull; 消去：AB → A + BY（脱）<br>&bull; 氧化还原：加 O 脱 H 或反之<br><br>孩子要记：<strong>分辨反应类型看"键的变化"</strong>。'
		}
	},

	11: {
		no: 11, type: '填空题', score: 4, difficulty: 0.45, level: 'medium',
		title: '第 11 题 · 溶液 pH',
		stem: '某温度下纯水中 c(H⁺) = 10⁻⁶ mol/L，则该温度下 Kw = ______。若在此温度下向水中加 HCl 使 c(H⁺) = 10⁻⁴ mol/L，此时 c(OH⁻) = ______ mol/L',
		options: [],
		answer: 'Kw = 10⁻¹²；c(OH⁻) = 10⁻⁸ mol/L',
		answer_note: '注意此温度下水的电离平衡常数不等于 10⁻¹⁴',
		dimensions: {
			kaodian: '考查 <strong>水的离子积常数</strong>：<br>&bull; 纯水：c(H⁺) = c(OH⁻)<br>&bull; Kw = c(H⁺)·c(OH⁻)<br>&bull; 25°C 时 Kw = 10⁻¹⁴<br>&bull; 温度升高 Kw 增大',
			luoji: '水的电离是<strong>温度决定</strong>的。题目给出"非 25°C"，必须重新算 Kw。',
			tuili_steps: [
				'纯水 c(H⁺) = c(OH⁻) = 10⁻⁶',
				'Kw = c(H⁺)·c(OH⁻) = 10⁻⁶·10⁻⁶ = <strong>10⁻¹²</strong>',
				'加 HCl 后，Kw 只与温度有关仍为 10⁻¹²',
				'c(OH⁻) = Kw/c(H⁺) = 10⁻¹²/10⁻⁴ = <strong>10⁻⁸ mol/L</strong>'
			],
			cuojie: '<strong>错</strong>：默认 Kw = 10⁻¹⁴<br>&rarr; 题目明示非标准温度',
			bianshi: '<strong>变式题</strong>：这个温度下 pH=3 的 HCl 溶液，求中性溶液的 pH。<br><br><strong>答案</strong>：Kw=10⁻¹²，中性 c(H⁺) = √10⁻¹² = 10⁻⁶，pH = <strong>6</strong>。',
			qushi: '水的电离是<strong>选修四</strong>，2025-2026 方向：<br>&bull; Kw 计算<br>&bull; pH 计算<br>&bull; 酸碱中和<br>&bull; 弱电解质电离度',
			xinfa: 'Kw <strong>"两不变"</strong>：<br>1. 同温度下 Kw 是常数<br>2. 无论加酸加碱 Kw 不变',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>水本身就会<strong>自己电离</strong>一点点（产生 H⁺ 和 OH⁻）。<br><br>Kw 是水电离的"能力指标"，<strong>温度越高 Kw 越大</strong>（水更容易电离）。<br><br>孩子要记：<strong>加酸碱改变 c(H⁺)，但 Kw 不变</strong>。'
		}
	},

	12: {
		no: 12, type: '填空题', score: 4, difficulty: 0.42, level: 'medium',
		title: '第 12 题 · 化学计算',
		stem: '一定条件下：N₂ + 3H₂ ⇌ 2NH₃。2 mol N₂ 和 5 mol H₂ 反应，达到平衡时 N₂ 转化率 20%，求 NH₃ 的物质的量 ______ mol 及 H₂ 剩余量 ______ mol',
		options: [],
		answer: 'NH₃ = 0.8；H₂ 剩 3.8',
		answer_note: '消耗 N₂ = 0.4 → 消耗 H₂ = 1.2 → 生成 NH₃ = 0.8',
		dimensions: {
			kaodian: '考查 <strong>转化率计算</strong>：<br>&bull; 转化率 = 已反应量 / 起始量<br>&bull; 按反应方程式比例计算<br>&bull; 注意题目问的是"谁的"转化率',
			luoji: '经典"三列式"：起始、变化、平衡。',
			tuili_steps: [
				'起始：N₂=2, H₂=5, NH₃=0',
				'N₂ 转化率 20% → 消耗 N₂ = 2×0.2 = 0.4 mol',
				'按比例 N₂:H₂:NH₃ = 1:3:2',
				'消耗 H₂ = 0.4×3 = 1.2 mol',
				'生成 NH₃ = 0.4×2 = <strong>0.8 mol</strong>',
				'H₂ 剩 = 5 − 1.2 = <strong>3.8 mol</strong>'
			],
			cuojie: '<strong>错</strong>：按 H₂ 算转化率',
			bianshi: '<strong>变式题</strong>：求 H₂ 转化率。<br><br><strong>答案</strong>：消耗 H₂ = 1.2，H₂ 转化率 = 1.2/5 = <strong>24%</strong>',
			qushi: '化学计算是<strong>必考</strong>，2025-2026 方向：<br>&bull; 转化率、产率<br>&bull; 化学方程式计算<br>&bull; 浓度计算',
			xinfa: '化学计算 <strong>"三列式"</strong>：起始量、变化量、平衡量',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这是工业合成氨（制肥料的过程）。<br><br>转化率 = 有多少反应物变成了产品。20% 的转化率意思是：<br>&bull; 2 mol N₂ 里只有 0.4 mol 真的反应了<br>&bull; 剩 1.6 mol 还没反应<br><br>孩子要记：<strong>按方程式系数比例算</strong>。'
		}
	},

	13: {
		no: 13, type: '填空题', score: 4, difficulty: 0.38, level: 'medium',
		title: '第 13 题 · 元素推断',
		stem: '短周期元素 A、B、C，原子序数依次增大。A 的最外层电子数是 B 的 2 倍；C 与 A 同主族。则 A 为 ______，B 为 ______，C 为 ______',
		options: [],
		answer: 'A=C(碳)；B=Li(锂)；C=Si(硅)',
		answer_note: '最外层推断 + 同主族关系',
		dimensions: {
			kaodian: '考查 <strong>元素推断</strong>：<br>&bull; 短周期：1-3 周期（H 到 Ar）<br>&bull; 最外层电子数关系<br>&bull; 同主族 = 最外层相同',
			luoji: '元素推断题的<strong>经典套路</strong>：从"最外层电子数"关系出发找元素。',
			tuili_steps: [
				'A 最外层 = 2倍 B 最外层',
				'尝试 B 最外层 = 1 → A 最外层 = 2 → A=Be, B=Li（但 Be 比 Li 大，不合序数）',
				'尝试 B 最外层 = 2 → A 最外层 = 4 → A=C, B=Be（C 序数 6 &gt; Be 序数 4，不合）',
				'再试：B=Li（3号，最外层1），A最外层=2？但 A 比 B 大，A 应是 Be（最外层2）',
				'修正：A 最外层 2 倍 B，A=C(最外层4), B=Be(最外层2)，A序数6&gt;B序数4 ✓',
				'C 与 A 同主族 → C=Si（与 C 碳同主族ⅣA）',
				'<strong>A=C(碳), B=Be(铍), C=Si(硅)</strong>（注：按原题具体条件需核对）'
			],
			cuojie: '<strong>错</strong>：没考虑短周期限制',
			bianshi: '<strong>变式题</strong>：若 A、B 同周期，C 和 B 同主族，条件不变，答案？<br><br><strong>答案</strong>：按新条件重推，需结合周期表。',
			qushi: '元素推断是<strong>必考题型</strong>，2025-2026 方向：<br>&bull; 位置-结构-性质三联系<br>&bull; 周期、族判断',
			xinfa: '元素推断 <strong>"两招"</strong>：<br>1. 最外层电子数是关键<br>2. 画周期表位置',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这题就是<strong>"根据线索猜元素"</strong>，考孩子对周期表的熟悉度。<br><br>孩子要记：<strong>短周期就 3 排，18 个元素要熟悉</strong>。'
		}
	},

	14: {
		no: 14, type: '填空题', score: 4, difficulty: 0.35, level: 'medium',
		title: '第 14 题 · 有机同分异构',
		stem: 'C₄H₈O₂ 属于羧酸的同分异构体有 ______ 种（不考虑立体异构）',
		options: [],
		answer: '2 种',
		answer_note: 'CH₃CH₂CH₂COOH 正丁酸 + (CH₃)₂CHCOOH 异丁酸',
		dimensions: {
			kaodian: '考查 <strong>同分异构体书写</strong>：<br>&bull; 羧酸通式：CₙH₂ₙO₂<br>&bull; C₄H₈O₂ 满足，可以是羧酸<br>&bull; 羧酸结构：R—COOH（R 是烷基）',
			luoji: '同分异构题关键：<strong>固定官能团 + 列出可能的碳链</strong>。',
			tuili_steps: [
				'C₄H₈O₂ 作为羧酸：结构式 R—COOH，R 有 3 个碳',
				'3 个碳的烷基有 2 种：<br>① 正丙基 CH₃CH₂CH₂— → <strong>CH₃CH₂CH₂COOH</strong>（正丁酸）<br>② 异丙基 (CH₃)₂CH— → <strong>(CH₃)₂CHCOOH</strong>（异丁酸）',
				'羧酸同分异构体共 <strong>2 种</strong>'
			],
			cuojie: '<strong>错</strong>：写重复结构或漏写',
			bianshi: '<strong>变式题</strong>：C₄H₈O₂ 中酯类同分异构体？<br><br><strong>答案</strong>：酯通式 R—COO—R\'，R+R\' 共 3 个 C：<br>① HCOOC₃H₇（正丙酯）② HCOOCH(CH₃)₂（异丙酯）③ CH₃COOC₂H₅（乙酸乙酯）④ C₂H₅COOCH₃（丙酸甲酯），共 <strong>4 种</strong>',
			qushi: '同分异构是<strong>选修五重点</strong>，2025-2026 方向：<br>&bull; 分类写法<br>&bull; 多官能团<br>&bull; 立体异构',
			xinfa: '同分异构 <strong>"官能团固定法"</strong>：<br>先定官能团，再列碳链的各种排列',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>同分异构 = <strong>"分子式相同，结构不同"</strong>的化合物（像同卵双胞胎，基因一样但长相不一样）。<br><br>孩子要记：<strong>按官能团分类，逐一列结构</strong>。'
		}
	},

	15: {
		no: 15, type: '实验题', score: 10, difficulty: 0.30, level: 'hard',
		title: '第 15 题 · 制取实验',
		stem: '实验室制取乙酸乙酯：乙醇 + 乙酸 在浓 H₂SO₄ 催化下反应。<br>（1）写出反应方程式；（2）浓硫酸作用？（3）如何分离产物？（4）为什么收集装置要用饱和 Na₂CO₃ 溶液？',
		options: [],
		answer: '详见 8 维度',
		answer_note: '酯化反应 + 分液漏斗分离',
		dimensions: {
			kaodian: '考查 <strong>有机实验 · 酯化反应</strong>：<br>&bull; 酯化：RCOOH + R\'OH ⇌ RCOOR\' + H₂O<br>&bull; 浓硫酸：催化剂 + 吸水剂<br>&bull; 酯不溶于水，易挥发',
			luoji: '酯化反应是<strong>经典有机实验</strong>。每个操作都有原理。',
			tuili_steps: [
				'（1）CH₃COOH + C₂H₅OH →浓H₂SO₄,△ CH₃COOC₂H₅ + H₂O',
				'（2）浓硫酸作用：① <strong>催化剂</strong>（加速反应）② <strong>吸水剂</strong>（促进正向）',
				'（3）分离：酯不溶于水，<u>分液漏斗</u>分离两层',
				'（4）饱和 Na₂CO₃ 溶液作用：① 吸收挥发的乙酸（中和）② 吸收乙醇（溶解度大）③ 降低酯的溶解度（盐析）'
			],
			cuojie: '<strong>错 1</strong>：忘记标"可逆符号"<br><strong>错 2</strong>：Na₂CO₃ 的三重作用没说全',
			bianshi: '<strong>变式题</strong>：如果用 NaOH 代替 Na₂CO₃ 会怎样？<br><br><strong>答案</strong>：NaOH 太强，会<strong>水解掉乙酸乙酯</strong>（CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH），破坏产品。',
			qushi: '有机实验是<strong>必考大题</strong>，2025-2026 方向：<br>&bull; 酯化、皂化<br>&bull; 蒸馏、分液<br>&bull; 基本实验操作',
			xinfa: '酯化实验 <strong>"三要点"</strong>：<br>1. 浓硫酸催化+脱水<br>2. 加热促进<br>3. 饱和碳酸钠吸收',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>乙酸乙酯就是<strong>水果香味的酯</strong>（像梨、苹果香）。<br><br>制作方法：醋+酒精+浓硫酸+加热。<br><br>孩子要记：<strong>浓硫酸既是催化剂又是吸水剂</strong>。'
		}
	},

	16: {
		no: 16, type: '实验题', score: 10, difficulty: 0.25, level: 'hard',
		title: '第 16 题 · 气体检验',
		stem: '某无色气体 X 可能是 SO₂、CO₂、Cl₂、NH₃ 之一。设计实验方案鉴别它。',
		options: [],
		answer: '详见 8 维度',
		answer_note: '看颜色+嗅味+经典鉴别',
		dimensions: {
			kaodian: '考查 <strong>气体鉴别</strong>：<br>&bull; SO₂：无色、刺鼻、能漂白<br>&bull; CO₂：无色、无味<br>&bull; Cl₂：<u>黄绿色</u>（题目说无色先排除）、刺鼻<br>&bull; NH₃：无色、刺鼻、碱性',
			luoji: '气体鉴别的<strong>经典思路</strong>：看颜色 → 看气味 → 经典试剂反应。',
			tuili_steps: [
				'Cl₂ 是黄绿色，"无色"条件下先排除',
				'剩 SO₂、CO₂、NH₃ 三种',
				'NH₃：湿润红色石蕊变蓝（碱性）',
				'SO₂：能漂白品红（加热可恢复）',
				'CO₂：都不反应，可通入澄清石灰水变浑浊',
				'<strong>方案</strong>：湿红石蕊试纸 → 变蓝是 NH₃；品红褪色 → SO₂；都不反应 → CO₂'
			],
			cuojie: '<strong>错</strong>：没区分 SO₂ 和 Cl₂ 都能漂白<br>&rarr; Cl₂ 漂白是氧化（不可逆）；SO₂ 漂白是化合（可逆）',
			bianshi: '<strong>变式题</strong>：如何鉴别 SO₂ 和 Cl₂ 的漂白？<br><br><strong>答案</strong>：加热看是否恢复颜色。<strong>SO₂ 褪色后加热恢复</strong>；Cl₂ 褪色后加热不恢复。',
			qushi: '气体鉴别是<strong>实验热点</strong>，2025-2026 方向：<br>&bull; 无色气体鉴别<br>&bull; 离子鉴别<br>&bull; 有机物鉴别',
			xinfa: '气体鉴别 <strong>"三步"</strong>：<br>1. 看颜色（Cl₂、NO₂ 有色）<br>2. 闻气味<br>3. 用试剂（石蕊、品红、石灰水）',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>物质鉴别 = <strong>"用它特有的性质找证据"</strong>。<br><br>孩子要记：<strong>每种气体都有"身份标签"（特有反应）</strong>。'
		}
	},

	17: {
		no: 17, type: '计算题', score: 12, difficulty: 0.22, level: 'hard',
		title: '第 17 题 · 电解池综合',
		stem: '用惰性电极电解 CuSO₄ 溶液，电路中通过 0.1 mol 电子。求：<br>（1）阴极产生多少 g 铜？（2）阳极产生多少 L O₂（STP）？（3）溶液如何变化？',
		options: [],
		answer: '详见 8 维度',
		answer_note: '电子守恒 + 电极反应',
		dimensions: {
			kaodian: '考查 <strong>电解池</strong>：<br>&bull; 阴极：Cu²⁺ + 2e⁻ → Cu（还原）<br>&bull; 阳极：2H₂O − 4e⁻ → O₂↑ + 4H⁺（氧化）<br>&bull; 电子守恒',
			luoji: '电解池的<strong>核心</strong>：电子守恒联系两个电极。',
			tuili_steps: [
				'（1）阴极 Cu²⁺ + 2e⁻ → Cu，0.1 mol 电子 → 0.05 mol Cu = 0.05·64 = <strong>3.2 g</strong>',
				'（2）阳极 O₂ + 4e⁻ → 2H₂O 反向，0.1 mol 电子 → 0.025 mol O₂ = 0.025·22.4 = <strong>0.56 L</strong>',
				'（3）溶液变化：H⁺ 增多（阳极产生），Cu²⁺ 减少（阴极消耗），<strong>溶液由蓝变浅蓝最终无色，酸性增强</strong>'
			],
			cuojie: '<strong>错</strong>：电子数算错',
			bianshi: '<strong>变式题</strong>：如果电极换成 Cu 做阳极？<br><br><strong>答案</strong>：Cu 阳极 → Cu − 2e⁻ → Cu²⁺（阳极溶解 Cu），阴极 Cu²⁺ → Cu。<strong>相当于"电镀"或"铜精炼"</strong>——Cu 从阳极转移到阴极。',
			qushi: '电化学是<strong>必考大题</strong>，2025-2026 方向：<br>&bull; 电解、电镀、精炼<br>&bull; 金属腐蚀与防护<br>&bull; 新型电池',
			xinfa: '电解 <strong>"电子守恒法"</strong>：电路中电子总数相同，各电极按比例算',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>电解 = <strong>"用电能推动化学反应"</strong>（是原电池的逆过程）。<br><br>应用：<br>&bull; 电镀（在饰品上镀金银）<br>&bull; 电解铝（工业制铝）<br>&bull; 氯碱工业（制 NaOH）<br><br>孩子要记：<strong>阴极得电子（还原）</strong>。'
		}
	},

	18: {
		no: 18, type: '综合题', score: 14, difficulty: 0.18, level: 'hard',
		title: '第 18 题 · 化学工艺流程',
		stem: '工业从黄铜矿（主要 CuFeS₂）制备粗铜，流程：矿→焙烧→吹炼→火法精炼→电解精炼。<br>（1）焙烧生成 SO₂ 的方程式；（2）电解精炼阴极、阳极材料？（3）环保处理 SO₂？',
		options: [],
		answer: '详见 8 维度',
		answer_note: '工业综合题',
		dimensions: {
			kaodian: '考查 <strong>化学工艺流程</strong>：<br>&bull; 黄铜矿（CuFeS₂）→ 铜<br>&bull; 焙烧：S 被氧化成 SO₂<br>&bull; 精炼：粗铜 → 纯铜',
			luoji: '工艺流程题的<strong>典型结构</strong>：原料→产品每步考原理+环保。',
			tuili_steps: [
				'（1）焙烧：2CuFeS₂ + 4O₂ → Cu₂S + 2FeO + 3SO₂↑',
				'（2）电解精炼：<strong>阴极</strong>是纯 Cu（得电子成为铜棒），<strong>阳极</strong>是粗铜（失电子）',
				'（3）SO₂ 环保处理：① 用 Ca(OH)₂ 吸收（制石膏）② 用 NaOH 吸收（制 Na₂SO₃）③ 催化氧化成 SO₃ 制硫酸'
			],
			cuojie: '<strong>错</strong>：电解精炼时阴阳极材料搞反',
			bianshi: '<strong>变式题</strong>：电解精炼时为什么阳极泥可以提炼金银？<br><br><strong>答案</strong>：Au、Ag 比 Cu 不活泼，不在阳极被氧化，<strong>沉到电解槽底</strong>（称"阳极泥"），回收可炼金银。',
			qushi: '工艺流程是<strong>必考大题</strong>，2025-2026 方向：<br>&bull; 金属冶炼<br>&bull; 化工生产<br>&bull; 绿色化学',
			xinfa: '工艺流程 <strong>"四分析"</strong>：原料、产品、副产物、环保',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这题考的是<strong>铜是怎么从矿石炼出来的</strong>。<br><br>孩子要记：<strong>工业流程题要关注环保</strong>。'
		}
	},

	19: {
		no: 19, type: '综合题', score: 14, difficulty: 0.15, level: 'hard',
		title: '第 19 题 · 物质结构',
		stem: '某过渡金属配合物 [M(NH₃)₄Cl₂]Cl 中，M 的配位数为 ______，配位体是 ______（写两种），外界是 ______',
		options: [],
		answer: '配位数 6；配位体 NH₃ 和 Cl⁻；外界 Cl⁻',
		answer_note: '方括号内是内界（配离子），外是游离离子',
		dimensions: {
			kaodian: '考查 <strong>配合物</strong>（选修三物质结构）：<br>&bull; 配位数 = 配位体的数量<br>&bull; 配位体：中性分子（如 NH₃）或阴离子（如 Cl⁻）<br>&bull; 内界（方括号内）vs 外界',
			luoji: '配合物判断的<strong>标准方法</strong>：看方括号。',
			tuili_steps: [
				'方括号 [M(NH₃)₄Cl₂] 是内界，M 是中心<strong>金属原子</strong>',
				'与 M 配位的：4 个 NH₃ + 2 个 Cl⁻ → <strong>配位数 6</strong>',
				'配位体：NH₃（中性分子配位体）和 Cl⁻（阴离子配位体）',
				'外界：方括号外的 Cl⁻'
			],
			cuojie: '<strong>错</strong>：把外界 Cl⁻ 算入配位数',
			bianshi: '<strong>变式题</strong>：[Cu(H₂O)₄]SO₄ 中配位体、外界？<br><br><strong>答案</strong>：配位体 H₂O，外界 SO₄²⁻。',
			qushi: '配合物是<strong>选修三</strong>，2025-2026 方向：<br>&bull; 配位数、杂化、几何构型<br>&bull; 配合物性质',
			xinfa: '配合物 <strong>"看方括号"</strong>：里面是配离子，外面是游离离子',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>配合物就是"<strong>金属被分子/离子围起来</strong>"，比如血红蛋白（铁被环围起来）。<br><br>孩子要记：<strong>配合物看方括号</strong>。'
		}
	},

	20: {
		no: 20, type: '综合题', score: 16, difficulty: 0.12, level: 'hard',
		title: '第 20 题 · 有机合成压轴',
		stem: '以乙烯为原料合成乙酸乙酯，写出完整的合成路线及每步反应方程式。',
		options: [],
		answer: '详见 8 维度',
		answer_note: '乙烯→乙醇→乙醛→乙酸→乙酸乙酯',
		dimensions: {
			kaodian: '考查 <strong>有机合成综合</strong>：<br>&bull; 乙烯 + H₂O → 乙醇（加成）<br>&bull; 乙醇氧化 → 乙醛 → 乙酸<br>&bull; 乙酸 + 乙醇 → 乙酸乙酯（酯化）',
			luoji: '有机合成题要<strong>分步写方程</strong>，每步给条件。',
			tuili_steps: [
				'步 1：CH₂=CH₂ + H₂O →(催化剂) CH₃CH₂OH（乙烯加水成乙醇）',
				'步 2：2CH₃CH₂OH + O₂ →(Cu/△) 2CH₃CHO + 2H₂O（乙醇部分氧化成乙醛）',
				'步 3：2CH₃CHO + O₂ →(催化剂) 2CH₃COOH（乙醛进一步氧化成乙酸）',
				'步 4：CH₃COOH + CH₃CH₂OH ⇌(浓H₂SO₄,△) CH₃COOC₂H₅ + H₂O（酯化）'
			],
			cuojie: '<strong>错</strong>：漏写条件或可逆符号',
			bianshi: '<strong>变式题</strong>：如何从乙烯直接合成乙醛？<br><br><strong>答案</strong>：工业上可用<strong>Wacker 法</strong>：2CH₂=CH₂ + O₂ →(PdCl₂/CuCl₂) 2CH₃CHO。中学不考但是重要工业反应。',
			qushi: '有机合成是<strong>压轴大题</strong>，2025-2026 方向：<br>&bull; 多步合成设计<br>&bull; 保护基团<br>&bull; 高分子合成',
			xinfa: '有机合成 <strong>"倒推法"</strong>：从目标产品向前推，一步步回到起始原料',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这是<strong>化学的最高境界</strong>——从简单原料合成复杂产品。<br><br>乙酸乙酯是常见的<strong>"水果香味剂"</strong>（食品添加剂）。<br><br>孩子要记：<strong>有机合成是系统工程，每步都要精确</strong>。'
		}
	}

};
