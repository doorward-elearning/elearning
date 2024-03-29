import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import { PageComponent } from '@doorward/ui/types';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import WebComponent from '@doorward/ui/components/WebComponent';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

export interface StudentListQueryParams {
  search: string;
  page: number;
}

const StudentList: React.FunctionComponent<StudentListProps> = (props) => {
  const navigation = useNavigation();
  const [fetch, studentList] = useApiAction(DoorwardApi, (api) => api.students.getAllStudents, {
    onNewData: (prevState, nextState) => {
      return nextState.pagination.page === 1
        ? nextState
        : {
            ...nextState,
            students: [...prevState.students, ...nextState.students],
          };
    },
  });
  const { query, updateLocation } = useQueryParams<StudentListQueryParams>();

  useEffect(() => {
    fetch({ page: 1 });
  }, [query.search]);

  return (
    <Layout
      {...props}
      header={translate('allStudents')}
      suggestionsType="students"
      searchPlaceholder={translate('searchStudents')}
      actionBtnProps={{
        text: translate('addStudent'),
        onClick: (): void => navigation.navigate(ROUTES.students.create),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
      onSearch={(text) => {
        updateLocation({
          search: text,
        });
      }}
    >
      <WebComponent data={studentList.data?.students} loading={studentList.fetching} style={{  flex: 1 }}>
        {(students) => (
          <StudentTable
            students={students}
            pagination={studentList.data?.pagination}
            loadMore={(page) => {
              return new Promise<any>((resolve) => {
                fetch({ page });
                resolve();
              });
            }}
            onClickStudent={({ rowData }) => {
              navigation.navigate(ROUTES.students.view, { studentId: rowData.id });
            }}
          />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default StudentList;
