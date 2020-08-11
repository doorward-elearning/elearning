import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import ConferenceList from './ConferenceList';
import { PageComponent } from '@doorward/ui/types';
import Message from '@doorward/ui/components/Message';
import Header from '@doorward/ui/components/Header';
import IfElse from '@doorward/ui/components/IfElse';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
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
            <Header size={5}>Thank you for joining Doorward. </Header>
          </Message>
        </IfElse>
      )}
    >
      <ConferenceList />
    </Layout>
  );
};

export interface DashboardProps extends PageComponent {}

export default Dashboard;
