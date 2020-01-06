import React from 'react';
import Table from '@edudoor/ui/src/components/Table';
import Tools from '@edudoor/ui/src/utils/Tools';
import { Teacher } from '../../../../../../libs/shared/models';

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
      getCell={(row, index, column): string => Tools.str(row[column as keyof Teacher])}
    />
  );
};

export interface TeachersTableProps {
  teachers: Array<Teacher>;
}

export default TeachersTable;
