import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/app';
import { Note } from './types';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

async function main() {
  const createdNote = (await trpc.note.create.mutate({
    title: 'sachinraja',
    description: 'description',
  })) as Note;
  console.log('Created note:', createdNote);

  await trpc.note.toggleDone.mutate({
    id: createdNote._id,
  });

  const note = await trpc.note.getOne.query(createdNote._id);
  console.log('note:', note);

  const notes = await trpc.note.getAll.query();
  console.log('notes:', notes);

  await trpc.note.delete.mutate({
    id: createdNote._id,
  });
}

main().catch(console.error);
