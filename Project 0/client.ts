import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// Importing the router type from the server file
import type { AppRouter } from './server';

// Initializing the tRPC client
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001',
    }),
  ],
});

async function main() {
  // Querying the greeting
  const greetingResponse = await trpc.greeting.query({
    name: 'Tom',
  });
  console.log('greetingResponse:', greetingResponse); // Hello, Tom!

  // Querying the hello
  const helloResponse = await trpc.hello.query();
  console.log('helloResponse:', helloResponse); // { message: 'hello world' }

  const goodbyeResponse = await trpc.goodbye.mutate({
    name: 'Tom',
  });
  console.log('goodbyeResponse:', goodbyeResponse); // Goodbye, Tom!
}

main();
