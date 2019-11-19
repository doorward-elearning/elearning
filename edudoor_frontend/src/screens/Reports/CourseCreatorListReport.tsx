import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import CourseCreatorsTable from '../../components/static/Tables/CourseCreatorsTable';

const CourseCreatorListReport: FunctionComponent<CourseCreatorListReportProps> = (props): JSX.Element => {
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.SEARCH_BAR, LayoutFeatures.BREAD_CRUMBS]}
      header="Course Creators Report"
    >
      <CourseCreatorsTable onRowClick={() => {}} />
    </Layout>
  );
};

export interface CourseCreatorListReportProps extends PageComponent {}

export default CourseCreatorListReport;
