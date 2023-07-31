import { inferAsyncReturnType } from '@trpc/server';
// import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

// export const createContext = ({ req, res }: CreateExpressContextOptions) => {
//   return {
//     req,
//     res,
//     isAdmin: true, //Math.random() > 0.5,
//   };
// };

export const createContext = () => {
  return {
    isAdmin: true, //Math.random() > 0.5,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
