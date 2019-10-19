import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import Empty from '../../components/Empty';

const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER]} header="DASHBOARD">
      <Empty />
    </Layout>
  );
};

export interface DashboardProps extends PageComponent {}

export default Dashboard;
