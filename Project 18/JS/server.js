import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { z } from 'zod';

export const t = initTRPC.create();

const inputSchema = z.object({
  message: z.string(),
});

const appRouter = t.router({
  send: t.procedure.input(inputSchema).mutation((opts) => {
    const { message } = opts.input;
    console.log('Message received:', message);
  }),
});



const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);
