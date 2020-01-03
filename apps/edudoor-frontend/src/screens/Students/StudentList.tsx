import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import StudentTable from '../../components/static/Tables/StudentTable';
import WebComponent from '../../components/ui/WebComponent';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '../../hooks/useActions';
import useRoutes from '../../hooks/useRoutes';
import { fetchStudentListAction } from '../../reducers/students/actions';

const StudentList: React.FunctionComponent<StudentListProps> = props => {
  const studentList = useSelector((state: State) => state.students.studentList);
  const routes = useRoutes();

  const fetch = useAction(fetchStudentListAction);

  useEffect(() => {
    fetch();
  }, []);

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
      <WebComponent data={studentList.data.students} loading={studentList.fetching}>
        {(students): JSX.Element => {
          return <StudentTable students={students} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default StudentList;
