import React from 'react';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import addModuleForm from './validation';
import useAction from '@doorward/ui/hooks/useActions';
import { createConferenceModuleAction, createPollAction } from '../../../reducers/conferences/actions';
import { CreatePollBody } from '../../../services/models/requestBody';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import './CreatePollForm.scss';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { ArrayHelpers, FieldArray } from 'formik';
import Button from '@doorward/ui/components/Buttons/Button';
import Icon from '@doorward/ui/components/Icon';
import Header from '@doorward/ui/components/Header';
import DateInput from '@doorward/ui/components/Input/DateInput';
import moment from 'moment';

const PollChoices: React.FunctionComponent<PollChoicesProps> = ({ arrayHelpers, choices }) => {
  return (
    <div className="poll-choices">
      {choices.map((choice, index) => {
        return (
          <div className="choice" key={index}>
            <TextField name={`choices[${index}]`} />
            {choices.length > 1 && <Icon icon="close" onClick={() => arrayHelpers.remove(index)} />}
          </div>
        );
      })}
      <div>
        <Button
          type="button"
          onClick={() => {
            arrayHelpers.push('');
          }}
        >
          Add Option
        </Button>
      </div>
    </div>
  );
};

const CreatePollForm: React.FunctionComponent<AddModuleFormProps> = props => {
  const initialValues = {
    title: '',
    startDate: new Date(),
    endDate: moment()
      .add(1, 'hour')
      .toDate(),
    choices: [''],
  };
  const state = useSelector((state: State) => state.conferences.createPoll);

  const createConferenceModule = useAction(createPollAction);

  const onSubmit = (values: AddPollFormState): void => {
    createConferenceModule(props.conferenceId, values);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      showOverlay
      formClassName="ed-create-poll-form"
      validationSchema={addModuleForm}
      state={state}
      form={props.useForm}
    >
      {formikProps => {
        return (
          <React.Fragment>
            <TextField name="title" label="Poll" icon="poll" />
            <DateInput minDate={new Date()} showTimeInput name="startDate" label="Start Date" />
            <DateInput minDate={formikProps.values.startDate} showTimeInput name="endDate" label="End Date" />
            <Header size={5}>Options</Header>
            <FieldArray name="choices">
              {fieldArrayProps => {
                return <PollChoices arrayHelpers={fieldArrayProps} choices={fieldArrayProps.form.values.choices} />;
              }}
            </FieldArray>
          </React.Fragment>
        );
      }}
    </Form>
  );
};

export interface AddPollFormState extends CreatePollBody {}

export interface PollChoicesProps {
  arrayHelpers: ArrayHelpers;
  choices: Array<string>;
}

export interface AddModuleFormProps {
  useForm: UseForm<AddPollFormState>;
  conferenceId: string;
}
export default CreatePollForm;
