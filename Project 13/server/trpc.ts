import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';

export const t = initTRPC.context<Context>().create();

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: { id: 1 },
    },
  });
});

export const adminProcedure = t.procedure.use(isAdminMiddleware);
