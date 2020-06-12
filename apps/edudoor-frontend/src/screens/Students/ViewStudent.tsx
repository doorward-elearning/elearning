import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentProfileView from '../../components/UI/StudentProfileView';
import { PageComponent } from '@edudoor/ui/types';
import usePageResource from '../../hooks/usePageResource';
import { getStudentAction } from '../../reducers/students/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '@edudoor/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';

const ViewStudent: React.FunctionComponent<ViewStudentProps> = (props): JSX.Element => {
  usePageResource('studentId', getStudentAction);
  const routes = useRoutes();
  const student = useSelector((state: State) => state.students.student);

  useEffect(() => {
    if (student.data.student) {
      routes.setCurrentTitle(student.data.student.fullName);
    }
  }, [student]);

  return (
    <Layout
      {...props}
      header={student.data?.student?.fullName}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
    >
      <WebComponent data={student.data.student} loading={student.fetching}>
        {data => {
          return <StudentProfileView student={data} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewStudentProps extends PageComponent {}

export default ViewStudent;
