import React from 'react';
import { ChangePasswordBody } from '../../../../services/models/requestBody';
import { UseForm } from '../../../../hooks/useForm';
import Form from '../../../ui/Form';
import PasswordField from '../../../ui/Input/PasswordField';
import Row from '../../../ui/Row';
import Button from '../../../ui/Buttons/Button';
import changePasswordForm from '../validations/changePasswordForm';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import useAction from '../../../../hooks/useActions';
import { updateAccountPasswordAction } from '../../../../reducers/users/actions';
import useFormSubmit from '../../../../hooks/useFormSubmit';

const ChangePasswordForm: React.FunctionComponent<ChangePasswordFormProps> = props => {
  const initialValues = {
    password: '',
    confirmPassword: '',
    newPassword: '',
  };

  const state = useSelector((state: State) => state.users.changePassword);
  const changePassword = useAction(updateAccountPasswordAction);

  const onSubmit = (body: ChangePasswordFormState): void => {
    changePassword(body);
  };

  useFormSubmit(state, () => {
    props.form.formikProps?.resetForm();
    props?.onSuccess();
  });

  return (
    <Form
      form={props.form}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={changePasswordForm}
      state={state}
      showOverlay
    >
      <PasswordField name="password" label="Current password" />
      <PasswordField name="newPassword" label="New password" />
      <PasswordField name="confirmPassword" label="Re-enter password" />
      <Row style={{ justifyContent: 'start' }}>
        <Button theme="success" type="submit" disabled={state.submitting}>
          Save
        </Button>
      </Row>
    </Form>
  );
};

export interface ChangePasswordFormState extends ChangePasswordBody {
  confirmPassword: string;
}

export interface ChangePasswordFormProps {
  form: UseForm<ChangePasswordFormState>;
  onSuccess: () => void;
}

export default ChangePasswordForm;
