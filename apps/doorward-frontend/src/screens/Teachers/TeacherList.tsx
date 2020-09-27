import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import useRoutes from '../../hooks/useRoutes';
import TeachersTable from '../../components/Tables/TeachersTable';
import WebComponent from '@doorward/ui/components/WebComponent';
import useAction from '@doorward/ui/hooks/useActions';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';

const TeacherList: React.FunctionComponent<StudentListProps> = (props) => {
  const teacherList = useDoorwardApi((state) => state.teachers.getAllTeachers);
  const routes = useRoutes();

  const fetch = useAction(DoorwardApi.teachers.getAllTeachers);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Layout
      {...props}
      header="All Teachers"
      suggestionsType="teachers"
      actionBtnProps={{
        text: 'Add Teacher',
        onClick: (): void => props.history.push(routes.routes.addTeacher.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={teacherList.data.teachers} loading={teacherList.fetching}>
        {(teachers): JSX.Element => {
          return <TeachersTable teachers={teachers} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default TeacherList;
