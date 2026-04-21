// Me Offer · 北京 2025 生物真题 20 题完整数据
// AI 黄金解析 · 8 维度 · 生物教研专家审核
// 生成时间：2026-04-21

const BIO_QUESTIONS_DATA					= {
	1: {
		no:				1,
		type:			'选择题',
		score:			2,
		difficulty:		0.88,
		level:			'easy',
		title:			'第 1 题 · 体重管理 · 能量代谢',
		stem:			'健康人进食后，血糖浓度升高，一段时间内通过调节可以降低血糖。体重管理是健康管理的重要组成部分，科学减重应以能量负平衡为基础。下列关于体重管理与能量代谢的叙述，<strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: '摄入能量少于消耗能量，体重逐渐减轻', correct: false },
			{ label: 'B', text: '减重期间，机体优先分解脂肪供能', correct: false },
			{ label: 'C', text: '长期能量负平衡不会导致基础代谢率变化', correct: true },
			{ label: 'D', text: '合理运动可提高能量消耗并改善胰岛素敏感性', correct: false }
		],
		answer:			'C',
		answer_note:	'"长期能量负平衡会降低基础代谢率"是普遍生理现象，故 C 错',
		dimensions: {
			kaodian:	'本题考查 <strong>动物生理学 &middot; 稳态与调节模块</strong>：<br>&bull; <strong>能量代谢平衡</strong>（摄入 vs 消耗）<br>&bull; <strong>基础代谢率（BMR）的可塑性</strong><br>&bull; <strong>胰岛素敏感性与运动的关系</strong><br><br>核心知识点：<strong>能量负平衡 &rarr; BMR 代偿性下降</strong>（"节能模式"）。',
			luoji:		'出题人挖的坑：<strong>学生容易把"长期"和"短期"混淆</strong>。<br><br>&bull; 短期（几天）：BMR 变化不明显 &rarr; 容易误选 C 为"正确"<br>&bull; 长期（数月）：身体启动代偿机制，BMR 显著下降 &rarr; C 是错误<br><br>这道题在考 <strong>"稳态的动态性"</strong>，而不是"稳态的绝对性"。这是新高考生物的核心命题方向。',
			tuili_steps: [
				'读题抓关键词："<strong>长期</strong>"+"能量负平衡"+"<strong>不会</strong>导致 BMR 变化"',
				'调用知识：长期热量限制 &rarr; 甲状腺激素(T3/T4)分泌下降 &rarr; 代谢减慢',
				'逆推：C 说"不会变化"与生理事实矛盾 &rarr; C 为错误选项',
				'验证其他：A（定义正确）、B（脂肪供能机制正确）、D（运动改善胰岛素敏感 &mdash; 常识）',
				'<strong>结论：选 C</strong>'
			],
			cuojie:		'<strong style="color:#C94A4A;">错解 1（误选 B）</strong>：以为"优先分解脂肪"是错的<br>&rarr; 实际上减重初期糖原先耗尽，之后脂肪是主供能源，B 正确。<br><br><strong style="color:#C94A4A;">错解 2（误选 D）</strong>：怀疑"胰岛素敏感性"<br>&rarr; 运动改善胰岛素敏感性是 2023-2024 考纲新增要点，D 正确。<br><br><strong style="color:#C94A4A;">错解 3（跳过 C）</strong>：默认"稳态 = 不变"<br>&rarr; 这是最典型的概念误区。<strong>稳态是动态平衡，不是绝对不变。</strong>',
			bianshi:	'<strong>变式题</strong>：某实验者连续 12 周每日减少 500 kcal 摄入，测得其基础代谢率变化如图：<div class="svg-figure"><svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:420px;display:block;margin:0 auto;"><rect x="0" y="0" width="400" height="260" fill="#FFFFFF"/><text x="200" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">12 周能量负平衡的 BMR 变化</text><line x1="60" y1="40" x2="60" y2="220" stroke="#1A1A1A" stroke-width="1.5"/><line x1="60" y1="220" x2="370" y2="220" stroke="#1A1A1A" stroke-width="1.5"/><text x="60" y="35" text-anchor="middle" font-size="10" fill="#1A1A1A">BMR (kcal/day)</text><text x="385" y="225" text-anchor="middle" font-size="10" fill="#1A1A1A">周</text><line x1="55" y1="60" x2="60" y2="60" stroke="#1A1A1A" stroke-width="1"/><text x="50" y="64" text-anchor="end" font-size="9" fill="#5A5A5A">1700</text><line x1="55" y1="100" x2="60" y2="100" stroke="#1A1A1A" stroke-width="1"/><text x="50" y="104" text-anchor="end" font-size="9" fill="#5A5A5A">1500</text><line x1="55" y1="140" x2="60" y2="140" stroke="#1A1A1A" stroke-width="1"/><text x="50" y="144" text-anchor="end" font-size="9" fill="#5A5A5A">1300</text><line x1="55" y1="180" x2="60" y2="180" stroke="#1A1A1A" stroke-width="1"/><text x="50" y="184" text-anchor="end" font-size="9" fill="#5A5A5A">1100</text><line x1="60" y1="220" x2="60" y2="225" stroke="#1A1A1A" stroke-width="1"/><text x="60" y="238" text-anchor="middle" font-size="9" fill="#5A5A5A">0</text><line x1="160" y1="220" x2="160" y2="225" stroke="#1A1A1A" stroke-width="1"/><text x="160" y="238" text-anchor="middle" font-size="9" fill="#5A5A5A">4</text><line x1="260" y1="220" x2="260" y2="225" stroke="#1A1A1A" stroke-width="1"/><text x="260" y="238" text-anchor="middle" font-size="9" fill="#5A5A5A">8</text><line x1="360" y1="220" x2="360" y2="225" stroke="#1A1A1A" stroke-width="1"/><text x="360" y="238" text-anchor="middle" font-size="9" fill="#5A5A5A">12</text><line x1="60" y1="100" x2="360" y2="100" stroke="#E5DDD0" stroke-width="1" stroke-dasharray="3,3"/><line x1="60" y1="140" x2="360" y2="140" stroke="#E5DDD0" stroke-width="1" stroke-dasharray="3,3"/><path d="M 60 70 Q 110 85, 160 110 T 260 160 L 360 165" stroke="#8B6914" stroke-width="2.5" fill="none"/><circle cx="60" cy="70" r="4" fill="#8B6914"/><text x="72" y="67" font-size="9" fill="#8B6914" font-weight="600">1650</text><circle cx="160" cy="110" r="4" fill="#8B6914"/><text x="172" y="107" font-size="9" fill="#8B6914" font-weight="600">1460</text><circle cx="260" cy="160" r="4" fill="#C94A4A"/><text x="272" y="157" font-size="9" fill="#C94A4A" font-weight="700">1240</text><circle cx="360" cy="165" r="4" fill="#C94A4A"/><text x="358" y="158" text-anchor="end" font-size="9" fill="#C94A4A" font-weight="700">1220</text><rect x="250" y="70" width="110" height="18" fill="#FEECEC" stroke="#C94A4A" stroke-width="1" rx="3"/><text x="305" y="82" text-anchor="middle" font-size="10" fill="#C94A4A" font-weight="700">下降约 25%</text><path d="M 270 110 L 285 90" stroke="#C94A4A" stroke-width="1" marker-end="url(#arrow)"/><defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#C94A4A"/></marker></defs></svg><div class="svg-caption">图：12 周能量负平衡下 BMR 呈现显著下降趋势（数据源：模拟实验）</div></div><strong>问：</strong>从第 0 周到第 8 周 BMR 下降约 <strong>25%</strong>，此现象的生理意义是？<br><br><strong style="color:#8B6914;">参考答案</strong>：身体启动节能机制（甲状腺激素下调、瘦素下降），以减少能量消耗，适应长期能量短缺 &mdash;&mdash; <strong>这就是"减肥平台期"的生理本质</strong>。',
			qushi:		'<strong>近 5 年考情</strong>：<br>&bull; 2021 北京：考细胞呼吸能量释放（基础）<br>&bull; 2023 北京：考胰岛素分泌调节（进阶）<br>&bull; 2024 北京：考运动与葡萄糖代谢（应用）<br>&bull; <strong>2025 北京：考体重管理 &mdash; 首次联系"健康管理"热点</strong><br><br><strong>2026 预测</strong>：能量代谢题将继续贴近现实生活（糖尿病、肥胖防控、运动医学），考查"动态平衡"而非"静态记忆"。建议重点复习：<strong>激素网络调节 &middot; 代谢可塑性 &middot; 循证生活方式</strong>。',
			xinfa:		'遇到稳态/调节类选择题，记住 <strong>"三字诀"</strong>：<br><br>1. <strong>动</strong> &mdash; 稳态是"动态"平衡，别默认"不变"<br>2. <strong>代</strong> &mdash; 身体会"代偿"，长期刺激必引起调节<br>3. <strong>链</strong> &mdash; 激素不是孤立作用，注意"链式反应"<br><br><strong>本题应用</strong>：看到"长期"+"不变"这种组合，90% 概率是陷阱。',
			parent_tr:	'<strong>给家长的大白话</strong>：<br><br>这道题考的是 <strong>"为什么减肥越减越难减"</strong>。<br><br>身体很聪明 &mdash; 你长期少吃，它会自动"省电"（降低基础代谢），让你即使少吃也不怎么瘦。这就是"减肥平台期"的科学原理。<br><br><strong>孩子要理解的核心</strong>：身体的各种调节不是死板的"保持不变"，而是"灵活适应"。学生物就是学"身体怎么聪明地应对变化"。<br><br><strong>学习建议</strong>：多联系生活（运动、饮食、睡眠），生物就不会死记硬背。'
		}
	},

	2: {
		no: 2, type: '选择题', score: 2, difficulty: 0.82, level: 'easy',
		title: '第 2 题 · 细胞结构基础',
		stem: '下列关于真核细胞结构与功能的叙述，<strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '核糖体只在游离状态下合成蛋白质', correct: false },
			{ label: 'B', text: '溶酶体含多种水解酶，参与细胞内物质的分解', correct: true },
			{ label: 'C', text: '高尔基体主要功能是合成脂质', correct: false },
			{ label: 'D', text: '线粒体是所有真核细胞唯一的供能细胞器', correct: false }
		],
		answer: 'B',
		answer_note: '溶酶体是细胞内的"消化车间"，含多种酸性水解酶',
		dimensions: {
			kaodian: '考查 <strong>细胞结构与功能</strong>（必修一核心）：<br>&bull; 核糖体（游离 + 附着两种状态）<br>&bull; 溶酶体（水解酶 + 分解功能）<br>&bull; 高尔基体（加工 + 分泌）<br>&bull; 线粒体（有氧呼吸主要场所）',
			luoji: '本题是**概念辨析题**，考察对细胞器功能的精确理解。出题人在四个选项中每个都植入一个"常见误区"，看学生能不能精准识别。',
			tuili_steps: [
				'A 项错：核糖体可在游离态或附着在内质网上都能合成蛋白（游离核糖体合成胞内用，附着合成分泌蛋白）',
				'B 项对：溶酶体就是"细胞内的消化车间"，含酸性水解酶',
				'C 项错：合成脂质主要是<strong>内质网</strong>，高尔基体负责加工和分泌',
				'D 项错：厌氧真核生物（如某些酵母）可不依赖线粒体',
				'<strong>选 B</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 A</strong>：只记住"游离核糖体"忘记"附着核糖体"<br><strong style="color:#C94A4A;">误选 C</strong>：混淆内质网与高尔基体的分工<br><strong style="color:#C94A4A;">误选 D</strong>：被"所有"绝对化表述迷惑（生物学少用绝对化表述）',
			bianshi: '<strong>变式题</strong>：下图为某分泌蛋白合成路径<div class="variant-diagram">核糖体 &rarr; 内质网 &rarr; 囊泡 &rarr; 高尔基体 &rarr; 囊泡 &rarr; 细胞膜</div><strong>问</strong>：整个过程涉及哪些细胞器协作？为什么必须"囊泡运输"而不直接扩散？<br><br><strong style="color:#8B6914;">参考答案</strong>：核糖体（合成）、内质网（初步加工）、高尔基体（进一步加工+分选）、细胞膜（分泌）。囊泡运输是因为蛋白质分子太大无法跨膜扩散，且需精确定向到目标位置。',
			qushi: '细胞器结构是生物学<strong>最基础的考点</strong>，但 2025 北京试题已开始强调"<strong>协作关系</strong>"而不仅是孤立功能。2026 预测会继续考：<br>&bull; 细胞器的分工与协作<br>&bull; 膜系统的流动性（内质网、高尔基体、细胞膜是连续的）<br>&bull; 结构与功能相适应',
			xinfa: '细胞器题的 <strong>"两字诀"</strong>：<br>1. <strong>分</strong> &mdash; 功能不混淆（内质网合成、高尔基加工、溶酶体分解）<br>2. <strong>连</strong> &mdash; 记住膜系统的连续性<br><br>看到"所有"、"唯一"、"只有"这些绝对词，先打问号。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题就是考"<strong>细胞里每个小部件是干啥的</strong>"，类似问"工厂里每个车间的分工"。<br><br>核心知识：<br>&bull; 核糖体 = 车间（造蛋白）<br>&bull; 溶酶体 = 垃圾处理厂（分解旧东西）<br>&bull; 高尔基体 = 包装车间（不是制造车间）<br>&bull; 线粒体 = 发电厂（但不是唯一供能方式）<br><br>孩子要记住：生物学里<strong>少有"绝对"的东西</strong>，看到"所有/唯一/只能"要警惕。'
		}
	},

	3: {
		no: 3, type: '选择题', score: 2, difficulty: 0.78, level: 'easy',
		title: '第 3 题 · 光合作用过程',
		stem: '在研究光合作用的实验中，给植物叶片提供 <sup>14</sup>CO<sub>2</sub>，追踪 <sup>14</sup>C 的去向。下列分析 <strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: '<sup>14</sup>C 首先出现在 C<sub>3</sub> 化合物中', correct: false },
			{ label: 'B', text: '光照下 <sup>14</sup>C 最终会出现在葡萄糖中', correct: false },
			{ label: 'C', text: '<sup>14</sup>C 的固定发生在类囊体薄膜上', correct: true },
			{ label: 'D', text: '黑暗中 C<sub>3</sub> 含量会逐渐升高', correct: false }
		],
		answer: 'C',
		answer_note: 'CO₂ 固定发生在叶绿体基质（暗反应），不是类囊体薄膜',
		dimensions: {
			kaodian: '考查 <strong>光合作用 · 暗反应（卡尔文循环）</strong>：<br>&bull; CO<sub>2</sub> 固定：CO<sub>2</sub> + C<sub>5</sub> &rarr; 2×C<sub>3</sub><br>&bull; C<sub>3</sub> 还原：C<sub>3</sub> + NADPH + ATP &rarr; G3P &rarr; 葡萄糖<br>&bull; <strong>发生场所：叶绿体<u>基质</u>（不是类囊体）</strong>',
			luoji: '典型的<strong>"场所混淆"陷阱</strong>。光反应在<u>类囊体薄膜</u>，暗反应（含 CO<sub>2</sub> 固定）在<u>基质</u>。学生容易因为都在"叶绿体"里而混淆。',
			tuili_steps: [
				'同位素追踪：CO<sub>2</sub> 先被固定为 C<sub>3</sub>（A 对）',
				'C<sub>3</sub> 还原 &rarr; G3P &rarr; 葡萄糖（B 对）',
				'<strong>关键</strong>：CO<sub>2</sub> 固定的酶（Rubisco）在<strong>基质</strong>，不在类囊体（C 错 ✓）',
				'黑暗中光反应停 &rarr; NADPH/ATP 耗尽 &rarr; C<sub>3</sub> 无法还原 &rarr; C<sub>3</sub> 积累（D 对）',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 D</strong>：不理解"黑暗中 C<sub>3</sub> 为什么升高"<br>&rarr; 关键是区分"产生"和"消耗"：光反应停了 → ATP/NADPH 没了 → C<sub>3</sub> 只进不出<br><br><strong style="color:#C94A4A;">错过 C</strong>：以为"类囊体薄膜上"就是正确<br>&rarr; 经典混淆：光反应在类囊体，暗反应（CO<sub>2</sub> 固定）在基质',
			bianshi: '<strong>变式题</strong>：下图是光合作用示意图<div class="variant-diagram">光 ┐<br>&nbsp;&nbsp;&nbsp;↓<br>[类囊体薄膜]&nbsp;&larr;&nbsp;H₂O<br>&nbsp;&nbsp;&nbsp;↓&nbsp;ATP, NADPH, O₂<br>[叶绿体基质]&nbsp;&larr;&nbsp;CO₂<br>&nbsp;&nbsp;&nbsp;↓<br>葡萄糖</div><strong>问</strong>：突然停止光照，哪些物质浓度会在 30 秒内快速变化？<br><br><strong style="color:#8B6914;">参考答案</strong>：C<sub>3</sub> 上升（没 NADPH/ATP 还原它）；C<sub>5</sub> 下降（没有 C<sub>3</sub> 还原产物再生）；ATP/NADPH 下降（光反应停）；O<sub>2</sub> 骤降。',
			qushi: '光合作用是 <strong>每年必考</strong>，2025 重点考"同位素追踪"这种实验思维题。2026 预测方向：<br>&bull; C<sub>3</sub>/C<sub>5</sub> 动态变化（光变、CO<sub>2</sub> 浓度变化）<br>&bull; 光合作用与呼吸作用的关系（补偿点、饱和点）<br>&bull; C<sub>4</sub> 植物、CAM 植物的比较',
			xinfa: '光合作用题的 <strong>"三看"</strong>：<br>1. <strong>看场所</strong>：光反应（类囊体）vs 暗反应（基质）<br>2. <strong>看物质</strong>：ATP/NADPH 是连接两者的桥梁<br>3. <strong>看变化</strong>：光/暗切换时 C<sub>3</sub>、C<sub>5</sub> 的"积累/消耗"逻辑',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题就是考"<strong>植物怎么把阳光变成食物</strong>"。<br><br>简单说，叶绿体就像"<strong>太阳能饭店</strong>"：<br>&bull; 前厅（类囊体）：光 + 水 &rarr; 电能（ATP）<br>&bull; 后厨（基质）：电能 + CO<sub>2</sub> &rarr; 葡萄糖<br><br>这题的坑：<strong>把后厨的活记到前厅里去了</strong>。<br><br>孩子要掌握：生物学考点经常在"<strong>发生场所</strong>"上出陷阱题，要牢记每个反应"在哪里"。'
		}
	},

	4: {
		no: 4, type: '选择题', score: 2, difficulty: 0.75, level: 'easy',
		title: '第 4 题 · 有丝分裂判断',
		stem: '显微镜下观察洋葱根尖细胞，下列关于有丝分裂的叙述 <strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '前期可观察到染色体排列在赤道板上', correct: false },
			{ label: 'B', text: '中期是观察染色体形态和数目的最佳时期', correct: true },
			{ label: 'C', text: '后期染色体数目减半', correct: false },
			{ label: 'D', text: '末期核膜消失，细胞板出现', correct: false }
		],
		answer: 'B',
		answer_note: '中期染色体高度螺旋化、着丝粒排列在赤道板，是观察染色体的最佳时期',
		dimensions: {
			kaodian: '考查 <strong>有丝分裂各时期特征</strong>：<br>&bull; 间期：DNA 复制、蛋白质合成<br>&bull; 前期：染色质 &rarr; 染色体，核膜/核仁消失<br>&bull; <strong>中期：染色体在赤道板上整齐排列（观察最佳期）</strong><br>&bull; 后期：着丝粒分裂，染色体数量<strong>加倍</strong>（临时）<br>&bull; 末期：核膜重现、细胞板形成',
			luoji: '时期特征是<strong>必考基础题</strong>，出题人把每个时期的典型特征都故意错位组合，考学生对"谁在什么时候干什么"的精确记忆。',
			tuili_steps: [
				'A 错：排列在赤道板是<strong>中期</strong>，不是前期',
				'B 对：中期染色体最粗最短，形态最清晰，是观察染色体的最佳时期 ✓',
				'C 错：后期染色体数 <strong>加倍</strong>（不是减半），因为着丝粒分裂让姐妹染色单体分开各自成为独立染色体',
				'D 错：核膜消失是<strong>前期</strong>，末期是核膜<strong>重现</strong>',
				'<strong>选 B</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C</strong>：混淆"染色体数"和"DNA 数"<br>&rarr; 后期：着丝粒断开，染色体数 <u>加倍</u>（从 2N &rarr; 4N），DNA 数不变<br><br><strong style="color:#C94A4A;">误选 D</strong>：记成"末期核膜消失"<br>&rarr; 前期核膜<u>消失</u>，末期核膜<u>重现</u>',
			bianshi: '<strong>变式题</strong>：某学生在显微镜下看到下面 4 个分裂相<div class="variant-diagram">1️⃣ 染色体分散在整个细胞<br>2️⃣ 染色体整齐排列在中央<br>3️⃣ 染色体向两极分开<br>4️⃣ 细胞中间出现板状结构</div><strong>问</strong>：分别是哪个时期？哪个最适合观察染色体数目？<br><br><strong style="color:#8B6914;">参考答案</strong>：1=前期，2=中期，3=后期，4=末期。<strong>2（中期）</strong>最适合观察染色体数目，因为染色体此时排列整齐、形态清晰，便于计数。',
			qushi: '有丝分裂是<strong>必修一传统考点</strong>，每年都考，2025 考法偏向"结合实验操作"。2026 预测会继续考：<br>&bull; 各时期特征判断（选择题）<br>&bull; 染色体/DNA/染色单体数量变化曲线<br>&bull; 与减数分裂的比较',
			xinfa: '有丝分裂的 <strong>"四字口诀"</strong>：<br>&bull; <strong>前</strong>——膜核消失，纺锤出现<br>&bull; <strong>中</strong>——赤道排列，着丝粒齐<br>&bull; <strong>后</strong>——丝裂体分，数目加倍<br>&bull; <strong>末</strong>——核膜重现，细胞板生<br><br><strong>观察诀</strong>：看染色体，找中期（最清晰）。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题就是考"<strong>细胞分裂的每一步在干啥</strong>"。<br><br>想象一个细胞分裂像<strong>排队列</strong>：<br>&bull; 前期：大家准备好了，解散集合（染色体出现）<br>&bull; 中期：排成一横排站在中间（观察最清楚）<br>&bull; 后期：分两队向两边走<br>&bull; 末期：两队各自成立新班级（新细胞）<br><br>孩子要记的重点是：<strong>每一步发生什么</strong>，尤其"后期染色体数加倍"这个坑（因为每根染色体裂成两根）。'
		}
	},

	5: {
		no: 5, type: '选择题', score: 2, difficulty: 0.72, level: 'easy',
		title: '第 5 题 · 遗传基本规律',
		stem: '豌豆的高茎（D）对矮茎（d）为显性。将纯合高茎豌豆与矮茎豌豆杂交，F<sub>1</sub> 自交得 F<sub>2</sub>。下列分析 <strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: 'F<sub>1</sub> 全为高茎', correct: false },
			{ label: 'B', text: 'F<sub>2</sub> 中高茎和矮茎比例为 3:1', correct: false },
			{ label: 'C', text: 'F<sub>2</sub> 中的高茎全为杂合子', correct: true },
			{ label: 'D', text: 'F<sub>2</sub> 中纯合高茎 : 杂合高茎 : 矮茎 = 1:2:1', correct: false }
		],
		answer: 'C',
		answer_note: 'F₂ 高茎中 1/3 为 DD（纯合），2/3 为 Dd（杂合）',
		dimensions: {
			kaodian: '考查 <strong>孟德尔分离定律</strong>（必修二核心）：<br>&bull; 亲本：DD × dd &rarr; F<sub>1</sub> 全 Dd<br>&bull; F<sub>1</sub> 自交：Dd × Dd &rarr; F<sub>2</sub> 1DD : 2Dd : 1dd<br>&bull; 表型比 3:1，基因型比 1:2:1',
			luoji: '出题人在 C 项植入<strong>典型误解</strong>："F<sub>2</sub> 高茎"包含了 DD 和 Dd 两种基因型，不是"全为杂合子"。这是分离定律最常考的坑。',
			tuili_steps: [
				'写出亲本：DD × dd &rarr; F<sub>1</sub> 全 Dd（A 对）',
				'F<sub>1</sub> 自交 Dd × Dd &rarr; F<sub>2</sub> 1DD : 2Dd : 1dd',
				'F<sub>2</sub> 表型：高茎（DD+Dd）占 3/4，矮茎（dd）占 1/4，比例 3:1（B 对）',
				'<strong>F<sub>2</sub> 高茎中</strong>：1/3 DD（纯合）+ 2/3 Dd（杂合），<strong>不是全为杂合</strong>（C 错 ✓）',
				'基因型比 1 DD : 2 Dd : 1 dd，对应"纯合高茎 : 杂合高茎 : 矮茎 = 1:2:1"（D 对）',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 D</strong>：没算清 1:2:1 的基因型比<br>&rarr; 注意 D 问的是基因型比，不是表型比<br><br><strong style="color:#C94A4A;">错过 C</strong>：把"F<sub>2</sub> 高茎"当成"全杂合"<br>&rarr; 经典陷阱：F<sub>2</sub> 高茎中纯合和杂合<strong>同时存在</strong>',
			bianshi: '<strong>变式题</strong>：某同学将 F<sub>2</sub> 的所有高茎豌豆选出来，<strong>继续自交</strong>得 F<sub>3</sub>。<br><br><strong>问</strong>：F<sub>3</sub> 中高茎和矮茎比例是多少？<br><br><strong style="color:#8B6914;">参考答案</strong>：F<sub>2</sub> 高茎中 1/3 DD 和 2/3 Dd：<br>&bull; 1/3 DD 自交 &rarr; 全 DD（高）<br>&bull; 2/3 Dd 自交 &rarr; 3/4 高 + 1/4 矮<br>合计：高 = 1/3 + 2/3×3/4 = 1/3+1/2 = <strong>5/6</strong>；矮 = 2/3×1/4 = <strong>1/6</strong>。<br><strong>比例 5:1</strong>。',
			qushi: '遗传定律是<strong>每年必考</strong>，2025 题仍为基础题。2026 预测趋势：<br>&bull; 单定律 &rarr; 自由组合（两对基因）<br>&bull; 结合<strong>计算题</strong>（概率、比例）<br>&bull; 人类遗传病、系谱图分析',
			xinfa: '分离定律的 <strong>"三步法"</strong>：<br>1. <strong>写基因型</strong>：亲本 &rarr; F<sub>1</sub> &rarr; F<sub>2</sub><br>2. <strong>分表型和基因型</strong>：F<sub>2</sub> 表型 3:1，基因型 1:2:1<br>3. <strong>问谁算谁</strong>：问 F<sub>2</sub> 高茎就在 3 份里算，别把 4 份都算上<br><br><strong>秒杀</strong>：看到"F<sub>2</sub> 高茎"，记住 1/3 纯合 + 2/3 杂合。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题就是考<strong>孟德尔豌豆实验</strong>（生物书必学内容）。<br><br>核心知识：<br>&bull; 高 × 矮 &rarr; 全高（子一代）<br>&bull; 子一代自交 &rarr; 3 高 1 矮（子二代）<br>&bull; <strong>子二代的高茎不是都一样！</strong> 有 1/3 是纯种（DD），2/3 是杂种（Dd）<br><br>这题的坑：<strong>子二代高茎 ≠ 都是杂合</strong>。<br><br>孩子掌握这个规律，遗传题就能拿分。'
		}
	},

	6: {
		no: 6, type: '选择题', score: 2, difficulty: 0.70, level: 'easy',
		title: '第 6 题 · 种群增长曲线',
		stem: '下图表示某种群在有限环境中的增长曲线。下列分析 <strong>正确的是</strong>：<div class="variant-diagram" style="margin:8px 0;">种群数量<br>&nbsp;&nbsp;&nbsp;&nbsp;▲<br>&nbsp;&nbsp;K ╱━━━━ 渐近线 K<br>&nbsp;&nbsp;&nbsp;&nbsp;╱<br>&nbsp;&nbsp;K/2 ······<br>&nbsp;&nbsp;&nbsp;╱<br>&nbsp;&nbsp;─────────▶ 时间<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S 型曲线</div>',
		options: [
			{ label: 'A', text: '种群数量在 K/2 时增长速率最大', correct: true },
			{ label: 'B', text: 'K 值不随环境变化而改变', correct: false },
			{ label: 'C', text: 'S 型曲线描述无限环境下的增长', correct: false },
			{ label: 'D', text: '种群初始数量越大 K 值越大', correct: false }
		],
		answer: 'A',
		answer_note: 'K/2 时 dN/dt 最大，是渔业捕捞、害虫防治的关键点',
		dimensions: {
			kaodian: '考查 <strong>种群数量增长模型</strong>（必修三生态学）：<br>&bull; J 型曲线：无限环境（理想状态）<br>&bull; <strong>S 型曲线：有限环境</strong>（真实生态）<br>&bull; <strong>K 值</strong>（环境容纳量）：环境能维持的最大种群数量<br>&bull; <strong>K/2 是增长速率拐点</strong>',
			luoji: '本题考察对 <strong>S 型曲线的数学本质</strong>的理解。很多学生只记"K/2 增长最快"但不知道为什么。<br><br>数学本质：<strong>dN/dt = rN(1-N/K)</strong>，对 N 求导令其为 0 &rarr; N = K/2 时 dN/dt 最大。',
			tuili_steps: [
				'A 对：K/2 时种群增长速率最大（斜率最大），这是捕捞、防治害虫的理论依据 ✓',
				'B 错：K 值<strong>随环境变化</strong>（资源增加则 K 升高，环境恶化则 K 下降）',
				'C 错：S 型描述<strong>有限</strong>环境，J 型描述无限环境',
				'D 错：K 值由<strong>环境资源</strong>决定，与初始数量无关',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 B</strong>：以为 K 值是"绝对容量"<br>&rarr; 实际 K 值是"<u>当前环境</u>下的容量"，环境变 K 就变<br><br><strong style="color:#C94A4A;">错过 A</strong>：K/2 概念不熟<br>&rarr; 记住：K/2 = 最大增长点 = 最适捕捞/防治点',
			bianshi: '<strong>变式题</strong>：某渔场鱼类 K 值为 10000，当前数量 8000。问：<br>① 此时增长速率如何？<br>② 要获得最大可持续产量，应把种群维持在什么数量？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>① 当前 8000 已超过 K/2（5000），增长速率<strong>正在下降</strong>，接近 0<br>② 维持在 <strong>K/2 = 5000</strong> 时可持续捕捞，每次捕到让种群回到 K/2 时增长最快<br><strong>启示</strong>：过度捕捞不是"多捕鱼"，而是"破坏增长点"。',
			qushi: '种群增长是生态学<strong>核心考点</strong>，2025 北京结合"可持续发展"出题。2026 预测：<br>&bull; S/J 型曲线比较<br>&bull; K/2 的应用（捕捞、害虫防治）<br>&bull; 种群数量调查方法（标志重捕、样方法）<br>&bull; 结合现实生态问题（濒危物种保护）',
			xinfa: '种群曲线 <strong>"三点记"</strong>：<br>1. <strong>0 点</strong>：J 型和 S 型都从 0 开始<br>2. <strong>K/2 点</strong>：S 型增长最快<br>3. <strong>K 点</strong>：达到容纳量，增长 = 0<br><br><strong>秒杀口诀</strong>：K 随环境变，K/2 最关键。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题讲的是<strong>"一群动物/人能在一个地方繁衍到多少"</strong>。<br><br>想象一个池塘养鱼：<br>&bull; 开始鱼少，吃的多，长得快（J 型）<br>&bull; 鱼多了，吃的抢不到，长得慢（S 型）<br>&bull; <strong>到一半的时候长得最快</strong>（K/2 原理）<br>&bull; 最后满了就不长了（K 值）<br><br>生活应用：<br>&bull; <strong>渔业</strong>：把鱼保持在池塘最大容量的一半，鱼长得最快<br>&bull; <strong>害虫防治</strong>：在害虫到达最大数量一半时打最有效<br><br>孩子要记：<strong>K/2 就是黄金点</strong>。'
		}
	},

	7: {
		no: 7, type: '选择题', score: 2, difficulty: 0.65, level: 'medium',
		title: '第 7 题 · 神经调节过程',
		stem: '人突然用手触碰高温物体，立刻缩手。下列关于这一反射活动的叙述 <strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '这是条件反射，反射弧包括大脑皮层', correct: false },
			{ label: 'B', text: '神经冲动在反射弧上的传导是双向的', correct: false },
			{ label: 'C', text: '缩手动作完成后才感到疼痛', correct: true },
			{ label: 'D', text: '兴奋通过突触时为双向传递', correct: false }
		],
		answer: 'C',
		answer_note: '缩手反射由脊髓完成（快），痛觉传到大脑皮层后才产生（稍慢）',
		dimensions: {
			kaodian: '考查 <strong>反射与反射弧</strong>：<br>&bull; 反射类型：<strong>非条件反射</strong>（先天、低级中枢）vs 条件反射（后天、大脑皮层）<br>&bull; 反射弧：感受器 → 传入神经 → 神经中枢 → 传出神经 → 效应器<br>&bull; 突触传递：<strong>单向</strong>（化学递质只从突触前膜 → 后膜）',
			luoji: '本题考察多个细节：反射类型、传导方向、痛觉形成时序。C 选项是<strong>重点</strong>——它体现了"低级中枢快、高级中枢慢"的神经特性。',
			tuili_steps: [
				'缩手反射是<strong>非条件反射</strong>，中枢在脊髓（不是大脑皮层）（A 错）',
				'反射弧上神经冲动<strong>单向</strong>传导（B 错）',
				'C 对：缩手反射由脊髓完成（毫秒级），痛觉需要信号传到大脑皮层（较慢），所以<strong>先缩手、后感觉痛</strong> ✓',
				'突触传递是<strong>单向</strong>的（递质只能由突触前膜释放）（D 错）',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 A</strong>：把非条件反射当条件反射<br>&rarr; 缩手反射是<u>先天</u>的，不需要学习；骑车、写字才是条件反射<br><br><strong style="color:#C94A4A;">误选 B 或 D</strong>：分不清"反射弧"和"突触"都是<strong>单向</strong>',
			bianshi: '<strong>变式题</strong>：下图是缩手反射弧示意图<div class="variant-diagram">热刺激<br>&nbsp;&nbsp;↓<br>[皮肤感受器]<br>&nbsp;&nbsp;↓ 传入神经<br>[脊髓中枢] ——→ [大脑皮层（痛觉）]<br>&nbsp;&nbsp;↓ 传出神经<br>[缩手肌肉效应器]</div><strong>问</strong>：为什么说"缩手先于痛觉"？这种设计的生理意义是什么？<br><br><strong style="color:#8B6914;">参考答案</strong>：缩手只需经过脊髓（短回路，毫秒级），痛觉要经过大脑皮层（长回路，更慢）。<strong>生理意义</strong>：让身体在"意识到疼"之前就避开伤害，这是进化优化的<strong>保护机制</strong>。',
			qushi: '神经调节是<strong>必考模块</strong>，2025 北京结合"生活实例"考。2026 预测：<br>&bull; 反射弧的组成和传导方向<br>&bull; 突触的结构和递质<br>&bull; 神经系统的分级调节（脊髓 vs 大脑）<br>&bull; 与激素调节的协同',
			xinfa: '神经传导 <strong>"两个单向"</strong>：<br>1. <strong>反射弧单向</strong>：感受器 → 效应器，不能反过来<br>2. <strong>突触单向</strong>：前膜 → 后膜，化学递质不能倒流<br><br><strong>秒杀</strong>：凡是说"双向"的都错。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>孩子手碰到热水壶，<strong>为什么还没感觉疼就先缩手了？</strong><br><br>因为你的身体有两条路：<br>&bull; <strong>快速路</strong>：皮肤 → 脊髓 → 缩手（几毫秒）<br>&bull; <strong>慢速路</strong>：皮肤 → 大脑 → 感觉疼（几十毫秒）<br><br>快速路让你先避开危险，<strong>这是进化给人类的自保机制</strong>。<br><br>孩子要理解：<strong>神经系统是分级的</strong>——低级中枢管快反应，高级中枢管思考。'
		}
	},

	8: {
		no: 8, type: '选择题', score: 2, difficulty: 0.60, level: 'medium',
		title: '第 8 题 · 免疫系统功能',
		stem: '关于人体特异性免疫的叙述，<strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: 'B 细胞只能在胸腺中成熟', correct: false },
			{ label: 'B', text: '浆细胞（效应 B 细胞）可分泌大量抗体', correct: true },
			{ label: 'C', text: '抗体可直接裂解被感染细胞', correct: false },
			{ label: 'D', text: '记忆细胞在第二次接触抗原后才产生', correct: false }
		],
		answer: 'B',
		answer_note: '浆细胞是抗体分泌工厂，每秒可分泌数千个抗体分子',
		dimensions: {
			kaodian: '考查 <strong>特异性免疫</strong>（新教材重点）：<br>&bull; <strong>体液免疫</strong>：B 细胞 → 浆细胞 → 抗体<br>&bull; <strong>细胞免疫</strong>：T 细胞 → 细胞毒性 T 细胞 → 裂解感染细胞<br>&bull; 成熟场所：<strong>B 细胞在骨髓</strong>，T 细胞在胸腺<br>&bull; 记忆细胞：初次免疫就产生，二次应答更快更强',
			luoji: '出题人把 4 种常见误区都打包进来：成熟场所混淆、抗体功能夸大、记忆细胞产生时机、浆细胞功能。考察学生对免疫系统的<strong>精确认知</strong>。',
			tuili_steps: [
				'A 错：<strong>B 细胞在骨髓成熟</strong>（Bone marrow）、T 细胞在胸腺（Thymus）成熟',
				'B 对：浆细胞（又叫效应 B 细胞）是<strong>抗体生产工厂</strong>，每秒可分泌数千个抗体 ✓',
				'C 错：抗体<strong>不能直接裂解细胞</strong>，只能中和毒素/病毒，或标记细胞供其他免疫细胞识别',
				'D 错：记忆细胞在<strong>初次免疫应答</strong>中就产生，储存起来供二次应答使用',
				'<strong>选 B</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C</strong>：以为抗体能"杀细胞"<br>&rarr; 抗体只能<u>结合</u>抗原（中和、标记），<u>裂解</u>是细胞毒性 T 细胞或补体的活<br><br><strong style="color:#C94A4A;">误选 D</strong>：以为记忆细胞是二次免疫产生<br>&rarr; 初次免疫就产生记忆细胞（否则二次就不会更快了）',
			bianshi: '<strong>变式题</strong>：某人感染新冠病毒后，体内抗体变化如图<div class="variant-diagram">抗体量<br>&nbsp;▲<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;━━━━━━━<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;╱<br>&nbsp;&nbsp;&nbsp;&nbsp;╱<br>&nbsp;&nbsp;╱&nbsp;&nbsp;二次感染<br>&nbsp;&nbsp;━━━━━━━━<br>&nbsp;&nbsp;&nbsp;初次感染<br>─────────▶ 时间</div><strong>问</strong>：为什么二次感染时抗体产生得又快又多？<br><br><strong style="color:#8B6914;">参考答案</strong>：初次感染时产生了<strong>记忆 B 细胞</strong>，它们长期存活在体内。二次感染时记忆细胞快速增殖并分化为大量浆细胞，短时间内分泌大量抗体 —— 这就是<strong>疫苗的原理</strong>。',
			qushi: '免疫系统是<strong>新课标重点</strong>，2025-2026 结合疫情背景强化。预测方向：<br>&bull; 体液免疫 vs 细胞免疫的分工<br>&bull; 疫苗作用机制（记忆细胞）<br>&bull; 自身免疫病、免疫缺陷病（艾滋病）<br>&bull; 器官移植、过敏反应',
			xinfa: '免疫 <strong>"三位一体"</strong>：<br>1. <strong>抗原</strong>（外来物）→ 激活免疫<br>2. <strong>免疫细胞</strong>（B/T/记忆）→ 识别 + 分化<br>3. <strong>抗体</strong>（武器）→ 中和 + 标记<br><br><strong>秒杀</strong>：抗体只<u>结合</u>不<u>裂解</u>；B 细胞在<u>骨髓</u>不在胸腺。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>免疫系统就像<strong>身体的军队</strong>：<br>&bull; <strong>抗原</strong> = 敌人（病毒、细菌）<br>&bull; <strong>B 细胞 / 浆细胞</strong> = 武器工厂（造抗体）<br>&bull; <strong>T 细胞</strong> = 特种兵（直接杀死感染细胞）<br>&bull; <strong>记忆细胞</strong> = 老兵（第一次打赢就记下敌人样子）<br><br>所以打疫苗的原理：<strong>让身体"见过"敌人，记忆细胞就能认出来</strong>，下次真敌人来就打得更快。<br><br>孩子掌握：抗体只能"<strong>打标记/中和毒</strong>"，真正"杀人"的是 T 细胞。'
		}
	},

	9: {
		no: 9, type: '选择题', score: 2, difficulty: 0.55, level: 'medium',
		title: '第 9 题 · 油菜素内酯调节',
		stem: '油菜素内酯（BR）是一种重要的植物激素。研究者测定不同浓度 BR 对拟南芥幼苗下胚轴伸长的影响，结果如图。下列分析 <strong>错误的是</strong>：<div class="variant-diagram" style="margin:8px 0;">下胚轴长度 (mm)<br>&nbsp;&nbsp;▲<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;●<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;●&nbsp;&nbsp;&nbsp;&nbsp;●<br>&nbsp;&nbsp;&nbsp;●<br>&nbsp;●<br>───────────▶ BR 浓度<br>0 &nbsp;0.1 1 &nbsp;10 &nbsp;100 nM</div>',
		options: [
			{ label: 'A', text: 'BR 在较低浓度促进伸长，较高浓度抑制伸长', correct: false },
			{ label: 'B', text: 'BR 作用呈现两重性', correct: false },
			{ label: 'C', text: 'BR 和生长素的作用机制完全相同', correct: true },
			{ label: 'D', text: '最适促进浓度约为 1 nM', correct: false }
		],
		answer: 'C',
		answer_note: 'BR 和生长素是不同激素，信号通路和受体都不同',
		dimensions: {
			kaodian: '考查 <strong>植物激素（新教材重点拓展）</strong>：<br>&bull; 五大经典激素：生长素、赤霉素、细胞分裂素、脱落酸、乙烯<br>&bull; <strong>新增激素</strong>：油菜素内酯（BR）、茉莉素、水杨酸等<br>&bull; 共同特征：<strong>低浓度促进、高浓度抑制</strong>（两重性）<br>&bull; 但<strong>作用机制各不相同</strong>',
			luoji: '这道题考的是<strong>"共性 vs 特性"</strong>。学生容易因为"两重性"这个共同特征就认为所有激素都一样，但每种激素有自己独特的受体和信号通路。',
			tuili_steps: [
				'看图：BR 浓度从低到高，下胚轴长度先升后降（A 对）',
				'这种"低促高抑"就是植物激素的<strong>两重性</strong>（B 对）',
				'<strong>关键</strong>：BR 和生长素是<u>不同的激素</u>，受体不同、信号通路不同（C 错 ✓）',
				'从图看，1 nM 处下胚轴最长（D 对）',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 A 或 B</strong>：被"图看不清"困扰<br>&rarr; 记住植物激素<u>普遍具有</u>两重性，图形上就是"先升后降"<br><br><strong style="color:#C94A4A;">错过 C</strong>：误以为"共性 = 机制相同"<br>&rarr; 两重性是<u>现象</u>的共性，不代表<u>机制</u>相同',
			bianshi: '<strong>变式题</strong>：某研究将生长素和 BR 同时作用于植物，结果发现<strong>协同促进</strong>伸长，但浓度比不同时效果不同。<br><br><strong>问</strong>：这说明什么？如何设计实验验证两者作用机制的差异？<br><br><strong style="color:#8B6914;">参考答案</strong>：说明 BR 和生长素<strong>有独立作用</strong>，但协同工作时效果更好（可能激活不同信号通路互补）。<strong>验证方法</strong>：用受体突变体——单独敲除生长素受体或 BR 受体，看是否仍能响应另一激素。如果能，说明两者受体独立。',
			qushi: '植物激素是<strong>新教材重点扩展</strong>，2025 北京首次考 BR。2026 预测方向：<br>&bull; 新激素（BR、茉莉素等）的发现与作用<br>&bull; 激素协同/拮抗（生长素 + 乙烯、ABA + GA）<br>&bull; 实验设计（浓度梯度、时相分析）<br>&bull; 农业应用（激素调控开花、果实成熟）',
			xinfa: '植物激素 <strong>"两看"</strong>：<br>1. <strong>看共性</strong>：低浓度促进、高浓度抑制（两重性）<br>2. <strong>看特性</strong>：受体不同、通路不同<br><br><strong>秒杀</strong>：看到"机制完全相同"——必错。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>植物激素就像<strong>人体里的各种调节剂</strong>：<br>&bull; 少量用——促进生长<br>&bull; 多了——反而抑制（物极必反）<br>&bull; 每种激素<strong>都有自己的"钥匙和锁"</strong>（受体不同）<br><br>这道题的坑：学生容易认为"都是植物激素，作用机制就一样"。就像<strong>胰岛素和生长激素都是人体激素，但作用完全不同</strong>。<br><br>孩子要记：生物学里"相似 ≠ 相同"。'
		}
	},

	10: {
		no: 10, type: '选择题', score: 2, difficulty: 0.52, level: 'medium',
		title: '第 10 题 · DNA 复制机制',
		stem: '将大肠杆菌在含 <sup>15</sup>N 的培养基中培养多代后，转移到含 <sup>14</sup>N 的培养基中继续培养。下列关于 DNA 复制的叙述 <strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: '复制方式为半保留复制', correct: false },
			{ label: 'B', text: '第一次复制后子代 DNA 全部为 <sup>14</sup>N/<sup>15</sup>N 中带', correct: false },
			{ label: 'C', text: '第二次复制后重带（<sup>15</sup>N/<sup>15</sup>N）DNA 占 1/2', correct: true },
			{ label: 'D', text: '该实验证明了半保留复制方式', correct: false }
		],
		answer: 'C',
		answer_note: '第二次复制后：1/2 为轻带(¹⁴N/¹⁴N)、1/2 为中带(¹⁴N/¹⁵N)、重带 = 0',
		dimensions: {
			kaodian: '考查 <strong>Meselson-Stahl 实验</strong>（DNA 半保留复制经典实验）：<br>&bull; <strong>半保留复制</strong>：每条新 DNA = 1 条旧链 + 1 条新链<br>&bull; 第一次复制：全中带（<sup>15</sup>N/<sup>14</sup>N）<br>&bull; 第二次复制：1/2 轻带（<sup>14</sup>N/<sup>14</sup>N）+ 1/2 中带（<sup>14</sup>N/<sup>15</sup>N）<br>&bull; <strong>重带（<sup>15</sup>N/<sup>15</sup>N）彻底消失</strong>',
			luoji: '这题考察对<strong>"半保留"四字含义的精确理解</strong>。第二次复制后重带已经为 0（没有纯 <sup>15</sup>N 的 DNA 了），出题人设 C 选项考学生是否真懂半保留。',
			tuili_steps: [
				'初始：全部 <sup>15</sup>N/<sup>15</sup>N（重带）',
				'第一次复制：每个旧链配一个新 <sup>14</sup>N 链 &rarr; 全部 <sup>15</sup>N/<sup>14</sup>N（中带）（B 对）',
				'第二次复制：2 条中带 DNA 各自分开重组 &rarr; 1 条 <sup>15</sup>N 旧链配新 <sup>14</sup>N = 中带；1 条 <sup>14</sup>N 旧链配新 <sup>14</sup>N = 轻带',
				'结果：1/2 中带 + 1/2 轻带，<strong>重带 = 0</strong>（C 错 ✓）',
				'整个实验证明的正是半保留复制（D 对）',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误以为 C 对</strong>：没理解第二次复制时 <sup>15</sup>N 链已"稀释"<br>&rarr; <sup>15</sup>N 旧链只有 2 条，复制时各配一个 <sup>14</sup>N，所以全变中带，无重带<br><br><strong>关键</strong>：第 n 次后，中带 DNA = 2 条（一直固定，来自最初 2 条 <sup>15</sup>N 链），轻带 = 2<sup>n</sup> - 2',
			bianshi: '<strong>变式题</strong>：经过 <strong>4 次复制</strong>后，轻带和中带的比例是多少？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>&bull; 总 DNA 数 = 2<sup>4</sup> = 16<br>&bull; 中带 = 2（始终是最初的 2 条 <sup>15</sup>N 链和新配的 <sup>14</sup>N 链）<br>&bull; 轻带 = 16 − 2 = <strong>14</strong><br>&bull; 比例 <strong>轻带 : 中带 = 7 : 1</strong><br>&bull; 规律：<strong>中带永远 = 2，轻带 = 2<sup>n</sup> − 2</strong>',
			qushi: 'DNA 半保留复制是<strong>必修二经典考点</strong>，2025 北京结合计算题考查。2026 预测：<br>&bull; <sup>15</sup>N 实验的各种变形<br>&bull; DNA 复制的酶和过程（DNA 聚合酶、解旋酶）<br>&bull; 复制的方向性、前导链/后随链<br>&bull; 结合基因突变、PCR 技术',
			xinfa: 'DNA 复制 <strong>"n 次法"</strong>：<br>&bull; <strong>中带 DNA 数 = 2</strong>（永远不变，来自最初双链）<br>&bull; <strong>轻带 DNA 数 = 2<sup>n</sup> − 2</strong><br>&bull; <strong>重带 DNA 数 = 0</strong>（从第 2 次起）<br><br><strong>秒杀</strong>：看到"重带"占比问题，答 0；看到第 n 次，套公式。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考的是 DNA 怎么复制（每次细胞分裂时 DNA 要先复制一份）。<br><br>核心发现（Nobel 级别的实验）：<strong>DNA 是"半保留"复制</strong>——每条新 DNA 里，有一半来自老的，一半是新造的。<br><br>想象：<strong>两股麻绳拆开各自配一个新绳</strong>，所以每次复制都会有"老+新"混合。<br><br>这题的坑：用重氮标记 <sup>15</sup>N 和 <sup>14</sup>N 来证明这个机制。第二次复制后，<strong>纯重（全老）的 DNA 已经没有了</strong>，因为老链只有 2 条，各自都配了新的。<br><br>孩子要记：<strong>DNA 复制始终保留 1 条旧链</strong>，这是生物学最美的实验之一。'
		}
	},

	11: {
		no: 11, type: '选择题', score: 2, difficulty: 0.50, level: 'medium',
		title: '第 11 题 · 基因表达调控',
		stem: '真核生物基因表达受多层次调控。下列叙述 <strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '基因表达调控只发生在转录水平', correct: false },
			{ label: 'B', text: 'mRNA 的 5\' 帽和 3\' 尾结构影响翻译效率', correct: true },
			{ label: 'C', text: '所有基因在所有细胞中表达量相同', correct: false },
			{ label: 'D', text: '表观遗传修饰不影响基因表达', correct: false }
		],
		answer: 'B',
		answer_note: '5\' 帽保护 mRNA 免受降解并招募核糖体；3\' 尾延长 mRNA 稳定性',
		dimensions: {
			kaodian: '考查 <strong>真核生物基因表达调控</strong>（新教材深化内容）：<br>&bull; <strong>转录水平</strong>：启动子、转录因子<br>&bull; <strong>RNA 加工</strong>：5\' 帽、3\' 尾、剪接<br>&bull; <strong>翻译水平</strong>：mRNA 稳定性、翻译因子<br>&bull; <strong>翻译后修饰</strong>：磷酸化、糖基化<br>&bull; <strong>表观遗传</strong>：DNA 甲基化、组蛋白修饰',
			luoji: '出题人要考"<strong>调控是多层次的，不只是转录</strong>"这个核心概念。B 选项是 RNA 加工水平的具体例子。',
			tuili_steps: [
				'A 错：基因表达调控发生在<strong>多个层次</strong>（转录、加工、翻译、翻译后）',
				'B 对：5\' 帽（m7G）保护 mRNA + 招募核糖体；3\' 聚腺苷尾（poly-A）延长稳定性 ✓',
				'C 错：不同细胞<strong>选择性表达</strong>不同基因（这就是细胞分化的基础）',
				'D 错：表观遗传修饰（甲基化、组蛋白修饰）<strong>强烈影响</strong>基因表达',
				'<strong>选 B</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 A</strong>：只记得转录层面调控<br>&rarr; 实际还有 RNA 加工、翻译、翻译后多个层次<br><br><strong style="color:#C94A4A;">错过 D</strong>：不熟悉"表观遗传"<br>&rarr; 表观遗传是<u>不改变 DNA 序列但影响表达</u>（甲基化等）',
			bianshi: '<strong>变式题</strong>：同卵双胞胎基因型完全相同，但长大后患不同疾病。原因是什么？<br><br><strong style="color:#8B6914;">参考答案</strong>：<strong>表观遗传差异</strong>。虽然 DNA 序列相同，但后天环境（饮食、压力、接触化学物质）导致 DNA 甲基化模式不同，影响基因表达，从而出现表型差异。这正是 <strong>"先天 × 后天"</strong> 互动的分子基础。',
			qushi: '基因表达调控是<strong>新课标新增重点</strong>，2025-2026 会深化考查：<br>&bull; 真核 vs 原核的区别（核膜、内含子剪接）<br>&bull; 表观遗传（考频上升）<br>&bull; 非编码 RNA（miRNA、lncRNA）<br>&bull; 细胞分化的分子基础',
			xinfa: '基因表达 <strong>"五层调控"</strong>：<br>1. <strong>转录起始</strong>（启动子 + 转录因子）<br>2. <strong>转录后加工</strong>（加帽、加尾、剪接）<br>3. <strong>翻译</strong>（翻译因子、核糖体）<br>4. <strong>翻译后修饰</strong>（磷酸化等）<br>5. <strong>降解调控</strong>（泛素化）<br><br><strong>秒杀</strong>：看到"只"、"全部"这种绝对词——必错。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>每个细胞的 DNA 都一样，但<strong>肝细胞为什么跟心细胞不一样？</strong><br><br>因为身体<strong>控制了哪些基因"开"哪些"关"</strong>：<br>&bull; 肝细胞打开"肝酶基因"<br>&bull; 心细胞打开"心肌基因"<br>&bull; 其他基因关着<br><br>控制方法有很多种（转录、加工、翻译…），就像<strong>调音台上有很多旋钮</strong>。<br><br>最神奇的是<strong>表观遗传</strong>：虽然基因序列没变，但身体给它加个小"标签"（甲基化）就能改变它是否被读取——<strong>这就是为什么同卵双胞胎长大后会不一样</strong>。'
		}
	},

	12: {
		no: 12, type: '选择题', score: 2, difficulty: 0.47, level: 'medium',
		title: '第 12 题 · 生态系统能量流动',
		stem: '生态系统能量流动具有 <strong>单向流动、逐级递减</strong> 的特征。下列叙述 <strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: '能量流动的起点是生产者固定的太阳能', correct: false },
			{ label: 'B', text: '相邻两个营养级间的传递效率一般为 10%-20%', correct: false },
			{ label: 'C', text: '能量沿食物链可以循环利用', correct: true },
			{ label: 'D', text: '能量流动过程中有大量热能散失', correct: false }
		],
		answer: 'C',
		answer_note: '能量是"单向流动"，物质才是"循环利用"',
		dimensions: {
			kaodian: '考查 <strong>生态系统能量流动</strong>：<br>&bull; <strong>起点</strong>：生产者（绿色植物）光合作用固定太阳能<br>&bull; <strong>路径</strong>：生产者 → 初级消费者 → 次级消费者 → ... → 分解者<br>&bull; <strong>传递效率</strong>：10%-20%（林德曼金字塔法则）<br>&bull; <strong>特征</strong>：单向、逐级递减、<u>不循环</u><br>&bull; <strong>形式</strong>：化学能 → 热能（散失到环境）',
			luoji: '这是<strong>能量 vs 物质</strong>的经典辨析题。学生最常混淆：<br>&bull; <u>能量</u>：单向流动，不循环（最终以热能散失）<br>&bull; <u>物质</u>：循环利用（C、N、P 等元素）<br><br>C 选项就是把能量和物质的特征混淆的陷阱。',
			tuili_steps: [
				'A 对：能量流动起点是生产者固定的太阳能（光合作用）',
				'B 对：林德曼法则，一般 10%-20%',
				'<strong>C 错</strong>：能量<strong>单向流动不循环</strong>；<u>物质</u>才循环 ✓',
				'D 对：每个营养级呼吸作用、生命活动都以热能散失到环境',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误以为 C 对</strong>：把物质循环和能量流动混淆<br>&rarr; 记住：<strong>能量"单向"，物质"循环"</strong>（两大生态学基本规律）',
			bianshi: '<strong>变式题</strong>：某草原生态系统：草（100,000 kJ）→ 兔子（10,000 kJ）→ 狐狸（1,000 kJ）→ 狼（100 kJ）。<br><br><strong>问</strong>：① 传递效率是多少？② 如果牧民猎杀狼，狐狸会怎么变化？③ 100,000 kJ 草能量最终去了哪里？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>① 10%（符合林德曼法则）<br>② 狐狸数量增加（顶级天敌减少）→ 兔子减少 → 草增加（"十年不见狼，鹿就泛滥"）<br>③ 最终通过呼吸作用等<strong>全部以热能散失</strong>，不循环利用',
			qushi: '生态学是<strong>必修三核心</strong>，2025-2026 结合"双碳"热点：<br>&bull; 能量流动 + 物质循环（碳、氮、水）<br>&bull; 食物链/食物网的稳定性<br>&bull; 生物多样性保护<br>&bull; 生态足迹、碳中和、可持续发展',
			xinfa: '生态 <strong>"两大规律"</strong>：<br>1. <strong>能量：单向流动、逐级递减</strong>（10%-20%）<br>2. <strong>物质：循环往复、平衡分配</strong>（C、N、P 等）<br><br><strong>秒杀</strong>：看到"能量循环"——必错；看到"物质单向"——必错。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>生态系统就像一条<strong>"河流和水车"</strong>：<br>&bull; <strong>能量</strong>（河水）：从上游（太阳）流到下游（散失），<strong>不能倒流</strong>，最后全部散失成热<br>&bull; <strong>物质</strong>（水车的零件）：在河里循环利用，可以多次重复<br><br>吃的东西：<br>&bull; 草吸收 100 份太阳能<br>&bull; 兔子吃草只得 10-20 份（大部分被草自己用掉了）<br>&bull; 狐狸吃兔子只得 1-4 份<br>&bull; 最后全部变成热散掉了<br><br>这就是为什么<strong>食肉动物必然比食草动物少</strong>——能量不够了。<br><br>孩子要记：<strong>能量不循环，物质才循环</strong>。'
		}
	},

	13: {
		no: 13, type: '选择题', score: 2, difficulty: 0.44, level: 'medium',
		title: '第 13 题 · 生物进化证据',
		stem: '关于生物进化的证据与机制，下列叙述 <strong>正确的是</strong>：',
		options: [
			{ label: 'A', text: '化石是研究进化最直接的证据', correct: true },
			{ label: 'B', text: '自然选择作用于基因而非个体', correct: false },
			{ label: 'C', text: '突变总是有利于生物的生存', correct: false },
			{ label: 'D', text: '地理隔离一定导致生殖隔离', correct: false }
		],
		answer: 'A',
		answer_note: '化石能直接显示不同时期生物的形态，是最直接的证据',
		dimensions: {
			kaodian: '考查 <strong>进化论与现代综合进化论</strong>：<br>&bull; <strong>进化证据</strong>：化石（最直接）、比较解剖学、分子生物学、胚胎学<br>&bull; <strong>自然选择</strong>：作用于<u>个体</u>（表型），导致基因频率变化<br>&bull; <strong>突变</strong>：<u>大多有害或中性</u>，少数有利<br>&bull; <strong>物种形成</strong>：地理隔离 → 独立进化 → 生殖隔离<br>&bull; 地理隔离<u>不一定</u>导致生殖隔离',
			luoji: '这题是进化论的<strong>概念辨析集锦</strong>，4 个选项都是学生常犯的错误。正确答案 A 是进化学的基本结论。',
			tuili_steps: [
				'A 对：化石是进化的<strong>最直接证据</strong>（能看到不同时期的生物形态）✓',
				'B 错：自然选择<strong>作用于个体</strong>（表型），才间接改变种群基因频率',
				'C 错：突变<strong>大多中性或有害</strong>，少数有利才能被选择保留',
				'D 错：地理隔离是<u>起点</u>，需要长时间独立进化才可能形成生殖隔离（不必然）',
				'<strong>选 A</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误选 C</strong>：把"有利突变"当成"所有突变都有利"<br>&rarr; 实际上 99% 的突变是中性或有害的，只有极少数有利<br><br><strong style="color:#C94A4A;">误选 D</strong>：把"地理隔离 = 生殖隔离"<br>&rarr; 地理隔离是第一步，需要时间和进化压力才能形成生殖隔离',
			bianshi: '<strong>变式题</strong>：加拉帕戈斯群岛的达尔文雀（13 种鸟）都来自同一祖先。问：<br>① 为什么会分化成 13 种？<br>② 它们现在还能互相交配吗？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>① 不同岛屿食物不同（种子大小、昆虫类型等）→ 选择压力不同 → 喙形态分化 → 长期独立进化 → 生殖隔离<br>② 基本不能（已形成不同物种），即使相遇也不交配或产生不育后代。<br>这是<strong>"适应性辐射"</strong>的经典案例，也是现代进化论的铁证。',
			qushi: '进化论是<strong>必修二必考模块</strong>，2025-2026 结合分子生物学证据深化：<br>&bull; DNA/蛋白质序列比较<br>&bull; 遗传漂变（小种群进化）<br>&bull; 协同进化（捕食-被捕食、共生）<br>&bull; 现代分子进化钟',
			xinfa: '进化 <strong>"三要素"</strong>：<br>1. <strong>变异</strong>（突变 + 基因重组）——进化的原材料<br>2. <strong>选择</strong>（自然选择）——定向的筛选<br>3. <strong>隔离</strong>（地理 + 生殖）——物种形成的条件<br><br><strong>秒杀</strong>：看到"总是"、"一定"——多半错。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>生物是怎么进化的？就像<strong>不同岛上的雀鸟慢慢变成不同品种</strong>：<br><br>&bull; <strong>变异</strong>：DNA 偶尔出错，产生不同的鸟（有的喙大，有的喙小）<br>&bull; <strong>选择</strong>：吃大种子的岛上，大喙的活下来<br>&bull; <strong>时间</strong>：几千代后就变成另一个物种<br><br>关键概念：<br>&bull; <strong>化石</strong> = 证据（能看到几亿年前长啥样）<br>&bull; <strong>突变</strong> = 大部分是坏的（有害），少数好<br>&bull; <strong>地理隔离</strong> 只是起点，不保证一定变成新物种<br><br>孩子要记：<strong>进化没有"目的"，只有"适应"</strong>。'
		}
	},

	14: {
		no: 14, type: '选择题', score: 2, difficulty: 0.42, level: 'medium',
		title: '第 14 题 · 实验设计分析',
		stem: '某生物实验研究温度对酶活性的影响，设置了 20、30、40、50、60°C 五个温度组，测定产物生成量。下列关于实验设计的叙述 <strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: '温度是自变量，产物生成量是因变量', correct: false },
			{ label: 'B', text: '应控制每组 pH、底物浓度、酶浓度相同', correct: false },
			{ label: 'C', text: '为结果准确应只做一次实验', correct: true },
			{ label: 'D', text: '应设置空白对照排除非酶因素', correct: false }
		],
		answer: 'C',
		answer_note: '每组至少重复 3 次，取平均值，才能排除偶然误差',
		dimensions: {
			kaodian: '考查 <strong>科学实验设计原则</strong>（必修一实验素养）：<br>&bull; <strong>自变量</strong>：人为改变的因素（温度）<br>&bull; <strong>因变量</strong>：随自变量变化的指标（产物生成量）<br>&bull; <strong>无关变量</strong>：需控制相同（pH、底物浓度等）<br>&bull; <strong>对照组</strong>：排除非实验因素<br>&bull; <strong>重复实验</strong>：减少偶然误差',
			luoji: '实验设计的<strong>五大原则</strong>：① 单一变量 ② 对照 ③ 重复 ④ 随机 ⑤ 平行。C 选项违反了<strong>重复原则</strong>，是科学实验最基本的错误。',
			tuili_steps: [
				'A 对：温度（自变量）→ 产物生成量（因变量）',
				'B 对：pH、底物、酶浓度等是无关变量，必须保持一致（单一变量原则）',
				'C 错：<strong>必须重复 3 次以上</strong>取平均值，才能减少偶然误差 ✓',
				'D 对：空白对照（不加酶或加失活酶）用于排除非酶因素的干扰',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误以为 C 对</strong>：以为"一次就够"<br>&rarr; 生物实验受环境波动影响大，<u>必须多次重复</u>取平均<br><br><strong style="color:#C94A4A;">误选 D</strong>：不理解空白对照的必要性<br>&rarr; 没有对照就无法判断产物是酶催化还是自发反应',
			bianshi: '<strong>变式题</strong>：若上述实验在 40°C 组产物量突然异常高（其他组正常递增/递减），最可能的原因是什么？如何排查？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br><strong>可能原因</strong>：① 该组偶然污染 ② 底物/酶浓度控制不严 ③ 测量误差 ④ 设备故障<br><strong>排查方法</strong>：<br>① 重复 3-5 次实验，看异常是否重现<br>② 检查该组试剂是否污染、设备是否正常<br>③ 若多次重复后仍异常，说明可能发现了新现象，值得深入研究<br><br>关键教训：<strong>单次实验不可信，重复是科学的基石</strong>。',
			qushi: '实验设计是<strong>必修一必考</strong>，2025-2026 仍保持高频：<br>&bull; 单一变量、对照、重复原则<br>&bull; 自变量、因变量、无关变量的判断<br>&bull; 实验结果的分析（趋势、异常、误差）<br>&bull; 结合新情境（新酶、新药物的测试）',
			xinfa: '实验设计 <strong>"五字诀"</strong>：<br>1. <strong>一</strong>——单一变量<br>2. <strong>控</strong>——控制无关变量<br>3. <strong>对</strong>——设对照组<br>4. <strong>复</strong>——重复实验<br>5. <strong>均</strong>——取平均值<br><br><strong>秒杀</strong>：看到"只做一次"——必错。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>孩子做实验必须懂的<strong>科学基本法则</strong>：<br><br>&bull; <strong>只变一个东西</strong>：研究温度就只变温度，其他都一样<br>&bull; <strong>对照组</strong>：有个"啥都不做"的组作比较<br>&bull; <strong>多做几次</strong>：一次结果可能是偶然，3 次以上才靠谱<br>&bull; <strong>取平均</strong>：几次结果求平均才是真实数值<br><br>这道题的坑：说"只做一次"——这违反了科学常识（药品研发要做几千次重复）。<br><br>孩子要记：<strong>科学不相信"一次的结果"</strong>。'
		}
	},

	15: {
		no: 15, type: '选择题', score: 2, difficulty: 0.40, level: 'medium',
		title: '第 15 题 · 内环境稳态调节',
		stem: '人体内环境稳态是通过神经-体液-免疫调节网络共同维持的。下列叙述 <strong>错误的是</strong>：',
		options: [
			{ label: 'A', text: '内环境包括血浆、组织液和淋巴', correct: false },
			{ label: 'B', text: '血糖、血压、体温等保持相对稳定', correct: false },
			{ label: 'C', text: '稳态完全由神经系统单独调节', correct: true },
			{ label: 'D', text: '内环境稳态是生命活动正常的必要条件', correct: false }
		],
		answer: 'C',
		answer_note: '稳态由神经-体液-免疫三大系统协同调节，不是单独的',
		dimensions: {
			kaodian: '考查 <strong>内环境与稳态</strong>（新教材核心）：<br>&bull; <strong>内环境</strong>：血浆 + 组织液 + 淋巴（<u>不包括细胞内液</u>）<br>&bull; <strong>稳态</strong>：内环境各项指标的<u>相对稳定</u>（不是绝对）<br>&bull; <strong>调节机制</strong>：<u>神经 + 体液（激素）+ 免疫</u> 协同<br>&bull; <strong>意义</strong>：稳态是生命活动正常进行的基础',
			luoji: '新教材明确提出"<strong>神经-体液-免疫调节网络</strong>"的概念，代表了稳态调节理论的深化。C 选项故意简化为"神经单独调节"是典型陷阱。',
			tuili_steps: [
				'A 对：内环境三大组分（血浆、组织液、淋巴）',
				'B 对：血糖（3.9-6.1 mmol/L）、血压、体温（36.5-37.5°C）等都是稳态指标',
				'<strong>C 错</strong>：稳态由<strong>神经-体液-免疫</strong>协同调节（非单独）✓',
				'D 对：内环境稳态是细胞正常生存、器官正常工作的基础',
				'<strong>选 C</strong>'
			],
			cuojie: '<strong style="color:#C94A4A;">误以为 C 对</strong>：只记神经调节<br>&rarr; 实际上还有激素（甲状腺素、胰岛素等）和免疫系统参与<br><br><strong style="color:#C94A4A;">误选 A</strong>：把细胞内液当内环境<br>&rarr; <u>内环境 = 细胞外液</u>（血浆+组织液+淋巴）',
			bianshi: '<strong>变式题</strong>：人在寒冷环境中，下列哪些调节机制会启动？分别属于什么调节？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>① <strong>神经调节</strong>：皮肤冷觉感受器 → 下丘脑 → 交感神经 → 骨骼肌战栗、血管收缩<br>② <strong>体液调节</strong>：下丘脑 → TRH → 垂体 → TSH → 甲状腺素增多 → 代谢加快产热<br>③ <strong>行为调节</strong>：意识上找衣服穿、蜷缩保暖<br><br>这就是<strong>神经-体液协同</strong>的典型案例：神经快（秒级），激素慢（分钟级）但持久。',
			qushi: '内环境稳态是<strong>必修三重点</strong>，2025-2026 结合多系统协同深化：<br>&bull; 神经-体液-免疫网络<br>&bull; 糖尿病、高血压等稳态失调疾病<br>&bull; 下丘脑的枢纽作用<br>&bull; 稳态调节的反馈机制',
			xinfa: '稳态 <strong>"三网调节"</strong>：<br>1. <strong>神经</strong>——快速反应（毫秒到秒）<br>2. <strong>体液（激素）</strong>——持久调节（分钟到小时）<br>3. <strong>免疫</strong>——防御 + 自稳<br><br><strong>秒杀</strong>：看到"单独"、"只由"——多半错。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>人体内环境（血液、组织液）要保持<strong>相对稳定</strong>：<br>&bull; 血糖不能太高也不能太低<br>&bull; 体温要在 36-37°C<br>&bull; pH 要在 7.35-7.45<br><br>这些靠<strong>三个系统一起管</strong>：<br>&bull; <strong>神经</strong>（快速）——怕痛立即缩手<br>&bull; <strong>激素</strong>（持久）——饭后分泌胰岛素降血糖<br>&bull; <strong>免疫</strong>（防御）——对抗入侵病菌<br><br>这题的坑：说"只靠神经调节"——实际是<strong>三个系统协同</strong>。<br><br>孩子要记：<strong>身体像个精密交响乐团，没有独奏</strong>。'
		}
	},

	16: {
		no: 16, type: '简答题', score: 8, difficulty: 0.35, level: 'hard',
		title: '第 16 题 · 细胞呼吸实验探究',
		stem: '为探究酵母菌细胞呼吸方式，实验者设计了以下装置，用含葡萄糖的培养液培养酵母菌，观察 CO<sub>2</sub> 释放和酒精产生情况。<br><br><strong>（1）</strong>酵母菌是哪种呼吸类型？为什么有时释放 CO<sub>2</sub> 有时产生酒精？<br><strong>（2）</strong>如何检测 CO<sub>2</sub> 和酒精？<br><strong>（3）</strong>若要让酵母菌只进行有氧呼吸，如何操作？',
		options: [],
		answer: '详见 8 维度解析',
		answer_note: '综合考察细胞呼吸的类型、检测方法、条件控制',
		dimensions: {
			kaodian: '考查 <strong>细胞呼吸</strong>（必修一核心）：<br>&bull; <strong>酵母菌</strong>：兼性厌氧生物（可有氧也可无氧）<br>&bull; <strong>有氧呼吸</strong>：C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + O<sub>2</sub> &rarr; CO<sub>2</sub> + H<sub>2</sub>O<br>&bull; <strong>无氧呼吸（发酵）</strong>：C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> &rarr; 酒精 + CO<sub>2</sub><br>&bull; <strong>检测方法</strong>：CO<sub>2</sub>-澄清石灰水变浑浊；酒精-重铬酸钾变灰绿色',
			luoji: '这是典型的<strong>实验综合题</strong>，考察三个层次：<br>1. <strong>概念</strong>（酵母菌呼吸类型）<br>2. <strong>方法</strong>（检测 CO<sub>2</sub> 和酒精）<br>3. <strong>设计</strong>（如何控制条件只得有氧呼吸）<br><br>这种"分层递进"是高考压轴题的典型结构。',
			tuili_steps: [
				'（1）酵母菌是<strong>兼性厌氧</strong>，有氧时进行有氧呼吸（产 CO<sub>2</sub> + H<sub>2</sub>O），无氧时进行酒精发酵（产酒精 + CO<sub>2</sub>）。所以通气条件下只有 CO<sub>2</sub>，密封缺氧则产生酒精',
				'（2）CO<sub>2</sub> 检测：通入<strong>澄清石灰水</strong>（变浑浊）或溴麝香草酚蓝（由蓝变黄）；酒精检测：加<strong>重铬酸钾</strong>（橙色变<strong>灰绿色</strong>）',
				'（3）要只有氧呼吸，需：① <strong>持续通入空气</strong>；② <strong>适宜温度</strong>（25-35°C）；③ 提供充足葡萄糖；④ pH 适宜（弱酸性 5-6）'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：把酵母菌当"只能无氧呼吸"<br>&rarr; 实际兼性厌氧，两种方式都能进行<br><br><strong style="color:#C94A4A;">错 2</strong>：检测 CO<sub>2</sub> 和酒精的试剂混淆<br>&rarr; CO<sub>2</sub>-石灰水；酒精-重铬酸钾（酸性条件下）<br><br><strong style="color:#C94A4A;">错 3</strong>：忽略温度、pH 等条件',
			bianshi: '<strong>变式题</strong>：某发酵罐中培养酵母菌生产啤酒，前期通气产生大量酵母菌，后期密闭产生酒精。问：<br>① 为什么前期通气后期密闭？<br>② 如果<strong>全程通气</strong>，有酒精吗？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>① 前期通气让酵母菌<u>有氧呼吸大量繁殖</u>（能量多、细胞分裂快）；后期密闭让酵母菌<u>无氧发酵产酒精</u>（这是啤酒的主要步骤）<br>② 几乎没有酒精——因为有氧条件下酵母菌优先进行有氧呼吸，把葡萄糖完全氧化成 CO<sub>2</sub> 和水，不会走发酵路径（这叫<strong>"巴斯德效应"</strong>）',
			qushi: '细胞呼吸是<strong>必修一必考</strong>，2025-2026 重点：<br>&bull; 有氧/无氧呼吸的比较<br>&bull; 呼吸作用的物质/能量变化<br>&bull; 实验检测（CO<sub>2</sub>、酒精、O<sub>2</sub>）<br>&bull; 应用（发酵工业、运动科学）',
			xinfa: '细胞呼吸实验 <strong>"三步分析"</strong>：<br>1. <strong>看气体</strong>——是否通氧？<br>2. <strong>看产物</strong>——CO<sub>2</sub> 多少？酒精有无？<br>3. <strong>测方法</strong>——石灰水验 CO<sub>2</sub>、重铬酸钾验酒精<br><br><strong>记忆</strong>：有氧 → 全 CO<sub>2</sub>（无酒精）；无氧 → 酒精 + CO<sub>2</sub>',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考<strong>酵母菌（啤酒、馒头的关键微生物）是怎么呼吸的</strong>。<br><br>酵母菌很聪明：<br>&bull; <strong>有氧气时</strong>——像人一样呼吸，把糖变成水和 CO<sub>2</sub>（只产气）<br>&bull; <strong>没氧气时</strong>——把糖变成<strong>酒精</strong>+ CO<sub>2</sub>（所以能酿酒）<br><br>生活应用：<br>&bull; <strong>酿啤酒</strong>：先通气让酵母繁殖，再密封产酒精<br>&bull; <strong>发馒头</strong>：通气让酵母长，产 CO<sub>2</sub> 让面团起泡<br><br>检测方法：<br>&bull; CO<sub>2</sub> → 滴澄清石灰水变浑浊<br>&bull; 酒精 → 加重铬酸钾变灰绿色<br><br>孩子要记：<strong>酵母菌是兼性厌氧——有氧无氧都能活</strong>。'
		}
	},

	17: {
		no: 17, type: '简答题', score: 10, difficulty: 0.30, level: 'hard',
		title: '第 17 题 · 遗传系谱分析',
		stem: '某家族血友病遗传系谱如下。血友病是由 X 染色体上隐性基因 h 控制。<br><br><strong>（1）</strong>写出各成员的可能基因型<br><strong>（2）</strong>若 III-1（女性，正常）与正常男性结婚，后代患病概率<br><strong>（3）</strong>如何通过产前诊断预防该病？',
		options: [],
		answer: '详见 8 维度解析',
		answer_note: '综合考察 X 连锁隐性遗传的传递规律和概率计算',
		dimensions: {
			kaodian: '考查 <strong>X 连锁隐性遗传</strong>（必修二重点）：<br>&bull; <strong>血友病</strong>：X<sup>H</sup>（正常）vs X<sup>h</sup>（致病）<br>&bull; <strong>特点</strong>：男性患者多（只有 1 条 X），女性多为携带者<br>&bull; <strong>交叉遗传</strong>：父 → 女，母 → 子<br>&bull; <strong>典型系谱</strong>：外祖父患病 → 母亲携带 → 外孙患病',
			luoji: '系谱分析题是<strong>高考必考综合题</strong>。解题思路：<br>1. 判断遗传方式（常 vs 性、显 vs 隐）<br>2. 逐个分析成员基因型<br>3. 计算后代概率（棋盘法或分离定律）',
			tuili_steps: [
				'（1）根据血友病 X 连锁隐性遗传：<br>&bull; 患病男 I-1：X<sup>h</sup>Y<br>&bull; 正常女 I-2：X<sup>H</sup>X<sup>H</sup> 或 X<sup>H</sup>X<sup>h</sup>（需结合下一代判断）<br>&bull; 若下一代有患病者则 I-2 必为 X<sup>H</sup>X<sup>h</sup><br>&bull; II-1（正常男）：X<sup>H</sup>Y<br>&bull; II-2（正常女）：X<sup>H</sup>X<sup>h</sup>（从父亲继承 X<sup>h</sup>）<br>&bull; III-1（正常女，III-2 为患病男）：携带者概率 1/2',
				'（2）III-1 可能：1/2 是 X<sup>H</sup>X<sup>H</sup>、1/2 是 X<sup>H</sup>X<sup>h</sup>。<br>&bull; 如果 III-1 是 X<sup>H</sup>X<sup>h</sup>（概率 1/2）× 正常男 X<sup>H</sup>Y：子代有 1/4 患病男、1/4 携带女、1/4 正常男、1/4 正常女<br>&bull; 后代患病概率 = 1/2 × 1/4 = <strong>1/8</strong>',
				'（3）产前诊断方法：① <strong>绒毛取样或羊水穿刺</strong>获取胎儿 DNA；② <strong>基因检测</strong>分析 X 染色体 F8 基因（血友病 A）；③ 若发现致病突变则<strong>优生咨询</strong>，决定是否继续妊娠'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：误判遗传方式为常染色体<br>&rarr; 看到"患病男 × 正常女 → 有患病子"即可锁定 X 连锁隐性<br><br><strong style="color:#C94A4A;">错 2</strong>：概率没有加权<br>&rarr; III-1 携带者概率是 1/2，要乘进去<br><br><strong>错 3</strong>：忽略产前诊断的具体手段',
			bianshi: '<strong>变式题</strong>：若 III-1 已确认为携带者（X<sup>H</sup>X<sup>h</sup>），她与<strong>患病男</strong>（X<sup>h</sup>Y）结婚，子代概率如何？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>X<sup>H</sup>X<sup>h</sup> × X<sup>h</sup>Y &rarr; 子代：<br>&bull; X<sup>H</sup>X<sup>h</sup>（正常女，携带者）= 1/4<br>&bull; X<sup>h</sup>X<sup>h</sup>（患病女！）= 1/4<br>&bull; X<sup>H</sup>Y（正常男）= 1/4<br>&bull; X<sup>h</sup>Y（患病男）= 1/4<br><br><strong>总患病率 = 1/4 + 1/4 = 50%</strong>（男女各有 1/2 患病）。注意：这种情况下<strong>女性也可能患病</strong>，这是 X 连锁隐性遗传的特殊情形。',
			qushi: '系谱分析是<strong>必修二必考压轴题</strong>，2025-2026 深化：<br>&bull; X 连锁（血友病、色盲、进行性肌营养不良）<br>&bull; 常染色体遗传病（白化病、苯丙酮尿症）<br>&bull; 线粒体遗传（母系遗传）<br>&bull; 结合基因诊断、产前筛查、基因治疗',
			xinfa: '遗传系谱 <strong>"四步法"</strong>：<br>1. <strong>判方式</strong>——常/性？显/隐？<br>2. <strong>写基因型</strong>——从确定的患者开始倒推<br>3. <strong>算概率</strong>——多基因型时加权平均<br>4. <strong>写答案</strong>——分男女、分患病/携带<br><br><strong>秒杀</strong>：X 连锁隐性的经典特征：父病女携，母病子病。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题考的是<strong>遗传病怎么从上一代传到下一代</strong>。<br><br>血友病特点：<br>&bull; <strong>男孩更容易得</strong>（因为他们只有 1 条 X 染色体）<br>&bull; <strong>女孩多是"携带者"</strong>（不发病但能传给儿子）<br>&bull; 典型：外公 → 妈妈（携带）→ 外孙<br><br>计算概率的逻辑：<br>&bull; 先判断妈妈是不是携带者<br>&bull; 再看爸爸是否健康<br>&bull; 用<strong>棋盘图</strong>画出所有可能组合<br><br>预防方法：<strong>孕期做基因检测</strong>（羊水穿刺等），如果发现致病基因可以和医生商量对策。<br><br>孩子要记：<strong>隐性遗传病常跨代出现，系谱分析是常考题</strong>。'
		}
	},

	18: {
		no: 18, type: '实验题', score: 12, difficulty: 0.18, level: 'hard',
		title: '第 18 题 · BG/GK 酶动力学压轴',
		stem: '研究者发现一种新型葡萄糖激酶（BG/GK），其特点是在不同 ATP 浓度下活性呈现复杂曲线（米氏双曲 + 受底物抑制）。<br><br><strong>（1）</strong>根据给出的酶活性-ATP 浓度曲线，分析为什么在高 ATP 下反而活性下降<br><strong>（2）</strong>设计实验验证 BG/GK 受到产物（ADP）反馈抑制<br><strong>（3）</strong>如果在 BG/GK 上突变其变构位点，活性-ATP 曲线会有什么变化？<br><strong>（4）</strong>这类酶的生理意义是什么？',
		options: [],
		answer: '详见 8 维度解析',
		answer_note: '压轴题综合考察酶动力学、变构调节、反馈抑制、实验设计',
		dimensions: {
			kaodian: '考查 <strong>酶的高阶知识（变构调节）</strong>（选修/拓展）：<br>&bull; <strong>米氏方程</strong>：V = V<sub>max</sub> × [S] / (K<sub>m</sub> + [S])<br>&bull; <strong>变构酶</strong>：有催化位点 + 变构调节位点<br>&bull; <strong>反馈抑制</strong>：产物反过来抑制前面的酶<br>&bull; <strong>双曲/S 形曲线</strong>：简单酶 vs 变构酶的动力学差异',
			luoji: '这是真正的<strong>压轴题</strong>，考察的不是死记硬背，而是<strong>科学推理能力</strong>：<br>&bull; 看曲线 → 推机制<br>&bull; 设计实验 → 验证假设<br>&bull; 分析突变效应<br>&bull; 联系生理功能<br><br>这是大学生物化学水平的思维训练，高考压轴题的"上限"。',
			tuili_steps: [
				'（1）高 ATP 下活性下降的可能原因：① <strong>底物抑制</strong>——过量 ATP 同时结合催化位点和变构位点，使酶构象改变导致失活；② <strong>变构调节</strong>——高 ATP 通过变构位点反馈降低酶活性',
				'（2）验证 ADP 反馈抑制实验设计：<br>&bull; 设置对照组（只加 ATP）和实验组（加 ATP + 不同浓度 ADP）<br>&bull; 测定各组酶活性<br>&bull; 预期：实验组加 ADP 后活性<strong>显著下降</strong>，且 ADP 浓度越高抑制越强<br>&bull; 关键：ADP 与底物 ATP 结构类似但不被催化，符合变构抑制特征',
				'（3）突变变构位点后：酶<strong>失去反馈调节</strong>，活性-ATP 曲线变为普通米氏双曲线（单调上升），没有"先升后降"。因为失去了变构位点，高 ATP 就不再能反馈抑制',
				'（4）生理意义：<strong>精细调控代谢速率</strong>——细胞中 ATP 过多时，自动降低葡萄糖激酶活性 → 减少糖代谢 → 节省能量；ATP 消耗后活性恢复 → 重新供能。这种<strong>反馈机制</strong>是代谢稳态的核心'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：只看到米氏动力学，忽略变构调节<br>&rarr; 看到"先升后降"这种非米氏曲线，就要想到变构/反馈<br><br><strong style="color:#C94A4A;">错 2</strong>：实验设计遗漏对照<br>&rarr; 必须设置纯 ATP 组作对照才能验证 ADP 效应<br><br><strong>错 3</strong>：不理解变构位点突变的效应<br>&rarr; 突变会"解除"调节，让酶变成无约束状态',
			bianshi: '<strong>变式题</strong>：如果在 BG/GK 里突变催化位点（而不是变构位点），活性-ATP 曲线又会怎么变？两种突变的生理意义有何不同？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br>① 催化位点突变 → 酶<strong>几乎完全失活</strong>，活性-ATP 曲线<u>贴近 0 轴</u>（不管 ATP 多少都没活性）<br>② 变构位点突变 → 酶<strong>失去调节</strong>但保留活性，曲线变为<u>普通米氏双曲</u>（单调上升到饱和）<br><br><strong>生理意义差异</strong>：<br>&bull; 催化突变 = <strong>功能丧失</strong>（死酶）<br>&bull; 变构突变 = <strong>调节丧失</strong>（无控制的工作狂）<br>后者更隐秘，但会导致代谢失控（如某些肿瘤细胞的糖代谢异常）',
			qushi: '酶动力学是<strong>高考压轴题热点</strong>，2025-2026 深化方向：<br>&bull; 变构调节、反馈抑制<br>&bull; 酶与代谢通路的整合<br>&bull; 药物设计（酶抑制剂）<br>&bull; 基因突变 → 酶功能变化 → 代谢疾病',
			xinfa: '酶分析 <strong>"三层递进"</strong>：<br>1. <strong>基础层</strong>——米氏动力学（单调增加）<br>2. <strong>调节层</strong>——变构调节（S 形或先升后降）<br>3. <strong>网络层</strong>——反馈抑制、级联调节<br><br><strong>看图技巧</strong>：<br>&bull; 普通双曲 → 简单酶<br>&bull; S 形 → 变构酶<br>&bull; 先升后降 → 底物抑制或变构反馈',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这道题是<strong>高考压轴题</strong>，已接近大学水平。<br><br>核心概念：身体里的<strong>酶不是傻的</strong>，它们会<strong>自我调节</strong>：<br>&bull; 身体能量多（ATP 多）→ 酶自动慢下来<br>&bull; 身体能量少 → 酶恢复工作<br><br>这就像<strong>恒温器自动调节空调</strong>：室内太热就关空调，太冷就开热气。<br><br>这道题的难点：<br>&bull; 看图推理<strong>为什么</strong>酶在高能量时反而变慢<br>&bull; 设计实验证明<strong>反馈调节</strong>真的存在<br>&bull; 分析<strong>基因突变</strong>会把这个调节弄坏<br><br>生活应用：很多疾病（糖尿病、癌症）都和<strong>这种反馈调节坏了</strong>有关。<br><br>孩子能做对这题 → 已经达到生物学思维训练的<strong>最高水平</strong>。'
		}
	},

	19: {
		no: 19, type: '实验题', score: 10, difficulty: 0.22, level: 'hard',
		title: '第 19 题 · 植物激素综合应用',
		stem: '研究者探究五大植物激素（生长素 IAA、赤霉素 GA、细胞分裂素 CTK、脱落酸 ABA、乙烯 ETH）在果实成熟过程中的作用。<br><br><strong>（1）</strong>分别说明每种激素在果实成熟中的主要作用<br><strong>（2）</strong>设计实验验证：乙烯加速果实成熟<br><strong>（3）</strong>为什么商业运输时未成熟的香蕉能"远程成熟"？<br><strong>（4）</strong>如何利用激素调控农业生产（举两例）？',
		options: [],
		answer: '详见 8 维度解析',
		answer_note: '综合考察五大激素协同作用、实验设计、农业应用',
		dimensions: {
			kaodian: '考查 <strong>五大经典植物激素</strong>：<br>&bull; <strong>生长素（IAA）</strong>：促进细胞伸长、向光性<br>&bull; <strong>赤霉素（GA）</strong>：促进茎伸长、打破休眠<br>&bull; <strong>细胞分裂素（CTK）</strong>：促进细胞分裂、延缓衰老<br>&bull; <strong>脱落酸（ABA）</strong>：促进器官脱落、种子休眠、抗逆<br>&bull; <strong>乙烯（ETH）</strong>：促进果实成熟、器官脱落（气态激素）',
			luoji: '综合题考察<strong>激素协同 + 实验设计 + 生活应用</strong>三位一体。这种综合性是新高考的典型特征。',
			tuili_steps: [
				'（1）各激素作用：<br>&bull; IAA - 幼果发育（早期）<br>&bull; GA - 促进果实细胞伸长<br>&bull; CTK - 果实细胞分裂（大小决定）<br>&bull; ABA - 果实成熟后期（启动衰老）<br>&bull; <strong>ETH - 直接促进成熟</strong>（果实呼吸跃变、软化、转色）',
				'（2）验证实验设计：<br>&bull; 对照组：青香蕉放置常温<br>&bull; 实验组：青香蕉 + 乙烯气体（或成熟苹果释放乙烯）<br>&bull; 测定：色泽、硬度、糖度、时间<br>&bull; 预期：实验组成熟时间<strong>明显缩短</strong>',
				'（3）商业应用原理：香蕉青果运输时<strong>不释放乙烯</strong>，到目的地后<strong>用乙烯利（乙烯释放剂）处理</strong>即可快速催熟。这是全球香蕉贸易的核心技术',
				'（4）农业应用举例：① <strong>催熟水果</strong>——番茄、香蕉用乙烯利；② <strong>延长货架期</strong>——青菜叶用 CTK 保鲜；③ <strong>扦插生根</strong>——插条用 IAA 促根；④ <strong>无籽果</strong>——番茄授粉前用 GA'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：混淆各激素作用<br>&rarr; 记住"五词诀"：长（生长素）伸（赤霉素）分（细胞分裂素）脱（脱落酸）熟（乙烯）<br><br><strong>错 2</strong>：实验设计漏对照<br>&rarr; 必须有"不加乙烯"的对照组',
			bianshi: '<strong>变式题</strong>：某果农发现苹果放在香蕉旁边熟得特别快，但箱子里的香蕉之间却相互催熟。请解释这两个现象，并提出储运建议。<br><br><strong style="color:#8B6914;">参考答案</strong>：<br><strong>现象原因</strong>：<br>① 苹果和香蕉都释放乙烯，且是"<strong>跃变型果实</strong>"（成熟时乙烯浓度骤升）<br>② 香蕉彼此靠近 → 乙烯积聚 → 连锁催熟 → <strong>"一烂一筐"</strong><br><br><strong>储运建议</strong>：<br>&bull; 不同果实<strong>分开储存</strong>（避免互相催熟）<br>&bull; 低温 + 通风（减少乙烯积累）<br>&bull; 用<strong>1-MCP（乙烯抑制剂）</strong>处理（商业常用）<br>&bull; 或用<strong>吸附剂</strong>（高锰酸钾）吸收乙烯',
			qushi: '植物激素是<strong>必修三重点</strong>，2025-2026 结合农业技术：<br>&bull; 五大经典激素 + 新激素（BR、茉莉素）<br>&bull; 激素协同/拮抗<br>&bull; 农业应用（催熟、扦插、无籽果、抗逆）<br>&bull; 分子机制（受体、信号通路）',
			xinfa: '激素 <strong>"五词诀"</strong>：<br>1. <strong>长</strong>（IAA）- 促长、向光<br>2. <strong>伸</strong>（GA）- 茎伸长、打破休眠<br>3. <strong>分</strong>（CTK）- 细胞分裂、保鲜<br>4. <strong>脱</strong>（ABA）- 脱落、休眠、抗逆<br>5. <strong>熟</strong>（ETH）- 催熟、气态<br><br><strong>秒杀</strong>：果实成熟 = 乙烯。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>植物激素就像<strong>植物的"指挥家"</strong>，五个激素各司其职：<br>&bull; <strong>生长素</strong>：让植物长长<br>&bull; <strong>赤霉素</strong>：让茎变高<br>&bull; <strong>细胞分裂素</strong>：让细胞多<br>&bull; <strong>脱落酸</strong>：让叶子/果实该掉的掉<br>&bull; <strong>乙烯</strong>：让水果熟透（香蕉、苹果成熟都靠它）<br><br>生活应用：<br>&bull; <strong>为什么香蕉和苹果放一起熟得快</strong>？→ 都放乙烯<br>&bull; <strong>为什么青芒果用黑炭箱子可以催熟</strong>？→ 乙烯积聚<br>&bull; <strong>为什么剪枝条扦插要蘸白粉</strong>？→ 那白粉是生长素<br><br>孩子要记：<strong>每种激素都有专长，组合起来就是植物生命的全部节律</strong>。'
		}
	},

	20: {
		no: 20, type: '综合题', score: 12, difficulty: 0.15, level: 'hard',
		title: '第 20 题 · 生态工程与可持续发展',
		stem: '我国"双碳"目标（2030 碳达峰、2060 碳中和）背景下，某科研团队设计了一个<strong>综合生态农场</strong>（图示包括：水稻田、鱼塘、沼气池、果园、养殖场）。<br><br><strong>（1）</strong>分析该系统中的物质循环和能量流动特点<br><strong>（2）</strong>指出三条可能的食物链/网<br><strong>（3）</strong>沼气池的生态意义是什么？<br><strong>（4）</strong>相对传统农业，该模式如何贡献"双碳"目标？<br><strong>（5）</strong>请评价该生态工程的三大优势与两大挑战',
		options: [],
		answer: '详见 8 维度解析',
		answer_note: '综合考察生态学全貌 · 双碳政策 · 可持续发展思维',
		dimensions: {
			kaodian: '考查 <strong>生态工程与可持续发展</strong>（必修三 + 时政热点）：<br>&bull; <strong>物质循环</strong>：C、N、P 元素在农场内循环<br>&bull; <strong>能量流动</strong>：单向、逐级递减（10-20%）<br>&bull; <strong>生态工程原理</strong>：物种多样性、协调与平衡、整体性<br>&bull; <strong>双碳目标</strong>：碳达峰、碳中和<br>&bull; <strong>可持续发展</strong>：经济 + 生态 + 社会',
			luoji: '这是<strong>最高难度的综合题</strong>，考察：<br>1. 生态学理论（物质 + 能量）<br>2. 系统分析（食物链、生态位）<br>3. 政策理解（双碳）<br>4. 批判思维（优势 vs 挑战）<br><br>这种"理论 + 政策 + 思辨"是新高考的最高层次。',
			tuili_steps: [
				'（1）物质循环特点：农场内<strong>自给自足</strong>——水稻秸秆喂鱼、鱼粪肥田、沼气池分解有机物供气 + 沼液还田；能量流动特点：<strong>多级利用</strong>——一份太阳能被稻、鱼、肥料、沼气<u>多次利用</u>，提高能量利用效率',
				'（2）三条食物链举例：① 水稻 → 田间昆虫 → 鱼 → 人；② 水稻秸秆 → 养殖场畜禽 → 人；③ 果园果实 → 人；④ 枯落物/粪便 → 分解者 → 沼气 → 能源',
				'（3）沼气池生态意义：① <strong>废物资源化</strong>——把秸秆、粪便变成能源；② <strong>减排</strong>——避免直接焚烧秸秆或粪便腐烂释放甲烷；③ <strong>沼液沼渣还田</strong>——肥料循环；④ <strong>替代化石燃料</strong>——减少 CO<sub>2</sub> 净排放',
				'（4）双碳贡献：① <strong>固碳</strong>——稻田、果园、林下植被吸收 CO<sub>2</sub>；② <strong>减排</strong>——沼气替代煤、秸秆不焚烧；③ <strong>循环利用</strong>——减少化肥使用（化肥生产是高碳环节）；④ <strong>生态修复</strong>——改善土壤、防止水土流失',
				'（5）三大优势：① <strong>经济</strong>——多产出（稻、鱼、果、畜、气）；② <strong>生态</strong>——资源循环、减少污染；③ <strong>社会</strong>——农民增收、乡村振兴。<br>两大挑战：① <strong>技术门槛高</strong>——各环节协同需要科学管理；② <strong>初始投资大</strong>——沼气池、鱼塘建设需资金；③ 补充：气候/病害风险可能让整个系统失衡'
			],
			cuojie: '<strong style="color:#C94A4A;">错 1</strong>：只讲生态不讲经济<br>&rarr; 综合题要体现"<strong>三效益统一</strong>"（经济+生态+社会）<br><br><strong>错 2</strong>：食物链写错<br>&rarr; 必须有"<strong>→</strong>"方向性，且起点是生产者（植物）<br><br><strong>错 3</strong>：双碳贡献说不全<br>&rarr; 要从"<strong>固碳 + 减排 + 替代</strong>"三方面分析',
			bianshi: '<strong>变式题</strong>：如果上述生态农场要<strong>扩大规模</strong>到整个乡镇，会遇到什么新问题？该如何规划？<br><br><strong style="color:#8B6914;">参考答案</strong>：<br><strong>新问题</strong>：<br>① <strong>物流与能量损耗</strong>——规模大了，沼气输送、肥料运输损耗增加<br>② <strong>病虫害传染风险</strong>——单一化种植易爆发病害<br>③ <strong>管理复杂度</strong>——需要专业团队+数据化管理<br>④ <strong>市场波动</strong>——产品多样化反而可能库存积压<br><br><strong>规划建议</strong>：<br>① <strong>分区经营</strong>——不同农户负责不同环节，形成互补网络<br>② <strong>物联网 + AI</strong>——实时监控各环节数据<br>③ <strong>政府支持</strong>——低息贷款 + 技术培训 + 销售渠道<br>④ <strong>保险机制</strong>——应对气候/病害风险<br>⑤ <strong>品牌化</strong>——打"生态+有机"高端品牌',
			qushi: '生态工程是<strong>新课标拓展重点</strong>，2025-2026 深度结合：<br>&bull; 双碳目标、可持续发展<br>&bull; 乡村振兴战略<br>&bull; 生态红线、国土空间规划<br>&bull; 绿色金融、ESG 投资<br><br><strong>出题趋势</strong>：<u>生物学 + 政策 + 经济 + 社会</u>的跨学科综合题。',
			xinfa: '生态工程 <strong>"三效益"</strong>：<br>1. <strong>经济效益</strong>——多产出、低成本<br>2. <strong>生态效益</strong>——循环利用、减排固碳<br>3. <strong>社会效益</strong>——农民增收、乡村振兴<br><br><strong>秒杀</strong>：综合题答案要体现"<strong>平衡</strong>"（既要增产又要环保）。',
			parent_tr: '<strong>给家长的大白话</strong>：<br><br>这是<strong>高考最难的综合题</strong>，考的是"<strong>农业怎么做到既赚钱又环保</strong>"。<br><br>传统农业：<br>&bull; 种田 → 用化肥 → 土壤差 → 再多用肥 → 恶性循环<br>&bull; 秸秆烧 → 污染空气 + 释放 CO<sub>2</sub><br><br>生态农场：<br>&bull; 水稻 + 鱼 + 沼气 + 果园 = <strong>一个小闭环</strong><br>&bull; 鱼粪肥田、秸秆做沼气、沼液还田<br>&bull; <strong>一份太阳能被重复利用很多次</strong><br>&bull; 减少化肥，固定 CO<sub>2</sub>，达到"双碳"目标<br><br>政策背景："<strong>双碳</strong>"是我国大战略：<br>&bull; 2030 年碳达峰（排放不再增加）<br>&bull; 2060 年碳中和（吸收 = 排放）<br><br>孩子要记：<strong>未来的农业 = 生态工程 + 数字化管理 + 品牌化</strong>。这不只是生物学，也是未来的职业方向（生态修复师、农业 AI 工程师等热门新职业）。'
		}
	}
};
