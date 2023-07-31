import { t } from '../trpc';
import { z } from 'zod';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'node:stream';

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));
const eventEmitter = new EventEmitter();

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
      // console.log(opts.ctx.isAdmin);
      //console.log(opts.ctx.req.headers);
      console.log(opts.ctx);
      eventEmitter.emit('update', opts.input.userId);
      return { id: opts.input.userId, name: opts.input.name, password: '123' };
    }),

  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on('update', emit.next);
      return () => {
        eventEmitter.off('update', emit.next);
      };
    });
  }),
});
