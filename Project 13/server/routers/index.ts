import { adminProcedure, t } from '../trpc';
import { userRouter } from './users';

const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return 'Hi';
  }),

  toLogServer: t.procedure
    .input((value) => {
      if (typeof value === 'string') return value;
      throw new Error('Invalid input: Expected string');
    })
    .mutation((opts) => {
      console.log(`Client says: ${opts.input}`);
      return true;
    }),

  secretData: adminProcedure.query(({ ctx }) => {
    console.log(ctx.user);
    return 'Super secret data';
  }),

  users: userRouter, // nested router
});

export const mergedRouter = t.mergeRouters(appRouter, userRouter);
