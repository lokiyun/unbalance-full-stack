import { Query, Resolver } from '@nestjs/graphql';
import { Hello } from './models/hello.model';
import { HelloService } from './hello.service';

@Resolver(of => Hello)
export class HelloResolver {
  constructor(private readonly helloService: HelloService) {}

  @Query(returns => Hello)
  async foo(): Promise<Hello> {
    const hello = await this.helloService.hello()
    return hello;
  }

}
