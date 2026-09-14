import type { DmvQuestion } from './dmv-data'

// Pennsylvania-specific, knowledge-test-relevant material only.
// General application, appointment, fee and language information belongs on state pages, not in the exam bank.
export const pennsylvaniaQuestions: DmvQuestion[] = [
  { id:'pa-bus-001', category:'rules', question:'在宾州，校车红灯闪烁并伸出 STOP ARM 时，车辆通常必须至少在多远处停车？', choices:['5 英尺','10 英尺','15 英尺','25 英尺'], answerIndex:1, explanation:'宾州校车停车规则要求通常至少在校车 10 英尺外停车。' },
  { id:'pa-bus-002', category:'rules', question:'在宾州双向道路上，对向校车已停车、红灯闪烁且 STOP ARM 伸出，道路中间没有实体隔离。你应怎么办？', choices:['停车等待','减速到 15 mph 后通过','只要没有儿童就通过','鸣笛后通过'], answerIndex:0, explanation:'没有实体隔离时，对向车辆也必须停车。' },
  { id:'pa-bus-003', category:'rules', question:'在宾州，如果你位于有实体中央隔离设施的分隔公路另一侧，对向校车红灯闪烁并伸出 STOP ARM，通常应怎样做？', choices:['仍必须停车','可以谨慎继续行驶','必须掉头','必须停车 5 分钟'], answerIndex:1, explanation:'实体隔离设施将对向车流与校车分开时，对向车辆通常不需要停车。' },
  { id:'pa-bus-004', category:'rules', question:'宾州校车黄色警示灯开始闪烁时，驾驶人应怎样做？', choices:['减速并准备停车','立即超车','保持原速','只让对向车辆停车'], answerIndex:0, explanation:'黄色灯表示校车即将停车，应减速并做好停车准备。' },
  { id:'pa-bus-005', category:'rules', question:'宾州校车红灯停止闪烁、STOP ARM 收回后，驾驶人还应确认什么再继续行驶？', choices:['儿童已到达安全位置','后车已经起步','校车司机鸣笛','等待固定 60 秒'], answerIndex:0, explanation:'必须确认儿童已经到达安全位置后再继续。' },
  { id:'pa-bus-006', category:'rules', question:'在宾州路口附近遇到一辆已停车、红灯闪烁且 STOP ARM 伸出的校车时，接近该路口的车辆应怎样做？', choices:['按校车停车规则停车','只有校车后方车辆停车','只有右转车辆停车','绿灯时可以直接通过'], answerIndex:0, explanation:'宾州规则明确包括接近校车所在路口的车辆。' },
  { id:'pa-bus-007', category:'rules', question:'在宾州，不按规定为红灯闪烁且 STOP ARM 伸出的校车停车，可能导致什么后果？', choices:['仅口头警告','可能被记分、罚款并暂停驾驶资格','只增加保险费','只影响商业驾照'], answerIndex:1, explanation:'宾州对非法通过停靠校车处罚严格，可涉及记分、罚款和停牌。' },

  { id:'pa-school-001', category:'rules', question:'宾州 School Zone 限速生效时，最高速度通常是多少？', choices:['10 mph','15 mph','20 mph','25 mph'], answerIndex:1, explanation:'宾州学校区域限速生效时通常为 15 mph。' },
  { id:'pa-school-002', category:'rules', question:'宾州 School Zone 黄色信号闪烁时，驾驶人应怎样做？', choices:['遵守 15 mph 学校区域限速','保持普通道路限速','只要没有学生就不减速','最低保持 20 mph'], answerIndex:0, explanation:'黄色学校区域信号闪烁时应遵守 15 mph 限速。' },
  { id:'pa-school-003', category:'rules', question:'宾州驾驶人在生效的 School Zone 超速，驾驶记录通常会增加多少分？', choices:['1 分','2 分','3 分','5 分'], answerIndex:2, explanation:'宾州官方手册说明学校区域超速会增加 3 points。' },

  { id:'pa-light-001', category:'safety', question:'在宾州，因为天气而持续或间歇使用挡风玻璃雨刷时，还应做什么？', choices:['打开前灯','只打开停车灯','打开远光灯','关闭尾灯'], answerIndex:0, explanation:'宾州规定因天气使用雨刷时应同时打开前灯。' },
  { id:'pa-light-002', category:'safety', question:'在宾州雨、雪、雾、烟或冰雹等低能见度天气中，应使用哪种灯光？', choices:['近光灯','远光灯','只开停车灯','不开灯'], answerIndex:0, explanation:'恶劣天气应使用前灯，并以近光为主；远光可能降低能见度。' },
  { id:'pa-light-003', category:'safety', question:'在宾州施工区驾驶时，关于前灯哪项正确？', choices:['应打开前灯','白天永远不用开灯','只需日间行车灯','只需打开危险警示灯'], answerIndex:0, explanation:'宾州要求车辆通过施工区时使用前灯。' },
  { id:'pa-light-004', category:'safety', question:'宾州规定，当你无法看清前方多少英尺范围内的行人或车辆时，应打开前灯？', choices:['500 英尺','750 英尺','1000 英尺','1500 英尺'], answerIndex:2, explanation:'宾州官方手册规定，前方 1000 英尺范围内无法看清行人或车辆时应使用前灯。' },
  { id:'pa-light-005', category:'safety', question:'在宾州，仅打开 Daytime Running Lights 是否足以满足恶劣天气的前灯要求？', choices:['足够','不够，因为尾灯也需要点亮','只有白天足够','只有高速公路足够'], answerIndex:1, explanation:'PennDOT 特别说明日间行车灯不足以替代完整前灯系统，因为尾灯也必须点亮。' },

  { id:'pa-move-001', category:'safety', question:'宾州 Move Over Law 下，接近紧急响应区域且能安全换道时，应怎样做？', choices:['驶入不紧邻响应区域的车道','保持原车道原速','停车在应急车辆后方','打开双闪后继续原车道'], answerIndex:0, explanation:'能安全换道时，应驶离紧邻紧急响应区域的车道。' },
  { id:'pa-move-002', category:'safety', question:'宾州接近紧急响应区域但无法安全换道时，速度应怎样控制？', choices:['不超过公布限速低 20 mph，并保持合理安全速度','保持公布限速','必须完全停车','只需低 5 mph'], answerIndex:0, explanation:'无法安全换道时，应以不超过公布限速低 20 mph 且合理安全的速度通过。' },
  { id:'pa-move-003', category:'rules', question:'在宾州，违反 Move Over 要求、未驶离紧邻紧急响应区域车道可能产生多少驾驶记录积分？', choices:['1 分','2 分','3 分','5 分'], answerIndex:1, explanation:'宾州 Move Over 法规定，未按要求换到远离响应区域的车道可产生 2 points。' },

  { id:'pa-points-001', category:'rules', question:'宾州驾驶记录达到多少分时，PennDOT 开始采取积分纠正措施？', choices:['4 分','5 分','6 分','8 分'], answerIndex:2, explanation:'PennDOT 在驾驶记录达到 6 points 时开始采取纠正措施。' },
  { id:'pa-points-002', category:'rules', question:'宾州驾驶人连续 12 个月没有产生积分、停牌或吊销的违规时，通常可减少多少积分？', choices:['1 分','2 分','3 分','6 分'], answerIndex:2, explanation:'符合条件时每连续 12 个月可减少 3 points。' },
  { id:'pa-points-003', category:'rules', question:'宾州驾驶记录第一次达到 6 分或以上时，驾驶人可能被要求选择什么？', choices:['参加 Special Point Examination 或 Driver Improvement School','重新参加路考','重新申请车牌','强制购买新保险'], answerIndex:0, explanation:'第一次达到 6 points 时，可按规定参加 Special Point Examination 或 Driver Improvement School。' },
  { id:'pa-points-004', category:'rules', question:'宾州未满 18 岁驾驶人累计 6 分或以上时，可能发生什么？', choices:['驾驶资格可能被暂停','自动降为 3 分','只需缴纳停车罚款','没有额外影响'], answerIndex:0, explanation:'宾州对未满 18 岁达到 6 points 的驾驶人有停牌规定。' },
  { id:'pa-points-005', category:'rules', question:'宾州未满 18 岁驾驶人若被判定超过公布限速 26 mph 或以上，可能有什么后果？', choices:['驾驶资格可能被暂停','只收到警告','只扣 1 分','自动升级正式驾照'], answerIndex:0, explanation:'宾州对未满 18 岁驾驶人超速 26 mph 或以上规定了停牌后果。' },
  { id:'pa-points-006', category:'rules', question:'宾州未满 18 岁驾驶人第一次因达到 6 分或严重超速触发停牌时，停牌期通常是多少天？', choices:['30 天','60 天','90 天','120 天'], answerIndex:2, explanation:'首次符合该未成年停牌条件时，通常暂停 90 天。' },

  { id:'pa-junior-001', category:'rules', question:'在宾州申请普通非商业 Learner’s Permit，最低年龄通常是多少？', choices:['15 岁','15 岁半','16 岁','17 岁'], answerIndex:2, explanation:'宾州普通 Learner’s Permit 最低申请年龄通常为 16 岁。' },
  { id:'pa-junior-002', category:'rules', question:'宾州未满 18 岁申请人在参加路考前，通常至少需要多少小时监督驾驶？', choices:['40 小时','50 小时','60 小时','65 小时'], answerIndex:3, explanation:'宾州要求未满 18 岁申请人通常完成至少 65 小时监督驾驶。' },
  { id:'pa-junior-003', category:'rules', question:'宾州未满 18 岁申请人的监督驾驶中，至少多少小时应为夜间驾驶？', choices:['5 小时','10 小时','15 小时','20 小时'], answerIndex:1, explanation:'65 小时监督驾驶中至少 10 小时应为夜间驾驶。' },
  { id:'pa-junior-004', category:'rules', question:'宾州未满 18 岁申请人的监督驾驶中，至少多少小时应为恶劣天气驾驶？', choices:['5 小时','10 小时','15 小时','20 小时'], answerIndex:0, explanation:'65 小时监督驾驶中至少 5 小时应为恶劣天气驾驶。' },
  { id:'pa-junior-005', category:'rules', question:'宾州未满 18 岁的 Learner’s Permit 持有人参加路考前，通常至少需要持 Permit 多久？', choices:['30 天','3 个月','6 个月','12 个月'], answerIndex:2, explanation:'通常需要持 Learner’s Permit 至少 6 个月。' },

  { id:'pa-park-001', category:'rules', question:'在宾州有路缘石的街道平行停车时，车辆通常应停在距路缘石不超过多远的位置？', choices:['6 英寸','12 英寸','18 英寸','24 英寸'], answerIndex:1, explanation:'PennDOT Driver’s Manual 要求尽量靠近路缘石，距离不超过 12 inches。' },
  { id:'pa-park-002', category:'rules', question:'在宾州，停车时至少应离消防栓多远？', choices:['10 英尺','15 英尺','20 英尺','30 英尺'], answerIndex:1, explanation:'禁止在距离消防栓 15 feet 以内停车。' },
  { id:'pa-park-003', category:'rules', question:'在宾州，停车时至少应离路口人行横道多远？', choices:['10 英尺','15 英尺','20 英尺','30 英尺'], answerIndex:2, explanation:'禁止在路口人行横道 20 feet 以内停车。' },
  { id:'pa-park-004', category:'rules', question:'在宾州，停车时至少应离道路旁的 STOP、YIELD、闪烁信号或其他交通控制装置多远？', choices:['15 英尺','20 英尺','30 英尺','50 英尺'], answerIndex:2, explanation:'禁止在这些交通控制装置 30 feet 以内停车。' },
  { id:'pa-park-005', category:'rules', question:'在宾州，停车时至少应离铁路道口最近的铁轨多远？', choices:['20 英尺','30 英尺','40 英尺','50 英尺'], answerIndex:3, explanation:'禁止在铁路道口最近铁轨 50 feet 以内停车。' },
  { id:'pa-park-006', category:'rules', question:'在宾州，下坡停车时，无论是否有路缘石，前轮通常应朝哪个方向？', choices:['向右','向左','保持正直','朝道路中央'], answerIndex:0, explanation:'PennDOT Driver’s Manual 指示下坡停车时前轮应完全向右。' },

  { id:'pa-speed-001', category:'rules', question:'宾州公路的最高法定限速可达到多少？', choices:['55 mph','60 mph','65 mph','70 mph'], answerIndex:3, explanation:'宾州部分道路的最高限速可达到 70 mph，以实际标志为准。' },
  { id:'pa-speed-002', category:'safety', question:'在宾州，即使没有超过公布限速，若雨雪、湿滑或能见度差导致当前速度不安全，是否仍可能被处罚？', choices:['可能','不可能','只有高速公路可能','只有商业车辆可能'], answerIndex:0, explanation:'PennDOT 明确指出，即使未超过标示限速，也可能因对路况而言速度过快而被处罚。' },

  { id:'pa-work-001', category:'rules', question:'宾州施工区内，旗手或交通控制人员的指示与原有道路标线不一致时，应服从什么？', choices:['现场旗手或交通控制人员','原有道路标线','导航软件','前车动作'], answerIndex:0, explanation:'施工区应服从现场临时交通控制。' },
  { id:'pa-work-002', category:'rules', question:'宾州道路上的橙色交通标志通常表示什么？', choices:['施工或维护相关的临时道路状况','医院服务','学校区域','州际公路编号'], answerIndex:0, explanation:'橙色标志用于施工、维护及临时交通控制警告。' },
]
