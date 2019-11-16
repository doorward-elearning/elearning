import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import { State } from '../../store';
import StudentReportsTable from '../../components/static/Tables/StudentReportsTable';
import { fetchStudentReportsList } from '../../reducers/reports/actions';
import useRoutes from '../../hooks/useRoutes';
import SimpleWebComponent from '../../components/ui/WebComponent/SimpleWebComponent';
import { WebComponentState } from '../../reducers/reducers';
import { StudentListResponse } from '../../services/models/responseBody';

const StudentListReport: React.FunctionComponent<StudentReportsProps> = props => {
  const routes = useRoutes();
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]} header="Student Reports">
      <SimpleWebComponent
        action={fetchStudentReportsList}
        selector={(state: State): WebComponentState<StudentListResponse> => state.reports.studentReportList}
        data={data => data.students}
      >
        {(students): JSX.Element => (
          <StudentReportsTable
            students={students}
            onRowClick={(student): void => routes.navigate(routes.studentReport, { studentId: student.id })}
          />
        )}
      </SimpleWebComponent>
    </Layout>
  );
};

export interface StudentReportsProps extends PageComponent {}

export default StudentListReport;
