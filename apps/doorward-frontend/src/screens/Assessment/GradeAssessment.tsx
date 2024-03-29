import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import { useRouteMatch } from 'react-router';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../../services/apis/doorward.api';
import Tools from '@doorward/common/utils/Tools';
import WebComponent from '@doorward/ui/components/WebComponent';
import InformationCard from '@doorward/ui/components/InformationCard';
import translate from '@doorward/common/lang/translate';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import { AssessmentSubmissionResult } from '@doorward/common/types/assessments';

const GradeAssessment: React.FunctionComponent<GradeAssessmentProps> = (props): JSX.Element => {
  const match = useRouteMatch<{ submissionId: string }>();
  const [getSubmission, submissionState] = useApiAction(DoorwardApi, (api) => api.assessments.getStudentSubmission);
  const [getAssessment, assessmentState] = useApiAction(DoorwardApi, (api) => api.moduleItems.getModuleItem);
  const [title, setTitle] = useState('');
  const [results, setResults] = useState<AssessmentSubmissionResult>();

  useEffect(() => {
    if (submissionState.data?.submission) {
      setResults(JSON.parse(submissionState.data?.submission.submissionResults));
    }
  }, [submissionState]);

  useEffect(() => {
    if (match.params.submissionId) {
      getSubmission(match.params.submissionId);
    }
  }, [match.params]);

  useEffect(() => {
    const submission = submissionState.data?.submission;
    if (submission?.assessmentId) {
      setTitle(submission?.student?.fullName);
      getAssessment(submission?.assessmentId);
    }
  }, [submissionState]);

  useEffect(() => {
    const assessment = assessmentState.data?.item;
    const submission = submissionState.data?.submission;
    if (assessment && submission) {
      setTitle(submission.student.fullName + ' - ' + assessment.title);
    }
  }, [assessmentState, submissionState]);

  return (
    <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]} header={Tools.str(title)}>
      <WebComponent
        data={{ assessment: assessmentState?.data?.item, submission: submissionState?.data?.submission }}
        hasData={(data) => !!(data.assessment && data.submission)}
        loading={assessmentState.fetching || submissionState.fetching}
      >
        {({ submission, assessment }) => (
          <div className="grade-assessment-view">
            <InformationCard>
              <InformationCard.Body>
                <InformationCard.Item title={translate('timeTaken')} icon={'timer'}>
                  <DisplayLabel>{Tools.timeTaken(submission.assessmentTime)}</DisplayLabel>
                </InformationCard.Item>
                <InformationCard.Item title={translate('status')} icon={'info'}>
                  {submission.status}
                </InformationCard.Item>
                <InformationCard.Item title={translate('gradedOn')} icon={'date_range'}>
                  {Tools.normalDateTime(submission.gradedOn)}
                </InformationCard.Item>
                <InformationCard.Item title={translate('marksObtained')} icon={'grade'}>
                  {`${(submission.grade)}`}
                </InformationCard.Item>
                <InformationCard.Item title={translate('totalPoints')} icon={'grade'}>
                  {`${(results?.totalPoints)}`}
                </InformationCard.Item>
                <InformationCard.Item title={translate('percentage')} icon={'grade'}>
                  {`${((+submission.grade / +results?.totalPoints) * 100).toFixed(1)}%`}
                </InformationCard.Item>
              </InformationCard.Body>
            </InformationCard>
          </div>
        )}
      </WebComponent>
    </Layout>
  );
};

export interface GradeAssessmentProps extends PageComponent {}

export default GradeAssessment;
