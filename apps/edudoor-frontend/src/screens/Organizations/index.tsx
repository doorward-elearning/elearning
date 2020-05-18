import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@edudoor/ui/components/WebComponent';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import OrganizationsTable from '../../components/Tables/OrganizationsTable';
import useAction from '@edudoor/ui/hooks/useActions';
import { fetchOrganizations } from '../../reducers/organizations/actions';

const Organizations: React.FunctionComponent<OrganizationsProps> = (props): JSX.Element => {
  const routes = useRoutes();
  const organizations = useSelector((state: State) => state.organizations.list);
  const fetch = useAction(fetchOrganizations);

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Layout
      {...props}
      header="Organizations"
      actionBtnProps={{
        text: 'Create Organization',
        onClick: () => routes.navigate(routes.createOrganization),
      }}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
    >
      <WebComponent data={organizations.data.organizations} loading={organizations.fetching}>
        {organizations => <OrganizationsTable organizations={organizations} />}
      </WebComponent>
    </Layout>
  );
};

export interface OrganizationsProps extends PageComponent {}

export default Organizations;
