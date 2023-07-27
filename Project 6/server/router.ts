import { z } from 'zod';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  getUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const { name } = input;
      const user = await ctx.prisma.user.findFirst({
        where: { name },
        include: { posts: true },
      });
      return user;
    }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      include: { posts: true },
    });
    return users;
  }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email } = input;
      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          posts: {
            create: { title: 'Initial post' },
          },
        },
        include: { posts: true },
      });
      return user;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
