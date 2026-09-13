import type { DmvQuestion } from './dmv-data'

// New Jersey-specific core questions. These supplement the shared core bank.
// Facts are based on the NJ MVC Driver Manual / First Driver License guidance.
export const newJerseyQuestions: DmvQuestion[] = [
  { id:'nj-doc-001', category:'documents', question:'新泽西普通驾照知识考试共有多少道计分题？', choices:['20题','36题','50题'], answerIndex:2, explanation:'NJ MVC Driver Manual 规定普通知识考试为 50 道题，另有一道人体器官捐赠调查题。' },
  { id:'nj-doc-002', category:'documents', question:'新泽西普通驾照知识考试至少需要答对多少题才能通过？', choices:['35题','40题','45题'], answerIndex:1, explanation:'通过标准为 80%，即 50 题中至少答对 40 题。' },
  { id:'nj-doc-003', category:'documents', question:'新泽西知识考试没有通过后，通常最早多久可以重新考试？', choices:['第二天','7天后','30天后'], answerIndex:1, explanation:'NJ MVC First Driver License 页面说明，知识考试失败后可在 7 天后重新考试。' },
  { id:'nj-doc-004', category:'documents', question:'申请新泽西 Basic Driver License 时，身份材料需要满足什么验证要求？', choices:['6 Point ID Verification','只需要护照','只需要住址证明'], answerIndex:0, explanation:'NJ MVC 要求申请人提交满足 6 Point ID Verification 的所需文件。' },
  { id:'nj-doc-005', category:'documents', question:'新泽西首次驾照流程中，知识考试之外还需要进行哪项基本筛查？', choices:['听力测试','视力测试','血型测试'], answerIndex:1, explanation:'首次驾照流程要求知识考试和 vision test（视力筛查）。' },
  { id:'nj-doc-006', category:'documents', question:'取得新泽西 permit 后，完成首次驾照流程通常有多长时间期限？', choices:['6个月','1年','2年'], answerIndex:2, explanation:'NJ MVC 说明取得 permit 后有 2 年完成相应步骤，否则需要重新取得 permit。' },
  { id:'nj-doc-007', category:'documents', question:'新泽西知识考试是否提供中文考试？', choices:['不提供','提供 Chinese','只有路考提供中文'], answerIndex:1, explanation:'NJ MVC 官方知识考试语言列表包括 Chinese。' },
  { id:'nj-doc-008', category:'documents', question:'新泽西知识考试通过后，permit 会怎样处理？', choices:['立即作废','被验证后进入下一阶段','自动变成 Basic License'], answerIndex:1, explanation:'通过知识和相关测试后 permit 会被验证，申请人进入监督驾驶等下一阶段。' },
  { id:'nj-doc-009', category:'documents', question:'新泽西未满21岁的 GDL 申请人通过知识考试后，通常需要监督驾驶至少多久？', choices:['3个月','6个月','12个月'], answerIndex:1, explanation:'NJ MVC 当前首次驾照流程要求未满21岁申请人监督驾驶至少 6 个月。' },
  { id:'nj-doc-010', category:'documents', question:'新泽西21岁及以上的 GDL 申请人通过知识考试后，通常需要监督驾驶至少多久？', choices:['1个月','3个月','6个月'], answerIndex:1, explanation:'NJ MVC 当前首次驾照流程列明，21岁以上 GDL 申请人监督驾驶至少 3 个月。' },
  { id:'nj-doc-011', category:'documents', question:'新泽西未满21岁申请人的监督驾驶，目前至少需要多少小时实际练习？', choices:['20小时','40小时','50小时'], answerIndex:2, explanation:'NJ MVC 当前要求未满21岁监督驾驶至少 50 小时，其中包括夜间驾驶。' },
  { id:'nj-doc-012', category:'documents', question:'新泽西未满21岁申请人的50小时监督驾驶中，至少多少小时应在黑暗时段完成？', choices:['5小时','10小时','20小时'], answerIndex:1, explanation:'NJ MVC 当前要求 50 小时监督驾驶中至少 10 小时在 darkness 时段完成。' },
  { id:'nj-doc-013', category:'documents', question:'新泽西监督驾驶时，陪同驾驶人至少应多大年龄？', choices:['18岁','21岁','25岁'], answerIndex:1, explanation:'监督驾驶人必须至少 21 岁。' },
  { id:'nj-doc-014', category:'documents', question:'新泽西监督驾驶的陪同驾驶人至少应有多少年新泽西驾照驾驶经验？', choices:['1年','2年','3年'], answerIndex:2, explanation:'NJ MVC 要求监督驾驶人持有效 NJ 驾照并至少有 3 年驾驶经验。' },
  { id:'nj-doc-015', category:'documents', question:'新泽西路考没有通过后，通常至少等待多久才能重考？', choices:['7天','14天','30天'], answerIndex:1, explanation:'NJ MVC Road Test 页面规定路考失败后至少等待 14 天。' },
  { id:'nj-doc-016', category:'documents', question:'通过新泽西路考后，首次驾照申请人下一步通常取得什么驾照？', choices:['Probationary Driver’s License','CDL','国际驾照'], answerIndex:0, explanation:'首次驾照流程在通过 road test 后进入 Probationary Driver’s License 阶段。' },
  { id:'nj-doc-017', category:'documents', question:'取得新泽西 Probationary Driver’s License 后，通常独立驾驶多久再升级 Basic License？', choices:['3个月','6个月','1年'], answerIndex:2, explanation:'NJ MVC 当前首次驾照流程要求 probationary 阶段独立驾驶 1 年后升级。' },
  { id:'nj-safety-001', category:'safety', question:'新泽西路考车辆中，考试人员必须能够做到什么？', choices:['从副驾驶位置接触脚刹或驻车制动','操作方向盘','关闭发动机'], answerIndex:0, explanation:'NJ MVC 要求路考车辆必须让 Safety Specialist 能够从乘客位置接触脚刹或驻车制动。' },
  { id:'nj-safety-002', category:'safety', question:'新泽西未满21岁申请人参加路考时，车辆牌照通常需要什么？', choices:['红色反光 decals','临时纸牌','商业车辆标志'], answerIndex:0, explanation:'NJ MVC Road Test 页面要求未满21岁驾驶人的路考车辆使用规定的红色反光牌照 decals。' },
  { id:'nj-rules-001', category:'rules', question:'新泽西路考会考查下列哪项驾驶技能？', choices:['平行停车','高速漂移','紧急倒车竞速'], answerIndex:0, explanation:'NJ MVC 列出的 road test skills 包括 parallel parking。' },
  { id:'nj-rules-002', category:'rules', question:'新泽西路考中，驾驶人接近 STOP 标志时最重要的是展示什么？', choices:['正确停车并观察路权','只减速不停','鸣笛后通过'], answerIndex:0, explanation:'NJ MVC 路考明确考查 stopping at appropriate signs 以及正确处理路口。' },
  { id:'nj-rules-003', category:'rules', question:'新泽西路考是否会考查驾驶人让行和路权判断？', choices:['会','不会','只在商业驾照考试中考'], answerIndex:0, explanation:'NJ MVC Road Test skills 明确包括 yielding to right-of-way。' },
  { id:'nj-rules-004', category:'rules', question:'参加新泽西路考时，车辆必须具备什么基本状态？', choices:['有效注册、保险并符合安全要求','只要能启动即可','可以没有保险卡'], answerIndex:0, explanation:'NJ MVC 要求路考车辆注册有效、符合安全条件并携带保险卡。' },
  { id:'nj-doc-018', category:'documents', question:'从美国其他州搬到新泽西并持有有效、状态良好的非临时驾照时，通常是否需要重新参加知识和路考？', choices:['通常可免知识和路考','必须全部重考','只免路考不免知识考试'], answerIndex:0, explanation:'NJ MVC Moving to New Jersey 页面说明，符合条件的美国其他州有效非临时驾照转入通常免知识和路考。' },
  { id:'nj-doc-019', category:'documents', question:'新泽西普通知识考试的官方通过百分比是多少？', choices:['70%','75%','80%'], answerIndex:2, explanation:'NJ MVC Driver Manual 的 Test Requirements 表明确要求 written test 达到 80%。' },
]
