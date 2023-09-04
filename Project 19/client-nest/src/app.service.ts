import { Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc/trpc.service";

@Injectable()
export class AppService {

  constructor(
    private readonly trpcService: TrpcService
  ) {
  }

  async getHello(name: string | undefined) {
    // @ts-ignore
    console.log(await this.trpcService.trpc.hello.query({ name }));
    return "Hello World!";
  }

}
