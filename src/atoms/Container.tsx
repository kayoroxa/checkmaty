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
      {title && <h1 className="text-xl mb-2 ml-2">{title}</h1>}
      <div
        className={`dark:bg-slate-800 flex-1 rounded-2xl w-full p-4 max-h-[50vh] flex-wrap flex  gap-6 ${
          flex ? 'flex' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}
