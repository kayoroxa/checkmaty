import { create } from 'zustand'
import { Task } from '../utils/types/_Task'

interface MyState {
  taskSelected: null | Task
  setTaskSelected: (task: Task) => void
}

export const useTaskStore = create<MyState>()((set, get) => ({
  taskSelected: null,
  setTaskSelected: task => set({ taskSelected: task }),
}))
