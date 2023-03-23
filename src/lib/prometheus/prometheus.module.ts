import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
// import {  } from './prometheus.middleware';

@Module({
  providers: [PrometheusService],
})
export class PrometheusModule {}
