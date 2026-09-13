import type { DmvQuestion } from './dmv-data'
import { getQuestionsForState as getBaseQuestionsForState } from './question-bank'
import { newJerseyQuestions } from './new-jersey-questions'

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

// The shared core is intended to contain road-rule/safety/sign knowledge, but NJ gets
// an additional guard so administrative/process/test-format material can never enter
// its practice or mock-test pool even if such a question is added to the shared bank later.
const NJ_NON_EXAM_PATTERNS = [
  /多少道.*题|多少题.*通过|答对多少|通过分|及格分|80%.*通过/,
  /预约|appointment|测试中心|testing center|哪里.*考试|考试地点/,
  /6\s*points|6分身份证明|身份证明|带什么.*证件|需要.*文件|申请材料/,
  /提供.*中文|考试语言|普通话|mandarin|翻译员|interpreter/,
  /失败.*几天|多久.*重考|重新考试|re-?test/,
  /路考.*车辆|road test.*vehicle|路考.*预约|路考.*多久|路考.*失败/,
  /考试.*费用|permit.*费用|license.*费用|手续费/,
  /driver manual.*哪里|手册.*哪里|官方网站|官网|网站.*查询/,
]

function isNewJerseyExamQuestion(question: DmvQuestion) {
  const text = `${question.question} ${question.explanation}`.toLowerCase()
  return !NJ_NON_EXAM_PATTERNS.some((pattern) => pattern.test(text))
}

export function getStateQuestions(stateSlug: string): DmvQuestion[] {
  const shared = getBaseQuestionsForState(stateSlug)
  if (stateSlug !== 'new-jersey') return shared
  const examOnlyShared = shared.filter(isNewJerseyExamQuestion)
  return dedupe([...newJerseyQuestions, ...examOnlyShared])
}

export function getStateQuestionsByCategory(stateSlug: string, category: DmvQuestion['category']) {
  return getStateQuestions(stateSlug).filter((question) => question.category === category)
}

export function getStateQuestionCount(stateSlug: string) {
  return getStateQuestions(stateSlug).length
}
