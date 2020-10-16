import React from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import QuizBuilder from './QuizBuilder';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import { UseModal } from '@doorward/ui/hooks/useModal';
import { CreateQuestionBody } from '@doorward/common/dtos/body';

const QuizDetails: React.FunctionComponent<QuizDetailsProps> = (props) => {
  return (
    <div className="quiz-details-form">
      <TextField name="title" label="Title" placeholder="Title of the Quiz" />
      <DraftTextArea name="instructions" label="Instructions" labelPosition="top" fluid shy />
      <QuizBuilder {...props} />
    </div>
  );
};

export interface QuizDetailsProps {
  questionModal: UseModal;
  newQuestion: CreateQuestionBody;
  onEditQuestion: (question: CreateQuestionBody, index: number) => void;
  editedQuestion: { question: CreateQuestionBody; index: number };
}

export default QuizDetails;
