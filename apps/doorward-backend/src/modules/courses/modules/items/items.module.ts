import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleItemsRepository from '@repositories/module.items.repository';
import ModulesRepository from '@repositories/modules.repository';
import AnswerRepository from '@repositories/answer.repository';
import QuestionRepository from '@repositories/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleItemsRepository, ModulesRepository, AnswerRepository, QuestionRepository])],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
