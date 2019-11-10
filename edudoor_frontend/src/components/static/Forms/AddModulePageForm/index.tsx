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

const AddModulePageForm: React.FunctionComponent<AddModulePageFormProps> = ({ useForm, module, onSuccess }) => {
  const initialValues: AddModulePageFormState = {
    title: '',
    content: {},
    type: 'Page',
  };

  const state = useSelector((state: State) => state.courses.addModuleItem);
  const createItem = useAction(createCourseModuleItemAction);

  const onSubmit = (values: AddModulePageFormState): void => {
    createItem(module.courseId, module.id, values);
  };

  useFormSubmit(state, onSuccess);

  return (
    <Form form={useForm} initialValues={initialValues} onSubmit={onSubmit} state={state} showOverlay>
      <div className="add-module-page">
        <TextField name="title" placeholder="Title of the page" />
        <DraftTextArea name="page" placeholder="Empty space is boring... Add some content for the page." />
      </div>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export interface AddModulePageFormState extends CourseModuleItemBody {}
export interface AddModulePageFormProps {
  useForm: UseForm<AddModulePageFormState>;
  module: Module;
  onSuccess?: () => void;
}

export default AddModulePageForm;
