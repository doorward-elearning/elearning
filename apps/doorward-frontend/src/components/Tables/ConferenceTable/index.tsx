import React from 'react';
import Table from '@doorward/ui/components/Table';
import { MemoryHistory } from 'history';
import EImage from '@doorward/ui/components/Image';
import './ConferenceTable.scss';
import { ROUTES } from '../../../routes/routes';
import { Conference } from '@doorward/common/models/Conference';

const ConferenceTable: React.FunctionComponent<ConferenceTableProps> = props => {
  return (
    <Table
      className="conference-table"
      columns={{ displayName: 'Conference Name', members: 'No of members', status: 'Status' }}
      data={props.conferences}
      onRowClick={(conference): void => {
        props.history.push(ROUTES.viewConference.withParams({ conferenceId: conference.id }));
      }}
      getCell={row => {
        return {
          displayName: (
            <div className="conference-title">
              <EImage size="responsive" circle />
              <span>{row.title}</span>
            </div>
          ),
          members: <span>{row.numMembers}</span>,
        };
      }}
    />
  );
};

export interface ConferenceTableProps {
  conferences: Array<Conference>;
  history: MemoryHistory;
}

export default ConferenceTable;
