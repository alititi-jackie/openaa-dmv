import type { DmvQuestion } from './dmv-data'

type BilingualQuestion = DmvQuestion & { en: { question: string; choices: string[]; explanation: string } }

export const sharedCoreSupplement: BilingualQuestion[] = [
  {
    id: 'shared-core-089a',
    category: 'safety',
    question: '进入视线受限的弯道前，最安全的做法是什么？',
    choices: ['在进入弯道前适当减速并保持在自己的车道内', '进入弯道后再猛踩刹车', '跨过中心线扩大转弯半径'],
    answerIndex: 0,
    explanation: '弯道会限制视线并改变车辆受力。应在进入弯道前把速度降到可控范围，保持本车道并平稳转向。',
    en: {
      question: 'What is the safest approach before entering a curve with limited visibility?',
      choices: ['Slow to an appropriate speed before the curve and stay in your lane', 'Wait until you are in the curve and then brake hard', 'Cross the center line to make the turn wider'],
      explanation: 'Curves reduce sight distance and change vehicle dynamics. Slow before entering, stay in your lane, and steer smoothly.',
    },
  },
  {
    id: 'shared-core-089b',
    category: 'safety',
    question: '发现动物突然出现在道路附近时，最合适的第一反应是什么？',
    choices: ['减速、保持车辆控制并准备停车', '立即猛打方向盘驶入相邻车道', '加速从动物前方通过'],
    answerIndex: 0,
    explanation: '动物的移动难以预测。应先降低速度并保持车辆稳定，观察周围交通后再采取必要的避让或停车措施。',
    en: {
      question: 'What should your first response be when an animal suddenly appears near the roadway?',
      choices: ['Slow down, maintain control, and be prepared to stop', 'Immediately swerve into the next lane', 'Speed up to pass in front of the animal'],
      explanation: 'Animals can move unpredictably. Reduce speed and maintain control first, then respond to the animal and surrounding traffic as needed.',
    },
  },
]
