import { router, mergeRouters } from './trpc.js';
import userRouter from './user/router.js';

const appRouter = router({
  user: userRouter,
});

//const appRouter = mergeRouters(userRouter);

export default appRouter;
