import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import express from 'express';
import cors from 'cors';
import { mergedRouter } from './routers';
import { createContext } from './context';
import ws from 'ws';

// export type definition of API
export type AppRouter = typeof mergedRouter;

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));

app.use(
  '/trpc',
  createExpressMiddleware({
    router: mergedRouter,
    createContext,
  })
);

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: mergedRouter,
  createContext,
});
