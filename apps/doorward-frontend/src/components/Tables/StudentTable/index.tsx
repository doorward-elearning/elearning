import React from 'react';
import Table, { OnRowClick, TableProps } from '@doorward/ui/components/Table';
import { Omit } from '@doorward/common/types';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import { PaginationMetaData } from '@doorward/common/dtos/response/base.response';

const StudentTable: React.FunctionComponent<StudentTableProps> = (props) => {
  const columns = {
    username: translate('username'),
    firstName: translate('firstName'),
    lastName: translate('lastName'),
    email: translate('email'),
    phoneNumber: translate('phoneNumber'),
    status: translate('status'),
  };
  return (
    <Table
      {...(props.tableProps || {})}
      className="student-table"
      columns={columns}
      data={props.students}
      pagination={props.pagination}
      onRowClick={props.onClickStudent}
      loadMore={props.loadMore}
    />
  );
};

export interface StudentTableProps {
  students: Array<UserEntity>;
  tableProps?: Omit<TableProps<UserEntity, any>, 'columns' | 'data' | 'getCell'>;
  onClickStudent?: OnRowClick<UserEntity>;
  pagination?: PaginationMetaData;
  loadMore?: (page: number) => Promise<any>;
}

export default StudentTable;
