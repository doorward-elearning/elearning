import React from 'react';
import { Student } from '../../../../services/models';
import Table from '../../../ui/Table';
import TableHeader from '../../../ui/Table/TableHeader';
import TableBody from '../../../ui/Table/TableBody';

const StudentTable: React.FunctionComponent<StudentTableProps> = props => {
  return (
    <Table className="student-table">
      <TableHeader columns={{ username: 'Username', name: 'Name', email: 'Email', status: 'Status' }} />
      <TableBody
        data={props.students}
        getCell={(row, index, column): string => {
          return row[column as keyof Student] + '';
        }}
      />
    </Table>
  );
};

export interface StudentTableProps {
  students: Array<Student>;
}

export default StudentTable;
