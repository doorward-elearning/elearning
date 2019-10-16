import React from 'react';
import Layout from '../Layout';
import { PageComponent } from '../../types';

const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  return <Layout {...props}>Hello World</Layout>;
};

export interface DashboardProps extends PageComponent {}

export default Dashboard;
