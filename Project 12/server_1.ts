// Example with per route authentication settings
import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import {
  CreateHTTPContextOptions,
  createHTTPServer,
} from '@trpc/server/adapters/standalone';

interface Meta {
  authRequired: boolean;
}

// Initialize a context for the server
export async function createContext(opts: CreateHTTPContextOptions) {
  console.log(opts.req.headers.authorization);
  // decodeAndVerifyJwtToken...
  const user = { id: 1, name: 'Tomas' };
  return { user };
}

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().meta<Meta>().create();

const authMiddleware = t.middleware(async (opts) => {
  const { meta, next, ctx } = opts;
  // only check authorization if enabled
  if (meta?.authRequired && !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

const authProcedure = t.procedure.use(authMiddleware);

const appRouter = t.router({
  hello: authProcedure.meta({ authRequired: false }).query(() => {
    return {
      greeting: 'hello world',
    };
  }),

  protectedHello: authProcedure.meta({ authRequired: true }).query((opts) => {
    return {
      greeting: `hello ${opts.ctx.user.name}`,
    };
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
});
server.listen(3000);
