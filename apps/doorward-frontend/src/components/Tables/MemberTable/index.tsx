import React from 'react';
import Table, { OnRowClick, TableProps } from '@doorward/ui/components/Table';
import Tools from '@doorward/common/utils/Tools';
import { Member } from '@doorward/common/models/Member';
import { Omit } from '@doorward/common/types';

const columns = {
  username: 'Username',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  status: 'Status',
};

const MemberTable: React.FunctionComponent<MemberTableProps> = props => {
  return (
    <Table
      {...(props.tableProps || {})}
      className="member-table"
      columns={columns}
      data={props.members}
      onRowClick={props.onClickMember}
    />
  );
};

export interface MemberTableProps {
  members: Array<Member>;
  tableProps?: Omit<TableProps<Member, typeof columns>, 'columns' | 'data' | 'getCell'>;
  onClickMember?: OnRowClick<Member>;
}

export default MemberTable;
