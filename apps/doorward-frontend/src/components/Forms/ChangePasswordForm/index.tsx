import React from 'react';
import { ChangePasswordBody } from '../../../services/models/requestBody';
import { UseForm } from '@doorward/ui/hooks/useForm';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import changePasswordForm from './validation';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { updateAccountPasswordAction } from '../../../reducers/users/actions';
import BasicForm from '../BasicForm';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import withContext from '@doorward/ui/hoc/withContext';

const ChangePasswordForm: React.FunctionComponent<ChangePasswordFormProps> = props => {
  const initialValues = {
    password: '',
    confirmPassword: '',
    newPassword: '',
  };

  const state = useSelector((state: State) => state.users.changePassword);

  return (
    <BasicForm
      form={props.form}
      initialValues={initialValues}
      validationSchema={changePasswordForm(!props.dontEnterCurrentPassword)}
      state={props.state || state}
      onCancel={props.onCancel}
      onSuccess={props.onSuccess}
      submitAction={props.submitAction || updateAccountPasswordAction}
      createData={props.createData || (data => [data])}
      showOverlay
    >
      {!props.dontEnterCurrentPassword && <PasswordField name="password" label="Current password" />}
      <PasswordField name="newPassword" label="New password" />
      <PasswordField name="confirmPassword" label="Re-enter password" />
    </BasicForm>
  );
};

export interface ChangePasswordFormState extends ChangePasswordBody {
  confirmPassword: string;
}

export interface ChangePasswordFormProps {
  form: UseForm<ChangePasswordFormState>;
  onSuccess: (result?: any) => void;
  onCancel: () => void;
  state?: WebComponentState<any>;
  submitAction?: ActionCreator;
  dontEnterCurrentPassword?: boolean;
  createData?: (data: ChangePasswordFormState) => Array<any>;
}

const { Context, ContextConsumer } = withContext(ChangePasswordForm, {});

export const ChangePasswordFormContext = Context;

export default ContextConsumer;
