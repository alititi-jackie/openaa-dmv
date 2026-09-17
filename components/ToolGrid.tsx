import Link from 'next/link'
import { AlertCircle, BookOpenText } from 'lucide-react'
import { dmvTools, type DmvState } from '@/lib/dmv-data'

export default function ToolGrid({ state, basePath = `/${state.slug}` }: { state: DmvState; basePath?: string }) {
  return (
    <section className="bg-white py-8">
      <div className="page-shell">
        <div className="mb-4">
          <p className="text-sm font-bold text-teal-700">学习中心</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">选择学习方式</h2>
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
  )
}
