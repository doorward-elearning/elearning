import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';

export class AssignmentSubmissionResponse extends DApiResponse {
  @Expose()
  assignmentSubmission: AssignmentSubmissionEntity;
}

export class ModuleItemResponse extends DApiResponse {
  @Expose()
  item: ModuleItemEntity;
}

export class ModuleItemsResponse extends DApiResponse {
  @Expose()
  items: ModuleItemEntity[];
}
