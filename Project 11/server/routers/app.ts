import { router, mergeRouters } from '../trpc';

import { userRouter } from './user';
import { postRouter } from './post';

export const appRouter = mergeRouters(userRouter, postRouter);

// You can then access the merged route with
// http://localhost:3000/trpc/<PROCEDURE>

export type AppRouter = typeof appRouter;
