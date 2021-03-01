import React, { useEffect, useState } from 'react';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import moment from 'moment';
import Empty from '@doorward/ui/components/Empty';
import SingleQuestionAssessment from './SingleQuestionAssessment';
import AssessmentTimer from './AssessmentTimer';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import _ from 'lodash';
import Form from '@doorward/ui/components/Form';
import useForm from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../services/apis/doorward.api';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import useRequestToast from '@doorward/ui/hooks/useRequestToast';
import { useHistory } from 'react-router';

const StartAssessment: React.FunctionComponent<StartAssessmentProps> = ({ assessment, ...props }): JSX.Element => {
  const [questions, setQuestions] = useState([]);
  const form = useForm();
  const [submission, setSubmission] = useState(props.submission);
  const [startQuestion, setStartQuestion] = useState(0);
  const [timeEnded, setTimeEnded] = useState(false);
  const history = useHistory();

  const calculateElapsedTime = () => {
    if (props.submission) {
      const currentTime = moment();
      const startTime = moment(props.submission.createdAt);
      const totalTime = assessment.options.timeLimit.minutes * 60;

      return totalTime - currentTime.diff(startTime, 'seconds');
    } else {
      return assessment.options.timeLimit.minutes * 60;
    }
  };

  const [saveSubmission, saveSubmissionState] = useApiAction(DoorwardApi, (api) => api.assessments.saveAssessment, {
    onSuccess: (data) => {
      setSubmission(data?.submission);
    },
  });
  const [submitAssessment, submitAssessmentState] = useApiAction(
    DoorwardApi,
    (api) => api.assessments.submitAssignment,
    {
      onSuccess: () => {
        history.push(`/moduleItems/${assessment.id}`);
      },
    }
  );

  useRequestToast(submitAssessmentState);

  useEffect(() => {
    if (assessment.questions) {
      let shuffled = _.shuffle(assessment.questions);
      let startQuestion = 0;

      if (submission) {
        const submittedQuestions = Object.keys(_.pickBy(JSON.parse(submission.submission), _.identity));
        shuffled = shuffled.sort((a, b) => (submittedQuestions.includes(a.id) ? -1 : 1));
        startQuestion = Math.min(shuffled.length - 1, submittedQuestions.length);
      }

      setQuestions(shuffled);
      setStartQuestion(startQuestion);
    }
  }, [assessment]);

  return (
    <div>
      {assessment?.options?.timeLimit?.minutes > 0 && (
        <HeaderGrid>
          <DisplayLabel>
            {translate('points')}: {assessment.questions.reduce((acc, cur) => acc + cur.points, 0)}
          </DisplayLabel>
          <AssessmentTimer totalTimeSeconds={calculateElapsedTime()} onTimeEnded={() => setTimeEnded(true)} />
        </HeaderGrid>
      )}
      <Form
        form={form}
        initialValues={{
          submission: submission ? JSON.parse(submission.submission) : {},
        }}
        onSubmit={() => {}}
      >
        <SingleQuestionAssessment
          questions={questions}
          startQuestion={startQuestion}
          type={assessment.assessmentType}
          onFinishAssessment={(submission) => {
            submitAssessment(assessment.id, {
              submission,
            });
          }}
          onReadyToSave={(submission) => {
            saveSubmission(assessment.id, {
              submission,
            });
          }}
        />
      </Form>
    </div>
  );
};

export interface StartAssessmentProps {
  assessment: AssessmentEntity;
  submission?: AssessmentSubmissionEntity;
}

const AssessmentPage: React.FunctionComponent<AssessmentPageProps> = (props): JSX.Element => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const availability = props.assessment?.options?.availability;
    const startDate = moment(availability?.from || new Date());
    const endDate = availability?.to && moment(availability.to);

    if (startDate.isSameOrBefore(moment())) {
      setIsAvailable(!endDate || endDate.isSameOrAfter(moment()));
    } else {
      setIsAvailable(true);
    }
  }, [props.assessment]);

  return (
    <div>
      {isAvailable ? (
        <StartAssessment assessment={props.assessment} submission={props.submission} />
      ) : (
        <Empty message={`This ${props.assessment.assessmentType} is not available`} icon="assessment" />
      )}
    </div>
  );
};

export interface AssessmentPageProps {
  assessment: AssessmentEntity;
  submission?: AssessmentSubmissionEntity;
}

export default AssessmentPage;
