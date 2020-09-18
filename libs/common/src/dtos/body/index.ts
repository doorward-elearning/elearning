import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/d.api.body';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { AssignmentSubmissionStatus, AssignmentSubmissionType } from '@doorward/common/types/courses';
import { UserStatus } from '@doorward/common/types/users';
import { Gender } from '@doorward/common/types/genders';
import { Roles } from '@doorward/common/types/roles';

export class UpdateCourseBody extends DApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('The {{course}} title is required').nullable(),
    });
  }
}

export class CreateCourseBody extends UpdateCourseBody {
  @ApiProperty()
  @Expose()
  modules: Array<CreateModuleBody>;

  async validation(): Promise<ObjectSchema> {
    const validation = await super.validation();
    validation.concat(
      Yup.object({
        modules: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string().required('The {{module}} name is required'),
            })
          )
          .required('Please provide at least one {{module}} in the course'),
      })
    );
    return validation;
  }
}

export class CreateModuleBody extends DApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('Please provide the {{module}} title.').nullable(),
    });
  }
}

export class CreateModuleItemBody extends DApiBody {
  @ApiProperty()
  @Expose()
  type: ModuleItemType;

  @ApiProperty()
  @Expose()
  content: object | string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  order: number;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      type: Yup.string()
        .required('The {{moduleItem}} type is required.')
        .oneOf(Object.values(ModuleItemType), 'Please choose a valid {{moduleItem}} type.')
        .nullable(),
      title: Yup.string().required('The title is required').nullable(),
      content: Yup.mixed().required('The content is required'),
    });
  }
}

export class CreateQuestionBody {
  @ApiProperty()
  @Expose()
  id?: string;

  @ApiProperty()
  @Expose()
  question: string;

  @ApiProperty()
  @Expose()
  points: number;

  @ApiProperty()
  @Expose()
  answers: Array<CreateAnswerBody>;
}

export class CreateAnswerBody {
  @ApiProperty()
  @Expose()
  id?: string;

  @ApiProperty()
  @Expose()
  answer: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  correct: boolean;
}

export class CreateQuizBody extends CreateModuleItemBody {
  @ApiProperty()
  @Expose()
  questions: Array<CreateQuestionBody>;

  async validation(): Promise<ObjectSchema> {
    let schema = await super.validation();

    schema = schema.concat(
      Yup.object({
        content: Yup.object({
          instructions: Yup.string().required('The instructions are required.').nullable(),
          options: Yup.object({
            shuffleAnswers: Yup.boolean(),
            timeLimit: Yup.object({
              allow: Yup.boolean(),
              minutes: Yup.number()
                .typeError('Please specify a number')
                .nullable()
                .when('allow', {
                  is: (value) => !!value,
                  then: Yup.number().typeError('Please specify a number').required('Enter the time limit in minutes'),
                }),
            }),
            attempts: Yup.object({
              multiple: Yup.boolean(),
              keepScore: Yup.string().when('multiple', {
                is: (value) => !!value,
                then: Yup.string()
                  .required('Please choose the score to keep')
                  .oneOf(['Highest', 'Lowest', 'Average'], 'Please choose the score to keep.'),
              }),
              max: Yup.number()
                .nullable()
                .when('multiple', {
                  is: (value) => !!value,
                  then: Yup.number().required('Enter the maximum number of trials.'),
                }),
            }),
            questions: Yup.object({
              oneAtATime: Yup.boolean(),
              lockAfterAnswering: Yup.boolean(),
            }),
            restrictions: Yup.object({
              accessCode: Yup.object({
                require: Yup.boolean(),
                code: Yup.string()
                  .nullable()
                  .when('require', {
                    is: (value) => !!value,
                    then: Yup.string().required('Please enter the access code'),
                  }),
              }),
            }),
            responses: Yup.object({
              show: Yup.boolean(),
              frequency: Yup.object({
                onlyOnce: Yup.boolean(),
                range: Yup.object({
                  allow: Yup.boolean(),
                  from: Yup.string().nullable(),
                  to: Yup.string().nullable(),
                }),
              }),
            }),
            dueDate: Yup.string().nullable(),
            availability: Yup.object({
              from: Yup.string().nullable(),
              to: Yup.string().nullable(),
            }),
          }),
        }),
        questions: Yup.array(
          Yup.object({
            question: Yup.string().required('Please enter the question').nullable(),
            answers: Yup.array(
              Yup.object({
                answer: Yup.string().required('Enter a possible answer.'),
              })
            ),
          })
        ),
      })
    );

    return schema;
  }
}

export class ForgotPasswordBody extends DApiBody {
  @ApiProperty()
  @Expose()
  username: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
    });
  }
}

export class LoginBody extends DApiBody {
  @ApiProperty({ example: 'administrator' })
  @Expose()
  username: string;

  @Expose()
  @ApiProperty({ example: 'password' })
  password: string;

  async validation(): Promise<ObjectSchema<object>> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
      password: Yup.string().required('Password is required').nullable(),
    });
  }
}

export class RegisterBody extends DApiBody {
  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  email: string;

  async validation(): Promise<ObjectSchema<object>> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
      password: Yup.string().required('Password is required').nullable(),
      email: Yup.string().required('Email is required').email('Please enter a valid email').nullable(),
    });
  }
}

export class ResetPasswordBody extends DApiBody {
  @ApiProperty()
  @Expose()
  resetToken: string;

  @ApiProperty()
  @Expose()
  password: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      resetToken: Yup.string().required('The reset token is required').nullable(),
      password: Yup.string().required('The new password is required').nullable(),
    });
  }
}

export class UpdateAccountBody extends DApiBody {
  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      email: Yup.string().nullable().email('Please enter a valid email'),
    });
  }
}

export class UpdateModuleBody extends CreateModuleBody {}

export class UpdateModuleOrderBody {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  order: number;
}

export class UpdateModulesBody extends DApiBody {
  @ApiProperty()
  @Expose()
  modules: UpdateModuleOrderBody[];

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      modules: Yup.array(
        Yup.object({
          order: Yup.number().required('The order of the {{module}} is required'),
          id: Yup.string().required('The id of the {{module}} is required.'),
        })
      ),
    });
  }
}

export class UpdatePasswordBody extends DApiBody {
  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  newPassword: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      password: Yup.string().required('The existing password is required').nullable(),
      newPassword: Yup.string()
        .required('The new password is required')
        .nullable()
        .oneOf([Yup.ref('password'), null], 'Passwords should match.'),
    });
  }
}

export class SubmitAssignmentBody extends DApiBody {
  @ApiProperty()
  @Expose()
  submissionType: AssignmentSubmissionType;

  @ApiProperty()
  @Expose()
  submission: string;

  @ApiProperty()
  @Expose()
  status: AssignmentSubmissionStatus.DRAFT | AssignmentSubmissionStatus.SUBMITTED;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      submissionType: Yup.string()
        .required('Please provide the submission type')
        .oneOf(Object.values(AssignmentSubmissionType), 'Please enter a valid submission type')
        .nullable(),
      submission: Yup.string().required('The submission content is required.'),
    });
  }
}

export class CreateUserBody extends DApiBody {
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  zipCode?: string;
  country?: string;
  city?: string;
  status?: UserStatus;
  gender?: Gender;
  role?: Roles;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
      firstName: Yup.string().required('First name is required').nullable(),
      lastName: Yup.string().required('Last name is required').nullable(),
      email: Yup.string().email('Please enter a valid email').required('The email is required').nullable(),
    });
  }
}
