import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import httpsOptions from '@doorward/backend/bootstrap/httpsOptions';

function setUpNestApplication<T extends INestApplication = INestApplication>(
  module: any,
  options: NestApplicationOptions = {}
): Promise<T> {
  if (process.env.NODE_ENV === 'development') {
    options.httpsOptions = httpsOptions;
  }

  return NestFactory.create(module, options);
}

export default setUpNestApplication;
