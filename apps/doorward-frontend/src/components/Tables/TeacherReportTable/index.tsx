import React from 'react';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Table from '@doorward/ui/components/Table';
import { fetchCourseCreatorReportList } from '../../../reducers/reports/actions';
import { State } from '../../../store';
import { Teacher } from '@doorward/common/models/Teacher';

const TeacherReportTable: React.FunctionComponent<TeacherReportTableProps> = props => (
  <SimpleWebComponent
    action={fetchCourseCreatorReportList}
    selector={(state: State) => state.reports.teacherReportList}
    dataSelector={data => data.teachers}
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

export interface TeacherReportTableProps {
  onRowClick: (row: Teacher, index: number) => void;
}

export default TeacherReportTable;
