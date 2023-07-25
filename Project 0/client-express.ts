import express, { Request, Response } from 'express';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

// Importing the router type from the server file
import { AppRouter } from './server';

// Creating an Express app
const app = express();
app.use(express.json());

// Initializing the tRPC client
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001',
    }),
  ],
});

app.get('/greeting/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const greetingResponse = await trpc.greeting.query({ name });
    res.json(greetingResponse);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.get('/hello', async (_req: Request, res: Response) => {
  try {
    const helloResponse = await trpc.hello.query();
    res.json(helloResponse);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.post('/goodbye', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const goodbyeResponse = await trpc.goodbye.mutate({ name });
    res.json(goodbyeResponse);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
