import Link from 'next/link'
import { AlertCircle, BookOpenText } from 'lucide-react'
import { dmvTools, type DmvState } from '@/lib/dmv-data'

export default function ToolGrid({ state, basePath = `/${state.slug}` }: { state: DmvState; basePath?: string }) {
  const showMovedExamReminder = ['california', 'new-jersey', 'pennsylvania', 'massachusetts', 'washington'].includes(state.slug)
  const examRule = state.slug === 'california' ? 'California DMV 当前公布的知识考试通过标准为 80%。' : state.slug === 'pennsylvania' ? 'PennDOT Knowledge Test 共 18 题。' : state.slug === 'massachusetts' ? 'Massachusetts RMV Class D Permit Exam 共 25 题，考试时间 25 分钟。' : state.slug === 'washington' ? 'Washington DOL Driving Knowledge Exam 共 40 题。' : state.examRule
  const passRule = state.slug === 'california' ? '本站 36 题和 46 题模式仅参考历史题量用于练习；正式考试题量、申请类型和考试安排以 California DMV 当日规定为准。' : state.slug === 'pennsylvania' ? '至少答对 15 题通过；本站模拟考试按 18 题 / 15 题及格标准组卷。' : state.slug === 'massachusetts' ? '至少答对 18 题通过；官方考试提供简体中文、繁体中文和 English 等多种语言。' : state.slug === 'washington' ? '至少答对 32 题通过；及格成绩有效 2 年，官方考试支持简体中文、繁体中文和 English 等语言。' : state.passRule

  return (
    <>
      <section className="bg-white py-8">
        <div className="page-shell">
          <div className="mb-4">
            <h2 className="text-2xl font-black text-slate-950">选择学习方式</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dmvTools.map(({ title, description, href, icon: Icon }) => (
              <Link key={href} href={`${basePath}/${href}`} className="card focus-ring p-4 hover:border-blue-300">
                <Icon size={24} className="text-blue-700" />
                <h3 className="mt-3 text-lg font-black text-slate-950">{href === 'questions' ? '完整题库' : title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{href === 'questions' ? '按分类查看全部练习题和答案解析。' : description}</p>
              </Link>
            ))}
            <Link href={`${basePath}/wrong-questions`} className="card focus-ring p-4 hover:border-rose-300">
              <AlertCircle size={24} className="text-rose-700" />
              <h3 className="mt-3 text-lg font-black text-slate-950">错题本</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">自动保存做错的题目，集中复习薄弱点。</p>
            </Link>
            <Link href={`${basePath}/guide`} className="card focus-ring p-4 hover:border-teal-300">
              <BookOpenText size={24} className="text-teal-700" />
              <h3 className="mt-3 text-lg font-black text-slate-950">考试指南</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">查看本州考试规则、学习范围和官方入口。</p>
            </Link>
          </div>
        </div>
      </section>
      {showMovedExamReminder ? <section className="moved-exam-reminder bg-white"><div className="page-shell"><div className="card p-5"><p className="text-sm font-bold text-teal-700">考试提醒</p><p className="mt-2 text-sm leading-6 text-slate-600">{examRule}</p><p className="mt-2 text-sm leading-6 text-slate-600">{passRule}</p></div></div></section> : null}
      {showMovedExamReminder ? <style>{`.moved-exam-reminder + style + section > .page-shell > .card:first-child { display: none; }`}</style> : null}
    </>
  )
}
