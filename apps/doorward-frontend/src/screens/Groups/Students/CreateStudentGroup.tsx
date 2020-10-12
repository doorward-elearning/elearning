import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import CreateGroup from '../CreateGroup';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';

const CreateStudentGroup: React.FunctionComponent<CreateStudentGroupProps> = (props): JSX.Element => {
  const studentList = useDoorwardApi((state) => state.students.getAllStudents);
  return (
    <CreateGroup
      emptyMessage="No students have been created yet"
      title="Students"
      type={Groups.STUDENT}
      state={studentList}
      getUsers={(data) => data.students}
      actionCreator={DoorwardApi.students.getAllStudents}
      actionArgs={[{ noPagination: true }]}
      redirectOnSuccess="studentGroups"
      {...props}
    />
  );
};

export interface CreateStudentGroupProps extends PageComponent {}

export default CreateStudentGroup;
