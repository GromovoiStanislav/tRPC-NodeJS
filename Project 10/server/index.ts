import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './routers/app';

const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);
