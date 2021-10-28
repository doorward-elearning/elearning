import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import DoorwardApi from '../../services/apis/doorward.api';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import Layout, { LayoutFeatures } from '../Layout';
import Tools from '@doorward/common/utils/Tools';
import { PageComponent } from '@doorward/ui/types';
import AssessmentPage from './AssessmentPage';
import WebComponent from '@doorward/ui/components/WebComponent';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import Empty from '@doorward/ui/components/Empty';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const Assessment: React.FunctionComponent<AssessmentProps> = (props): JSX.Element => {
  const [assessment, setAssessment] = useState<AssessmentEntity>();
  const match: any = useRouteMatch();
  const navigation = useNavigation();

  const [fetchSubmission, submissionState] = useApiAction(DoorwardApi, (api) => api.assessments.getSubmission);
  const [fetchItem, itemState] = useApiAction(DoorwardApi, (api) => api.moduleItems.getModuleItem);


  useEffect(() => {
    fetchItem(match.params.assessmentId);
    fetchSubmission(match.params.assessmentId);
  }, []);


  useEffect(() => {
    const moduleItem = itemState.data?.item;
    if (moduleItem) {
      setAssessment(moduleItem as AssessmentEntity);
    }
  }, [itemState]);


  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]}
      header={Tools.str(itemState.fetching ? '' : assessment?.title)}
    >
      <WebComponent
        data={{ assessment, submission: submissionState.data?.submission }}
        loading={submissionState.fetching || itemState.fetching}
        hasData={() => !submissionState.fetching && !itemState.fetching && !!assessment}
      >
        {({ assessment, submission }) => {
          return submission?.status === AssessmentSubmissionStatus.SUBMITTED ? (
            <Empty
              message={translate('youHaveAlreadySubmittedThisAssessment')}
              actionMessage={translate('goBack')}
              onAction={() => navigation.navigate(ROUTES.courses.modules.items.view, { itemId: assessment.id })}
            />
          ) : (
            <AssessmentPage assessment={assessment} submission={submission}  />
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface AssessmentProps extends PageComponent {}

export default Assessment;
