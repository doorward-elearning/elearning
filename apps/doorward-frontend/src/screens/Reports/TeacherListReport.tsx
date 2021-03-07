import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import TeacherReportTable from '../../components/Tables/TeacherReportTable';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const TeacherListReport: FunctionComponent<TeacherListReportProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.SEARCH_BAR, LayoutFeatures.BREAD_CRUMBS]}
      header={translate('teacherReport')}
    >
      <TeacherReportTable
        onRowClick={({ rowData }) => navigation.navigate(ROUTES.reports.teachers.view, { teacherId: rowData.id })}
      />
    </Layout>
  );
};

export interface TeacherListReportProps extends PageComponent {}

export default TeacherListReport;
