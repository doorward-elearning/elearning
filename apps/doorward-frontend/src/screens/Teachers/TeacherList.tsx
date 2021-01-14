import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import useRoutes from '../../hooks/useRoutes';
import TeachersTable from '../../components/Tables/TeachersTable';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const TeacherList: React.FunctionComponent<StudentListProps> = (props) => {
  const routes = useRoutes();

  const { action: getAllTeachers, state: teacherList } = useApiAction(
    DoorwardApi,
    (api) => api.teachers.getAllTeachers
  );

  useEffect(() => {
    getAllTeachers();
  }, []);

  return (
    <Layout
      {...props}
      header={translate('allTeachers')}
      suggestionsType="teachers"
      actionBtnProps={{
        text: translate('addTeacher'),
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
