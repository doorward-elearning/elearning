import { INestApplication } from '@nestjs/common';
import { SwaggerScanner } from '@nestjs/swagger/dist/swagger-scanner';

export default class DocumentationBuilder {
  constructor() {}

  public scanApplication(app: INestApplication) {
    const result = new SwaggerScanner().scanApplication(app, {
      deepScanRoutes: true,
      ignoreGlobalPrefix: false,
    });
    console.log(JSON.stringify(result.paths['/api/v1/auth/login'].post));
    console.log(JSON.stringify(result.components.schemas));
  }
}
