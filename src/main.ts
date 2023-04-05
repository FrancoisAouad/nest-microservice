import { NestFactory } from '@nestjs/core';
import { ValidationPipe, NestApplicationOptions, INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import config from './configs/config';
import { GlobalExceptionFilter } from './global/http-exception';
import logger from './global/logger/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const bootstrap = async () => {
  const appOptions: NestApplicationOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  initSwaggerDocs(app);
  app.setGlobalPrefix('api/v1');
  await app.listen(config().app.port, () => logger.info(`Application Listening on Port ${config().app.port}`));
};
const initSwaggerDocs = (application: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Nestjs Boilerplate')
    .setDescription('Swagger Docs for boilerplate project')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(application, options);
  SwaggerModule.setup('docs', application, document);
};
bootstrap();
