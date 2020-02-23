import React from 'react';
import Table from '@edudoor/ui/components/Table';
import { Teacher } from '@edudoor/common/models/Teacher';

const TeachersTable: React.FunctionComponent<TeachersTableProps> = props => {
  return (
    <Table
      className="teachers-table"
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
  teachers: Array<Teacher>;
}

export default TeachersTable;
