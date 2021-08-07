import React, { FunctionComponent, useCallback, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import CreateAssessmentForm from '../../../components/Forms/AssessmentForm/CreateAssessmentForm';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { useRouteMatch } from 'react-router';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const CreateExam: FunctionComponent<CreateExamProps> = (props): JSX.Element => {
  const [getModule, state] = useApiAction(DoorwardApi, (api) => api.modules.getModule);
  const match = useRouteMatch<{ moduleId: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    if (match.params.moduleId) {
      getModule(match.params.moduleId);
    }
  }, [match]);

  const module = state.data?.module;

  const finish = useCallback(() => {
    navigation.navigate(ROUTES.courses.view, {
      courseId: module.courseId,
    });
  }, [module]);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header={translate('createExam')}>
      <WebComponent data={module} loading={state.fetching} errors={state.errors}>
        {(module) => (
          <CreateAssessmentForm
            hasSections
            type={AssessmentTypes.EXAM}
            onSuccess={finish}
            onCancel={finish}
            module={module}
          />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface CreateExamProps extends PageComponent {}

export default CreateExam;
