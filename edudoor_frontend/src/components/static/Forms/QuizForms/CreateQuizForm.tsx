import React, { FunctionComponent } from 'react';
import AddModuleItemForm, { AddModuleItemFormState } from '../AddModuleItemForm';
import { Module, Quiz } from '../../../../services/models';
import useForm from '../../../../hooks/useForm';
import './QuizDetailsForm.scss';
import QuizDetails from './QuizDetails';
import TabLayout from '../../../ui/TabLayout';
import Tab from '../../../ui/TabLayout/Tab';
import QuizQuestions, { defaultQuestion } from './QuizQuestions';

const CreateQuizForm: FunctionComponent<CreateQuizFormProps> = (props): JSX.Element => {
  const initialValues = props.quiz || {
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
  const form = useForm<CreateQuizFormState>();
  return (
    <AddModuleItemForm
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      type="Quiz"
      form={form}
      item={props.module}
      initialValues={initialValues}
    >
      <div className="quiz-details-form">
        <TabLayout stickyHeader>
          <Tab title="Details">
            <QuizDetails form={form} />
          </Tab>
          <Tab title="Questions" badge={`${form.formikProps?.values.content.questions.length}`}>
            <QuizQuestions form={form} />
          </Tab>
        </TabLayout>
      </div>
    </AddModuleItemForm>
  );
};

export interface CreateQuizFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  module: Module;
  quiz?: Quiz;
}

export type CreateQuizFormState = Omit<AddModuleItemFormState, 'content'> & Quiz;

export default CreateQuizForm;
