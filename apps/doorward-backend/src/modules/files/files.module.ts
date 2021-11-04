import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import AwsStorageModule from '@doorward/backend/modules/storage/aws.storage.module';

@Module({
  imports: [
    AwsStorageModule.register({
      bucket: process.env.AWS_STORAGE_BUCKET,
      endpoint: process.env.AWS_STORAGE_ENDPOINT
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
