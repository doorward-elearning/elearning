import { DynamicModule, Global, Injectable } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import aws from 'aws-sdk';
import path from 'path';
import Tools from '@doorward/common/utils/Tools';
import multer from 'multer';
import * as fs from 'fs';

const multerS3 = require('multer-s3');

export interface AWSStorageOptions {
  bucket: string;
}

@Injectable()
@Global()
export default class AwsStorageModule {
  static register(options: AWSStorageOptions): DynamicModule {
    return MulterModule.registerAsync({
      useFactory: async () => {
        const s3 = new aws.S3({});

        const directory = (request) => `uploads/${request.organization.name || 'default'}/`;
        const fileName = (file) => `${Tools.randomString(20)}_${Date.now()}${path.extname(file.originalname)}`;

        const awsStorage = multerS3({
          s3,
          bucket: options.bucket,
          acl: 'public-read',
          key: (request, file, cb) => {
            cb(null, directory(request) + fileName(file));
          },
        });

        const localStorage = multer.diskStorage({
          destination: (request, file, cb) => {
            const directoryPath = directory(request);
            fs.mkdirSync(directoryPath, { recursive: true });

            cb(null, directoryPath);
          },
          filename: (request, file, cb) => {
            cb(null, fileName(file));
          },
        });

        return {
          storage: process.env.NODE_ENV === 'production' ? awsStorage : localStorage,
        };
      },
    });
  }
}
