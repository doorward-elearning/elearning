import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../../hooks/usePageResource';
import DoorwardApi from '../../../services/apis/doorward.api';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import translate from '@doorward/common/lang/translate';

const UpdateStudentGroup: React.FunctionComponent<UpdateStudentGroupProps> = (props): JSX.Element => {
  usePageResource('groupId', DoorwardApi.groups.getGroup);
  const studentList = useDoorwardApi((state) => state.students.getAllStudents);
  const group = useDoorwardApi((state) => state.groups.getGroup);
  return (
    <CreateGroup
      emptyMessage={translate.noStudentsHaveBeenCreatedYet()}
      title={translate.students()}
      type={Groups.STUDENT}
      state={studentList}
      getUsers={(data) => data.students}
      currentGroupState={group}
      actionCreator={DoorwardApi.students.getAllStudents}
      actionArgs={[{ noPagination: true }]}
      redirectOnSuccess="studentGroups"
      {...props}
    />
  );
};

export interface UpdateStudentGroupProps extends PageComponent {}

export default UpdateStudentGroup;
