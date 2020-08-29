import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerDocumentation = (
  app: INestApplication,
  options: {
    title: string;
    description: string;
    version: string;
    tag: string;
    basePath?: string;
  }
) => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setBasePath(options.basePath)
    .setVersion(options.version)
    .addTag(options.tag)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/documentation', app, document);
};
