import React, { FunctionComponent } from 'react';
import AddModuleItemForm, { AddModuleItemFormState } from '../AddModuleItemForm';
import { Module, Quiz } from '../../../../services/models';
import TextField from '../../../ui/Input/TextField';
import useForm from '../../../../hooks/useForm';
import DraftTextArea from '../../../ui/Input/DraftTextArea';

const QuizDetailsForm: FunctionComponent<QuizDetailsFormProps> = (props): JSX.Element => {
  const initialValues = {
    title: 'Unnamed Quiz',
    content: {
      instructions: '',
    },
  };
  const form = useForm<Omit<AddModuleItemFormState, 'content'> & Quiz>();
  return (
    <AddModuleItemForm
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      type="Quiz"
      form={form}
      item={props.module}
      initialValues={initialValues}
    >
      <TextField name="title" label="Title" placeholder="Title of the Quiz" />
      <DraftTextArea name="content.instructions" label="Instructions" labelPosition="top" fluid />
    </AddModuleItemForm>
  );
};

export interface QuizDetailsFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  module: Module;
}

export default QuizDetailsForm;
