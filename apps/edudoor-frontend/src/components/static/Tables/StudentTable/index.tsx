import React from 'react';
import { Student } from '../../../../services/models';
import Table from '../../../ui/Table';
import Tools from '../../../../utils/Tools';

const StudentTable: React.FunctionComponent<StudentTableProps> = props => {
  return (
    <Table
      className="student-table"
      columns={{
        username: 'Username',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        status: 'Status',
      }}
      data={props.students}
      getCell={(row, index, column): string => Tools.str(row[column as keyof Student])}
    />
  );
};

export interface StudentTableProps {
  students: Array<Student>;
}

export default StudentTable;
