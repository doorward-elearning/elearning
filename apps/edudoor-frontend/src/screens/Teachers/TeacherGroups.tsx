import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';
import GroupsTable from '../../components/Tables/GroupsTable';
import useRoutes from '../../hooks/useRoutes';
import Groups from '@edudoor/common/utils/GroupTypes';

const TeacherGroups: React.FunctionComponent<TeacherGroupsProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      header="Teacher Groups"
      actionBtnProps={{
        text: 'Add Group',
        onClick: () => {
          routes.navigate(routes.routes.addTeacherGroup);
        },
      }}
    >
      <GroupsTable type={Groups.TEACHER} />
    </Layout>
  );
};

export interface TeacherGroupsProps extends PageComponent {}

export default TeacherGroups;
