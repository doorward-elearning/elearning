import React from 'react';
import { Organization } from '@edudoor/common/models/Organization';
import Table from '@edudoor/ui/components/Table';

const OrganizationsTable: React.FunctionComponent<OrganizationsTableProps> = (props): JSX.Element => {
  return <Table data={props.organizations} columns={{ id: 'ID', name: 'Name', description: 'Description' }} />;
};

export interface OrganizationsTableProps {
  organizations: Array<Organization>;
}

export default OrganizationsTable;
