import { Module } from '@nestjs/common';
import { DatabaseModule } from './lib/database/database.module';
import { CarModule } from './cars/car.module';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import config from './configs/config';
import { PrometheusModule } from './lib/prometheus/prometheus.module';
console.log(config());
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] } as ConfigModuleOptions), CarModule, PrometheusModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
