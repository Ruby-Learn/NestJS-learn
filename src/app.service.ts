import { Injectable, UseInterceptors } from '@nestjs/common';
import { MethodInterceptor } from './app.interceptor';

@Injectable()
@UseInterceptors(new MethodInterceptor())
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
