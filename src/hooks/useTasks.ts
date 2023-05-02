import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { useTaskStore } from '../store/useTaskStore'
import { axiosApi } from '../utils/axiosApi'
import { Task } from '../utils/types/_Task'

function get(url: string, userId: string, key: string | string[]) {
  return useQuery<Task[]>(
    key,
    async () => {
      const { data } = await axiosApi.get<Task[]>(url)
      return data
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!userId,
    }
  )
}

export const useTasks = (userId: string, options?: Partial<Task>) => {
  const optionsQuery =
    options &&
    Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = optionsQuery
    ? get(`/tasks?${optionsQuery}`, userId, ['tasks', optionsQuery])
    : get(`/tasks`, userId, ['tasks'])

  interface TaskCreate extends Omit<Task, 'id'> {
    id?: number
  }

  const {
    mutate: createTask,
    isLoading: isCreateTaskLoading,
    isError: isCreateTaskError,
    error: createTaskError,
  } = useMutation(
    async (newTask: TaskCreate) => {
      const { data } = await axiosApi.post<Task>('/tasks', newTask)
      return data
    },
    {
      onSuccess: task => {
        const isSubTask =
          typeof task?.parentId === 'string' ||
          typeof task?.parentId === 'number'

        if (isSubTask) {
          queryClient.invalidateQueries(['subTasks', task.parentId])
        } else {
          queryClient.invalidateQueries('tasks')
        }
      },
    }
  )

  async function fetchUpdate(props: {
    id: string
    updatedTask: Partial<Task>
  }) {
    const { id, updatedTask } = props
    const { data } = await axiosApi.patch<Task>(`/tasks/${id}`, updatedTask)
    return data
  }

  const {
    mutate: updateTask,
    isLoading: isUpdateTaskLoading,
    isError: isUpdateTaskError,
    error: updateTaskError,
  } = useMutation(fetchUpdate, {
    onSuccess: task => {
      const isSubTask =
        typeof task?.parentId === 'string' || typeof task?.parentId === 'number'

      if (isSubTask) {
        queryClient.invalidateQueries(['subTasks', task.parentId])
      } else {
        queryClient.invalidateQueries('tasks')
      }
    },
  })

  const {
    mutate: deleteTask,
    isLoading: isDeleteTaskLoading,
    isError: isDeleteTaskError,
    error: deleteTaskError,
  } = useMutation(
    async (taskId: string) => {
      const { data } = await axiosApi.delete(`/tasks/${taskId}`)
      return data
    },
    {
      onSuccess: () => {
        const { setTaskSelected } = useTaskStore()
        debugger
        queryClient.invalidateQueries('tasks')
        queryClient.invalidateQueries('subTasks')
        setTaskSelected(null)
      },
    }
  )

  return {
    tasks,
    isTasksLoading,
    isTasksError,
    tasksError,
    createTask,
    isCreateTaskLoading,
    isCreateTaskError,
    createTaskError,
    updateTask,
    isUpdateTaskLoading,
    isUpdateTaskError,
    updateTaskError,
    deleteTask,
    isDeleteTaskLoading,
    isDeleteTaskError,
    deleteTaskError,
  }
}
