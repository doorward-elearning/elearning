import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';

@Module({
  imports: [],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
