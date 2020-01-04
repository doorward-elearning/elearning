import React from 'react';
import { Course } from '../../../services/models';
import Table from '../../../../../../libs/ui/components/Table';
import useRoutes from '../../../../../../libs/ui/hooks/useRoutes';

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
      getCell={(row, index, column): string => {
        const data = {
          name: row.title,
          percentage: '50%',
        };
        return data[column];
      }}
    />
  );
};

export interface CoursesInProgressTableProps {
  courses: Array<Course>;
}

export default CoursesInProgressTable;
