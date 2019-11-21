import React from 'react';
import { UseForm } from '../../../../hooks/useForm';
import Form from '../../../ui/Form';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import './AddModulePageForm.scss';
import { Module } from '../../../../services/models';
import Button from '../../../ui/Buttons/Button';
import TextField from '../../../ui/Input/TextField';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import { CourseModuleItemBody } from '../../../../services/models/requestBody';
import useAction from '../../../../hooks/useActions';
import { createCourseModuleItemAction } from '../../../../reducers/courses/actions';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import BasicForm from '../BasicForm';
import useRoutes from '../../../../hooks/useRoutes';
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
