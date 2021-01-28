import React from 'react';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateModuleBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = (props) => {
  const initialValues = {
    title: '',
  };

  const [createCourseModule, state] = useApiAction(DoorwardApi, (api) => api.courses.createCourseModule);

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
      <TextField name="title" label={translate('moduleName')} icon="calendar_view_day" />
    </Form>
  );
};

export interface AddModuleFormState extends CreateModuleBody {}

export interface AddModuleFormProps {
  useForm: UseForm<AddModuleFormState>;
  courseId: string;
}
export default AddModuleForm;
