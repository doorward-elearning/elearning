import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import { fetchMemberListAction } from '../../../reducers/members/actions';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../../hooks/usePageResource';
import { fetchGroup } from '../../../reducers/groups/actions';

const UpdateMemberGroup: React.FunctionComponent<UpdateMemberGroupProps> = (props): JSX.Element => {
  usePageResource('groupId', fetchGroup);
  const memberList = useSelector((state: State) => state.members.memberList);
  const group = useSelector((state: State) => state.groups.viewGroup);
  return (
    <CreateGroup
      emptyMessage="No members have been created yet"
      title="Members"
      type={Groups.MEMBER}
      state={memberList}
      getUsers={data => data.members}
      currentGroupState={group}
      actionCreator={fetchMemberListAction}
      actionArgs={[{ limit: 10000 }]}
      redirectOnSuccess="memberGroups"
      {...props}
    />
  );
};

export interface UpdateMemberGroupProps extends PageComponent {}

export default UpdateMemberGroup;
