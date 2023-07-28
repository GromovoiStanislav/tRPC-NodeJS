import { createExpressMiddleware } from "@trpc/server/adapters/express"
import express from "express"
import { appRouter } from "./routers"

const app = express()
app.use(express.json())

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => {
      return {}
    },
  })
)
app.listen(3000)
