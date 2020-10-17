import React from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import AssessmentBuilder from './QuizBuilder';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';

const AssessmentDetails: React.FunctionComponent<QuizDetailsProps> = (props) => {
  return (
    <div className="quiz-details-form">
      <TextField name="title" label="Title" placeholder="Title of the Quiz" />
      <DraftTextArea name="instructions" label="Instructions" labelPosition="top" fluid shy />
      <AssessmentBuilder {...props} />
    </div>
  );
};

export interface QuizDetailsProps {}

export default AssessmentDetails;
