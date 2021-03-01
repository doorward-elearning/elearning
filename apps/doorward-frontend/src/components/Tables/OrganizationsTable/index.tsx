import React from 'react';
import Table from '@doorward/ui/components/Table';
import Row from '@doorward/ui/components/Row';
import CopyButton from '@doorward/ui/components/CopyButton';
import './OrganizationsTable.scss';
import EImage from '@doorward/ui/components/Image';
import IfElse from '@doorward/ui/components/IfElse';
import Dropdown from '@doorward/ui/components/Dropdown';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const OrganizationsTable: React.FunctionComponent<OrganizationsTableProps> = (props): JSX.Element => {
  const history = useHistory();
  return (
    <Table
      className="organizations-table"
      data={props.organizations}
      columns={{
        name: {
          title: translate('name'),
          cellRenderer: ({ rowData }) => (
            <Row>
              <IfElse condition={rowData.icon}>
                <EImage src={rowData.icon} size="small" />
              </IfElse>
              <span>{rowData.name}</span>
            </Row>
          ),
        },
        id: {
          title: translate('id'),
          cellRenderer: ({ rowData }) => (
            <Row style={{ gridGap: '1em', justifyContent: 'start' }}>
              <span className="organization-id">{rowData.id}</span>
              <CopyButton text={rowData.id} className="copy-icon" />
            </Row>
          ),
        },
        description: {
          title: translate('description'),
        },
      }}
      actionMenu={({ rowData }) => {
        return (
          <Dropdown.Menu>
            <Dropdown.Item
              icon="edit"
              onClick={() => {
                history.push(`/organizations/${rowData.id}/update`);
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
