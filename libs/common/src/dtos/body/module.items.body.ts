import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  AssignmentSubmissionMedia,
  AssignmentSubmissionStatus,
  AssignmentSubmissionType,
} from '@doorward/common/types/courses';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { AssignmentOptions } from '@doorward/common/types/assignments';
import { QuizOptions } from '@doorward/common/types/quiz';

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

export class CreateModuleItemBody extends DApiBody {
  @ApiProperty()
  @Expose()
  type: ModuleItemType;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  order: number;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      type: Yup.string()
        .required('The {{moduleItem}} type is required.')
        .oneOf(Object.values(ModuleItemType), 'Please choose a valid {{moduleItem}} type.')
        .nullable(),
      title: Yup.string().required('The title is required').nullable(),
    });
  }
}

export class CreatePageBody extends CreateModuleItemBody {
  @ApiProperty()
  @Expose()
  page: string;

  async validation?(): Promise<ObjectSchema> {
    return (await super.validation()).concat(
      Yup.object({
        page: Yup.string().required('The page content is required.'),
      })
    );
  }
}

export class CreateAssignmentBody extends CreateModuleItemBody {
  @ApiProperty()
  @Expose()
  assignment: string;

  @ApiProperty()
  @Expose()
  options: AssignmentOptions;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('The title of the {{assignment}} is required'),
      options: Yup.object({
        dueDate: Yup.string().required('The due date is required'),
        submissionTypes: Yup.array(
          Yup.string().oneOf(Object.values(AssignmentSubmissionType), 'Invalid submission' + ' type.')
        ).min(1, 'Please choose at least' + ' one submission' + ' type'),
        points: Yup.number().required('The points are required.'),
        availability: Yup.object(),
        submissionMedia: Yup.string()
          .nullable()
          .oneOf(Object.values(AssignmentSubmissionMedia), 'Invalid submission' + ' media.'),
      }),
      assignment: Yup.string().nullable().required('The {{assignment}} content is required.'),
    });
  }
}

export class CreateQuizBody extends CreateModuleItemBody {
  @ApiProperty()
  @Expose()
  questions: Array<CreateQuestionBody>;

  @ApiProperty()
  @Expose()
  instructions: string;

  @ApiProperty()
  @Expose()
  options: QuizOptions;

  async validation?(): Promise<ObjectSchema> {
    let schema = await super.validation();

    schema = schema.concat(
      Yup.object({
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

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      submissionType: Yup.string()
        .required('Please provide the submission type')
        .oneOf(Object.values(AssignmentSubmissionType), 'Please enter a valid submission type')
        .nullable(),
      submission: Yup.string().required('The submission content is required.'),
    });
  }
}
