import React from 'react';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateDiscussionGroupBody } from '@doorward/common/dtos/body';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import TextField from '@doorward/ui/components/Input/TextField';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const AddDiscussionGroupForm: React.FunctionComponent<AddDiscussionGroupFormProps> = (props): JSX.Element => {
  const initialValues = {
    title: '',
    description: '',
  };

  const [createDiscussionGroup, state] = useApiAction(DoorwardApi, (api) => api.discussionGroups.createDiscussionGroup);

  return (
    <BasicForm
      initialValues={initialValues}
      submitAction={createDiscussionGroup}
      state={state}
      onSuccess={props.onSuccess}
      showSuccessToast
      showErrorToast
      form={props.form}
      validationSchema={CreateDiscussionGroupBody}
      features={[BasicFormFeatures.CANCEL_BUTTON, BasicFormFeatures.SAVE_BUTTON]}
      createData={(values) => [props.courseId, values]}
    >
      <TextField name="title" label={translate('title')} icon="forum" />
      <DraftTextArea fluid name="description" label={translate('description')} labelPosition="top" />
    </BasicForm>
  );
};

export interface AddDiscussionGroupFormProps {
  courseId: string;
  onSuccess: () => void;
  form: UseForm<CreateDiscussionGroupBody>;
}

export default AddDiscussionGroupForm;
