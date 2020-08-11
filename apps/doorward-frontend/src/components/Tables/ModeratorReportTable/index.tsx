import React from 'react';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Table from '@doorward/ui/components/Table';
import { fetchCourseCreatorReportList } from '../../../reducers/reports/actions';
import { State } from '../../../store';
import { Moderator } from '@doorward/common/models/Moderator';

const ModeratorReportTable: React.FunctionComponent<ModeratorReportTableProps> = props => (
  <SimpleWebComponent
    action={fetchCourseCreatorReportList}
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
            courses: '' + row.authoredCourses.length,
            ratings: '4.5',
          };
        }}
        columns={{
          fullName: 'Name',
          department: 'Department',
          courses: 'No of courses',
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
