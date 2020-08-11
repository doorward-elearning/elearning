import React from 'react';
import Table from '@doorward/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import { Forum } from '@doorward/common/models/Forum';

const ForumsInProgressTable: React.FunctionComponent<ForumsInProgressTableProps> = props => {
  const routes = useRoutes();
  return (
    <Table
      columns={{
        name: 'Forum Name',
        percentage: 'Percentage',
      }}
      data={props.forums}
      onRowClick={row => routes.navigate(routes.viewForum, { forumId: row.id })}
      getCell={row => {
        return {
          name: <span>{row.title}</span>,
          percentage: <span>50%</span>,
        };
      }}
    />
  );
};

export interface ForumsInProgressTableProps {
  forums: Array<Forum>;
}

export default ForumsInProgressTable;
