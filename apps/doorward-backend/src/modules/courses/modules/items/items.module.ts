import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleItemsRepository from '@repositories/module.items.repository';
import ModulesRepository from '@repositories/modules.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleItemsRepository, ModulesRepository])],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
