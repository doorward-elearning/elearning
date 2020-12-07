import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesRepository } from '@doorward/backend/repositories/files.repository';
import AwsStorageModule from '@doorward/backend/modules/storage/aws.storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilesRepository]),
    AwsStorageModule.register({
      endpoint: process.env.DIGITAL_OCEAN_STORAGE_ENDPOINT,
      bucket: process.env.DIGITAL_OCEAN_STORAGE_BUCKET,
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
