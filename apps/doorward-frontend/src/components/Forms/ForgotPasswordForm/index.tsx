import React from 'react';
import BasicForm from '../BasicForm';
import * as Yup from 'yup';
import TextField from '@doorward/ui/components/Input/TextField';
import useForm from '@doorward/ui/hooks/useForm';
import useRoutes from '../../../hooks/useRoutes';
import DoorwardApi from '../../../services/apis/doorward.api';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import translate from '@doorward/common/lang/translate';

const ForgotPasswordForm: React.FunctionComponent<ForgotPasswordFormProps> = (props) => {
  const state = useDoorwardApi((state) => state.userProfile.forgotAccountPassword);
  const form = useForm();
  const routes = useRoutes();
  return (
    <BasicForm
      submitAction={DoorwardApi.userProfile.forgotAccountPassword}
      state={state}
      form={form}
      onCancel={() => routes.navigate(routes.home)}
      validationSchema={Yup.object({
        username: Yup.string().required(translate.usernameIsRequired()),
      })}
      positiveText={translate.reset()}
      initialValues={{
        username: '',
      }}
    >
      <TextField name="username" label={translate.username()} />
    </BasicForm>
  );
};

export interface ForgotPasswordFormProps {}

export default ForgotPasswordForm;
