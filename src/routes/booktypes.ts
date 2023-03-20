import { Express, Request, Response } from 'express'
import { queryBookTypes, queryTop10BooksForTypeWithReviews } from '../integration/nyt/booktype-handlers'

export const init = (app: Express, routeBasePath: string): void => {
  app.route(`/${routeBasePath}/booktypes`)
    .get(async (req: Request, res: Response) => {
      handleQuery(async () => queryBookTypes(), req, res)
    })

  app.route(`/${routeBasePath}/booktypes/:code`)
    .get(async (req: Request, res: Response) => {
       handleQuery(async () => queryTop10BooksForTypeWithReviews(req.params.code), req, res)
    })
}

const handleQuery = async (queryFn: Function, req: Request, res: Response) => {
  try {
    const queryResults = await queryFn()
    res.json({
      results: queryResults
    })
  } catch (err: any) {
    console.error(`Handling request failed: ${err.message}`)
    res.status(err?.status ?? 500).send(err.message)
  }
}