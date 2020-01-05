import React from 'react';
import Table from '@edudoor/ui/components/Table';
import { MemoryHistory } from 'history';
import ROUTES from '@edudoor/ui/routes/routes';
import EImage from '@edudoor/ui/components/Image';
import './CourseTable.scss';
import { Course } from '../../../../services/models';

const CourseTable: React.FunctionComponent<CourseTableProps> = props => {
  return (
    <Table
      className="course-table"
      columns={{ displayName: 'Course Name', students: 'No of students', status: 'Status' }}
      data={props.courses}
      onRowClick={(course): void => {
        props.history.push(ROUTES.viewCourse.withParams({ courseId: course.id }));
      }}
      getCell={(row, index, column): string | JSX.Element => {
        const data = {
          displayName: (
            <div className="course-title">
              <EImage size="responsive" circle />
              <span>{row.title}</span>
            </div>
          ),
          students: row.numStudents,
          status: row.status,
        };
        return data[column as keyof typeof data];
      }}
    />
  );
};

export interface CourseTableProps {
  courses: Array<Course>;
  history: MemoryHistory;
}

export default CourseTable;
