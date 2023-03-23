import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerFactory } from './logger.factory';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private loggerFactory: LoggerFactory;
  constructor() {
    this.loggerFactory = LoggerFactory.getInstance('requests');
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();
    // Create a logger for the current request level
    const logger = this.loggerFactory.getLogger('info');
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        // Log the incoming request and outgoing response
        logger.log({
          level: 'info',
          message: `${method} ${url} ${responseTime}ms`,
        });
      }),
    );
  }
}
