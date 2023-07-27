import { inferAsyncReturnType } from '@trpc/server';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import prisma from './prisma';

// Initialize a context for the server
export async function createContext(opts: CreateHTTPContextOptions) {
  return { prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
