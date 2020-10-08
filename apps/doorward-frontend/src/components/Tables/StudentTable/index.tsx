import React from 'react';
import Table, { OnRowClick, TableProps } from '@doorward/ui/components/Table';
import { Omit } from '@doorward/common/types';
import UserEntity from '@doorward/common/entities/user.entity';

const columns = {
  username: 'Username',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  phoneNumber: 'Phone Number',
  status: 'Status',
};

const StudentTable: React.FunctionComponent<StudentTableProps> = (props) => {
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
  students: Array<UserEntity>;
  tableProps?: Omit<TableProps<UserEntity, typeof columns>, 'columns' | 'data' | 'getCell'>;
  onClickStudent?: OnRowClick<UserEntity>;
}

export default StudentTable;
