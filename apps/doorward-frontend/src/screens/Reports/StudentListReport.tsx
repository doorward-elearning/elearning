import React, { useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentReportsTable from '../../components/Tables/StudentReportsTable';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const StudentListReport: React.FunctionComponent<StudentReportsProps> = (props) => {
  const history = useHistory();
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
        onRowClick={({ rowData: student }): void => history.push(`/reports/students/${student.id}`)}
      />
    </Layout>
  );
};

export interface StudentReportsProps extends PageComponent {}

export default StudentListReport;
