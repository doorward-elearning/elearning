import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import TeacherReportTable from '../../components/Tables/TeacherReportTable';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';

const TeacherListReport: FunctionComponent<TeacherListReportProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.SEARCH_BAR, LayoutFeatures.BREAD_CRUMBS]}
      header={translate('teacherReport')}
    >
      <TeacherReportTable onRowClick={(row) => routes.navigate(routes.teacherReport, { teacherId: row.id })} />
    </Layout>
  );
};

export interface TeacherListReportProps extends PageComponent {}

export default TeacherListReport;
