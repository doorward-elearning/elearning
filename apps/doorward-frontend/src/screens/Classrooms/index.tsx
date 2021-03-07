import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Table from '@doorward/ui/components/Table';
import WebComponent from '@doorward/ui/components/WebComponent';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const Classrooms: React.FunctionComponent<ClassroomsProps> = (props): JSX.Element => {
  const [fetchSchools, schoolState] = useApiAction(DoorwardApi, (api) => api.schools.getAllSchools);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <Layout
      {...props}
      header={translate('classrooms')}
      features={[LayoutFeatures.BREAD_CRUMBS]}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.BACK_BUTTON]}
    >
      <div>
        <p>{translate('joinAClassroomFromAnySchoolBelow')}</p>
        <WebComponent data={schoolState.data?.schools} loading={schoolState.fetching}>
          {(schools) => {
            return (
              <Table
                height={400}
                data={schools}
                columns={{
                  name: {
                    title: translate('schoolName'),
                  },
                }}
                onRowClick={({ rowData }) => {
                  navigation.navigate(ROUTES.classrooms.classroom, {
                    schoolId: rowData.id,
                  });
                }}
              />
            );
          }}
        </WebComponent>
      </div>
    </Layout>
  );
};

export interface ClassroomsProps extends PageComponent {}

export default Classrooms;
