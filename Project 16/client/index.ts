import 'dotenv/config';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/root';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://${process.env.HOSTNAME}:${process.env.PORT}`,
    }),
  ],
});

async function main() {
  const newTodo1 = await trpc.todo.addTodo.mutate({
    name: 'Todo 1',
    priority: 'high',
  });
  console.log('todo.addTodo:', newTodo1);
  console.log(
    'todo.getTodo:',
    await trpc.todo.getTodo.query({ id: newTodo1.id })
  );

  const newTodo2 = await trpc.todo.addTodo.mutate({
    name: 'Todo 1',
    priority: 'high',
  });
  console.log('todo.addTodo:', newTodo2);
  console.log(
    'todo.getTodo:',
    await trpc.todo.getTodo.query({ id: newTodo2.id })
  );

  console.log('todo.getTodos:', await trpc.todo.getTodos.query());

  console.log(
    'todo.updateTodo:',
    await trpc.todo.updateTodo.mutate({
      id: newTodo1.id,
      name: 'Todo 1',
      priority: 'low',
    })
  );

  console.log(
    'todo.updateTodo:',
    await trpc.todo.updateTodo.mutate({
      id: newTodo2.id,
      name: 'Todo 2',
      priority: 'low',
    })
  );

  console.log('todo.getTodos:', await trpc.todo.getTodos.query());

  console.log(
    'todo.deleteTodo:',
    await trpc.todo.deleteTodo.mutate({ id: newTodo1.id })
  );

  console.log(
    'todo.deleteTodo:',
    await trpc.todo.deleteTodo.mutate({ id: newTodo2.id })
  );

  console.log('todo.getTodos:', await trpc.todo.getTodos.query());
}

main().catch(console.error);
