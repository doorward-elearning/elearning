import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import CreateOrganizationForm from '../../components/Forms/CreateOrganizationForm';
import WebComponent from '@doorward/ui/components/WebComponent';
import Tools from '@doorward/common/utils/Tools';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import { useApiAction } from 'use-api-action';
import { useHistory, useRouteMatch } from 'react-router';

const EditOrganization: React.FunctionComponent<EditOrganizationProps> = (props): JSX.Element => {
  const history = useHistory();
  const [getOrganization, state] = useApiAction(DoorwardApi, (api) => api.organizations.getOrganization);
  const {
    params: { organizationId },
  } = useRouteMatch();

  useEffect(() => {
    if (organizationId) {
      getOrganization(organizationId);
    }
  }, [organizationId]);

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
              history.push('/organizations');
            }}
            onCancel={() => {
              history.push('/organizations');
            }}
          />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface EditOrganizationProps extends PageComponent {}

export default EditOrganization;
