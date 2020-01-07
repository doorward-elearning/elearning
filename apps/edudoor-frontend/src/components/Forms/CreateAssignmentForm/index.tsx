import React, { FunctionComponent } from 'react';
import TextField from '@edudoor/ui/components/Input/TextField';
import DraftTextArea from '@edudoor/ui/components/Input/DraftTextArea';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import AddModuleItemForm, { AddModuleItemFormState } from '../AddModuleItemForm';
import './CreateAssignmentForm.scss';
import MultipleSwitchField from '@edudoor/ui/components/Input/MultipleSwitchField';
import DateInput from '@edudoor/ui/components/Input/DateInput';
import validation from './validation';
import DropdownSelect from '@edudoor/ui/components/Input/DropdownSelect';
import IfElse from '@edudoor/ui/components/IfElse';
import Row from '@edudoor/ui/components/Row';
import Header from '@edudoor/ui/components/Header';
import { Module } from '@edudoor/common/models/Module';
import { Assignment } from '@edudoor/common/models/Assignment';

const CreateAssignmentForm: FunctionComponent<CreateAssignmentFormProps> = (props): JSX.Element => {
  const initialValues = props.assignment || {
    title: 'Unnamed Assignment',
    type: 'Assignment',
    content: {
      points: 1,
      submissionType: ['Text Entry'],
      dueDate: new Date(),
      assignment: null,
      submissionMedia: 'Offline',
      availability: {
        from: new Date(),
        to: null,
      },
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
      {formikProps => (
        <div className="add-course-assignment">
          <TextField name="title" placeholder="Title of the assignment" label="Title" />
          <DraftTextArea
            fluid
            name="content.assignment"
            placeholder="Empty space is boring... Add some content for the assignment."
          />
          <TextField
            name="content.points"
            placeholder="Number of points"
            type="number"
            label="Points"
            max={10}
            min={1}
          />
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
              name="content.submissionType"
              choices={['Text Entry', 'Website URL', 'Media Recording', 'File Upload']}
              label="Online Submission Type"
            />
          </IfElse>
          <div style={{ maxWidth: '500px' }}>
            <Header size={3}>Availability</Header>
            <DateInput name="content.dueDate" label="Due date" minDate={new Date()} showTimeSelect />
            <Row>
              <DateInput
                name="content.availability.from"
                shortDate
                label="Available from"
                minDate={new Date()}
                showTimeSelect
              />
              <DateInput
                name="content.availability.to"
                shortDate
                label="Available until"
                minDate={new Date()}
                showTimeSelect
              />
            </Row>
          </div>
        </div>
      )}
    </AddModuleItemForm>
  );
};

export interface CreateAssignmentFormState extends Omit<AddModuleItemFormState, 'content'>, Assignment {}

export interface CreateAssignmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  form: UseForm<CreateAssignmentFormState>;
  module: Module;
  assignment?: Assignment;
}

export default CreateAssignmentForm;
