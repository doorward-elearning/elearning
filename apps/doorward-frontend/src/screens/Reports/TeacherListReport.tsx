import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import TeacherReportTable from '../../components/Tables/TeacherReportTable';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const TeacherListReport: FunctionComponent<TeacherListReportProps> = (props): JSX.Element => {
  const history = useHistory();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.SEARCH_BAR, LayoutFeatures.BREAD_CRUMBS]}
      header={translate('teacherReport')}
    >
      <TeacherReportTable onRowClick={({ rowData }) => history.push(`/reports/teachers/${rowData.id}`)} />
    </Layout>
  );
};

export interface TeacherListReportProps extends PageComponent {}

export default TeacherListReport;
