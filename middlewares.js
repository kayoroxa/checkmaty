module.exports = (req, res, next) => {
  const jsonDb = require('./db.json')
  const entriesQuery = Object.entries(req.query)
  const hasNull = entriesQuery.some(([_, value]) => value === 'null')

  if (hasNull) {
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
}
