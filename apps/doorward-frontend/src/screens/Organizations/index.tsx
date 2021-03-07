import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import WebComponent from '@doorward/ui/components/WebComponent';
import OrganizationsTable from '../../components/Tables/OrganizationsTable';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const Organizations: React.FunctionComponent<OrganizationsProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  const [fetch, organizations] = useApiAction(DoorwardApi, (api) => api.organizations.getAllOrganizations);

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Layout
      {...props}
      header={translate('organizations')}
      actionBtnProps={{
        text: translate('createOrganization'),
        onClick: () => navigation.navigate(ROUTES.organizations.create),
      }}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
    >
      <WebComponent data={organizations.data?.organizations} loading={organizations.fetching}>
        {(organizations) => <OrganizationsTable organizations={organizations} />}
      </WebComponent>
    </Layout>
  );
};

export interface OrganizationsProps extends PageComponent {}

export default Organizations;
