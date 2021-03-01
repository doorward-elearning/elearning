import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import useForm from '@doorward/ui/hooks/useForm';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import AddModuleVideoForm from '../../../components/Forms/AddModuleVideoForm';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../../services/apis/doorward.api';

const AddModuleVideo: React.FunctionComponent<AddModuleVideoProps> = (props): JSX.Element => {
  const [getModule, state] = useApiAction(DoorwardApi, (api) => api.modules.getModule);
  const match = useRouteMatch<{ moduleId: string }>();
  const form = useForm();
  const history = useHistory();

  useEffect(() => {
    if (match.params.moduleId) {
      getModule(match.params.moduleId);
    }
  }, [match]);
  const module = state.data?.module;

  const finish = () => {
    history.push(`/courses/${module?.course?.id}`);
  };

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} noNavBar header={module?.title}>
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
