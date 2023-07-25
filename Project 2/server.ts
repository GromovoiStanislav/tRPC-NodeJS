import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import { db } from './db';
import express from 'express';

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  userList: t.procedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),

  userById: t.procedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const user = await db.user.findById(String(input));
    return user;
  }),

  createUser: t.procedure
    .input(z.object({ name: z.string().min(3) }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.create(input);
      return user;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

const app = express();
app.use(express.json());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
const port = 3000;
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
