export default function ButtonOp({
  title,
  onClick,
  children,
}: {
  title?: string
  onClick?: () => void
  children?: React.ReactNode
}) {
  return (
    <button
      className="flex gap-3 group hover:cursor-pointer hover:dark:bg-slate-600/80 p-2"
      onClick={onClick}
    >
      {children}
      <h1 className="text-xl group-hover:text-green-400">{title}</h1>
    </button>
  )
}
