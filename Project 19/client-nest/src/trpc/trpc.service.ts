import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Injectable } from "@nestjs/common";


@Injectable()
export class TrpcService {

  trpc = createTRPCProxyClient({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc"
      })
    ]
  });

}