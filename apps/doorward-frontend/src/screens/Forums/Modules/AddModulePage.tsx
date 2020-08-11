import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import useViewForum from '../../../hooks/useViewForum';
import { useRouteMatch } from 'react-router';
import AddModulePageForm from '../../../components/Forms/AddModulePageForm';
import useRoutes from '../../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import { Module } from '@doorward/common/models/Module';

const AddModulePage: React.FunctionComponent<AddModulePageProps> = props => {
  const [module, setModule] = useState<Module>();
  const [forumId, forum] = useViewForum();
  const match: any = useRouteMatch();
  const form = useForm();
  const routes = useRoutes();

  useEffect(() => {
    if (forum.data.forum) {
      setModule(forum.data.forum.modules.find(module => module.id === match.params.moduleId));
    }
  }, [forum.data.forum]);

  const finish = () => {
    routes.navigate(routes.routes.viewForum, {
      forumId: forumId,
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
