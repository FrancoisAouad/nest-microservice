import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import config from './configs/config';
import { GlobalExceptionFilter } from './global/http-exception';
import { LoggerFactory } from './global/logger/logger.factory';

const bootstrap = async () => {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.setGlobalPrefix('api/v1');
  const loggerFactory = LoggerFactory.getInstance('app');
  const infoLogger = loggerFactory.getLogger('info');
  await app.listen(config().app.port, () => infoLogger.info(`Application Listening on Port ${config().app.port}`, 'app'));
};

bootstrap();
