import React, { useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentReportsTable from '../../components/Tables/StudentReportsTable';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';

const StudentListReport: React.FunctionComponent<StudentReportsProps> = (props) => {
  const routes = useRoutes();
  const [search, setSearch] = useState('');
  const onSearch = (text: string) => {
    setSearch(text);
  };
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.SEARCH_BAR]}
      header={translate('studentReports')}
      onSearch={onSearch}
    >
      <StudentReportsTable
        filter={search}
        onRowClick={({ rowData: student }): void => routes.navigate(routes.studentReport, { studentId: student.id })}
      />
    </Layout>
  );
};

export interface StudentReportsProps extends PageComponent {}

export default StudentListReport;
