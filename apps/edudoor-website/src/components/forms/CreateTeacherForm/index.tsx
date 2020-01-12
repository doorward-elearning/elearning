import React from 'react';
import BasicForm, { BasicFormFeatures } from '../../../../../edudoor-frontend/src/components/Forms/BasicForm';
import TextField from '@edudoor/ui/components/Input/TextField';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@edudoor/ui/hooks/useForm';
import { initiateFreeTrial } from '../../../reducers/freeTrial/actions';
import validation from './validation';
import PasswordField from '@edudoor/ui/components/Input/PasswordField';

const CreateTeacherForm: React.FunctionComponent<CreateTeacherFormProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.freeTrial.freeTrial);
  const form = useForm();

  return (
    <BasicForm
      state={state}
      onSuccess={props.onSuccess}
      features={[BasicFormFeatures.SAVE_BUTTON]}
      positiveText="Try Edudoor"
      form={form}
      initialValues={{ email: '', password: '', username: '' }}
      submitAction={initiateFreeTrial}
      validationSchema={validation}
    >
      <TextField name="email" placeholder="Email Address" />
      <PasswordField name="password" placeholder="Choose a password" />
      <TextField name="username" placeholder="Username" />
    </BasicForm>
  );
};

export interface CreateTeacherFormProps {
  onSuccess: () => void;
}

export default CreateTeacherForm;
