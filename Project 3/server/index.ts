import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { publicProcedure, router, protectedProcedure } from './trpc';
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

  // this is accessible only to admins
  secretAdmin: protectedProcedure.query((opts) => {
    return {
      secret: 'admin sauce 1',
    };
  }),

  admin: router({
    // this is accessible only to admins
    secret: protectedProcedure.query((opts) => {
      return {
        secret: 'admin sauce 2',
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
});
server.listen(3001);
