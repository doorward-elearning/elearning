import React from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import AssessmentBuilder from './AssessmentBuilder';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';

const AssessmentDetails: React.FunctionComponent<AssessmentDetailsProps> = (props) => {
  return (
    <div className="assessment-details-form">
      <TextField name="title" label="Title" placeholder={translate('titleOfTheModuleItem', { item: props.type })} />
      <AssessmentBuilder {...props} />
    </div>
  );
};

export interface AssessmentDetailsProps {
  type: AssessmentTypes;
  editing?: boolean;
  hasSections?: boolean;
}

export default AssessmentDetails;
