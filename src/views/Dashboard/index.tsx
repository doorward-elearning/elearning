import React from 'react';
import Layout from '../Layout';
import { PageComponent } from '../../types';

const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  return <Layout {...props} />;
};

export interface DashboardProps extends PageComponent {}

export default Dashboard;
