## Use Fastify adapter (TS)

### Runs the gRPC server

```
npm run server
```

endpoints are now available via HTTP:

```
POST http://localhost:3000/trpc/createUser
with req.body of type {name: string, bio: string}

GET http://localhost:3000/trpc/getUsers

GET http://localhost:3000/trpc/getUserById?input=1690348443045
where INPUT is a URI-encoded JSON string
```
