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
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import useRequestToast from '@doorward/ui/hooks/useRequestToast';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import calculateTotalAssessmentPoints from '@doorward/common/utils/calculateTotalAssessmentPoints';
import Icon from '@doorward/ui/components/Icon';
import './styles/SingleQuestionAssessment.scss';
import Button from '@doorward/ui/components/Buttons/Button';
import Spacer from '@doorward/ui/components/Spacer';
import ConfirmModal from '@doorward/ui/components/ConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';
import UserEntity from '@doorward/common/entities/user.entity';
import AssessmentView from '../../components/UI/AssessmentView';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import Header from '@doorward/ui/components/Header';
import AssessmentSubmissionView from '../../components/UI/AssessmentView/AssessmentSubmissionView';

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

const StartAssessment: React.FunctionComponent<StartAssessmentProps> = ({
  assessment,
  currentUser,
  ...props
}): JSX.Element => {
  const [sections, setSections] = useState([]);
  const form = useForm();
  const [submission, setSubmission] = useState(props.submission);
  const [timeEnded, setTimeEnded] = useState(false);
  const navigation = useNavigation();
  const confirmModal = useModal();

  const [saveSubmission, saveSubmissionState] = useApiAction(DoorwardApi, (api) => api.assessments.saveAssessment, {
    onSuccess: (data) => {
      setSubmission(data?.submission);
    },
  });

  const [getSubmission, getSubmissionState] = useApiAction(DoorwardApi, (api) => api.assessments.getSubmission, {
    onSuccess: (data) => {
      setSubmission(data?.submission);
    },
  });

  const [submitAssessment, submitAssessmentState] = useApiAction(
    DoorwardApi,
    (api) => api.assessments.submitAssignment,
    {
      onSuccess: () => {
        if (assessment.options?.publicExam?.allow) {
          getSubmission(assessment.id);
        } else {
          navigation.navigate(ROUTES.courses.modules.items.view, { itemId: assessment.id });
        }
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
      <ConfirmModal
        defaultAction="negative"
        onConfirm={() => {
          submitAssessment(assessment.id, form.formikProps.values);
        }}
        useModal={confirmModal}
        title={`Submit ${assessment.assessmentType}`}
      >
        <p>{translate('confirmSubmissionWarning')}</p>
      </ConfirmModal>
      <HeaderGrid>
        <DisplayLabel>
          {translate('points')} : {calculateTotalAssessmentPoints(assessment)}
        </DisplayLabel>

        <div style={{ display: 'grid' }}>
          <div
            className="ed-single-question-assessment"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridRowStart: 1 }}
          >
            {saveSubmissionState.data && (
              <div className="saving-status">
                {saveSubmissionState.submitting ? (
                  <span>{translate('savingStatus')}</span>
                ) : (
                  <div className="saving-status__saved">
                    <Icon icon="check" />
                    <span className="ml-4">{translate('saved')}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={{ gridRowStart: 1, display: 'grid' }}>
            {assessment.options?.timeLimit?.allow && (
              <AssessmentTimer
                totalTimeSeconds={calculateElapsedTime(props.submission, assessment)}
                onTimeEnded={() => setTimeEnded(true)}
              />
            )}
            <div>
              <Spacer />
              <Button type="button" onClick={() => confirmModal.openModal()} theme="success">
                {translate('submitExam')}
              </Button>
            </div>
          </div>
        </div>
      </HeaderGrid>
      <Form
        form={form}
        initialValues={{
          submission: submission ? JSON.parse(submission.submission) : {},
        }}
        onSubmit={() => {}}
      >
        <SingleSectionAssessment sections={sections} type={assessment.assessmentType} onReadyToSave={onReadyToSave} />
      </Form>
    </div>
  );
};

export interface StartAssessmentProps {
  assessment: AssessmentEntity;
  submission?: AssessmentSubmissionEntity;
  currentUser?: UserEntity;
}

const AssessmentPage: React.FunctionComponent<AssessmentPageProps> = (props): JSX.Element => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [assessment, setAssessment] = useState(props.assessment);
  const form = useForm();

  useEffect(() => {
    const availability = props.assessment?.options?.availability;
    const startDate = moment(availability?.from || new Date());
    const endDate = availability?.to && moment(availability.to);

    if (startDate.isSameOrBefore(moment())) {
      setIsAvailable(
        (endDate && endDate.isSameOrAfter(moment())) ||
          (props.submission ? props.submission?.status === AssessmentSubmissionStatus.DRAFT : true)
      );
    } else {
      setIsAvailable(true);
    }
    if (props.assessment) {
      setAssessment(props.assessment);
    }
  }, [props.assessment]);

  if (isAvailable) {
    return <StartAssessment assessment={assessment} submission={props.submission} />;
  }
  if (assessment?.options?.publicExam?.allow && props.submission) {
    return (
      <Form form={form} initialValues={{ ...props.assessment }} onSubmit={() => {}}>
        <Header padded size={2} className="mb-8">
          {translate('results', { count: 1 })}
        </Header>
        <AssessmentSubmissionView submission={props.submission} assessment={assessment} />
      </Form>
    );
  }
  return <Empty message={`This ${props.assessment.assessmentType} is not available`} icon="assessment" />;
};

export interface AssessmentPageProps {
  assessment: AssessmentEntity;
  submission?: AssessmentSubmissionEntity;
}

export default AssessmentPage;
