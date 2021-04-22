import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import ModulesRepository from '@doorward/backend/repositories/modules.repository';
import AnswerRepository from '@doorward/backend/repositories/answer.repository';
import QuestionRepository from '@doorward/backend/repositories/question.repository';
import PageRepository from '@doorward/backend/repositories/page.repository';
import QuizRepository from '@doorward/backend/repositories/quiz.repository';
import AssignmentRepository from '@doorward/backend/repositories/assignment.repository';
import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';
import ExamRepository from '@doorward/backend/repositories/exam.repository';
import ModuleVideoRepository from '@doorward/backend/repositories/module-video.repository';
import QuestionSectionRepository from '@doorward/backend/repositories/question.section.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModuleItemsRepository,
      ModulesRepository,
      AnswerRepository,
      QuestionRepository,
      PageRepository,
      QuizRepository,
      AssignmentRepository,
      AssessmentRepository,
      ExamRepository,
      ModuleVideoRepository,
      QuestionSectionRepository,
    ]),
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
