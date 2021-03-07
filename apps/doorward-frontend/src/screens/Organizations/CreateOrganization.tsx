import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import CreateOrganizationForm from '../../components/Forms/CreateOrganizationForm';
import translate from '@doorward/common/lang/translate';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const CreateOrganization: React.FunctionComponent<CreateOrganizationProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <Layout
      {...props}
      header={translate('createOrganization')}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
    >
      <CreateOrganizationForm
        onSuccess={() => {
          navigation.navigate(ROUTES.organizations.list);
        }}
        onCancel={() => {
          navigation.navigate(ROUTES.organizations.list);
        }}
      />
    </Layout>
  );
};

export interface CreateOrganizationProps extends PageComponent {}

export default CreateOrganization;
