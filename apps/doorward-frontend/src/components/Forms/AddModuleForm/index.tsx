import React from 'react';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import addModuleForm from './validation';
import useAction from '@doorward/ui/hooks/useActions';
import { createForumModuleAction } from '../../../reducers/forums/actions';
import { ForumModuleBody } from '../../../services/models/requestBody';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { UseForm } from '@doorward/ui/hooks/useForm';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = props => {
  const initialValues = {
    title: '',
  };
  const state = useSelector((state: State) => state.forums.createModule);

  const createForumModule = useAction(createForumModuleAction);

  const onSubmit = (values: AddModuleFormState): void => {
    createForumModule(props.forumId, values);
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

export interface AddModuleFormState extends ForumModuleBody {}

export interface AddModuleFormProps {
  useForm: UseForm<AddModuleFormState>;
  forumId: string;
}
export default AddModuleForm;
