import React from 'react';
import SimpleWebComponent from '@edudoor/ui/components/WebComponent/SimpleWebComponent';
import { fetchGroupsAction } from '../../../reducers/groups/actions';
import { State } from '../../../store';
import Table, { ActionMenu } from '@edudoor/ui/components/Table';
import { Group } from '@edudoor/common/models/Group';
import Tools from '@edudoor/common/utils/Tools';

const GroupsTable: React.FunctionComponent<GroupsTableProps> = (props): JSX.Element => {
  return (
    <SimpleWebComponent
      action={fetchGroupsAction}
      params={[{ type: props.type }]}
      selector={(state: State) => state.groups.groupList}
      dataSelector={data => data.groups}
    >
      {data => {
        return (
          <Table
            columns={{ name: 'Name', members: 'Members', createdBy: 'Created By' }}
            data={data as Array<Group>}
            actionMenu={props.actionMenu}
            onRowClick={props.onRowClick}
            getCell={row => {
              return {
                members: <span>{Tools.str(row.members?.length)}</span>,
                createdBy: <span>{Tools.str(row.creator?.fullName)}</span>,
              };
            }}
          />
        );
      }}
    </SimpleWebComponent>
  );
};

export interface GroupsTableProps {
  type: string;
  onRowClick?: (row: Group, index: number) => void;
  actionMenu?: ActionMenu<Group>;
}

export default GroupsTable;
