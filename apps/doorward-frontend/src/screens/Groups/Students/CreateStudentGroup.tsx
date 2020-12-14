import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import CreateGroup from '../CreateGroup';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';

const CreateStudentGroup: React.FunctionComponent<CreateStudentGroupProps> = (props): JSX.Element => {
  const studentList = useDoorwardApi((state) => state.students.getAllStudents);
  return (
    <CreateGroup
      emptyMessage={translate('noStudentsHaveBeenCreatedYet')}
      title={translate('students')}
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
