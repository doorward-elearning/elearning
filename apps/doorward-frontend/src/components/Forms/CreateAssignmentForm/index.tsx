import React, { FunctionComponent } from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import { UseForm } from '@doorward/ui/hooks/useForm';
import AddModuleItemForm, { AddModuleItemFormState } from '../AddModuleItemForm';
import './CreateAssignmentForm.scss';
import MultipleSwitchField from '@doorward/ui/components/Input/MultipleSwitchField';
import DateInput from '@doorward/ui/components/Input/DateInput';
import DropdownSelect from '@doorward/ui/components/Input/DropdownSelect';
import IfElse from '@doorward/ui/components/IfElse';
import Row from '@doorward/ui/components/Row';
import Header from '@doorward/ui/components/Header';
import { Omit } from '@doorward/common/types';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CreateAssignmentBody } from '@doorward/common/dtos/body';

const CreateAssignmentForm: FunctionComponent<CreateAssignmentFormProps> = (props): JSX.Element => {
  const initialValues = props.assignment
    ? {
        ...props.assignment,
        content: JSON.parse(props.assignment.content),
      }
    : {
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
      type={ModuleItemType.ASSIGNMENT}
      form={props.form}
      item={props.module}
      validationSchema={CreateAssignmentBody}
      initialValues={initialValues}
    >
      {(formikProps) => (
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

export interface CreateAssignmentFormState extends AddModuleItemFormState, Omit<ModuleItemEntity, 'content'> {}

export interface CreateAssignmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  form: UseForm<CreateAssignmentFormState>;
  module: ModuleEntity;
  assignment?: ModuleItemEntity;
}

export default CreateAssignmentForm;
