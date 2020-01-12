import React from 'react';
import BasicForm from '../../../../../edudoor-frontend/src/components/Forms/BasicForm';
import TextField from '@edudoor/ui/components/Input/TextField';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@edudoor/ui/hooks/useForm';
import { initiateFreeTrial } from '../../../reducers/freeTrial/actions';
import validation from './validation';

const CreateTeacherForm: React.FunctionComponent<CreateTeacherFormProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.freeTrial.freeTrial);
  const form = useForm();
  return (
    <BasicForm
      state={state}
      form={form}
      initialValues={{ email: '', password: '', fullName: '' }}
      submitAction={initiateFreeTrial}
      validationSchema={validation}
    >
      <TextField name="email" placeholder="Email Address" />
      <TextField name="password" placeholder="Choose a password" />
      <TextField name="fullName" placeholder="Your Name" />
    </BasicForm>
  );
};

export interface CreateTeacherFormProps {}

export default CreateTeacherForm;
