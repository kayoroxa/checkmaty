import Link from 'next/link'

export default function SideBar() {
  return (
    <div className="flex flex-col gap-2  py-4 min-w-[15vw] text-2xl">
      <Link
        href="/"
        className="dark:bg-blue-900/50 dark:hover:bg-slate-700/80 px-5 py-2"
      >
        dashboard
      </Link>
      <Link href="/" className="dark:hover:bg-slate-700/80 px-5 py-2">
        projects
      </Link>
      <Link href="/" className="dark:hover:bg-slate-700/80 px-5 py-2">
        settings
      </Link>
    </div>
  )
}
