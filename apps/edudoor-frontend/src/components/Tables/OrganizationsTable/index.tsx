import React from 'react';
import { Organization } from '@edudoor/common/models/Organization';
import Table from '@edudoor/ui/components/Table';
import Row from '@edudoor/ui/components/Row';
import CopyButton from '@edudoor/ui/components/CopyButton';
import './OrganizationsTable.scss';

const OrganizationsTable: React.FunctionComponent<OrganizationsTableProps> = (props): JSX.Element => {
  return (
    <Table
      className="organizations-table"
      data={props.organizations}
      columns={{ id: 'ID', name: 'Name', description: 'Description' }}
      getCell={(row, index, column, defaultRenderer) => {
        if (column === 'id') {
          return (
            <Row style={{ gridGap: '1em', justifyContent: 'start' }}>
              {defaultRenderer()}
              <CopyButton text={row.id} className="copy-icon" />
            </Row>
          );
        } else {
          return defaultRenderer();
        }
      }}
    />
  );
};

export interface OrganizationsTableProps {
  organizations: Array<Organization>;
}

export default OrganizationsTable;
