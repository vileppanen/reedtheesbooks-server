import express, { Express } from 'express'
import { initRoutes } from './routes/index.js'

const app: Express = express()
const port: Number = 3001

initRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port.toString()}`)
})
