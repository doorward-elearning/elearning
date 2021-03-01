import React, { FunctionComponent, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import CreateAssignmentForm from '../../../components/Forms/CreateAssignmentForm';
import WebComponent from '@doorward/ui/components/WebComponent';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import { useHistory, useRouteMatch } from 'react-router';

const CreateAssignment: FunctionComponent<CreateAssignmentProps> = (props): JSX.Element => {
  const form = useForm();
  const history = useHistory();
  const match = useRouteMatch<{ moduleId: string }>();

  const [getModule, state] = useApiAction(DoorwardApi, (api) => api.modules.getModule);

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
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      noNavBar
      header={translate('createAssignment')}
    >
      <WebComponent data={module} loading={state.fetching}>
        {(data) => <CreateAssignmentForm onSuccess={finish} onCancel={finish} form={form} module={data} />}
      </WebComponent>
    </Layout>
  );
};

export interface CreateAssignmentProps extends PageComponent {}

export default CreateAssignment;
