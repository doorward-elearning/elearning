import { DynamicModule, Global, Injectable } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import aws from 'aws-sdk';
import path from 'path';
import Tools from '@doorward/common/utils/Tools';
import { ORGANIZATION } from '../../../../../apps/doorward-backend/src/bootstrap/organizationSetup';

const multerS3 = require('multer-s3');

export interface DigitalOceanStorageModuleOptions {
  endpoint: string;
  bucket: string;
}

@Injectable()
@Global()
export default class AwsStorageModule {
  static register(options: DigitalOceanStorageModuleOptions): DynamicModule {
    return MulterModule.registerAsync({
      useFactory: async () => {
        const spacesEndpoint = new aws.Endpoint(options.endpoint);

        const s3 = new aws.S3({ endpoint: spacesEndpoint });

        const storage = multerS3({
          s3,
          bucket: options.bucket,
          acl: 'public-read',
          key: (request, file, cb) => {
            cb(
              null,
              `${ORGANIZATION.id || 'default'}/${Tools.randomString(20)}_${Date.now()}${path.extname(
                file.originalname
              )}`
            );
          },
        });

        return {
          storage,
        };
      },
    });
  }
}
