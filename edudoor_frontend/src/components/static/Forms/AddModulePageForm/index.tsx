import React from 'react';
import { UseForm } from '../../../../hooks/useForm';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import './AddModulePageForm.scss';
import { Module } from '../../../../services/models';
import TextField from '../../../ui/Input/TextField';
import { CourseModuleItemBody } from '../../../../services/models/requestBody';
import validation from './validation';
import AddModuleItemForm from '../AddModuleItemForm';

const AddModulePageForm: React.FunctionComponent<AddModulePageFormProps> = ({
  useForm,
  module,
  onSuccess,
  onCancel,
}) => {
  return (
    <AddModuleItemForm
      onSuccess={onSuccess}
      item={module}
      type="Page"
      onCancel={onCancel}
      validationSchema={validation}
      form={useForm}
    >
      <div className="add-module-page">
        <TextField name="title" placeholder="Title of the page" />
        <DraftTextArea name="content" placeholder="Empty space is boring... Add some content for the page." />
      </div>
    </AddModuleItemForm>
  );
};

export interface AddModulePageFormState extends CourseModuleItemBody {}

export interface AddModulePageFormProps {
  useForm: UseForm<AddModulePageFormState>;
  module: Module;
  onSuccess: () => void;
  onCancel: () => void;
}

export default AddModulePageForm;
