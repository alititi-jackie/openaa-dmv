import { sharedQuestions, type DmvQuestion } from './dmv-data'

type Seed = [DmvQuestion['category'], string, string, string, string, string, string, string, string]
type BilingualQuestion = DmvQuestion & { en: { question: string; choices: string[]; explanation: string } }

// Cross-state core only: signs, right-of-way principles and safe-driving practices.
// State-specific speeds, distances, ages, penalties, BAC rules and document rules belong in state banks.
const seeds: Seed[] = [
['signs','看到 STOP 标志','完全停车并确认安全后通行','减速直接通过','只在有车时停车','a STOP sign','come to a complete stop and proceed only when safe','slow down and continue','stop only when another vehicle is present'],
['signs','看到 YIELD 标志','减速并准备停车，让有优先权的交通先行','必须每次完全停车','加速抢先通过','a YIELD sign','slow down, be ready to stop, and yield to traffic with the right-of-way','always make a full stop','speed up to enter first'],
['signs','看到 DO NOT ENTER 标志','不要驶入该道路或匝道','确认没车就可以进入','只允许夜间进入','a DO NOT ENTER sign','do not enter that roadway or ramp','enter if no traffic is visible','enter only at night'],
['signs','看到 WRONG WAY 标志','安全停车并纠正行驶方向','继续到下一个路口再处理','加速离开该路段','a WRONG WAY sign','stop safely and correct your direction','continue until the next intersection','speed up to leave the area'],
['signs','看到 NO U-TURN 标志','不要掉头','只要没车就可以掉头','只允许大型车辆掉头','a NO U-TURN sign','do not make a U-turn','make a U-turn if traffic is clear','only large vehicles may make a U-turn'],
['signs','看到 ONE WAY 标志','只按箭头所示方向行驶','可以短距离逆行','只限制卡车','a ONE WAY sign','travel only in the direction shown','drive briefly in the opposite direction','treat it as applying only to trucks'],
['signs','看到 KEEP RIGHT 标志','从障碍物或分隔岛右侧通过','从左侧通过','停车等待','a KEEP RIGHT sign','pass to the right of the obstruction or island','pass on the left','stop and wait'],
['signs','看到黄色菱形警告标志','提前注意前方危险或道路变化','认为它表示服务设施','认为它一定表示停车','a yellow diamond-shaped warning sign','prepare for a hazard or roadway change ahead','treat it as a service sign','assume it always means stop'],
['signs','看到 NO PASSING ZONE 三角旗形标志','不要在该区域超车','只能从右侧超车','必须立即停车','a NO PASSING ZONE pennant sign','do not pass in that zone','pass only on the right','stop immediately'],
['signs','看到 SLIPPERY WHEN WET 标志','湿路时减速并增加跟车距离','下雨时加速通过','只在结冰时减速','a SLIPPERY WHEN WET sign','reduce speed and increase following distance when the road is wet','speed up in rain','slow only when ice is present'],
['signs','看到铁路道口预警标志','减速、观察并准备停车','加速抢先通过','在轨道上停车观察','a railroad crossing warning sign','slow down, look and listen, and be prepared to stop','speed up to beat a train','stop on the tracks to look'],
['signs','看到 SCHOOL 警告标志','减速并特别注意儿童和行人','鸣笛后保持原速','只注意校车','a SCHOOL warning sign','slow down and watch carefully for children and pedestrians','honk and maintain speed','watch only for school buses'],
['signs','看到施工区橙色警告标志','减速并遵守临时交通控制','忽略临时标志按原车道走','加速尽快离开','an orange work-zone warning sign','slow down and follow temporary traffic controls','ignore temporary signs and follow the old lane pattern','speed up to leave quickly'],
['signs','看到红色闪烁信号灯','像 STOP 一样完全停车后再安全通行','只减速','当作绿灯','a flashing red traffic signal','make a complete stop, then proceed when safe','only slow down','treat it as a green light'],
['signs','看到黄色闪烁信号灯','减速并谨慎通过','必须完全停车','加速通过','a flashing yellow traffic signal','slow down and proceed with caution','make a complete stop','speed through'],
['signs','看到稳亮黄灯','准备停车；若已无法安全停车则谨慎通过','立即加速','倒车离开路口','a steady yellow traffic light','prepare to stop; if you cannot stop safely, proceed cautiously','accelerate immediately','back away from the intersection'],
['signs','看到绿色信号灯但路口仍被车辆占用','等待直到有足够空间通过','进入路口等待','鸣笛要求前车让开','a green light while the intersection is blocked','wait until there is enough space to clear the intersection','enter and wait in the intersection','honk until traffic moves'],
['signs','看到白色车道线','理解它通常分隔同方向交通','认为它分隔对向交通','认为它只用于停车区','white lane lines','recognize that they generally separate traffic moving in the same direction','assume they separate opposing traffic','assume they are only for parking areas'],
['signs','看到黄色中心线','理解它通常分隔相反方向交通','认为它分隔同方向车道','认为它表示人行横道','yellow center lines','recognize that they generally separate traffic moving in opposite directions','assume they separate same-direction lanes','assume they mark a crosswalk'],
['signs','看到车道上的转向箭头','按箭头指示的车道用途行驶','可以忽略箭头临时变道','只在夜间遵守','lane-use arrows painted on the road','follow the movement indicated for that lane','ignore the arrows when changing lanes','follow them only at night'],
['rules','到达四向停车路口且你最先到达','完全停车后在安全时先行','等待所有其他车辆先走','不停直接通过','a four-way stop where you arrived first','stop completely and proceed first when safe','wait for every other vehicle to go first','continue without stopping'],
['rules','与另一辆车同时到达无信号路口','注意右侧车辆并按让行规则避免冲突','一定抢先左转','两车同时加速','an uncontrolled intersection at the same time as another vehicle','watch the vehicle to your right and yield as required to avoid conflict','always turn left first','both accelerate together'],
['rules','准备左转穿过对向车流','让对向直行车辆和行人先行','只要打转向灯就有优先权','逼近对向车迫使其减速','a left turn across oncoming traffic','yield to oncoming traffic and pedestrians before turning','assume your turn signal gives you priority','move into the path of oncoming traffic'],
['rules','从私人车道驶入公共道路','让已经在道路上的交通先行','直接驶入因为你在右侧','鸣笛后进入','a driveway entering a public road','yield to traffic already on the road','enter immediately because you are on the right','honk and enter'],
['rules','准备进入环岛','减速并让环岛内车辆先行','在入口处加速抢入','在环岛内停车让入口车辆','a roundabout','slow down and yield to traffic already circulating','accelerate into the circle ahead of traffic','stop inside to let entering traffic go'],
['rules','准备变更车道','观察镜子、打转向灯并检查盲区','只看后视镜','先变道再打灯','a lane change','check mirrors, signal, and check the blind spot before moving','look only in the rearview mirror','change lanes first and signal afterward'],
['rules','发现自己错过高速出口','继续到下一个出口再重新规划','在路肩倒车','突然跨越多条车道','a missed highway exit','continue to the next exit and reroute','back up on the shoulder','cut suddenly across several lanes'],
['rules','从加速车道汇入高速公路','调整到接近主车流速度并寻找安全空隙','在加速车道末端无条件停车','低速直接切入','a freeway acceleration lane','adjust toward traffic speed and merge into a safe gap','always stop at the end of the lane','merge at a much lower speed'],
['rules','准备驶离高速公路','提前进入正确车道并使用减速车道降低速度','在主车道突然急刹','错过出口后倒车','a freeway exit','move into the proper lane early and slow in the deceleration lane','brake hard in the travel lane','back up after missing the exit'],
['rules','前方路口没有足够空间让你的车完全通过','在停止线前等待','进入路口等车流移动','跟紧前车堵住横向交通','an intersection without enough space beyond it','wait before entering until you can clear it','enter and wait in the intersection','follow closely and block cross traffic'],
['rules','准备超越自行车','留出安全侧向空间并确认前方可安全通过','紧贴自行车快速超过','鸣笛迫使骑车人靠边','a bicyclist you plan to pass','leave safe lateral space and pass only when conditions allow','pass very closely and quickly','honk to force the bicyclist aside'],
['rules','看到行人正在人行横道内','减速或停车让其安全通过','从行人前方绕过','鸣笛要求行人停下','a pedestrian in a crosswalk','slow or stop and allow the pedestrian to cross safely','drive around in front of the pedestrian','honk to make the pedestrian stop'],
['rules','遇到使用白手杖或导盲犬的盲人行人','减速、让行并准备停车','鸣笛提醒后继续','快速从其前方通过','a blind pedestrian using a white cane or guide dog','slow down, yield, and be prepared to stop','honk and continue','pass quickly in front'],
['rules','接近停在路边且可能遮挡行人的车辆','减速并警惕车辆前方突然出现行人','贴近停放车辆快速通过','只观察后视镜','a stopped vehicle that may hide pedestrians','slow down and watch for pedestrians emerging from in front of it','pass closely at speed','watch only the rearview mirror'],
['rules','准备倒车离开停车位','观察后方、两侧和盲区，低速倒车','只依赖倒车摄像头','快速倒车减少占道时间','backing out of a parking space','check behind and to both sides, including blind areas, and back slowly','rely only on the backup camera','back quickly to reduce time in the aisle'],
['rules','听到紧急车辆警报并看到其接近','保持冷静并按当地规则安全让出通道','加速跟在它后面','停在路口中央','an approaching emergency vehicle using lights and siren','stay calm and yield a clear path as required','speed up and follow it','stop in the middle of the intersection'],
['rules','铁路轨道另一侧交通拥堵，没有空间容纳你的车','停在轨道前等待','先开上轨道再等','跟紧前车挤过去','a railroad crossing blocked on the far side','wait before the tracks until you can cross completely','drive onto the tracks and wait','follow the vehicle ahead closely'],
['rules','铁路道口闸门正在下降或警示灯闪烁','停车等待，直到信号结束且确认安全','绕过闸门','加速抢在闸门前通过','a railroad gate lowering or warning lights flashing','stop and wait until the warning ends and it is safe','drive around the gate','speed up to beat the gate'],
['rules','施工人员或旗手指示与你预期路线不同','服从现场交通控制人员指示','坚持按原车道走','停下与旗手争论','a work-zone flagger directing traffic differently than expected','follow the flagger\'s traffic-control directions','stay on the old lane pattern','stop to argue with the flagger'],
['rules','交通警察的手势与交通灯不同','服从交通警察的现场指挥','只看交通灯','跟随前车不做判断','a police officer directing traffic differently from the signal','follow the officer\'s directions','obey only the traffic light','copy the vehicle ahead without evaluating'],
['safety','在干燥道路上跟车','保持足够反应和制动空间','紧贴前车防止别人插入','只看前车尾灯','following another vehicle on a dry road','keep enough space to react and stop safely','follow closely to prevent merging','watch only the vehicle\'s taillights'],
['safety','雨天道路湿滑','降低速度并增加跟车距离','保持晴天速度','频繁急刹测试抓地力','driving on a wet road','reduce speed and increase following distance','maintain dry-road speed','brake sharply to test traction'],
['safety','进入浓雾','减速、增加距离并使用合适的近光灯','打开远光灯保持原速','紧跟前车尾灯','driving into dense fog','slow down, increase following distance, and use appropriate low beams','use high beams and maintain speed','follow the vehicle ahead closely'],
['safety','夜间驾驶','降低到能在可见范围内安全停车的速度并保持警觉','因为车少而提高速度','一直盯着对向车灯','driving at night','drive at a speed that lets you stop within the visible area and stay alert','speed up because traffic is lighter','stare at oncoming headlights'],
['safety','太阳眩光影响视线','减速、使用遮阳板并增加空间','闭一只眼继续原速','只靠太阳镜加速通过','strong sun glare','slow down, use the visor, and increase your safety margin','close one eye and maintain speed','rely on sunglasses and speed up'],
['safety','车辆开始在积水上打滑（水滑）','松开油门、保持方向稳定并避免突然制动','猛踩刹车','快速左右转方向盘','a vehicle beginning to hydroplane','ease off the accelerator, keep steering steady, and avoid sudden braking','slam on the brakes','steer rapidly left and right'],
['safety','车辆发生普通轮胎爆裂','握稳方向盘、逐渐松油门并安全减速靠边','立即猛踩刹车','快速转向路肩','a tire blowout','hold the steering wheel firmly, ease off the accelerator, and slow gradually before pulling over safely','slam on the brakes immediately','jerk the vehicle toward the shoulder'],
['safety','刹车踏板突然失去正常制动力','保持冷静，尝试安全减速并寻找安全停车位置','立即关闭点火并锁死方向盘','继续高速行驶等待恢复','a sudden loss of normal braking','stay calm, work to slow the vehicle safely, and look for a safe place to stop','turn off the ignition in a way that locks steering','continue at high speed and wait'],
['safety','车辆开始侧滑','看向希望车辆前往的方向并平稳修正，避免突然操作','猛踩油门','闭眼踩刹车','a vehicle beginning to skid','look where you want to go and make smooth corrections without sudden inputs','accelerate hard','close your eyes and brake hard'],
['safety','感到困倦或注意力难以集中','在安全地点停车休息','开大音乐继续','打开车窗就能完全解决','feeling drowsy or unable to focus','stop in a safe place and rest','turn up the music and keep driving','open a window and assume the problem is solved'],
['safety','手机通知在驾驶中响起','保持注意道路，等安全停车后再处理','低头快速查看','把手机放在方向盘上操作','a phone notification while driving','keep your attention on driving and handle it only after stopping safely','look down for a quick check','use the phone on the steering wheel'],
['safety','情绪非常愤怒时驾驶','主动放慢节奏并避免与其他驾驶人冲突','紧跟让你生气的车辆','用车辆表达不满','driving while very angry','slow your pace and avoid conflicts with other drivers','tailgate the driver who upset you','use your vehicle to express anger'],
['safety','大型卡车在你旁边行驶','避免长时间停留在其盲区','紧贴卡车侧面','假设卡车司机总能看到你','driving beside a large truck','avoid remaining in the truck\'s blind spots','stay close beside the truck','assume the truck driver can always see you'],
['safety','大型卡车准备右转','不要挤进卡车右侧狭窄空间','从卡车右侧抢先通过','贴近卡车转弯','a large truck preparing to turn right','stay out of the narrow space on the truck\'s right side','rush past on the truck\'s right','follow closely through the turn'],
['safety','摩托车在你前方行驶','给它与其他车辆一样充分的车道空间和跟车距离','与摩托车并排共用同一车道','紧跟因为摩托车制动快','a motorcycle ahead','give it full lane space and a safe following distance','share the same lane beside it','follow closely because motorcycles stop quickly'],
['safety','自行车骑手前方有坑洞或停放车辆','预期其可能横向移动并留出空间','鸣笛后贴近通过','加速从其旁边挤过','a bicyclist approaching potholes or parked cars','expect possible lateral movement and leave extra space','honk and pass closely','squeeze by at higher speed'],
['safety','看到儿童在道路附近玩耍','减速并准备随时停车','保持原速只按喇叭','加速离开','children playing near the roadway','slow down and be ready to stop','maintain speed and only honk','speed up to leave the area'],
['safety','前方车辆遮挡了人行横道','减速并确认没有行人后再通过','直接从旁边超越','假设没人因为看不见','a vehicle blocking your view of a crosswalk','slow down and make sure no pedestrian is hidden before proceeding','pass it immediately','assume no one is there because you cannot see anyone'],
['safety','驶近道路施工设备','增加观察距离并预期车道或路面变化','只盯着前车','靠近设备拍照','road construction equipment','increase your visual lead and expect lane or surface changes','watch only the vehicle ahead','drive close to the equipment to look at it'],
['safety','后车紧跟你的车辆','保持稳定，增加前方空间并在安全时让其通过','急刹警告后车','加速与后车竞速','a tailgating driver behind you','stay steady, increase space ahead, and let the driver pass when safe','brake-check the driver','race the driver'],
['safety','准备长途驾驶','提前休息并安排适当休息停靠','依靠能量饮料替代睡眠','连续驾驶直到目的地','a long drive','start rested and plan appropriate breaks','replace sleep with energy drinks','drive continuously until arrival'],
]

