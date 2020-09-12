import { INestApplication } from '@nestjs/common';
import { SwaggerScanner } from '@nestjs/swagger/dist/swagger-scanner';

export default class ApiDocumentation {
  public constructor(app: INestApplication) {
    const result = new SwaggerScanner().scanApplication(app, {
      deepScanRoutes: true,
      ignoreGlobalPrefix: false,
    });
    console.log(result.paths['/api/v1/auth/login'].post);
  }
}
