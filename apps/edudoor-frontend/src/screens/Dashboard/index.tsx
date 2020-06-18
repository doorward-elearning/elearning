import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import CourseList from './CourseList';
import { PageComponent } from '@edudoor/ui/types';
import Message from '@edudoor/ui/components/Message';
import Header from '@edudoor/ui/components/Header';
import IfElse from '@edudoor/ui/components/IfElse';
import useQueryParams from '@edudoor/ui/hooks/useQueryParams';
import useRoutes from '../../hooks/useRoutes';

const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  const { query } = useQueryParams();
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER]}
      header="DASHBOARD"
      renderTopContent={() => (
        <IfElse condition={query.newAccount}>
          <Message onClose={() => routes.navigate(routes.dashboard)}>
            <Header size={5}>Thank you for joining Edudoor. </Header>
          </Message>
        </IfElse>
      )}
    >
      <CourseList />
    </Layout>
  );
};

export interface DashboardProps extends PageComponent {}

export default Dashboard;
