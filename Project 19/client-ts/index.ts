import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from './router';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

async function main() {
  console.log(await trpc.hello.query({}));
  console.log(await trpc.hello.query({ name: 'Tom' }));
}

main().catch(console.error);
