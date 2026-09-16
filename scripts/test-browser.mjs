import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { require } from './register-typescript.mjs'

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100'
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw Error('Run browser tests only against a local test server.')
const { getStateQuestions } = require('../lib/state-question-bank.ts')
const { getNewYorkQuestions } = require('../lib/new-york-bank.ts')
const { getStateExamConfig } = require('../lib/exam/exam-config.ts')
const { buildExam } = require('../lib/exam/exam-engine.ts')
const browser = await chromium.launch({ headless: true, executablePath: process.env.TEST_CHROMIUM_PATH })
const errors = []
let checks = 0
async function check(name, fn) { await fn(); checks++; console.log(`PASS ${name}`) }
function recordErrors(page) { page.on('pageerror', (error) => errors.push(`${page.url()}: ${error.message}`)) }
async function save(page, values) {
  await page.evaluate((entries) => { for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, JSON.stringify(value)) }, values)
}

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  recordErrors(page)
  await page.goto(base)
  await check('homepage light CTA and two separate New York buttons on mobile', async () => {
    await page.getByRole('heading', { name: '选择你的考试州', exact: true }).waitFor()
    assert.ok(await page.locator('a[href="#states"].bg-blue-100').count())
    const result = await page.locator('#states a[href="/ny"]').evaluate((right) => {
      const left = right.previousElementSibling, row = right.parentElement
      return { gap: getComputedStyle(row).gap, columns: getComputedStyle(row).gridTemplateColumns.split(' ').length, rounded: getComputedStyle(right).borderRadius, left: left.textContent, right: right.textContent }
    })
    assert.equal(result.gap, '8px'); assert.equal(result.columns, 2)
    assert.equal(result.left.replace(/\s/g, ''), '进入中文题库')
    assert.match(result.right, /English/)
    assert.notEqual(result.rounded, '0px')
  })

  const states = ['california', 'new-jersey', 'pennsylvania', 'massachusetts', 'washington', 'texas', 'florida']
  for (const slug of states) {
    await check(`${slug}: refresh preserves saved questions, answers and timer start`, async () => {
      const questions = getStateQuestions(slug), config = getStateExamConfig(slug), mode = config.modes[0]
      const exam = buildExam(questions, mode, 17)
      const saved = { version: 1, stateSlug: slug, modeId: mode.id, questionIds: exam.map((q) => q.id), answers: { [exam[0].id]: 0 }, savedAt: Date.now(), startedAt: Date.now() - 90000 }
      await save(page, { [`openaa-dmv:${slug}:exam:resume`]: saved })
      await page.goto(`${base}/${slug}/mock-test`)
      await page.getByRole('button', { name: '继续考试', exact: true }).waitFor()
      let raw = await page.evaluate((key) => localStorage.getItem(key), `openaa-dmv:${slug}:exam:resume`)
      assert.deepEqual(JSON.parse(raw).answers, saved.answers)
      await page.getByRole('button', { name: '继续考试', exact: true }).click()
      await page.locator('[id^="question-"]').first().waitFor()
      assert.equal(await page.locator('[id^="question-"]').count(), mode.size)
      await page.reload()
      await page.getByRole('button', { name: '继续考试', exact: true }).waitFor()
      raw = await page.evaluate((key) => localStorage.getItem(key), `openaa-dmv:${slug}:exam:resume`)
      assert.deepEqual(JSON.parse(raw).questionIds, saved.questionIds)
      assert.deepEqual(JSON.parse(raw).answers, saved.answers)
      assert.equal(JSON.parse(raw).startedAt, saved.startedAt)
    })
  }
  await check('New Jersey: full exam score, 3-question review and readiness use the same record', async () => {
    const questions = getStateQuestions('new-jersey'), config = getStateExamConfig('new-jersey'), mode = config.modes[0]
    const exam = buildExam(questions, mode, 55), wrong = exam.slice(-3)
    const answers = Object.fromEntries(exam.map((q, i) => [q.id, i < 47 ? q.answerIndex : (q.answerIndex + 1) % q.choices.length]))
    await save(page, { 'openaa-dmv:new-jersey:exam:resume': { version: 1, stateSlug: 'new-jersey', modeId: mode.id, questionIds: exam.map((q) => q.id), answers, savedAt: Date.now() } })
    await page.goto(`${base}/new-jersey/mock-test`)
    await page.getByRole('button', { name: '继续考试', exact: true }).click()
    await page.getByRole('button', { name: '提交并查看成绩', exact: true }).click()
    await page.getByRole('heading', { name: '通过 PASS', exact: true }).waitFor()
    assert.equal(await page.evaluate(() => localStorage.getItem('openaa-dmv:new-jersey:exam:last-score')), '94')
    await page.getByRole('button', { name: '重新练习 3 道错题', exact: true }).click()
    for (const q of wrong) await page.locator(`[id="question-${q.id}"] button`).nth(q.answerIndex).click()
    await page.getByRole('button', { name: '提交并查看成绩', exact: true }).click()
    await page.getByRole('heading', { name: '错题复习完成', exact: true }).waitFor()
    assert.equal(await page.getByText('未通过 NOT PASSED', { exact: true }).count(), 0)
    assert.equal(await page.evaluate(() => localStorage.getItem('openaa-dmv:new-jersey:exam:last-score')), '94')
    await page.goto(`${base}/new-jersey/practice`)
    await page.getByText('准备度', { exact: true }).waitFor()
    assert.match(await page.getByText('准备度', { exact: true }).locator('..').innerText(), /38%/)
  })
  await check('Massachusetts timer resets on restart and stops after submission', async () => {
    await page.goto(`${base}/massachusetts/mock-test`)
    await page.getByRole('button', { name: '继续考试', exact: true }).click()
    const old = await page.evaluate(() => JSON.parse(localStorage.getItem('openaa-dmv:massachusetts:exam:resume')).startedAt)
    await page.getByRole('button', { name: '重新组卷', exact: true }).click()
    await page.getByText('25:00', { exact: true }).waitFor()
    const fresh = await page.evaluate(() => JSON.parse(localStorage.getItem('openaa-dmv:massachusetts:exam:resume')))
    assert.ok(fresh.startedAt > old)
    const byId = new Map(getStateQuestions('massachusetts').map((q) => [q.id, q]))
    for (const id of fresh.questionIds) await page.locator(`[id="question-${id}"] button`).nth(byId.get(id).answerIndex).click()
    await page.getByRole('button', { name: '提交并查看成绩', exact: true }).click()
    await page.getByText('考试倒计时（已停止）', { exact: true }).waitFor()
  })
  await check('New York uses only its independent bank and still rejects insufficient sign answers', async () => {
    await page.goto(`${base}/ny/mock-test`)
    await page.locator('[id^="ny-question-"]').first().waitFor()
    const ids = await page.locator('[id^="ny-question-"]').evaluateAll((nodes) => nodes.map((node) => node.id.slice('ny-question-'.length)))
    assert.equal(ids.length, 20)
    const byId = new Map(getNewYorkQuestions().map((q) => [q.id, q]))
    assert.ok(ids.every((id) => byId.has(id)))
    assert.equal(ids.filter((id) => byId.get(id).category === 'signs').length, 4)
    let signs = 0
    for (const id of ids) {
      const q = byId.get(id)
      const answer = q.category === 'signs' && ++signs > 1 ? (q.answerIndex + 1) % q.choices.length : q.answerIndex
      await page.locator(`[id="ny-question-${id}"] button`).nth(answer).click()
    }
    await page.getByRole('button', { name: '提交考试', exact: true }).click()
    await page.getByRole('heading', { name: '未通过 NOT PASSED', exact: true }).waitFor()
    assert.equal(await page.evaluate(() => localStorage.getItem('openaa-dmv:ny:exam:last-score')), '85')
    assert.equal(await page.evaluate(() => localStorage.getItem('openaa-dmv:new-jersey:exam:last-score')), '94')
  })
  await check('corrupt records do not crash practice or questions', async () => {
    await save(page, { 'openaa-dmv:ny:wrong:answered': null, 'openaa-dmv:ny:wrong:favorites': {}, 'openaa-dmv:ny:wrong:correct': 5 })
    await page.goto(`${base}/ny/practice`)
    await page.getByText('准备度', { exact: true }).waitFor()
    await page.goto(`${base}/ny/questions`)
    await page.locator('article').first().waitFor()
  })
  await check('blocked storage shows warning and answering continues', async () => {
    const blocked = await browser.newContext()
    await blocked.addInitScript(() => {
      for (const method of ['getItem', 'setItem', 'removeItem']) Storage.prototype[method] = () => { throw new DOMException('Storage disabled', 'SecurityError') }
    })
    const p = await blocked.newPage(); recordErrors(p)
    await p.goto(`${base}/new-jersey/mock-test`)
    await p.locator('[id^="question-"]').first().waitFor()
    await p.locator('[id^="question-"]').first().locator('button').first().click()
    await p.getByText('已答 1/50 · 未答 49', { exact: true }).waitFor()
    await p.getByText(/浏览器暂时无法保存学习记录/).waitFor()
    await blocked.close()
  })
  await check('all 57 public learning routes load on desktop and mobile without horizontal overflow', async () => {
    const routes = ['/', ...[...states, 'ny'].flatMap((slug) => ['', '/guide', '/questions', '/practice', '/mock-test', '/signs', '/wrong-questions'].map((suffix) => `/${slug}${suffix}`))]
    for (const width of [1280, 390]) {
      // Bounded parallel page reads; each page has isolated local learning records.
      for (let i = 0; i < routes.length; i += 4) {
        await Promise.all(routes.slice(i, i + 4).map(async (route) => {
          const p = await browser.newPage({ viewport: { width, height: 844 } }); recordErrors(p)
          const response = await p.goto(base + route)
          assert.equal(response.status(), 200, `${width} ${route}`)
          await p.waitForLoadState('networkidle')
          assert.ok((await p.locator('main').innerText()).length > 30, route)
          assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `horizontal overflow: ${width} ${route}`)
          await p.close()
        }))
      }
    }
  })
  assert.deepEqual(errors, [], 'browser runtime errors')
  console.log(`\n${checks} browser regression groups passed; no page errors.`)
  await context.close()
} finally { await browser.close() }
