import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';

const TeacherGroups: React.FunctionComponent<TeacherGroupsProps> = (props): JSX.Element => {
  return (
    <GroupList
      header={translate.teacherGroups()}
      createRoute="addTeacherGroup"
      type={Groups.TEACHER}
      viewRoute="viewTeacherGroup"
      {...props}
    />
  );
};

export interface TeacherGroupsProps extends PageComponent {}

export default TeacherGroups;
