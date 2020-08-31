import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModulesRepository from '../../../repositories/modules.repository';
import ModuleItemsRepository from '../../../repositories/module.items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModulesRepository, ModuleItemsRepository])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
