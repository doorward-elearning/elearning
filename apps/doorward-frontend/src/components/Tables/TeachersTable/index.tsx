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
        username: translate.username(),
        firstName: translate.firstName(),
        lastName: translate.lastName(),
        email: translate.email(),
        phoneNumber: translate.phoneNumber(),
        status: translate.status(),
      }}
      data={props.teachers}
    />
  );
};

export interface TeachersTableProps {
  teachers: Array<UserEntity>;
}

export default TeachersTable;
