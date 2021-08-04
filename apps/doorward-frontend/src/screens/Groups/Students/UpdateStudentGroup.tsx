import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import React, { useEffect } from 'react';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { useRouteMatch } from 'react-router';
import ROUTES from '@doorward/common/frontend/routes/main';

const UpdateStudentGroup: React.FunctionComponent<UpdateStudentGroupProps> = (props): JSX.Element => {
  const [fetchStudents, studentList] = useApiAction(DoorwardApi, (api) => api.students.getAllStudents);
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
      emptyMessage={translate('noStudentsHaveBeenCreatedYet')}
      title={translate('students')}
      type={Groups.STUDENT}
      state={studentList}
      getUsers={(data) => data?.students}
      currentGroupState={groupState}
      actionCreator={fetchStudents}
      actionArgs={[{ noPagination: true }]}
      redirectOnSuccess={ROUTES.groups.students.list}
      {...props}
    />
  );
};

export interface UpdateStudentGroupProps extends PageComponent {}

export default UpdateStudentGroup;
