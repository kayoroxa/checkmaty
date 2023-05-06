import { Task } from './types/_Task'

interface Metric {
  relevance: number
  simplicity: number
  urgency: number
}

const tableScore: Metric = {
  simplicity: 0.6,
  relevance: 0.3,
  urgency: 0.8,
}

export function getScore(p: Metric) {
  const score = Object.entries(p).map(([key, value]) => {
    return tableScore[key as keyof typeof tableScore] * value
  })
  return score.reduce((a, b) => a + b)
}

export function sortScoredTasks(tasks: Task[]) {
  return tasks.sort((a, b) => {
    const scoreA = getScore({
      relevance: a.relevance || 0,
      simplicity: a.simplicity || 0,
      urgency: a.urgency || 0,
    })
    const scoreB = getScore({
      relevance: b.relevance || 0,
      simplicity: b.simplicity || 0,
      urgency: b.urgency || 0,
    })

    return scoreB - scoreA
  })
}
