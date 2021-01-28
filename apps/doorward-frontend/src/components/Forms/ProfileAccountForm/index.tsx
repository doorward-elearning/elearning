import React, { useEffect, useState } from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import TextField from '@doorward/ui/components/Input/TextField';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import BasicForm, { BasicFormFeatures, CreateData } from '../BasicForm';
import withContext from '@doorward/ui/hoc/withContext';
import DoorwardApi from '../../../services/apis/doorward.api';
import { UpdateAccountBody } from '@doorward/common/dtos/body';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import { ApiActionCreator, WebComponentState } from 'use-api-action/types/types';

const ProfileAccountForm: React.FunctionComponent<ProfileAccountFormProps> = (props) => {
  const initialValues: ProfileAccountFormState = {
    ...props.user,
  };
  const [features, setFeatures] = useState<Array<BasicFormFeatures>>([]);

  const apiAction = useApiAction(DoorwardApi, (api) => api.userProfile.updateAccountDetails);

  useEffect(() => {
    setFeatures(props.editing ? [BasicFormFeatures.SAVE_BUTTON, BasicFormFeatures.CANCEL_BUTTON] : []);
  }, [props.editing]);

  useFormSubmit(apiAction[1], props.stopEditing);

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
      state={props.state}
      createData={props.createData}
      onSuccess={stopEditing}
      features={features}
      onCancel={stopEditing}
      submitAction={props.submitAction}
      apiAction={apiAction}
      validationSchema={UpdateAccountBody}
      showOverlay
    >
      <TextField name="firstName" label={translate('firstName')} />
      <TextField name="lastName" label={translate('lastName')} />
      <TextField name="email" type="email" label={translate('email')} />
      <TextField name="phoneNumber" label={translate('phoneNumber')} />
      <TextField name="username" label={translate('username')} editable={false} />
    </BasicForm>
  );
};

export interface ProfileAccountFormState extends UpdateAccountBody {}

export interface ProfileAccountFormProps {
  form: UseForm<ProfileAccountFormState>;
  user: UserEntity;
  editing: boolean;
  stopEditing: () => void;
  submitAction?: ApiActionCreator;
  state?: WebComponentState<any>;
  createData?: CreateData<ProfileAccountFormState>;
}

const { Context, ContextConsumer } = withContext(ProfileAccountForm, {});

export const ProfileAccountFormContext = Context;

export default ContextConsumer;
