import React from 'react';
import BasicForm from '../BasicForm';
import TextField from '@doorward/ui/components/Input/TextField';
import useForm from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateClassroomBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const AddClassroomForm: React.FunctionComponent<AddClassroomFormProps> = ({
  schoolId,
  onSuccess,
  onCancel,
}): JSX.Element => {
  const [addClassroom, state] = useApiAction(DoorwardApi, (api) => api.schools.addClassroomToSchool);
  const form = useForm();
  return (
    <BasicForm
      submitAction={addClassroom}
      createData={(values) => [schoolId, { ...values }]}
      validationSchema={CreateClassroomBody}
      initialValues={{ name: '' }}
      showSuccessToast
      state={state}
      onSuccess={() => {
        form.formikProps.resetForm();
        onSuccess();
      }}
      negativeText={translate('close')}
      onCancel={onCancel}
      form={form}
    >
      <TextField name="name" placeholder={translate('classroomName')} labelPosition="top" />
    </BasicForm>
  );
};

export interface AddClassroomFormProps {
  schoolId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default AddClassroomForm;
