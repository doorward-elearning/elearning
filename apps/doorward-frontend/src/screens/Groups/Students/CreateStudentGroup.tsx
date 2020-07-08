import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import { fetchStudentListAction } from '../../../reducers/students/actions';
import CreateGroup from '../CreateGroup';
import { PageComponent } from '@doorward/ui/types';
import { useSelector } from 'react-redux';
import { State } from '../../../store';

const CreateStudentGroup: React.FunctionComponent<CreateStudentGroupProps> = (props): JSX.Element => {
  const studentList = useSelector((state: State) => state.students.studentList);
  return (
    <CreateGroup
      emptyMessage="No students have been created yet"
      title="Students"
      type={Groups.STUDENT}
      state={studentList}
      getUsers={data => data.students}
      actionCreator={fetchStudentListAction}
      actionArgs={[{ limit: Number.MAX_SAFE_INTEGER }]}
      redirectOnSuccess="studentGroups"
      {...props}
    />
  );
};

export interface CreateStudentGroupProps extends PageComponent {}

export default CreateStudentGroup;