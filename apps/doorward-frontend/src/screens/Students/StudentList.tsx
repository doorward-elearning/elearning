import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@doorward/ui/types';
import PaginationContainer from '@doorward/ui/components/PaginationContainer';
import useAction from '@doorward/ui/hooks/useActions';
import { fetchStudentListAction } from '../../reducers/students/actions';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import { ParsedUrlQuery } from 'querystring';

export interface StudentListQueryParams extends ParsedUrlQuery {
  search: string;
  page: string;
}

const StudentList: React.FunctionComponent<StudentListProps> = props => {
  const studentList = useSelector((state: State) => state.students.studentList);
  const routes = useRoutes();
  const fetch = useAction(fetchStudentListAction);
  const { query, updateLocation } = useQueryParams<StudentListQueryParams>();
  const total = studentList.data.meta?.pagination?.total;

  useEffect(() => {
    fetch({ page: query.page }, { search: query.search });
  }, [query.search]);

  return (
    <Layout
      {...props}
      header="All Members"
      suggestionsType="members"
      searchPlaceholder="Search members..."
      headerBadge={total === undefined ? null : `${total}`}
      actionBtnProps={{
        text: 'Add Member',
        onClick: (): void => props.history.push(routes.routes.newStudent.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
      onSearch={text => {
        updateLocation({
          search: text,
        });
      }}
    >
      <PaginationContainer
        data={studentList.data.students}
        state={studentList}
        onChangePage={currentPage => {
          fetch({ page: currentPage });
        }}
      >
        {(students): JSX.Element => {
          return (
            <StudentTable
              students={students}
              onClickStudent={row => {
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
