import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { AppRouter } from './server';

const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson, //влияет на процесс приема данных, то есть на авто десериализацию данных, полученных с сервера!!!
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

async function main() {
  const mySet = new Set();

  mySet.add(1);
  mySet.add(5);
  mySet.add(5);
  mySet.add('текст');
  mySet.add({ a: 1, b: 2 });
  mySet.add({ a: 1, b: 2 });

  const myMap = new Map();
  myMap.set('a', 1);
  myMap.set('b', 2);
  myMap.set('c', 3);

  const myData = {
    date: new Date(0),
    set: mySet,
    map: myMap,
  };

  let jsonString = superjson.stringify(myData);
  console.log(await trpc.superjson.query({ data: jsonString }));
  // {
  //   date: 1970-01-01T00:00:00.000Z,
  //   set: Set(5) { 1, 5, 'текст', { a: 1, b: 2 }, { a: 1, b: 2 } },
  //   map: Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }
  // }

  jsonString = JSON.stringify(myData);
  console.log(await trpc.json.query({ data: jsonString }));
  // { date: '1970-01-01T00:00:00.000Z', set: {}, map: {} }
}

main().catch(console.error);
