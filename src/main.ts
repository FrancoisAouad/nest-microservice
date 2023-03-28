import { NestFactory } from '@nestjs/core';
import { ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import { AppModule } from './app.module';
import config from './configs/config';
import { GlobalExceptionFilter } from './global/http-exception';
import logger from './global/logger/logger';

const bootstrap = async () => {
  const appOptions: NestApplicationOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  // app.useLogger(Logger);

  app.setGlobalPrefix('api/v1');
  await app.listen(config().app.port, () => logger.info(`Application Listening on Port ${config().app.port}`));
};

bootstrap();
