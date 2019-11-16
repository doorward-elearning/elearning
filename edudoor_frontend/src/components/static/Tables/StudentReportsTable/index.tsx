import React from 'react';
import Table from '../../../ui/Table';
import TableHeader from '../../../ui/Table/TableHeader';
import { Student } from '../../../../services/models';
import TableBody from '../../../ui/Table/TableBody';
import useRoutes from '../../../../hooks/useRoutes';

const StudentReportsTable: React.FunctionComponent<StudentReportsTableProps> = props => {
  return (
    <Table>
      <TableHeader
        columns={{
          name: 'Name',
          department: 'Department',
          enrollments: 'No of enrollments',
          courses: 'Courses completed',
          grade: 'Average Grade',
        }}
      />
      <TableBody
        data={props.students}
        getCell={(row, index, column) => {
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
  students: Array<Student>;
  onRowClick: (row: Student, index: number) => void;
}

export default StudentReportsTable;
