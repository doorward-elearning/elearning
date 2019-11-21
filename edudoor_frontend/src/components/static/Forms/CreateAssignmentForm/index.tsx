import React, { FunctionComponent, useState } from 'react';
import TextField from '../../../ui/Input/TextField';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import { UseForm } from '../../../../hooks/useForm';
import AddModuleItemForm, { AddModuleItemFormState } from '../AddModuleItemForm';
import { AssignmentSubmissionType, Module } from '../../../../services/models';
import './CreateAssignmentForm.scss';
import MultipleSwitchField from '../../../ui/Input/MultipleSwitchField';
import DateInput from '../../../ui/Input/DateInput';
import validation from './validation';

const CreateAssignmentForm: FunctionComponent<CreateAssignmentFormProps> = (props): JSX.Element => {
  const initialValues = {
    content: {
      points: 1,
      submissionTypes: ['Text Entry'],
      dueDate: new Date(),
      assignment: null,
    },
  };
  return (
    <AddModuleItemForm
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      type="Assignment"
      form={props.form}
      item={props.module}
      validationSchema={validation}
      initialValues={initialValues}
    >
      <div className="add-course-assignment">
        <TextField name="title" placeholder="Title of the assignment" label="Title" />
        <DraftTextArea
          fluid
          name="content.assignment"
          placeholder="Empty space is boring... Add some content for the assignment."
        />
        <TextField name="content.points" placeholder="Number of points" type="number" label="Points" max={10} min={1} />
        <MultipleSwitchField
          name="content.submissionTypes"
          choices={['Text Entry', 'Website URL', 'Media Recording', 'File Upload']}
          label="Submission Type"
        />
        <DateInput name="content.dueDate" label="Due date" minDate={new Date()} showTimeSelect />
      </div>
    </AddModuleItemForm>
  );
};

export interface CreateAssignmentFormState extends AddModuleItemFormState {
  content: {
    points: number;
    submissionType: Array<AssignmentSubmissionType>;
    dueDate: string;
    assignment: any;
  };
}

export interface CreateAssignmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  form: UseForm<CreateAssignmentFormState>;
  module: Module;
}

export default CreateAssignmentForm;
