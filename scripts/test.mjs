import assert from 'node:assert/strict'
import { require } from './register-typescript.mjs'

const { getStateQuestions } = require('../lib/state-question-bank.ts')
const { getNewYorkQuestions } = require('../lib/new-york-bank.ts')
const { getEnglishContent } = require('../lib/dmv-language.ts')
const { getStateExamConfig } = require('../lib/exam/exam-config.ts')
const { buildExam, examPassed } = require('../lib/exam/exam-engine.ts')
const { examStorageKeys } = require('../lib/exam/exam-storage.ts')
const { buildNyExam, nyExamPassed } = require('../lib/exam/new-york-engine.ts')
const { browserStorage, readIds, writeIds, readLastExamScore } = require('../lib/browser-storage.ts')
const { renderToStaticMarkup } = require('react-dom/server')
const React = require('react')
const JsonLd = require('../components/JsonLd.tsx').default
const ExamProgressCard = require('../components/exam/ExamProgressCard.tsx').default
const MobileExamAction = require('../components/exam/MobileExamAction.tsx').default
const ExamResultCard = require('../components/exam/ExamResultCard.tsx').default

let checks = 0
function check(name, fn) { fn(); checks++; console.log(`PASS ${name}`) }
const counts = { california: 263, 'new-jersey': 188, pennsylvania: 187, massachusetts: 195, washington: 190, texas: 180, florida: 197 }
for (const [slug, count] of Object.entries(counts)) {
  check(`${slug}: unchanged bank, IDs, answers and bilingual structure`, () => {
    const questions = getStateQuestions(slug)
    assert.equal(questions.length, count)
    assert.equal(new Set(questions.map((q) => q.id)).size, count)
    for (const q of questions) {
      assert.ok(Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < q.choices.length)
      assert.equal(getEnglishContent(q)?.choices.length, q.choices.length)
    }
  })
  check(`${slug}: all modes produce full unique exams with correct scoring`, () => {
    const questions = getStateQuestions(slug), config = getStateExamConfig(slug)
    for (const mode of config.modes) {
      const exam = buildExam(questions, mode, 123)
      assert.equal(exam.length, mode.size)
      assert.equal(new Set(exam.map((q) => q.id)).size, mode.size)
      assert.notDeepEqual(exam.map((q) => q.id), buildExam(questions, mode, 456).map((q) => q.id))
      assert.ok(examPassed(mode.size, mode.size, mode))
      assert.equal(examPassed(0, mode.size, mode), false)
    }
  })
}
check('New York remains independent: 150 questions, 20 per exam, exactly 4 signs, dual pass conditions', () => {
  const questions = getNewYorkQuestions()
  assert.equal(questions.length, 150)
  assert.ok(questions.every((q) => !q.id.startsWith('shared-core-')))
  for (const seed of [1, 20, 300, 4000]) {
    const exam = buildNyExam(questions, seed)
    assert.equal(exam.length, 20)
    assert.equal(exam.filter((q) => q.category === 'signs').length, 4)
    assert.equal(new Set(exam.map((q) => q.id)).size, 20)
  }
  assert.ok(nyExamPassed(14, 2))
  assert.equal(nyExamPassed(18, 1), false)
  assert.equal(nyExamPassed(13, 4), false)
})

const values = new Map()
globalThis.window = { localStorage: {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
  removeItem: (key) => values.delete(key),
} }
check('legacy score compatibility and isolation by state', () => {
  values.set('openaa-dmv:ny:last-score', '90')
  values.set('openaa-dmv:texas:wrong:last-mock-score', '70')
  assert.equal(readLastExamScore('ny'), 90)
  assert.equal(readLastExamScore('texas'), 70)
  assert.equal(readLastExamScore('california'), 0)
  browserStorage.setItem(examStorageKeys('ny').lastScore, '85')
  assert.equal(readLastExamScore('ny'), 85)
  assert.equal(values.get('openaa-dmv:ny:last-score'), '90')
})
check('malformed local data is safe and IDs are validated', () => {
  for (const value of ['null', '{}', '42', '{bad']) { values.set('ids', value); assert.deepEqual(readIds('ids'), []) }
  values.set('ids', '["one",2,"one","two"]')
  assert.deepEqual(readIds('ids'), ['one', 'two'])
})
check('blocked storage preserves session data without throwing', () => {
  window.localStorage = { getItem() { throw Error('blocked') }, setItem() { throw Error('quota') }, removeItem() { throw Error('blocked') } }
  writeIds('openaa-dmv:ny:wrong', ['ny-1', 'ny-1'])
  assert.deepEqual(readIds('openaa-dmv:ny:wrong'), ['ny-1'])
  assert.deepEqual(readIds('openaa-dmv:texas:wrong'), [])
  browserStorage.removeItem('openaa-dmv:ny:wrong')
  assert.deepEqual(readIds('openaa-dmv:ny:wrong'), [])
})
check('shared exam progress and mobile action render the expected controls', () => {
  const questions = getStateQuestions('new-jersey').slice(0, 3)
  const progress = renderToStaticMarkup(React.createElement(ExamProgressCard, {
    questions,
    answers: { [questions[0].id]: 0 },
    submitted: false,
    cardOpen: true,
    onToggleCard() {},
    onJump() {},
    onNextUnanswered() {},
  }))
  assert.ok(progress.includes('答题进度 1/3'))
  assert.ok(progress.includes('下一道未答'))
  assert.ok(progress.includes('前往第 3 题'))
  const nextAction = renderToStaticMarkup(React.createElement(MobileExamAction, { unansweredCount: 2, onNextUnanswered() {}, onSubmit() {} }))
  const submitAction = renderToStaticMarkup(React.createElement(MobileExamAction, { unansweredCount: 0, onNextUnanswered() {}, onSubmit() {} }))
  assert.ok(nextAction.includes('fixed') && nextAction.includes('md:hidden') && nextAction.includes('下一道未答（2）'))
  assert.ok(submitAction.includes('提交考试'))
})
check('shared exam result supports standard and New York dual requirements', () => {
  const result = renderToStaticMarkup(React.createElement(ExamResultCard, {
    passed: false,
    review: false,
    correct: 18,
    total: 20,
    score: 90,
    requirements: [
      { label: '总题要求', value: '18/20 · 要求至少 14', met: true },
      { label: '交通标志要求', value: '1/4 · 要求至少 2', met: false },
    ],
    categories: [{ label: '交通标志', correct: 1, total: 4, score: 25 }],
    wrongCount: 2,
    onRestart() {},
    onReviewWrong() {},
  }))
  assert.ok(result.includes('未通过 NOT PASSED'))
  assert.ok(result.includes('总题要求') && result.includes('交通标志要求'))
  assert.ok(result.includes('重新练习 2 道错题'))
})
check('JSON-LD cannot close its script element', () => {
  const html = renderToStaticMarkup(React.createElement(JsonLd, { data: { text: '</script><script>alert(1)</script>' } }))
  assert.equal((html.match(/<script/g) || []).length, 1)
  assert.ok(html.includes('\\u003c/script>'))
})
console.log(`\n${checks} regression checks passed.`)
