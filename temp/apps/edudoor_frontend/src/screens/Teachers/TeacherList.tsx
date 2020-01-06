import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/src/types';
import WebComponent from '@edudoor/ui/src/components/WebComponent';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@edudoor/ui/src/hooks/useActions';
import useRoutes from '../../hooks/useRoutes';
import { fetchTeacherListAction } from '../../reducers/teachers/actions';
import TeachersTable from '../../components/Tables/TeachersTable';

const TeacherList: React.FunctionComponent<StudentListProps> = props => {
  const teacherList = useSelector((state: State) => state.teachers.teacherList);
  const routes = useRoutes();

  const fetch = useAction(fetchTeacherListAction);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Layout
      {...props}
      header="All Teachers"
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
