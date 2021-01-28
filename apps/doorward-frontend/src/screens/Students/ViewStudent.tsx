import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentProfileView from '../../components/UI/StudentProfileView';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../hooks/usePageResource';
import WebComponent from '@doorward/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import DoorwardApi from '../../services/apis/doorward.api';
import { useApiAction } from 'use-api-action';

const ViewStudent: React.FunctionComponent<ViewStudentProps> = (props): JSX.Element => {
  const [getStudent, student] = useApiAction(DoorwardApi, (api) => api.students.getStudent);
  usePageResource('studentId', getStudent);
  const routes = useRoutes();

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
        {(data) => <StudentProfileView student={data} />}
      </WebComponent>
    </Layout>
  );
};

export interface ViewStudentProps extends PageComponent {}

export default ViewStudent;
