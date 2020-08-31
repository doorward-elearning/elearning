import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleItemsRepository from '@repositories/module.items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleItemsRepository])],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
