import { MdAddTask } from 'react-icons/md'
export default function ButtonOp({
  title,
  onClick,
}: {
  title?: string
  onClick?: () => void
}) {
  return (
    <button
      className="flex gap-3 group hover:cursor-pointer hover:dark:bg-slate-600/80 p-2"
      onClick={onClick}
    >
      <MdAddTask size={30} className="group-hover:fill-green-400" />
      <h1 className="text-xl group-hover:text-green-400">{title}</h1>
    </button>
  )
}
