import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import { useRouteMatch } from 'react-router';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import WebComponent from '@doorward/ui/components/WebComponent';

const ViewSubmissions: React.FunctionComponent<ViewSubmissionsProps> = (props): JSX.Element => {
  const match = useRouteMatch<{ assessmentId: string }>();
  const [getAssessment, assessmentState] = useApiAction(DoorwardApi, (api) => api.moduleItems.getModuleItem);
  const [getSubmissions, submissionsState] = useApiAction(DoorwardApi, (api) => api.assessments.getStudentSubmissions);

  useEffect(() => {
    if (match.params.assessmentId) {
      getAssessment(match.params.assessmentId);
      getSubmissions(match.params.assessmentId);
    }
  }, [match.params]);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]}
      header={
        assessmentState.data?.item
          ? translate('assessmentSubmissionsTitle', { title: assessmentState.data.item.title })
          : ''
      }
    >
      <WebComponent
        data={submissionsState.data?.submissions}
        loading={submissionsState.fetching}
        emptyMessage={translate('noSubmissionsMessage')}
      >
        {(submissions) => <div />}
      </WebComponent>
    </Layout>
  );
};

export interface ViewSubmissionsProps extends PageComponent {}

export default ViewSubmissions;
