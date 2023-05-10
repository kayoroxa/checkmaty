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

interface Sortable {
  relevance?: number
  simplicity?: number
  urgency?: number
}

export function sortScoredTasks(tasks: Task[]) {
  const sorted = tasks.sort((a, b) => {
    const scoreA = getScore({
      relevance: Number(a.folder?.relevance || a.relevance || 0),
      simplicity: a.simplicity || 0,
      urgency: Number(a.folder?.urgency || a.urgency || 0),
    })
    const scoreB = getScore({
      relevance: Number(b.folder?.relevance || b.relevance || 0),
      simplicity: b.simplicity || 0,
      urgency: Number(b.folder?.urgency || b.urgency || 0),
    })
    return scoreB - scoreA
  })

  return sorted
}
