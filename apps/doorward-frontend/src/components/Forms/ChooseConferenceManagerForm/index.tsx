import React, { useEffect } from 'react';
import ChooseItemsForm from '../ChooseItemsForm';
import { createConferenceManagerAction, registerMembers } from '../../../reducers/conferences/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { fetchModeratorListAction } from '../../../reducers/moderators/actions';
import { User } from '@doorward/common/models/User';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import { ModeratorListResponse } from '../../../services/models/responseBody';

const ChooseConferenceManagerForm: React.FunctionComponent<ChooseConferenceManagerFormProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.conferences.createConferenceManager);

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
      submitAction={createConferenceManagerAction}
      createData={values => [
        props.conferenceId,
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

export interface ChooseConferenceManagerFormProps {
  managers: WebComponentState<ModeratorListResponse>;
  onSuccess: () => void;
  form: UseForm<{ items: Array<User> }>;
  conferenceId: string;
}

export default ChooseConferenceManagerForm;
