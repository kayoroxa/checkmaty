import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { useTaskStore } from '../store/useTaskStore'
import { axiosNextApi } from '../utils/axiosApi'
import { Task, TaskCreate } from '../utils/types/_Task'

function get(url: string, user_id: string, key: string | string[]) {
  return useQuery<Task[]>(
    key,
    async () => {
      const { data } = await axiosNextApi.get<Task[]>(url)
      return data
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: !!user_id,
    }
  )
}

export const useTasks = (user_id: string, options?: Partial<Task>) => {
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
    ? get(`/tasks?${optionsQuery}`, user_id, ['tasks', optionsQuery])
    : get(`/tasks`, user_id, ['tasks'])

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
      const { data } = await axiosNextApi.post<Task>('/tasks', newTask)
      return data
    },
    {
      onSuccess: task => {
        const isSubTask = typeof task?.parentId === 'string'
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
    id: Task['id']
    updatedTask: Partial<Task>
  }) {
    const { id, updatedTask } = props
    const { data } = await axiosNextApi.patch<Task>(`/tasks/${id}`, updatedTask)
    return data
  }

  const {
    mutate: updateTask,
    isLoading: isUpdateTaskLoading,
    isError: isUpdateTaskError,
    error: updateTaskError,
  } = useMutation(fetchUpdate, {
    onSuccess: (task, { updatedTask }) => {
      const isSubTask = typeof task?.parentId === 'string'

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
      const { data } = await axiosNextApi.delete(`/tasks/${taskId}`)
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
