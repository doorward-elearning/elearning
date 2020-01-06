import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import CourseList from './CourseList';
import { PageComponent } from '@edudoor/ui/types';

const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER]} header="DASHBOARD">
      <CourseList />
    </Layout>
  );
};

export interface DashboardProps extends PageComponent {}

export default Dashboard;
