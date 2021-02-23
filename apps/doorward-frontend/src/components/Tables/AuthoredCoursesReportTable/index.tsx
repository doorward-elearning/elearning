import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import CourseEntity from '@doorward/common/entities/course.entity';
import translate from '@doorward/common/lang/translate';

const AuthoredCoursesReportTable: FunctionComponent<AuthoredCoursesReportTableProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Table
      data={props.courses}
      onRowClick={({ rowData: row }) => routes.navigate(routes.viewCourse, { courseId: row.id })}
      columns={{
        title: {
          title: translate('courseName'),
        },
        ratings: {
          title: translate('rating'),
          cellRenderer: () => <span>4.5</span>,
        },
      }}
    />
  );
};

export interface AuthoredCoursesReportTableProps {
  courses: Array<CourseEntity>;
}
export default AuthoredCoursesReportTable;
