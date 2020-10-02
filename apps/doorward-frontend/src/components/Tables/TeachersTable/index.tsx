import React from 'react';
import Table from '@doorward/ui/components/Table';
import UserEntity from '@doorward/common/entities/user.entity';

const TeachersTable: React.FunctionComponent<TeachersTableProps> = (props) => {
  return (
    <Table
      className="teachers-table"
      sortable
      columns={{
        username: 'Username',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        status: 'Status',
      }}
      data={props.teachers}
    />
  );
};

export interface TeachersTableProps {
  teachers: Array<UserEntity>;
}

export default TeachersTable;
