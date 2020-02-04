import React from 'react';
import SimpleWebComponent from '@edudoor/ui/components/WebComponent/SimpleWebComponent';
import { fetchGroupsAction } from '../../../reducers/groups/actions';
import { State } from '../../../store';
import Table from '@edudoor/ui/components/Table';
import { Group } from '@edudoor/common/models/Group';
import Tools from '@edudoor/common/utils/Tools';

const GroupsTable: React.FunctionComponent<GroupsTableProps> = (props): JSX.Element => {
  return (
    <SimpleWebComponent
      action={fetchGroupsAction}
      params={[props.type]}
      selector={(state: State) => state.groups.groupList}
      dataSelector={data => data.groups}
    >
      {data => {
        return (
          <Table
            columns={{ name: 'Name', members: 'Members', createdBy: 'Created By' }}
            data={data as Array<Group>}
            onRowClick={props.onRowClick}
            getCell={(row, index, column) => {
              switch (column) {
                case 'name':
                  return row.name;
                case 'members':
                  return Tools.str(row.members?.length);
                default:
                  return Tools.str(row.creator?.fullName);
              }
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
}

export default GroupsTable;
