import React, { FunctionComponent } from 'react';
import BasicForm from '../BasicForm';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { useRouteMatch } from 'react-router';
import { ResetPasswordBody } from '@doorward/common/dtos/body';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const NewPasswordForm: FunctionComponent<NewPasswordFormProps> = (props): JSX.Element => {
  const match: any = useRouteMatch();
  const initialValues: NewPasswordFormState = {
    password: '',
    confirmPassword: '',
    resetToken: match.params.resetToken,
  };
  const apiAction = useApiAction(DoorwardApi, (api) => api.userProfile.resetAccountPassword);

  return (
    <BasicForm
      apiAction={apiAction}
      onSuccess={props.onSuccess}
      initialValues={initialValues}
      validationSchema={ResetPasswordBody}
      showSuccessToast
      showErrorToast
      onCancel={props.onCancel}
      form={props.form}
    >
      <PasswordField name="password" label={translate('password')} />
      <PasswordField name="confirmPassword" label={translate('reEnterPassword')} />
    </BasicForm>
  );
};

export interface NewPasswordFormState extends ResetPasswordBody {
  confirmPassword: string;
}

export interface NewPasswordFormProps {
  form: UseForm<ResetPasswordBody>;
  onCancel?: () => void;
  onSuccess: () => void;
}

export default NewPasswordForm;
