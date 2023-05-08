import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import tableTrindade from '../utils/tableTrindade'
import Input from './Input'

type Slugs = 'relevance' | 'simplicity' | 'urgency'

export default function Group({
  children,
  title,
  value: defaultValue,
  slug,
}: {
  children: React.ReactNode
  title: string
  value: string
  slug?: Slugs
}) {
  const { updateTask } = useTasks('359051936857588309')
  const { taskSelected } = useTaskStore()
  if (!taskSelected) return null

  const [value, setValue] = useState<string>(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  let formatted = ''

  if (slug === 'urgency') {
    formatted = tableTrindade.urgency[parseInt(value)]
  }
  if (slug === 'simplicity') {
    formatted = tableTrindade.simplicity[parseInt(value)]
  }

  return (
    <div className="border-b border-slate-500">
      <header className="flex gap-3">
        <h2>{title}</h2>
        {formatted && formatted?.length > 0 && (
          <div className="dark:bg-slate-600 px-4">{formatted}</div>
        )}
      </header>
      <div className="flex items-center gap-1 pb-3 pt-2">
        {children}
        <Input
          onValueChange={newValue => {
            updateTask({
              id: taskSelected.id,
              updatedTask: { [slug ? slug : title]: newValue },
            })
            setValue(newValue)
          }}
          value={value}
          className="w-full"
        />
      </div>
    </div>
  )
}
