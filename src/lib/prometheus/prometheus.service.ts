import { Injectable } from '@nestjs/common';
import { Registry } from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly registry = new Registry();
}
