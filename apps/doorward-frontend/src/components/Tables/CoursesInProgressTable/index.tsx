import React from 'react';
import Table from '@doorward/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import CourseEntity from '@doorward/common/entities/course.entity';
import translate from '@doorward/common/lang/translate';

const CoursesInProgressTable: React.FunctionComponent<CoursesInProgressTableProps> = (props) => {
  const routes = useRoutes();
  return (
    <Table
      columns={{
        name: {
          title: translate('courseName'),
          cellRenderer: ({ rowData }) => <span>{rowData.title}</span>,
        },
        percentage: {
          title: translate('percentage'),
          cellRenderer: () => <span>50%</span>,
        },
      }}
      data={props.courses}
      onRowClick={({ rowData }) => routes.navigate(routes.viewCourse, { courseId: rowData.id })}
    />
  );
};

export interface CoursesInProgressTableProps {
  courses: Array<CourseEntity>;
}

export default CoursesInProgressTable;
