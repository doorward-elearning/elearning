import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@doorward/ui/types';

const MemberGroups: React.FunctionComponent<MemberGroupsProps> = (props): JSX.Element => {
  return (
    <GroupList
      header="Member Groups"
      createRoute="addMemberGroup"
      type={Groups.MEMBER}
      viewRoute="viewMemberGroup"
      updateRoute="updateMemberGroup"
      {...props}
    />
  );
};

export interface MemberGroupsProps extends PageComponent {}

export default MemberGroups;
