import type { DmvQuestion } from './dmv-data'

// New Jersey knowledge-test study questions only.
// Administrative facts such as test length, passing score, retest timing,
// language availability and road-test logistics belong on the guide page,
// not in the practice/mock-test pool.
export const newJerseyQuestions: DmvQuestion[] = [
  { id:'nj-gdl-001', category:'rules', question:'新泽西未满21岁的 permit 驾驶人在监督驾驶阶段，通常至少需要练习多久？', choices:['3个月','6个月','12个月'], answerIndex:1, explanation:'NJ MVC 的 GDL 规则要求未满21岁申请人在进入路考前完成规定的监督驾驶阶段。' },
  { id:'nj-gdl-002', category:'rules', question:'新泽西21岁及以上的 GDL 申请人在监督驾驶阶段，通常至少需要练习多久？', choices:['1个月','3个月','6个月'], answerIndex:1, explanation:'21岁及以上 GDL 申请人的监督驾驶期通常至少为3个月。' },
  { id:'nj-gdl-003', category:'rules', question:'新泽西未满21岁的申请人在监督驾驶阶段，目前至少需要完成多少小时练习？', choices:['20小时','40小时','50小时'], answerIndex:2, explanation:'未满21岁的监督驾驶要求至少50小时。' },
  { id:'nj-gdl-004', category:'rules', question:'新泽西未满21岁的50小时监督驾驶中，至少多少小时应在黑暗时段完成？', choices:['5小时','10小时','20小时'], answerIndex:1, explanation:'至少10小时应在 darkness 时段完成。' },
  { id:'nj-gdl-005', category:'rules', question:'新泽西监督驾驶时，陪同驾驶人至少应多大年龄？', choices:['18岁','21岁','25岁'], answerIndex:1, explanation:'监督驾驶人必须至少21岁。' },
  { id:'nj-gdl-006', category:'rules', question:'新泽西监督驾驶的陪同驾驶人至少应有多少年驾驶经验？', choices:['1年','2年','3年'], answerIndex:2, explanation:'监督驾驶人应符合 NJ MVC 的资格要求，包括至少3年驾驶经验。' },
  { id:'nj-rules-001', category:'rules', question:'驾驶人接近 STOP 标志时应该怎么做？', choices:['完全停车并观察路权后安全通行','只减速不停','鸣笛后直接通过'], answerIndex:0, explanation:'STOP 标志要求车辆完全停车，并在确认路权和安全后通行。' },
  { id:'nj-rules-002', category:'rules', question:'在新泽西道路上遇到有优先权的车辆或行人时，驾驶人应该怎么做？', choices:['依法让行','加速抢先通过','鸣笛要求对方停车'], answerIndex:0, explanation:'驾驶人必须遵守 right-of-way 规则并在需要时让行。' },
  { id:'nj-rules-003', category:'rules', question:'驾驶人在新泽西道路上看到闪烁红色交通信号时应该怎么做？', choices:['停车后确认安全再通行','只需减速','保持原速度通过'], answerIndex:0, explanation:'闪烁红灯应像 STOP 标志一样处理。' },
  { id:'nj-rules-004', category:'rules', question:'新泽西驾驶人什么时候必须打开前照灯？', choices:['使用雨刷时以及法规规定的夜间时段','只有完全黑暗时','只有高速公路上'], answerIndex:0, explanation:'NJ MVC 官方样题明确考查雨刷开启时及规定夜间时段使用前照灯。' },
  { id:'nj-rules-005', category:'rules', question:'看到或听到正在执行任务的紧急车辆接近时，驾驶人应该怎么做？', choices:['依法让行并安全避让','保持原速度','加速跟在紧急车辆后面'], answerIndex:0, explanation:'紧急车辆使用警灯或警笛时，其他驾驶人必须依法让行。' },
  { id:'nj-rules-006', category:'rules', question:'驾驶人是否可以驶入公共或私人地产来绕过交通标志或信号？', choices:['除非警察指示，否则不应这样做','只要减速就可以','任何时候都可以'], answerIndex:0, explanation:'NJ MVC 官方样题考查禁止利用地产绕过交通控制，警察指示除外。' },
  { id:'nj-safety-001', category:'safety', question:'在狭窄、弯曲、湿滑道路或接近铁路道口时，驾驶人应该怎样调整？', choices:['减速并提高警觉','加速快速通过','保持最高限速不变'], answerIndex:0, explanation:'这些情况都会增加风险，应降低速度并留出更多反应空间。' },
  { id:'nj-safety-002', category:'safety', question:'如果发生碰撞已经难以避免，驾驶人应该优先采取什么原则？', choices:['尽量降低碰撞严重程度','闭眼并松开方向盘','立即加速'], answerIndex:0, explanation:'NJ MVC 官方样题考查碰撞避免和降低撞击严重程度的方法。' },
  { id:'nj-safety-003', category:'safety', question:'雨雪天气中雨刷突然失效时，驾驶人应该怎么做？', choices:['减速、开启危险警示灯并安全驶离道路','继续原速度行驶','只打开远光灯'], answerIndex:0, explanation:'视线受阻时应降低速度、警示其他车辆并尽快安全离开行车道。' },
  { id:'nj-safety-004', category:'safety', question:'下列哪种驾驶表现可能是酒后驾驶的迹象？', choices:['在车道间摇摆、异常慢速或突然停车','始终保持稳定车速','提前打转向灯'], answerIndex:0, explanation:'NJ MVC 官方样题把车道摇摆、异常慢速和突然停车列为可能的醉酒驾驶迹象。' },
  { id:'nj-alcohol-001', category:'safety', question:'新泽西未满21岁的驾驶人，BAC达到多少即可触发未成年酒驾相关规定？', choices:['0.01%','0.05%','0.08%'], answerIndex:0, explanation:'NJ MVC 官方样题明确考查未满21岁驾驶人的 0.01% BAC 标准。' },
  { id:'nj-alcohol-002', category:'safety', question:'新泽西的 Implied Consent Law（默示同意法）与什么有关？', choices:['涉嫌酒驾被捕时接受呼气测试','允许朋友驾驶你的车','所有乘客必须坐后排'], answerIndex:0, explanation:'在相关条件下驾驶人被视为同意依法进行呼气测试。' },
  { id:'nj-alcohol-003', category:'safety', question:'一杯约5盎司的葡萄酒，其酒精量大致相当于哪一种饮品？', choices:['一罐约12盎司普通啤酒','一整瓶威士忌','六罐啤酒'], answerIndex:0, explanation:'NJ MVC 官方样题用标准饮酒量比较来考查酒精知识。' },
  { id:'nj-schoolbus-001', category:'rules', question:'在新泽西，跟在闪红灯并停车的校车后方时，通常至少应在多远处停车？', choices:['25英尺','10英尺','5英尺'], answerIndex:0, explanation:'NJ MVC 官方样题要求后方驾驶人至少在校车25英尺外停车。' },
]
