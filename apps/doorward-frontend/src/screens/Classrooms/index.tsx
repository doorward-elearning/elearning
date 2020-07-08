import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Table from '@doorward/ui/components/Table';
import WebComponent from '@doorward/ui/components/WebComponent';
import useAction from '@doorward/ui/hooks/useActions';
import { fetchSchoolsAction } from '../../reducers/schools/actions';
import useRoutes from '../../hooks/useRoutes';

const Classrooms: React.FunctionComponent<ClassroomsProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.schools.schoolList);
  const fetchSchools = useAction(fetchSchoolsAction);
  const routes = useRoutes();

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <Layout
      {...props}
      header="Classrooms"
      features={[LayoutFeatures.BREAD_CRUMBS]}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.BACK_BUTTON]}
    >
      <p>Join a classroom from any school below.</p>
      <WebComponent data={state.data.schools} loading={state.fetching}>
        {schools => {
          return (
            <Table
              data={schools}
              columns={{ name: 'School Name' }}
              onRowClick={row => {
                routes.navigate(routes.schoolClassrooms, { schoolId: row.id });
              }}
            />
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ClassroomsProps extends PageComponent {}

export default Classrooms;
