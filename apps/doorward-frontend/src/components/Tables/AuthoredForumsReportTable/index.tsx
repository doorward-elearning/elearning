import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import { Forum } from '@doorward/common/models/Forum';

const AuthoredForumsReportTable: FunctionComponent<AuthoredForumsReportTableProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Table
      data={props.forums}
      getCell={() => {
        return {
          ratings: <span>4.5</span>,
        };
      }}
      onRowClick={row => routes.navigate(routes.viewForum, { forumId: row.id })}
      columns={{ title: 'Forum Name', ratings: 'Ratings' }}
    />
  );
};

export interface AuthoredForumsReportTableProps {
  forums: Array<Forum>;
}
export default AuthoredForumsReportTable;
