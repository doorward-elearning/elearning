import React, { useEffect, useState } from 'react';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import './styles/AssessmentSubmissionView.scss';
import { AssessmentSubmissionResult } from '@doorward/common/types/assessments';
import QuestionView, { QuestionViewTypes } from './QuestionView';
import InformationCard from '@doorward/ui/components/InformationCard';
import translate from '@doorward/common/lang/translate';
import Tools from '@doorward/common/utils/Tools';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';

const AssessmentSubmissionView: React.FunctionComponent<AssessmentSubmissionViewProps> = ({
  submission,
}): JSX.Element => {
  const [results, setResults] = useState<AssessmentSubmissionResult>();

  useEffect(() => {
    if (submission) {
      setResults(JSON.parse(submission.submissionResults));
    }
  }, [submission]);

  return (
    <div className="ed-assessment-submission-view">
      <InformationCard>
        <InformationCard.Body>
          <InformationCard.Item title={translate('timeTaken')} icon="timer">
            {Tools.timeTaken(submission.assessmentTime)}
          </InformationCard.Item>
          <InformationCard.Item title={translate('gradedOn')} icon={'grade'}>
            {Tools.normalDateTime(submission.gradedOn)}
          </InformationCard.Item>
          <InformationCard.Item title={translate('submittedOn')} icon={'send'}>
            {Tools.normalDateTime(submission.submittedOn)}
          </InformationCard.Item>
          <InformationCard.Item title={translate('grade')} icon={'grade'}>
            <DisplayLabel>
              {translate('gradeOutOf', { points: submission.grade, totalPoints: results?.totalPoints })}
            </DisplayLabel>
          </InformationCard.Item>
          <InformationCard.Item
            title={translate('gradedBy')}
            icon={submission.grader?.fullName ? 'account_circle' : 'devices'}
          >
            <DisplayLabel>{submission?.grader?.fullName || translate('systemGraded')}</DisplayLabel>
          </InformationCard.Item>
        </InformationCard.Body>
      </InformationCard>
      <div className="results mt-8">
        {results &&
          Object.keys(results.questions).map((questionId) => {
            return <QuestionView question={results.questions[questionId]} view={QuestionViewTypes.SUBMISSION_MODE} />;
          })}
      </div>
    </div>
  );
};

export interface AssessmentSubmissionViewProps {
  submission: AssessmentSubmissionEntity;
}

export default AssessmentSubmissionView;