const additions: BilingualQuestion[] = seeds.flatMap((seed, index) => {
  const [category, situation, correct, wrong1, wrong2, situationEn, correctEn, wrong1En, wrong2En] = seed
  const n = index + 29
  const explanation = `在这种情况下，核心原则是：${correct}。驾驶时应优先降低冲突风险并保持足够反应空间。`
  const explanationEn = `The core principle here is to ${correctEn}. Safe driving means reducing conflict risk and preserving time and space to react.`
  return [
    { id: `shared-core-${n.toString().padStart(3, '0')}a`, category, question: `${situation}时，最合适的做法是什么？`, choices: [correct, wrong1, wrong2], answerIndex: 0, explanation, en: { question: `When you encounter ${situationEn}, what is the best action?`, choices: [correctEn, wrong1En, wrong2En], explanation: explanationEn } },
    { id: `shared-core-${n.toString().padStart(3, '0')}b`, category, question: `关于“${situation}”，哪一项最符合安全驾驶原则？`, choices: [correct, wrong2, wrong1], answerIndex: 0, explanation, en: { question: `Which choice best follows safe-driving principles when dealing with ${situationEn}?`, choices: [correctEn, wrong2En, wrong1En], explanation: explanationEn } },
  ]
})

export const sharedCoreQuestions: DmvQuestion[] = [...sharedQuestions, ...additions]
