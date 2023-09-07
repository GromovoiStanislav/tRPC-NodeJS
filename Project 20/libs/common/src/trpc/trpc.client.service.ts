import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Injectable } from "@nestjs/common";


@Injectable()
export class TrpcService {
  getTRPC(url: string) {
    return createTRPCProxyClient({
      links: [
        httpBatchLink({
          url,
        }),
      ],
    });
  }

}