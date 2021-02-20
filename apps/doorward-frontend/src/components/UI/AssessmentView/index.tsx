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
import Table from '@doorward/ui/components/Table';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import AssessmentTimer from '../../../screens/Assessment/AssessmentTimer';

export const AssessmentContext = React.createContext<AssessmentContextProps>({});

const AssessmentTimes = ({ startDate, endDate }) => {
  return startDate || endDate ? (
    <div>
      <div className="mt-4">
        <Header padded size={2}>
          {translate('availableFrom')}
        </Header>
        <div className="mt-4 mb-4">
          <DisplayLabel>{Tools.normalDateTime(startDate)}</DisplayLabel>
        </div>
      </div>
      <div className="mt-4">
        <Header padded size={2}>
          {translate('availableTo')}
        </Header>
        <div className="mt-4 mb-4">
          <DisplayLabel>{Tools.normalDateTime(endDate)}</DisplayLabel>
        </div>
      </div>
    </div>
  ) : null;
};

const AssessmentView: React.FunctionComponent<AssessmentViewProps> = ({ assessment, ...props }) => {
  const initialValues = { ...assessment };
  const [{ showQuestions, startDate, startAssessment, endDate }, setState] = useMergeState({
    showQuestions: false,
    startAssessment: false,
    startDate: null,
    endDate: null,
  });
  const [submission, setSubmission] = useState<AssessmentSubmissionEntity>();

  const [getSubmission, getSubmissionState] = useApiAction(DoorwardApi, (api) => api.assessments.getSubmission, {
    onSuccess: (data) => {
      setSubmission(data?.submission);
    },
  });

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
                <b>{assessment.questions.reduce((acc, question) => acc + question.points, 0)}</b>
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
          {moment().isBefore(startDate) && (
            <React.Fragment>
              <Spacer />
              <Header size={2}>{translate('examWillStartIn')}</Header>
              <Spacer />
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
            </React.Fragment>
          )}
          <Spacer />
          <AssessmentTimes startDate={startDate} endDate={endDate} />
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
        {submission && (
          <RoleContainer privileges={['assessments.submit']}>
            <Header padded size={2}>
              {translate('submission', { count: 1 })}
            </Header>
            <Table
              data={[submission]}
              height={300}
              onRowClick={({ rowData }) => {
                if (rowData.status === AssessmentSubmissionStatus.DRAFT) {
                  routes.navigate(routes[assessment.assessmentType === AssessmentTypes.EXAM ? 'exam' : 'quiz'], {
                    assessmentId: rowData.id,
                  });
                }
              }}
              columns={{
                id: {
                  title: translate('id'),
                  cellRenderer: ({ rowIndex }) => rowIndex + 1,
                  maxWidth: 80,
                },
                assessmentTime: {
                  title: translate('timeTakenToComplete'),
                  cellRenderer: ({ rowData }) => Tools.timeTaken(+rowData.assessmentTime),
                },
                status: {
                  title: translate('status'),
                },
                submittedOn: {
                  cellRenderer: ({ rowData }) =>
                    rowData.submittedOn ? Tools.humanReadableTime(rowData.submittedOn) : '--',
                  title: translate('dateSubmitted'),
                },
                grade: {
                  title: translate('grade'),
                  cellRenderer: ({ rowData }) =>
                    rowData.status === AssessmentSubmissionStatus.GRADED ? rowData.grade : '--',
                },
                gradedBy: {
                  title: translate('gradedBy'),
                },
              }}
            />
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
