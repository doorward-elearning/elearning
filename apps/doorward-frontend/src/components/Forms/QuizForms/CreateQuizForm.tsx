import React, { FunctionComponent } from 'react';
import AddModuleItemForm, { AddModuleItemFormState } from '../AddModuleItemForm';
import useForm from '@doorward/ui/hooks/useForm';
import './QuizDetailsForm.scss';
import QuizDetails from './QuizDetails';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import QuizQuestions, { defaultQuestion } from './QuizQuestions';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CreateQuizBody } from '@doorward/common/dtos/body';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';

const defaultQuiz: CreateQuizBody = {
  title: 'Unnamed Quiz',
  instructions: '',
  type: ModuleItemType.QUIZ,
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
  questions: [defaultQuestion],
};

const CreateQuizForm: FunctionComponent<CreateQuizFormProps> = (props): JSX.Element => {
  const initialValues = (props.quiz || defaultQuiz) as CreateQuizBody;

  const form = useForm<CreateQuizFormState>();
  return (
    <div className="create-quiz-form">
      <AddModuleItemForm
        onSuccess={props.onSuccess}
        onCancel={props.onCancel}
        type={ModuleItemType.QUIZ}
        form={form}
        validationSchema={CreateQuizBody}
        item={props.module}
        initialValues={initialValues}
      >
        {(formikProps) => (
          <div className="quiz-details-form">
            <TabLayout stickyHeader>
              <Tab title="Details">
                <QuizDetails />
              </Tab>
              <Tab title="Questions" badge={`${(formikProps?.values.questions || []).length}`}>
                <QuizQuestions />
              </Tab>
            </TabLayout>
          </div>
        )}
      </AddModuleItemForm>
    </div>
  );
};

export interface CreateQuizFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  module: ModuleEntity;
  quiz?: QuizEntity;
}

export type CreateQuizFormState = AddModuleItemFormState & CreateQuizBody;

export default CreateQuizForm;
