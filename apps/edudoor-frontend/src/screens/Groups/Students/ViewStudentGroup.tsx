import React from 'react';
import { PageComponent } from '@edudoor/ui/types';
import ViewGroup from '../ViewGroup';
import useRoutes from '../../../hooks/useRoutes';

const ViewStudentGroup: React.FunctionComponent<ViewStudentGroupProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <ViewGroup
      {...props}
      onEditGroup={group => {
        routes.navigate(routes.updateStudentGroup, {
          groupId: group.id,
        });
      }}
    />
  );
};

export interface ViewStudentGroupProps extends PageComponent {}

export default ViewStudentGroup;
