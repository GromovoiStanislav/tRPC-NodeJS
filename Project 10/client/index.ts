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
  console.log('Create user:', await trpc.user.create.mutate({ name: 'Tom' }));
  console.log('Users:', await trpc.user.list.query());

  console.log(
    'Create post:',
    await trpc.post.create.mutate({ title: 'Title 1' })
  );
  console.log('Posts:', await trpc.post.list.query());
}

main().catch(console.error);
