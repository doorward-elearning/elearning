import React from 'react';
import Table from '@doorward/ui/components/Table';
import { MemoryHistory } from 'history';
import EImage from '@doorward/ui/components/Image';
import './ForumTable.scss';
import { ROUTES } from '../../../routes/routes';
import { Forum } from '@doorward/common/models/Forum';

const ForumTable: React.FunctionComponent<ForumTableProps> = props => {
  return (
    <Table
      className="forum-table"
      columns={{ displayName: 'Forum Name', members: 'No of members', status: 'Status' }}
      data={props.forums}
      onRowClick={(forum): void => {
        props.history.push(ROUTES.viewForum.withParams({ forumId: forum.id }));
      }}
      getCell={row => {
        return {
          displayName: (
            <div className="forum-title">
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

export interface ForumTableProps {
  forums: Array<Forum>;
  history: MemoryHistory;
}

export default ForumTable;
