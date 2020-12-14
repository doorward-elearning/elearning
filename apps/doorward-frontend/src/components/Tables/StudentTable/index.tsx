import React from 'react';
import Table, { OnRowClick, TableProps } from '@doorward/ui/components/Table';
import { Omit } from '@doorward/common/types';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';

const columns = {
  username: translate('username'),
  firstName: translate('firstName'),
  lastName: translate('lastName'),
  email: translate('email'),
  phoneNumber: translate('phoneNumber'),
  status: translate('status'),
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
