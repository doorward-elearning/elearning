import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const StudentGroups: React.FunctionComponent<StudentGroupsProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <GroupList
      header={translate('studentGroups')}
      createRoute={ROUTES.groups.students.create}
      type={Groups.STUDENT}
      onGroupClick={(groupId) => navigation.navigate(ROUTES.groups.students.view, { groupId })}
      onUpdate={(groupId) => navigation.navigate(ROUTES.groups.students.update, { groupId })}
      {...props}
    />
  );
};

export interface StudentGroupsProps extends PageComponent {}

export default StudentGroups;
