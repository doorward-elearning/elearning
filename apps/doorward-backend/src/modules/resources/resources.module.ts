import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';

@Module({
  providers: [ResourcesService],
  controllers: [ResourcesController],
  imports: [DoorwardLoggerModule],
})
export class ResourcesModule {}
