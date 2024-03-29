import React, { FunctionComponent } from 'react';
import AuthForm from '../AuthForm';
import TextField from '@doorward/ui/components/Input/TextField';
import useForm from '@doorward/ui/hooks/useForm';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import { RegisterBody } from '@doorward/common/dtos/body';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import Tools from '@doorward/common/utils/Tools';
import ROUTES from '@doorward/common/frontend/routes/main';

const RegistrationForm: FunctionComponent<RegistrationFormProps> = (props): JSX.Element => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
  const apiAction = useApiAction(DoorwardApi, (api) => api.auth.register, {
    clearData: true,
    clearErrors: true,
  });
  const form = useForm();
  return (
    <AuthForm
      title={translate('register')}
      buttonText={translate('register')}
      apiAction={apiAction}
      form={form}
      onSuccess={() => {
        window.location.href = Tools.createRoute(ROUTES.auth.login, null, { newAccount: true });
      }}
      validationSchema={RegisterBody}
      createData={(values) => {
        return [
          {
            firstName: values.fullName.split(' ')[0],
            lastName: values.fullName.split(' ').splice(1).join(' '),
            ...values,
          },
        ];
      }}
      initialValues={initialValues}
    >
      <React.Fragment>
        <TextField name="fullName" label={translate('fullName')} />
        <TextField name="username" label={translate('username')} />
        <TextField name="email" label={translate('email')} type="email" />
        <PasswordField name="password" label={translate('password')} />
      </React.Fragment>
    </AuthForm>
  );
};

export interface RegistrationFormProps {}

export interface RegistrationFormState extends RegisterBody {}

export default RegistrationForm;
