import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-white py-20">
      <div className="page-shell text-center">
        <h1 className="text-4xl font-black text-slate-950">页面不存在</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">这个 DMV 页面还没有上线，先回到首页选择已支持的州。</p>
        <Link href="/" className="focus-ring mt-6 inline-flex rounded-md bg-blue-700 px-5 py-3 text-sm font-black text-white">
          返回首页
        </Link>
      </div>
    </section>
  )
}
