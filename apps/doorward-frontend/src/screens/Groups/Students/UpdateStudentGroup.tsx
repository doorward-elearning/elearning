import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../../hooks/usePageResource';
import DoorwardApi from '../../../services/apis/doorward.api';
import useDoorwardApi from '../../../hooks/useDoorwardApi';

const UpdateStudentGroup: React.FunctionComponent<UpdateStudentGroupProps> = (props): JSX.Element => {
  usePageResource('groupId', DoorwardApi.groups.getGroup);
  const studentList = useDoorwardApi((state) => state.students.getAllStudents);
  const group = useDoorwardApi((state) => state.groups.getGroup);
  return (
    <CreateGroup
      emptyMessage="No students have been created yet"
      title="Students"
      type={Groups.STUDENT}
      state={studentList}
      getUsers={(data) => data.students}
      currentGroupState={group}
      actionCreator={DoorwardApi.students.getAllStudents}
      actionArgs={[{}]}
      redirectOnSuccess="studentGroups"
      {...props}
    />
  );
};

export interface UpdateStudentGroupProps extends PageComponent {}

export default UpdateStudentGroup;
