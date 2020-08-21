import { Logger } from '@nestjs/common';

import { TransformInterceptor } from '@doorward/backend/interceptors/transform.interceptor';
import { TransformExceptionFilter } from '@doorward/backend/exceptions/transform-exception.filter';
import { AppModule } from './app.module';
import setUpNestApplication from '@doorward/backend/bootstrap/setUpNestApplication';
import organizationSetup from './config/organizationSetup';

async function bootstrap() {
  await organizationSetup();
  const app = await setUpNestApplication(AppModule);
  const globalPrefix = process.env.API_PREFIX;

  app.setGlobalPrefix(globalPrefix.replace(/\/$/, ''));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new TransformExceptionFilter());

  const port = process.env.BACKEND_API_PORT || 3333;
  await app.listen(port, () => {
    const hostPrefix = process.env.NODE_ENV === 'development' ? 'https' : 'http';

    Logger.log('Listening at ' + hostPrefix + '://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap().then(() => {});
