import { initTRPC } from '@trpc/server';
import { prisma } from './db';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const procedure = t.procedure;

export async function createContext(opts: CreateHTTPContextOptions) {
  return {
    prisma,
  };
}
