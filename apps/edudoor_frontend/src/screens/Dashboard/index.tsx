import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../../../../libs/ui/types';
import CourseList from './CourseList';

const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER]} header="DASHBOARD">
      <CourseList />
    </Layout>
  );
};

export interface DashboardProps extends PageComponent {}

export default Dashboard;
