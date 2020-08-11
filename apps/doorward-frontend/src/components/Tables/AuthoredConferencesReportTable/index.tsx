import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import { Conference } from '@doorward/common/models/Conference';

const AuthoredConferencesReportTable: FunctionComponent<AuthoredConferencesReportTableProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Table
      data={props.conferences}
      getCell={() => {
        return {
          ratings: <span>4.5</span>,
        };
      }}
      onRowClick={row => routes.navigate(routes.viewConference, { conferenceId: row.id })}
      columns={{ title: 'Conference Name', ratings: 'Ratings' }}
    />
  );
};

export interface AuthoredConferencesReportTableProps {
  conferences: Array<Conference>;
}
export default AuthoredConferencesReportTable;
