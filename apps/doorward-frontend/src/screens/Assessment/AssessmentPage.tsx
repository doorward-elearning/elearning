import React, { useEffect, useState } from 'react';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import moment from 'moment';
import Empty from '@doorward/ui/components/Empty';
import SingleSectionAssessment from './SingleSectionAssessment';
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
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import calculateTotalAssessmentPoints from '../../utils/calculateTotalAssessmentPoints';

export const calculateElapsedTime = (submission: AssessmentSubmissionEntity, assessment: AssessmentEntity) => {
  if (submission) {
    const currentTime = moment();
    const startTime = moment(submission.createdAt);
    const totalTime = assessment.options.timeLimit.minutes * 60;

    return totalTime - currentTime.diff(startTime, 'seconds');
  } else {
    return assessment.options.timeLimit.minutes * 60;
  }
};

const StartAssessment: React.FunctionComponent<StartAssessmentProps> = ({ assessment, ...props }): JSX.Element => {
  const [sections, setSections] = useState([]);
  const form = useForm();
  const [submission, setSubmission] = useState(props.submission);
  const [timeEnded, setTimeEnded] = useState(false);
  const navigation = useNavigation();

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
        navigation.navigate(ROUTES.courses.modules.items.view, { itemId: assessment.id });
      },
    }
  );

  const onReadyToSave = _.debounce((submission) => saveSubmission(assessment.id, { submission }), 1000);

  useRequestToast(submitAssessmentState);

  useEffect(() => {
    if (assessment.sections) {
      const sections = assessment.sections.sort((a, b) => a.order - b.order);

      setSections(sections);
    }
  }, [assessment]);

  return (
    <div>
      {assessment?.options?.timeLimit?.minutes > 0 && (
        <HeaderGrid>
          <DisplayLabel>
            {translate('points')} : {calculateTotalAssessmentPoints(assessment)}
          </DisplayLabel>
          <AssessmentTimer
            totalTimeSeconds={calculateElapsedTime(props.submission, assessment)}
            onTimeEnded={() => setTimeEnded(true)}
          />
        </HeaderGrid>
      )}
      <Form
        form={form}
        initialValues={{
          submission: submission ? JSON.parse(submission.submission) : {},
        }}
        onSubmit={() => {}}
      >
        <SingleSectionAssessment
          sections={sections}
          savingState={saveSubmissionState}
          type={assessment.assessmentType}
          onFinishAssessment={(submission) => {
            submitAssessment(assessment.id, {
              submission,
            });
          }}
          onReadyToSave={onReadyToSave}
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
      setIsAvailable(
        !endDate ||
          endDate.isSameOrAfter(moment()) ||
          (props.submission && props.submission?.status === AssessmentSubmissionStatus.DRAFT)
      );
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
