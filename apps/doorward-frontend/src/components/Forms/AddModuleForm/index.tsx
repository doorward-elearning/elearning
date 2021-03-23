import React from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateModuleBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import BasicForm from '../BasicForm';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = (props) => {
  const initialValues = {
    title: '',
  };

  const [createCourseModule, state] = useApiAction(DoorwardApi, (api) => api.courses.createCourseModule);

  return (
    <BasicForm
      showSuccessToast
      showErrorToast
      features={[]}
      initialValues={initialValues}
      submitAction={createCourseModule}
      createData={(values) => [props.courseId, values]}
      showOverlay
      validationSchema={CreateModuleBody}
      onSuccess={props.onSuccess}
      state={state}
      form={props.useForm}
    >
      <TextField name="title" label={translate('moduleName')} icon="calendar_view_day" />
    </BasicForm>
  );
};

export interface AddModuleFormState extends CreateModuleBody {}

export interface AddModuleFormProps {
  useForm: UseForm<AddModuleFormState>;
  courseId: string;
  onSuccess?: () => void;
}
export default AddModuleForm;
