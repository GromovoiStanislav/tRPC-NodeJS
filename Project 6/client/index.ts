import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../server/router';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001',
    }),
  ],
});

async function main() {
  // console.log(
  //   'createUser:',
  //   await trpc.createUser.mutate({ name: 'Tom', email: 'tom@mail.ru' })
  // );
  // console.log(
  //   'createUser:',
  //   await trpc.createUser.mutate({ name: 'Sam', email: 'sam@mail.ru' })
  // );
  console.log('getUsers:', await trpc.getUsers.query());
  console.log('getUser:', await trpc.getUser.query({ name: 'Tom' }));
}

main().catch(console.error);
