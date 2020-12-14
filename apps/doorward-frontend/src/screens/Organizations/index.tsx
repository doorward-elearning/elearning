import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import OrganizationsTable from '../../components/Tables/OrganizationsTable';
import useAction from '@doorward/ui/hooks/useActions';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';

const Organizations: React.FunctionComponent<OrganizationsProps> = (props): JSX.Element => {
  const routes = useRoutes();
  const organizations = useDoorwardApi((state) => state.organizations.getAllOrganizations);
  const fetch = useAction(DoorwardApi.organizations.getAllOrganizations);

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Layout
      {...props}
      header={translate('organizations')}
      actionBtnProps={{
        text: translate('createOrganization'),
        onClick: () => routes.navigate(routes.createOrganization),
      }}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
    >
      <WebComponent data={organizations.data.organizations} loading={organizations.fetching}>
        {(organizations) => <OrganizationsTable organizations={organizations} />}
      </WebComponent>
    </Layout>
  );
};

export interface OrganizationsProps extends PageComponent {}

export default Organizations;
