import React from 'react';
import Table from '@doorward/ui/components/Table';
import Row from '@doorward/ui/components/Row';
import CopyButton from '@doorward/ui/components/CopyButton';
import './OrganizationsTable.scss';
import EImage from '@doorward/ui/components/Image';
import IfElse from '@doorward/ui/components/IfElse';
import Dropdown from '@doorward/ui/components/Dropdown';
import useRoutes from '../../../hooks/useRoutes';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

const OrganizationsTable: React.FunctionComponent<OrganizationsTableProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Table
      className="organizations-table"
      data={props.organizations}
      columns={{ name: 'Name', id: 'ID', description: 'Description' }}
      actionMenu={(row) => {
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
      getCell={(row) => {
        return {
          id: (
            <Row style={{ gridGap: '1em', justifyContent: 'start' }}>
              <span className="organization-id">{row.id}</span>
              <CopyButton text={row.id} className="copy-icon" />
            </Row>
          ),
          name: (
            <Row>
              <IfElse condition={row.icon}>
                <EImage src={row.icon} size="small" />
              </IfElse>
              <span>{row.name}</span>
            </Row>
          ),
        };
      }}
    />
  );
};

export interface OrganizationsTableProps {
  organizations: Array<OrganizationEntity>;
}

export default OrganizationsTable;
