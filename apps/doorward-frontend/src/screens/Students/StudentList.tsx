import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@doorward/ui/types';
import PaginationContainer from '@doorward/ui/components/PaginationContainer';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

export interface StudentListQueryParams {
  search: string;
  page: number;
}

const StudentList: React.FunctionComponent<StudentListProps> = (props) => {
  const routes = useRoutes();
  const { action: fetch, state: studentList } = useApiAction(DoorwardApi, (api) => api.students.getAllStudents);
  const { query, updateLocation } = useQueryParams<StudentListQueryParams>();
  const total = studentList.data.pagination?.totalCount;

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
      <PaginationContainer
        data={studentList.data.students}
        state={studentList}
        onChangePage={(currentPage) => {
          fetch({ page: currentPage });
        }}
      >
        {(students): JSX.Element => {
          return (
            <StudentTable
              students={students}
              onClickStudent={(row) => {
                routes.navigate(routes.viewStudent, {
                  studentId: row.id,
                });
              }}
            />
          );
        }}
      </PaginationContainer>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default StudentList;
