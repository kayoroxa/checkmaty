export default function SimpleButton({
  // children,
  onClick,
  icon,
  title,
}: {
  title: string
  onClick?: (e: any) => void
  icon: React.ReactNode
}) {
  return (
    <button
      className="flex gap-3 group hover:cursor-pointer hover:dark:bg-slate-600/80 p-2"
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  )
}
