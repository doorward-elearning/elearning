import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import StudentReportsTable from '../../components/static/Tables/StudentReportsTable';
import useRoutes from '../../hooks/useRoutes';
import { Student } from '../../services/models';

const StudentListReport: React.FunctionComponent<StudentReportsProps> = props => {
  const routes = useRoutes();
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]} header="Student Reports">
      <StudentReportsTable
        onRowClick={(student: Student): void => routes.navigate(routes.studentReport, { studentId: student.id })}
      />
    </Layout>
  );
};

export interface StudentReportsProps extends PageComponent {}

export default StudentListReport;
