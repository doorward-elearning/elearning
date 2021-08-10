import React, { useEffect, useState } from 'react';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import './styles/AssessmentSubmissionView.scss';
import { AssessmentSubmissionResult } from '@doorward/common/types/assessments';
import QuestionView, { QuestionViewTypes } from './QuestionView';
import InformationCard from '@doorward/ui/components/InformationCard';
import translate from '@doorward/common/lang/translate';
import Tools from '@doorward/common/utils/Tools';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';

const AssessmentSubmissionView: React.FunctionComponent<AssessmentSubmissionViewProps> = ({
  submission,
  assessment,
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
          <InformationCard.Item title={translate('gradedOn')} icon={'grade'} hidden={!submission.gradedOn}>
            {submission.status === AssessmentSubmissionStatus.GRADED
              ? Tools.normalDateTime(submission.gradedOn)
              : translate('notYetGraded')}
          </InformationCard.Item>
          <InformationCard.Item title={translate('submittedOn')} icon={'send'}>
            {Tools.normalDateTime(submission.submittedOn)}
          </InformationCard.Item>
          <InformationCard.Item title={translate('marksObtained')} icon={'grade'}>
            <DisplayLabel>
              {submission.status === AssessmentSubmissionStatus.GRADED
                ? `${results?.totalPoints}`
                : translate('notYetGraded')}
            </DisplayLabel>
          </InformationCard.Item>
          <InformationCard.Item title={translate('percentage')} icon={'grade'}>
            <DisplayLabel>
              {submission.status === AssessmentSubmissionStatus.GRADED
                ? `${((+submission.grade / +results?.totalPoints) * 100).toFixed(1)}%`
                : translate('notYetGraded')}
            </DisplayLabel>
          </InformationCard.Item>
          <InformationCard.Item
            hidden={!(submission.status === AssessmentSubmissionStatus.GRADED)}
            title={translate('gradedBy')}
            icon={submission.grader?.fullName ? 'account_circle' : 'devices'}
          >
            <DisplayLabel>{submission?.grader?.fullName || translate('systemGraded')}</DisplayLabel>
          </InformationCard.Item>
        </InformationCard.Body>
      </InformationCard>
      {submission.status === AssessmentSubmissionStatus.GRADED && (
        <div className="results mt-8">
          {results &&
            Object.keys(results.questions).map((questionId, index) => {
              return results.questions[questionId] ? (
                <QuestionView
                  question={results.questions[questionId]}
                  view={QuestionViewTypes.SUBMISSION_MODE}
                  assessmentOptions={assessment.options}
                  questionNumber={index + 1}
                />
              ) : (
                <React.Fragment />
              );
            })}
        </div>
      )}
    </div>
  );
};

export interface AssessmentSubmissionViewProps {
  submission: AssessmentSubmissionEntity;
  assessment: AssessmentEntity;
}

export default AssessmentSubmissionView;
