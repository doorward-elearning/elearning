import React from 'react';
import Table from '@doorward/ui/components/Table';
import useRoutes from '../../../hooks/useRoutes';
import { Course } from '@doorward/common/models/Course';

const CoursesInProgressTable: React.FunctionComponent<CoursesInProgressTableProps> = props => {
  const routes = useRoutes();
  return (
    <Table
      columns={{
        name: 'Course Name',
        percentage: 'Percentage',
      }}
      data={props.courses}
      onRowClick={row => routes.navigate(routes.viewCourse, { courseId: row.id })}
      getCell={row => {
        return {
          name: <span>{row.title}</span>,
          percentage: <span>50%</span>,
        };
      }}
    />
  );
};

export interface CoursesInProgressTableProps {
  courses: Array<Course>;
}

export default CoursesInProgressTable;
