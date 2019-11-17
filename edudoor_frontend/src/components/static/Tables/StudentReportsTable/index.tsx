import React from 'react';
import Table from '../../../ui/Table';
import TableHeader from '../../../ui/Table/TableHeader';
import { Student } from '../../../../services/models';
import TableBody from '../../../ui/Table/TableBody';
import SimpleWebComponent, { SimpleWebConsumer } from '../../../ui/WebComponent/SimpleWebComponent';
import { fetchStudentReportsList } from '../../../../reducers/reports/actions';
import { State } from '../../../../store';

const StudentReportsTable: SimpleWebConsumer<StudentReportsTableProps, Array<Student>> = data => {
  return (props): JSX.Element => (
    <Table
      columns={{
        name: 'Name',
        department: 'Department',
        enrollments: 'No of enrollments',
        courses: 'Courses completed',
        grade: 'Average Grade',
      }}
    >
      <TableHeader />
      <TableBody
        data={data}
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
    </Table>
  );
};

export interface StudentReportsTableProps {
  onRowClick: (row: Student, index: number) => void;
}

const result = SimpleWebComponent({
  action: fetchStudentReportsList,
  selector: (state: State) => state.reports.studentReportList,
  data: data => data.students,
})(StudentReportsTable);
export default result;
