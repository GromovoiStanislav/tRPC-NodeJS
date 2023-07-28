import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/routers';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

async function main() {
  const users = await Promise.all([
    client.users.byId.query('1'),
    client.users.byId.query('2'),
  ]);
  console.log(users);

  const newUser = await client.users.create.mutate({ name: 'John', age: 12 });
  console.log(newUser);

  const newUserGot = await client.users.byId.query(newUser.id);
  console.log(newUserGot);
}

main();
