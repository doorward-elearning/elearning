import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import CreateGroup from '../CreateGroup';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const CreateStudentGroup: React.FunctionComponent<CreateStudentGroupProps> = (props): JSX.Element => {
  const [fetchStudents, studentList] = useApiAction(DoorwardApi, (api) => api.students.getAllStudents);
  return (
    <CreateGroup
      emptyMessage={translate('noStudentsHaveBeenCreatedYet')}
      title={translate('students')}
      type={Groups.STUDENT}
      state={studentList}
      getUsers={(data) => data.students}
      actionCreator={fetchStudents}
      actionArgs={[{ noPagination: true }]}
      redirectOnSuccess="studentGroups"
      {...props}
    />
  );
};

export interface CreateStudentGroupProps extends PageComponent {}

export default CreateStudentGroup;
