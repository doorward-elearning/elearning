import React, { FunctionComponent } from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import { UseForm } from '@doorward/ui/hooks/useForm';
import AddModuleItemForm from '../AddModuleItemForm';
import './CreateAssignmentForm.scss';
import MultipleSwitchField from '@doorward/ui/components/Input/MultipleSwitchField';
import DateInput from '@doorward/ui/components/Input/DateInput';
import DropdownSelect from '@doorward/ui/components/Input/DropdownSelect';
import IfElse from '@doorward/ui/components/IfElse';
import Row from '@doorward/ui/components/Row';
import Header from '@doorward/ui/components/Header';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CreateAssignmentBody } from '@doorward/common/dtos/body';
import { AssignmentSubmissionMedia, AssignmentSubmissionType } from '@doorward/common/types/courses';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';
import translate from '@doorward/common/lang/translate';

const defaultAssignment = {
  title: translate('unnamedAssignment'),
  type: ModuleItemType.ASSIGNMENT,
  assignment: null,
  options: {
    points: 1,
    submissionTypes: [AssignmentSubmissionType.TEXT_ENTRY],
    dueDate: new Date(),
    assignment: null,
    submissionMedia: AssignmentSubmissionMedia.ONLINE,
    availability: {
      from: new Date(),
      to: null,
    },
  },
};

const CreateAssignmentForm: FunctionComponent<CreateAssignmentFormProps> = (props): JSX.Element => {
  const initialValues = props.assignment || defaultAssignment;

  return (
    <AddModuleItemForm
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      type={ModuleItemType.ASSIGNMENT}
      form={props.form}
      module={props.module}
      item={props.assignment}
      validationSchema={CreateAssignmentBody}
      initialValues={initialValues}
    >
      {(formikProps) => (
        <div className="add-course-assignment">
          <TextField name="title" placeholder={translate('titleOfTheAssignment')} label={translate('title')} />
          <DraftTextArea
            fluid
            name="assignment"
            placeholder={translate('emptySpaceIsBoringAddSomeContent')}
          />
          <TextField
            name="options.points"
            placeholder={translate('numberOfPoints')}
            type="number"
            label={translate('points')}
            max={10}
            min={1}
          />
          <DropdownSelect
            options={{
              [AssignmentSubmissionMedia.ONLINE]: translate('online'),
              [AssignmentSubmissionMedia.OFFLINE]: translate('offline'),
            }}
            icon="subject"
            name="options.submissionMedia"
            label={translate('submissionType')}
          />
          <IfElse condition={formikProps?.values.options.submissionMedia === AssignmentSubmissionMedia.ONLINE}>
            <MultipleSwitchField
              name="options.submissionTypes"
              choices={Object.values(AssignmentSubmissionType)}
              label={translate('onlineSubmissionTypes')}
            />
          </IfElse>
          <div style={{ maxWidth: '500px' }}>
            <Header size={3}>{translate('availability')}</Header>
            <DateInput name="options.dueDate" label={translate('dueDate')} minDate={new Date()} showTimeSelect />
            <Row>
              <DateInput
                name="options.availability.from"
                shortDate
                label={translate('availableFrom')}
                minDate={new Date()}
                showTimeSelect
              />
              <DateInput
                name="options.availability.to"
                shortDate
                label={translate('availableTo')}
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

export interface CreateAssignmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  form: UseForm<CreateAssignmentBody>;
  module: ModuleEntity;
  assignment?: AssignmentEntity;
}

export default CreateAssignmentForm;
