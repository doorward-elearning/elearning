import React from 'react';
import Table from '@doorward/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import { Conference } from '@doorward/common/models/Conference';

const ConferencesInProgressTable: React.FunctionComponent<ConferencesInProgressTableProps> = props => {
  const routes = useRoutes();
  return (
    <Table
      columns={{
        name: 'Conference Name',
        percentage: 'Percentage',
      }}
      data={props.conferences}
      onRowClick={row => routes.navigate(routes.viewConference, { conferenceId: row.id })}
      getCell={row => {
        return {
          name: <span>{row.title}</span>,
          percentage: <span>50%</span>,
        };
      }}
    />
  );
};

export interface ConferencesInProgressTableProps {
  conferences: Array<Conference>;
}

export default ConferencesInProgressTable;
