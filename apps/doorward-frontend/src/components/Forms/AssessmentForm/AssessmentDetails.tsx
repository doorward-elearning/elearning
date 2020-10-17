import React from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import AssessmentBuilder from './AssessmentBuilder';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';

const AssessmentDetails: React.FunctionComponent<AssessmentDetailsProps> = (props) => {
  return (
    <div className="assessment-details-form">
      <TextField name="title" label="Title" placeholder={`Title of the ${props.type}`} />
      <DraftTextArea name="instructions" label="Instructions" labelPosition="top" fluid shy />
      <AssessmentBuilder {...props} />
    </div>
  );
};

export interface AssessmentDetailsProps {
  type: AssessmentTypes;
}

export default AssessmentDetails;
