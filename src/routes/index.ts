import { Express } from 'express'
import { init as booktypesInit } from './booktypes.js'

const ROUTE_BASE_PATH = 'api'

export const initRoutes = (app: Express): void => {
  booktypesInit(app, ROUTE_BASE_PATH)
}
