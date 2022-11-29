import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ModuleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before Module...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After Module... ${Date.now() - now}ms`)));
  }
}

@Injectable()
export class ControllerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before Controller...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After Controller... ${Date.now() - now}ms`)),
      );
  }
}

@Injectable()
export class RouteInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before Route...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After Route... ${Date.now() - now}ms`)));
  }
}
