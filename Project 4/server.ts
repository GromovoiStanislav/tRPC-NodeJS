import express from 'express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

interface ChatMessage {
  user: string;
  message: string;
}

const messages: ChatMessage[] = [
  { user: 'user1', message: 'Hello' },
  { user: 'user2', message: 'Hi' },
];

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return 'Hello world';
  }),

  getMessages: t.procedure.input(z.number().default(10)).query((opts) => {
    const { input } = opts;
    return messages.slice(-input);
  }),

  addMessage: t.procedure
    .input(
      z.object({
        user: z.string().min(3),
        message: z.string().min(3),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      messages.push(input);
      return input;
    }),
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get('/', (req, res) => {
  res.send('Hello from api-server');
});

const port = 3000;
app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
