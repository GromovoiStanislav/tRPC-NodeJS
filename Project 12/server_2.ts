// Default meta, chaining, and shallow merging
import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import {
  CreateHTTPContextOptions,
  createHTTPServer,
} from '@trpc/server/adapters/standalone';

interface Meta {
  authRequired: boolean;
  role?: 'user' | 'admin';
}

// Initialize a context for the server
export async function createContext(opts: CreateHTTPContextOptions) {
  console.log(opts.req.headers.authorization);
  // decodeAndVerifyJwtToken...
  const user = { id: 1, name: 'Tomas', role: 'admin' };
  return { user };
}

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    // Set a default value
    defaultMeta: { authRequired: false },
  });

const authMiddleware = t.middleware(async (opts) => {
  const { meta, next, ctx } = opts;
  // only check authorization if enabled
  if (meta?.authRequired && !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  if (
    meta?.authRequired &&
    meta?.role !== ctx.user.role &&
    ctx.user.role !== 'admin'
  ) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next();
});

const publicProcedure = t.procedure;
// ^ Default Meta: { authRequired: false }

const authProcedure = publicProcedure.use(authMiddleware).meta({
  authRequired: true,
  role: 'user',
});
// ^ Meta: { authRequired: true, role: 'user' }

const adminProcedure = authProcedure.meta({
  authRequired: true,
  role: 'admin',
});
// ^ Meta: { authRequired: true, role: 'admin' }

const appRouter = t.router({
  hello: publicProcedure.query(() => {
    return {
      greeting: 'hello world',
    };
  }),

  userHello: authProcedure.query((opts) => {
    return {
      greeting: `hello ${opts.ctx.user.name}`,
    };
  }),

  adminHello: adminProcedure.query((opts) => {
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
