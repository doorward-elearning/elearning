import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import { fetchModeratorListAction } from '../../../reducers/moderators/actions';

import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { PageComponent } from '@doorward/ui/types';

const CreateModeratorGroup: React.FunctionComponent<CreateModeratorGroupProps> = (props): JSX.Element => {
  const moderatorList = useSelector((state: State) => state.moderators.moderatorList);
  return (
    <CreateGroup
      emptyMessage={'No moderators have been created yet'}
      title="Moderators"
      type={Groups.MODERATOR}
      state={moderatorList}
      getUsers={data => data.moderators}
      redirectOnSuccess={'moderatorGroups'}
      actionCreator={fetchModeratorListAction}
      {...props}
    />
  );
};

export interface CreateModeratorGroupProps extends PageComponent {}

export default CreateModeratorGroup;
