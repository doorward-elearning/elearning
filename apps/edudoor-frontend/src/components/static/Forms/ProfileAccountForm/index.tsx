import React, { useEffect, useState } from 'react';
import { UseForm } from '../../../../hooks/useForm';
import { AccountDetailsBody } from '../../../../services/models/requestBody';
import TextField from '../../../ui/Input/TextField';
import { User } from '../../../../services/models';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import { updateAccountInformationAction } from '../../../../reducers/users/actions';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import profileAccountForm from './validation';
import BasicForm, { BasicFormFeatures } from '../BasicForm';

const ProfileAccountForm: React.FunctionComponent<ProfileAccountFormProps> = props => {
  const initialValues: ProfileAccountFormState = {
    ...props.user,
  };
  const [features, setFeatures] = useState<Array<BasicFormFeatures>>([]);

  const state = useSelector((state: State) => state.users.accountInformation);

  useEffect(() => {
    setFeatures(props.editing ? [BasicFormFeatures.SAVE_BUTTON, BasicFormFeatures.CANCEL_BUTTON] : []);
  }, [props.editing]);

  useFormSubmit(state, props.stopEditing);

  const stopEditing = () => {
    props.form.formikProps?.resetForm();
    props.stopEditing();
  };

  return (
    <BasicForm
      form={props.form}
      initialValues={initialValues}
      editable={props.editing}
      state={state}
      onSuccess={stopEditing}
      features={features}
      onCancel={stopEditing}
      submitAction={updateAccountInformationAction}
      validationSchema={profileAccountForm}
      showOverlay
    >
      <TextField name="firstName" label="First name" />
      <TextField name="lastName" label="Last name" />
      <TextField name="email" label="Email" type="email" />
      <TextField name="username" label="Username" editable={false} />
    </BasicForm>
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
