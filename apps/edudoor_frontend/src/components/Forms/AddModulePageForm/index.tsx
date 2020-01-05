import React from 'react';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import DraftTextArea from '@edudoor/ui/components/Input/DraftTextArea';
import './AddModulePageForm.scss';
import { Module, ModuleItem } from '../../../../services/models';
import TextField from '@edudoor/ui/components/Input/TextField';
import { CourseModuleItemBody } from '../../../../services/models/requestBody';
import validation from './validation';
import AddModuleItemForm from '../AddModuleItemForm';

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

export interface AddModulePageFormState extends CourseModuleItemBody {}

export interface AddModulePageFormProps<T = any> {
  useForm: UseForm<T>;
  module: Module;
  onSuccess: () => void;
  onCancel: () => void;
  page?: ModuleItem;
}

export default AddModulePageForm;
