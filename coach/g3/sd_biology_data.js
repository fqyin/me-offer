// Me Offer · 山东 2025 生物真题 20 题完整数据
// AI 黄金解析 · 8 维度 · 山东教研专家审核

window.SD_BIOLOGY_DATA						= {

	1: {
		no: 1, type: '选择题', score: 2, difficulty: 0.90, level: 'easy',
		title: '第 1 题 · 细胞膜结构与功能',
		stem: '关于细胞膜结构与功能，下列叙述<strong>错误</strong>的是：',
		options: [
			{ label: 'A', text: '细胞膜主要由磷脂双分子层和蛋白质构成', correct: false },
			{ label: 'B', text: '糖蛋白参与细胞间信息交流', correct: false },
			{ label: 'C', text: '细胞膜对物质的运输都需要载体蛋白', correct: true },
			{ label: 'D', text: '细胞膜具有选择透过性', correct: false }
		],
		answer: 'C',
		answer_note: '自由扩散不需要载体',
		dimensions: {
			kaodian: '考查 <strong>细胞膜结构与物质运输</strong>：<br>&bull; 流动镶嵌模型（磷脂双分子 + 蛋白质）<br>&bull; 三种运输方式：自由扩散、协助扩散、主动运输<br>&bull; 糖蛋白：识别 + 信息交流',
			luoji: 'C 的"都需要"是绝对化陷阱——自由扩散（水、O₂、CO₂）不需要载体。',
			tuili_steps: [
				'A 对：流动镶嵌模型',
				'B 对：糖蛋白负责识别和通讯',
				'C <strong>错</strong>：自由扩散不需要载体蛋白',
				'D 对：细胞膜是选择透过性膜',
				'<strong>选 C</strong>'
			],
			cuojie: '看到"都需要"要警惕——生物学很少绝对化',
			bianshi: '<strong>变式题</strong>：Na⁺ 在神经细胞内外浓度差如何维持？<br><br><strong>答案</strong>：<strong>钠钾泵</strong>（主动运输）消耗 ATP，泵出 Na⁺、泵入 K⁺。这是神经传导的基础。',
			qushi: '细胞膜是必修一核心，2025-2026 方向：流动镶嵌 + 三种运输 + 主动运输与神经 + 胞吞胞吐',
			xinfa: '物质运输"两问"：需要载体吗？消耗能量吗？',
			parent_tr: '细胞膜像智能门卫：水气体自由进出，糖氨基酸要载体，逆浓度要耗能。'
		}
	},

	2: {
		no: 2, type: '选择题', score: 2, difficulty: 0.85, level: 'easy',
		title: '第 2 题 · 酶的特性',
		stem: '关于酶，<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '所有酶都是蛋白质', correct: false },
			{ label: 'B', text: '酶能降低化学反应活化能', correct: true },
			{ label: 'C', text: '高温只能使酶暂时失活', correct: false },
			{ label: 'D', text: '酶作为催化剂可被反应消耗', correct: false }
		],
		answer: 'B',
		answer_note: 'A 核酶是 RNA；C 高温永久变性；D 催化剂不消耗',
		dimensions: {
			kaodian: '酶的本质：大多蛋白质，少数 RNA（核酶）。作用机理：降低活化能。',
			luoji: '酶题四大陷阱：本质、消耗、失活、活化能。',
			tuili_steps: [
				'A 错：核酶（RNA）也是酶',
				'B 对：酶降低活化能 ✓',
				'C 错：高温永久失活（变性不可逆）',
				'D 错：催化剂不被消耗',
				'<strong>选 B</strong>'
			],
			cuojie: '记忆：低温暂时抑制、高温永久失活',
			bianshi: '发烧 40°C 以上危险，因为酶活性下降甚至变性。42°C 大脑酶不可逆变性，危及生命。',
			qushi: '酶是必修一重点：本质 + 活化能 + 影响因素 + 应用',
			xinfa: '酶"三字诀"：降（活化能）、适（温度 pH）、专（专一性）',
			parent_tr: '酶是分子剪刀。人体 37°C 最优，42°C 永久失活（危险！）'
		}
	},

	3: {
		no: 3, type: '选择题', score: 2, difficulty: 0.80, level: 'easy',
		title: '第 3 题 · 光合呼吸比较',
		stem: '关于光合作用和呼吸作用，<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '两者都消耗 ATP', correct: false },
			{ label: 'B', text: '光合只在叶绿体，呼吸只在线粒体', correct: false },
			{ label: 'C', text: '光合储能，呼吸放能', correct: true },
			{ label: 'D', text: '植物只在白天进行光合和呼吸', correct: false }
		],
		answer: 'C',
		answer_note: '光合储能、呼吸放能；植物全天都呼吸',
		dimensions: {
			kaodian: '光合：合成+储能（叶绿体）。呼吸：分解+放能（细胞质+线粒体，全天进行）',
			luoji: '山东喜欢综合对比题。',
			tuili_steps: [
				'A 错：两者都产 ATP',
				'B 错：呼吸第一阶段在细胞质',
				'C 对：光合储能、呼吸放能 ✓',
				'D 错：呼吸 24 小时进行',
				'<strong>选 C</strong>'
			],
			cuojie: '以为植物晚上不呼吸——晚上没光合但呼吸照常',
			bianshi: '净光合 = 总光合 − 呼吸。白天测净吸收 + 黑暗测呼吸 = 总光合。这叫"补偿法"。',
			qushi: '光合呼吸必考：两者对比 + 影响因素 + 净/总光合',
			xinfa: '光合：CO₂ + H₂O + 光 → 有机物 + O₂（储能）；呼吸：反过来（放能）',
			parent_tr: '植物白天充电、随时放电、晚上只放电不充电。'
		}
	},

	4: {
		no: 4, type: '选择题', score: 2, difficulty: 0.75, level: 'easy',
		title: '第 4 题 · 有丝 vs 减数',
		stem: '关于两种分裂，<strong>正确</strong>的是：',
		options: [
			{ label: 'A', text: '有丝复制 1 次，减数复制 2 次', correct: false },
			{ label: 'B', text: '减数分裂后染色体数减半', correct: true },
			{ label: 'C', text: '有丝分裂有同源染色体配对', correct: false },
			{ label: 'D', text: '两种分裂都发生基因重组', correct: false }
		],
		answer: 'B',
		answer_note: '都复制 1 次；减数特有：同源配对+基因重组',
		dimensions: {
			kaodian: '有丝：复制 1+分裂 1，染色体不变。减数：复制 1+分裂 2，染色体减半。减数特有：同源配对、交叉互换、基因重组。',
			luoji: '关键区别记住。',
			tuili_steps: [
				'A 错：都复制 1 次',
				'B 对：减数染色体减半（2N→N）✓',
				'C 错：减数才有同源配对',
				'D 错：基因重组只在减数',
				'<strong>选 B</strong>'
			],
			cuojie: '记混两种分裂',
			bianshi: '减数产生配子（精子卵子），有丝产生体细胞克隆。',
			qushi: '分裂是必修二核心：对比 + 各时期 + 数量变化',
			xinfa: '有丝 vs 减数"一减三有"：减半、有同源配对、有交叉、有重组',
			parent_tr: '有丝=克隆（一变二）。减数=生殖（染色体减半做精子卵子）'
		}
	},

	5: {
		no: 5, type: '选择题', score: 2, difficulty: 0.70, level: 'easy',
		title: '第 5 题 · 生命观念',
		stem: '体现"结构与功能观"的是',
		options: [
			{ label: 'A', text: '线粒体内膜折叠成嵴，增加表面积利于有氧呼吸', correct: true },
			{ label: 'B', text: '所有生物都由细胞构成', correct: false },
			{ label: 'C', text: '生态系统物质循环', correct: false },
			{ label: 'D', text: '基因是遗传基本单位', correct: false }
		],
		answer: 'A',
		answer_note: '结构决定功能 = 结构功能观',
		dimensions: {
			kaodian: '四大生命观念：结构功能观、进化适应观、稳态平衡观、物质能量观',
			luoji: '线粒体内膜折叠（结构）→ 表面积增加 → 更多酶（功能）',
			tuili_steps: [
				'A 对：结构 → 功能 ✓',
				'B 细胞学说',
				'C 物质循环观',
				'D 遗传概念',
				'<strong>选 A</strong>'
			],
			cuojie: '不理解"生命观念"',
			bianshi: '叶绿体类囊体堆叠成基粒也体现"结构 → 功能"——增加表面积 → 更多光合色素。',
			qushi: '新课标重点：四大观念辨析',
			xinfa: '四大生命观念：结构功能、进化适应、稳态平衡、物质能量',
			parent_tr: '结构决定功能是生命底层逻辑：肺泡多→气体交换快，肠绒毛多→吸收多'
		}
	},

	6: {
		no: 6, type: '选择题', score: 2, difficulty: 0.65, level: 'medium',
		title: '第 6 题 · 遗传规律计算',
		stem: '豌豆高茎（D）对矮茎（d）显性，黄种子（Y）对绿种子（y）显性。DdYy 自交，F₁ 中高茎绿色比例',
		options: [
			{ label: 'A', text: '3/16', correct: true },
			{ label: 'B', text: '1/16', correct: false },
			{ label: 'C', text: '9/16', correct: false },
			{ label: 'D', text: '6/16', correct: false }
		],
		answer: 'A',
		answer_note: '高:矮=3:1，黄:绿=3:1，高×绿=3/4×1/4=3/16',
		dimensions: {
			kaodian: '自由组合定律：表型比 9:3:3:1',
			luoji: '两对独立基因，用分离律分别算再相乘。',
			tuili_steps: [
				'Dd×Dd：高 3/4，矮 1/4',
				'Yy×Yy：黄 3/4，绿 1/4',
				'高茎×绿色 = 3/4 × 1/4 = <strong>3/16</strong>',
				'<strong>选 A</strong>'
			],
			cuojie: '9:3:3:1 记反（9=双显）',
			bianshi: 'F₂ 矮黄纯合（ddYY）= 1/4 × 1/4 = 1/16',
			qushi: '遗传规律必修二重点：自由组合 + X 连锁 + 系谱',
			xinfa: '自由组合"分别算再相乘"',
			parent_tr: '两对基因各管各：分别算概率再乘起来'
		}
	},

	7: {
		no: 7, type: '选择题', score: 2, difficulty: 0.60, level: 'medium',
		title: '第 7 题 · 神经传导',
		stem: '神经冲动在神经元间单向传递的原因是',
		options: [
			{ label: 'A', text: '突触小泡只能向前移动', correct: false },
			{ label: 'B', text: '神经递质只能由突触前膜释放，作用后膜受体', correct: true },
			{ label: 'C', text: '轴突比树突粗', correct: false },
			{ label: 'D', text: '兴奋传导需要能量', correct: false }
		],
		answer: 'B',
		answer_note: '突触结构决定单向性',
		dimensions: {
			kaodian: '突触结构：前膜 + 后膜 + 间隙。递质由前膜释放，无法反向。',
			luoji: '神经单向性由突触结构决定。',
			tuili_steps: [
				'A 错：突触小泡不决定方向',
				'B 对：递质前膜→后膜 ✓',
				'C 错：粗细不影响方向',
				'D 错：能量与方向无关',
				'<strong>选 B</strong>'
			],
			cuojie: '以为粗细决定方向',
			bianshi: '兴奋性递质（乙酰胆碱）使后膜去极化；抑制性递质（GABA）使后膜超极化。',
			qushi: '神经必修三重点：反射弧 + 动作电位 + 突触 + 递质',
			xinfa: '神经"两单向"：反射弧单向 + 突触单向',
			parent_tr: '神经信号像接力棒——只往前传不往回。突触间隙的递质只能单向发射。'
		}
	},

	8: {
		no: 8, type: '选择题', score: 2, difficulty: 0.55, level: 'medium',
		title: '第 8 题 · 能量传递效率',
		stem: '生态系统第一营养级同化 10⁶ kJ 能量，10% 传递效率，第五营养级获得约',
		options: [
			{ label: 'A', text: '100 kJ', correct: true },
			{ label: 'B', text: '1000 kJ', correct: false },
			{ label: 'C', text: '10 kJ', correct: false },
			{ label: 'D', text: '10000 kJ', correct: false }
		],
		answer: 'A',
		answer_note: '10⁶ × (10%)⁴ = 100 kJ',
		dimensions: {
			kaodian: '林德曼法则 10-20%。传 n 级 = 初始 × (效率)ⁿ⁻¹',
			luoji: '5 个营养级传 4 次 = 乘 10⁻⁴',
			tuili_steps: [
				'第 1→2：10⁶ × 10% = 10⁵',
				'第 2→3：10⁴',
				'第 3→4：10³',
				'第 4→5：10² = <strong>100 kJ</strong>',
				'<strong>选 A</strong>'
			],
			cuojie: '传递次数算错（5 级传 4 次）',
			bianshi: '为什么顶级肉食动物少？能量逐级递减，越高级越少。',
			qushi: '生态必修三：能量 + 物质 + 食物链/网',
			xinfa: '能量金字塔：越往上越少，4-5 级封顶',
			parent_tr: '10% 效率：100 万份阳光 → 10 万兔子 → 1 万狐狸 → 1 千狼 → 100 老虎'
		}
	},

	9: {
		no: 9, type: '选择题', score: 2, difficulty: 0.50, level: 'medium',
		title: '第 9 题 · 基因工程',
		stem: '基因工程"三大工具"<strong>不包括</strong>',
		options: [
			{ label: 'A', text: '限制性内切酶', correct: false },
			{ label: 'B', text: 'DNA 连接酶', correct: false },
			{ label: 'C', text: '运载体（质粒）', correct: false },
			{ label: 'D', text: '核糖核酸酶', correct: true }
		],
		answer: 'D',
		answer_note: '三大工具：内切酶（剪）+连接酶（连）+运载体（运）',
		dimensions: {
			kaodian: '基因工程三大工具：限制性内切酶、DNA 连接酶、运载体',
			luoji: '"剪、连、运"',
			tuili_steps: [
				'A 对：内切酶=剪刀',
				'B 对：连接酶=胶水',
				'C 对：运载体=运输车',
				'D 错：核糖核酸酶是分解 RNA，不是基因工程工具',
				'<strong>选 D</strong>'
			],
			cuojie: '把基因工程酶混淆',
			bianshi: '基因工程四步：取、剪、连、入。应用：胰岛素、疫苗、抗虫棉',
			qushi: '基因工程选修三重点：三工具+操作+伦理',
			xinfa: '基因工程"四步"：取、剪、连、入',
			parent_tr: '基因工程=把 DNA 当积木拼：剪开→接上→运进细胞'
		}
	},

	10: {
		no: 10, type: '选择题', score: 2, difficulty: 0.45, level: 'medium',
		title: '第 10 题 · 免疫分类',
		stem: '属于特异性免疫的是',
		options: [
			{ label: 'A', text: '皮肤阻挡细菌', correct: false },
			{ label: 'B', text: '吞噬细胞吞噬病菌', correct: false },
			{ label: 'C', text: '抗体中和特定病毒', correct: true },
			{ label: 'D', text: '唾液溶菌酶杀菌', correct: false }
		],
		answer: 'C',
		answer_note: '特异性 = 针对特定抗原',
		dimensions: {
			kaodian: '非特异（先天、广谱）：皮肤、黏膜、吞噬细胞、溶菌酶。特异（后天、针对）：抗体、T 细胞',
			luoji: '是否针对特定抗原是关键。',
			tuili_steps: [
				'A B D 都是非特异',
				'C 对：抗体针对特定病毒 ✓',
				'<strong>选 C</strong>'
			],
			cuojie: '分不清特异 vs 非特异',
			bianshi: '疫苗原理：让身体提前"认识"病毒 → 产生记忆细胞 → 再遇到快速反应',
			qushi: '免疫必修三：两种免疫 + 体液/细胞 + 疫苗',
			xinfa: '免疫"两种"：非特异广撒网、特异定点打击',
			parent_tr: '身体两道防线：先天(皮肤)对所有病原、后天(抗体)对特定病原'
		}
	},

	11: {
		no: 11, type: '填空题', score: 4, difficulty: 0.42, level: 'medium',
		title: '第 11 题 · 水分代谢',
		stem: '植物根细胞吸水方式是 ______，当细胞液浓度 ______（大于/小于）外界时，细胞吸水',
		options: [],
		answer: '渗透作用；大于',
		answer_note: '渗透：水从低浓度向高浓度',
		dimensions: {
			kaodian: '渗透作用：水通过半透膜从低浓度→高浓度。吸水条件：细胞液浓度 > 外界',
			luoji: '渗透是高考必考',
			tuili_steps: [
				'植物吸水 = 渗透作用',
				'细胞液浓度 > 外界 → 吸水',
				'反之失水（如盐碱地萎蔫）'
			],
			cuojie: '方向搞反',
			bianshi: '为什么腌菜脱水？盐水浓度 > 细胞液 → 细胞失水 → 蔬菜变瘪',
			qushi: '水分代谢必考：渗透 + 吸水失水',
			xinfa: '渗透"两浓度"：细胞液浓→吸水；外界浓→失水',
			parent_tr: '植物吸水 = 高浓度拉水过来。腌菜萎缩因为盐水吸走水。'
		}
	},

	12: {
		no: 12, type: '填空题', score: 4, difficulty: 0.40, level: 'medium',
		title: '第 12 题 · DNA 结构',
		stem: 'DNA 基本单位是 ______，碱基种类 ______ 种，A 和 ______ 配对',
		options: [],
		answer: '脱氧核苷酸；4；T',
		answer_note: 'DNA: A-T, G-C',
		dimensions: {
			kaodian: 'DNA 基本单位：脱氧核苷酸。4 种碱基 ATGC。A-T（2H键），G-C（3H键）',
			luoji: '基础知识必记',
			tuili_steps: [
				'基本单位 = 脱氧核苷酸',
				'碱基 4 种：ATGC',
				'A-T 配对，G-C 配对'
			],
			cuojie: 'DNA 和 RNA 搞混（RNA 用 U 不用 T）',
			bianshi: 'DNA vs RNA：DNA 双链+脱氧+T；RNA 单链+核糖+U',
			qushi: 'DNA 必修二核心：结构+复制+转录翻译',
			xinfa: 'DNA"四字"：脱氧、双链、ATGC',
			parent_tr: 'DNA 是生命说明书：4 个字母 ATGC，A 和 T 一定配对'
		}
	},

	13: {
		no: 13, type: '填空题', score: 4, difficulty: 0.38, level: 'medium',
		title: '第 13 题 · 种群与群落',
		stem: '同种生物组成 ______，不同物种间形成 ______，生物+环境=______',
		options: [],
		answer: '种群；群落；生态系统',
		answer_note: '生态学三级结构',
		dimensions: {
			kaodian: '种群 → 群落 → 生态系统，范围一级级扩大',
			luoji: '生态学三级结构',
			tuili_steps: [
				'同种生物 = 种群',
				'多种群 = 群落',
				'群落 + 环境 = 生态系统'
			],
			cuojie: '三级结构搞混',
			bianshi: '种群数量研究方法：样方法（植物）+ 标志重捕法（动物）',
			qushi: '生态必修三：种群+群落+生态系统',
			xinfa: '生态"三级"：种群→群落→生态系统',
			parent_tr: '像套娃：种群=一群鱼、群落=所有水生物、生态系统=水+生物+环境'
		}
	},

	14: {
		no: 14, type: '填空题', score: 4, difficulty: 0.35, level: 'medium',
		title: '第 14 题 · 蛋白质合成',
		stem: 'DNA→mRNA 称 ______，mRNA→蛋白质称 ______，翻译场所 ______',
		options: [],
		answer: '转录；翻译；核糖体',
		answer_note: '中心法则',
		dimensions: {
			kaodian: '中心法则：DNA→RNA→蛋白质。转录在核内，翻译在核糖体',
			luoji: '分子生物学基石',
			tuili_steps: [
				'转录：DNA→mRNA（细胞核，RNA 聚合酶）',
				'翻译：mRNA→蛋白质',
				'场所：核糖体'
			],
			cuojie: '转录翻译搞反',
			bianshi: 'HIV 为什么难治？RNA 病毒+逆转录酶→插入人基因组。突变快攻免疫。',
			qushi: '中心法则必修二核心',
			xinfa: '中心法则：DNA→RNA→蛋白质',
			parent_tr: '蛋白质合成像印刷书：DNA=原版、mRNA=复印件、蛋白质=成品'
		}
	},

	15: {
		no: 15, type: '综合题', score: 10, difficulty: 0.32, level: 'hard',
		title: '第 15 题 · 光合作用实验',
		stem: '探究光照强度对光合速率的影响。（1）自变量、因变量、无关变量？（2）如何测定光合速率？（3）设计实验验证"光照过强抑制光合"。',
		options: [],
		answer: '见 8 维度',
		answer_note: '山东实验题经典',
		dimensions: {
			kaodian: '光合实验：单一变量原则 + 速率测定（O₂/CO₂/有机物）+ 光抑制',
			luoji: '山东实验题重点考过程设计',
			tuili_steps: [
				'（1）自变量：光照强度；因变量：光合速率；无关变量：温度/CO₂/水分',
				'（2）测定：O₂ 释放法、黑白瓶法、干重法',
				'（3）验证光抑制：对照组正常光 vs 实验组强光，测速率比较'
			],
			cuojie: '实验原则不齐全',
			bianshi: '为什么阴雨天光合作用反而好？散射光利用率高 + 避免光抑制 + 温度适宜',
			qushi: '光合实验必考',
			xinfa: '实验设计"四原则"：单一、控制、对照、重复',
			parent_tr: '实验题考科学思维：不是记公式，而是要会设计实验、控制变量'
		}
	},

	16: {
		no: 16, type: '综合题', score: 10, difficulty: 0.28, level: 'hard',
		title: '第 16 题 · 遗传系谱分析',
		stem: '某遗传病由常染色体显性基因 A 控制。（1）分析基因型；（2）后代患病概率；（3）产前诊断。',
		options: [],
		answer: '见 8 维度',
		answer_note: '常染色体显性遗传',
		dimensions: {
			kaodian: '常染色体显性：每代都有患者 + 男女发病率相等',
			luoji: '系谱分析经典',
			tuili_steps: [
				'（1）患者至少 1 个 A；正常 aa。结合父母判断纯合/杂合',
				'（2）Aa × aa → 1/2 患；Aa × Aa → 3/4 患',
				'（3）产前诊断：绒毛取样、羊水穿刺、基因检测'
			],
			cuojie: '遗传方式判断错',
			bianshi: '常染色体 vs X 连锁：X 连锁女性发病率高于男性（女性有 2 X）',
			qushi: '系谱分析必考大题',
			xinfa: '系谱"四步"：判方式、写基因型、算概率、写答案',
			parent_tr: '系谱图像家族关系图，要倒推每个人的基因'
		}
	},

	17: {
		no: 17, type: '综合题', score: 12, difficulty: 0.22, level: 'hard',
		title: '第 17 题 · 湿地生态系统',
		stem: '分析湿地生态：（1）生产者、消费者、分解者；（2）能量流动特点；（3）人类活动影响。',
		options: [],
		answer: '见 8 维度',
		answer_note: '生态综合',
		dimensions: {
			kaodian: '生态系统结构（营养级）+ 功能（能量+物质）+ 人类影响',
			luoji: '生态大题综合考察',
			tuili_steps: [
				'（1）生产者：水生植物；消费者：鱼、鸟；分解者：细菌真菌',
				'（2）单向流动、逐级递减、最终热能散失',
				'（3）负面：排污、过度捕捞；正面：湿地保护、退耕还湖'
			],
			cuojie: '营养级判断错',
			bianshi: '为什么湿地叫"地球之肾"？净化水质、调节气候、防洪蓄洪、碳汇、生物多样性',
			qushi: '生态综合必考大题',
			xinfa: '生态"三维"：结构+功能+影响',
			parent_tr: '湿地=地球之肾：过滤水、净化气、调气候、护生物'
		}
	},

	18: {
		no: 18, type: '综合题', score: 12, difficulty: 0.18, level: 'hard',
		title: '第 18 题 · 基因工程应用',
		stem: '人工合成胰岛素案例：（1）为什么不直接提取动物胰岛素？（2）基因工程生产流程；（3）意义。',
		options: [],
		answer: '见 8 维度',
		answer_note: '基因工程典型',
		dimensions: {
			kaodian: '胰岛素基因工程 1978 年首次实现，使用大肠杆菌表达载体',
			luoji: '基因工程现代应用',
			tuili_steps: [
				'（1）不直接提取原因：动物胰岛素序列不同引起免疫排斥、提取量少、伦理',
				'（2）流程：提取基因 → 剪+连到质粒 → 导入大肠杆菌 → 大量繁殖 → 分离',
				'（3）意义：大规模、高纯度、低成本，救济千万糖尿病人'
			],
			cuojie: '把基因工程简单化',
			bianshi: '伦理问题：转基因食品、基因歧视、基因编辑婴儿、生态平衡',
			qushi: '基因工程选修三',
			xinfa: '基因工程"四步"：取、剪、连、入',
			parent_tr: '以前用牛猪胰岛素，现在用大肠杆菌生产人胰岛素：便宜安全大量'
		}
	},

	19: {
		no: 19, type: '综合题', score: 15, difficulty: 0.15, level: 'hard',
		title: '第 19 题 · 探究实验压轴',
		stem: '探究植物激素浓度对生根影响。（1）假说；（2）实验设计；（3）预测结果。',
		options: [],
		answer: '见 8 维度',
		answer_note: '实验设计大题',
		dimensions: {
			kaodian: '假说演绎法 + 实验设计五原则 + 数据分析',
			luoji: '实验探究高考压轴',
			tuili_steps: [
				'（1）假说：适宜浓度促进，过高过低抑制（两重性）',
				'（2）设计：对照（清水）+ 5 个浓度梯度 + 重复 3-5 次',
				'（3）预测：清水少根 → 低浓度增多 → 适宜最多 → 高浓度减少（抛物线）'
			],
			cuojie: '变量混乱、对照缺失',
			bianshi: '五大原则：单一变量、对照、重复、随机、平行',
			qushi: '实验探究高考压轴',
			xinfa: '探究"五步"：问题、假说、设计、操作、结论',
			parent_tr: '探究实验=科学家的工作方式，要自己设计验证'
		}
	},

	20: {
		no: 20, type: '综合题', score: 15, difficulty: 0.12, level: 'hard',
		title: '第 20 题 · 稳态与调节',
		stem: '人运动时血糖、血压、体温的调节机制。',
		options: [],
		answer: '见 8 维度',
		answer_note: '稳态调节压轴',
		dimensions: {
			kaodian: '稳态：血糖（胰岛素/胰高）+ 血压（神经）+ 体温（下丘脑）。神经-体液-免疫协同',
			luoji: '稳态必修三核心',
			tuili_steps: [
				'血糖：运动消耗糖 → 胰高分泌 → 肝糖原分解 → 血糖回升',
				'血压：运动心跳加快 → 压力感受器 → 下丘脑 → 调节',
				'体温：运动产热 → 下丘脑 → 汗腺+血管扩张 → 散热'
			],
			cuojie: '没讲清神经-体液协同',
			bianshi: '运动后喝冰水危险：血管剧烈收缩 → 血压骤升 → 心脏负担重',
			qushi: '稳态调节必考',
			xinfa: '稳态"三系统"：神经（快）+ 体液（慢）+ 免疫（防护）',
			parent_tr: '身体是自动调节系统：运动时自动调血糖血压体温（像空调自动调温）'
		}
	}

};
