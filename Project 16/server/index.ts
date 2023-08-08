import 'dotenv/config';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { createContext } from './trpc';
import { appRouter } from './root';

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

const PORT = Number(process.env.PORT);
server.listen(PORT);
