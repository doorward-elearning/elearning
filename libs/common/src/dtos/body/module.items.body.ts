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
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import { AssignmentOptions } from '@doorward/common/types/assignments';
import { AssessmentOptions } from '@doorward/common/types/assessments';
import { AnswerTypes } from '@doorward/common/types/exam';
import translate from '@doorward/common/lang/translate';

export class CreateQuestionBody {
  @Expose()
  id?: string;

  @Expose()
  question: string;

  @Expose()
  points: number;

  @Expose()
  type: AnswerTypes;

  @Expose()
  answers: Array<CreateAnswerBody>;
}

export class CreateAnswerBody {
  @Expose()
  id?: string;

  @Expose()
  answer: string;

  @Expose()
  description: string;

  @Expose()
  correct: boolean;

  @Expose()
  points?: number;
}

export class CreateModuleItemBody extends DApiBody {
  @Expose()
  type: ModuleItemType;

  @Expose()
  title: string;

  @Expose()
  fileId: string;

  @Expose()
  order: number;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      type: Yup.string()
        .required(translate('typeIsRequired'))
        .oneOf(Object.values(ModuleItemType), translate('chooseValidType'))
        .nullable(),
      title: Yup.string().required(translate('titleRequired')).nullable(),
    });
  }
}

export class CreateVideoBody extends CreateModuleItemBody {
  @Expose()
  fileId: string;

  @Expose()
  description: string;

  @Expose()
  videoURL: string;

  async validation?(): Promise<ObjectSchema> {
    return (await super.validation()).concat(
      Yup.object({
        description: Yup.string().nullable(),
        video: Yup.string().when(['videoURL', 'fileId'], {
          is: (videoURL, fileId) => !videoURL && !fileId,
          then: Yup.string().required(translate('videoFileOrURLRequired')),
        }),
        fileId: Yup.string().nullable(),
        videoURL: Yup.string().url(translate('urlInvalid')).nullable(),
      })
    );
  }
}

export class CreatePageBody extends CreateModuleItemBody {
  @Expose()
  page: string;

  async validation?(): Promise<ObjectSchema> {
    return (await super.validation()).concat(
      Yup.object({
        page: Yup.string().required(translate('contentRequired')),
      })
    );
  }
}

export class CreateAssignmentBody extends CreateModuleItemBody {
  @Expose()
  assignment: string;

  @Expose()
  options: AssignmentOptions;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required(translate('titleRequired')),
      options: Yup.object({
        dueDate: Yup.string().required(translate('dueDateRequired')),
        submissionTypes: Yup.array(
          Yup.string().oneOf(Object.values(AssignmentSubmissionType), translate('invalidType'))
        ).min(1, translate('chooseAtLeastOneType')),
        points: Yup.number().required(translate('pointsRequired')),
        availability: Yup.object(),
        submissionMedia: Yup.string()
          .nullable()
          .oneOf(Object.values(AssignmentSubmissionMedia), translate('invalidMedia')),
      }),
      assignment: Yup.string().nullable().required(translate('contentRequired')),
    });
  }
}

export class CreateAssessmentBody extends CreateModuleItemBody {
  @Expose()
  questions: Array<CreateQuestionBody>;

  @Expose()
  instructions: string;

  @Expose()
  options: AssessmentOptions;

  @Expose()
  assessmentType: AssessmentTypes;

  static QuestionValidationSchema = () =>
    Yup.object({
      question: Yup.string().required(translate('questionRequired')).nullable(),
      type: Yup.string().oneOf(Object.values(AnswerTypes), translate('invalidType')),
      answers: Yup.array()
        .when('type', {
          is: (value) => value === AnswerTypes.MULTIPLE_CHOICE,
          then: Yup.array()
            .of(
              Yup.object({
                answer: Yup.string().required(translate('answerRequired')),
                correct: Yup.bool(),
              })
            )
            .test('Correct Answer', translate('chooseAtLeastOneAnswer'), (value) => {
              return value.find((x) => x.correct);
            }),
        })
        .when('type', {
          is: (value) => value === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE,
          then: Yup.array()
            .of(
              Yup.object({
                answer: Yup.string().required(translate('answerRequired')),
                correct: Yup.bool(),
              })
            )
            .test('Correct Answer', translate('atLeastOneAnswerWithPoints'), (value) => {
              return value.find((x) => x.points > 0);
            }),
        }),
    });

  async validation?(): Promise<ObjectSchema> {
    let schema = await super.validation();

    schema = schema.concat(
      Yup.object({
        instructions: Yup.string().required(translate('instructionsRequired')).nullable(),
        options: Yup.object({
          shuffleAnswers: Yup.boolean(),
          timeLimit: Yup.object({
            allow: Yup.boolean(),
            minutes: Yup.number()
              .typeError(translate('numberTypeError'))
              .nullable()
              .when('allow', {
                is: (value) => !!value,
                then: Yup.number().typeError(translate('numberTypeError')).required(translate('timeLimitInMinutes')),
              }),
          }),
          attempts: Yup.object({
            multiple: Yup.boolean(),
            keepScore: Yup.string().when('multiple', {
              is: (value) => !!value,
              then: Yup.string()
                .required(translate('chooseScoreToKeep'))
                .oneOf(['Highest', 'Lowest', 'Average'], translate('chooseScoreToKeep')),
            }),
            max: Yup.number()
              .nullable()
              .when('multiple', {
                is: (value) => !!value,
                then: Yup.number().required(translate('maximumTrials')),
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
                  then: Yup.string().required(translate('accessCodeRequired')),
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
            from: Yup.date().nullable().required(translate('thisFieldIsRequired')),
            to: Yup.date()
              .nullable()
              .when('from', {
                is: (value) => !!value,
                then: Yup.date().min(Yup.ref('from'), translate('untilDateShouldBeAfterFromDate')),
              }),
          }),
        }),
        questions: Yup.array().of(CreateAssessmentBody.QuestionValidationSchema()),
      })
    );

    return schema;
  }
}

export class CreateQuizBody extends CreateAssessmentBody {}

export class CreateExamBody extends CreateQuizBody {}

export class SubmitAssignmentBody extends DApiBody {
  @Expose()
  submissionType: AssignmentSubmissionType;

  @Expose()
  submission: string;

  @Expose()
  status: AssignmentSubmissionStatus.DRAFT | AssignmentSubmissionStatus.SUBMITTED;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      submissionType: Yup.string()
        .required(translate('typeIsRequired'))
        .oneOf(Object.values(AssignmentSubmissionType), translate('invalidType'))
        .nullable(),
      submission: Yup.string().required(translate('contentRequired')),
    });
  }
}
