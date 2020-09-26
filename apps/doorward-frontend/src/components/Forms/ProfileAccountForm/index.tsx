import React, { useEffect, useState } from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import TextField from '@doorward/ui/components/Input/TextField';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import BasicForm, { BasicFormFeatures, CreateData } from '../BasicForm';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import withContext from '@doorward/ui/hoc/withContext';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';
import { UpdateAccountBody } from '@doorward/common/dtos/body';
import UserEntity from '@doorward/common/entities/user.entity';

const ProfileAccountForm: React.FunctionComponent<ProfileAccountFormProps> = (props) => {
  const initialValues: ProfileAccountFormState = {
    ...props.user,
  };
  const [features, setFeatures] = useState<Array<BasicFormFeatures>>([]);

  const state = useDoorwardApi((state) => state.userProfile.updateAccountDetails);

  useEffect(() => {
    setFeatures(props.editing ? [BasicFormFeatures.SAVE_BUTTON, BasicFormFeatures.CANCEL_BUTTON] : []);
  }, [props.editing]);

  useFormSubmit(state, props.stopEditing);

  const stopEditing = () => {
    if (props.form.formikProps) {
      props.form.formikProps.resetForm();
    }
    props.stopEditing();
  };

  return (
    <BasicForm
      form={props.form}
      initialValues={initialValues}
      editable={props.editing}
      state={props.state || state}
      createData={props.createData}
      onSuccess={stopEditing}
      features={features}
      onCancel={stopEditing}
      submitAction={props.submitAction || DoorwardApi.userProfile.updateAccountDetails}
      validationSchema={UpdateAccountBody}
      showOverlay
    >
      <TextField name="firstName" label="First name" />
      <TextField name="lastName" label="Last name" />
      <TextField name="email" label="Email" type="email" />
      <TextField name="username" label="Username" editable={false} />
    </BasicForm>
  );
};

export interface ProfileAccountFormState extends UpdateAccountBody {}

export interface ProfileAccountFormProps {
  form: UseForm<ProfileAccountFormState>;
  user: UserEntity;
  editing: boolean;
  stopEditing: () => void;
  submitAction?: ActionCreator;
  state?: WebComponentState<any>;
  createData?: CreateData<ProfileAccountFormState>;
}

const { Context, ContextConsumer } = withContext(ProfileAccountForm, {});

export const ProfileAccountFormContext = Context;

export default ContextConsumer;
