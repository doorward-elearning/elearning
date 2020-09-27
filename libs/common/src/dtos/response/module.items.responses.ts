import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { AssignmentSubmissionType } from '@doorward/common/types/courses';
import { QuizOptions } from '@doorward/common/types/quiz';

export class QuizModel extends ModuleItemEntity {
  content: {
    instructions: string;
    options: QuizOptions;
    questions: Array<QuestionEntity>;
  };
}

export class AssignmentModel extends ModuleItemEntity {
  @ApiProperty()
  @Expose()
  content: {
    assignment: object;
    dueDate: string;
    submissionTypes: AssignmentSubmissionType;
  };
}

export class PageModel extends ModuleItemEntity {
  @ApiProperty()
  @Expose()
  content: object;
}

export class AssignmentSubmissionResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  assignmentSubmission: AssignmentSubmissionEntity;
}

export class ModuleItemResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  item: PageModel | AssignmentModel | QuizModel;
}

export class ModuleItemsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  items: (PageModel | AssignmentModel | QuizModel)[];
}
