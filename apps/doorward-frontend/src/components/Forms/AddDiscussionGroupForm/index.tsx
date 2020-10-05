import React from 'react';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateDiscussionGroupBody } from '@doorward/common/dtos/body';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import TextField from '@doorward/ui/components/Input/TextField';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';

const AddDiscussionGroupForm: React.FunctionComponent<AddDiscussionGroupFormProps> = (props): JSX.Element => {
  const initialValues = {
    title: '',
    description: '',
  };

  const state = useDoorwardApi((state) => state.discussionGroups.createDiscussionGroup);

  return (
    <BasicForm
      initialValues={initialValues}
      submitAction={DoorwardApi.discussionGroups.createDiscussionGroup}
      state={state}
      onSuccess={props.onSuccess}
      showSuccessToast
      showErrorToast
      form={props.form}
      validationSchema={CreateDiscussionGroupBody}
      features={[BasicFormFeatures.CANCEL_BUTTON, BasicFormFeatures.SAVE_BUTTON]}
      createData={(values) => [props.courseId, values]}
    >
      <TextField name="title" label="Title" icon="forum" />
      <DraftTextArea fluid name="description" label="Description" labelPosition="top" />
    </BasicForm>
  );
};

export interface AddDiscussionGroupFormProps {
  courseId: string;
  onSuccess: () => void;
  form: UseForm<CreateDiscussionGroupBody>;
}

export default AddDiscussionGroupForm;
