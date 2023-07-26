## Use Express adapter (TS)

### Runs the gRPC server

```
npm start
```

endpoints are now available via HTTP:

```
POST http://localhost:3000/trpc/createUser
with req.body of type {name: string}

GET http://localhost:3000/trpc/userList

GET http://localhost:3000/trpc/userById?input=1
where INPUT is a URI-encoded JSON string
```
