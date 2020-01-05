import React from 'react';
import SimpleWebComponent from '@edudoor/ui/src/components/WebComponent/SimpleWebComponent';
import { Teacher } from '../../../../../../libs/shared/models';
import Table from '@edudoor/ui/src/components/Table';
import { fetchCourseCreatorReportList } from '../../../reducers/reports/actions';
import { State } from '../../../store';

const TeacherReportTable: React.FunctionComponent<TeacherReportTableProps> = props => (
  <SimpleWebComponent
    action={fetchCourseCreatorReportList}
    selector={(state: State) => state.reports.teacherReportList}
    dataSelector={data => data.teachers}
  >
    {data => (
      <Table
        data={data}
        getCell={(row, index, column): JSX.Element | string => {
          const data = {
            fullName: row.fullName,
            department: 'Computer Science',
            courses: '' + row.authoredCourses.length,
            ratings: '4.5',
          };
          return data[column as keyof typeof data];
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
