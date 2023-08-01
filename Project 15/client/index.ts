import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../server';

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
  {
    const user = await client.user.getUserById.query(
      '56a1562b-a1ff-4a49-81d1-f22011295a2c'
    );
    console.log('Get user by id:', user);
  }
  {
    const user = await client.user.createUser.mutate({ name: 'Bob' });
    console.log('Created user:', user);
  }
  {
    const users = await client.user.getUsers.query();
    console.log('List of users:', users);
  }
}

main();
