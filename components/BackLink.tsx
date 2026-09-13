import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="focus-ring mb-5 inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm font-bold text-slate-600 transition hover:text-slate-950"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {label}
    </Link>
  )
}
