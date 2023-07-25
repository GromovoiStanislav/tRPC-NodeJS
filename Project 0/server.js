const { createHTTPServer } = require('@trpc/server/adapters/standalone');
const { initTRPC } = require('@trpc/server');
const { z } = require('zod');

// Initialize a context for the server
function createContext(opts) {
  return {};
}

// Initialize tRPC
const t = initTRPC.context().create();

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
