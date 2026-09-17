type Props = {
  eyebrow: string
  title: string
  description?: string
}

export default function StudyPageHeader({ eyebrow, title, description }: Props) {
  return <div className="mb-6"><p className="text-sm font-bold text-teal-700">{eyebrow}</p><h1 className="mt-2 text-3xl font-black leading-tight text-slate-950">{title}</h1>{description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{description}</p> : null}</div>
}
