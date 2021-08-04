import React from 'react';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { PostDiscussionCommentBody } from '@doorward/common/dtos/body';
import useForm from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import translate from '@doorward/common/lang/translate';

const DiscussionCommentForm: React.FunctionComponent<DiscussionCommentFormProps> = (props): JSX.Element => {
  const postComment = useApiAction(DoorwardApi, (api) => api.discussionGroups.postComment);
  const form = useForm();

  const initialValues: PostDiscussionCommentBody = {
    comment: '',
  };
  return (
    <BasicForm
      initialValues={initialValues}
      apiAction={postComment}
      positiveText={translate('postComment')}
      form={form}
      features={[BasicFormFeatures.SAVE_BUTTON]}
    >
      <DraftTextArea name="comment" label="" fluid shy />
    </BasicForm>
  );
};

export interface DiscussionCommentFormProps {}

export default DiscussionCommentForm;
