import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import { fetchStudentReportsList } from '../../../reducers/reports/actions';
import { State } from '../../../store';
import { Student } from '@doorward/common/models/Student';

const StudentReportsTable: FunctionComponent<StudentReportsTableProps> = (props): JSX.Element => (
  <SimpleWebComponent
    action={fetchStudentReportsList}
    selector={(state: State) => state.reports.studentReportList}
    dataSelector={data => data.students}
  >
    {(data): JSX.Element => (
      <Table
        searchText={props.filter}
        filter={(data1, text): typeof data1 =>
          data1.filter((student: Student) => {
            return new RegExp(text, 'ig').test(student.fullName);
          })
        }
        data={data}
        columns={{
          name: 'Name',
          department: 'Department',
          enrollments: 'No of enrollments',
          courses: 'Courses completed',
          grade: 'Average Grade',
        }}
        getCell={row => {
          return {
            name: row.fullName,
            department: 'Computer Science',
            enrollments: '23',
            courses: '12',
            grade: '12.4',
          };
        }}
        onRowClick={props.onRowClick}
      />
    )}
  </SimpleWebComponent>
);

export interface StudentReportsTableProps {
  onRowClick: (row: Student, index: number) => void;
  filter?: string;
}
export default StudentReportsTable;
