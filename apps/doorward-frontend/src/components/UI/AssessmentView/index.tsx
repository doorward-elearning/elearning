import React, { useEffect, useState } from 'react';
import QuestionView, { QuestionViewTypes } from './QuestionView';
import BasicForm from '../../Forms/BasicForm';
import useForm from '@doorward/ui/hooks/useForm';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
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

export const AssessmentContext = React.createContext<AssessmentContextProps>({});

const AssessmentView: React.FunctionComponent<AssessmentViewProps> = ({ assessment, ...props }) => {
  const initialValues = { ...assessment };
  const [showQuestions, setShowQuestions] = useState(false);
  const [startAssessment, setStartAssessment] = useState(false);
  const form = useForm();
  const state = useDoorwardApi((state) => state.modules.createModuleItem);
  const hasPrivileges = usePrivileges();

  useEffect(() => {
    let showQuestions = false;
    let startAssessment = false;
    if (hasPrivileges('moduleItems.create')) {
      showQuestions = true;
    }

    if (hasPrivileges('assessments.submit')) {
      // check if the assessment can start
      startAssessment = false;
      const from = assessment?.options?.availability?.from;
      if (from) {
        const startDate = moment(from);
        if (startDate.isSameOrBefore(moment())) {
          startAssessment = true;
        }
      } else {
        startAssessment = true;
      }

      const to = assessment?.options?.availability?.to;
      if (to) {
        const endDate = moment(to);
        if (endDate.isSameOrBefore(moment())) {
          startAssessment = false;
        }
      }
    }

    setShowQuestions(showQuestions);
    setStartAssessment(startAssessment);
  }, []);

  return (
    <AssessmentContext.Provider value={{ assessment: assessment }}>
      <BasicForm
        form={form}
        editable={false}
        initialValues={initialValues}
        submitAction={() => ({ type: '' })}
        onCancel={props.onCancel}
        features={[]}
        state={state}
      >
        {assessment.instructions && (
          <React.Fragment>
            <Header padded size={2}>
              Instructions
            </Header>
            <DraftHTMLContent content={assessment.instructions} />
          </React.Fragment>
        )}
        {showQuestions && (
          <React.Fragment>
            <Header padded size={2}>
              Questions
            </Header>
            <div className="ed-assessment">
              <TabLayout wrapTabs>
                {assessment.questions.map((question, index) => {
                  return (
                    <Tab title={`${index + 1}`}>
                      <QuestionView
                        view={hasPrivileges('moduleItems.create') ? QuestionViewTypes.ANSWER_PREVIEW_MODE : undefined}
                        question={question}
                        index={index + 1}
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
          <Panel>
            <HeaderGrid>
              <div>
                <Header padded size={2}>
                  Available From
                </Header>
                <DisplayLabel>{Tools.normalDateTime(assessment.options?.availability?.from)}</DisplayLabel>
              </div>
              <div>
                <Header padded size={2}>
                  Available Till
                </Header>
                <DisplayLabel>{Tools.normalDateTime(assessment.options?.availability?.to)}</DisplayLabel>
              </div>
            </HeaderGrid>
          </Panel>
          <Spacer />
          {startAssessment && <Button onClick={() => {}}>Start {assessment.assessmentType}</Button>}
        </RoleContainer>

        <RoleContainer privileges={['moduleItems.create']}>
          <AssessmentOptions type={assessment.assessmentType} />
        </RoleContainer>
      </BasicForm>
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
