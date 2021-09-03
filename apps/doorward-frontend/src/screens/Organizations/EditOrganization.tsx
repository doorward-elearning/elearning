import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import CreateOrganizationForm from '../../components/Forms/CreateOrganizationForm';
import WebComponent from '@doorward/ui/components/WebComponent';
import Tools from '@doorward/common/utils/Tools';
import { PageComponent } from '@doorward/ui/types';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { useRouteMatch } from 'react-router';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import DoorwardOrganizationsApi from '../../services/apis/doorward.organizations.api';

const EditOrganization: React.FunctionComponent<EditOrganizationProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  const [getOrganization, state] = useApiAction(DoorwardOrganizationsApi, (api) => api.organizations.getOrganization);
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
              navigation.navigate(ROUTES.organizations.list);
            }}
            onCancel={() => {
              navigation.navigate(ROUTES.organizations.list);
            }}
          />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface EditOrganizationProps extends PageComponent {}

export default EditOrganization;
