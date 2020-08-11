import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import ViewGroup from '../ViewGroup';
import useRoutes from '../../../hooks/useRoutes';

const ViewMemberGroup: React.FunctionComponent<ViewMemberGroupProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <ViewGroup
      {...props}
      onEditGroup={group => {
        routes.navigate(routes.updateMemberGroup, {
          groupId: group.id,
        });
      }}
    />
  );
};

export interface ViewMemberGroupProps extends PageComponent {}

export default ViewMemberGroup;
