import RuleSection from './RuleSection'

export default function MassachusettsRules() {
  const items = [
    ['正式考试', 'Class D learner’s permit exam 共 25 题，考试时间 25 分钟，至少答对 18 题通过。'],
    ['考试语言', 'RMV 提供多种考试语言，其中包括 Mandarin (Simplified)、Mandarin (Traditional) 和 English。'],
    ['JOL / 未满 18 岁', '参加路考前通常需要连续持有 permit 至少 6 个月、保持 6 个月清洁驾驶记录、完成 Driver Education，并完成至少 40 小时额外监督驾驶。'],
    ['Hands-Free', '18 岁及以上驾驶人使用电子设备时通常必须 hands-free；未满 18 岁驾驶人开车时不得使用电子设备，包括 hands-free。'],
    ['校车', '校车闪红灯时通常双向车辆都要停车；有实体隔离带的 divided highway 对向车辆属于主要例外。跟随校车时至少保持 100 英尺。'],
    ['Vulnerable Road Users', '超越自行车、行人等 vulnerable road user 时至少留出 4 英尺；必要时可在安全并遵守限速的前提下使用相邻车道或越过中心线。'],
    ['White Cane Law', '遇到使用白手杖或导盲犬的视障行人过街时必须完全停车，并等待其安全通过。'],
  ]

  return <RuleSection eyebrow="Massachusetts RMV 重点规则" title="麻州考试规则与高频考点" description="下面是学习说明，不混入题库充当说明题。题库只保留适合 Class D Permit 知识考试练习的规则、标志和安全驾驶题目。" items={items} footnote="考试和驾照要求可能调整，正式规定请以 Massachusetts RMV 当前 Driver’s Manual 和官方页面为准。" />
}
