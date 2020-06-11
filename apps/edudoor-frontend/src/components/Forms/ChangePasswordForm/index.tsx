import React from 'react';
import { ChangePasswordBody } from '../../../services/models/requestBody';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import PasswordField from '@edudoor/ui/components/Input/PasswordField';
import changePasswordForm from './validation';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { updateAccountPasswordAction } from '../../../reducers/users/actions';
import BasicForm from '../BasicForm';
import { ActionCreator } from '@edudoor/ui/reducers/reducers';

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
      state={state}
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
  submitAction?: ActionCreator;
  dontEnterCurrentPassword?: boolean;
  createData?: (data: ChangePasswordFormState) => Array<any>;
}

export default ChangePasswordForm;
