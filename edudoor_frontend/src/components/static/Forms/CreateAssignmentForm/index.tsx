import React, { FunctionComponent } from 'react';
import TextField from '../../../ui/Input/TextField';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import { UseForm } from '../../../../hooks/useForm';
import AddModuleItemForm, { AddModuleItemFormState } from '../AddModuleItemForm';
import { Assignment, Module } from '../../../../services/models';
import './CreateAssignmentForm.scss';
import MultipleSwitchField from '../../../ui/Input/MultipleSwitchField';
import DateInput from '../../../ui/Input/DateInput';
import validation from './validation';
import DropdownSelect from '../../../ui/Input/DropdownSelect';
import IfElse from '../../../ui/IfElse';

const CreateAssignmentForm: FunctionComponent<CreateAssignmentFormProps> = (props): JSX.Element => {
  const { formikProps } = props.form;
  const initialValues = {
    content: {
      points: 1,
      submissionTypes: ['Text Entry'],
      dueDate: new Date(),
      assignment: null,
      submissionMedia: '',
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
        <DropdownSelect
          options={{
            online: 'Online',
            offline: 'Offline',
          }}
          icon="subject"
          name="content.submissionMedia"
          label="Submission Type"
        />
        <IfElse condition={formikProps?.values.content.submissionMedia === 'online'}>
          <MultipleSwitchField
            name="content.submissionTypes"
            choices={['Text Entry', 'Website URL', 'Media Recording', 'File Upload']}
            label="Online Submission Type"
          />
        </IfElse>
        <DateInput name="content.dueDate" label="Due date" minDate={new Date()} showTimeSelect />
      </div>
    </AddModuleItemForm>
  );
};

export interface CreateAssignmentFormState extends Omit<AddModuleItemFormState, 'content'>, Assignment {}

export interface CreateAssignmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  form: UseForm<CreateAssignmentFormState>;
  module: Module;
}

export default CreateAssignmentForm;
