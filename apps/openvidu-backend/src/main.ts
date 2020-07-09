import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from '@doorward/backend/interceptors/transform.interceptor';
import { TransformExceptionFilter } from '@doorward/backend/exceptions/transform-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.use(helmet());
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new TransformExceptionFilter());
  app.enableCors();

  const port = process.env.OPENVIDU_API_PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening on port: ' + port);
  });
}

bootstrap();
