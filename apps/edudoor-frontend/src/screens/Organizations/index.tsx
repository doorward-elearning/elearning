import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@edudoor/ui/components/WebComponent';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import OrganizationsTable from '../../components/Tables/OrganizationsTable';

const Organizations: React.FunctionComponent<OrganizationsProps> = (props): JSX.Element => {
  const routes = useRoutes();
  const organizations = useSelector((state: State) => state.organizations.list);
  return (
    <Layout
      {...props}
      header="Organizations"
      actionBtnProps={{
        text: 'Create Organization',
        onClick: () => routes.navigate(routes.createOrganization),
      }}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={organizations.data.organizations} loading={organizations.fetching}>
        {organizations => <OrganizationsTable organizations={organizations} />}
      </WebComponent>
    </Layout>
  );
};

export interface OrganizationsProps extends PageComponent {}

export default Organizations;
