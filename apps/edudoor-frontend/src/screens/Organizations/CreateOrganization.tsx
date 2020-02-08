import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';

const CreateOrganization: React.FunctionComponent<CreateOrganizationProps> = (props): JSX.Element => {
  return (
    <Layout {...props} header="Create Organization" features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}>
      <div>Create Organization</div>
    </Layout>
  );
};

export interface CreateOrganizationProps extends PageComponent {}

export default CreateOrganization;
