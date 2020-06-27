import CreateGroup from '../CreateGroup';
import Groups from '@edudoor/common/utils/GroupTypes';
import { fetchStudentListAction } from '../../../reducers/students/actions';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { PageComponent } from '@edudoor/ui/types';
import usePageResource from '../../../hooks/usePageResource';
import { fetchGroup } from '../../../reducers/groups/actions';

const UpdateStudentGroup: React.FunctionComponent<UpdateStudentGroupProps> = (props): JSX.Element => {
  usePageResource('groupId', fetchGroup);
  const studentList = useSelector((state: State) => state.students.studentList);
  const group = useSelector((state: State) => state.groups.viewGroup);
  return (
    <CreateGroup
      emptyMessage="No students have been created yet"
      title="Students"
      type={Groups.STUDENT}
      state={studentList}
      getUsers={data => data.students}
      currentGroupState={group}
      actionCreator={fetchStudentListAction}
      redirectOnSuccess="studentGroups"
      {...props}
    />
  );
};

export interface UpdateStudentGroupProps extends PageComponent {}

export default UpdateStudentGroup;
