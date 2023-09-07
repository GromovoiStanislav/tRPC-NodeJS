import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
const trpc = createTRPCProxyClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
        }),
    ],
});
async function main() {
    console.log('getUsers:', await trpc.user.getUsers.query());
    console.log('trpc.user:', await trpc.user.getUserById.query('1'));
    console.log('createUser:', await trpc.user.createUser.mutate({
        name: 'Tom',
    }));
    console.log('getUsers:', await trpc.user.getUsers.query());
}
main();
