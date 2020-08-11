import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import { fetchMemberListAction } from '../../../reducers/members/actions';
import CreateGroup from '../CreateGroup';
import { PageComponent } from '@doorward/ui/types';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useRoutes from '../../../hooks/useRoutes';

const CreateMemberGroup: React.FunctionComponent<CreateMemberGroupProps> = (props): JSX.Element => {
  const memberList = useSelector((state: State) => state.members.memberList);
  const routes = useRoutes();
  return (
    <CreateGroup
      emptyMessage="No members have been created yet"
      title={routes.members.name}
      type={Groups.MEMBER}
      state={memberList}
      getUsers={data => data.members}
      actionCreator={fetchMemberListAction}
      actionArgs={[{ limit: Number.MAX_SAFE_INTEGER }]}
      redirectOnSuccess="memberGroups"
      {...props}
    />
  );
};

export interface CreateMemberGroupProps extends PageComponent {}

export default CreateMemberGroup;
