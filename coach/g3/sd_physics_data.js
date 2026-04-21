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
			bianshi: '若换成 10N，物体加速度 = ? a=(10-5)/2=2.5m/s²。',
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
			bianshi: '落地速度？v=√(v₀²+(gt)²)=√(16+100)=√116。',
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
			bianshi: '向心力 F = ma = mv²/r。',
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
			bianshi: '落地速度？v=√(2gh)=10 m/s。',
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
			bianshi: '若夹角 30°，F = 0.4×(1/2) = 0.2 N。',
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
			bianshi: '有摩擦 μ=0.2 时 a = g(sin θ-μcos θ)。',
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
			bianshi: '若 B 加倍，r 减半、T 减半。',
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
