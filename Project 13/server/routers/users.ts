import { t } from '../trpc';
import { z } from 'zod';

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));

export const userRouter = t.router({
  getUser: userProcedure
    .output(z.object({ id: z.string(), name: z.string() }))
    .query(({ input }) => {
      return { id: input.userId, name: 'Tom' };
    }),

  updateUser: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ id: z.string(), name: z.string() }))
    .mutation((opts) => {
      console.log(opts.ctx.isAdmin);
      console.log(opts.ctx.req.headers);
      return { id: opts.input.userId, name: opts.input.name, password: '123' };
    }),
});
