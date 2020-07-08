import React from 'react';
import Table from '@doorward/ui/components/Table';
import { MemoryHistory } from 'history';
import EImage from '@doorward/ui/components/Image';
import './CourseTable.scss';
import { ROUTES } from '../../../routes/routes';
import { Course } from '@doorward/common/models/Course';

const CourseTable: React.FunctionComponent<CourseTableProps> = props => {
  return (
    <Table
      className="course-table"
      columns={{ displayName: 'Course Name', students: 'No of students', status: 'Status' }}
      data={props.courses}
      onRowClick={(course): void => {
        props.history.push(ROUTES.viewCourse.withParams({ courseId: course.id }));
      }}
      getCell={row => {
        return {
          displayName: (
            <div className="course-title">
              <EImage size="responsive" circle />
              <span>{row.title}</span>
            </div>
          ),
          students: <span>{row.numStudents}</span>,
        };
      }}
    />
  );
};

export interface CourseTableProps {
  courses: Array<Course>;
  history: MemoryHistory;
}

export default CourseTable;
