import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'src/configs/config';
import { SequelizeBuilder } from './builder/sequelize.builder';
import { ConfigService } from '@nestjs/config';
console.log(config().database);
@Module({
  imports: [
    SequelizeModule.forRoot(
      new SequelizeBuilder(new ConfigService())
        .setDialect(config().database.sequelize.dialect)
        .setHost(config().database.host)
        .setPort(config().database.port)
        .setUsername(config().database.user)
        .setPassword(config().database.password)
        .setDatabase(config().database.name)
        .enableLogging(config().database.sequelize.logging)
        .enableAutoLoadModels(config().database.sequelize.autoLoadModels)
        .enableSynchronize(config().database.sequelize.synchronize)
        .build(),
    ),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
