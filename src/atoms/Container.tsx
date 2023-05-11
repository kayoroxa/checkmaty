import { ReactNode, useEffect, useState } from 'react'

export default function Container({
  children,
  title,
  grid,
  onSliceChange,
  showSlice = false,
}: {
  children: ReactNode
  title?: string
  grid?: boolean
  slice?: number
  showSlice?: boolean
  onSliceChange?: (newSlice: number) => void
}) {
  const [slice, setSlice] = useState(9)

  function getClass(wantSlice: number) {
    const isEqual = slice === wantSlice

    return `
      ${
        isEqual
          ? 'bg-slate-500/80 cursor-default'
          : 'bg-slate-600/40 hover:bg-slate-500'
      }
      px-4 rounded-lg shadow-md h-fit
    `
  }

  useEffect(() => {
    if (onSliceChange) {
      onSliceChange(slice)
    }
  }, [slice])

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex gap-4">
          {title && <h1 className="text-xl mb-2 ml-2 ">{title}</h1>}
          {showSlice && (
            <>
              <button className={getClass(6)} onClick={() => setSlice(6)}>
                6
              </button>
              <button className={getClass(9)} onClick={() => setSlice(9)}>
                9
              </button>
              <button className={getClass(12)} onClick={() => setSlice(12)}>
                12
              </button>
              <button className={getClass(30)} onClick={() => setSlice(30)}>
                30
              </button>
            </>
          )}
        </div>
        {/* <IoMdAddCircleOutline
          size={30}
          className="dark:fill-white hover:fill-green-500 hover:cursor-pointer"
        /> */}
      </div>
      <div
        className={`dark:bg-slate-700/40 flex-1 rounded-2xl w-full p-5 flex-wrap gap-6 ${
          grid === true ? 'grid grid-cols-3' : 'flex'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
