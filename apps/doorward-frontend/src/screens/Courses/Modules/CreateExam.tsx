import React, { FunctionComponent, useCallback, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import CreateAssessmentForm from '../../../components/Forms/AssessmentForm/CreateAssessmentForm';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import { useHistory, useRouteMatch } from 'react-router';

const CreateExam: FunctionComponent<CreateExamProps> = (props): JSX.Element => {
  const [getModule, state] = useApiAction(DoorwardApi, (api) => api.modules.getModule);
  const match = useRouteMatch<{ moduleId: string }>();
  const history = useHistory();

  useEffect(() => {
    if (match.params.moduleId) {
      getModule(match.params.moduleId);
    }
  }, [match]);

  const module = state.data?.module;

  const finish = useCallback(() => {
    history.push(`/courses/${module.course?.id}`);
  }, []);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header={translate('createExam')}>
      <WebComponent data={module} loading={state.fetching} errors={state.errors}>
        {(module) => (
          <CreateAssessmentForm type={AssessmentTypes.EXAM} onSuccess={finish} onCancel={finish} module={module} />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface CreateExamProps extends PageComponent {}

export default CreateExam;
