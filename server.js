const jsonServer = require('json-server')
require('dotenv').config({ path: './.env.local' })

if (process.env.JSON_DB_PATH) {
  const server = jsonServer.create()
  const router = jsonServer.router(process.env.JSON_DB_PATH)
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(router)
  server.listen(4444, () => {
    console.log('JSON Server is running on port 4444')
  })
}
