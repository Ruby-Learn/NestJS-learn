import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ControllerInterceptor, RouteInterceptor } from './app.interceptor';

@Controller()
@UseInterceptors(new ControllerInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(new RouteInterceptor())
  @Get('call')
  call(): string {
    return 'call';
  }
}
