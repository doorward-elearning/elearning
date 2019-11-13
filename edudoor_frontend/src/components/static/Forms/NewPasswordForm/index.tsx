import React, { FunctionComponent } from 'react';
import BasicForm from '../BasicForm';
import PasswordField from '../../../ui/Input/PasswordField';
import { UseForm } from '../../../../hooks/useForm';
import { ChangePasswordBody } from '../../../../services/models/requestBody';

const NewPasswordForm: FunctionComponent<NewPasswordFormProps> = (props): JSX.Element => {
  const initialValues: ChangePasswordBody = {
    password: '',
    newPassword: '',
  };
  return (
    <BasicForm onCancel={} onSuccess={} form={props.form} initialValues={initialValues}>
      <PasswordField name="password" />
      <PasswordField name="confirmPassword" />
    </BasicForm>
  );
};

export interface NewPasswordFormProps {
  form: UseForm<ChangePasswordBody>;
}

export default NewPasswordForm;
