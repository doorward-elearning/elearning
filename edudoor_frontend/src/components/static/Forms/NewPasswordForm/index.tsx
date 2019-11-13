import React, { FunctionComponent } from 'react';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import PasswordField from '../../../ui/Input/PasswordField';
import { UseForm } from '../../../../hooks/useForm';
import { CreatePasswordBody } from '../../../../services/models/requestBody';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import { createAccountPasswordAction } from '../../../../reducers/users/actions';
import { useRouteMatch } from 'react-router';
import validation from './validation';

const NewPasswordForm: FunctionComponent<NewPasswordFormProps> = (props): JSX.Element => {
  const match: any = useRouteMatch();
  const initialValues: NewPasswordFormState = {
    password: '',
    confirmPassword: '',
    resetToken: match.params.resetToken,
    resetTokenBuffer: match.params.resetTokenBuffer,
  };
  const state = useSelector((state: State) => state.users.createPassword);

  return (
    <BasicForm
      state={state}
      submitAction={createAccountPasswordAction}
      onSuccess={props.onSuccess}
      initialValues={initialValues}
      validationSchema={validation}
      showSuccessToast
      form={props.form}
      features={[BasicFormFeatures.SAVE_BUTTON]}
    >
      <PasswordField name="password" label="Password" />
      <PasswordField name="confirmPassword" label="Re-enter password" />
    </BasicForm>
  );
};

export interface NewPasswordFormState extends CreatePasswordBody {
  confirmPassword: string;
}

export interface NewPasswordFormProps {
  form: UseForm<CreatePasswordBody>;
  onSuccess: () => void;
}

export default NewPasswordForm;
