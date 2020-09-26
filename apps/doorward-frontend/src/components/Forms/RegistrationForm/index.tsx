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
      title="Register"
      buttonText="Register"
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
        <TextField name="fullName" label="Full Name" placeholder="Enter your full name" />
        <TextField name="username" label="Username" placeholder="Enter your preferred username" />
        <TextField name="email" label="Email" type="email" placeholder="john.doe@email.com" />
        <PasswordField name="password" label="Password" placeholder="Password" />
      </React.Fragment>
    </AuthForm>
  );
};

export interface RegistrationFormProps {}

export interface RegistrationFormState extends RegisterBody {}

export default RegistrationForm;
