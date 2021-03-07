import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const TeacherGroups: React.FunctionComponent<TeacherGroupsProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <GroupList
      header={translate('teacherGroups')}
      createRoute={ROUTES.groups.teachers.create}
      type={Groups.TEACHER}
      onGroupClick={(groupId) => navigation.navigate(ROUTES.groups.teachers.view, { groupId })}
      {...props}
    />
  );
};

export interface TeacherGroupsProps extends PageComponent {}

export default TeacherGroups;
