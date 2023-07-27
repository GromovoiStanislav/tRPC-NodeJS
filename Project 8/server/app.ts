import { notesRouter } from './routes/notes';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { router, createContext, mergeRouters } from './trpc';

// Merging Routers:
// const appRouter = mergeRouters(notesRouter); // http://localhost:3001/trpc/<PROCEDURE>

const appRouter = router({
  note: notesRouter,
}); // http://localhost:3001/trpc/<NAMESPACE>.<PROCEDURE>

// Create HTTP server
export const { listen } = createHTTPServer({
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;
