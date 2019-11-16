import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';

const StudentReport: React.FunctionComponent<StudentReportProps> = props => {
  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="Moses Gitau">
      Hi
    </Layout>
  );
};

export interface StudentReportProps extends PageComponent {}

export default StudentReport;
