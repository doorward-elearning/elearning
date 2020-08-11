import React from 'react';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import addModuleForm from './validation';
import useAction from '@doorward/ui/hooks/useActions';
import { createConferenceModuleAction } from '../../../reducers/conferences/actions';
import { ConferenceModuleBody } from '../../../services/models/requestBody';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import './CreatePollForm.scss';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { ArrayHelpers, FieldArray } from 'formik';
import Button from '@doorward/ui/components/Buttons/Button';
import Icon from '@doorward/ui/components/Icon';
import Header from '@doorward/ui/components/Header';

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
    choices: [''],
  };
  const state = useSelector((state: State) => state.conferences.createModule);

  const createConferenceModule = useAction(createConferenceModuleAction);

  const onSubmit = (values: AddModuleFormState): void => {
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
      <TextField name="title" label="Poll" icon="poll" />
      <Header size={5}>Options</Header>
      <FieldArray name="choices">
        {fieldArrayProps => {
          return <PollChoices arrayHelpers={fieldArrayProps} choices={fieldArrayProps.form.values.choices} />;
        }}
      </FieldArray>
    </Form>
  );
};

export interface AddModuleFormState extends ConferenceModuleBody {}

export interface PollChoicesProps {
  arrayHelpers: ArrayHelpers;
  choices: Array<string>;
}

export interface AddModuleFormProps {
  useForm: UseForm<AddModuleFormState>;
  conferenceId: string;
}
export default CreatePollForm;
