import React, { useEffect } from 'react';
import ChooseItemsForm from '../ChooseItemsForm';
import { createForumManagerAction, registerMembers } from '../../../reducers/forums/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { fetchModeratorListAction } from '../../../reducers/moderators/actions';
import { User } from '@doorward/common/models/User';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import { ModeratorListResponse } from '../../../services/models/responseBody';

const ChooseForumManagerForm: React.FunctionComponent<ChooseForumManagerFormProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.forums.createForumManager);

  useEffect(() => {
    fetchModeratorListAction();
  }, []);

  return (
    <ChooseItemsForm
      items={props.managers}
      getItems={state1 => state1.data.moderators}
      state={state}
      form={props.form}
      singleChoice
      onSuccess={props.onSuccess}
      submitAction={createForumManagerAction}
      createData={values => [
        props.forumId,
        {
          managerId: values.items.find(x => x.selected)?.id,
        },
      ]}
      columns={{
        username: 'Username',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
      }}
    />
  );
};

export interface ChooseForumManagerFormProps {
  managers: WebComponentState<ModeratorListResponse>;
  onSuccess: () => void;
  form: UseForm<{ items: Array<User> }>;
  forumId: string;
}

export default ChooseForumManagerForm;
