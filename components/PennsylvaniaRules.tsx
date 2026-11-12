import RuleSection from './RuleSection'

export default function PennsylvaniaRules() {
  const rules = [
    ['正式知识考试', 'PennDOT Knowledge Test 共 18 题，至少答对 15 题通过。'],
    ['校车', '红灯闪烁并伸出 STOP ARM 时通常须在至少 10 英尺外停车；实体隔离道路的对向交通适用例外。'],
    ['学校区域', 'School Zone 限速生效时通常为 15 mph。'],
    ['Move Over', '能安全换道时驶离紧邻紧急响应区域的车道；不能安全换道时，应按规定显著减速。'],
    ['雨刷与车灯', '因天气使用挡风玻璃雨刷时，应同时打开前灯。'],
    ['未满 18 岁', 'Learner’s Permit 通常至少持有 6 个月，并完成 65 小时监督驾驶，其中至少 10 小时夜间、5 小时恶劣天气。'],
    ['积分制度', '驾驶记录达到 6 points 时，PennDOT 会按规定启动相应纠正措施。'],
    ['酒驾与未成年', '21 岁以下零容忍：血液酒精浓度达到 0.02% 即构成酒驾；未成年饮酒、持酒、运酒均属违法，使用假身份证将被罚款并暂停驾照。'],
  ]

  return <RuleSection eyebrow="PennDOT 重点规则" title="宾州笔试先记住这些规则" description="下面是依据官方手册整理的学习说明。本站宾州题库已直接采用手册第 2–4 章的章末复习题，共 184 题。" items={rules} footnote="规则依据 PennDOT 官方 Driver’s Manual 与 Driver and Vehicle Services 公布信息整理；正式考试及法规变化以 PennDOT 最新内容为准。" />
}
