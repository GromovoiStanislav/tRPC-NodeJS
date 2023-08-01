import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from './server';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      headers: {
        authorization: '1',
      },
    }),
  ],
});

async function main() {
  await client.getUserById
    .query({ id: 1 })
    .then((user) => console.log('Get user by id:', user));

  await client.createUser
    .mutate({ name: 'Bob' })
    .then((user) => console.log('Created user:', user));

  await client.listUsers
    .query()
    .then((users) => console.log('List of users:', users));
}

main();
