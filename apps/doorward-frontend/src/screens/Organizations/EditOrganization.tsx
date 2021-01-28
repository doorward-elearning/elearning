import React from 'react';
import useRoutes from '../../hooks/useRoutes';
import Layout, { LayoutFeatures } from '../Layout';
import CreateOrganizationForm from '../../components/Forms/CreateOrganizationForm';
import usePageResource from '../../hooks/usePageResource';
import WebComponent from '@doorward/ui/components/WebComponent';
import Tools from '@doorward/common/utils/Tools';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import { useApiAction } from 'use-api-action';

const EditOrganization: React.FunctionComponent<EditOrganizationProps> = (props): JSX.Element => {
  const routes = useRoutes();
  const [getOrganization, state] = useApiAction(DoorwardApi, (api) => api.organizations.getOrganization);

  usePageResource('organizationId', getOrganization);

  return (
    <Layout
      {...props}
      header={Tools.str(state.data?.organization?.name)}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
    >
      <WebComponent data={state.data?.organization} loading={state.fetching}>
        {(organization) => (
          <CreateOrganizationForm
            organization={organization}
            onSuccess={() => {
              routes.navigate(routes.organizations);
            }}
            onCancel={() => {
              routes.navigate(routes.organizations);
            }}
          />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface EditOrganizationProps extends PageComponent {}

export default EditOrganization;
