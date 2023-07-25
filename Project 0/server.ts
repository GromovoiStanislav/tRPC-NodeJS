import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import {
  CreateHTTPContextOptions,
  createHTTPServer,
} from '@trpc/server/adapters/standalone';
import { z } from 'zod';

// Initialize a context for the server
function createContext(opts: CreateHTTPContextOptions) {
  return {};
}

// Get the context type
type Context = inferAsyncReturnType<typeof createContext>;

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Create main router
const appRouter = t.router({
  // Queries are the best place to fetch data
  greeting: t.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => `Hello, ${input.name}!`),

  // Queries are the best place to fetch data
  hello: t.procedure.query(() => {
    return {
      message: 'hello world',
    };
  }),

  // Mutations are the best place to do things like updating a database
  goodbye: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return `Goodbye, ${input.name}!`;
    }),
});

// Export the app router type to be imported on the client side
export type AppRouter = typeof appRouter;

// Create HTTP server
const { listen } = createHTTPServer({
  router: appRouter,
  createContext,
});

// Listen on port 3001
listen(3001);

async function main() {
  const caller = appRouter.createCaller({});
  console.log(await caller.greeting({ name: 'tRPC' }));
  console.log(await caller.hello());
  console.log(await caller.goodbye({ name: 'tRPC' }));
}

main();
