import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpExceptionOptions } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import logger from './logger';
import { LogMessageOptions } from '../types/global.types';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;
    const method = req.method;
    const url = req.url;
    const now = Date.now();
    const body = req.body;
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const logMessage = this.handleLogMessage({ url, handlerName, controllerName, method, responseTime, body });
        logger.info(logMessage);
      }),
      catchError((error: HttpExceptionOptions): any => {
        const responseTime = Date.now() - now;
        const logMessage = this.handleLogMessage({ url, handlerName, controllerName, method, responseTime, body, error });
        logger.error(logMessage, error);
      }),
    );
  }
  handleLogMessage = ({ method, url, handlerName, controllerName, responseTime, body, error }: LogMessageOptions) => {
    const isError = Boolean(error);
    let logMessage = isError
      ? `Error occurred while processing '${method} ${url}'. '${handlerName}' in '${controllerName}' threw an exception after ${responseTime}ms.`
      : `Request received for '${method} ${url}'. '${handlerName}' in '${controllerName}' executed response within ${responseTime}ms.`;
    if (body && Object.keys(body).length > 0) {
      logMessage += ` Request body: ${JSON.stringify(body)}`;
    }
    return logMessage;
  };
}
