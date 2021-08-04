import React from 'react';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Table, { ActionMenu } from '@doorward/ui/components/Table';
import Tools from '@doorward/common/utils/Tools';
import DoorwardApi from '../../../services/apis/doorward.api';
import GroupEntity from '@doorward/common/entities/group.entity';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { RowMouseEventHandlerParams } from 'react-virtualized';

const GroupsTable: React.FunctionComponent<GroupsTableProps> = (props): JSX.Element => {
  const [getGroups, state] = useApiAction(DoorwardApi, (api) => api.groups.getGroups, { clearData: true });
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
            columns={{
              name: {
                title: translate('name'),
              },
              members: {
                title: translate('members'),
                cellRenderer: ({ rowData }) => <span>{Tools.str(rowData.members?.length)}</span>,
              },
              createdBy: {
                title: translate('createdBy'),
                cellRenderer: ({ rowData }) => <span>{Tools.str(rowData.author?.fullName)}</span>,
              },
            }}
            data={data}
            actionMenu={props.actionMenu}
            onRowClick={props.onRowClick}
          />
        );
      }}
    </SimpleWebComponent>
  );
};

export interface GroupsTableProps {
  type: string;
  onRowClick?: (props: RowMouseEventHandlerParams) => void;
  actionMenu?: ActionMenu;
  search?: string;
}

export default GroupsTable;
