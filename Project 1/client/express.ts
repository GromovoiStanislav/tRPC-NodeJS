import express, { Request, Response } from 'express';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const app = express();
app.use(express.json());

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001',
    }),
  ],
});

app.post('/users', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const createdUser = await trpc.userCreate.mutate({ name });
    res.json(createdUser);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await trpc.userList.query();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await trpc.userById.query(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
