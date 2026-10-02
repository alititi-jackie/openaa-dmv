'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type GuideLink = {
  label: string
  href: string
}

type GuideState = {
  name: string
  englishName: string
  links: GuideLink[]
}

export default function SeoGuideAccordion({ states }: { states: GuideState[] }) {
  const [openState, setOpenState] = useState<string | null>(null)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {states.map((state) => {
        const isOpen = openState === state.englishName

        return (
          <section key={state.englishName} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setOpenState(isOpen ? null : state.englishName)}
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-slate-50"
              aria-expanded={isOpen}
              aria-controls={`guide-${state.englishName.toLowerCase().replaceAll(' ', '-')}`}
            >
              <span>
                <span className="block text-xl font-black text-slate-950">{state.name}</span>
                <span className="mt-1 block text-sm font-medium text-slate-500">{state.englishName}</span>
              </span>
              <ChevronDown
                size={22}
                className={`shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              id={`guide-${state.englishName.toLowerCase().replaceAll(' ', '-')}`}
              className={`${isOpen ? 'block' : 'hidden'} border-t border-slate-100 px-4 py-3 sm:px-5`}
              aria-hidden={!isOpen}
            >
              <div className="divide-y divide-slate-100">
                {state.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    tabIndex={isOpen ? 0 : -1}
                    className="focus-ring flex min-h-12 items-center justify-between gap-3 py-3 text-[15px] font-bold text-slate-700 transition hover:text-blue-700"
                  >
                    <span>{link.label}</span>
                    <span className="text-slate-300">›</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
