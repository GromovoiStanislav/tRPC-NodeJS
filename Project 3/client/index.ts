import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001',

      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: 'Bearer JWT',
        };
      },
    }),
  ],
});

async function main() {
  console.log(await trpc.hello.query('Sam'));
  console.log(await trpc.hello.query());
  console.log(await trpc.secret.query());
}

main().catch(console.error);
