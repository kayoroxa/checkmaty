require('dotenv').config({ path: './.env.local' })
const fs = require('fs')

function makeCopy() {
  const jsonString = fs.readFileSync(process.env.JSON_DB_PATH, 'utf8')

  fs.writeFileSync(
    `${process.env.JSON_DB_PATH.replace('.json', '_copy.json')}`,
    jsonString
  )
}

function getNull(req, res) {
  const jsonDb = JSON.parse(fs.readFileSync(process.env.JSON_DB_PATH, 'utf8'))
  const path = req.url.split('?')[0].replace('/', '')
  const filteredTasks = jsonDb[path].filter(data => {
    return entriesQuery.every(([q_key, q_value]) => {
      const isToBeNull = q_value === 'null'

      if (isToBeNull) {
        return data[q_key] === undefined || data[q_key] === null
      } else {
        return String(data[q_key]) === q_value
      }
    })
  })

  return filteredTasks
}

function getStepTasks() {
  const jsonDb = JSON.parse(fs.readFileSync(process.env.JSON_DB_PATH, 'utf8'))

  const foldersDashBoard = jsonDb.folders.filter(folder => {
    return folder.tasksInMainView === true
  })

  const allTasksWithExtendFolder = []

  foldersDashBoard.forEach(folder => {
    const nextTask = jsonDb.tasks
      .filter(task => task?.folder_id === folder.id && !task?.done)
      ?.sort((a, b) => {
        return a.order - b.order
      })?.[0]

    const doneTasks = jsonDb.tasks
      .filter(task => task?.folder_id === folder.id && task?.done)
      .map(task => ({
        ...task,
        folder: folder,
      }))

    allTasksWithExtendFolder.push({
      ...nextTask,
      folder: folder,
    })

    allTasksWithExtendFolder.push(...doneTasks)
  })

  return allTasksWithExtendFolder
}

module.exports = (req, res, next) => {
  const entriesQuery = Object.entries(req.query)
  const hasNull = entriesQuery.some(([_, value]) => value === 'null')
  const stepTasks = req.url === '/steptasks?dashboard=true'

  if (
    req.method === 'DELETE' ||
    req.method === 'PATCH' ||
    req.method === 'PUT'
  ) {
    makeCopy()
  }

  if (stepTasks) {
    const filteredTasks = getStepTasks(req, res)
    res.json(filteredTasks)
    return
  }

  if (hasNull) {
    const response = getNull(req, res)
    res.json(response)
    return
  } else {
    next()
  }
}
