import React from 'react';
import BasicForm from '../BasicForm';
import { createClassroom } from '../../../reducers/schools/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import TextField from '@edudoor/ui/components/Input/TextField';
import useForm from '@edudoor/ui/hooks/useForm';
import validation from './validation';

const AddClassroomForm: React.FunctionComponent<AddClassroomFormProps> = ({
  schoolId,
  onSuccess,
  onCancel,
}): JSX.Element => {
  const state = useSelector((state: State) => state.schools.newClassroom);
  const form = useForm();
  return (
    <BasicForm
      submitAction={createClassroom}
      createData={values => [schoolId, { ...values }]}
      validationSchema={validation}
      initialValues={{ name: '' }}
      showSuccessToast
      state={state}
      onSuccess={() => {
        form.formikProps.resetForm();
        onSuccess();
      }}
      negativeText="Close"
      onCancel={onCancel}
      form={form}
    >
      <TextField name="name" placeholder="Classroom Name" labelPosition="top" />
    </BasicForm>
  );
};

export interface AddClassroomFormProps {
  schoolId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default AddClassroomForm;
