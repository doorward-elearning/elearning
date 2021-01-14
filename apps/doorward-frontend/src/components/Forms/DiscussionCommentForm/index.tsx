import React from 'react';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { PostDiscussionCommentBody } from '@doorward/common/dtos/body';
import useForm from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const DiscussionCommentForm: React.FunctionComponent<DicussionCommentFormProps> = (props): JSX.Element => {
  const postComment = useApiAction(DoorwardApi, (api) => api.discussionGroups.postComment);
  const form = useForm();

  const initialValues: PostDiscussionCommentBody = {
    comment: '',
  };
  return (
    <BasicForm
      initialValues={initialValues}
      apiAction={postComment}
      form={form}
      features={[BasicFormFeatures.SAVE_BUTTON]}
    >
      <DraftTextArea name="comment" label="" fluid />
    </BasicForm>
  );
};

export interface DicussionCommentFormProps {}

export default DiscussionCommentForm;
