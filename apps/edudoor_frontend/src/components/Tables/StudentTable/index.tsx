import React from 'react';
import { Student } from '../../../../../../libs/shared/models';
import Table from '@edudoor/ui/src/components/Table';
import Tools from '@edudoor/ui/src/utils/Tools';

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
