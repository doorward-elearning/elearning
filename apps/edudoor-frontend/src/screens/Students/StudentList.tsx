import React, { useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@edudoor/ui/types';
import PaginationContainer from '@edudoor/ui/components/PaginationContainer';
import useAction from '@edudoor/ui/hooks/useActions';
import { fetchStudentListAction } from '../../reducers/students/actions';

const StudentList: React.FunctionComponent<StudentListProps> = props => {
  const studentList = useSelector((state: State) => state.students.studentList);
  const routes = useRoutes();
  const fetch = useAction(fetchStudentListAction);

  return (
    <Layout
      {...props}
      header="All Students"
      actionBtnProps={{
        text: 'Add Student',
        onClick: (): void => props.history.push(routes.routes.newStudent.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
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
