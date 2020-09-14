import DApiResponse from '@doorward/common/dtos/response/d.api.response';
import CourseEntity from '@doorward/common/entities/course.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';

export class CourseResponse extends DApiResponse {
  course: CourseEntity;
}

export class DeleteCourseResponse extends DApiResponse {
  id: string;
}

export class CoursesResponse extends DApiResponse {
  courses: CourseEntity[];
}

export class LoginResponse extends DApiResponse {
  token: string;
  user: UserEntity;
}

export class ModuleItemResponse extends DApiResponse {
  item: ModuleItemEntity;
}

export class ModuleItemsResponse extends DApiResponse {
  items: ModuleItemEntity[];
}

export class ModuleResponse extends DApiResponse {
  module: ModuleEntity;
}

export class ModulesResponse extends DApiResponse {
  modules: Array<ModuleEntity>;
}

export class DeleteModuleResponse extends DApiResponse {
  id: string;
}

export class OrganizationResponse extends DApiResponse {
  organization: OrganizationEntity;
}

export class OrganizationsResponse extends DApiResponse {
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
  user: UserEntity;
}
