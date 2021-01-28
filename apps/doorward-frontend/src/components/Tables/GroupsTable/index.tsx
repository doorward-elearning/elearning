import React from 'react';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Table, { ActionMenu } from '@doorward/ui/components/Table';
import Tools from '@doorward/common/utils/Tools';
import DoorwardApi from '../../../services/apis/doorward.api';
import GroupEntity from '@doorward/common/entities/group.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const GroupsTable: React.FunctionComponent<GroupsTableProps> = (props): JSX.Element => {
  const [getGroups, state] = useApiAction(DoorwardApi, (api) => api.groups.getGroups);
  return (
    <SimpleWebComponent
      action={getGroups}
      params={[{ type: props.type, search: props.search }]}
      state={state}
      dataSelector={(data) => data?.groups}
    >
      {(data) => {
        return (
          <Table
            columns={{ name: translate('name'), members: translate('members'), createdBy: translate('createdBy') }}
            data={data}
            actionMenu={props.actionMenu}
            onRowClick={props.onRowClick}
            getCell={(row) => {
              return {
                members: <span>{Tools.str(row.members?.length)}</span>,
                createdBy: <span>{Tools.str(row.author?.fullName)}</span>,
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
  onRowClick?: (row: GroupEntity, index: number) => void;
  actionMenu?: ActionMenu<GroupEntity>;
  search?: string;
}

export default GroupsTable;
