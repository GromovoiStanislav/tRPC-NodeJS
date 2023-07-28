import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from './server_2';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',

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
  console.log('Hello:', await trpc.hello.query());
  console.log('UserHello:', await trpc.userHello.query());
  console.log('AdminHello:', await trpc.adminHello.query());
}

main().catch(console.error);
