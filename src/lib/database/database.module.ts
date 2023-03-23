import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'src/configs/config';
import { SequelizeBuilder } from './builder/sequelize.builder';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRoot(
      new SequelizeBuilder(new ConfigService())
        .setDialect(config().database.dialect)
        .setHost(config().database.host)
        .setPort(config().database.port)
        .setUsername(config().database.user)
        .setPassword(config().database.password)
        .setDatabase(config().database.name)
        .enableLogging(config().database.logging)
        .enableAutoLoadModels(config().database.autoLoadModels)
        .enableSynchronize(config().database.synchronize)
        .build(),
    ),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
