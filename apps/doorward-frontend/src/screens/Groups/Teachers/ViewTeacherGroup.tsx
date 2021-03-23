import React from 'react';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ViewGroup from '../ViewGroup';
import ROUTES from '@doorward/common/frontend/routes/main';
import { PageComponent } from '@doorward/ui/types';

const ViewTeacherGroup: React.FunctionComponent<ViewTeacherGroupProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <ViewGroup
      {...props}
      onEditGroup={(group) => {
        navigation.navigate(ROUTES.groups.teachers.update, { groupId: group.id });
      }}
    />
  );
};

export interface ViewTeacherGroupProps extends PageComponent {}

export default ViewTeacherGroup;
