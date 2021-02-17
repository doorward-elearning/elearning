import React from 'react';
import Table from '@doorward/ui/components/Table';
import { MemoryHistory } from 'history';
import './CourseTable.scss';
import CourseEntity from '@doorward/common/entities/course.entity';
import useRoutes from '../../../hooks/useRoutes';
import translate from '@doorward/common/lang/translate';
import { PaginationMetaData } from '@doorward/common/dtos/response/base.response';
import Tools from '@doorward/common/utils/Tools';

const CourseTable: React.FunctionComponent<CourseTableProps> = (props) => {
  const routes = useRoutes();
  return (
    <Table
      className="course-table"
      columns={{
        title: {
          title: translate('courseName'),
          sortFunction: (a, b) => a.title.toLowerCase() > b.title.toLowerCase(),
          cellRenderer: ({ cellData }) => (
            <div className="course-title">
              <span>{cellData}</span>
            </div>
          ),
        },
        students: {
          title: translate('numberOfStudents'),
          sortFunction: (a, b) => a.numStudents > b.numStudents,
          cellRenderer: ({ rowData }) => <span>{rowData.numStudents}</span>,
        },
        status: {
          title: translate('status'),
        },
        createdAt: {
          title: translate('dateCreated'),
          cellRenderer: ({ cellData }) => Tools.humanReadableTime(cellData),
        },
      }}
      loadMore={props.loadMore}
      data={props.courses}
      pagination={props.pagination}
      onRowClick={({ rowData }): void => {
        props.history.push(routes.viewCourse.withParams({ courseId: rowData.id }));
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
