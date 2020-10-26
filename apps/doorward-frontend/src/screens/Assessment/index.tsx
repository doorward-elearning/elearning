import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import useRoutes from '../../hooks/useRoutes';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardApi from '../../services/apis/doorward.api';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import Layout, { LayoutFeatures } from '../Layout';
import Tools from '@doorward/common/utils/Tools';
import { PageComponent } from '@doorward/ui/types';
import AssessmentPage from './AssessmentPage';
import WebComponent from '@doorward/ui/components/WebComponent';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import Empty from '@doorward/ui/components/Empty';
import translate from '@doorward/common/lang/translate';

const Assessment: React.FunctionComponent<AssessmentProps> = (props): JSX.Element => {
  const [assessment, setAssessment] = useState<AssessmentEntity>();
  const match: any = useRouteMatch();
  const routes = useRoutes();

  const fetchSubmission = useAction(DoorwardApi.assessments.getSubmission);
  const fetchItem = useAction(DoorwardApi.moduleItems.getModuleItem);

  useEffect(() => {
    fetchItem(match.params.assessmentId);
    fetchSubmission(match.params.assessmentId);
  }, []);

  const state = useDoorwardApi((state) => state.moduleItems.getModuleItem);
  const submissionState = useDoorwardApi((state) => state.assessments.getSubmission);

  useEffect(() => {
    const moduleItem = state.data.item;
    if (moduleItem) {
      setAssessment(moduleItem as AssessmentEntity);
    }
  }, [state]);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]}
      header={Tools.str(state.fetching ? '' : assessment?.title)}
    >
      <WebComponent
        data={{ assessment, submission: submissionState.data?.submission }}
        loading={submissionState.fetching || state.fetching}
        hasData={() => !submissionState.fetching && !state.fetching && !!assessment}
      >
        {({ assessment, submission }) => {
          return submission?.status === AssessmentSubmissionStatus.SUBMITTED ? (
            <Empty
              message={translate.youHaveAlreadySubmittedThisAssessment()}
              actionMessage={translate.goBack()}
              onAction={() => routes.navigate(routes.dashboard)}
            />
          ) : (
            <AssessmentPage assessment={assessment} submission={submission} />
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface AssessmentProps extends PageComponent {}

export default Assessment;
