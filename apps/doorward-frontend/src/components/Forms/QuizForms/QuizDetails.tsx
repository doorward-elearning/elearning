import React from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import { FormContext } from '@doorward/ui/components/Form';
import QuizQuestions from './QuizQuestions';

const QuizDetails: React.FunctionComponent<QuizDetailsProps> = (props) => {
  return (
    <FormContext.Consumer>
      {({ formikProps }) => (
        <div className="quiz-details-form">
          <TextField name="title" label="Title" placeholder="Title of the Quiz" />
          <DraftTextArea name="instructions" label="Instructions" labelPosition="top" fluid />
          <QuizQuestions />
        </div>
      )}
    </FormContext.Consumer>
  );
};

export interface QuizDetailsProps {}

export default QuizDetails;
