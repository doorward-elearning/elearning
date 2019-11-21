import React, { FunctionComponent, useState } from 'react';
import TextField from '../../../ui/Input/TextField';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import { UseForm } from '../../../../hooks/useForm';
import AddModuleItemForm, { AddModuleItemFormState } from '../AddModuleItemForm';
import { AssignmentSubmissionType, Module } from '../../../../services/models';
import './CreateAssignmentForm.scss';
import MultipleSwitchField from '../../../ui/Input/MultipleSwitchField';
import DateInput from '../../../ui/Input/DateInput';

const CreateAssignmentForm: FunctionComponent<CreateAssignmentFormProps> = (props): JSX.Element => {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <AddModuleItemForm
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      type="Assignment"
      form={props.form}
      item={props.module}
      initialValues={{
        points: 1,
        submissionTypes: ['Text Entry'],
      }}
    >
      <div className="add-course-assignment">
        <TextField name="title" placeholder="Title of the assignment" label="Title" />
        <DraftTextArea
          fluid
          name="content"
          placeholder="Empty space is boring... Add some content for the assignment."
        />
        <TextField name="points" placeholder="Number of points" type="number" label="Points" max={10} min={1} />
        <MultipleSwitchField
          name="submissionTypes"
          choices={['Text Entry', 'Website URL', 'Media Recording', 'File Upload']}
          label="Submission Type"
        />
        <DateInput onChange={setDate} selected={date} />
      </div>
    </AddModuleItemForm>
  );
};

export interface CreateAssignmentFormState extends AddModuleItemFormState {
  points: number;
  submissionType: Array<AssignmentSubmissionType>;
}

export interface CreateAssignmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  form: UseForm<CreateAssignmentFormState>;
  module: Module;
}

export default CreateAssignmentForm;
