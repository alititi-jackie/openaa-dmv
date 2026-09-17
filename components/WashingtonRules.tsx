import RuleSection from './RuleSection'

export default function WashingtonRules() {
  const items = [
    ['正式考试', 'Washington DOL Driving Knowledge Exam 共 40 题，至少答对 32 题通过；通过成绩有效 2 年。'],
    ['考试语言', 'DOL 知识考试提供多种语言，包括简体中文、繁体中文和 English。'],
    ['School Zone', '华州 school zone 常见限速为 20 mph；实际以现场标志和闪灯时段为准。'],
    ['16–17 岁首次拿证', '通常需要 permit 至少 6 个月，完成批准的驾驶课程，并完成至少 40 小时白天 + 10 小时夜间监督驾驶。'],
    ['Intermediate License', '前 6 个月通常不得搭载未满 20 岁的非直系家庭成员；凌晨 1:00–5:00 通常不得单独驾驶。'],
    ['校车', '同方向车辆遇校车红灯和 stop sign 必须停车；两车道路对向车辆也要停车，3 条或更多车道或有实体隔离带时对向交通有例外。'],
    ['车灯', '法律要求从日落后 30 分钟到日出前 30 分钟开启 headlights；会车 500 ft 内、跟车 300 ft 内应使用近光灯。'],
    ['即将生效', '从 2026 年 11 月 1 日起，首次申请驾照且未满 25 岁的人将新增免费的 Work Zone and First Responder Safety 在线课程要求。该要求当前尚未生效。'],
  ]

  return <RuleSection eyebrow="Washington DOL 重点规则" title="华盛顿州考试规则与高频考点" description="下面是学习说明，不混入题库充当考题。题库只保留适合 Driving Knowledge Exam 练习的道路规则、交通标志和安全驾驶内容。" items={items} footnote="正式考试、驾照资格和未来生效规则请以 Washington DOL 当前 Driver Guide 和官方页面为准。" />
}
