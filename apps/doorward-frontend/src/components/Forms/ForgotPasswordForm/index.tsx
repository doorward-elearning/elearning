import React from 'react';
import BasicForm from '../BasicForm';
import * as Yup from 'yup';
import TextField from '@doorward/ui/components/Input/TextField';
import useForm from '@doorward/ui/hooks/useForm';
import useRoutes from '../../../hooks/useRoutes';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const ForgotPasswordForm: React.FunctionComponent<ForgotPasswordFormProps> = (props) => {
  const form = useForm();
  const routes = useRoutes();
  const apiAction = useApiAction(DoorwardApi, (api) => api.userProfile.forgotAccountPassword);

  return (
    <BasicForm
      apiAction={apiAction}
      form={form}
      onCancel={() => routes.navigate(routes.home)}
      validationSchema={Yup.object({
        username: Yup.string().required(translate('usernameIsRequired')),
      })}
      onSuccess={() => routes.navigate(routes.login)}
      showSuccessToast
      showErrorToast
      positiveText={translate('reset')}
      initialValues={{
        username: '',
      }}
    >
      <TextField name="username" label={translate('username')} />
    </BasicForm>
  );
};

export interface ForgotPasswordFormProps {}

export default ForgotPasswordForm;
