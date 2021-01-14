import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Table from '@doorward/ui/components/Table';
import WebComponent from '@doorward/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const Classrooms: React.FunctionComponent<ClassroomsProps> = (props): JSX.Element => {
  const getAllSchools = useApiAction(DoorwardApi, (api) => api.schools.getAllSchools);
  const fetchSchools = useApiAction(DoorwardApi, (api) => api.schools.getAllSchools);
  const routes = useRoutes();

  useEffect(() => {
    fetchSchools.action();
  }, []);

  return (
    <Layout
      {...props}
      header={translate('classrooms')}
      features={[LayoutFeatures.BREAD_CRUMBS]}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.BACK_BUTTON]}
    >
      <p>{translate('joinAClassroomFromAnySchoolBelow')}</p>
      <WebComponent data={getAllSchools.state.data.schools} loading={getAllSchools.state.fetching}>
        {(schools) => {
          return (
            <Table
              data={schools}
              columns={{ name: translate('schoolName') }}
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
