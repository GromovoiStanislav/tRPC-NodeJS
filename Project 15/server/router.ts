import { router } from './trpc';
import userRouter from './user/router';

const appRouter = router({
  user: userRouter,
});

export default appRouter;
