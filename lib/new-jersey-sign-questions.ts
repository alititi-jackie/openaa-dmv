import type { DmvQuestion } from './dmv-data'

// Core visual sign questions for the NJ basic automobile knowledge-test study bank.
// Each question has a one-to-one matching sign asset in QuestionSignImage.
export const newJerseySignQuestions: DmvQuestion[] = [
  { id:'nj-sign-001', category:'signs', question:'图中的 STOP 标志要求驾驶人怎么做？', choices:['完全停车并确认安全后通行','只减速','没有其他车辆时直接通过'], answerIndex:0, explanation:'STOP 标志要求完全停车，并在确认路权和安全后通行。' },
  { id:'nj-sign-002', category:'signs', question:'图中的 YIELD 标志表示什么？', choices:['减速并让有优先权的交通先行','必须立即掉头','前方道路封闭'], answerIndex:0, explanation:'YIELD 表示减速、准备停车，并让有优先权的车辆或行人先行。' },
  { id:'nj-sign-003', category:'signs', question:'图中的 DO NOT ENTER 标志表示什么？', choices:['不得从这个方向驶入','只允许卡车进入','可以短暂停车'], answerIndex:0, explanation:'DO NOT ENTER 表示车辆不得从该方向进入道路或匝道。' },
  { id:'nj-sign-004', category:'signs', question:'图中的 WRONG WAY 标志说明什么？', choices:['正在朝禁止的方向行驶','前方允许掉头','道路即将变窄'], answerIndex:0, explanation:'WRONG WAY 警告驾驶人正在沿错误、禁止的方向行驶，应安全纠正方向。' },
  { id:'nj-sign-005', category:'signs', question:'图中的 NO U-TURN 标志表示什么？', choices:['禁止掉头','禁止左转','只能掉头'], answerIndex:0, explanation:'该标志明确禁止 U-turn（掉头）。' },
  { id:'nj-sign-006', category:'signs', question:'图中的 ONE WAY 标志表示什么？', choices:['只能按箭头方向行驶','前方双向交通','只允许一辆车通过'], answerIndex:0, explanation:'ONE WAY 表示该道路交通只能沿箭头所示方向行驶。' },
  { id:'nj-sign-007', category:'signs', question:'图中的 KEEP RIGHT 标志要求驾驶人怎么做？', choices:['从障碍物或分隔岛右侧通过','必须右转进入下一条街','靠左通过'], answerIndex:0, explanation:'KEEP RIGHT 要求车辆从障碍物、分隔岛等的右侧通过。' },
  { id:'nj-sign-008', category:'signs', question:'图中的 SLIPPERY WHEN WET 警告标志提醒什么？', choices:['路面湿滑时应减速并增加跟车距离','只有下雪时停车','前方禁止通行'], answerIndex:0, explanation:'该警告标志提醒湿路可能打滑，应降低速度并增加安全距离。' },
  { id:'nj-sign-009', category:'signs', question:'图中的铁路道口预警标志提醒驾驶人什么？', choices:['前方有铁路道口，应减速观察并准备停车','前方是公交车站','前方禁止鸣笛'], answerIndex:0, explanation:'铁路道口预警标志要求提前减速、观察和倾听列车，并准备停车。' },
  { id:'nj-sign-010', category:'signs', question:'图中的 SCHOOL 警告标志提醒驾驶人什么？', choices:['减速并特别注意儿童和行人','学校区域可以加速','只需要注意校车'], answerIndex:0, explanation:'学校区域警告标志提醒驾驶人降低速度并注意儿童、学生和行人。' },
  { id:'nj-sign-011', category:'signs', question:'图中的 ROAD WORK 橙色标志表示什么？', choices:['前方施工，应减速并遵守临时交通控制','前方医院','前方休息区'], answerIndex:0, explanation:'橙色施工警告标志表示前方道路施工或养护，应减速并服从临时控制。' },
  { id:'nj-sign-012', category:'signs', question:'图中的 SPEED LIMIT 标志表示什么？', choices:['该路段规定的最高法定限速','建议最低速度','只有卡车需要遵守的速度'], answerIndex:0, explanation:'SPEED LIMIT 属于管制标志，显示该路段规定的速度限制。' },
]
