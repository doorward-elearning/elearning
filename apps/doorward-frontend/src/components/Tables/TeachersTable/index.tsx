import React from 'react';
import Table from '@doorward/ui/components/Table';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';

const TeachersTable: React.FunctionComponent<TeachersTableProps> = (props) => {
  return (
   <Table
    className="teachers-table"
    sortable
    columns={{
      username: translate('username'),
      firstName: translate('firstName'),
      email: translate('email'),
      status: translate('status'),
    }}
    data={props.teachers}
  />
  );
};

export interface TeachersTableProps {
  teachers: Array<UserEntity>;
}

export default TeachersTable;
