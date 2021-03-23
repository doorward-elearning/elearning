import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { useRouteMatch } from 'react-router';
import AddModulePageForm from '../../../components/Forms/AddModulePageForm';
import WebComponent from '@doorward/ui/components/WebComponent';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../../services/apis/doorward.api';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const AddModulePage: React.FunctionComponent<AddModulePageProps> = (props) => {
  const [getModule, state] = useApiAction(DoorwardApi, (api) => api.modules.getModule);
  const match = useRouteMatch<{ moduleId: string }>();
  const form = useForm();
  const navigation = useNavigation();

  useEffect(() => {
    if (match.params.moduleId) {
      getModule(match.params.moduleId);
    }
  }, [match]);

  const module = state.data?.module;

  const finish = () => {
    navigation.navigate(ROUTES.courses.view, {
      courseId: module?.courseId,
    });
  };

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header={module?.title}>
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
