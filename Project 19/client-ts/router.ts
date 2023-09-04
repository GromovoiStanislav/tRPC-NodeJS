import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export const t = initTRPC.create();

const inputSchemaHello = z.object({
  name: z.string().optional(),
});

const inputSchemaSendMessage = z.object({
  message: z.string(),
});

const appRouter = t.router({
  hello: t.procedure.input(inputSchemaHello).query((opts) => {}),
  send: t.procedure.input(inputSchemaSendMessage).mutation((opts) => {}),
});

export type AppRouter = typeof appRouter;
