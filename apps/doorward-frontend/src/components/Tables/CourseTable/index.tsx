import React from 'react';
import Table from '@doorward/ui/components/Table';
import { MemoryHistory } from 'history';
import './CourseTable.scss';
import CourseModel from '@doorward/common/models/course.model';
import useRoutes from '../../../hooks/useRoutes';
import translate from '@doorward/common/lang/translate';

const CourseTable: React.FunctionComponent<CourseTableProps> = (props) => {
  const routes = useRoutes();
  return (
    <Table
      className="course-table"
      columns={{
        displayName: translate.courseName(),
        students: translate.numberOfStudents(),
        status: translate.status(),
      }}
      data={props.courses}
      onRowClick={(course): void => {
        props.history.push(routes.viewCourse.withParams({ courseId: course.id }));
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
  courses: Array<CourseModel>;
  history: MemoryHistory;
}

export default CourseTable;
