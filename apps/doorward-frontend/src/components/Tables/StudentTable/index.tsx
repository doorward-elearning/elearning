import React from 'react';
import Table, { OnRowClick, TableProps } from '@doorward/ui/components/Table';
import Tools from '@doorward/common/utils/Tools';
import { Student } from '@doorward/common/models/Student';
import { Omit } from '@doorward/common/types';

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
