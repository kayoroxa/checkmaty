import { create } from 'zustand'
import { Task } from '../utils/types/_Task'

interface MyState {
  taskSelected: null | Task
  setTaskSelected: (task: Task | null) => void
  taskSelectedHistoric: null | Task[]
  addTaskSelectedHistoric: (task: Task) => void
  resetTaskSelectedHistoric: () => void
  setTaskSelectedHistoric: (callBack: (prev: Task[]) => Task[]) => void
}

export const useTaskStore = create<MyState>()((set, get) => ({
  taskSelected: null,
  setTaskSelected: task => set({ taskSelected: task }),

  taskSelectedHistoric: null,
  addTaskSelectedHistoric: (task: Task) => {
    const taskHistoric = get().taskSelectedHistoric
    if (taskHistoric !== null && Array.isArray(taskHistoric)) {
      const newTaskHistoric = Array.from(new Set([...taskHistoric, task]))

      set({ taskSelectedHistoric: newTaskHistoric })
    } else {
      set({ taskSelectedHistoric: [task] })
    }
  },
  resetTaskSelectedHistoric: () => {
    set({ taskSelectedHistoric: null })
  },
  setTaskSelectedHistoric: (callBack: (prev: Task[]) => Task[]) => {
    const taskHistoric = get().taskSelectedHistoric
    if (taskHistoric !== null && Array.isArray(taskHistoric)) {
      set({ taskSelectedHistoric: callBack(taskHistoric) })
    } else {
      set({ taskSelectedHistoric: [] })
    }
  },
}))
