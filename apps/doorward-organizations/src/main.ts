import '@doorward/backend/bootstrap/setUpEnvironment';
import setUpNestApplication from '@doorward/backend/bootstrap/setUpNestApplication';
import { AppModule } from './app.module';
import { Reflector } from '@nestjs/core';
import BodyFieldsValidationPipe from '@doorward/backend/pipes/body.fields.validation.pipe';
import ModelExistsGuard from '@doorward/backend/guards/model.exists.guard';
import { TransformInterceptor } from '@doorward/backend/interceptors/transform.interceptor';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import { PinoLogger } from 'nestjs-pino';
import { TransformExceptionFilter } from '@doorward/backend/exceptions/transform-exception.filter';
import DocumentationBuilder from '@doorward/backend/documentation/documentation.builder';
import { Logger } from '@nestjs/common';

const globalPrefix = process.env.ORGANIZATION_API_PREFIX;

async function bootstrap() {

  const app = await setUpNestApplication(AppModule);

  app.setGlobalPrefix(globalPrefix.replace(/\/$/, ''));

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalFilters(new TransformExceptionFilter(await app.resolve(PinoLogger)));
  app.useGlobalPipes(new BodyFieldsValidationPipe(), new YupValidationPipe());
  app.useGlobalGuards(new ModelExistsGuard(reflector));
  app.enableCors();

  const documentation = new DocumentationBuilder();
  documentation.scanApplication(app, 'doorward.organization.api.ts', 'Doorward Organization API');

  const port = +(process.env.ORGANIZATION_API_PORT || 3333);
  await app.listen(port, () => {
    const hostPrefix = process.env.NODE_ENV === 'development' ? 'https' : 'http';

    Logger.log('Listening at ' + hostPrefix + '://localhost:' + port + '/' + globalPrefix);
  });

}

bootstrap().then(() => {});
