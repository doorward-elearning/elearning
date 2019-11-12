import React, { MouseEventHandler } from 'react';
import { UseForm } from '../../../../hooks/useForm';
import { AccountDetailsBody } from '../../../../services/models/requestBody';
import Form from '../../../ui/Form';
import TextField from '../../../ui/Input/TextField';
import { User } from '../../../../services/models';
import IfElse from '../../../ui/IfElse';
import Button from '../../../ui/Buttons/Button';
import Row from '../../../ui/Row';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import useAction from '../../../../hooks/useActions';
import { updateAccountInformationAction } from '../../../../reducers/users/actions';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import profileAccountForm from '../validations/profileAccountForm';

const ProfileAccountForm: React.FunctionComponent<ProfileAccountFormProps> = props => {
  const initialValues: ProfileAccountFormState = {
    ...props.user,
  };

  const updateAccount = useAction(updateAccountInformationAction);

  const state = useSelector((state: State) => state.users.accountInformation);

  const onSubmit = (body: ProfileAccountFormState): void => {
    updateAccount(body);
  };

  useFormSubmit(state, props.stopEditing);

  return (
    <Form
      form={props.form}
      initialValues={initialValues}
      onSubmit={onSubmit}
      editable={props.editing}
      state={state}
      validationSchema={profileAccountForm}
      showOverlay
    >
      <TextField name="firstName" label="First name" />
      <TextField name="lastName" label="Last name" />
      <TextField name="email" label="Email" type="email" />
      <TextField name="username" label="Username" editable={false} />
      <IfElse condition={props.editing}>
        <Row style={{ justifyItems: 'start', justifyContent: 'start' }}>
          <Button theme="success" disabled={state.submitting} type="submit">
            Save
          </Button>
          <Button
            theme="default"
            onClick={(): void => {
              props.form.formikProps.resetForm();
              props.stopEditing();
            }}
          >
            Cancel
          </Button>
        </Row>
      </IfElse>
    </Form>
  );
};

export interface ProfileAccountFormState extends AccountDetailsBody {}

export interface ProfileAccountFormProps {
  form: UseForm<ProfileAccountFormState>;
  user: User;
  editing: boolean;
  stopEditing: () => void;
}

export default ProfileAccountForm;
