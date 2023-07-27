import express, { Request, Response } from 'express';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/app';
import { PORT } from './config';

const app = express();
app.use(express.json());

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001',
    }),
  ],
});

app.post('/notes', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const createdNote = await trpc.note.create.mutate({
      title,
      description,
    });
    res.json(createdNote);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.get('/notes', async (_req: Request, res: Response) => {
  try {
    const notes = await trpc.note.getAll.query();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.get('/notes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await trpc.note.getOne.query(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.put('/notes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await trpc.note.toggleDone.mutate({ id });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.delete('/notes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await trpc.note.delete.mutate({ id });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`);
});
