import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@doorward/ui/types';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

export interface StudentListQueryParams {
  search: string;
  page: number;
}

const StudentList: React.FunctionComponent<StudentListProps> = (props) => {
  const routes = useRoutes();
  const [fetch, studentList] = useApiAction(DoorwardApi, (api) => api.students.getAllStudents, {
    onNewData: (prevState, nextState) => ({
      ...nextState,
      students: [...prevState.students, ...nextState.students],
    }),
  });
  const { query, updateLocation } = useQueryParams<StudentListQueryParams>();
  const total = studentList.data?.pagination?.totalCount;

  useEffect(() => {
    fetch();
  }, [query.search]);

  return (
    <Layout
      {...props}
      header={translate('allStudents')}
      suggestionsType="students"
      searchPlaceholder={translate('searchStudents')}
      headerBadge={total === undefined ? null : `${total}`}
      actionBtnProps={{
        text: translate('addStudent'),
        onClick: (): void => props.history.push(routes.routes.newStudent.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
      onSearch={(text) => {
        updateLocation({
          search: text,
        });
      }}
    >
      <StudentTable
        students={studentList.data?.students}
        pagination={studentList.data?.pagination}
        loadMore={(page) => {
          return new Promise<any>((resolve) => {
            fetch({ page });
            resolve();
          });
        }}
        onClickStudent={(row) => {
          routes.navigate(routes.viewStudent, {
            studentId: row.id,
          });
        }}
      />
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default StudentList;
