import React from 'react';
import { Student } from '../../../../services/models';
import Table from '../../../ui/Table';
import TableHeader from '../../../ui/Table/TableHeader';
import TableBody from '../../../ui/Table/TableBody';
import Tools from '../../../../utils/Tools';

const StudentTable: React.FunctionComponent<StudentTableProps> = props => {
  return (
    <Table className="student-table">
      <TableHeader
        columns={{
          username: 'Username',
          firstName: 'First name',
          lastName: 'Last name',
          email: 'Email',
          status: 'Status',
        }}
      />
      <TableBody
        data={props.students}
        getCell={(row, index, column): string => Tools.str(row[column as keyof Student])}
      />
    </Table>
  );
};

export interface StudentTableProps {
  students: Array<Student>;
}

export default StudentTable;
