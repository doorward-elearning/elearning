import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import useViewConference from '../../../hooks/useViewConference';
import { useRouteMatch } from 'react-router';
import AddModulePageForm from '../../../components/Forms/AddModulePageForm';
import useRoutes from '../../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import { Module } from '@doorward/common/models/Module';

const AddModulePage: React.FunctionComponent<AddModulePageProps> = props => {
  const [module, setModule] = useState<Module>();
  const [conferenceId, conference] = useViewConference();
  const match: any = useRouteMatch();
  const form = useForm();
  const routes = useRoutes();

  useEffect(() => {
    if (conference.data.conference) {
      setModule(conference.data.conference.modules.find(module => module.id === match.params.moduleId));
    }
  }, [conference.data.conference]);

  const finish = () => {
    routes.navigate(routes.routes.viewConference, {
      conferenceId: conferenceId,
    });
  };

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} noNavBar header={module?.title}>
      <WebComponent data={module} loading={!module}>
        {(module): JSX.Element => {
          return <AddModulePageForm useForm={form} module={module} onCancel={finish} onSuccess={finish} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface AddModulePageProps extends PageComponent {}

export default AddModulePage;
