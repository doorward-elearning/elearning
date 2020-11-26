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
        name: translate.courseName(),
        percentage: translate.percentage(),
      }}
      data={props.courses}
      onRowClick={(row) => routes.navigate(routes.viewCourse, { courseId: row.id })}
      getCell={(row) => {
        return {
          name: <span>{row.title}</span>,
          percentage: <span>50%</span>,
        };
      }}
    />
  );
};

export interface CoursesInProgressTableProps {
  courses: Array<CourseEntity>;
}

export default CoursesInProgressTable;
