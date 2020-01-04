import React from 'react';
import { ChangePasswordBody } from '../../../services/models/requestBody';
import { UseForm } from '../../../../../../libs/ui/hooks/useForm';
import PasswordField from '../../../../../../libs/ui/components/Input/PasswordField';
import changePasswordForm from './validation';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { updateAccountPasswordAction } from '../../../reducers/users/actions';
import BasicForm from '../BasicForm';

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
      validationSchema={changePasswordForm}
      state={state}
      onCancel={props.onCancel}
      onSuccess={props.onSuccess}
      submitAction={updateAccountPasswordAction}
      createData={data => [data]}
      showOverlay
    >
      <PasswordField name="password" label="Current password" />
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
  onSuccess: () => void;
  onCancel: () => void;
}

export default ChangePasswordForm;
