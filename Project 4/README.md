## Use Express adapter (TS)

### Runs the gRPC server

```
npm start
```

endpoints are now available via HTTP:

```
GET http://localhost:3000/trpc/hello


POST http://localhost:3000/trpc/addMessage
with req.body of type {user: string, message: string}


GET http://localhost:3000/trpc/getMessages?input=3
where INPUT is a URI-encoded JSON string
```
