import Link from 'next/link'

const PRACTICE_LINKS = [
  { suffix: '', label: '题库首页' },
  { suffix: 'questions', label: '完整题库' },
  { suffix: 'practice', label: '随机 / 顺序练习' },
  { suffix: 'mock-test', label: '模拟考试' },
  { suffix: 'signs', label: '交通标志练习' },
  { suffix: 'wrong-questions', label: '错题本' },
  { suffix: 'guide', label: '考试指南' },
  { suffix: 'dmv-chinese-test', label: '中文题库' },
  { suffix: 'english-practice', label: '英文练习' },
  { suffix: 'bilingual-practice', label: '中英对照' },
  { suffix: 'dmv-practice', label: '在线练习' },
  { suffix: 'dmv-mock-test', label: '中文模拟考试' },
  { suffix: 'written-test', label: '驾照笔试' },
  { suffix: 'permit-test', label: 'Permit Test' },
  { suffix: 'test-rules', label: '考试规则' },
  { suffix: 'road-signs', label: '交通标志' },
  { suffix: 'driver-handbook', label: '驾驶手册' },
] as const

type Props = {
  basePath: string
  current?: string
  embedded?: boolean
}

export default function StatePracticeLinks({ basePath, current, embedded = false }: Props) {
  const links = PRACTICE_LINKS.filter((link) => link.suffix !== current)
  const block = (
    <div className={`card p-5${embedded ? ' mt-8' : ''}`}>
      <h2 className="text-xl font-black text-slate-950">本州其他练习</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.suffix || 'home'}
            href={link.suffix ? `${basePath}/${link.suffix}` : basePath}
            className="focus-ring rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )

  if (embedded) return block

  return (
    <section className="bg-[#f4f7fb] py-10">
      <div className="page-shell">{block}</div>
    </section>
  )
}
