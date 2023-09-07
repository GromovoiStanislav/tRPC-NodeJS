import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import appRouter from './router.js';
import createContext from './context.js';
const app = express();
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
