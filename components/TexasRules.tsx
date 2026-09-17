import RuleSection from './RuleSection'

export default function TexasRules() {
  const items = [
    ['官方通过标准', 'Texas DPS 当前官方 Driver Handbook 明确要求 Knowledge Exam 至少达到 70% 才通过。本站采用 30 题模拟练习，但不把 30 题冒充为当前 DPS 官方固定题量。'],
    ['正式考试语言', '普通非商业驾照 Knowledge Test 当前提供 English 或 Spanish，不提供中文。本站中文 / English / 中英对照仅用于学习辅助。'],
    ['Teen Learner License', '通常最低 15 岁；练习驾驶时前排需要至少 21 岁、持有效驾照且有至少 1 年驾驶经验的成人陪同。'],
    ['青少年驾驶训练', '通常需要至少 30 小时监督驾驶，其中至少 10 小时在夜间完成；learner license 通常至少持有 6 个月。'],
    ['Provisional License', '通常最多搭载 1 名未满 21 岁的非家庭成员；午夜 12:00–早上 5:00 限制驾驶，工作、学校活动和紧急情况等有例外。'],
    ['手机', '未满 18 岁驾驶人使用无线通信设备受到严格限制，包括 hands-free，紧急情况除外；一般驾驶人也不得在驾驶中读取、书写或发送电子消息。'],
    ['Move Over / Slow Down', '无法安全变道时，通常要降到限速以下 20 mph；若公布限速低于 25 mph，则降到 5 mph。'],
    ['School Bus', '校车交替闪红灯时必须停车；只有道路被实体 median、barrier 或明显空间分隔时，对向车辆通常才可继续。中心左转车道不算实体分隔。'],
    ['Under 21 Alcohol', '德州对未满 21 岁实行 Zero Tolerance，检测到任何酒精都可能触发 DUI by a Minor 后果。'],
  ]
  return <RuleSection eyebrow="Texas DPS 重点规则" title="德州考试规则与高频考点" description="以下内容用于学习说明。预约、费用、考试语言和考试地点等办事信息不混入知识考试题库；题库只保留真正适合 Knowledge Test 练习的道路规则、交通标志和安全驾驶内容。" items={items} footnote="正式考试安排与驾照要求请以 Texas DPS 当前 Driver Handbook、DPS 页面或授权考试机构当日说明为准。" />
}
