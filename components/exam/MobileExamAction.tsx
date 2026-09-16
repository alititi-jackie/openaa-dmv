'use client'

type Props = {
  unansweredCount: number
  onNextUnanswered: () => void
  onSubmit: () => void
}

export default function MobileExamAction({ unansweredCount, onNextUnanswered, onSubmit }: Props) {
  const hasUnanswered = unansweredCount > 0

  return (
    <>
      <div aria-hidden="true" className="h-20 md:hidden" />
      <div className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-4 z-40 flex justify-end md:hidden">
        <button
          type="button"
          onClick={hasUnanswered ? onNextUnanswered : onSubmit}
          className={`focus-ring pointer-events-auto rounded-full px-4 py-3 text-sm font-black text-white shadow-lg ${hasUnanswered ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-700 hover:bg-blue-800'}`}
        >
          {hasUnanswered ? `下一道未答（${unansweredCount}）` : '提交考试'}
        </button>
      </div>
    </>
  )
}
