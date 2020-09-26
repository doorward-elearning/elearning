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
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { CreateQuizBody } from '@doorward/common/dtos/body';

const defaultQuiz = {
  title: 'Unnamed Quiz',
  content: {
    instructions: '',
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
  },
};

const CreateQuizForm: FunctionComponent<CreateQuizFormProps> = (props): JSX.Element => {
  const initialValues = props.quiz || defaultQuiz;

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
              <Tab title="Questions" badge={`${(formikProps?.values.content.questions || []).length}`}>
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
  quiz?: ModuleItemEntity;
}

export type CreateQuizFormState = AddModuleItemFormState & ModuleItemEntity;

export default CreateQuizForm;
