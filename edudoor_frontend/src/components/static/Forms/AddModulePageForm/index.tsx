import React from 'react';
import { UseForm } from '../../../../hooks/useForm';
import Form from '../../../ui/Form';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import './AddModulePageForm.scss';
import { Module } from '../../../../services/models';
import Button from '../../../ui/Buttons/Button';
import TextField from '../../../ui/Input/TextField';

const AddModulePageForm: React.FunctionComponent<AddModulePageFormProps> = ({ useForm, module }) => {
  const initialValues = {
    title: '',
    content: '',
  };

  const onSubmit = () => {};

  return (
    <Form form={useForm} initialValues={initialValues} onSubmit={onSubmit}>
      <div className="add-module-page">
        <TextField name="title" placeholder="Title of the page" />
        <DraftTextArea name="page" placeholder="Empty space is boring... Add some content for the page." />
      </div>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export interface AddModulePageFormState {}
export interface AddModulePageFormProps {
  useForm: UseForm<AddModulePageFormState>;
  module: Module;
}

export default AddModulePageForm;
