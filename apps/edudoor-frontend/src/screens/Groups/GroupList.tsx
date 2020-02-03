import React from 'react';
import useRoutes from '../../hooks/useRoutes';
import Layout, { LayoutFeatures } from '../Layout';
import GroupsTable from '../../components/Tables/GroupsTable';
import Groups from '@edudoor/common/utils/GroupTypes';
import { PageComponent } from '@edudoor/ui/types';
import { ROUTES } from '../../routes/routes';

function GroupList({ header, createRoute, type }: GroupListHOCProps): React.FunctionComponent<GroupListProps> {
  return (props): JSX.Element => {
    const routes = useRoutes();
    return (
      <Layout
        {...props}
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
        header={header}
        actionBtnProps={{
          text: 'Add Group',
          onClick: () => {
            routes.navigate(routes.routes[createRoute]);
          },
        }}
      >
        <GroupsTable type={type} />
      </Layout>
    );
  };
}

export interface GroupListHOCProps {
  header: string;
  createRoute: keyof typeof ROUTES;
  type: string;
}

export interface GroupListProps extends PageComponent {}

export default GroupList;
