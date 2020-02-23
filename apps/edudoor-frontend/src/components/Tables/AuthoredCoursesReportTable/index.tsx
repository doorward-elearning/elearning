import React, { FunctionComponent } from 'react';
import Table from '@edudoor/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import { Course } from '@edudoor/common/models/Course';

const AuthoredCoursesReportTable: FunctionComponent<AuthoredCoursesReportTableProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Table
      data={props.courses}
      getCell={() => {
        return {
          ratings: <span>4.5</span>,
        };
      }}
      onRowClick={row => routes.navigate(routes.viewCourse, { courseId: row.id })}
      columns={{ title: 'Course Name', ratings: 'Ratings' }}
    />
  );
};

export interface AuthoredCoursesReportTableProps {
  courses: Array<Course>;
}
export default AuthoredCoursesReportTable;
