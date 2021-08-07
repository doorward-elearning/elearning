import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentProfileView from '../../components/UI/StudentProfileView';
import { PageComponent } from '@doorward/ui/types';
import WebComponent from '@doorward/ui/components/WebComponent';
import DoorwardApi from '../../services/apis/doorward.api';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { useRouteMatch } from 'react-router';

const ViewStudent: React.FunctionComponent<ViewStudentProps> = (props): JSX.Element => {
  const [getStudent, student] = useApiAction(DoorwardApi, (api) => api.students.getStudent);
  const {
    params: { studentId },
  } = useRouteMatch();

  useEffect(() => {
    if (studentId) {
      getStudent(studentId);
    }
  }, [studentId]);

  return (
    <Layout
      {...props}
      header={student.data?.student?.fullName}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
    >
      <WebComponent data={student.data?.student} loading={student.fetching}>
        {(data) => <StudentProfileView student={data} />}
      </WebComponent>
    </Layout>
  );
};

export interface ViewStudentProps extends PageComponent {}

export default ViewStudent;
