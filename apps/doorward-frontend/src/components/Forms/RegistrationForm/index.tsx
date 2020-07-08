import React, { FunctionComponent } from 'react';
import AuthForm from '../AuthForm';
import TextField from '@doorward/ui/components/Input/TextField';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { registerUserAction } from '../../../reducers/login/actions';
import useForm from '@doorward/ui/hooks/useForm';
import { RegistrationBody } from '../../../services/models/requestBody';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import validation from './validation';

const RegistrationForm: FunctionComponent<RegistrationFormProps> = (props): JSX.Element => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
  const state = useSelector((state: State) => state.login.registration);
  const form = useForm();
  return (
    <AuthForm
      title="Register"
      buttonText="Register"
      submitAction={registerUserAction}
      state={state}
      form={form}
      validationSchema={validation}
      createData={values => {
        return [
          {
            firstName: values.fullName.split(' ')[0],
            lastName: values.fullName
              .split(' ')
              .splice(1)
              .join(' '),
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

export interface RegistrationFormState extends RegistrationBody {}

export default RegistrationForm;
