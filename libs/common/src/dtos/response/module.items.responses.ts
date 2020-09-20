import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';
import DApiResponse from '@doorward/common/dtos/response/index';

export class QuizResponse {
  content: {
    instructions: string;
    options: {
      shuffleAnswers: boolean;
      timeLimit: {
        allow: boolean;
        minutes: number;
      };
      attempts: {
        multiple: boolean;
        keepScore: 'Highest' | 'Latest' | 'Average';
        max: number;
      };
      questions: {
        oneAtATime: boolean;
        lockAfterAnswering: boolean;
      };
      restrictions: {
        accessCode: {
          require: boolean;
          code: string;
        };
      };
      responses: {
        show: boolean;
        frequency: {
          onlyOnce: boolean;
          range: {
            allow: boolean;
            from: string | Date | null;
            to: string | Date | null;
          };
        };
      };
      dueDate: string;
      availability: {
        from: string | Date | null;
        to: string | Date | null;
      };
    };
    questions: Array<QuestionEntity>;
  };
}

export class AssignmentSubmissionResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  assignmentSubmission: AssignmentSubmissionEntity;
}
