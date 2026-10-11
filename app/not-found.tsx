import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-white py-20">
      <div className="page-shell text-center">
        <h1 className="text-4xl font-black text-slate-950">页面不存在</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">这个 DMV 页面还没有上线，先回到首页选择已支持的州。</p>
        <Link href="/" className="focus-ring mt-6 inline-flex whitespace-nowrap rounded-[9px] border-0 bg-[#2563eb] px-[21px] py-[10px] text-sm font-semibold text-white">
          返回首页
        </Link>
      </div>
    </section>
  )
}
