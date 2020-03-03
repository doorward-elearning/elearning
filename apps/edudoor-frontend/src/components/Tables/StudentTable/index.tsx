import React from 'react';
import Table, { TableProps } from '@edudoor/ui/components/Table';
import Tools from '@edudoor/common/utils/Tools';
import { Student } from '@edudoor/common/models/Student';
import { Omit } from '@edudoor/ui/types';

const columns = {
  username: 'Username',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  status: 'Status',
};

const StudentTable: React.FunctionComponent<StudentTableProps> = props => {
  return <Table {...(props.tableProps || {})} className="student-table" columns={columns} data={props.students} />;
};

export interface StudentTableProps {
  students: Array<Student>;
  tableProps?: Omit<TableProps<Student, typeof columns>, 'columns' | 'data' | 'getCell'>;
}

export default StudentTable;
