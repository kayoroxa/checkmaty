import LinkRaw from 'next/link'
import { useRouter } from 'next/router'

function Link({ title, url }: { title: string; url: string }) {
  const { pathname } = useRouter()

  return (
    <LinkRaw
      href={url}
      className={`
  ${pathname === url ? 'bg-blue-500' : 'dark:hover:bg-slate-700/80'}
  px-5
  py-2
  `}
    >
      {title}
    </LinkRaw>
  )
}

export default function SideBar() {
  return (
    <div className="flex flex-col gap-2  py-4 min-w-[15vw] text-2xl">
      <Link title="Dashboard" url="/" />
      <Link title="Inbox" url="/inbox" />
      <Link title="Settings" url="/settings" />
      <Link title="Note" url="/note" />
    </div>
  )
}
