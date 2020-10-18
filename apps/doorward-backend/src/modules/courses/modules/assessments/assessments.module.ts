import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import AssessmentSubmissionRepository from '@doorward/backend/repositories/assessment.submission.repository';
import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AssessmentSubmissionRepository, AssessmentRepository])],
  providers: [AssessmentsService],
  controllers: [AssessmentsController],
  exports: [AssessmentsService],
})
export class AssessmentsModule {}
