import React, { useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentReportsTable from '../../components/Tables/StudentReportsTable';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const StudentListReport: React.FunctionComponent<StudentReportsProps> = (props) => {
  const navigation = useNavigation();
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
        onRowClick={({ rowData: student }): void =>
          navigation.navigate(ROUTES.reports.students.view, { studentId: student.id })
        }
      />
    </Layout>
  );
};

export interface StudentReportsProps extends PageComponent {}

export default StudentListReport;
