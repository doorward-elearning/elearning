import '@doorward/backend/bootstrap/setUpEnvironment';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { TransformInterceptor } from '@doorward/backend/interceptors/transform.interceptor';
import { TransformExceptionFilter } from '@doorward/backend/exceptions/transform-exception.filter';
import helmet from 'helmet';
import setUpNestApplication from '@doorward/backend/bootstrap/setUpNestApplication';
import { swaggerDocumentation } from '@doorward/backend/bootstrap/swaggerDocumentation';
import { Reflector } from '@nestjs/core';
import { PinoLogger } from 'nestjs-pino/dist';

async function bootstrap() {
  const app = await setUpNestApplication(AppModule);
  swaggerDocumentation(app, {
    title: 'Openvidu Backend',
    description: 'The openvidu backend api',
    version: '1.0',
    tag: 'openvidu-backend',
  });

  const globalPrefix = 'api';

  const reflector = app.get(Reflector);
  const logger = app.get(PinoLogger);

  app.use(helmet());
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalFilters(new TransformExceptionFilter(logger));
  app.enableCors();

  const port = process.env.OPENVIDU_API_PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening on port: ' + port);
  });
}

bootstrap();
