import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { randomUUID } from 'crypto';

type Post = {
  id: string;
  title: string;
};

const posts: Post[] = [];

export const postRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation((opts) => {
      const { title } = opts.input;
      // [...]
      const newPost: Post = { id: randomUUID(), title };
      posts.push(newPost);
      return newPost;
    }),

  list: publicProcedure.query(() => {
    // ...
    return posts;
  }),
});
