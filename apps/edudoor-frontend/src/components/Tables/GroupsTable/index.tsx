import React from 'react';
import SimpleWebComponent from '@edudoor/ui/components/WebComponent/SimpleWebComponent';
import { fetchGroupsAction } from '../../../reducers/groups/actions';
import { State } from '../../../store';

const GroupsTable: React.FunctionComponent<GroupsTableProps> = (props): JSX.Element => {
  return (
    <SimpleWebComponent
      action={fetchGroupsAction}
      params={[props.type]}
      selector={(state: State) => state.groups.groupList}
      dataSelector={data => data.groups}
    >
      {data => {
        return <React.Fragment>{JSON.stringify(data)}</React.Fragment>;
      }}
    </SimpleWebComponent>
  );
};

export interface GroupsTableProps {
  type: string;
}

export default GroupsTable;
