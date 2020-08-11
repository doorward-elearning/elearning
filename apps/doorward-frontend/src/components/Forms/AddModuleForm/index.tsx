import React from 'react';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import addModuleForm from './validation';
import useAction from '@doorward/ui/hooks/useActions';
import { createConferenceModuleAction } from '../../../reducers/conferences/actions';
import { ConferenceModuleBody } from '../../../services/models/requestBody';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { UseForm } from '@doorward/ui/hooks/useForm';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = props => {
  const initialValues = {
    title: '',
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
      validationSchema={addModuleForm}
      state={state}
      form={props.useForm}
    >
      <TextField name="title" label="Module Name" icon="calendar_view_day" />
    </Form>
  );
};

export interface AddModuleFormState extends ConferenceModuleBody {}

export interface AddModuleFormProps {
  useForm: UseForm<AddModuleFormState>;
  conferenceId: string;
}
export default AddModuleForm;
