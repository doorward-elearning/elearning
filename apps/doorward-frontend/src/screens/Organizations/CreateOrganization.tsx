import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import CreateOrganizationForm from '../../components/Forms/CreateOrganizationForm';
import useRoutes from '../../hooks/useRoutes';
import translate from '@doorward/common/lang/translate';

const CreateOrganization: React.FunctionComponent<CreateOrganizationProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      header={translate.createOrganization()}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
    >
      <CreateOrganizationForm
        onSuccess={() => {
          routes.navigate(routes.organizations);
        }}
        onCancel={() => {
          routes.navigate(routes.organizations);
        }}
      />
    </Layout>
  );
};

export interface CreateOrganizationProps extends PageComponent {}

export default CreateOrganization;
