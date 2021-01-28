import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import BasicForm from '../BasicForm';
import withContext from '@doorward/ui/hoc/withContext';
import DoorwardApi from '../../../services/apis/doorward.api';
import { UpdatePasswordBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import { ApiActionCreator, WebComponentState } from 'use-api-action/types/types';

const ChangePasswordForm: React.FunctionComponent<ChangePasswordFormProps> = (props) => {
  const initialValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  const updateAccountPassword = useApiAction(DoorwardApi, (api) => api.userProfile.updateAccountPassword);

  return (
    <BasicForm
      form={props.form}
      initialValues={initialValues}
      validationSchema={new UpdatePasswordBody().validation(!props.dontEnterCurrentPassword)}
      apiAction={updateAccountPassword}
      state={props.state}
      onCancel={props.onCancel}
      onSuccess={props.onSuccess}
      submitAction={props.submitAction}
      createData={props.createData || ((data) => [data])}
      showOverlay
    >
      {!props.dontEnterCurrentPassword && <PasswordField name="password" label={translate('currentPassword')} />}
      <PasswordField name="newPassword" label={translate('newPassword')} />
      <PasswordField name="confirmPassword" label={translate('reEnterPassword')} />
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
  submitAction?: ApiActionCreator;
  dontEnterCurrentPassword?: boolean;
  createData?: (data: ChangePasswordFormState) => Array<any>;
}

const { Context, ContextConsumer } = withContext(ChangePasswordForm, {});

export const ChangePasswordFormContext = Context;

export default ContextConsumer;
