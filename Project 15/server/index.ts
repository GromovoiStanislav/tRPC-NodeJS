import express from 'express';
//import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express';
import appRouter from './router';
import createContext from './context';

const app = express();
//app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export type AppRouter = typeof appRouter;
