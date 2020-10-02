import React from 'react';
import Table from '@doorward/ui/components/Table';
import { MemoryHistory } from 'history';
import './CourseTable.scss';
import { ROUTES } from '../../../routes/routes';
import CourseEntity from '@doorward/common/entities/course.entity';

const CourseTable: React.FunctionComponent<CourseTableProps> = (props) => {
  return (
    <Table
      className="course-table"
      columns={{ displayName: 'Course Name', students: 'No of students', status: 'Status' }}
      data={props.courses}
      onRowClick={(course): void => {
        props.history.push(ROUTES.viewCourse.withParams({ courseId: course.id }));
      }}
      sortColumn={{
        displayName: (a, b) => a.title.toLowerCase() > b.title.toLowerCase(),
        students: (a, b) => a.numStudents > b.numStudents,
      }}
      getCell={(row) => {
        return {
          displayName: (
            <div className="course-title">
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
  courses: Array<CourseEntity>;
  history: MemoryHistory;
}

export default CourseTable;
