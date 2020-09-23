import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModulesRepository from '@doorward/backend/repositories/modules.repository';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ItemsModule } from './items/items.module';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModulesRepository, ModuleItemsRepository]), ItemsModule, AssignmentsModule],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
