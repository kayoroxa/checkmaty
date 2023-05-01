import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import Input from './Input'

export default function Group({
  children,
  title,
  value,
  slug,
}: {
  children: React.ReactNode
  title: string
  value: string
  slug?: string
}) {
  const { updateTask } = useTasks('359051936857588309')
  const { taskSelected } = useTaskStore()
  if (!taskSelected) return null

  return (
    <div className="border-b border-slate-500">
      <h2>{title}</h2>
      <div className="flex items-center gap-1 pb-3 pt-2">
        {children}
        <Input
          onValueChange={newValue => {
            updateTask({
              id: taskSelected.id,
              updatedTask: { [slug ? slug : title]: newValue },
            })
          }}
          value={value}
          className="w-full"
        />
      </div>
    </div>
  )
}
