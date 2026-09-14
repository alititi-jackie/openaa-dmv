export type TrafficSignAsset = {
  key: string
  imageUrl: string
  alt: string
  code: string
  sourceLabel?: string
}

const COMMON = '/traffic-signs/common'
const CALIFORNIA = '/traffic-signs/california'

const asset = (key: string, imageUrl: string, alt: string, code: string, sourceLabel?: string): TrafficSignAsset => ({ key, imageUrl, alt, code, sourceLabel })

export const trafficSignLibrary: Record<string, TrafficSignAsset> = {
  'R1-1': asset('R1-1', `${CALIFORNIA}/r1-1-stop.svg`, 'STOP 停车标志', 'R1-1'),
  'R1-2': asset('R1-2', `${CALIFORNIA}/r1-2-yield.svg`, 'YIELD 让行标志', 'R1-2'),
  'R2-1': asset('R2-1', `${CALIFORNIA}/r2-1-speed-limit.svg`, 'SPEED LIMIT 限速标志', 'R2-1'),
  'R3-4': asset('R3-4', `${COMMON}/r3-4-no-u-turn.svg`, 'NO U-TURN 标志', 'R3-4'),
  'R4-7': asset('R4-7', `${COMMON}/r4-7-keep-right.svg`, 'KEEP RIGHT 标志', 'R4-7'),
  'R5-1': asset('R5-1', `${COMMON}/r5-1-do-not-enter.svg`, 'DO NOT ENTER 标志', 'R5-1'),
  'R5-1a': asset('R5-1a', `${COMMON}/r5-1a-wrong-way.svg`, 'WRONG WAY 标志', 'R5-1a'),
  'R6-1': asset('R6-1', `${COMMON}/r6-1-one-way.svg`, 'ONE WAY 标志', 'R6-1'),
  'W1-2': asset('W1-2', `${CALIFORNIA}/w1-2-curve.svg`, '弯道警告标志', 'W1-2'),
  'W1-5': asset('W1-5', `${COMMON}/w1-5-winding-road.svg`, 'WINDING ROAD 连续弯道警告标志', 'W1-5'),
  'W2-1': asset('W2-1', `${COMMON}/w2-1-crossroad.svg`, 'CROSSROAD 交叉路口警告标志', 'W2-1'),
  'W3-1': asset('W3-1', `${COMMON}/w3-1-stop-ahead.svg`, 'STOP AHEAD 前方停车标志', 'W3-1'),
  'W3-2': asset('W3-2', `${COMMON}/w3-2-yield-ahead.svg`, 'YIELD AHEAD 前方让行标志', 'W3-2'),
  'W3-3': asset('W3-3', `${COMMON}/w3-3-signal-ahead.svg`, 'SIGNAL AHEAD 前方信号灯标志', 'W3-3'),
  'W4-1': asset('W4-1', `${COMMON}/w4-1-merge.svg`, 'MERGE 汇流警告标志', 'W4-1'),
  'W4-2': asset('W4-2', `${COMMON}/w4-2-lane-ends.svg`, 'LANE ENDS 车道结束标志', 'W4-2'),
  'W6-1': asset('W6-1', `${COMMON}/w6-1-divided-highway.svg`, 'DIVIDED HIGHWAY 警告标志', 'W6-1'),
  'W6-3': asset('W6-3', `${COMMON}/w6-3-two-way-traffic.svg`, 'TWO-WAY TRAFFIC 双向交通标志', 'W6-3'),
  'W8-5': asset('W8-5', `${COMMON}/w8-5-slippery.svg`, 'SLIPPERY WHEN WET 标志', 'W8-5'),
  'W10-1': asset('W10-1', `${CALIFORNIA}/w10-1-railroad-warning.svg`, '铁路道口预警标志', 'W10-1'),
  'W11-2': asset('W11-2', `${COMMON}/w11-2-pedestrian.svg`, 'PEDESTRIAN CROSSING 行人警告标志', 'W11-2'),
  'W14-3': asset('W14-3', `${COMMON}/w14-3-no-passing-zone.svg`, 'NO PASSING ZONE 禁止超车区域标志', 'W14-3'),
  'W20-1': asset('W20-1', `${CALIFORNIA}/cw20-1-road-work.svg`, 'ROAD WORK 道路施工标志', 'W20-1'),
  'R15-1': asset('R15-1', `${CALIFORNIA}/r15-1-crossbuck.svg`, 'RAILROAD CROSSING Crossbuck 标志', 'R15-1'),
  'S1-1': asset('S1-1', `${CALIFORNIA}/s1-1-school.svg`, 'SCHOOL 学校区域标志', 'S1-1'),
}
