import Link from 'next/link'

type FaqItem = { question: string; answer: string }
type Section = { heading: string; paragraphs: string[]; bullets?: string[] }

type Props = {
  title: string
  intro: string
  practiceHref: string
  practiceLabel: string
  sections: Section[]
  faq: FaqItem[]
}

export default function SeoArticleLayout({ title, intro, practiceHref, practiceLabel, sections, faq }: Props) {
  return (
    <article className="bg-white py-6 sm:py-10">
      <div className="page-shell max-w-3xl">
        <header>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{intro}</p>
          <Link
            href={practiceHref}
            className="mt-5 inline-flex min-h-14 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-6 py-3.5 text-lg font-bold text-blue-700 shadow-sm transition hover:bg-blue-100"
          >
            {practiceLabel}
          </Link>
        </header>

        <div className="mt-9 space-y-9">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-black text-slate-950">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-base leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets?.length ? (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-black text-slate-950">常见问题</h2>
          <div className="mt-4 space-y-5">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-bold text-slate-950">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm leading-6 text-slate-500">考试规则、语言和办事要求可能调整，正式考试前请以 New York State DMV 最新公布的信息为准。</p>
          <Link href="/" className="mt-4 inline-flex font-bold text-blue-700 hover:text-blue-800">选择其他州练习 →</Link>
        </footer>
      </div>
    </article>
  )
}
