import React from 'react';
import Table, { OnRowClick, TableProps } from '@edudoor/ui/components/Table';
import Tools from '@edudoor/common/utils/Tools';
import { Student } from '@edudoor/common/models/Student';
import { Omit } from '@edudoor/common/types';

const columns = {
  username: 'Username',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  status: 'Status',
};

const StudentTable: React.FunctionComponent<StudentTableProps> = props => {
  return (
    <Table
      {...(props.tableProps || {})}
      className="student-table"
      columns={columns}
      data={props.students}
      onRowClick={props.onClickStudent}
    />
  );
};

export interface StudentTableProps {
  students: Array<Student>;
  tableProps?: Omit<TableProps<Student, typeof columns>, 'columns' | 'data' | 'getCell'>;
  onClickStudent?: OnRowClick<Student>;
}

export default StudentTable;
