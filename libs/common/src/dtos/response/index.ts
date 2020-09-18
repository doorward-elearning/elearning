import DApiResponse from '@doorward/common/dtos/response/d.api.response';
import CourseEntity from '@doorward/common/entities/course.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
import { UpdateModuleOrderBody } from '@doorward/common/dtos/body';
import StudentEntity from '@doorward/common/entities/student.entity';

export class CourseResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  course: CourseEntity;
}

export class DeleteCourseResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  id: string;
}

export class CoursesResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  courses: CourseEntity[];
}

export class LoginResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  token: string;
  @ApiProperty()
  @Expose()
  user: UserEntity;
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

export class ModuleResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  module: ModuleEntity;
}

export class ModulesResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  modules: Array<ModuleEntity>;
}

export class DeleteModuleResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  id: string;
}

export class OrganizationResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  organization: OrganizationEntity;
}

export class OrganizationsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  organizations: OrganizationEntity[];
}

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

export class UserResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  user: UserEntity;
}

export class AssignmentSubmissionResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  assignmentSubmission: AssignmentSubmissionEntity;
}

export class UpdateModulesOrderResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  modules: Array<UpdateModuleOrderBody>;
}

export class StudentResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  student: UserEntity;
}

export class StudentsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  students: Array<UserEntity>;
}
