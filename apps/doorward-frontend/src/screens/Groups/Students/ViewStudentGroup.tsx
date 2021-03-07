import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import ViewGroup from '../ViewGroup';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const ViewStudentGroup: React.FunctionComponent<ViewStudentGroupProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <ViewGroup
      {...props}
      onEditGroup={(group) => {
        navigation.navigate(ROUTES.groups.students.update, { groupId: group.id });
      }}
    />
  );
};

export interface ViewStudentGroupProps extends PageComponent {}

export default ViewStudentGroup;
