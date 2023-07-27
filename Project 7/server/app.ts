import express from 'express';
import { notesRouter } from './routes/notes';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router, createContext, mergeRouters } from './trpc';

const app = express();

// Merging Routers:
// const appRouter = mergeRouters(notesRouter); // http://localhost:3000/trpc/<PROCEDURE>

const appRouter = router({
  note: notesRouter,
}); // http://localhost:3000/trpc/<NAMESPACE>.<PROCEDURE>

app.use(express.json());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export type AppRouter = typeof appRouter;

export default app;
