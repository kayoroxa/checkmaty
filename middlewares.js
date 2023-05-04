module.exports = (req, res, next) => {
  const jsonDb = require('./db.json')
  const entriesQuery = Object.entries(req.query)
  const hasNull = entriesQuery.some(([_, value]) => value === 'null')

  if (hasNull) {
    console.log('is null')
    const path = req.url.split('?')[0].replace('/', '')
    const filteredTasks = jsonDb[path].filter(data => {
      return entriesQuery.every(([q_key, q_value]) => {
        const isToBeNull = q_value === 'null'

        if (isToBeNull) {
          return data[q_key] === undefined || data[q_key] === null
        } else {
          console.log(data[q_key])
          console.log(q_value)
          return String(data[q_key]) === q_value
        }
      })
    })

    res.json(filteredTasks)
  } else {
    next()
  }
  // if (
  //   req.url === '/tasks' &&
  //   req.query.projectId === 'null' &&
  //   !req.query.parentId
  // ) {
  //   // Obtém todas as tarefas

  //   // Filtra as tarefas que não possuem projectId nem parentId
  //   const filteredTasks = tasks.filter(
  //     task => !task.projectId && !task.parentId
  //   )

  //   // Retorna as tarefas filtradas
  //   res.json(filteredTasks)
  // } else {
  //   // Chama o próximo middleware
  //   next()
  // }
}
