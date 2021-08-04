import React, { useEffect } from 'react';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../../../services/apis/doorward.api';
import { useRouteMatch } from 'react-router-dom';
import CreateGroup from '../CreateGroup';
import translate from '@doorward/common/lang/translate';
import Groups from '@doorward/common/utils/GroupTypes';
import ROUTES from '@doorward/common/frontend/routes/main';
import { PageComponent } from '@doorward/ui/types';

const UpdateTeacherGroup: React.FunctionComponent<UpdateTeacherGroupProps> = (props): JSX.Element => {
  const [fetchTeachers, teacherList] = useApiAction(DoorwardApi, (api) => api.teachers.getAllTeachers);
  const [getGroup, groupState] = useApiAction(DoorwardApi, (api) => api.groups.getGroup);

  const {
    params: { groupId },
  } = useRouteMatch<{ groupId: string }>();

  useEffect(() => {
    if (groupId) {
      getGroup(groupId);
    }
  }, [groupId]);

  return (
    <CreateGroup
      emptyMessage={translate('noTeachersHaveBeenCreatedYet')}
      title={translate('teachers')}
      type={Groups.TEACHER}
      state={teacherList}
      getUsers={(data) => data?.teachers}
      currentGroupState={groupState}
      actionCreator={fetchTeachers}
      redirectOnSuccess={ROUTES.groups.teachers.list}
      {...props}
    />
  );
};

export interface UpdateTeacherGroupProps extends PageComponent {}

export default UpdateTeacherGroup;
