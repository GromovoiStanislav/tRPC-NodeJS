import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req,
    res,
    isAdmin: Math.random() > 0.5,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
