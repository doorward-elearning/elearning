import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import CourseEntity from '@doorward/common/entities/course.entity';
import translate from '@doorward/common/lang/translate';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const AuthoredCoursesReportTable: FunctionComponent<AuthoredCoursesReportTableProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <Table
      data={props.courses}
      onRowClick={({ rowData: row }) => navigation.navigate(ROUTES.courses.view, { courseId: row.id })}
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
