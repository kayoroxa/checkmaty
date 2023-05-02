import { ReactNode } from 'react'

export default function Container({
  children,
  title,
  flex,
}: {
  children: ReactNode
  title?: string
  flex?: boolean
}) {
  return (
    <div>
      {/* <div className="flex gap-2">
        {title && <h1 className="text-xl mb-2 ml-2">{title}</h1>}
        <IoMdAddCircleOutline
          size={30}
          className="dark:fill-white hover:fill-green-500 hover:cursor-pointer"
        />
      </div> */}
      <div
        className={`dark:bg-slate-700/40 flex-1 rounded-2xl w-full p-5 max-h-[50vh] flex-wrap flex  gap-6 ${
          flex ? 'flex' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}
