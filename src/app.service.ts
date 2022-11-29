import { Injectable, UseInterceptors } from '@nestjs/common';
import { RouteInterceptor } from './app.interceptor';

@Injectable()
@UseInterceptors(new RouteInterceptor())
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
