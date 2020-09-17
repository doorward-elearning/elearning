import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerDocumentation = (
  app: INestApplication,
  options: {
    title: string;
    description: string;
    version: string;
    tag: string;
    basePath?: string;
  },
  outputPath?: string
): OpenAPIObject => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setBasePath(options.basePath)
    .setVersion(options.version)
    .addTag(options.tag)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });

  if (process.env.NODE_ENV === 'development' && outputPath) {
    const fs = require('fs');

    fs.writeFileSync(outputPath, JSON.stringify(document));
  }

  SwaggerModule.setup('/documentation', app, document, {
    customSiteTitle: options.title,
  });

  return document;
};
