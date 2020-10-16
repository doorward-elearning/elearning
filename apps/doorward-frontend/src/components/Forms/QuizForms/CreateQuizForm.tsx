import React, { FunctionComponent, useState } from 'react';
import AddModuleItemForm from '../AddModuleItemForm';
import useForm from '@doorward/ui/hooks/useForm';
import './QuizDetailsForm.scss';
import QuizDetails from './QuizDetails';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CreateQuestionBody, CreateQuizBody } from '@doorward/common/dtos/body';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';
import QuizOptions from './QuizOptions';
import AddQuizQuestionModal, { defaultQuestion } from './AddQuizQuestionModal';
import useModal from '@doorward/ui/hooks/useModal';

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
  questions: [
    {
      question: 'This is a question',
      points: 2,
      answers: [
        { answer: 'One', correct: true, description: '' },
        { answer: 'Two', correct: false, description: '' },
        { answer: 'Three', correct: false, description: '' },
      ],
    },
  ],
};

const CreateQuizForm: FunctionComponent<CreateQuizFormProps> = (props): JSX.Element => {
  const initialValues = (props.quiz || defaultQuiz) as CreateQuizBody;
  const questionModal = useModal();
  const [newQuestion, setNewQuestion] = useState();
  const [editQuestion, setEditQuestion] = useState<{ question: CreateQuestionBody; index: number }>({
    question: null,
    index: null,
  });

  questionModal.onClose(() => {
    setEditQuestion({ question: null, index: null });
  });

  const form = useForm<CreateQuizFormState>();
  return (
    <div className="create-quiz-form">
      <AddQuizQuestionModal
        question={editQuestion.question}
        useModal={questionModal}
        onAddQuestion={(question) => {
          if (editQuestion) {
            setEditQuestion({ question, index: editQuestion.index });
          } else {
            setNewQuestion(question);
          }
        }}
      />
      <AddModuleItemForm
        onSuccess={props.onSuccess}
        onCancel={props.onCancel}
        type={ModuleItemType.QUIZ}
        form={form}
        item={props.quiz}
        validationSchema={CreateQuizBody}
        module={props.module}
        initialValues={initialValues}
      >
        {() => (
          <div className="quiz-details-form">
            <TabLayout stickyHeader>
              <Tab title="Quiz Details">
                <QuizDetails
                  questionModal={questionModal}
                  newQuestion={newQuestion}
                  onEditQuestion={(question, index) => {
                    setEditQuestion({ question, index });
                  }}
                  editedQuestion={editQuestion}
                />
              </Tab>
              <Tab title="Options">
                <QuizOptions />
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

export type CreateQuizFormState = CreateQuizBody;

export default CreateQuizForm;
