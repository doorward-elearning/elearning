import React from 'react';
import Groups from '@edudoor/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@edudoor/ui/types';

const TeacherGroups: React.FunctionComponent<TeacherGroupsProps> = (props): JSX.Element => {
  return (
    <GroupList
      header="Teacher Groups"
      createRoute="addTeacherGroup"
      type={Groups.TEACHER}
      viewRoute="viewTeacherGroup"
      {...props}
    />
  );
};

export interface TeacherGroupsProps extends PageComponent {}

export default TeacherGroups;
