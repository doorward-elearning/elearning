import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../../hooks/usePageResource';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const UpdateStudentGroup: React.FunctionComponent<UpdateStudentGroupProps> = (props): JSX.Element => {
  const [fetchStudents, studentList] = useApiAction(DoorwardApi, (api) => api.students.getAllStudents);
  const [getGroup, groupState] = useApiAction(DoorwardApi, (api) => api.groups.getGroup);
  usePageResource('groupId', getGroup);
  return (
    <CreateGroup
      emptyMessage={translate('noStudentsHaveBeenCreatedYet')}
      title={translate('students')}
      type={Groups.STUDENT}
      state={studentList}
      getUsers={(data) => data.students}
      currentGroupState={groupState}
      actionCreator={fetchStudents}
      actionArgs={[{ noPagination: true }]}
      redirectOnSuccess="studentGroups"
      {...props}
    />
  );
};

export interface UpdateStudentGroupProps extends PageComponent {}

export default UpdateStudentGroup;
