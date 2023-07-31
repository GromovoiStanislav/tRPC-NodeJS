import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  // loggerLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import { AppRouter } from '../../server/api';

const wsClient = createWSClient({
  url: `ws://localhost:3000/trpc`,
});

const client = createTRPCProxyClient<AppRouter>({
  links: [
    // loggerLink(),
    splitLink({
      condition: (op) => {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: 'http://localhost:3000/trpc',
        headers: {
          Aurhorization: 'TOKEN',
        },
      }),
    }),
  ],
});

document.addEventListener('click', () => {
  client.updateUser.mutate({ userId: '341', name: 'Kely' });
  // wsClient.close(); //если надо
});

async function main() {
  //console.log(await client.sayHi.query());
  //console.log(await client.toLogServer.mutate('Hello'));
  // console.log(await client.users.getUser.query({ userId: '211' }));
  // console.log(await client.getUser.query({ userId: '148' }));
  //console.log(await client.updateUser.mutate({ userId: '341', name: 'Kely' }));
  //console.log(await client.secretData.query());

  client.users.onUpdate.subscribe(undefined, {
    onData: (id) => console.log('Updated', id),
  });
}

main();
