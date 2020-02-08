import React from 'react';
import { Organization } from '@edudoor/common/models/Organization';
import Table from '@edudoor/ui/components/Table';
import Row from '@edudoor/ui/components/Row';
import CopyButton from '@edudoor/ui/components/CopyButton';
import './OrganizationsTable.scss';
import EImage from '@edudoor/ui/components/Image';
import IfElse from '@edudoor/ui/components/IfElse';
import Dropdown from '@edudoor/ui/components/Dropdown';
import useRoutes from '../../../hooks/useRoutes';

const OrganizationsTable: React.FunctionComponent<OrganizationsTableProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Table
      className="organizations-table"
      data={props.organizations}
      columns={{ name: 'Name', id: 'ID', description: 'Description' }}
      actionMenu={row => {
        return (
          <Dropdown.Menu>
            <Dropdown.Item
              icon="edit"
              onClick={() => {
                routes.navigate(routes.editOrganization, {
                  organizationId: row.id,
                });
              }}
            >
              Edit
            </Dropdown.Item>
          </Dropdown.Menu>
        );
      }}
      getCell={(row, index, column, defaultRenderer) => {
        if (column === 'id') {
          return (
            <Row style={{ gridGap: '1em', justifyContent: 'start' }}>
              <span className="organization-id">{defaultRenderer()}</span>
              <CopyButton text={row.id} className="copy-icon" />
            </Row>
          );
        } else if (column === 'name') {
          return (
            <Row>
              <IfElse condition={row.icon}>
                <EImage src={row.icon} size="small" />
              </IfElse>
              {defaultRenderer()}
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
