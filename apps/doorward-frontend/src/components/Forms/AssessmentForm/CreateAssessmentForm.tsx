import React, { FunctionComponent } from 'react';
import AddModuleItemForm from '../AddModuleItemForm';
import useForm from '@doorward/ui/hooks/useForm';
import './QuizDetailsForm.scss';
import AssessmentDetails from './AssessmentDetails';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CreateAssessmentBody, CreateQuizBody } from '@doorward/common/dtos/body';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';
import AssessmentOptions from './AssessmentOptions';

const defaultAssessment: CreateAssessmentBody = (type: ModuleItemType, title?: string) => ({
  title: title || 'Unnamed',
  instructions: '',
  type,
  order: 0,
  options: {
    shuffleAnswers: false,
    timeLimit: {
      allow: false,
      minutes: null,
    },
    attempts: {
      multiple: false,
      keepScore: 'Highest',
      max: null,
    },
    questions: {
      oneAtATime: false,
      lockAfterAnswering: false,
    },
    restrictions: {
      accessCode: {
        require: false,
        code: null,
      },
    },
    responses: {
      show: false,
      frequency: {
        onlyOnce: false,
        range: {
          allow: false,
          from: null,
          to: null,
        },
      },
    },
    dueDate: null,
    availability: {
      from: null,
      to: null,
    },
  },
  questions: [],
});

const CreateAssessmentForm: FunctionComponent<CreateQuizFormProps> = (props): JSX.Element => {
  const initialValues = (props.quiz || defaultQuiz) as CreateQuizBody;

  const form = useForm<CreateQuizFormState>();
  return (
    <div className="create-quiz-form">
      <AddModuleItemForm
        onSuccess={props.onSuccess}
        onCancel={props.onCancel}
        type={props.exam ? ModuleItemType.EXAM : ModuleItemType.QUIZ}
        form={form}
        item={props.quiz}
        validationSchema={CreateQuizBody}
        module={props.module}
        initialValues={initialValues}
      >
        {() => (
          <div className="quiz-details-form">
            <AssessmentDetails />
            <AssessmentOptions />
          </div>
        )}
      </AddModuleItemForm>
    </div>
  );
};

export interface CreateAssessmentFormProps{
  onSuccess: () => void;
  onCancel: () => void;
  module: ModuleEntity;
  quiz?: QuizEntity;
  exam?: boolean;
}

export type CreateQuizFormState = CreateQuizBody;

export default CreateAssessmentForm;
