import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import { fetchStudentListAction } from '../../../reducers/students/actions';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../../hooks/usePageResource';
import { fetchGroup } from '../../../reducers/groups/actions';

const UpdateStudentGroup: React.FunctionComponent<UpdateStudentGroupProps> = (props): JSX.Element => {
  usePageResource('groupId', fetchGroup);
  const studentList = useSelector((state: State) => state.students.studentList);
  const group = useSelector((state: State) => state.groups.viewGroup);
  return (
    <CreateGroup
      emptyMessage="No members have been created yet"
      title="Members"
      type={Groups.STUDENT}
      state={studentList}
      getUsers={data => data.students}
      currentGroupState={group}
      actionCreator={fetchStudentListAction}
      actionArgs={[{ limit: 10000 }]}
      redirectOnSuccess="studentGroups"
      {...props}
    />
  );
};

export interface UpdateStudentGroupProps extends PageComponent {}

export default UpdateStudentGroup;
