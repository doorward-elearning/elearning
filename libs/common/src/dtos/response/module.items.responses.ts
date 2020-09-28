import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';

export class AssignmentSubmissionResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  assignmentSubmission: AssignmentSubmissionEntity;
}

export class ModuleItemResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  item: ModuleItemEntity;
}

export class ModuleItemsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  items: ModuleItemEntity[];
}
