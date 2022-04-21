import { Injectable } from '@nestjs/common';
import { Hello } from './models/hello.model';

@Injectable()
export class HelloService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async hello(): Promise<Hello> {
    return {
      id: "123",
      title: "hello world",
    } as any;
  }
}
