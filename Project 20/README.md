## Use Express adapter & Merging routers with child routers (TS)

endpoints are now available via HTTP:

```
GET http://localhost:3000/trpc/user.getUsers


POST http://localhost:3000/trpc/user.createUser
with req.body of type {name: string}


GET http://localhost:3000/trpc/user.getUserById?input="8sbgxv"
where INPUT is a URI-encoded JSON string
```
