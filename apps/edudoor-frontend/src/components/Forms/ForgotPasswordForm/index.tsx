import React from 'react';
import BasicForm from '../BasicForm';
import { forgotAccountPasswordAction } from '../../../reducers/users/actions';
import * as Yup from 'yup';
import TextField from '@edudoor/ui/components/Input/TextField';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@edudoor/ui/hooks/useForm';
import useRoutes from '../../../hooks/useRoutes';

const ForgotPasswordForm: React.FunctionComponent<ForgotPasswordFormProps> = props => {
  const state = useSelector((state: State) => state.users.forgotPassword);
  const form = useForm();
  const routes = useRoutes();
  return (
    <BasicForm
      submitAction={forgotAccountPasswordAction}
      state={state}
      form={form}
      onCancel={() => routes.navigate(routes.home)}
      validationSchema={Yup.object({
        username: Yup.string().required('Please enter your username'),
      })}
      positiveText="Reset"
      initialValues={{
        username: '',
      }}
    >
      <TextField name="username" label="Username" />
    </BasicForm>
  );
};

export interface ForgotPasswordFormProps {}

export default ForgotPasswordForm;
