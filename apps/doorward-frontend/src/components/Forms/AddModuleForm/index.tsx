import React from 'react';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateModuleBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = (props) => {
  const initialValues = {
    title: '',
  };

  const createCourseModule = useApiAction(DoorwardApi, api => api.courses.createCourseModule);

  const onSubmit = (values: AddModuleFormState): void => {
    createCourseModule.action(props.courseId, values);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      showOverlay
      validationSchema={CreateModuleBody}
      state={createCourseModule.state}
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
