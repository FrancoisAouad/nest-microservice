import { Module } from '@nestjs/common';
import { DatabaseModule } from './lib/database/database.module';
import { CarModule } from './cars/car.module';
import { ConfigModule } from '@nestjs/config';
import config from './configs/config';
import { PrometheusModule } from './lib/prometheus/prometheus.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] }), DatabaseModule, CarModule, PrometheusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
