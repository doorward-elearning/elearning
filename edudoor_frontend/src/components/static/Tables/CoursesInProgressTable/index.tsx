import React from 'react';
import { Course, Student } from '../../../../services/models';
import TableHeader from '../../../ui/Table/TableHeader';
import Table from '../../../ui/Table';
import TableBody from '../../../ui/Table/TableBody';

const CoursesInProgressTable: React.FunctionComponent<CoursesInProgressTableProps> = props => {
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
