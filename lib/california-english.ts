export const californiaEnglishById: Record<string, {
  question: string
  choices: string[]
  explanation: string
  keywords?: { term: string; zh: string }[]
}> = {
  'ca-rules-001': {
    question: 'What is the safest way to enter a freeway in California?',
    choices: ['Use the acceleration lane to reach a speed close to freeway traffic, then merge when safe', 'Stop at the end of the acceleration lane and wait', 'Merge while traveling much slower than freeway traffic'],
    explanation: 'When entering a freeway, use the acceleration lane to adjust your speed to the flow of traffic and merge only when there is a safe gap.',
    keywords: [{ term: 'acceleration lane', zh: '加速车道' }, { term: 'merge', zh: '汇入 / 并线' }],
  },
  'ca-rules-002': {
    question: 'When may you drive off the paved roadway to pass another vehicle in California?',
    choices: ['When the vehicle ahead is turning left', 'Never drive off the paved roadway to pass another vehicle', 'Only during daylight hours'],
    explanation: 'Do not drive off the paved or main-traveled portion of the roadway to pass another vehicle.',
    keywords: [{ term: 'paved roadway', zh: '铺装道路' }, { term: 'pass', zh: '超车' }],
  },
  'ca-rules-003': {
    question: 'When parallel parking in California, how should you usually enter the parking space?',
    choices: ['Pull alongside the vehicle in front of the space, then back into the space', 'Drive straight forward into the space', 'Pull alongside the vehicle behind the space, then drive forward into it'],
    explanation: 'A standard parallel-parking approach is to pull alongside the vehicle in front of the space and then back into the parking space while checking your surroundings.',
    keywords: [{ term: 'parallel parking', zh: '平行停车' }, { term: 'back into', zh: '倒车进入' }],
  },
  'ca-rules-004': {
    question: 'At an uncontrolled railroad crossing with a blocked view, what should you do?',
    choices: ['Maintain your speed and cross quickly', 'Slow down and be prepared to stop until you are sure no train is coming', 'Honk your horn and continue'],
    explanation: 'When your view at a railroad crossing is limited, slow down, look and listen carefully, and be prepared to stop before crossing.',
    keywords: [{ term: 'railroad crossing', zh: '铁路道口' }, { term: 'blocked view', zh: '视线受阻' }],
  },
  'ca-rules-005': {
    question: 'At a red traffic light in California, what is the most important step before turning right?',
    choices: ['Come to a complete stop and turn only if the turn is permitted and safe', 'Slow down and turn without stopping', 'Honk before making the turn'],
    explanation: 'Before turning right on red, you must first come to a complete stop. Turn only when it is legal and safe, and when no sign prohibits the turn.',
    keywords: [{ term: 'complete stop', zh: '完全停车' }, { term: 'right on red', zh: '红灯右转' }],
  },
  'ca-rules-006': {
    question: 'What should you do when facing a red arrow signal?',
    choices: ['Turn slowly in the direction of the arrow', 'Stop and do not turn in the direction of the arrow until a signal permits it', 'Turn if there are no pedestrians'],
    explanation: 'A red arrow means stop. Remain stopped and do not proceed in the direction of the arrow until a permitted signal appears.',
    keywords: [{ term: 'red arrow', zh: '红色箭头信号' }, { term: 'proceed', zh: '继续通行' }],
  },
  'ca-rules-007': {
    question: 'You are preparing to turn left and an oncoming vehicle is approaching. What should you do?',
    choices: ['Turn before the oncoming vehicle reaches you', 'Yield to oncoming traffic that is close enough to be a hazard', 'Stop in the middle of the oncoming lane and wait'],
    explanation: 'A driver turning left must yield to oncoming vehicles that are close enough to create a hazard, as well as to pedestrians when required.',
    keywords: [{ term: 'oncoming traffic', zh: '对向交通' }, { term: 'yield', zh: '让行' }],
  },
  'ca-rules-008': {
    question: 'Who should you yield to before entering a roundabout?',
    choices: ['Traffic already in the roundabout', 'Vehicles waiting to enter the roundabout', 'Vehicles to your right outside the roundabout'],
    explanation: 'Slow down as you approach a roundabout and yield to traffic already circulating in it and to pedestrians when required.',
    keywords: [{ term: 'roundabout', zh: '环岛' }, { term: 'yield', zh: '让行' }],
  },
  'ca-rules-009': {
    question: 'What do double solid yellow lines in the center of a road generally mean?',
    choices: ['You may cross them at any time to pass', 'They separate traffic moving in opposite directions and generally prohibit passing across the lines', 'The road is one-way'],
    explanation: 'Double solid yellow lines separate traffic moving in opposite directions. Crossing them to pass is generally prohibited.',
    keywords: [{ term: 'double solid yellow lines', zh: '双黄实线' }, { term: 'opposite directions', zh: '相反方向' }],
  },
  'ca-rules-010': {
    question: 'When a broken yellow line is on your side of the road, when may you pass?',
    choices: ['At any time', 'When passing is legal and you have enough sight distance and a safe gap in oncoming traffic', 'Only at night'],
    explanation: 'A broken yellow line may allow passing, but you must have sufficient visibility and distance and make sure oncoming traffic is clear.',
    keywords: [{ term: 'broken yellow line', zh: '黄色虚线 / 断续黄线' }, { term: 'sight distance', zh: '可视距离' }],
  },
  'ca-rules-011': {
    question: 'What does a white lane line usually separate?',
    choices: ['Traffic moving in the same direction', 'Traffic moving in opposite directions', 'Railroad tracks from a roadway'],
    explanation: 'White lane lines generally separate lanes of traffic moving in the same direction. Yellow lines generally separate traffic moving in opposite directions.',
    keywords: [{ term: 'lane line', zh: '车道线' }, { term: 'same direction', zh: '同方向' }],
  },
  'ca-rules-012': {
    question: 'Is checking your mirrors enough before changing lanes?',
    choices: ['Yes', 'No. Signal and check your blind spots as well', 'Checking blind spots is necessary only on freeways'],
    explanation: 'A vehicle or motorcycle may be in an area your mirrors do not show. Signal, check your mirrors, and look over your shoulder for vehicles in your blind spot before changing lanes.',
    keywords: [{ term: 'blind spot', zh: '盲区' }, { term: 'change lanes', zh: '变更车道' }],
  },
  'ca-rules-013': {
    question: 'Why should you pay special attention to a bicycle lane before making a right turn at an intersection?',
    choices: ['Bicyclists must always stop', 'A bicyclist may be traveling straight through on your right', 'A bicycle lane is a regular right-turn-only lane'],
    explanation: 'Before turning right, check for bicyclists traveling beside you or approaching from behind and avoid turning across their path when it is unsafe.',
    keywords: [{ term: 'bicycle lane', zh: '自行车道' }, { term: 'intersection', zh: '交叉路口' }],
  },
  'ca-rules-014': {
    question: 'What should you do when a pedestrian using a white cane or guide dog is preparing to cross the street?',
    choices: ['Honk to warn the pedestrian', 'Stop and give the pedestrian the right-of-way', 'Drive quickly in front of the pedestrian'],
    explanation: 'Drivers must use special care around pedestrians who are blind. Stop and yield the right-of-way when required.',
    keywords: [{ term: 'white cane', zh: '白手杖' }, { term: 'guide dog', zh: '导盲犬' }, { term: 'right-of-way', zh: '路权 / 先行权' }],
  },
  'ca-rules-015': {
    question: 'What should you do when driving through a school zone?',
    choices: ['Follow posted signs, reduce speed as required, and watch carefully for children', 'Maintain freeway speed', 'Slow down only when you see a police officer'],
    explanation: 'In a school zone, obey posted speed limits and signs and be prepared for children, pedestrians, school buses, and changing traffic conditions.',
    keywords: [{ term: 'school zone', zh: '学校区域' }, { term: 'posted speed limit', zh: '标示限速' }],
  },
  'ca-rules-016': {
    question: 'What should you do when a school bus is stopped with its red lights flashing for students?',
    choices: ['Stop as required by the applicable California school-bus rules', 'Pass the bus slowly', 'Honk and continue past the bus'],
    explanation: 'Flashing red lights on a stopped school bus warn that students may be getting on or off. Stop when required and remain stopped until it is legal and safe to proceed.',
    keywords: [{ term: 'school bus', zh: '校车' }, { term: 'flashing red lights', zh: '闪烁红灯' }],
  },
  'ca-rules-017': {
    question: 'What should you do when a police car, fire engine, or ambulance approaches from behind using a siren and flashing lights?',
    choices: ['Speed up to get away from it', 'Pull to the right and stop safely to let the emergency vehicle pass', 'Stop in the middle of an intersection'],
    explanation: 'When an emergency vehicle approaches with a siren and flashing lights, safely move to the right side of the road and stop as required so it can pass.',
    keywords: [{ term: 'emergency vehicle', zh: '紧急车辆' }, { term: 'siren', zh: '警笛' }],
  },
  'ca-rules-018': {
    question: 'You are approaching an intersection, but traffic ahead is backed up and you may not be able to clear the intersection. What should you do?',
    choices: ['Enter the intersection and wait', 'Stay behind the limit line until there is enough room to completely cross', 'Honk until the vehicles ahead move'],
    explanation: 'Do not enter an intersection unless there is enough space on the other side for your vehicle. Avoid blocking the intersection.',
    keywords: [{ term: 'limit line', zh: '停止线' }, { term: 'block the intersection', zh: '阻塞路口' }],
  },
  'ca-rules-019': {
    question: 'When parking on a hill, what should you do in addition to setting the parking brake?',
    choices: ['Turn your wheels correctly for the direction of the hill and whether there is a curb', 'Always leave the wheels pointing straight ahead', 'Wheel direction does not matter after the engine is off'],
    explanation: 'When parking on a hill, set the parking brake and position the wheels correctly so the vehicle is less likely to roll into traffic if it moves.',
    keywords: [{ term: 'parking brake', zh: '驻车制动 / 手刹' }, { term: 'curb', zh: '路缘' }],
  },
  'ca-rules-020': {
    question: 'What is the safest way to look around when backing out of a parking space?',
    choices: ['Look only at the backup camera', 'Turn and look behind you while also using your mirrors and camera as aids', 'Look only in the left-side mirror'],
    explanation: 'A backup camera is an aid, not a substitute for looking. Check behind and around the vehicle directly while also using mirrors and the camera when available.',
    keywords: [{ term: 'backing out', zh: '倒车驶出' }, { term: 'backup camera', zh: '倒车影像 / 后视摄像头' }],
  },
}
