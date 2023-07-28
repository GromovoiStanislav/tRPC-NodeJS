import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { randomUUID } from 'crypto';

type User = {
  id: string;
  name: string;
};

const users: User[] = [];

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation((opts) => {
      const { name } = opts.input;
      // [...]
      const newUser: User = { id: randomUUID(), name };
      users.push(newUser);
      return newUser;
    }),

  list: publicProcedure.query(() => {
    // [..]
    return users;
  }),
});
