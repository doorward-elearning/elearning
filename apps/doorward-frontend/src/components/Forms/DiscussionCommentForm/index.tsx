import React from 'react';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { PostDiscussionCommentBody } from '@doorward/common/dtos/body';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import useForm from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';

const DiscussionCommentForm: React.FunctionComponent<DicussionCommentFormProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.discussionGroups.postComment);
  const form = useForm();

  const initialValues: PostDiscussionCommentBody = {
    comment: '',
  };
  return (
    <BasicForm
      initialValues={initialValues}
      state={state}
      form={form}
      submitAction={DoorwardApi.discussionGroups.postComment}
      features={[BasicFormFeatures.SAVE_BUTTON]}
    >
      <DraftTextArea name="comment" label="" fluid/>
    </BasicForm>
  );
};

export interface DicussionCommentFormProps {}

export default DiscussionCommentForm;
