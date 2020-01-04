import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../../../../libs/ui/types';
import TeacherReportTable from '../../components/Tables/TeacherReportTable';
import useRoutes from '../../../../../libs/ui/hooks/useRoutes';

const TeacherListReport: FunctionComponent<TeacherListReportProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.SEARCH_BAR, LayoutFeatures.BREAD_CRUMBS]}
      header="Teacher Report"
    >
      <TeacherReportTable onRowClick={row => routes.navigate(routes.teacherReport, { teacherId: row.id })} />
    </Layout>
  );
};

export interface TeacherListReportProps extends PageComponent {}

export default TeacherListReport;
