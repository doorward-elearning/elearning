import React, { useEffect, useState } from 'react';
import QuestionView, { QuestionViewTypes } from './QuestionView';
import useForm from '@doorward/ui/hooks/useForm';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import Header from '@doorward/ui/components/Header';
import HTMLContentView from '@doorward/ui/components/HTMLContentView';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import AssessmentOptions from '../../Forms/AssessmentForm/AssessmentOptions';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import Tools from '@doorward/common/utils/Tools';
import Spacer from '@doorward/ui/components/Spacer';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import moment from 'moment';
import Button from '@doorward/ui/components/Buttons/Button';
import Form from '@doorward/ui/components/Form';
import useMergeState from '@doorward/ui/hooks/useMergeState';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import DoorwardApi from '../../../services/apis/doorward.api';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import AssessmentTimer from '../../../screens/Assessment/AssessmentTimer';
import InformationCard from '@doorward/ui/components/InformationCard';
import AssessmentSubmissionView from './AssessmentSubmissionView';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import TabLayout from '@doorward/ui/components/TabLayout';
import { QuestionSectionConfig } from '../../Forms/AssessmentForm/AssessmentBuilder';
import { calculateElapsedTime } from '../../../screens/Assessment/AssessmentPage';
import calculateTotalAssessmentPoints from '@doorward/common/utils/calculateTotalAssessmentPoints';

export const AssessmentContext = React.createContext<AssessmentContextProps>({});

const evaluateStatus = (
  submission?: AssessmentSubmissionEntity,
  startDate?: Date | string,
  endDate?: Date | string
) => {
  if (submission) {
    return submission.status === AssessmentSubmissionStatus.DRAFT ? translate('inProgress') : translate('submitted');
  }

  if (moment().isBefore(moment(startDate))) {
    return translate('notYetDone');
  } else {
    if (moment().isAfter(moment(endDate))) {
      return translate('dueDatePassed');
    } else {
      return translate('notSubmitted');
    }
  }
};

