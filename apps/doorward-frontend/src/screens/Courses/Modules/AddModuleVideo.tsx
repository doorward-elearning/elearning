import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import useForm from '@doorward/ui/hooks/useForm';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import AddModuleVideoForm from '../../../components/Forms/AddModuleVideoForm';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../../../services/apis/doorward.api';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const AddModuleVideo: React.FunctionComponent<AddModuleVideoProps> = (props): JSX.Element => {
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
          return <AddModuleVideoForm useForm={form} module={module} onCancel={finish} onSuccess={finish} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface AddModuleVideoProps extends PageComponent {}

export default AddModuleVideo;
