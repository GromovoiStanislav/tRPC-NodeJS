import {
  createHTTPServer,
} from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { createContext } from './context';
import { TRPCError } from '@trpc/server';

const appRouter = router({
  // open for anyone
  hello: publicProcedure
    .input(z.string().nullish())
    .query((opts) => `hello ${opts.input ?? opts.ctx.user?.name ?? 'world'}`),
  
  // checked in resolver
  secret: publicProcedure.query((opts) => {
    if (!opts.ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return {
      secret: 'sauce',
    };
  }),


});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
});
server.listen(3001);