const AssessmentView: React.FunctionComponent<AssessmentViewProps> = ({ assessment, ...props }) => {
  const initialValues = { ...assessment };
  const [{ showQuestions, startDate, startAssessment, endDate, continueAssessment, timeEnded }, setState] =
    useMergeState({
      showQuestions: false,
      startAssessment: false,
      continueAssessment: false,
      startDate: null,
      endDate: null,
      points: 0,
      timeEnded: false,
    });
  const [points, setPoints] = useState(0);
  const [submission, setSubmission] = useState<AssessmentSubmissionEntity>();
  const navigation = useNavigation();
  const publicUrl = new URL((process as { env: { [key: string]: string } }).env.PUBLIC_URL, window.location.href);

  const [getSubmission, getSubmissionState] = useApiAction(DoorwardApi, (api) => api.assessments.getSubmission, {
    onSuccess: (data) => {
      setSubmission(data?.submission);
    },
  });

  useEffect(() => {
    setPoints(calculateTotalAssessmentPoints(assessment));
  }, []);

  useEffect(() => {
    getSubmission(assessment.id);
  }, []);

  const form = useForm();
  const hasPrivileges = usePrivileges();

  useEffect(() => {
    let showQuestions = false;
    if (hasPrivileges('moduleItems.create')) {
      showQuestions = true;
    }

    setState({
      showQuestions,
    });
  }, [assessment]);

  useEffect(() => {
    if (getSubmissionState.fetched) {
      let startAssessment = false;
      let continueAssessment = false;
      let startDate, endDate;

      if (hasPrivileges('assessments.submit')) {
        // check if the assessment can start
        startAssessment = false;
        const from = assessment?.options?.availability?.from;
        if (from) {
          startDate = moment(from);
          if (startDate.isSameOrBefore(moment())) {
            startAssessment = true;
          }
        } else {
          startAssessment = true;
        }

        const to = assessment?.options?.availability?.to;
        if (to) {
          endDate = moment(to);
          if (endDate.isSameOrBefore(moment())) {
            startAssessment = false;
          }
        }

        if (submission) {
          startAssessment = false;
          if (submission.status === AssessmentSubmissionStatus.DRAFT) {
            continueAssessment = true;
          }
        }
        setState({
          startAssessment,
          startDate,
          endDate,
          continueAssessment,
        });
      }
    }
  }, [getSubmissionState]);

  return (
    <AssessmentContext.Provider value={{ assessment: assessment }}>
      <Form form={form} onSubmit={() => {}} editable={false} initialValues={initialValues}>
        <React.Fragment>
          <RoleContainer privileges={['moduleItems.create']}>
            {assessment.options.publicExam.allow && (
              <DisplayLabel>
                {`${publicUrl.protocol}//${publicUrl.host}/courses/modules/items/${assessment.id}`}
              </DisplayLabel>
            )}
          </RoleContainer>
        </React.Fragment>

        {assessment.instructions && (
          <React.Fragment>
            <Header padded size={2}>
              {translate('instructions')}
            </Header>
            <HTMLContentView content={assessment.instructions} />
          </React.Fragment>
        )}
        {showQuestions && (
          <React.Fragment>
            <HeaderGrid>
              <Header padded size={2}>
                {translate('questions')}
              </Header>
              <DisplayLabel>
                {translate('totalPoints')}&nbsp;
                <b>{points}</b>
              </DisplayLabel>
            </HeaderGrid>
            <div className="ed-assessment">
              <TabLayout>
                {assessment.sections.map((section, index) => {
                  return (
                    <Tab title={translate('sectionHeader', { index: index + 1 })}>
                      <div>
                        <QuestionSectionConfig sectionIndex={index} section={section} />
                        <Header size={3}>{translate('questions')}</Header>
                        <div className="mt-4">
                          {section.questions.map((question) => {
                            return (
                              <QuestionView
                                view={
                                  hasPrivileges('moduleItems.create')
                                    ? QuestionViewTypes.ANSWER_PREVIEW_MODE
                                    : undefined
                                }
                                question={question}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </Tab>
                  );
                })}
              </TabLayout>
            </div>
          </React.Fragment>
        )}
        <RoleContainer privileges={['assessments.submit']}>
          <Spacer />
          <HeaderGrid>
            <Header padded size={2} className="mb-8">
              {translate('exam', { count: 1 })}
            </Header>
            {getSubmissionState.fetched &&
              getSubmissionState.data?.submission?.status === AssessmentSubmissionStatus.DRAFT && (
                <AssessmentTimer
                  totalTimeSeconds={calculateElapsedTime(submission, assessment)}
                  onTimeEnded={() => {
                    setState({ timeEnded: true });
                  }}
                />
              )}
          </HeaderGrid>
          <Spacer />
          {startAssessment && (
            <Button
              onClick={() =>
                navigation.navigate(
                  assessment.assessmentType === AssessmentTypes.EXAM
                    ? ROUTES.assessments.exam
                    : ROUTES.assessments.quiz,
                  {
                    assessmentId: assessment.id,
                  }
                )
              }
            >
              {translate('startAssessment', { assessment: assessment.assessmentType })}
            </Button>
          )}
          {continueAssessment && !timeEnded && (
            <Button
              onClick={() =>
                navigation.navigate(
                  assessment.assessmentType === AssessmentTypes.EXAM
                    ? ROUTES.assessments.exam
                    : ROUTES.assessments.quiz,
                  {
                    assessmentId: assessment.id,
                  }
                )
              }
            >
              {translate('continueAssessment', { assessment: assessment.assessmentType })}
            </Button>
          )}
          <Spacer />
          <InformationCard>
            <InformationCard.Body>
              {moment().isBefore(startDate) && !submission && (
                <InformationCard.Item title={translate('examWillStartIn')}>
                  {moment(startDate).diff(moment(), 'hour') < 24 ? (
                    <AssessmentTimer
                      totalTimeSeconds={Math.abs(moment().diff(startDate, 'second'))}
                      onTimeEnded={() => {
                        setState({
                          startAssessment: true,
                        });
                      }}
                    />
                  ) : (
                    <DisplayLabel>{Tools.humanReadableTime(startDate)}</DisplayLabel>
                  )}
                </InformationCard.Item>
              )}
              <InformationCard.Item
                title={`${translate(endDate ? 'availability' : 'availableFrom')} ${
                  endDate ? '(' + Tools.timeTaken(moment(endDate).diff(startDate, 'seconds')) + ')' : ''
                }`}
              >
                <InformationCard.ItemBody icon={'timer'}>{Tools.normalDateTime(startDate)}</InformationCard.ItemBody>
                {endDate && (
                  <InformationCard.ItemBody icon={'timer_off'}>
                    {Tools.normalDateTime(endDate)}
                  </InformationCard.ItemBody>
                )}
              </InformationCard.Item>
              {!timeEnded && (
                <InformationCard.Item title={translate('status')} icon={'info'}>
                  <DisplayLabel>{evaluateStatus(submission, startDate, endDate)}</DisplayLabel>
                </InformationCard.Item>
              )}
              {assessment.options?.timeLimit?.allow && (
                <InformationCard.Item title={translate('timeLimit')} icon="timer">
                  {Tools.timeTaken(assessment.options.timeLimit.minutes * 60)}
                </InformationCard.Item>
              )}
              <InformationCard.Item title={translate('numberOfQuestions')} icon={'list'}>
                {`${assessment.sections.reduce((total, section) => total + section.questions?.length || 0, 0)}`}
              </InformationCard.Item>
              <InformationCard.Item title={translate('totalPoints')} icon={'all_inclusive'}>
                {`${points}`}
              </InformationCard.Item>
            </InformationCard.Body>
          </InformationCard>
          <Spacer />
        </RoleContainer>
        <RoleContainer privileges={['moduleItems.create']}>
          <AssessmentOptions type={assessment.assessmentType} />
        </RoleContainer>
        {submission && submission.status !== AssessmentSubmissionStatus.DRAFT && (
          <RoleContainer privileges={['assessments.submit']}>
            <Header padded size={2} className="mb-8">
              {translate('results', { count: 1 })}
            </Header>
            <AssessmentSubmissionView submission={submission} assessment={assessment} />
          </RoleContainer>
        )}
      </Form>
    </AssessmentContext.Provider>
  );
};

export interface AssessmentContextProps {
  assessment?: AssessmentEntity;
}

export interface AssessmentViewProps {
  assessment: AssessmentEntity;
  onCancel: () => void;
}

export default AssessmentView;
