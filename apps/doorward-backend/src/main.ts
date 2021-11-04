import '@doorward/backend/bootstrap/setUpEnvironment';
import { TransformInterceptor } from '@doorward/backend/interceptors/transform.interceptor';
import { AppModule } from './app.module';
import setUpNestApplication from '@doorward/backend/bootstrap/setUpNestApplication';
import { swaggerDocumentation } from '@doorward/backend/bootstrap/swaggerDocumentation';
import BodyFieldsValidationPipe from '@doorward/backend/pipes/body.fields.validation.pipe';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import { Reflector } from '@nestjs/core';
import DocumentationBuilder from '@doorward/backend/documentation/documentation.builder';
import { Logger } from '@nestjs/common';
import { TransformExceptionFilter } from '@doorward/backend/exceptions/transform-exception.filter';
import ormConfig from '../ormconfig';
import orgOrmConfig from '../ormconfig-organizations';
import initializeBackend from './bootstrap/initializeBackend';
import entities from '@doorward/common/entities';
import { json } from 'express';
import { SizeLimitGuard } from '@doorward/backend/guards/size.limit.guard';
import dataSize from '@doorward/common/utils/dataSize';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';
import { organizationDetectorMiddleware } from '@doorward/backend/middleware/organization.detector.middleware';
import anonymousUserMiddleware from '@doorward/backend/middleware/anonymous.user.middleware';
import { JwtService } from '@nestjs/jwt';
import express from 'express';
import path from 'path';

const globalPrefix = process.env.API_PREFIX;

async function bootstrap() {
  await initializeBackend(entities, ormConfig, orgOrmConfig);

  const app = await setUpNestApplication(AppModule);

  app.setGlobalPrefix(globalPrefix.replace(/\/$/, ''));

  swaggerDocumentation(
    app,
    {
      title: 'Doorward Core API',
      description: 'The doorward API documentation',
      version: '1.0.0',
      tag: 'doorward',
      basePath: globalPrefix,
    },
    'apps/doorward-backend/documentation/swagger.json'
  );

  const reflector = app.get(Reflector);

  app.use(await organizationDetectorMiddleware(ormConfig, entities));
  app.use(anonymousUserMiddleware(await app.resolve(JwtService), await app.resolve(DoorwardLogger)));

  app.use(json({ limit: '50mb' }));

  if (process.env.NODE_ENV === 'development') {
    const uploadsPath = path.join(__dirname, '../../../uploads/');
    app.use('uploads/', express.static(uploadsPath));
  }

  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalFilters(new TransformExceptionFilter(await app.resolve(DoorwardLogger)));
  app.useGlobalPipes(new BodyFieldsValidationPipe(), new YupValidationPipe());
  app.useGlobalGuards(new SizeLimitGuard(reflector, dataSize.KB(100)));
  app.enableCors();

  const documentation = new DocumentationBuilder();
  documentation.scanApplication(app, 'doorward.backend.api.ts', 'Doorward Backend');

  const port = +(process.env.API_PORT || 3333);
  await app.listen(port, () => {
    const hostPrefix = process.env.NODE_ENV === 'development' ? 'https' : 'http';

    Logger.log('Listening at ' + hostPrefix + '://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap().then(() => {});
