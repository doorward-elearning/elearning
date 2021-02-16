import React from 'react';
import Table from '@doorward/ui/components/Table';
import { MemoryHistory } from 'history';
import './CourseTable.scss';
import CourseEntity from '@doorward/common/entities/course.entity';
import useRoutes from '../../../hooks/useRoutes';
import translate from '@doorward/common/lang/translate';
import { PaginationMetaData } from '@doorward/common/dtos/response/base.response';

const CourseTable: React.FunctionComponent<CourseTableProps> = (props) => {
  const routes = useRoutes();
  return (
    <Table
      className="course-table"
      columns={{
        title: translate('courseName'),
        students: translate('numberOfStudents'),
        status: translate('status'),
      }}
      loadMore={props.loadMore}
      data={props.courses}
      pagination={props.pagination}
      onRowClick={(course): void => {
        props.history.push(routes.viewCourse.withParams({ courseId: course.id }));
      }}
      getCell={{
        title: ({ cellData }) => (
          <div className="course-title">
            <span>{cellData}</span>
          </div>
        ),
        students: ({ rowData }) => <span>{rowData.numStudents}</span>,
      }}
    />
  );
};

export interface CourseTableProps {
  courses: Array<CourseEntity>;
  history: MemoryHistory;
  loadMore?: (page: number) => Promise<any>;
  pagination?: PaginationMetaData;
}

export default CourseTable;
