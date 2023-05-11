import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { useTaskStore } from '../store/useTaskStore'
import { axiosApi } from '../utils/axiosApi'
import { Task, TaskCreate } from '../utils/types/_Task'

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
      .map(([key, value]) => {
        // if (value === null) return `${key}_null`
        return `${key}=${value}`
      })
      .join('&')

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = optionsQuery
    ? get(`/tasks?${optionsQuery}`, userId, ['tasks', optionsQuery])
    : get(`/tasks`, userId, ['tasks'])

  const {
    setTaskSelected,
    taskSelected,
    setTaskIdSelected,
    setTaskSelectedHistoric,
  } = useTaskStore()

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
          // queryClient.invalidateQueries('subTasks')
          queryClient.invalidateQueries(['tasks', `parentId=${task.parentId}`])
        } else {
          queryClient.invalidateQueries('tasks')
          queryClient.invalidateQueries(['stepTasks'])
        }
        setTaskSelected(task)
      },
    }
  )

  async function fetchUpdate(props: {
    id: number
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
    onSuccess: (task, { updatedTask }) => {
      const isSubTask =
        typeof task?.parentId === 'string' || typeof task?.parentId === 'number'

      if (isSubTask) {
        if (updatedTask.inMainView === undefined && !task.inMainView) {
          queryClient.invalidateQueries(['tasks', `parentId=${task.parentId}`])
        } else {
          queryClient.invalidateQueries(['tasks', `parentId=${task.parentId}`])
          queryClient.invalidateQueries('tasks')
        }
      } else {
        queryClient.invalidateQueries('tasks')
        queryClient.invalidateQueries(['stepTasks'])
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
        queryClient.invalidateQueries('tasks')
        queryClient.invalidateQueries(['stepTasks'])
        if (!taskSelected?.parentId) {
          setTaskSelected(null)
        } else {
          setTaskIdSelected(taskSelected?.parentId)
          setTaskSelectedHistoric(prev => {
            if (prev.length > 2) {
              return prev.slice(0, prev.length - 1)
            } else {
              return []
            }
          })
        }
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
