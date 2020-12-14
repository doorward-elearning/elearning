import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';

const StudentGroups: React.FunctionComponent<StudentGroupsProps> = (props): JSX.Element => {
  return (
    <GroupList
      header={translate('studentGroups')}
      createRoute="addStudentGroup"
      type={Groups.STUDENT}
      viewRoute="viewStudentGroup"
      updateRoute="updateStudentGroup"
      {...props}
    />
  );
};

export interface StudentGroupsProps extends PageComponent {}

export default StudentGroups;
