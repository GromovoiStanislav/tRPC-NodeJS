import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from './router';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

console.log('[x] To exit press CTRL+C or type "exit"');

process.stdin.on('data', (chunk) => {
  const str = chunk.toString().trim();
  if (str === 'exit') {
    process.exit(0);
  }
  trpc.send.mutate({ message: str });
});
