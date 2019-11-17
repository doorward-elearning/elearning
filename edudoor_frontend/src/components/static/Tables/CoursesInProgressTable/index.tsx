import React from 'react';
import { Course, Student } from '../../../../services/models';
import TableHeader from '../../../ui/Table/TableHeader';
import Table from '../../../ui/Table';
import TableBody from '../../../ui/Table/TableBody';
import useRoutes from '../../../../hooks/useRoutes';

const CoursesInProgressTable: React.FunctionComponent<CoursesInProgressTableProps> = props => {
  const routes = useRoutes();
  return (
    <Table
      columns={{
        name: 'Course Name',
        percentage: 'Percentage',
      }}
    >
      <TableHeader />
      <TableBody
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
    </Table>
  );
};

export interface CoursesInProgressTableProps {
  courses: Array<Course>;
}

export default CoursesInProgressTable;
