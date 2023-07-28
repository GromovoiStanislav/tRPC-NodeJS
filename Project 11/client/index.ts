import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../server/routers/app';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

async function main() {
  console.log('Create user:', await trpc.createUser.mutate({ name: 'Tom' }));
  console.log('Users:', await trpc.userList.query());

  console.log(
    'Create post:',
    await trpc.createPost.mutate({ title: 'Title 1' })
  );
  console.log('Posts:', await trpc.postsList.query());
}

main().catch(console.error);
