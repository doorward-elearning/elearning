import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const TeacherGroups: React.FunctionComponent<TeacherGroupsProps> = (props): JSX.Element => {
  const history = useHistory();
  return (
    <GroupList
      header={translate('teacherGroups')}
      createRoute="addTeacherGroup"
      type={Groups.TEACHER}
      onGroupClick={groupId => history.push(`/groups/teachers/${groupId}`)}
      {...props}
    />
  );
};

export interface TeacherGroupsProps extends PageComponent {}

export default TeacherGroups;
