import React from 'react';
import SimpleWebComponent from '../../../ui/WebComponent/SimpleWebComponent';
import { CourseCreator } from '../../../../services/models';
import Table from '../../../ui/Table';
import { fetchCourseCreatorReport } from '../../../../reducers/reports/actions';
import { State } from '../../../../store';

const CourseCreatorsTable: React.FunctionComponent<CourseCreatorsTableProps> = props => (
  <SimpleWebComponent
    action={fetchCourseCreatorReport}
    selector={(state: State) => state.reports.courseCreatorReportList}
    dataSelector={data => data.courseCreators}
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

export interface CourseCreatorsTableProps {
  onRowClick: (row: CourseCreator, index: number) => void;
}

export default CourseCreatorsTable;
