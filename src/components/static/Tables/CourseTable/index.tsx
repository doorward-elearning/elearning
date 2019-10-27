import React from 'react';
import { CourseResponse } from '../../../../services/responseBodies';
import Table from '../../../ui/Table';
import TableHeader from '../../../ui/Table/TableHeader';
import TableBody from '../../../ui/Table/TableBody';
import { MemoryHistory } from 'history';
import ROUTES from '../../../../routes/routes';
import EImage from '../../../ui/Image';
import './CourseTable.scss';

const CourseTable: React.FunctionComponent<CourseTableProps> = props => {
  return (
    <Table className="course-table">
      <TableHeader columns={{ displayName: 'Course Name', students: 'No of students', status: 'Status' }} />
      <TableBody
        data={props.courses}
        onRowClick={(course): void => {
          props.history.push(ROUTES.viewCourse.withParams({ courseId: course.key }));
        }}
        getCell={(row, index, column): string | JSX.Element => {
          const data = {
            displayName: (
              <div className="course-title">
                <EImage size="responsive" circle />
                <span>{row.title}</span>
              </div>
            ),
            students: '23',
            status: 'IN PROGRESS',
          };
          return data[column as keyof typeof data];
        }}
      />
    </Table>
  );
};

export interface CourseTableProps {
  courses: Array<CourseResponse>;
  history: MemoryHistory;
}

export default CourseTable;
