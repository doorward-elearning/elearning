import React, { FunctionComponent } from 'react';
import Table from '@edudoor/ui/src/components/Table';
import { Student } from '../../../../../../libs/shared/models';
import SimpleWebComponent from '@edudoor/ui/src/components/WebComponent/SimpleWebComponent';
import { fetchStudentReportsList } from '../../../reducers/reports/actions';
import { State } from '../../../store';

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
        getCell={(row, index, column): string => {
          const data = {
            name: row.fullName,
            department: 'Computer Science',
            enrollments: '23',
            courses: '12',
            grade: '12.4',
          };
          return data[column as keyof typeof data];
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
