import React from 'react';
import Form from '@edudoor/ui/src/components/Form';
import TextField from '@edudoor/ui/src/components/Input/TextField';
import addModuleForm from './validation';
import useAction from '@edudoor/ui/src/hooks/useActions';
import { createCourseModuleAction } from '../../../reducers/courses/actions';
import { CourseModuleBody } from '../../../services/models/requestBody';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { UseForm } from '@edudoor/ui/src/hooks/useForm';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = props => {
  const initialValues = {
    title: '',
  };
  const state = useSelector((state: State) => state.courses.createModule);

  const createCourseModule = useAction(createCourseModuleAction);

  const onSubmit = (values: AddModuleFormState): void => {
    createCourseModule(props.courseId, values);
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

export interface AddModuleFormState extends CourseModuleBody {}

export interface AddModuleFormProps {
  useForm: UseForm<AddModuleFormState>;
  courseId: string;
}
export default AddModuleForm;
