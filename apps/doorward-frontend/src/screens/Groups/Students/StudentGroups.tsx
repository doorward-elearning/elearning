import React from 'react';
import Groups from '@doorward/common/utils/GroupTypes';
import GroupList from '../GroupList';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const StudentGroups: React.FunctionComponent<StudentGroupsProps> = (props): JSX.Element => {
  const history = useHistory();
  return (
    <GroupList
      header={translate('studentGroups')}
      createRoute="addStudentGroup"
      type={Groups.STUDENT}
      onGroupClick={(groupId) => history.push(`/groups/students/${groupId}`)}
      onUpdate={(groupId) => history.push(`/groups/students/${groupId}/update`)}
      {...props}
    />
  );
};

export interface StudentGroupsProps extends PageComponent {}

export default StudentGroups;
