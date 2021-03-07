import React from 'react';
import Table from '@doorward/ui/components/Table';
import CourseEntity from '@doorward/common/entities/course.entity';
import translate from '@doorward/common/lang/translate';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const CoursesInProgressTable: React.FunctionComponent<CoursesInProgressTableProps> = (props) => {
  const navigation = useNavigation();
  return (
    <Table
      columns={{
        name: {
          title: translate('courseName'),
          cellRenderer: ({ rowData }) => <span>{rowData.title}</span>,
        },
        percentage: {
          title: translate('percentage'),
          cellRenderer: () => <span>50%</span>,
        },
      }}
      data={props.courses}
      onRowClick={({ rowData }) => navigation.navigate(ROUTES.courses.view, { courseId: rowData.id })}
    />
  );
};

export interface CoursesInProgressTableProps {
  courses: Array<CourseEntity>;
}

export default CoursesInProgressTable;
