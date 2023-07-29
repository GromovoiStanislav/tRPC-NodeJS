import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../server/api';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

async function main() {
  //console.log(await client.sayHi.query());
  //console.log(await client.toLogServer.mutate('Hello'));

  // console.log(await client.users.getUser.query({ userId: '211' }));
  // console.log(await client.getUser.query({ userId: '148' }));

  console.log(await client.updateUser.mutate({ userId: '341', name: 'Kely' }));

  //console.log(await client.secretData.query());
}

main();
