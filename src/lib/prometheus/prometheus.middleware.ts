import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Histogram, collectDefaultMetrics, register, Registry } from 'prom-client';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly registry: Registry) {}

  async use(req: Request, res: Response, next: () => void) {
    res.on('finish', async () => {
      // const status = res.statusCode.toString();
      // const method = req.method;
      // const route = req.route?.path ?? req.originalUrl;
      register.clear();
      collectDefaultMetrics();
      const result = await register.metrics();
      return result;
    });
    new Histogram({
      name: 'rest_response_time_duration_seconds',
      help: 'REST API response time in seconds',
      labelNames: ['method', 'route', 'status_code'],
    }).observe(
      {
        method: req.method,
        route: req.route.path,
        status_code: res.statusCode,
      },
      1000,
      // time * 1000,
    );

    next();
  }
}
