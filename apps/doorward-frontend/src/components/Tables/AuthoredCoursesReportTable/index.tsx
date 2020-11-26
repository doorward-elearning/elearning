import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import CourseModel from '@doorward/common/models/course.model';
import translate from '@doorward/common/lang/translate';

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
      onRowClick={(row) => routes.navigate(routes.viewCourse, { courseId: row.id })}
      columns={{ title: translate.courseName(), ratings: translate.rating() }}
    />
  );
};

export interface AuthoredCoursesReportTableProps {
  courses: Array<CourseModel>;
}
export default AuthoredCoursesReportTable;
