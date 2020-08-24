import { Logger } from '@nestjs/common';

import { TransformInterceptor } from '@doorward/backend/interceptors/transform.interceptor';
import { TransformExceptionFilter } from '@doorward/backend/exceptions/transform-exception.filter';
import { AppModule } from './app.module';
import setUpNestApplication from '@doorward/backend/bootstrap/setUpNestApplication';
import organizationSetup from './config/organizationSetup';
import { swaggerDocumentation } from '@doorward/backend/bootstrap/swaggerDocumentation';
import BodyFieldsValidationPipe from '@doorward/backend/pipes/body.fields.validation.pipe';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';

const globalPrefix = process.env.API_PREFIX;

async function bootstrap() {
  await organizationSetup();

  const app = await setUpNestApplication(AppModule);
  swaggerDocumentation(app, {
    title: 'Doorward Core API',
    description: 'The doorward API documentation',
    version: '1.0.0',
    tag: 'doorward',
    basePath: globalPrefix,
  });

  app.setGlobalPrefix(globalPrefix.replace(/\/$/, ''));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new TransformExceptionFilter());
  app.useGlobalPipes(new BodyFieldsValidationPipe(), new YupValidationPipe());

  const port = process.env.BACKEND_API_PORT || 3333;
  await app.listen(port, () => {
    const hostPrefix = process.env.NODE_ENV === 'development' ? 'https' : 'http';

    Logger.log('Listening at ' + hostPrefix + '://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap().then(() => {});
