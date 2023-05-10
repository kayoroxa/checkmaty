import { useEffect, useState } from 'react'
import tableTrindade from '../utils/tableTrindade'
import Input from './Input'

// type Slugs = 'relevance' | 'simplicity' | 'urgency'

type Data = {
  title?: string
  value: number | string
  label?: string
}

export default function Group({
  children,
  onChange,
  data,
}: {
  children: React.ReactNode
  onChange?: (data: Data) => void
  data: Data
}) {
  const [value, setValue] = useState<string>(String(data.value))

  useEffect(() => {
    setValue(String(data.value))
  }, [data.value])

  let formatted = ''

  if (data.label === 'urgency') {
    formatted = tableTrindade.urgency[parseInt(value)]
  }
  if (data.label === 'simplicity') {
    formatted = tableTrindade.simplicity[parseInt(value)]
  }

  return (
    <div className="border-b border-slate-500">
      <header className="flex gap-3">
        <h2>{data.title}</h2>
        {formatted && formatted?.length > 0 && (
          <div className="dark:bg-slate-600 px-4">{formatted}</div>
        )}
      </header>
      <div className="flex items-center gap-1 pb-3 pt-2">
        {children}
        <Input
          onValueChange={newValue => {
            if (onChange) {
              onChange({
                ...data,
                value: Number(newValue),
              })
            }
            setValue(newValue)
          }}
          value={value}
          className="w-full"
        />
      </div>
    </div>
  )
}
