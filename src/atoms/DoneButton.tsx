import { MdDone } from 'react-icons/md'

export default function DoneButton({
  done,
  onClick,
}: {
  done: boolean
  onClick?: (e: any) => void
}) {
  return (
    <button
      className={`hover:border-4 -ml-[34px] w-[40px] h-[40px]  rounded-full mr-4 mt-0 ${
        done ? 'bg-gray-400' : 'border-2 border-gray-400 dark:bg-slate-700/80'
      } hover:border-gray-300  transition-colors duration-200 flex items-center justify-center`}
      onClick={e => onClick && onClick(e)}
    >
      {done && <MdDone size={13} color="white" />}
    </button>
  )
}
