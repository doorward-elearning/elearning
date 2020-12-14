import React, { useEffect, useState } from 'react';
import QuestionView, { QuestionViewTypes } from './QuestionView';
import useForm from '@doorward/ui/hooks/useForm';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import Header from '@doorward/ui/components/Header';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import AssessmentOptions from '../../Forms/AssessmentForm/AssessmentOptions';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import Panel from '@doorward/ui/components/Panel';
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
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardApi from '../../../services/apis/doorward.api';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import Table from '@doorward/ui/components/Table';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import translate from '@doorward/common/lang/translate';

export const AssessmentContext = React.createContext<AssessmentContextProps>({});

const AssessmentTimes = ({ startDate, endDate }) => {
  return startDate || endDate ? (
    <Panel>
      <HeaderGrid>
        <div>
          <Header padded size={2}>
            {translate('availableFrom')}
          </Header>
          <DisplayLabel>{Tools.normalDateTime(startDate)}</DisplayLabel>
        </div>
        <div>
          <Header padded size={2}>
            {translate('availableTo')}
          </Header>
          <DisplayLabel>{Tools.normalDateTime(endDate)}</DisplayLabel>
        </div>
      </HeaderGrid>
    </Panel>
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

  const getSubmission = useAction(DoorwardApi.assessments.getSubmission, {
    onSuccess: (data) => {
      setSubmission(data.submission);
    },
  });
  const getSubmissionState = useDoorwardApi((state) => state.assessments.getSubmission);

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
                {translate('totalPoints')}
                <b>{assessment.questions.reduce((acc, question) => acc + question.points, 0)}</b>
              </DisplayLabel>
            </HeaderGrid>
            <div className="ed-assessment">
              <TabLayout wrapTabs>
                {assessment.questions.map((question, index) => {
                  return (
                    <Tab title={`${index + 1}`}>
                      <QuestionView
                        view={hasPrivileges('moduleItems.create') ? QuestionViewTypes.ANSWER_PREVIEW_MODE : undefined}
                        question={question}
                      />
                    </Tab>
                  );
                })}
              </TabLayout>
            </div>
          </React.Fragment>
        )}
        <RoleContainer privileges={['assessments.submit']}>
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
              getCell={(row, index) => ({
                submittedOn: Tools.normalDateTime(row.submittedOn),
              })}
              columns={{
                status: translate('status'),
                submittedOn: translate('dateSubmitted'),
                grade: translate('grade'),
                gradedBy: translate('gradedBy'),
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
