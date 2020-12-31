import '@doorward/backend/bootstrap/setUpEnvironment';
import { TransformInterceptor } from '@doorward/backend/interceptors/transform.interceptor';
import { AppModule } from './app.module';
import setUpNestApplication from '@doorward/backend/bootstrap/setUpNestApplication';
import { swaggerDocumentation } from '@doorward/backend/bootstrap/swaggerDocumentation';
import BodyFieldsValidationPipe from '@doorward/backend/pipes/body.fields.validation.pipe';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import ModelExistsGuard from '@doorward/backend/guards/model.exists.guard';
import { Reflector } from '@nestjs/core';
import DocumentationBuilder from '@doorward/backend/documentation/documentation.builder';
import { Logger } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { TransformExceptionFilter } from '@doorward/backend/exceptions/transform-exception.filter';
import getOrganization from '@doorward/backend/bootstrap/getOrganization';
import ChatAdapter from './modules/chat/chat.adapter';

const globalPrefix = process.env.CHAT_API_PREFIX;

async function bootstrap() {
  await getOrganization(process.env.REACT_APP_BASE_URL);

  const app = await setUpNestApplication(AppModule);

  if (process.env.NODE_ENV === 'production') {
    app.useLogger(await app.resolve(PinoLogger));
  }

  app.setGlobalPrefix(globalPrefix.replace(/\/$/, ''));

  swaggerDocumentation(
    app,
    {
      title: 'Doorward Chat API',
      description: 'The doorward chat API documentation',
      version: '1.0.0',
      tag: 'doorward',
      basePath: globalPrefix,
    },
    'apps/doorward-chat-api/documentation/swagger.json'
  );

  const reflector = app.get(Reflector);

  app.useWebSocketAdapter(new ChatAdapter(app));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalFilters(new TransformExceptionFilter(await app.resolve(PinoLogger)));
  app.useGlobalPipes(new BodyFieldsValidationPipe(), new YupValidationPipe());
  app.useGlobalGuards(new ModelExistsGuard(reflector));
  app.enableCors();

  const documentation = new DocumentationBuilder();
  documentation.scanApplication(app, 'doorward.chat.api.ts', 'Doorward Chat API');

  const port = +(process.env.CHAT_API_PORT || 3333);
  await app.listen(port, () => {
    const hostPrefix = process.env.NODE_ENV === 'development' ? 'https' : 'http';

    Logger.log('Listening at ' + hostPrefix + '://localhost:' + port + globalPrefix);
  });
}

bootstrap().then(() => {});
