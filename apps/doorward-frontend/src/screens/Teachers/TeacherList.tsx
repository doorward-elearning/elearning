import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import TeachersTable from '../../components/Tables/TeachersTable';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const TeacherList: React.FunctionComponent<StudentListProps> = (props) => {
  const navigation = useNavigation();

  const [getAllTeachers, teacherList] = useApiAction(DoorwardApi, (api) => api.teachers.getAllTeachers);

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
        onClick: (): void => navigation.navigate(ROUTES.teachers.create),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={teacherList.data?.teachers} loading={teacherList.fetching}>
        {(teachers): JSX.Element => {
          return <TeachersTable teachers={teachers} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default TeacherList;
