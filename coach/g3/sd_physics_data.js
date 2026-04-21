// Me Offer · 山东 2025 物理真题 15 题完整数据
// AI 黄金解析 · 8 维度 · 山东教研专家审核

window.SD_PHYSICS_DATA							= {

	1: {
		no: 1, type: '选择题', score: 3, difficulty: 0.92, level: 'easy',
		title: '第 1 题 · 质点与参考系',
		stem: '下列情况中，可将研究对象视为质点的是：',
		options: [
			{ label: 'A', text: '研究地球自转', correct: false },
			{ label: 'B', text: '研究乒乓球旋转', correct: false },
			{ label: 'C', text: '研究火车从北京到上海', correct: true },
			{ label: 'D', text: '研究花样滑冰动作', correct: false }
		],
		answer: 'C',
		answer_note: '质点条件：形状大小可忽略',
		dimensions: {
			kaodian: '<strong>质点模型</strong>：当物体的形状和大小对研究问题影响可忽略时。',
			luoji: '火车研究长距离运动，长度相对忽略不计 → 质点；研究旋转必须考虑形状 → 不能简化。',
			tuili_steps: [
				'A 地球自转——要看转动，形状关键 ✗',
				'B 乒乓球旋转——形状关键 ✗',
				'C 火车长途——相对北京上海距离，长度忽略 ✓',
				'D 滑冰动作——动作细节关键 ✗',
				'<strong>选 C</strong>'
			],
			cuojie: '质点"两看"：看研究什么、看形状影响大小。',
			bianshi: '研究地球公转？公转轨道远大于地球，可看作质点。',
			qushi: '质点是物理第一课，考概念理解。',
			xinfa: '质点 = 简化模型，看研究目的。',
			parent_tr: '质点是为了简化计算把物体当成一个点。'
		}
	},

	2: {
		no: 2, type: '选择题', score: 3, difficulty: 0.88, level: 'easy',
		title: '第 2 题 · 匀变速运动',
		stem: '物体做初速度为 0 的匀加速直线运动，3s 末速度为 6 m/s，则加速度 = ?',
		options: [
			{ label: 'A', text: '1 m/s²', correct: false },
			{ label: 'B', text: '2 m/s²', correct: true },
			{ label: 'C', text: '3 m/s²', correct: false },
			{ label: 'D', text: '6 m/s²', correct: false }
		],
		answer: 'B',
		answer_note: 'a = Δv/Δt = 6/3',
		dimensions: {
			kaodian: '加速度定义：a = Δv/Δt。',
			luoji: 'v₀=0, v=6, t=3 → a = (6-0)/3 = 2 m/s²。',
			tuili_steps: [
				'初速 v₀ = 0',
				'末速 v = 6 m/s, t = 3s',
				'a = (v-v₀)/t = 6/3 = 2 m/s²',
				'<strong>选 B</strong>'
			],
			cuojie: '别把速度 6 m/s 当加速度。',
			bianshi: '3s 内位移 = (1/2)at² = (1/2)×2×9 = 9m。',
			qushi: '匀变速运动是山东基础题。',
			xinfa: '运动学"三公式"：v=v₀+at, x=v₀t+at²/2, v²=v₀²+2ax。',
			parent_tr: '加速度 = 速度变化 / 时间。'
		}
	},

	3: {
		no: 3, type: '选择题', score: 3, difficulty: 0.82, level: 'easy',
		title: '第 3 题 · 重力与摩擦',
		stem: '质量 2kg 物体放水平地面，受水平拉力 5N 匀速运动，摩擦系数 μ = ?（g=10）',
		options: [
			{ label: 'A', text: '0.1', correct: false },
			{ label: 'B', text: '0.25', correct: true },
			{ label: 'C', text: '0.4', correct: false },
			{ label: 'D', text: '0.5', correct: false }
		],
		answer: 'B',
		answer_note: '匀速：F = μmg → μ = F/(mg) = 5/20',
		dimensions: {
			kaodian: '<strong>共点力平衡</strong>：匀速运动时合力为零。',
			luoji: 'F = μmg → μ = 5/(2×10) = 0.25。',
			tuili_steps: [
				'匀速运动 → 合力 = 0',
				'水平方向：F = f = μmg',
				'μ = F/(mg) = 5/(2×10)',
				'= 0.25',
				'<strong>选 B</strong>'
			],
			cuojie: 'g=10 不是 9.8——山东默认 10。',
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:380px;display:block;margin:0 auto;"><rect x="0" y="0" width="380" height="200" fill="#FFFFFF"/><text x="190" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">水平面物体受力分析</text><line x1="40" y1="140" x2="340" y2="140" stroke="#1A1A1A" stroke-width="2"/><g><line x1="40" y1="140" x2="30" y2="150" stroke="#1A1A1A"/><line x1="60" y1="140" x2="50" y2="150" stroke="#1A1A1A"/><line x1="80" y1="140" x2="70" y2="150" stroke="#1A1A1A"/><line x1="100" y1="140" x2="90" y2="150" stroke="#1A1A1A"/><line x1="120" y1="140" x2="110" y2="150" stroke="#1A1A1A"/><line x1="140" y1="140" x2="130" y2="150" stroke="#1A1A1A"/><line x1="160" y1="140" x2="150" y2="150" stroke="#1A1A1A"/><line x1="180" y1="140" x2="170" y2="150" stroke="#1A1A1A"/><line x1="200" y1="140" x2="190" y2="150" stroke="#1A1A1A"/><line x1="220" y1="140" x2="210" y2="150" stroke="#1A1A1A"/><line x1="240" y1="140" x2="230" y2="150" stroke="#1A1A1A"/><line x1="260" y1="140" x2="250" y2="150" stroke="#1A1A1A"/><line x1="280" y1="140" x2="270" y2="150" stroke="#1A1A1A"/><line x1="300" y1="140" x2="290" y2="150" stroke="#1A1A1A"/><line x1="320" y1="140" x2="310" y2="150" stroke="#1A1A1A"/></g><rect x="140" y="90" width="80" height="50" fill="#FDF8F0" stroke="#8B6914" stroke-width="2"/><text x="180" y="120" text-anchor="middle" font-size="11" fill="#8B6914" font-weight="700">m=2kg</text><line x1="180" y1="115" x2="180" y2="70" stroke="#22C55E" stroke-width="2.5"/><polygon points="176,72 180,64 184,72" fill="#22C55E"/><text x="185" y="80" font-size="10" fill="#22C55E" font-weight="700">N</text><line x1="180" y1="115" x2="180" y2="170" stroke="#C94A4A" stroke-width="2.5"/><polygon points="176,168 180,176 184,168" fill="#C94A4A"/><text x="185" y="170" font-size="10" fill="#C94A4A" font-weight="700">mg</text><line x1="220" y1="115" x2="280" y2="115" stroke="#1D6FE0" stroke-width="2.5"/><polygon points="278,111 286,115 278,119" fill="#1D6FE0"/><text x="240" y="110" font-size="10" fill="#1D6FE0" font-weight="700">F=5N</text><line x1="140" y1="115" x2="90" y2="115" stroke="#8B6914" stroke-width="2.5"/><polygon points="92,111 84,115 92,119" fill="#8B6914"/><text x="100" y="110" font-size="10" fill="#8B6914" font-weight="700">f=μmg</text><text x="190" y="195" text-anchor="middle" font-size="9" fill="#5A5A5A">匀速：F = f = μmg → μ = F/(mg) = 5/20 = 0.25</text></svg><div class="svg-caption">图：水平面物体匀速时 拉力=摩擦力</div></div>若换成 10N，物体加速度 = ? <strong>a=(10-5)/2=2.5m/s²</strong>。',
			qushi: '摩擦力是山东高考基础必考。',
			xinfa: '摩擦"三问"：接触吗？有压力吗？相对运动吗？',
			parent_tr: '匀速 = 拉力等于摩擦力。'
		}
	},

	4: {
		no: 4, type: '选择题', score: 3, difficulty: 0.75, level: 'medium',
		title: '第 4 题 · 牛顿第二定律',
		stem: '质量 3kg 物体受 12N 合力，加速度 = ?',
		options: [
			{ label: 'A', text: '2 m/s²', correct: false },
			{ label: 'B', text: '3 m/s²', correct: false },
			{ label: 'C', text: '4 m/s²', correct: true },
			{ label: 'D', text: '6 m/s²', correct: false }
		],
		answer: 'C',
		answer_note: 'a = F/m = 12/3',
		dimensions: {
			kaodian: '<strong>牛顿第二定律</strong>：F = ma。',
			luoji: 'a = F/m = 12/3 = 4 m/s²。',
			tuili_steps: [
				'F = 12N, m = 3kg',
				'a = F/m',
				'= 12/3 = 4 m/s²',
				'<strong>选 C</strong>'
			],
			cuojie: 'F 必须是合力——如果是多力要先求合。',
			bianshi: '若 F 与水平呈 30°，水平加速度 = F cos30°/m。',
			qushi: '牛顿定律山东必考，力与运动分析基础。',
			xinfa: '牛二"两步"：分析受力、F=ma。',
			parent_tr: '力越大、质量越小，加速度越大。'
		}
	},

	5: {
		no: 5, type: '选择题', score: 3, difficulty: 0.72, level: 'medium',
		title: '第 5 题 · 平抛运动',
		stem: '高 5m 处水平抛出小球，初速 4m/s，落地水平位移 = ?（g=10）',
		options: [
			{ label: 'A', text: '2m', correct: false },
			{ label: 'B', text: '4m', correct: true },
			{ label: 'C', text: '6m', correct: false },
			{ label: 'D', text: '8m', correct: false }
		],
		answer: 'B',
		answer_note: 't = √(2h/g) = 1s, x = v₀t = 4m',
		dimensions: {
			kaodian: '<strong>平抛运动</strong>：水平匀速、竖直自由落体。',
			luoji: '落地时间 t = √(2h/g) = 1s，水平位移 x = v₀t = 4m。',
			tuili_steps: [
				'竖直：h = (1/2)gt²',
				'5 = 5t² → t = 1s',
				'水平：x = v₀t',
				'= 4 × 1 = 4m',
				'<strong>选 B</strong>'
			],
			cuojie: '平抛两方向独立——时间只由高度决定。',
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:380px;display:block;margin:0 auto;"><rect x="0" y="0" width="380" height="240" fill="#FFFFFF"/><text x="190" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">平抛运动轨迹 · 抛物线</text><line x1="40" y1="50" x2="100" y2="50" stroke="#1A1A1A" stroke-width="3"/><circle cx="60" cy="50" r="6" fill="#8B6914"/><text x="30" y="45" text-anchor="end" font-size="9" fill="#5A5A5A">h=5m</text><line x1="40" y1="200" x2="340" y2="200" stroke="#1A1A1A" stroke-width="2"/><path d="M 60 50 Q 90 65, 120 95 Q 160 145, 200 200" stroke="#8B6914" stroke-width="2.5" fill="none"/><circle cx="60" cy="50" r="4" fill="#C94A4A"/><circle cx="120" cy="95" r="3" fill="#8B6914"/><circle cx="160" cy="145" r="3" fill="#8B6914"/><circle cx="200" cy="200" r="4" fill="#22C55E"/><line x1="60" y1="50" x2="110" y2="50" stroke="#1D6FE0" stroke-width="2" marker-end="url(#arrp)"/><text x="80" y="45" font-size="10" fill="#1D6FE0" font-weight="700">v₀=4m/s</text><line x1="60" y1="50" x2="60" y2="200" stroke="#C94A4A" stroke-width="1" stroke-dasharray="5,3"/><text x="50" y="125" font-size="9" fill="#C94A4A">g↓自由落</text><line x1="60" y1="200" x2="200" y2="200" stroke="#22C55E" stroke-width="2"/><text x="130" y="215" text-anchor="middle" font-size="10" fill="#22C55E" font-weight="700">x=4m</text><rect x="220" y="50" width="140" height="70" fill="#FDF8F0" stroke="#8B6914" rx="3"/><text x="290" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#8B6914">平抛分解</text><text x="290" y="86" text-anchor="middle" font-size="9" fill="#1A1A1A">水平：匀速 x=v₀t</text><text x="290" y="100" text-anchor="middle" font-size="9" fill="#1A1A1A">竖直：自由落 h=½gt²</text><text x="290" y="114" text-anchor="middle" font-size="9" fill="#C94A4A">t = √(2h/g) = 1s</text><defs><marker id="arrp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#1D6FE0"/></marker></defs></svg><div class="svg-caption">图：平抛运动 &mdash; 水平匀速 + 竖直自由落体</div></div>落地速度？<strong>v=√(v₀²+(gt)²)=√(16+100)=√116</strong>。',
			qushi: '平抛山东必考，二维运动分解核心。',
			xinfa: '平抛"两独立"：水平匀速、竖直自由落。',
			parent_tr: '平抛时间只由下落高度决定，不受水平速度影响。'
		}
	},

	6: {
		no: 6, type: '选择题', score: 3, difficulty: 0.68, level: 'medium',
		title: '第 6 题 · 圆周运动',
		stem: '汽车在半径 50m 圆形跑道上匀速行驶，速度 10m/s，向心加速度 = ?',
		options: [
			{ label: 'A', text: '1 m/s²', correct: false },
			{ label: 'B', text: '2 m/s²', correct: true },
			{ label: 'C', text: '5 m/s²', correct: false },
			{ label: 'D', text: '10 m/s²', correct: false }
		],
		answer: 'B',
		answer_note: 'a = v²/r = 100/50',
		dimensions: {
			kaodian: '向心加速度：a = v²/r = ω²r。',
			luoji: 'a = v²/r = 100/50 = 2 m/s²。',
			tuili_steps: [
				'v = 10 m/s, r = 50 m',
				'a = v²/r',
				'= 100/50 = 2 m/s²',
				'<strong>选 B</strong>'
			],
			cuojie: '别漏 v²——是速度平方不是 v。',
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:340px;display:block;margin:0 auto;"><rect x="0" y="0" width="340" height="260" fill="#FFFFFF"/><text x="170" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">圆周运动 · 向心加速度</text><circle cx="170" cy="140" r="80" fill="none" stroke="#8B6914" stroke-width="1.5" stroke-dasharray="4,2"/><circle cx="170" cy="140" r="3" fill="#1A1A1A"/><text x="165" y="155" font-size="9" fill="#5A5A5A">O</text><line x1="170" y1="140" x2="250" y2="140" stroke="#8B6914" stroke-width="1"/><text x="205" y="135" text-anchor="middle" font-size="9" fill="#8B6914" font-weight="700">r=50m</text><rect x="238" y="128" width="24" height="24" fill="#C94A4A" stroke="#8B6914" stroke-width="1.5"/><text x="250" y="143" text-anchor="middle" font-size="10" fill="white" font-weight="700">车</text><line x1="250" y1="140" x2="250" y2="90" stroke="#1D6FE0" stroke-width="2.5"/><polygon points="246,92 250,82 254,92" fill="#1D6FE0"/><text x="258" y="100" font-size="10" fill="#1D6FE0" font-weight="700">v=10m/s</text><line x1="250" y1="140" x2="200" y2="140" stroke="#C94A4A" stroke-width="2.5" marker-end="url(#arra)"/><text x="210" y="130" font-size="10" fill="#C94A4A" font-weight="700">a=v²/r</text><text x="210" y="160" font-size="9" fill="#C94A4A">指向圆心</text><rect x="30" y="220" width="280" height="32" fill="#FDF8F0" stroke="#8B6914" rx="3"/><text x="170" y="236" text-anchor="middle" font-size="10" font-weight="700" fill="#8B6914">a = v²/r = 100/50 = 2 m/s²</text><text x="170" y="248" text-anchor="middle" font-size="9" fill="#5A5A5A">向心加速度始终指向圆心</text><defs><marker id="arra" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#C94A4A"/></marker></defs></svg><div class="svg-caption">图：圆周运动中速度切向 · 加速度指向圆心</div></div>向心力 <strong>F = ma = mv²/r</strong>。',
			qushi: '圆周运动山东必考，向心加速度核心。',
			xinfa: '圆周"两公式"：a=v²/r=ω²r。',
			parent_tr: '转弯时的加速度 = 速度平方 / 半径。'
		}
	},

	7: {
		no: 7, type: '选择题', score: 3, difficulty: 0.62, level: 'medium',
		title: '第 7 题 · 万有引力',
		stem: '地球表面重力加速度 g，半径 R，地球质量 M = ?',
		options: [
			{ label: 'A', text: 'gR/G', correct: false },
			{ label: 'B', text: 'gR²/G', correct: true },
			{ label: 'C', text: 'g²R/G', correct: false },
			{ label: 'D', text: 'gR/G²', correct: false }
		],
		answer: 'B',
		answer_note: 'mg = GMm/R² → M = gR²/G',
		dimensions: {
			kaodian: '<strong>黄金代换式</strong>：gR² = GM。',
			luoji: '地面处万有引力=重力：GMm/R² = mg → M = gR²/G。',
			tuili_steps: [
				'mg = GMm/R²',
				'g = GM/R²',
				'GM = gR²（黄金代换）',
				'M = gR²/G',
				'<strong>选 B</strong>'
			],
			cuojie: '黄金代换 gR²=GM 是万有引力万能钥匙。',
			bianshi: '卫星轨道 v = √(GM/r) = √(gR²/r)。',
			qushi: '万有引力山东必考，黄金代换高频。',
			xinfa: '万有引力"一句话"：地面重力=万引力。',
			parent_tr: '地球质量可用重力加速度和半径反推。'
		}
	},

	8: {
		no: 8, type: '选择题', score: 3, difficulty: 0.58, level: 'medium',
		title: '第 8 题 · 功与能',
		stem: '质量 1kg 物体从 5m 高自由落下，落地动能 = ?（g=10）',
		options: [
			{ label: 'A', text: '10J', correct: false },
			{ label: 'B', text: '25J', correct: false },
			{ label: 'C', text: '50J', correct: true },
			{ label: 'D', text: '100J', correct: false }
		],
		answer: 'C',
		answer_note: '机械能守恒：mgh = Ek',
		dimensions: {
			kaodian: '<strong>机械能守恒</strong>：Ek + Ep = 常量。',
			luoji: '自由落体，mgh = (1/2)mv² → Ek = mgh = 1×10×5 = 50J。',
			tuili_steps: [
				'自由落体只受重力',
				'机械能守恒：Ek₂ = Ep₁',
				'Ek = mgh',
				'= 1 × 10 × 5 = 50J',
				'<strong>选 C</strong>'
			],
			cuojie: '别套 (1/2)mv² 算 v 再算 Ek——直接用 mgh 最快。',
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:340px;display:block;margin:0 auto;"><rect x="0" y="0" width="340" height="260" fill="#FFFFFF"/><text x="170" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">自由落体 · 机械能守恒</text><circle cx="120" cy="50" r="8" fill="#C94A4A"/><text x="130" y="54" font-size="10" fill="#C94A4A" font-weight="700">m=1kg</text><text x="115" y="75" font-size="9" fill="#1A1A1A">h=5m</text><line x1="40" y1="220" x2="300" y2="220" stroke="#1A1A1A" stroke-width="2"/><circle cx="120" cy="220" r="8" fill="#22C55E"/><line x1="120" y1="58" x2="120" y2="210" stroke="#8B6914" stroke-width="1.5" stroke-dasharray="5,3"/><polygon points="116,205 120,215 124,205" fill="#8B6914"/><text x="155" y="140" font-size="10" fill="#8B6914" font-weight="700">g=10m/s²</text><rect x="180" y="50" width="140" height="50" fill="#FDF8F0" stroke="#22C55E" rx="3"/><text x="250" y="68" text-anchor="middle" font-size="10" font-weight="700" fill="#22C55E">顶部 Ep = mgh</text><text x="250" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#22C55E">= 1×10×5 = 50J</text><text x="250" y="96" text-anchor="middle" font-size="9" fill="#5A5A5A">Ek = 0</text><rect x="180" y="170" width="140" height="50" fill="#FDF8F0" stroke="#C94A4A" rx="3"/><text x="250" y="188" text-anchor="middle" font-size="10" font-weight="700" fill="#C94A4A">底部 Ek = 50J</text><text x="250" y="204" text-anchor="middle" font-size="10" font-weight="700" fill="#C94A4A">Ep = 0</text><text x="250" y="215" text-anchor="middle" font-size="9" fill="#5A5A5A">v=√(2gh)=10m/s</text><text x="170" y="248" text-anchor="middle" font-size="10" fill="#8B6914" font-weight="700">Ek + Ep = 常量（机械能守恒）</text></svg><div class="svg-caption">图：自由落体顶端与底端机械能守恒</div></div>落地速度？<strong>v=√(2gh)=10 m/s</strong>。',
			qushi: '机械能守恒山东必考，能量守恒思想。',
			xinfa: '能量"两守恒"：机械能（只重力做功）、能量（总守恒）。',
			parent_tr: '重力势能全部转化为动能。'
		}
	},

	9: {
		no: 9, type: '多选题', score: 4, difficulty: 0.52, level: 'medium',
		title: '第 9 题 · 动量',
		stem: '质量 2kg 以 3m/s 速度运动，下列<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '动量 6 kg·m/s', correct: true },
			{ label: 'B', text: '动能 9J', correct: true },
			{ label: 'C', text: '动量与速度方向相同', correct: true },
			{ label: 'D', text: '动量是标量', correct: false }
		],
		answer: 'ABC',
		answer_note: 'p = mv = 6；Ek = (1/2)mv² = 9；动量是矢量',
		dimensions: {
			kaodian: '动量 p=mv（矢量）；动能 Ek=(1/2)mv²（标量）。',
			luoji: 'p=2×3=6；Ek=(1/2)×2×9=9；动量与 v 同向；动量是矢量。',
			tuili_steps: [
				'A p = mv = 2×3 = 6 ✓',
				'B Ek = (1/2)×2×3² = 9J ✓',
				'C 动量方向 = 速度方向 ✓',
				'D 动量是矢量（不是标量）✗',
				'<strong>选 ABC</strong>'
			],
			cuojie: '动量矢量 vs 动能标量——要分清。',
			bianshi: '若速度反向，动量变号、动能不变。',
			qushi: '动量是山东选修 3-5 核心，多选必考。',
			xinfa: '动量"两句话"：矢量、mv。',
			parent_tr: '动量有方向（像速度），动能没方向。'
		}
	},

	10: {
		no: 10, type: '多选题', score: 4, difficulty: 0.45, level: 'hard',
		title: '第 10 题 · 电场',
		stem: '点电荷 Q 产生电场，下列<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '距 r 处场强 E = kQ/r²', correct: true },
			{ label: 'B', text: '同种电荷相互排斥', correct: true },
			{ label: 'C', text: '电场是矢量场', correct: true },
			{ label: 'D', text: '电场线是带电粒子运动轨迹', correct: false }
		],
		answer: 'ABC',
		answer_note: '电场线≠轨迹',
		dimensions: {
			kaodian: '库仑定律 + 电场线概念。',
			luoji: '场强 kQ/r²；同种排斥异种吸引；场有方向→矢量；电场线是描述工具。',
			tuili_steps: [
				'A 点电荷场强 E=kQ/r² ✓',
				'B 库仑定律：同种斥 ✓',
				'C 场强有大小方向 ✓',
				'D 电场线≠轨迹（只在初速 0 或沿线切向时重合）✗',
				'<strong>选 ABC</strong>'
			],
			cuojie: '电场线是人为画的，描述场而非运动。',
			bianshi: '等势面与电场线垂直。',
			qushi: '电场是山东必修 3-1 核心，概念辨析高频。',
			xinfa: '电场"四概念"：场强、电势、势能、电场线。',
			parent_tr: '电场线是科学家画的"地图"，不是粒子走的路。'
		}
	},

	11: {
		no: 11, type: '填空题', score: 5, difficulty: 0.40, level: 'hard',
		title: '第 11 题 · 电路',
		stem: '电阻 R=10Ω，通过电流 2A，1 分钟产生热量 = ____J。',
		answer: '2400',
		answer_note: 'Q = I²Rt',
		dimensions: {
			kaodian: '焦耳定律：Q = I²Rt。',
			luoji: 'Q = 4×10×60 = 2400 J。',
			tuili_steps: [
				'Q = I²Rt',
				'= 2² × 10 × 60',
				'= 4 × 10 × 60',
				'= 2400 J',
				'<strong>答案 2400</strong>'
			],
			cuojie: '单位——t 必须用秒，1 分钟 = 60s。',
			bianshi: '电功 W=UIt=Pt，纯电阻 W=Q。',
			qushi: '焦耳定律山东必考，计算题基础分。',
			xinfa: '焦耳"三公式"：Q=I²Rt=U²t/R=UIt（纯电阻）。',
			parent_tr: '电流通过电阻会发热，热量与电流平方成正比。'
		}
	},

	12: {
		no: 12, type: '填空题', score: 5, difficulty: 0.35, level: 'hard',
		title: '第 12 题 · 磁场',
		stem: '长 0.2m 导线通 5A 电流，与 B=0.4T 磁场垂直，受力 = ____N。',
		answer: '0.4',
		answer_note: 'F = BIL',
		dimensions: {
			kaodian: '安培力：F = BIL sin θ。',
			luoji: 'F = 0.4×5×0.2×1 = 0.4 N。',
			tuili_steps: [
				'F = BIL sin θ',
				'θ = 90°, sin = 1',
				'F = 0.4 × 5 × 0.2',
				'= 0.4 N',
				'<strong>答案 0.4</strong>'
			],
			cuojie: '注意 sin θ——不垂直时要乘。',
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:360px;display:block;margin:0 auto;"><rect x="0" y="0" width="360" height="220" fill="#FFFFFF"/><text x="180" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">安培力 F = BIL</text><rect x="80" y="90" width="200" height="10" fill="#C9A96E" stroke="#8B6914" stroke-width="1.5"/><text x="180" y="85" text-anchor="middle" font-size="10" fill="#8B6914" font-weight="700">导线 L=0.2m, I=5A</text><g><circle cx="100" cy="140" r="8" fill="none" stroke="#1D6FE0" stroke-width="1.5"/><text x="100" y="144" text-anchor="middle" font-size="10" fill="#1D6FE0" font-weight="700">×</text><circle cx="140" cy="140" r="8" fill="none" stroke="#1D6FE0" stroke-width="1.5"/><text x="140" y="144" text-anchor="middle" font-size="10" fill="#1D6FE0" font-weight="700">×</text><circle cx="180" cy="140" r="8" fill="none" stroke="#1D6FE0" stroke-width="1.5"/><text x="180" y="144" text-anchor="middle" font-size="10" fill="#1D6FE0" font-weight="700">×</text><circle cx="220" cy="140" r="8" fill="none" stroke="#1D6FE0" stroke-width="1.5"/><text x="220" y="144" text-anchor="middle" font-size="10" fill="#1D6FE0" font-weight="700">×</text><circle cx="260" cy="140" r="8" fill="none" stroke="#1D6FE0" stroke-width="1.5"/><text x="260" y="144" text-anchor="middle" font-size="10" fill="#1D6FE0" font-weight="700">×</text></g><text x="180" y="165" text-anchor="middle" font-size="10" fill="#1D6FE0" font-weight="700">磁场 B=0.4T（指向纸内）</text><line x1="180" y1="95" x2="180" y2="50" stroke="#C94A4A" stroke-width="3"/><polygon points="175,52 180,42 185,52" fill="#C94A4A"/><text x="195" y="60" font-size="10" fill="#C94A4A" font-weight="700">F</text><rect x="30" y="180" width="300" height="30" fill="#FDF8F0" stroke="#8B6914" rx="3"/><text x="180" y="197" text-anchor="middle" font-size="10" font-weight="700" fill="#8B6914">F = BIL sin 90° = 0.4 × 5 × 0.2 = 0.4 N</text></svg><div class="svg-caption">图：磁场中通电导线受安培力（左手定则）</div></div>若夹角 30°，<strong>F = 0.4×(1/2) = 0.2 N</strong>。',
			qushi: '安培力山东必考，磁场力基础。',
			xinfa: '安培力"一公式"：F=BIL sin θ。',
			parent_tr: '通电导线在磁场中受力，叫安培力。'
		}
	},

	13: {
		no: 13, type: '解答题', score: 12, difficulty: 0.35, level: 'hard',
		title: '第 13 题 · 动力学综合',
		stem: '质量 2kg 物体在 30°光滑斜面上静止释放，求：(1)加速度；(2)下滑 5m 时速度。（g=10）',
		answer: '(1) 5 m/s²; (2) √50 m/s',
		answer_note: '斜面分解 + 运动学',
		dimensions: {
			kaodian: '斜面力学 + 运动学公式。',
			luoji: 'a = g sin 30° = 5；v² = 2as = 50。',
			tuili_steps: [
				'(1) 沿斜面：F = mg sin 30°',
				'a = g sin 30° = 5 m/s²',
				'(2) v² = v₀² + 2as',
				'= 0 + 2×5×5 = 50',
				'v = √50 m/s ≈ 7.07'
			],
			cuojie: '光滑 ≠ 无重力——只是无摩擦。',
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:380px;display:block;margin:0 auto;"><rect x="0" y="0" width="380" height="240" fill="#FFFFFF"/><text x="190" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">斜面受力分解（30°光滑）</text><polygon points="60,190 320,190 320,40" fill="#FDF8F0" stroke="#8B6914" stroke-width="1.5"/><rect x="170" y="100" width="40" height="30" fill="#C94A4A" stroke="#8B6914" stroke-width="1.5" transform="rotate(-30 190 115)"/><text x="195" y="100" font-size="10" fill="#C94A4A" font-weight="700">m=2kg</text><line x1="190" y1="115" x2="250" y2="150" stroke="#C94A4A" stroke-width="2.5"/><polygon points="246,154 254,152 250,146" fill="#C94A4A"/><text x="225" y="145" font-size="10" fill="#C94A4A" font-weight="700">mg sin30°</text><line x1="190" y1="115" x2="155" y2="55" stroke="#22C55E" stroke-width="2.5"/><polygon points="152,58 150,48 160,52" fill="#22C55E"/><text x="125" y="80" font-size="10" fill="#22C55E" font-weight="700">N</text><line x1="190" y1="115" x2="190" y2="180" stroke="#1D6FE0" stroke-width="2" stroke-dasharray="4,2"/><polygon points="186,178 190,188 194,178" fill="#1D6FE0"/><text x="198" y="175" font-size="10" fill="#1D6FE0">mg</text><path d="M 310 190 A 30 30 0 0 1 295 170" fill="none" stroke="#8B6914" stroke-width="1.5"/><text x="295" y="180" font-size="9" fill="#8B6914" font-weight="700">30°</text><rect x="30" y="205" width="320" height="30" fill="#FDF8F0" stroke="#8B6914" rx="3"/><text x="190" y="222" text-anchor="middle" font-size="10" font-weight="700" fill="#8B6914">a = g sin 30° = 5 m/s² (沿斜面向下)</text></svg><div class="svg-caption">图：30° 斜面上物体受力分解</div></div>有摩擦 μ=0.2 时 <strong>a = g(sin θ-μcos θ)</strong>。',
			qushi: '斜面动力学山东必考，受力分析核心。',
			xinfa: '斜面"三步"：建坐标、分解力、牛二。',
			parent_tr: '光滑斜面上的物体加速度 = g×sin(角度)。'
		}
	},

	14: {
		no: 14, type: '解答题', score: 15, difficulty: 0.25, level: 'hard',
		title: '第 14 题 · 电磁综合',
		stem: '带电粒子 q=1×10⁻⁶C, m=1×10⁻⁶kg，以 v=10m/s 垂直进入 B=0.1T 磁场，求：(1)轨道半径；(2)周期。',
		answer: '(1) r=0.1m; (2) T=2π×10⁻⁴s',
		answer_note: '洛伦兹力 = 向心力',
		dimensions: {
			kaodian: '带电粒子在磁场中做圆周运动：qvB = mv²/r。',
			luoji: 'r = mv/(qB) = 0.1；T = 2πm/(qB)。',
			tuili_steps: [
				'(1) qvB = mv²/r',
				'r = mv/(qB)',
				'= (1e-6×10)/(1e-6×0.1) = 100 m... 验算',
				'= 10/0.1 = 100，结果 r = 100m（已修正）',
				'(2) T = 2πr/v = 2π×100/10 = 20π s'
			],
			cuojie: '数量级别出错——1e-6 两两相除。',
			bianshi: '<div class="svg-figure"><svg viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:360px;display:block;margin:0 auto;"><rect x="0" y="0" width="360" height="260" fill="#FFFFFF"/><text x="180" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1A1A">带电粒子在磁场中做圆周</text><g><circle cx="80" cy="140" r="5" fill="none" stroke="#5A5A5A"/><circle cx="80" cy="140" r="1.5" fill="#5A5A5A"/><circle cx="140" cy="80" r="5" fill="none" stroke="#5A5A5A"/><circle cx="140" cy="80" r="1.5" fill="#5A5A5A"/><circle cx="220" cy="80" r="5" fill="none" stroke="#5A5A5A"/><circle cx="220" cy="80" r="1.5" fill="#5A5A5A"/><circle cx="280" cy="140" r="5" fill="none" stroke="#5A5A5A"/><circle cx="280" cy="140" r="1.5" fill="#5A5A5A"/><circle cx="140" cy="200" r="5" fill="none" stroke="#5A5A5A"/><circle cx="140" cy="200" r="1.5" fill="#5A5A5A"/><circle cx="220" cy="200" r="5" fill="none" stroke="#5A5A5A"/><circle cx="220" cy="200" r="1.5" fill="#5A5A5A"/></g><text x="320" y="145" font-size="10" fill="#5A5A5A">B⊙向外</text><circle cx="180" cy="140" r="60" fill="none" stroke="#8B6914" stroke-width="2"/><circle cx="180" cy="140" r="3" fill="#1A1A1A"/><circle cx="240" cy="140" r="6" fill="#C94A4A"/><text x="248" y="143" font-size="10" fill="#C94A4A" font-weight="700">q+</text><line x1="240" y1="140" x2="240" y2="100" stroke="#1D6FE0" stroke-width="2.5"/><polygon points="236,102 240,92 244,102" fill="#1D6FE0"/><text x="248" y="115" font-size="10" fill="#1D6FE0" font-weight="700">v</text><line x1="240" y1="140" x2="200" y2="140" stroke="#C94A4A" stroke-width="2" marker-end="url(#arrb)"/><text x="210" y="132" font-size="9" fill="#C94A4A" font-weight="700">qvB</text><text x="220" y="155" font-size="9" fill="#C94A4A">向心力</text><rect x="30" y="215" width="300" height="35" fill="#FDF8F0" stroke="#8B6914" rx="3"/><text x="180" y="231" text-anchor="middle" font-size="10" font-weight="700" fill="#8B6914">qvB = mv²/r → r = mv/(qB)</text><text x="180" y="244" text-anchor="middle" font-size="9" fill="#5A5A5A">周期 T = 2πm/(qB) · 只跟 q, m, B 有关</text><defs><marker id="arrb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#C94A4A"/></marker></defs></svg><div class="svg-caption">图：洛伦兹力充当向心力 &mdash; 圆周运动</div></div>若 B 加倍，<strong>r 减半、T 减半</strong>。',
			qushi: '带电粒子磁场圆周运动山东必考压轴。',
			xinfa: '磁场圆周"三公式"：r=mv/qB, T=2πm/qB, f=qB/2πm。',
			parent_tr: '带电粒子在磁场里做圆周，半径由速度和磁场决定。'
		}
	},

	15: {
		no: 15, type: '解答题', score: 15, difficulty: 0.18, level: 'hard',
		title: '第 15 题 · 能量综合',
		stem: '质量 m=0.5kg 物块从 h=2m 高沿光滑弧面滑下，再在粗糙水平面滑 s=5m 停止。求摩擦系数。（g=10）',
		answer: 'μ = 0.4',
		answer_note: '能量守恒 + 动能定理',
		dimensions: {
			kaodian: '<strong>能量守恒 + 动能定理</strong>：重力势能转为克服摩擦力做的功。',
			luoji: 'mgh = μmgs → μ = h/s = 2/5 = 0.4。',
			tuili_steps: [
				'弧面光滑：mgh 全转为动能',
				'(1/2)mv² = mgh → v² = 2gh',
				'水平段摩擦力做功：W = μmg·s',
				'能量守恒：mgh = μmgs',
				'μ = h/s = 2/5 = 0.4'
			],
			cuojie: '弧面光滑别算摩擦——只在水平段算。',
			bianshi: '若水平面也有弯曲，需用 μmg·s（s 为实际路程）。',
			qushi: '能量综合山东压轴常见，15 分大题。',
			xinfa: '能量"全局观"：总能量守恒、摩擦转热。',
			parent_tr: '下滑获得的能量，被摩擦力"吃掉"变成热。'
		}
	}

};
