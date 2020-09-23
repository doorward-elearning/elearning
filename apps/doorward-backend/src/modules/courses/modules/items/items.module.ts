import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import ModulesRepository from '@doorward/backend/repositories/modules.repository';
import AnswerRepository from '@doorward/backend/repositories/answer.repository';
import QuestionRepository from '@doorward/backend/repositories/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleItemsRepository, ModulesRepository, AnswerRepository, QuestionRepository])],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
