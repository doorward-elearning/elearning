import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import './AddModulePageForm.scss';
import TextField from '@doorward/ui/components/Input/TextField';
import validation from './validation';
import AddModuleItemForm from '../AddModuleItemForm';
import { ForumModuleItemBody } from '../../../services/models/requestBody';
import { Module } from '@doorward/common/models/Module';
import { ModuleItem } from '@doorward/common/models/ModuleItem';

function AddModulePageForm<T extends AddModulePageFormState>({
  useForm,
  module,
  onSuccess,
  page,
  onCancel,
}: AddModulePageFormProps<T>) {
  const initialValues: any = page || {
    title: 'Untitled Page',
    content: null,
  };
  return (
    <AddModuleItemForm
      onSuccess={onSuccess}
      item={module}
      type="Page"
      key={page?.id}
      onCancel={onCancel}
      validationSchema={validation}
      initialValues={initialValues}
      form={useForm}
    >
      <div className="add-module-page">
        <TextField name="title" placeholder="Title of the page" />
        <DraftTextArea name="content" placeholder="Empty space is boring... Add some content for the page." />
      </div>
    </AddModuleItemForm>
  );
}

export interface AddModulePageFormState extends ForumModuleItemBody {}

export interface AddModulePageFormProps<T = any> {
  useForm: UseForm<T>;
  module: Module;
  onSuccess: () => void;
  onCancel: () => void;
  page?: ModuleItem;
}

export default AddModulePageForm;
