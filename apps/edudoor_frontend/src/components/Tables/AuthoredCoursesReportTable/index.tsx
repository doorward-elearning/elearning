import React, { FunctionComponent } from 'react';
import { Course } from '../../../../../../libs/shared/models';
import Table from '@edudoor/ui/src/components/Table';
import useRoutes from '../../../hooks/useRoutes';

const AuthoredCoursesReportTable: FunctionComponent<AuthoredCoursesReportTableProps> = (props): JSX.Element => {
  const routes = useRoutes();
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
      onRowClick={row => routes.navigate(routes.viewCourse, { courseId: row.id })}
      columns={{ title: 'Course Name', ratings: 'Ratings' }}
    />
  );
};

export interface AuthoredCoursesReportTableProps {
  courses: Array<Course>;
}
export default AuthoredCoursesReportTable;
