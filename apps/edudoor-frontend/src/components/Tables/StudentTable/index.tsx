import React from 'react';
import Table from '@edudoor/ui/components/Table';
import Tools from '@edudoor/common/utils/Tools';
import { Student } from '@edudoor/common/models/Student';

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
