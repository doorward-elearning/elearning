import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModulesRepository from '@doorward/backend/repositories/modules.repository';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ItemsModule } from './items/items.module';
import { AssignmentsModule } from './assignments/assignments.module';
import QuizRepository from '@doorward/backend/repositories/quiz.repository';
import PageRepository from '@doorward/backend/repositories/page.repository';
import AssignmentRepository from '@doorward/backend/repositories/assignment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModulesRepository,
      ModuleItemsRepository,
      QuizRepository,
      PageRepository,
      AssignmentRepository,
    ]),
    ItemsModule,
    AssignmentsModule,
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
