import { Task } from './types/_Task'

export function calcDoneDayScore(
  tasks?: Task[],
  query?: 'relevance' | 'simplicity' | 'urgency'
) {
  if (!tasks || tasks.length === 0 || !query) return 0

  return tasks.reduce((a, task: Task) => {
    let num = 0

    if (query !== 'simplicity' && task.folder?.[query] !== undefined) {
      num = Number(task.folder?.[query]) || 0
    } else if (task[query] !== undefined) {
      num = Number(task[query]) || 0
    }

    return a + num
  }, 0)
}

export function mainCalcDoneDayScore(tasks: Task[]) {
  const relevance = calcDoneDayScore(tasks, 'relevance')
  const simplicity = calcDoneDayScore(tasks, 'simplicity') * 0.4
  const urgency = calcDoneDayScore(tasks, 'urgency')

  return {
    score: relevance + urgency + simplicity,
    relevance,
    simplicity,
    urgency,
  }
}
