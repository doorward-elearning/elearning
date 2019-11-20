import React, { FunctionComponent } from 'react';
import { Course } from '../../../../services/models';
import Table from '../../../ui/Table';

const AuthoredCoursesReportTable: FunctionComponent<AuthoredCoursesReportTableProps> = (props): JSX.Element => {
  return (
    <Table
      data={props.courses}
      getCell={(row, index, column) => {
        const data = {
          title: row.title,
          ratings: '4.5',
        };
        return data[column as keyof typeof data];
      }}
      columns={{ title: 'Course Name', ratings: 'Ratings' }}
    />
  );
};

export interface AuthoredCoursesReportTableProps {
  courses: Array<Course>;
}
export default AuthoredCoursesReportTable;
