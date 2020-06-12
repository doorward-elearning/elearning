import React from 'react';
import useRoutes from '../../hooks/useRoutes';
import Layout, { LayoutFeatures } from '../Layout';
import CreateOrganizationForm from '../../components/Forms/CreateOrganizationForm';
import usePageResource from '../../hooks/usePageResource';
import { getOrganization } from '../../reducers/organizations/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Tools from '@edudoor/common/utils/Tools';
import { PageComponent } from '@edudoor/ui/types';

const EditOrganization: React.FunctionComponent<EditOrganizationProps> = (props): JSX.Element => {
  const routes = useRoutes();
  usePageResource('organizationId', getOrganization);
  const state = useSelector((state: State) => state.organizations.get);
  return (
    <Layout
      {...props}
      header={Tools.str(state.data?.organization?.name)}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
    >
      <WebComponent data={state.data.organization} loading={state.fetching}>
        {organization => (
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
