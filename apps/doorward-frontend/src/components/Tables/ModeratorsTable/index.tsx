import React from 'react';
import Table from '@doorward/ui/components/Table';
import { Moderator } from '@doorward/common/models/Moderator';

const ModeratorsTable: React.FunctionComponent<ModeratorsTableProps> = props => {
  return (
    <Table
      className="moderators-table"
      columns={{
        username: 'Username',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        status: 'Status',
      }}
      data={props.moderators}
    />
  );
};

export interface ModeratorsTableProps {
  moderators: Array<Moderator>;
}

export default ModeratorsTable;
