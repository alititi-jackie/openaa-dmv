import type { DmvQuestion } from './dmv-data'
import { getQuestionsForState as getBaseQuestionsForState } from './question-bank'
import { newJerseyQuestions } from './new-jersey-questions'
import { newJerseySignQuestions } from './new-jersey-sign-questions'
import { pennsylvaniaQuestions } from './pennsylvania-questions'
import { massachusettsQuestions } from './massachusetts-questions'
import { massachusettsJolQuestions } from './massachusetts-questions-jol'
import { washingtonQuestions } from './washington-questions'
import { texasQuestions } from './texas-questions'

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '')
}

function dedupe(questions: DmvQuestion[]) {
  const ids = new Set<string>()
  const texts = new Set<string>()
  return questions.filter((question) => {
    const text = normalize(question.question)
    if (ids.has(question.id) || texts.has(text)) return false
    ids.add(question.id)
    texts.add(text)
    return true
  })
}

const NON_EXAM_PATTERNS = [
  /多少道.*题|多少题.*通过|答对多少|通过分|及格分|80%.*通过/,
  /预约|appointment|测试中心|testing center|哪里.*考试|考试地点/,
  /身份证明|带什么.*证件|需要.*文件|申请材料/,
  /提供.*中文|考试语言|普通话|mandarin|翻译员|interpreter/,
  /失败.*几天|多久.*重考|重新考试|re-?test/,
  /路考.*车辆|road test.*vehicle|路考.*预约|路考.*多久|路考.*失败/,
  /考试.*费用|permit.*费用|license.*费用|手续费/,
  /driver manual.*哪里|手册.*哪里|官方网站|官网|网站.*查询/,
]

function isExamQuestion(question: DmvQuestion) {
  const text = `${question.question} ${question.explanation}`.toLowerCase()
  return !NON_EXAM_PATTERNS.some((pattern) => pattern.test(text))
}

export function getStateQuestions(stateSlug: string): DmvQuestion[] {
  const shared = getBaseQuestionsForState(stateSlug)
  if (stateSlug === 'new-jersey') return dedupe([...newJerseyQuestions, ...newJerseySignQuestions, ...shared.filter(isExamQuestion)])
  if (stateSlug === 'pennsylvania') return dedupe([...pennsylvaniaQuestions, ...shared.filter(isExamQuestion)])
  if (stateSlug === 'massachusetts') return dedupe([...massachusettsQuestions, ...massachusettsJolQuestions, ...shared.filter(isExamQuestion)])
  if (stateSlug === 'washington') return dedupe([...washingtonQuestions, ...shared.filter(isExamQuestion)])
  if (stateSlug === 'texas') return dedupe([...texasQuestions, ...shared.filter(isExamQuestion)])
  return shared
}

export function getStateQuestionsByCategory(stateSlug: string, category: DmvQuestion['category']) {
  return getStateQuestions(stateSlug).filter((question) => question.category === category)
}

export function getStateQuestionCount(stateSlug: string) {
  return getStateQuestions(stateSlug).length
}
