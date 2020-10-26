import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Table from '@doorward/ui/components/Table';
import WebComponent from '@doorward/ui/components/WebComponent';
import useAction from '@doorward/ui/hooks/useActions';
import useRoutes from '../../hooks/useRoutes';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';

const Classrooms: React.FunctionComponent<ClassroomsProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.schools.getAllSchools);
  const fetchSchools = useAction(DoorwardApi.schools.getAllSchools);
  const routes = useRoutes();

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <Layout
      {...props}
      header={translate.classrooms()}
      features={[LayoutFeatures.BREAD_CRUMBS]}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.BACK_BUTTON]}
    >
      <p>{translate.joinAClassroomFromAnySchoolBelow()}</p>
      <WebComponent data={state.data.schools} loading={state.fetching}>
        {(schools) => {
          return (
            <Table
              data={schools}
              columns={{ name: translate.schoolName() }}
              onRowClick={(row) => {
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
