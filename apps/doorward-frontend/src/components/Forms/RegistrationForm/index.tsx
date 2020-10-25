import React, { FunctionComponent } from 'react';
import AuthForm from '../AuthForm';
import TextField from '@doorward/ui/components/Input/TextField';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@doorward/ui/hooks/useForm';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import { RegisterBody } from '@doorward/common/dtos/body';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';

const RegistrationForm: FunctionComponent<RegistrationFormProps> = (props): JSX.Element => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
  const state = useDoorwardApi((state) => state.auth.register);
  const form = useForm();
  return (
    <AuthForm
      title={translate.register()}
      buttonText={translate.register()}
      submitAction={DoorwardApi.auth.register}
      state={state}
      form={form}
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
        <TextField name="fullName" label={translate.fullName()} />
        <TextField name="username" label={translate.username()} />
        <TextField name="email" label={translate.email()} type="email" />
        <PasswordField name="password" label={translate.password()} />
      </React.Fragment>
    </AuthForm>
  );
};

export interface RegistrationFormProps {}

export interface RegistrationFormState extends RegisterBody {}

export default RegistrationForm;
