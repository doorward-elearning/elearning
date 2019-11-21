import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import CourseCreatorsTable from '../../components/static/Tables/CourseCreatorsTable';
import useRoutes from '../../hooks/useRoutes';

const CourseCreatorListReport: FunctionComponent<CourseCreatorListReportProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.SEARCH_BAR, LayoutFeatures.BREAD_CRUMBS]}
      header="Course Creators Report"
    >
      <CourseCreatorsTable onRowClick={row => routes.navigate(routes.teacherReport, { teacherId: row.id })} />
    </Layout>
  );
};

export interface CourseCreatorListReportProps extends PageComponent {}

export default CourseCreatorListReport;
