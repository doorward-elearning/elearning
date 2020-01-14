import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';
import GroupsTable from '../../components/Tables/GroupsTable';
import useRoutes from '../../hooks/useRoutes';

const StudentGroups: React.FunctionComponent<StudentGroupsProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      header="Student Groups"
      actionBtnProps={{
        text: 'Add Group',
        onClick: () => {
          routes.navigate(routes.routes.addStudentGroup);
        },
      }}
    >
      <GroupsTable type="students" />
    </Layout>
  );
};

export interface StudentGroupsProps extends PageComponent {}

export default StudentGroups;
