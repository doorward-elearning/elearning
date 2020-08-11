import React from 'react';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Table from '@doorward/ui/components/Table';
import { fetchConferenceCreatorReportList } from '../../../reducers/reports/actions';
import { State } from '../../../store';
import { Moderator } from '@doorward/common/models/Moderator';

const ModeratorReportTable: React.FunctionComponent<ModeratorReportTableProps> = props => (
  <SimpleWebComponent
    action={fetchConferenceCreatorReportList}
    selector={(state: State) => state.reports.moderatorReportList}
    dataSelector={data => data.moderators}
  >
    {data => (
      <Table
        data={data}
        getCell={row => {
          return {
            fullName: row.fullName,
            department: 'Computer Science',
            conferences: '' + row.authoredConferences.length,
            ratings: '4.5',
          };
        }}
        columns={{
          fullName: 'Name',
          department: 'Department',
          conferences: 'No of conferences',
          ratings: 'Ratings',
        }}
        onRowClick={props.onRowClick}
      />
    )}
  </SimpleWebComponent>
);

export interface ModeratorReportTableProps {
  onRowClick: (row: Moderator, index: number) => void;
}

export default ModeratorReportTable;
