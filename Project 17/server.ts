import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import superjson from 'superjson';
import { z } from 'zod';

export const t = initTRPC.create({
  transformer: superjson, //влияет на процесс отправки данных с сервера на клиент, а не на прием данных с клиента на сервер!!!
});

const appRouter = t.router({
  superjson: t.procedure
    .input(
      z.object({
        data: z.string(),
      })
    )
    .query((opts) => {
      // const decodedData = superjson.parse<{ date: Date,...}>(opts.input.data);
      const decodedData = superjson.parse(opts.input.data);
      console.log(decodedData); // Декодированные данные
      // {
      //   date: 1970-01-01T00:00:00.000Z,
      //   set: Set(5) { 1, 5, 'текст', { a: 1, b: 2 }, { a: 1, b: 2 } },
      //   map: Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }
      // }
      return decodedData;
    }),

  json: t.procedure
    .input(
      z.object({
        data: z.string(),
      })
    )
    .query((opts) => {
      const decodedData = JSON.parse(opts.input.data);
      console.log(decodedData); // Декодированные данные
      // { date: '1970-01-01T00:00:00.000Z', set: {}, map: {} }
      return decodedData;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);
