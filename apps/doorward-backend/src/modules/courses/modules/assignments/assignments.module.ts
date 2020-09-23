import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import AssignmentSubmissionRepository from '@doorward/backend/repositories/assignment.submission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleItemsRepository, AssignmentSubmissionRepository])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
