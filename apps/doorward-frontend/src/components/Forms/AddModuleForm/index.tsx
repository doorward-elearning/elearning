import React from 'react';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import useAction from '@doorward/ui/hooks/useActions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateModuleBody } from '@doorward/common/dtos/body';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = (props) => {
  const initialValues = {
    title: '',
  };
  const state = useSelector((state: State) => state.courses.createModule);

  const createCourseModule = useAction(DoorwardApi.courses.createCourseModule);

  const onSubmit = (values: AddModuleFormState): void => {
    createCourseModule(props.courseId, values);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      showOverlay
      validationSchema={CreateModuleBody}
      state={state}
      form={props.useForm}
    >
      <TextField name="title" label="Module Name" icon="calendar_view_day" />
    </Form>
  );
};

export interface AddModuleFormState extends CreateModuleBody {}

export interface AddModuleFormProps {
  useForm: UseForm<AddModuleFormState>;
  courseId: string;
}
export default AddModuleForm;
