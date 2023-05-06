require('dotenv').config({ path: './.env.local' })
const fs = require('fs')

function makeCopy() {
  const jsonString = fs.readFileSync(process.env.JSON_DB_PATH, 'utf8')

  fs.writeFileSync(
    `${process.env.JSON_DB_PATH.replace('.json', '_copy.json')}`,
    jsonString
  )
}

module.exports = (req, res, next) => {
  const entriesQuery = Object.entries(req.query)
  const hasNull = entriesQuery.some(([_, value]) => value === 'null')

  if (
    req.method === 'DELETE' ||
    req.method === 'PATCH' ||
    req.method === 'PUT'
  ) {
    makeCopy()
  }

  if (hasNull) {
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

    res.json(filteredTasks)
  } else {
    next()
  }
}
