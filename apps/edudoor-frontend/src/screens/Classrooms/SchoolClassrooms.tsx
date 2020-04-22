import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar/features';
import { fetchSchoolAction } from '../../reducers/schools/actions';
import usePageResource from '@edudoor/ui/hooks/usePageResource';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '@edudoor/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import Table from '@edudoor/ui/components/Table';

const SchoolClassrooms: React.FunctionComponent<ClassroomsProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.schools.school);
  usePageResource('schoolId', fetchSchoolAction);
  const routes = useRoutes();

  useEffect(() => {
    if (state.data.school) {
      routes.setCurrentTitle(state.data.school.name);
    }
  }, [state]);
  return (
    <Layout
      {...props}
      header={state.data?.school?.name}
      navFeatures={[NavbarFeatures.BACK_BUTTON, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.PAGE_LOGO]}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      actionBtnProps={{ text: 'Add Classroom' }}
    >
      <WebComponent
        data={state.data?.school?.classrooms}
        loading={state.fetching}
        emptyMessage={'No classrooms have been created for this school'}
        icon="business_center"
      >
        {classrooms => {
          return <Table data={classrooms} columns={{ name: 'Name' }} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ClassroomsProps extends PageComponent {}

export default SchoolClassrooms;
