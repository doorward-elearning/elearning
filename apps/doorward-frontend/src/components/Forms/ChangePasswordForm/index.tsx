import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import BasicForm from '../BasicForm';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import withContext from '@doorward/ui/hoc/withContext';
import DoorwardApi from '../../../services/apis/doorward.api';
import { UpdatePasswordBody } from '@doorward/common/dtos/body';

const ChangePasswordForm: React.FunctionComponent<ChangePasswordFormProps> = (props) => {
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
      validationSchema={new UpdatePasswordBody().validation(!props.dontEnterCurrentPassword)}
      state={props.state || state}
      onCancel={props.onCancel}
      onSuccess={props.onSuccess}
      submitAction={props.submitAction || DoorwardApi.userProfile.updateAccountPassword}
      createData={props.createData || ((data) => [data])}
      showOverlay
    >
      {!props.dontEnterCurrentPassword && <PasswordField name="password" label="Current password" />}
      <PasswordField name="newPassword" label="New password" />
      <PasswordField name="confirmPassword" label="Re-enter password" />
    </BasicForm>
  );
};

export interface ChangePasswordFormState extends UpdatePasswordBody {
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
