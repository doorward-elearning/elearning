import React from 'react';
import Table from '@doorward/ui/components/Table';
import './OrganizationsTable.scss';
import Dropdown from '@doorward/ui/components/Dropdown';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import translate from '@doorward/common/lang/translate';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';

const OrganizationsTable: React.FunctionComponent<OrganizationsTableProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <Table
      className="organizations-table"
      data={props.organizations}
      columns={{
        name: {
          title: translate('name'),
        },
        displayName: {
          title: translate('orgDisplayName'),
        },
        id: {
          title: translate('id'),
          cellRenderer: ({ rowData }) => <span className="organization-id">{rowData.id}</span>,
        },
        hosts: {
          title: translate('hosts'),
          cellRenderer: ({ rowData }) => (
            <div>
              {rowData.hosts.split(',').map((host) => (
                <DisplayLabel>{host}</DisplayLabel>
              ))}
            </div>
          ),
        },
      }}
      actionMenu={({ rowData }) => {
        return (
          <Dropdown.Menu>
            <Dropdown.Item
              icon="edit"
              onClick={() => {
                navigation.navigate(ROUTES.organizations.update, { organizationId: rowData.id });
              }}
            >
              Edit
            </Dropdown.Item>
          </Dropdown.Menu>
        );
      }}
    />
  );
};

export interface OrganizationsTableProps {
  organizations: Array<OrganizationEntity>;
}

export default OrganizationsTable;
