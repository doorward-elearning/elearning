import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@doorward/ui/types';

const ModeratorGroups: React.FunctionComponent<ModeratorGroupsProps> = (props): JSX.Element => {
  return (
    <GroupList
      header="Moderator Groups"
      createRoute="addModeratorGroup"
      type={Groups.MODERATOR}
      viewRoute="viewModeratorGroup"
      {...props}
    />
  );
};

export interface ModeratorGroupsProps extends PageComponent {}

export default ModeratorGroups;
