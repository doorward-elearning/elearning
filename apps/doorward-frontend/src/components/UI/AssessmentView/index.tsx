import React, { useEffect, useState } from 'react';
import QuestionView, { QuestionViewTypes } from './QuestionView';
import useForm from '@doorward/ui/hooks/useForm';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import Header from '@doorward/ui/components/Header';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
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
import useRoutes from '../../../hooks/useRoutes';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import DoorwardApi from '../../../services/apis/doorward.api';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import AssessmentTimer from '../../../screens/Assessment/AssessmentTimer';
import InformationCard from '@doorward/ui/components/InformationCard';
import AssessmentSubmissionView from './AssessmentSubmissionView';

export const AssessmentContext = React.createContext<AssessmentContextProps>({});

const AssessmentView: React.FunctionComponent<AssessmentViewProps> = ({ assessment, ...props }) => {
  const initialValues = { ...assessment };
  const [{ showQuestions, startDate, startAssessment, endDate }, setState] = useMergeState({
    showQuestions: false,
    startAssessment: false,
    startDate: null,
    endDate: null,
    points: 0,
  });
  const [points, setPoints] = useState(0);
  const [submission, setSubmission] = useState<AssessmentSubmissionEntity>();

  const [getSubmission, getSubmissionState] = useApiAction(DoorwardApi, (api) => api.assessments.getSubmission, {
    onSuccess: (data) => {
      setSubmission(data?.submission);
    },
  });

  useEffect(() => {
    setPoints(assessment.questions.reduce((acc, question) => acc + question.points, 0));
  }, []);

  useEffect(() => {
    getSubmission(assessment.id);
  }, []);

  const form = useForm();
  const hasPrivileges = usePrivileges();
  const routes = useRoutes();

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
        } else {
          startAssessment = true;
        }

        if (submission) {
          startAssessment = false;
        }
        setState({
          startAssessment,
          startDate,
          endDate,
        });
      }
    }
  }, [getSubmissionState]);

  return (
    <AssessmentContext.Provider value={{ assessment: assessment }}>
      <Form form={form} onSubmit={() => {}} editable={false} initialValues={initialValues}>
        {assessment.instructions && (
          <React.Fragment>
            <Header padded size={2}>
              {translate('instructions')}
            </Header>
            <DraftHTMLContent content={assessment.instructions} />
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
              {assessment.questions.map((question, index) => {
                return (
                  <QuestionView
                    view={hasPrivileges('moduleItems.create') ? QuestionViewTypes.ANSWER_PREVIEW_MODE : undefined}
                    question={question}
                  />
                );
              })}
            </div>
          </React.Fragment>
        )}
        <RoleContainer privileges={['assessments.submit']}>
          <Spacer />
          <InformationCard>
            <InformationCard.Header>
              <Header size={2}>{translate('exam')}</Header>
            </InformationCard.Header>
            <InformationCard.Body>
              {moment().isBefore(startDate) && (
                <InformationCard.Item title={translate('examWillStartIn')}>
                  {moment().diff(startDate, 'hour') < 24 ? (
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
              {assessment.options?.timeLimit?.allow && (
                <InformationCard.Item title={translate('timeLimit')} icon="timer">
                  {Tools.timeTaken(assessment.options.timeLimit.minutes * 60)}
                </InformationCard.Item>
              )}
              <InformationCard.Item title={translate('numberOfQuestions')} icon={'list'}>
                {`${assessment.questions?.length || 0}`}
              </InformationCard.Item>
              <InformationCard.Item title={translate('totalPoints')} icon={'all_inclusive'}>
                {`${points}`}
              </InformationCard.Item>
            </InformationCard.Body>
          </InformationCard>
          <Spacer />
          {startAssessment && (
            <Button
              onClick={() =>
                routes.navigate(routes[assessment.assessmentType === AssessmentTypes.EXAM ? 'exam' : 'quiz'], {
                  assessmentId: assessment.id,
                })
              }
            >
              {translate('startAssessment', { assessment: assessment.assessmentType })}
            </Button>
          )}
        </RoleContainer>

        <RoleContainer privileges={['moduleItems.create']}>
          <AssessmentOptions type={assessment.assessmentType} />
        </RoleContainer>
        {submission && submission.gradedOn && (
          <RoleContainer privileges={['assessments.submit']}>
            <Header padded size={2} className="mb-8">
              {translate('submission', { count: 1 })}
            </Header>
            <AssessmentSubmissionView submission={submission} />
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
